#!/usr/bin/env python3
"""Rev13 instructional contract gate. Standard-library only.

Planning PASS proves traceability and structural completeness, NOT rendered
readability, real delivery, learner outcomes, or human approval.

Later phases (ready, implementation, review, released) require increasingly
strict evidence and an actual render. See docs/rev13-gates.md.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = "docs/rev13-scene-manifest.json"
STORYBOARD = "docs/rev13-workflow-first-content-refinement-v4.md"
PRESERVATION = "docs/rev13-agent-five-principles-preservation.md"
CONTRACT = "docs/rev13-visual-narrative-contract.md"

PHASES = [
    "opening", "brainstorming", "refinement", "ready", "dev", "review",
    "qa", "product_check", "human_gate", "agent_collaboration", "exercise",
]
KANBAN = ["Backlog", "Ready", "Dev", "Review", "QA", "Product Check", "Done"]
BEATS = {"overview", "spotlight", "work", "updated_overview", "exercise"}
STATES = {"pre_backlog", "backlog", "ready", "dev", "review", "qa",
          "product_check", "done", "not_applicable"}
EVIDENCE = {"illustration", "verified_rule_level", "mixed",
            "architecture_illustration", "framework", "exercise"}
ROLES = {"Owner", "PM", "PO", "UI/UX", "Dev", "Reviewer", "QA",
         "Human", "Agent", "Orchestrator", "Sub-agent"}
GITHUB_OBJECTS = {"issue", "project", "branch", "commit", "pull_request", "test_evidence"}
FIVE = {
    "A06": ("External Task State", 77, "P43"),
    "A07": ("Bounded Execution", 78, "P44"),
    "A08": ("Role Separation", 79, "P45"),
    "A09": ("Independent Verification", 80, "P46"),
    "A10": ("Goal Re-anchoring", 81, "P47"),
}
# The original overview is source P42 on Rev12 page 76.
BEFORE_AFTER = {
    "O02", "B04", "R05", "RD02", "D04", "RV03", "Q05",
    "PC02", "HG02", "A11",
}
PHASE_BEATS = [
    "brainstorming", "refinement", "ready", "dev",
    "review", "qa", "product_check", "human_gate", "agent_collaboration",
]
MINIMUM_SCENE_KEYS = {
    "id", "phase", "beat", "kanban_state", "focus_roles", "document_object",
    "version_github_relation", "github_objects", "evidence_scope",
    "source_storyboard",
}


def read(root: Path, path: str) -> str:
    return (root / path).read_text(encoding="utf-8")


def storyboard_rows(raw: str):
    rows = []
    for line in raw.splitlines():
        if not re.match(r"^\|\s*(?:O|B|R|RD|D|RV|Q|PC|HG|A|X)\d{2}\s*\|", line):
            continue
        cells = [x.strip().replace("**", "") for x in line.strip().strip("|").split("|")]
        rows.append(cells)
    return rows


def check_contract(root: Path, data: dict, story: str, readme: str,
                   contract: str, agents: str, old_story: str, preserve: str):
    errors: list[str] = []
    add = errors.append

    if data.get("content_storyboard") != STORYBOARD:
        add("manifest must point to canonical v4 storyboard")
    if data.get("visual_contract") != CONTRACT:
        add("manifest must point to canonical visual contract")
    if data.get("agent_principles") != PRESERVATION:
        add("manifest must point to canonical five-principles contract")
    if data.get("schema_version") != 1 or data.get("release") != "rev13":
        add("manifest schema/release mismatch")
    if data.get("workflow_states") != KANBAN:
        add("exact seven Kanban states must be preserved")
    if data.get("opening_sequence") != ["O01", "O02", "O03"]:
        add("first scenes must be four foundations → fifth Agent → Matching example")
    if data.get("global_principles") != [f"P{n}" for n in range(18, 24)]:
        add("all P18–P23 must be enforced")
    if not data.get("require_full_human_qa_before_release"):
        add("human release quality gate must not be disabled")
    if data.get("required_human_gates") != ["G1", "G2", "G3", "G4", "G5"]:
        add("required G1–G5 gate order mismatch")

    for path, body in [("README", readme), ("visual contract", contract)]:
        for number in range(18, 24):
            if not re.search(r"\|\s*\*{2}P" + str(number) + r"\*{2}\s*\|", body):
                add(f"{path}: missing global principle P{number}")
    if STORYBOARD not in agents or PRESERVATION not in agents:
        add("AGENTS.md must link current v4 and five-principles source")
    if STORYBOARD not in readme or PRESERVATION not in readme:
        add("README must link v4 and the five-principles source")

    rows = storyboard_rows(story)
    ids = [r[0] for r in rows if r]
    if any(len(r) != 6 for r in rows):
        add("v4 storyboard rows must have exactly 6 columns (including Documents)")
    if len(ids) != len(set(ids)):
        add("duplicate storyboard scene IDs")
    for row in rows:
        if len(row) != 6:
            continue
        ident, title, focus, document, version, evidence = row
        if not all([title, focus, document, version, evidence]):
            add(f"{ident}: empty required focus/document/version/evidence field")
        if ident == "O01" and not all(x in (" ".join(row)) for x in ["人", "流程", "文件", "版本管理"]):
            add("O01 must visibly introduce all four foundations")
        if ident == "O02" and ("Agent" not in " ".join(row) or "第五" not in " ".join(row)):
            add("O02 must add Agent as the fifth, without replacing four")

    if ids[:3] != ["O01", "O02", "O03"]:
        add("storyboard opening changed or is out of order")
    index = {x: i for i, x in enumerate(ids)}
    for ident in ("A05", "A06", "A07", "A08", "A09", "A10", "A11", "X01"):
        if ident not in index:
            add(f"missing mainline agent five-principles scene {ident}")
    if all(x in index for x in ("A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "X01")):
        if [index[x] for x in ("A04","A05","A06","A07","A08","A09","A10","A11","X01")] != sorted(index[x] for x in ("A04","A05","A06","A07","A08","A09","A10","A11","X01")):
            add("the five principles must follow agent modes, precede final exercise, and retain original order")

    actual = data.get("scenes", [])
    m_ids = [x.get("id") for x in actual]
    if m_ids != ids:
        add("manifest scene IDs/order must exactly match v4 storyboard")
    if len(m_ids) != len(set(m_ids)):
        add("duplicate manifest scene ID")
    rank = -1
    for s in actual:
        ident = s.get("id", "<missing>")
        missing = MINIMUM_SCENE_KEYS - set(s)
        if missing:
            add(f"{ident}: missing metadata fields {sorted(missing)}")
            continue
        phase = s["phase"]
        if phase not in PHASES:
            add(f"{ident}: unknown phase {phase}")
        else:
            position = PHASES.index(phase)
            if position < rank:
                add(f"{ident}: phase moved backward; explicitly plan a return/rewind")
            rank = max(rank, position)
        if not s["beat"] or set(s["beat"]) - BEATS:
            add(f"{ident}: invalid narrative beat")
        if s["kanban_state"] not in STATES:
            add(f"{ident}: invalid Kanban state")
        if not s["focus_roles"] or set(s["focus_roles"]) - ROLES:
            add(f"{ident}: missing/unknown co-workers")
        if not s["document_object"].strip():
            add(f"{ident}: current document or ticket work missing")
        if not s["version_github_relation"].strip():
            add(f"{ident}: version/GitHub/transition relation missing")
        if set(s["github_objects"]) - GITHUB_OBJECTS:
            add(f"{ident}: unknown GitHub artifact kind")
        if s["evidence_scope"] not in EVIDENCE:
            add(f"{ident}: unknown evidence class")
        if s["source_storyboard"] != STORYBOARD:
            add(f"{ident}: source storyboard link drift")
        if "updated_overview" in s["beat"]:
            state = s.get("state_delta")
            if not isinstance(state, dict) or not state.get("before") or not state.get("after"):
                add(f"{ident}: Updated Overview must declare before and after")
            elif state["before"] == state["after"]:
                add(f"{ident}: Updated Overview repeats identical state")
        if ident in FIVE:
            name, page, source = FIVE[ident]
            if (s.get("agent_principle"), s.get("old_rev12_page"), s.get("source_id")) != (name,page,source):
                add(f"{ident}: five-principle source mapping missing/changed")
            row_text = " ".join(rows[index[ident]]) if ident in index else ""
            if name not in row_text:
                add(f"{ident}: required original principle name absent from visible slide claim")
            if name not in preserve:
                add(f"{ident}: preservation contract missing {name}")
            if not re.search(r"^\|" + str(page) + r"\|[^\n]*\|" + source + r"\|", old_story, re.M):
                add(f"{ident}: Rev12 page/source not traceable")
    if set(x for x in ids if x in BEFORE_AFTER) != BEFORE_AFTER:
        add("Updated Overview scene inventory changed unexpectedly")
    for phase in PHASE_BEATS:
        in_phase = [s for s in actual if s.get("phase") == phase]
        present = set(k for s in in_phase for k in s.get("beat", []))
        if not {"spotlight", "work", "updated_overview"} <= present:
            add(f"{phase}: missing spotlight/work/updated overview narrative beat")
        if phase == "agent_collaboration" and "overview" not in present:
            add("agent collaboration must first re-anchor same mother map")

    titles = {r[0]: " ".join(r) for r in rows if len(r) == 6}
    for ident, expected in {
        "Q02": ["Version A", "FAIL"], "Q03": ["B-pre","NOT RUN"],
        "Q04": ["B-post","PASS"], "Q05": ["NOT RUN"],
        "A06": ["External Task State"], "A07": ["Bounded Execution"],
        "A08": ["Role Separation"], "A09": ["Independent Verification","NOT RUN"],
        "A10": ["Goal Re-anchoring"],
    }.items():
        for word in expected:
            if word not in titles.get(ident, ""):
                add(f"{ident}: key evidence or title {word!r} missing")
    for ident in ("Q02","Q03","Q04"):
        item = next((x for x in actual if x.get("id") == ident), {})
        if item.get("evidence_scope") != "verified_rule_level":
            add(f"{ident}: actual rule-level test evidence must not be reclassified")
    for ident in ("A03","A04"):
        item = next((x for x in actual if x.get("id") == ident), {})
        if item.get("evidence_scope") != "architecture_illustration":
            add(f"{ident}: multi-agent demo is illustrative; do not claim real execution")
    for ident in ("Q05","A09","A11"):
        item = next((x for x in actual if x.get("id") == ident), {})
        if item.get("evidence_scope") != "mixed" or "release" not in item.get("unverified_scopes", []):
            add(f"{ident}: incomplete evidence scope must remain explicit")

    stage = data.get("development_phase")
    if stage not in {"refinement","ready","implementation","review","released"}:
        add(f"unknown delivery stage {stage}")
    if stage in {"ready","implementation","review","released"}:
        path = root / "docs/reviews/rev13-gates.json"
        if not path.exists():
            add("ready+ requires traceable G1 review evidence at docs/reviews/rev13-gates.json")
        else:
            gate_data = json.loads(path.read_text())
            if gate_data.get("G1",{}).get("result") != "PASS" or not gate_data.get("G1",{}).get("reviewer"):
                add("ready+ cannot skip independent G1 and evidence")
    if stage in {"implementation","review","released"}:
        check_rendered(root, actual, errors)
    if stage in {"review","released"}:
        path = root / "docs/reviews/rev13-gates.json"
        if path.exists():
            gate_data = json.loads(path.read_text())
            for gate in ("G2","G3","G4") + (("G5",) if stage == "released" else ()):
                item = gate_data.get(gate,{})
                if item.get("result") != "PASS" or not item.get("evidence"):
                    add(f"{stage} cannot declare {gate} PASS without evidence")
    return errors


class SlideParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.slides = []
    def handle_starttag(self, tag, attrs):
        props = dict(attrs)
        if "data-rev13-scene-id" in props:
            self.slides.append(props)


def check_rendered(root: Path, scenes: list[dict], errors: list[str]):
    """Fail closed once implementation is declared; no placeholder render passes."""
    artifact = root / "slides/rev13/index.html"
    if not artifact.exists():
        errors.append("implementation requires actual slides/rev13/index.html")
        return
    parser = SlideParser()
    parser.feed(artifact.read_text(encoding="utf-8"))
    ids = [s.get("data-rev13-scene-id") for s in parser.slides]
    if ids != [s["id"] for s in scenes]:
        errors.append("rendered slides must cover scenes in the storyboard order")
    for props in parser.slides:
        ident = props["data-rev13-scene-id"]
        for field in ("data-phase","data-focus-roles","data-doc-ref",
                      "data-version-ref","data-github-ref","data-beat",
                      "data-mother-map-id"):
            if not props.get(field):
                errors.append(f"{ident}: rendered slide missing {field}")
        if props.get("data-mother-map-id") != "rev13-four-foundations":
            errors.append(f"{ident}: changed common mother map identity")
    # Browser pixels, true legibility, PowerPoint editability and independent
    # pedagogy require separate evidence; HTML attributes alone do not prove them.


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=ROOT)
    args = parser.parse_args()
    root = args.root
    try:
        manifest = json.loads(read(root, MANIFEST))
        errors = check_contract(
            root, manifest, read(root, STORYBOARD), read(root, "README.md"),
            read(root, CONTRACT), read(root, "AGENTS.md"),
            read(root, "docs/issue48-execution-storyboard.md"), read(root, PRESERVATION),
        )
    except (OSError, ValueError) as exc:
        print(f"FAIL [Rev13 contract] file/schema error: {exc}", file=sys.stderr)
        return 1
    if errors:
        print(f"FAIL [Rev13 contract] {len(errors)} violations", file=sys.stderr)
        for message in errors:
            print(f" - {message}", file=sys.stderr)
        return 1
    print(
        f"PASS [Rev13 {manifest['development_phase']} contract only]: "
        f"{len(manifest['scenes'])} traceable scenes, all five Rev12 Agent "
        "principles preserved in CORE, P18–P23 and state deltas checked."
    )
    print("NOTE: automated PASS is NOT G1–G5, visual QA, editable PPTX QA, "
          "learner testing, or release authorization.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
