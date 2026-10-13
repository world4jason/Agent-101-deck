#!/usr/bin/env python3
"""Check the implemented Rev13 slide prefix against the v5 manifest."""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "slides" / "rev13" / "index.html"
MANIFEST_PATH = ROOT / "docs" / "rev13-two-part-manifest-v5.json"
REQUIRED_ATTRIBUTES = (
    "data-rev13-scene-id",
    "data-phase",
    "data-focus-roles",
    "data-doc-ref",
    "data-version-ref",
    "data-github-ref",
    "data-beat",
    "data-mother-map-id",
)
ALLOWED_BEATS = {
    "overview",
    "spotlight",
    "work",
    "updated-overview",
    "concept",
    "exercise",
}
MOTHER_MAP_ID = "rev13-four-foundations"


class SlideParser(HTMLParser):
    """Collect slide attributes, notes and learner-facing slide text."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.slides: list[dict[str, object]] = []
        self.current: dict[str, object] | None = None
        self.note_depth = 0
        self.skip_depth = 0

    @staticmethod
    def _attrs(attrs: list[tuple[str, str | None]]) -> dict[str, str | None]:
        return dict(attrs)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = self._attrs(attrs)
        classes = set((values.get("class") or "").split())
        if tag == "section" and "slide" in classes:
            self.current = {
                "attrs": values,
                "notes": 0,
                "hidden_notes": 0,
                "h1": 0,
                "figures": 0,
                "captions": 0,
                "child_tags": [],
                "visible_text": [],
            }
            self.slides.append(self.current)
        elif self.current is not None:
            if self.note_depth == 0 and tag not in {"aside"}:
                self.current["child_tags"].append(tag)
            if tag == "aside" and "notes" in classes:
                self.current["notes"] += 1
                if "hidden" in values:
                    self.current["hidden_notes"] += 1
                self.note_depth += 1
            elif self.note_depth == 0:
                if tag == "h1":
                    self.current["h1"] += 1
                if tag == "figure" and "artwork" in classes:
                    self.current["figures"] += 1
                if tag == "p" and "caption" in classes:
                    self.current["captions"] += 1
            if tag in {"script", "style"}:
                self.skip_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style"} and self.skip_depth:
            self.skip_depth -= 1
        if tag == "aside" and self.note_depth:
            self.note_depth -= 1
        if tag == "section" and self.current is not None:
            self.current = None

    def handle_data(self, data: str) -> None:
        if self.current is not None and self.note_depth == 0 and self.skip_depth == 0:
            self.current["visible_text"].append(data)


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []
    try:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        parser = SlideParser()
        parser.feed(HTML_PATH.read_text(encoding="utf-8"))
        parser.close()
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: unable to read Rev13 input: {exc}")
        print("REV13 SLIDES: FAIL (1)")
        return 1

    slides = parser.slides
    expected = manifest.get("core_part1", [])
    implemented_ids = [
        slide["attrs"].get("data-rev13-scene-id") for slide in slides
    ]

    if not slides:
        fail(errors, "no .slide sections were found")
    if len(slides) > len(expected):
        fail(errors, f"{len(slides)} slides exceed the {len(expected)} Part 1 scenes in the manifest")
    if implemented_ids != expected[: len(slides)]:
        fail(errors, "scene IDs do not match the implemented v5 Part 1 prefix")

    for number, slide in enumerate(slides, start=1):
        attrs = slide["attrs"]
        page = attrs.get("data-page")
        element_id = attrs.get("id")
        if page != str(number):
            fail(errors, f"slide {number}: data-page is {page!r}, expected {number}")
        if element_id != f"page-{number}":
            fail(errors, f"slide {number}: id is {element_id!r}, expected 'page-{number}'")

        for name in REQUIRED_ATTRIBUTES:
            value = attrs.get(name)
            if value is None or not value.strip():
                fail(errors, f"slide {number}: missing or empty {name}")
        if attrs.get("data-mother-map-id") != MOTHER_MAP_ID:
            fail(errors, f"slide {number}: wrong data-mother-map-id")
        if attrs.get("data-beat") not in ALLOWED_BEATS:
            fail(errors, f"slide {number}: unsupported data-beat {attrs.get('data-beat')!r}")

        if slide["notes"] != 1 or slide["hidden_notes"] != 1:
            fail(errors, f"slide {number}: expected exactly one hidden <aside class=\"notes\">")
        if slide["h1"] != 1:
            fail(errors, f"slide {number}: expected one visible title")
        if slide["figures"] != 1:
            fail(errors, f"slide {number}: expected one main <figure class=\"artwork\">")
        if slide["captions"] > 1:
            fail(errors, f"slide {number}: more than one explanatory caption")

        visible_text = " ".join(slide["visible_text"])
        for scene_id in manifest.get("core_part1", []) + manifest.get("core_part2", []):
            if re.search(rf"(?<![A-Za-z0-9]){re.escape(scene_id)}(?![A-Za-z0-9])", visible_text):
                fail(errors, f"slide {number}: scene ID {scene_id} appears in learner-facing text")

    todo_part1 = expected[len(slides) :]
    todo_part2 = manifest.get("core_part2", [])
    todo_count = len(todo_part1) + len(todo_part2)
    print(f"Checked {len(slides)} slides against the v5 Part 1 prefix.")
    print(f"TODO: {todo_count} scenes remain outside B1; not scored.")
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        print(f"REV13 SLIDES: FAIL ({len(errors)})")
        return 1
    print("REV13 SLIDES: PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
