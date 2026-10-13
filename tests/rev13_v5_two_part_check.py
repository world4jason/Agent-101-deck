#!/usr/bin/env python3
"""Rev13 v5 two-part pre-training and application content-only gate.

This is a LOCAL structural check. It does not run browser/PPTX QA and does
not modify or depend on GitHub Actions or branch protection.
"""
from __future__ import annotations

import argparse
import json
import sys
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
EXPECTED_FIRST = ["O01", "O02", "C01"]
PRINCIPLE_IDS = ["A05", "A06", "A07", "A08", "A09", "A10", "A11"]
SCENE_KINDS = {
    "foundation-overview", "foundation-overlay", "map", "template", "stage",
    "roles", "roles-matrix", "documents", "documents-lifecycle",
    "documents-boundary", "version-github", "version-history", "agent-intro",
    "exit-check",
}
REQUIRED_STAGE_FIELDS = {
    "key", "label", "kanban_state", "product_goal_reference", "stage_target",
    "input", "activities", "output", "exit", "lead_roles", "co_roles",
    "github", "rev12_pages",
}


def load(root: Path):
    return (
        json.loads((root / MANIFEST).read_text(encoding="utf-8")),
        json.loads((root / BASE).read_text(encoding="utf-8")),
        (root / CURRENT).read_text(encoding="utf-8"),
        (root / "README.md").read_text(encoding="utf-8"),
        (root / "AGENTS.md").read_text(encoding="utf-8"),
        (root / PRINCIPLES).read_text(encoding="utf-8"),
    )


def violations(doc: dict, base: dict, story: str, readme: str,
               agents: str, preserved: str) -> list[str]:
    failures: list[str] = []
    fail = failures.append
    if doc.get("revision") != "rev13-v5-two-part":
        fail("v5 schema identity missing")
    if doc.get("development_phase") != "refinement":
        fail("two-part planning cannot declare Ready/Implementation without G1")
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
    if doc.get("core_part1") != ids1 or ids1[:3] != EXPECTED_FIRST:
        fail("Part 1 opening must be O01 four foundations → O02 fifth Agent → C01 workflow")
    if ids1 != ["O01", "O02"] + [f"C{n:02}" for n in range(1, 21)]:
        fail("Part 1 inventory must cover all 22 pre-training scenes")
    if ids2 != [x["id"] for x in base.get("scenes", [])[2:]]:
        fail("Part 2 must preserve O03–X01 original 40-scene order from v4")
    if len(all_ids) != 62 or len(set(all_ids)) != 62:
        fail("two-part scene coverage/uniqueness 22+40 violated")
    for scene in part1:
        ident = scene.get("id", "unknown")
        if scene.get("kind") not in SCENE_KINDS:
            fail(f"{ident}: invalid scene kind")
        if not scene.get("focus") or not scene.get("cue") or not scene.get("rev12_pages"):
            fail(f"{ident}: need learning focus, visible locator/transition and old-source pages")
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
    print("PASS [Rev13 v5 refinement only]: 22 Part 1 + 40 Part 2 scenes, "
          "nine Stage Contracts, People/Documents/GitHub matrix, "
          "five Rev12 Agent principles retained.")
    print("NOTE: local structural PASS is NOT visual/learning QA, Ready, "
          "GitHub Actions PASS, native PPTX QA, or merge approval.")
    return 0


if __name__=="__main__":
    raise SystemExit(main())
