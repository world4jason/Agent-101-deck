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
CSS_PATH = ROOT / "slides" / "rev13" / "rev13.css"
MANIFEST_PATH = ROOT / "docs" / "rev13-two-part-manifest-v5.json"
REQUIRED_ATTRIBUTES = (
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
BANNED_LEARNER_TERMS = (
    "B-pre",
    "B-post",
    "B-pre-supplement",
    "B-post-supplement",
    "Version A",
    "workshop/matching-demo/evidence/",
    "candidate",
    "supplement",
    "duplicate",
    "snapshot",
    "artifact",
    "fixture",
    "SHA-256",
    "SHA256",
    "泳道",
    "X 軸",
    "Y 軸",
    "母圖",
    "骨架",
    "定位器",
    "Spotlight",
    "遮罩",
    "圖例",
    "accent",
    "rule tests",
    "main",
    "branch/matching-rule",
    "焦點",
    "細軌",
    "產物軌",
    "主幹",
)
INTERNAL_CODE_PATTERNS = (
    re.compile(r"(?<![A-Za-z0-9])(?:O|B|R|RD|D|RV|Q|PC|C|HG|A|X)\d{2}(?![A-Za-z0-9])"),
    re.compile(r"(?<![A-Za-z0-9])B[1-9](?![A-Za-z0-9])"),
    re.compile(r"(?i)\b[a-f0-9]{40,64}\b"),
)


class LearnerTextParser(HTMLParser):
    """Collect rendered text nodes while excluding notes and markup attributes."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.text_chunks: list[tuple[str | None, int, str]] = []
        self.stack: list[tuple[str, bool, bool, str | None]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        classes = set((values.get("class") or "").split())
        parent_notes = self.stack[-1][1] if self.stack else False
        parent_skipped = self.stack[-1][2] if self.stack else False
        parent_page = self.stack[-1][3] if self.stack else None
        in_notes = parent_notes or (tag == "aside" and "notes" in classes)
        skipped = parent_skipped or tag in {"script", "style"}
        page = values.get("data-page") if tag == "section" and "slide" in classes else parent_page
        self.stack.append((tag, in_notes, skipped, page))

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index][0] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data: str) -> None:
        if not data.strip():
            return
        in_notes = self.stack[-1][1] if self.stack else False
        skipped = self.stack[-1][2] if self.stack else False
        page = self.stack[-1][3] if self.stack else None
        if not in_notes and not skipped:
            self.text_chunks.append((page, self.getpos()[0], data))


def banned_terms_in(text: str) -> list[str]:
    """Return banned learner-facing terms found in text, ignoring case."""
    lowered = text.casefold()
    found = []
    for term in BANNED_LEARNER_TERMS:
        if term.casefold() == "main":
            matches = re.search(r"(?<![A-Za-z0-9])main(?![A-Za-z0-9])", text, re.IGNORECASE)
        else:
            matches = term.casefold() in lowered
        if matches:
            found.append(term)
    return found


def visible_text_from_markup(markup: str) -> str:
    """Extract text nodes from an HTML fragment, excluding notes and attributes."""
    parser = LearnerTextParser()
    parser.feed(markup)
    parser.close()
    return " ".join(chunk[2] for chunk in parser.text_chunks)


def banned_term_scanner_regression_check() -> bool:
    """Check that visible jargon is rejected while markup metadata stays ignored."""
    markup = (
        '<div class="swimlane mother-map" data-layout="X 軸 定位器">流程</div>'
        '<aside class="notes"><p>母圖、焦點</p></aside>'
    )
    visible = visible_text_from_markup(markup)
    return (
        banned_terms_in("人員泳道") == ["泳道"]
        and banned_terms_in("maintain a shared workflow") == []
        and visible == "流程"
        and banned_terms_in(visible) == []
    )


def _decode_js_escapes(value: str) -> str:
    """Decode common JavaScript string escapes before parsing HTML fragments."""
    output: list[str] = []
    index = 0
    simple_escapes = {
        "b": "\b",
        "f": "\f",
        "n": "\n",
        "r": "\r",
        "t": "\t",
        "v": "\v",
        "0": "\0",
        "\\": "\\",
        "'": "'",
        '"': '"',
        "`": "`",
        "$": "$",
    }
    while index < len(value):
        if value[index] != "\\" or index + 1 >= len(value):
            output.append(value[index])
            index += 1
            continue
        escaped = value[index + 1]
        if escaped in simple_escapes:
            output.append(simple_escapes[escaped])
            index += 2
        elif escaped in {"\n", "\r"}:
            index += 2
            if escaped == "\r" and index < len(value) and value[index] == "\n":
                index += 1
        elif escaped == "x" and index + 3 < len(value):
            try:
                output.append(chr(int(value[index + 2:index + 4], 16)))
                index += 4
            except ValueError:
                output.extend(value[index:index + 2])
                index += 2
        elif escaped == "u":
            if index + 2 < len(value) and value[index + 2] == "{":
                end = value.find("}", index + 3)
                if end != -1:
                    try:
                        output.append(chr(int(value[index + 3:end], 16)))
                        index = end + 1
                        continue
                    except (ValueError, OverflowError):
                        pass
            if index + 5 < len(value):
                try:
                    output.append(chr(int(value[index + 2:index + 6], 16)))
                    index += 6
                except ValueError:
                    output.extend(value[index:index + 2])
                    index += 2
            else:
                output.extend(value[index:index + 2])
                index += 2
        else:
            # JavaScript treats an unrecognised non-octal escape as the character itself.
            output.append(escaped)
            index += 2
    return "".join(output)


def _read_js_string(source: str, start: int) -> tuple[str, int]:
    quote = source[start]
    index = start + 1
    while index < len(source):
        if source[index] == "\\":
            index += 2
        elif source[index] == quote:
            return _decode_js_escapes(source[start + 1:index]), index + 1
        else:
            index += 1
    return _decode_js_escapes(source[start + 1:]), len(source)


def _read_js_template(source: str, start: int) -> tuple[list[tuple[int, str]], int]:
    """Read a template and its expressions, preserving markup around interpolations."""
    index = start + 1
    chunk_start = index
    static_parts: list[str] = []
    expression_literals: list[tuple[int, str]] = []
    while index < len(source):
        if source[index] == "\\":
            index += 2
        elif source.startswith("${", index):
            static_parts.append(_decode_js_escapes(source[chunk_start:index]))
            static_parts.append("__REV13_TEMPLATE_VALUE__")
            expression_literals.append((index, "__REV13_TEMPLATE_VALUE__"))
            nested, index = _scan_js_code(source, index + 2, stop_at_brace=True)
            expression_literals.extend(nested)
            chunk_start = index
        elif source[index] == "`":
            static_parts.append(_decode_js_escapes(source[chunk_start:index]))
            template_literal = (start, "".join(static_parts))
            return [template_literal, *expression_literals], index + 1
        else:
            index += 1
    static_parts.append(_decode_js_escapes(source[chunk_start:]))
    return [(start, "".join(static_parts)), *expression_literals], len(source)


def _starts_js_regex(source: str, index: int) -> bool:
    prefix = source[:index].rstrip()
    if not prefix:
        return True
    if prefix[-1] in "([{=,:;!&|?+-*%^~<>":
        return True
    return bool(
        re.search(
            r"\b(?:return|case|throw|delete|void|typeof|instanceof|in|of|yield|await|else|do)\s*$",
            prefix,
        )
    )


def _skip_js_regex(source: str, start: int) -> int:
    """Skip a regex literal so quotes in its character class are not read as strings."""
    index = start + 1
    in_character_class = False
    while index < len(source):
        char = source[index]
        if char == "\\":
            index += 2
        elif char in "\r\n":
            return start + 1
        elif char == "[":
            in_character_class = True
            index += 1
        elif char == "]":
            in_character_class = False
            index += 1
        elif char == "/" and not in_character_class:
            index += 1
            while index < len(source) and source[index].isalpha():
                index += 1
            return index
        else:
            index += 1
    return start + 1


def _scan_js_code(
    source: str, start: int = 0, *, stop_at_brace: bool = False
) -> tuple[list[tuple[int, str]], int]:
    """Collect JavaScript string literals, skipping comments and code identifiers."""
    literals: list[tuple[int, str]] = []
    index = start
    brace_depth = 1 if stop_at_brace else 0
    while index < len(source):
        if source.startswith("//", index):
            newline = source.find("\n", index + 2)
            index = len(source) if newline == -1 else newline + 1
        elif source.startswith("/*", index):
            end = source.find("*/", index + 2)
            index = len(source) if end == -1 else end + 2
        elif source[index] == "/" and _starts_js_regex(source, index):
            index = _skip_js_regex(source, index)
        elif source[index] in {"'", '"'}:
            literal_start = index
            value, index = _read_js_string(source, index)
            literals.append((literal_start, value))
        elif source[index] == "`":
            nested, index = _read_js_template(source, index)
            literals.extend(nested)
        elif stop_at_brace and source[index] == "{":
            brace_depth += 1
            index += 1
        elif stop_at_brace and source[index] == "}":
            brace_depth -= 1
            index += 1
            if brace_depth == 0:
                return literals, index
        else:
            index += 1
    return literals, index


def javascript_visible_text(source: str) -> list[tuple[int, str]]:
    """Extract text nodes from JS strings/templates with their source line numbers."""
    literals, _ = _scan_js_code(source)
    visible: list[tuple[int, str]] = []
    for offset, literal in sorted(literals):
        parser = LearnerTextParser()
        parser.feed(literal)
        parser.close()
        line = source.count("\n", 0, offset) + 1
        visible.extend((line, chunk[2]) for chunk in parser.text_chunks)
    return visible


def javascript_markup_visible_text(source: str) -> list[tuple[int, str]]:
    """Collect text nodes from HTML fragments, excluding plain code strings."""
    literals, _ = _scan_js_code(source)
    visible: list[tuple[int, str]] = []
    for offset, literal in sorted(literals):
        if "<" not in literal:
            continue
        parser = LearnerTextParser()
        parser.feed(literal)
        parser.close()
        line = source.count("\n", 0, offset) + 1
        visible.extend((line, chunk[2]) for chunk in parser.text_chunks)
    return visible


def append_banned_text_errors(
    errors: list[str], chunks: list[tuple[str | None, int, str]], source_name: str
) -> None:
    findings: set[str] = set()
    for page, line, text in chunks:
        location = f"{source_name} page {page}" if page else f"{source_name} line {line}"
        for term in banned_terms_in(text):
            findings.add(f"{location}: learner-facing text contains banned term {term!r}")
    errors.extend(sorted(findings))


def append_banned_js_errors(errors: list[str], source: str, source_name: str) -> None:
    findings = {
        f"{source_name} line {line}: learner-facing text contains banned term {term!r}"
        for line, text in javascript_visible_text(source)
        for term in banned_terms_in(text)
    }
    errors.extend(sorted(findings))


def append_internal_code_errors(
    errors: list[str],
    chunks: list[tuple[str | None, int, str]],
    source_name: str,
    scene_ids: list[str],
) -> None:
    findings: set[str] = set()
    for page, line, text in chunks:
        location = f"{source_name} page {page}" if page else f"{source_name} line {line}"
        for pattern in INTERNAL_CODE_PATTERNS:
            for code in pattern.findall(text):
                findings.add(f"{location}: internal code {code!r} appears in learner-facing text or notes")
        for scene_id in scene_ids:
            if re.search(rf"(?<![A-Za-z0-9]){re.escape(scene_id)}(?![A-Za-z0-9])", text):
                findings.add(f"{location}: internal scene ID {scene_id!r} appears in learner-facing text or notes")
    errors.extend(sorted(findings))


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
    if not banned_term_scanner_regression_check():
        fail(errors, "learner-facing banned-term scanner regression check failed")
    try:
        manifest = json.loads(MANIFEST_PATH.read_text(encoding="utf-8"))
        renderer_source = JS_PATH.read_text(encoding="utf-8")
        css_source = CSS_PATH.read_text(encoding="utf-8")
        html_source = HTML_PATH.read_text(encoding="utf-8")
        parser = SlideParser()
        parser.feed(html_source)
        parser.close()
    except (OSError, json.JSONDecodeError) as exc:
        print(f"ERROR: unable to read Rev13 input: {exc}")
        print("REV13 SLIDES: FAIL (1)")
        return 1

    slides = parser.slides
    expected = manifest.get("core_part1", []) + manifest.get("core_part2", [])
    learner_html = LearnerTextParser()
    learner_html.feed(html_source)
    learner_html.close()
    append_banned_text_errors(errors, learner_html.text_chunks, "index.html")
    append_banned_js_errors(errors, renderer_source, "rev13.js")
    append_internal_code_errors(errors, learner_html.text_chunks, "index.html", expected)
    append_internal_code_errors(
        errors,
        [(None, line, text) for line, text in javascript_markup_visible_text(renderer_source)],
        "rev13.js",
        expected,
    )

    if manifest.get("development_phase") != "implementation":
        fail(errors, "v5 manifest must declare implementation after all 62 scenes are present")
    if len(expected) != 62 or len(set(expected)) != 62:
        fail(errors, "v5 manifest must define 62 unique scenes")
    if not slides:
        fail(errors, "no .slide sections were found")
    expected_slide_map = manifest.get("implementation_slide_map", [])
    if not isinstance(expected_slide_map, list) or not expected_slide_map:
        fail(errors, "v5 manifest must map implementation slides to scene IDs")
        expected_slide_map = []
    if len(slides) != len(expected_slide_map):
        fail(errors, f"expected {len(expected_slide_map)} mapped slides, found {len(slides)}")
    actual_slide_map = []
    for slide in slides:
        attrs = slide["attrs"]
        try:
            page_number = int(attrs.get("data-page") or "")
        except ValueError:
            page_number = -1
        merged = [item.strip() for item in (attrs.get("data-rev13-merged-scenes") or "").split(",") if item.strip()]
        actual_slide_map.append({
            "page": page_number,
            "scene_id": attrs.get("data-rev13-scene-id"),
            "merged_scene_ids": merged,
        })
    if actual_slide_map != expected_slide_map:
        fail(errors, "slide scene mapping does not match the v5 manifest")
    mapped_ids = [
        scene_id
        for item in actual_slide_map
        for scene_id in [item.get("scene_id"), *item.get("merged_scene_ids", [])]
        if scene_id
    ]
    if set(mapped_ids) != set(expected):
        missing = sorted(set(expected) - set(mapped_ids))
        unknown = sorted(set(mapped_ids) - set(expected))
        fail(errors, f"slide mapping must trace all 62 scenes (missing={missing}, unknown={unknown})")
    if len(slides) != 66:
        fail(errors, f"expected the revised 66-page sequence, found {len(slides)} slides")
    if slides[0]["attrs"].get("data-rev13-scene-id") != "O01" or slides[1]["attrs"].get("data-rev13-merged-scenes") != "O01":
        fail(errors, "pages 1–2 must present the four foundations and the shared course outline")
    if slides[1]["attrs"].get("data-outline-part") != "1":
        fail(errors, "the first course outline must mark Part 1 as current")
    if [slide["attrs"].get("data-ticket-step") for slide in slides[2:7]] != [str(step) for step in range(1, 6)]:
        fail(errors, "pages 3–7 must progressively reveal the five parts of one ticket")
    if [slide["attrs"].get("data-rev13-scene-id") for slide in slides[7:16]] != [f"C{number:02}" for number in range(11, 20)]:
        fail(errors, "pages 8–16 must introduce the nine stages before the roles")
    if [slide["attrs"].get("data-rev13-scene-id") for slide in slides[16:20]] != ["C01", "C03", "C04", "C20"]:
        fail(errors, "pages 17–20 must show workflow, roles, role-stage map, and pairing practice in order")
    if any(slide["attrs"].get("data-agent") != "false" for slide in slides[:49]):
        fail(errors, "pages 1–49 must not render an Agent work row")
    expected_learning_outcome = (
        "上半場：一個純人類團隊把一張工作票從想法走到可以合併；下半場：Agent 加入後，看哪些工作能交給它。"
    )
    if expected_learning_outcome not in " ".join(slides[0]["caption_text"]):
        fail(errors, "page 1 must state the Owner-approved learning outcome")

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
        merged_scene_ids = [item.strip() for item in (attrs.get("data-rev13-merged-scenes") or "").split(",") if item.strip()]
        if not attrs.get("data-rev13-scene-id") and not merged_scene_ids:
            fail(errors, f"slide {number}: missing primary and merged scene mapping")
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
        note_chunks = [(str(page), 0, text) for text in slide["note_text"]]
        append_banned_text_errors(errors, note_chunks, "index.html notes")
        append_internal_code_errors(errors, note_chunks, "index.html notes", expected)
        for field in ("Data：", "Insight：", "Go：", "Evidence scope：", "下一站："):
            if field not in note_text:
                fail(errors, f"slide {number}: speaker notes missing {field.rstrip('：')}")

        visible_text = " ".join(slide["visible_text"])
        append_internal_code_errors(
            errors,
            [(str(page), 0, visible_text + " " + note_text)],
            "index.html slide text and notes",
            expected,
        )

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
        expected_art = "part2-map" if scene_id == "A01" else "agent-mode"
        if attrs.get("data-art") != expected_art:
            fail(errors, f"{scene_id}: expected artwork renderer {expected_art!r}")
        if attrs.get("data-agent-mode") != mode:
            fail(errors, f"{scene_id}: expected collaboration route {mode!r}")
    if renderer_source.count("架構示意，不代表實際多 Agent 協作") < 2:
        fail(errors, "A03/A04 must visibly mark the collaboration diagram as illustrative")

    page_by_number = {
        item["attrs"].get("data-page"): item
        for item in slides
    }
    chapter_opener = page_by_number.get("50", {})
    if chapter_opener.get("attrs", {}).get("data-rev13-scene-id") != "O02":
        fail(errors, "the Agent chapter must begin after the human flow with O02")
    if "加入第五個要素：Agent" not in " ".join(chapter_opener.get("visible_text", [])):
        fail(errors, "the Agent chapter home must name the fifth element")
    if chapter_opener.get("attrs", {}).get("data-agent") != "true":
        fail(errors, "the chapter home must render the added Agent row")
    if chapter_opener.get("attrs", {}).get("data-outline-part") != "2":
        fail(errors, "the second course outline must mark Part 2 as current")
    agent_definition = page_by_number.get("51", {})
    if agent_definition.get("attrs", {}).get("data-rev13-scene-id") != "C10":
        fail(errors, "the Agent definition scene must follow the chapter home")
    if "Agent 是能接一張工作票、自己動手做的 AI 助手。" not in " ".join(agent_definition.get("visible_text", [])):
        fail(errors, "the Agent definition must use the Owner-approved plain-language wording")
    capability_pages = [page_by_number.get(str(page), {}) for page in (52, 53, 54)]
    if [slide.get("attrs", {}).get("data-role-capability") for slide in capability_pages] != ["delegate", "assist", "human"]:
        fail(errors, "role capabilities must be revealed as delegate → assist → human")
    for slide in capability_pages:
        attrs = slide.get("attrs", {})
        caption = " ".join(slide.get("caption_text", []))
        linked_scenes = [item.strip() for item in (attrs.get("data-rev13-merged-scenes") or "").split(",") if item.strip()]
        if (attrs.get("data-rev13-scene-id") != "C10" and "C10" not in linked_scenes) or attrs.get("data-art") != "part2-map":
            fail(errors, "Agent role capability pages must extend C10 on the shared map")
    capability_captions = [" ".join(slide.get("caption_text", [])) for slide in capability_pages]
    if not all(phrase in capability_captions[0] for phrase in ("開發 Agent", "由人負責", "由人決定")):
        fail(errors, "the delegate page must identify Agent development and human review, QA, and authorization")
    if not all(phrase in capability_captions[1] for phrase in ("Agent 可協助", "由人核對")):
        fail(errors, "the assist page must identify human review and QA verification")
    if not all(phrase in capability_captions[2] for phrase in ("Agent 可執行", "由人決定")):
        fail(errors, "the human-responsibility page must keep goal, scope, and authorization with people")
    if "A01" not in (capability_pages[-1].get("attrs", {}).get("data-rev13-merged-scenes") or "").split(","):
        fail(errors, "the role capability sequence must link to the same-ticket Agent scene")
    agent_opener = page_by_number.get("55", {})
    if agent_opener.get("attrs", {}).get("data-outline-part") != "3":
        fail(errors, "the same-ticket Agent opener must mark Part 3 as current")
    if "一人和一個 Agent 如何交辦與核對？" not in " ".join(agent_opener.get("visible_text", [])) or "同一張票交給 Agent 再走一次" not in " ".join(agent_opener.get("caption_text", [])):
        fail(errors, "the Agent chapter must open by handing the same ticket forward")
    if "配對規則" not in " ".join(page_by_number.get("21", {}).get("caption_text", [])):
        fail(errors, "the Part 2 opening must state the pairing-rule ticket scope")
    if page_by_number.get("59", {}).get("attrs", {}).get("data-outline-part") != "4":
        fail(errors, "the Agent collaboration section must mark Part 4 as current")
    git_intro = page_by_number.get("34", {})
    if git_intro.get("attrs", {}).get("data-rev13-scene-id") != "D02" or "C08" not in (git_intro.get("attrs", {}).get("data-rev13-merged-scenes") or "").split(","):
        fail(errors, "Git/GitHub must be introduced at the Dev handoff and retain C08 traceability")
    version_path = page_by_number.get("35", {})
    if version_path.get("attrs", {}).get("data-rev13-scene-id") != "C09":
        fail(errors, "the version path must follow the Dev handoff")
    if "回報示意：改互按才配對；單向／雙向 PASS；重複按讚未測" not in renderer_source:
        fail(errors, "the first Agent handoff example must cite the actual rule-test status as illustrative")
    for principle in (
        "External Task State",
        "Bounded Execution",
        "Role Separation",
        "Independent Verification",
        "Goal Re-anchoring",
    ):
        if principle not in renderer_source:
            fail(errors, f"Agent chapter is missing visible principle name {principle!r}")
    if "回看第一次測時" in html_source or "回看第一次測時" in renderer_source or "locator-rewind" in renderer_source:
        fail(errors, "the Agent chapter must move forward without rewind labels")
    if "qa-return-path" not in renderer_source or "工作票 #3 · AC1" not in renderer_source:
        fail(errors, "the first QA failure must retain its AC1 comparison and QA-to-Dev return path")

    for legacy_selector in ("roles-matrix", "map-zone-badge", "map-delta", "agent-mode-pair"):
        if legacy_selector in css_source:
            fail(errors, f"legacy four-foundation map selector remains in CSS: {legacy_selector}")
    if "grid-template-rows: 62px minmax(0, 1fr)" not in css_source:
        fail(errors, "the full-width locator must remain a 62px single row")

    for scene_id in ("B04", "R05", "RD02", "D04", "RV03", "Q05", "PC02", "HG02", "A11"):
        slide = next((item for item in slides if item["attrs"].get("data-rev13-scene-id") == scene_id), None)
        caption = " ".join(slide["caption_text"]) if slide else ""
        if "→" not in caption:
            fail(errors, f"{scene_id}: updated overview must show a visible before-to-after delta")

    print(f"Checked {len(slides)} slides against all {len(expected)} mapped v5 scenes.")
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        print(f"REV13 SLIDES: FAIL ({len(errors)})")
        return 1
    print("REV13 SLIDES: PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
