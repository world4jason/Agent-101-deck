#!/usr/bin/env python3
"""Rev13 v5 two-part pre-training and application content-only gate.

This is a LOCAL structural check. It does not run browser/PPTX QA and does
not modify or depend on GitHub Actions or branch protection.
"""
from __future__ import annotations

import argparse
import json
import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CURRENT = "docs/rev13-two-part-learning-architecture-v5.md"
MANIFEST = "docs/rev13-two-part-manifest-v5.json"
BASE = "docs/rev13-scene-manifest.json"
PRINCIPLES = "docs/rev13-agent-five-principles-preservation.md"
EXPECTED_STAGE_KEYS = [
    "brainstorming", "refinement", "ready", "dev", "review", "qa",
    "product_check", "human_gate", "release_done",
]
ROLES = {"Owner", "PM", "PO", "UI/UX", "Dev", "Reviewer", "QA"}
SEVEN = ["Backlog", "Ready", "Dev", "Review", "QA", "Product Check", "Done"]
FIVE = [
    "External Task State", "Bounded Execution", "Role Separation",
    "Independent Verification", "Goal Re-anchoring",
]
EXPECTED_FIRST = ["O01"]
PRINCIPLE_IDS = ["A05", "A06", "A07", "A08", "A09", "A10", "A11"]
SCENE_KINDS = {
    "foundation-overview", "foundation-overlay", "map", "template", "stage",
    "roles", "roles-matrix", "documents", "documents-lifecycle",
    "documents-boundary", "version-github", "version-history", "agent-intro",
    "exit-check", "idea-roadmap", "upstream-methods", "idea-goal",
    "epic-journey", "story-list", "story-quality", "rules-examples",
    "decision-table", "task-spec-bridge",
}
REQUIRED_STAGE_FIELDS = {
    "key", "label", "kanban_state", "product_goal_reference", "stage_target",
    "input", "activities", "output", "exit", "lead_roles", "co_roles",
    "github", "rev12_pages",
}


def load(root: Path):
    slide_path = root / "slides/rev13/index.html"
    return (
        json.loads((root / MANIFEST).read_text(encoding="utf-8")),
        json.loads((root / BASE).read_text(encoding="utf-8")),
        (root / CURRENT).read_text(encoding="utf-8"),
        (root / "README.md").read_text(encoding="utf-8"),
        (root / "AGENTS.md").read_text(encoding="utf-8"),
        (root / PRINCIPLES).read_text(encoding="utf-8"),
        slide_path.read_text(encoding="utf-8") if slide_path.exists() else "",
    )


class ImplementedSlideParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.slides: list[dict[str, str | None]] = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "section" and "slide" in (values.get("class") or "").split():
            self.slides.append(values)


def violations(doc: dict, base: dict, story: str, readme: str,
               agents: str, preserved: str, slides_html: str = "") -> list[str]:
    failures: list[str] = []
    fail = failures.append
    if doc.get("revision") != "rev13-v5-two-part":
        fail("v5 schema identity missing")
    development_phase = doc.get("development_phase")
    if development_phase not in {"refinement", "implementation"}:
        fail("two-part delivery phase must be refinement or implementation")
    if doc.get("canonical_storyboard") != CURRENT:
        fail("wrong canonical v5 storyboard")
    if doc.get("previous_manifest") != BASE or doc.get("previous_storyboard") != base.get("content_storyboard"):
        fail("v5 lost the traceable v4 source")
    if doc.get("workflow_mutation_policy") != "do not edit .github/workflows while Actions is unavailable; all v5 checks run locally only":
        fail("GitHub workflow freeze policy missing")
    if doc.get("foundations") != ["People", "Process", "Documents", "Version Control"] or doc.get("agent_fifth") != "Agent":
        fail("four foundations plus fifth Agent missing or changed")
    if doc.get("seven_kanban_states") != SEVEN:
        fail("seven canonical Kanban columns changed")

    part1 = doc.get("part1_scenes", [])
    ids1 = [x.get("id") for x in part1]
    ids2 = doc.get("core_part2", [])
    all_ids = ids1 + ids2
    idea_ids = [f"I2T{n:02}" for n in range(1, 10)]
    expected_part1 = ["O01", *idea_ids, "C05", "C02", "C07", "C06"] + [f"C{n:02}" for n in range(11, 20)] + ["C01", "C03", "C04", "C20"]
    expected_part2 = [x["id"] for x in base.get("scenes", [])[2:]]
    expected_part2.insert(expected_part2.index("D02") + 1, "C08")
    expected_part2.insert(expected_part2.index("D02") + 2, "C09")
    agent_start = expected_part2.index("A01")
    expected_part2 = expected_part2[:agent_start] + ["O02", "C10"] + expected_part2[agent_start:]
    if doc.get("core_part1") != ids1 or ids1[:1] != EXPECTED_FIRST:
        fail("Part 1 must open with O01, then show the idea-to-ticket sequence before the shared ticket")
    if ids1 != expected_part1:
        fail("Part 1 must teach idea-to-ticket, then the ticket, stages, roles, role-stage map, and practice")
    if ids2 != expected_part2:
        fail("Part 2 must place Git/GitHub after Dev starts and O02/C10 after HG02")
    if len(ids1) != 27 or len(ids2) != 44 or len(all_ids) != 71 or len(set(all_ids)) != 71:
        fail("two-part scene coverage/uniqueness 27+44 violated")
    if development_phase == "implementation":
        parser = ImplementedSlideParser()
        parser.feed(slides_html)
        parser.close()
        expected_map = doc.get("implementation_slide_map", [])
        rendered_map = []
        for item in parser.slides:
            merged = [value.strip() for value in (item.get("data-rev13-merged-scenes") or "").split(",") if value.strip()]
            try:
                page = int(item.get("data-page") or "")
            except ValueError:
                page = -1
            rendered_map.append({
                "page": page,
                "scene_id": item.get("data-rev13-scene-id"),
                "merged_scene_ids": merged,
            })
        if not expected_map or rendered_map != expected_map:
            fail("implementation slide map must match the manifest")
        mapped_ids = [
            scene_id
            for item in rendered_map
            for scene_id in [item.get("scene_id"), *item.get("merged_scene_ids", [])]
            if scene_id
        ]
        if set(mapped_ids) != set(all_ids):
            fail("implementation must trace all 71 scenes across mapped slide sections")
        if parser.slides[0].get("data-rev13-scene-id") != "O01" or parser.slides[1].get("data-rev13-merged-scenes") != "O01":
            fail("implementation must open with the four foundations and shared course outline")
        if [item.get("data-rev13-scene-id") for item in parser.slides[2:11]] != idea_ids:
            fail("implementation must show all nine idea-to-ticket scenes after the outline")
        if [item.get("data-ticket-step") for item in parser.slides[11:16]] != [str(step) for step in range(1, 6)]:
            fail("implementation must reveal the five parts of one ticket after Task/Spec")
        if [item.get("data-rev13-scene-id") for item in parser.slides[16:25]] != [f"C{n:02}" for n in range(11, 20)]:
            fail("implementation must introduce all nine stages before the roles")
        if [item.get("data-rev13-scene-id") for item in parser.slides[25:29]] != ["C01", "C03", "C04", "C20"]:
            fail("implementation must follow stages with the process map, roles, role-stage map, and practice")
        if any(item.get("data-agent") != "false" for item in parser.slides[:58]):
            fail("the human-only section must not render an Agent row")
        if parser.slides[58].get("data-rev13-scene-id") != "O02" or parser.slides[58].get("data-agent") != "true":
            fail("the Agent chapter must start after the human flow")
        post_human_scenes = []
        for item in parser.slides[29:]:
            linked = [item.get("data-rev13-scene-id"), *(item.get("data-rev13-merged-scenes") or "").split(",")]
            for scene_id in (value.strip() for value in linked if value):
                if scene_id and scene_id not in post_human_scenes:
                    post_human_scenes.append(scene_id)
        if post_human_scenes != ids2:
            fail("implementation must place O02/C10 after the human flow and before A01")
        if parser.slides[59].get("data-rev13-scene-id") != "C10":
            fail("the Agent chapter must open with O02 followed by the C10 definition")
        if len(parser.slides) != len(expected_map):
            fail("implementation must contain every slide listed in the scene map")
        required = {
            "data-page", "data-phase", "data-focus-roles",
            "data-doc-ref", "data-version-ref", "data-github-ref", "data-beat",
            "data-mother-map-id",
        }
        for page, attrs in enumerate(parser.slides, start=1):
            if attrs.get("data-page") != str(page) or attrs.get("id") != f"page-{page}":
                fail(f"slide {page}: implementation page numbers/IDs must be contiguous")
            missing = [name for name in required if not attrs.get(name)]
            if missing:
                fail(f"slide {page}: implementation metadata missing {', '.join(sorted(missing))}")
            if not attrs.get("data-rev13-scene-id") and not attrs.get("data-rev13-merged-scenes"):
                fail(f"slide {page}: implementation slide must link a scene through its primary or merged scene metadata")
            if attrs.get("data-mother-map-id") != "rev13-four-foundations":
                fail(f"slide {page}: implementation changed the shared mother map ID")
            if page >= 4 and not attrs.get("data-learning-step"):
                fail(f"slide {page}: the idea-to-acceptance route must mark the current step")
    idea_kinds = ["idea-roadmap", "upstream-methods", "idea-goal", "epic-journey", "story-list", "story-quality", "rules-examples", "decision-table", "task-spec-bridge"]
    expected_kinds = ["foundation-overview", *idea_kinds, "documents", "template", "documents-boundary", "documents-lifecycle"] + ["stage"] * 9 + ["map", "roles", "roles-matrix", "exit-check"]
    if [x.get("kind") for x in part1] != expected_kinds:
        fail("Part 1 must teach the idea-to-ticket route, ticket, stages, roles, role-stage map, and practice in order")
    if [x.get("kind") for x in part1[14:23]] != ["stage"] * 9:
        fail("Part 1 must teach all nine Stage Cards before roles and the role-stage map")
    for scene in part1:
        ident = scene.get("id", "unknown")
        if scene.get("kind") not in SCENE_KINDS:
            fail(f"{ident}: invalid scene kind")
        has_old_source = bool(scene.get("rev12_pages"))
        has_new_owner_source = scene.get("source_refs") == ["docs/rev13-design-principles.md#2b", "Owner decision 2026-10-17"]
        if not scene.get("focus") or not scene.get("cue") or not (has_old_source or has_new_owner_source):
            fail(f"{ident}: need learning focus, transition and a traceable source")
        if scene.get("kind") == "stage" and scene.get("stage_key") not in EXPECTED_STAGE_KEYS:
            fail(f"{ident}: missing stage contract link")
        if scene.get("kind") != "stage" and "stage_key" in scene:
            fail(f"{ident}: only stage scenes may reference stage_key")

    stages = doc.get("stage_contracts", [])
    if [x.get("key") for x in stages] != EXPECTED_STAGE_KEYS:
        fail("all nine Stage Contracts must be present in fixed workflow order")
    for stage in stages:
        ident = stage.get("key", "unknown")
        missing = REQUIRED_STAGE_FIELDS - set(stage)
        if missing:
            fail(f"Stage {ident}: fields missing {sorted(missing)}")
            continue
        for key in ("product_goal_reference","stage_target","input","activities","output","exit","github"):
            if not isinstance(stage[key], str) or not stage[key].strip():
                fail(f"Stage {ident}: {key} cannot be blank")
        if not stage["lead_roles"] or set(stage["lead_roles"]+stage["co_roles"])-ROLES:
            fail(f"Stage {ident}: invalid or missing co-working roles")
        if not stage["rev12_pages"]:
            fail(f"Stage {ident}: not traceable to original Rev12")
        if ident == "refinement" and stage["kanban_state"] != "Backlog":
            fail("Refinement cannot become another Kanban column")
        if ident == "human_gate" and "欄外" not in stage["kanban_state"]:
            fail("Human Gate cannot become eighth Kanban column")
    scene_stage_keys = [x["stage_key"] for x in part1 if x.get("kind")=="stage"]
    if scene_stage_keys != EXPECTED_STAGE_KEYS:
        fail("Stage Cards do not cover the nine definitions in correct order")

    people = doc.get("roles", [])
    if {r.get("role") for r in people} != ROLES:
        fail("Roles × Stages matrix missing a canonical human role")
    if not all(isinstance(r.get("primary"), list) and isinstance(r.get("collaborate"), list) and r.get("note") for r in people):
        fail("each role needs participation and responsibility information")
    if len(doc.get("documents", [])) < 6 or not all(x.get("goal") and x.get("github") for x in doc.get("documents", [])):
        fail("Documents lifecycle needs types, purpose, and mapping to GitHub")
    if len(doc.get("github_concepts", [])) < 6 or not all(x.get("role") for x in doc.get("github_concepts", [])):
        fail("Git/GitHub object map missing or unexplained")
    if doc.get("preserved_agent_principles") != FIVE:
        fail("Rev12 five mandatory Agent learning principles missing")
    if doc.get("preserved_agent_scene_ids") != PRINCIPLE_IDS:
        fail("A05–A11 Agent CORE scenes lost")
    for item in FIVE:
        if item not in preserved or item not in story:
            fail(f"Agent five principle {item} no longer explicitly retained")
    if doc.get("preserved_visual_principles") != [f"P{n}" for n in range(18,24)]:
        fail("visual Principles P18–P23 must remain enforced")

    for path, contents in [("README",readme),("AGENTS",agents)]:
        if CURRENT not in contents or MANIFEST not in contents:
            fail(f"{path}: v5 current SSOT links missing")
        if "rev13-workflow-first-content-refinement-v4.md" not in contents:
            fail(f"{path}: historical Part 2 evidence path missing")
    for needle in ("Part 1", "Part 2", "Product Goal", "Stage Target",
                   "Input", "Output", "Exit Criteria", "Roles × Stages"):
        if needle not in story:
            fail(f"v5 storyboard missing {needle}")
    for ident in all_ids:
        if ident not in story:
            fail(f"v5 storyboard does not trace scene ID {ident}")
    if "NOT RUN" not in story:
        fail("do not hide unverified UI/E2E/Release evidence")
    return failures


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", type=Path, default=ROOT)
    args = ap.parse_args()
    try:
        problems = violations(*load(args.root))
    except (OSError, ValueError) as exc:
        print(f"FAIL [Rev13 v5] cannot read contract: {exc}", file=sys.stderr)
        return 1
    if problems:
        print(f"FAIL [Rev13 v5] {len(problems)} violations",file=sys.stderr)
        for p in problems:
            print(" - "+p,file=sys.stderr)
        return 1
    phase = json.loads((args.root / MANIFEST).read_text(encoding="utf-8"))["development_phase"]
    print(f"PASS [Rev13 v5 {phase} content]: 27 Part 1 + 44 Part 2 scenes, "
          "nine Stage Contracts, People/Documents/GitHub matrix, "
          "five Rev12 Agent principles retained.")
    print("NOTE: local structural PASS is NOT visual/learning QA, Ready, "
          "GitHub Actions PASS, native PPTX QA, or merge approval.")
    return 0


if __name__=="__main__":
    raise SystemExit(main())
