"""Run one resettable, rule-level Matching #3 teaching case."""

import argparse
import copy
import hashlib
import importlib.util
import json
from pathlib import Path


PACKAGE = Path(__file__).resolve().parent
FIXTURE = PACKAGE / "fixtures" / "users.json"
CASES = {
    "one-way": [("an", "qing")],
    "two-way": [("an", "qing"), ("qing", "an")],
    "duplicate": [("an", "qing")],
}
SETUP_ACTIONS = {
    "one-way": [],
    "two-way": [],
    "duplicate": [("an", "qing"), ("qing", "an")],
}
EXPECTED_BEFORE_MATCHES = {
    "one-way": [],
    "two-way": [],
    "duplicate": [{"id": "M01", "users": ["an", "qing"]}],
}
EXPECTED_MATCHES = {
    "one-way": [],
    "two-way": [{"id": "M01", "users": ["an", "qing"]}],
    "duplicate": [{"id": "M01", "users": ["an", "qing"]}],
}


def load_artifact(path):
    spec = importlib.util.spec_from_file_location("matching_candidate", path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load artifact: {path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--artifact", required=True, type=Path)
    parser.add_argument("--candidate-id", required=True, choices=("A", "B"))
    parser.add_argument("--case", required=True, choices=tuple(CASES))
    args = parser.parse_args()

    artifact = args.artifact.resolve()
    fixture_data = json.loads(FIXTURE.read_text(encoding="utf-8"))
    module = load_artifact(artifact)
    state = module.new_state(fixture_data)
    reset_state = copy.deepcopy(state)

    setup_actions = []
    for actor, target in SETUP_ACTIONS[args.case]:
        setup_actions.append({"actor": actor, "target": target})
        module.like(state, actor, target)
    before = copy.deepcopy(state)

    actions = []
    for actor, target in CASES[args.case]:
        actions.append({"actor": actor, "target": target})
        module.like(state, actor, target)

    expected_before_matches = EXPECTED_BEFORE_MATCHES[args.case]
    expected_matches = EXPECTED_MATCHES[args.case]
    actual_before_matches = before["matches"]
    actual_matches = state["matches"]
    passes = (
        actual_before_matches == expected_before_matches
        and actual_matches == expected_matches
    )
    payload = {
        "teaching_environment": True,
        "candidate_id": args.candidate_id,
        "artifact": artifact.relative_to(PACKAGE).as_posix(),
        "artifact_sha256": hashlib.sha256(artifact.read_bytes()).hexdigest(),
        "fixture": FIXTURE.relative_to(PACKAGE).as_posix(),
        "case": args.case,
        "validation_layer": "Matching #3 rules and records",
        "reset_state": reset_state,
        "setup_actions": setup_actions,
        "before": before,
        "actions": actions,
        "expected": {
            "before_match_count": len(expected_before_matches),
            "before_match_records": expected_before_matches,
            "match_count": len(expected_matches),
            "match_records": expected_matches,
        },
        "actual": {
            "before_match_count": len(actual_before_matches),
            "before_match_records": actual_before_matches,
            "match_count": len(actual_matches),
            "match_records": actual_matches,
            "likes": state["likes"],
        },
        "status": "PASS" if passes else "FAIL",
        "ui_and_product_integration": "NOT RUN",
    }
    print(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True))
    return 0 if payload["status"] == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
