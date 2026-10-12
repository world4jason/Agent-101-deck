# Issue #58 — Native editable PowerPoint artifact QA

Date: 2026-10-12
Base: PR #57 branch codex/postdemo-luna-ac-20261010 @ c9ab49b
Development: codex/editable-pptx-native-20261012
Scope: export pipeline only; no edits to archived v7/v10 HTML or rev12 lesson content.

## Problem / implementation

The old exporter took a screenshot of every slide and inserted it as a single image in each PPTX page. The replacement converts existing HTML/CSS/inline SVG through Chromium layout to separate editable SVG primitives, then to native OOXML DrawingML text, rectangle, path, line, and independent photo shapes. Source website HTML is unchanged.

Vendored and adapted GX-Alex/html2pptx (MIT) at scripts/vendor/html2pptx/, including LICENSE. Relevant fixes: inline SVG computed colors/strokes, add separate SVG arrowhead paths, correctly traverse display:contents, nested labels, and blockquotes; inherited dark backgrounds, final readable state for web-only hidden fragments, and zero-padded slide ordering so notes 100–107 stay matched.

## Measured final files

| Version | Pages | Editable text | Other native shapes | Independent pictures | Flattened slides | DOM-to-PPTX text recall avg / min |
|---|---:|---:|---:|---:|---:|---|
| v7 | 44 | 796 | 934 | 4 | 0 | 99.63% / 83.56% |
| v10 | 55 | 1,056 | 860 | 0 | 0 | 99.73% / 85.19% |
| Current | 107 | 1,682 | 2,000 | 0 | 0 | 99.88% / 88.12% |
| Total | 206 | 3,534 | 3,794 | 4 | 0 | — |

Text recall measures normalized character trigrams from browser-visible slide DOM versus PPTX native text runs. It is not a visual fidelity score. Export now fails if any page drops below 80% recall. The 4 pictures in v7 are genuine content screenshots, not full-slide backgrounds.

## Executed checks

- python3 tests/version_export_contract_test.py — PASS, covering all 206 page counts, native text/shape objects, anti-flattened images, diagram cases, dark backgrounds, Notes page alignment, and all 8 Current Exit Check answer pages.
- python3 tests/native_edit_roundtrip_test.py — PASS for all 3 versions: change actual text, drag text, drag a native card/diagram object, save and re-open, confirm changes persist.
- npm run check:versions — PASS, three independent version links, editable download links, HTML slide counts and toolbar.
- JS syntax, Python syntax, git diff --check — PASS.

## Source screenshot vs native SVG intermediate previews

These images show editable SVG primitives *before PPTX conversion* rendered by Chromium, not PowerPoint-native screenshots. All comparisons are representative samples, not exhaustive pixel-level proof.

| Version | Original static screenshot | Native SVG preview | Finding |
|---|---|---|---|
| v7 P3 diagram + arrows | [Original](images/v7-p3-static-original.png) | [Native preview](images/v7-p3-native-svg-preview.png) | Individual nodes/text/freeform arrowheads present; some line and corner styling differs. |
| v10 P3 Matching | [Original](images/v10-p3-static-original.png) | [Native preview](images/v10-p3-native-svg-preview.png) | Both phone cards restored after display:contents traversal fix; spacing differs. |
| Current P2 eight-part outline | [Original](images/current-p2-static-original.png) | [Native preview](images/current-p2-native-svg-preview.png) | All eight section cards and labels retained; some corner radius / line-wrap differences. |

## Acceptance / release

AC1–AC5: automated PASS — version counts, native text, native shapes/arrows, no whole-slide pictures, all original lecture Notes including 8 Exit Check answers.

AC6: PARTIAL — preview comparisons and programmatic edit/move/resave verified; real PowerPoint / Keynote GUI inspection, projected classroom legibility and exhaustive rendering remain NOT RUN. Do not claim pixel-perfect equivalence or fully signed-off visual QA.

AC7: automated PASS — reproducible exporter, version nav and default downloads switched to -editable.pptx, anti-flattening / no-missing-text regression tests. Old screenshot PPTX files are retained as explicitly static alternatives.

AC8: PASS — archived v7, v10 and Current source HTML / lesson content unchanged.

Owner Human Gate pending. Do not merge to public main or close Issue #58 based solely on tests.

Known limits: complex CSS effects, some SVG strokes, rounded corners, font metrics and wrapping may vary; web buttons/animations are not PowerPoint native (the PPTX renders an informative final state); arrows become editable DrawingML freeform paths, not dynamically rerouting connectors.

## Rebuild

Requires Python 3.10+, python-pptx, Node 18+, Chrome/Chromium:

    python3 -m venv .venv
    .venv/bin/python -m pip install -r requirements-dev.txt
    npm ci
    npm run export:pptx
    npm run check:exports
    python3 tests/native_edit_roundtrip_test.py
    npm run check:versions

Editable outputs: downloads/agent101-{v7,v10,current}-editable.pptx
Static screenshot backups: downloads/agent101-{v7,v10,current}.pptx
