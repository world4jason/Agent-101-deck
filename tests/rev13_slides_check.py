#!/usr/bin/env python3
"""Check all 62 implemented Rev13 scenes against the v5 manifest."""

from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
HTML_PATH = ROOT / "slides" / "rev13" / "index.html"
JS_PATH = ROOT / "slides" / "rev13" / "rev13.js"
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
        self.note_text: list[str] = []
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
                "caption_text": [],
                "note_text": [],
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
                    self.caption_depth = getattr(self, "caption_depth", 0) + 1
            if tag in {"script", "style"}:
                self.skip_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style"} and self.skip_depth:
            self.skip_depth -= 1
        if tag == "p" and getattr(self, "caption_depth", 0):
            self.caption_depth -= 1
        if tag == "aside" and self.note_depth:
            self.note_depth -= 1
        if tag == "section" and self.current is not None:
            self.current = None

    def handle_data(self, data: str) -> None:
        if self.current is None or self.skip_depth:
            return
        if self.note_depth:
            self.current["note_text"].append(data)
        else:
            self.current["visible_text"].append(data)
            if getattr(self, "caption_depth", 0):
                self.current["caption_text"].append(data)


def fail(errors: list[str], message: str) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []
    try:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        renderer_source = JS_PATH.read_text(encoding="utf-8")
        parser = SlideParser()
        parser.feed(HTML_PATH.read_text(encoding="utf-8"))
        parser.close()
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: unable to read Rev13 input: {exc}")
        print("REV13 SLIDES: FAIL (1)")
        return 1

    slides = parser.slides
    expected = manifest.get("core_part1", []) + manifest.get("core_part2", [])
    if manifest.get("development_phase") != "implementation":
        fail(errors, "v5 manifest must declare implementation after all 62 scenes are present")
    if len(expected) != 62 or len(set(expected)) != 62:
        fail(errors, "v5 manifest must define 62 unique scenes")
    implemented_ids = [
        slide["attrs"].get("data-rev13-scene-id") for slide in slides
    ]

    if not slides:
        fail(errors, "no .slide sections were found")
    if len(slides) != 62:
        fail(errors, f"expected all 62 scenes, found {len(slides)}")
    if implemented_ids != expected:
        fail(errors, "scene IDs do not match the complete v5 scene order")

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
        if not attrs.get("data-art"):
            fail(errors, f"slide {number}: missing native artwork renderer key")

        if slide["notes"] != 1 or slide["hidden_notes"] != 1:
            fail(errors, f"slide {number}: expected exactly one hidden <aside class=\"notes\">")
        if slide["h1"] != 1:
            fail(errors, f"slide {number}: expected one visible title")
        if slide["figures"] != 1:
            fail(errors, f"slide {number}: expected one main <figure class=\"artwork\">")
        if slide["captions"] > 1:
            fail(errors, f"slide {number}: more than one explanatory caption")
        note_text = " ".join(slide["note_text"])
        for field in ("Data：", "Insight：", "Go：", "Evidence scope：", "下一站："):
            if field not in note_text:
                fail(errors, f"slide {number}: speaker notes missing {field.rstrip('：')}")

        visible_text = " ".join(slide["visible_text"])
        for scene_id in manifest.get("core_part1", []) + manifest.get("core_part2", []):
            if re.search(rf"(?<![A-Za-z0-9]){re.escape(scene_id)}(?![A-Za-z0-9])", visible_text):
                fail(errors, f"slide {number}: scene ID {scene_id} appears in learner-facing text")

    by_scene = {
        slide["attrs"].get("data-rev13-scene-id"): slide["attrs"]
        for slide in slides
    }
    expected_agent_modes = {
        "A01": "delegate",
        "A02": "single",
        "A03": "multi-chat",
        "A04": "orchestrator",
    }
    for scene_id, mode in expected_agent_modes.items():
        attrs = by_scene.get(scene_id, {})
        if attrs.get("data-art") != "part2-map":
            fail(errors, f"{scene_id}: agent scene must reuse the full mother-map renderer")
        if attrs.get("data-agent-mode") != mode:
            fail(errors, f"{scene_id}: expected mother-map agent route {mode!r}")
    if renderer_source.count("架構示意</span><strong>非真實 multi-agent run") < 2:
        fail(errors, "A03/A04 must visibly mark illustrative, non-real multi-agent runs")

    for scene_id in ("B04", "R05", "RD02", "D04", "RV03", "Q05", "PC02", "HG02", "A11"):
        slide = next((item for item in slides if item["attrs"].get("data-rev13-scene-id") == scene_id), None)
        caption = " ".join(slide["caption_text"]) if slide else ""
        if "→" not in caption:
            fail(errors, f"{scene_id}: updated overview must show a visible before-to-after delta")

    print(f"Checked {len(slides)} slides against all {len(expected)} v5 scenes.")
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        print(f"REV13 SLIDES: FAIL ({len(errors)})")
        return 1
    print("REV13 SLIDES: PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
