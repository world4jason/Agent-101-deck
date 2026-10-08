import hashlib
import json
import os
import subprocess
import sys
import unittest
from pathlib import Path


PACKAGE = Path(__file__).resolve().parents[1]
RUN_CASE = PACKAGE / "run_case.py"
CANDIDATE = PACKAGE / "candidate" / "matching.py"


def run_case(case):
    return subprocess.run(
        [
            sys.executable,
            str(RUN_CASE),
            "--artifact",
            str(CANDIDATE),
            "--candidate-id",
            os.environ.get("MATCHING_CANDIDATE_ID", "B"),
            "--case",
            case,
        ],
        capture_output=True,
        text=True,
        check=False,
    )


class MatchingDemoTests(unittest.TestCase):
    def assert_case_passes(self, case, expected_count, expected_before_count=0):
        result = run_case(case)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        payload = json.loads(result.stdout)
        self.assertEqual(len(payload["before"]["matches"]), expected_before_count)
        self.assertEqual(payload["status"], "PASS")
        self.assertEqual(
            payload["artifact_sha256"],
            hashlib.sha256(CANDIDATE.read_bytes()).hexdigest(),
        )
        self.assertTrue(payload["teaching_environment"])
        self.assertEqual(
            payload["expected"]["before_match_count"], expected_before_count
        )
        self.assertEqual(
            payload["actual"]["before_match_count"], expected_before_count
        )
        self.assertEqual(payload["expected"]["match_count"], expected_count)
        self.assertEqual(payload["actual"]["match_count"], expected_count)
        self.assertEqual(
            payload["expected"]["match_records"], payload["actual"]["match_records"]
        )
        self.assertEqual(payload["ui_and_product_integration"], "NOT RUN")
        return payload

    def test_one_way_like_does_not_create_a_match(self):
        self.assert_case_passes("one-way", 0)

    def test_two_way_like_creates_one_match(self):
        self.assert_case_passes("two-way", 1)

    def test_repeated_like_keeps_one_match_record(self):
        payload = self.assert_case_passes(
            "duplicate", 1, expected_before_count=1
        )
        self.assertEqual(len(payload["setup_actions"]), 2)
        self.assertEqual(
            payload["actions"], [{"actor": "an", "target": "qing"}]
        )


if __name__ == "__main__":
    unittest.main()
