"""Regression tests proving the Rev13 contract rejects missing or misleading work.

These tests simulate intentional violations of the storyboard and metadata.
No browser or PowerPoint is present; rendered visual QA is a separate gate.
"""
from __future__ import annotations

import copy
import json
import sys
import unittest
from pathlib import Path

TESTS = Path(__file__).resolve().parent
sys.path.insert(0, str(TESTS))
import rev13_contract_check as gate  # noqa: E402


class Rev13GateTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        root = gate.ROOT
        cls.root = root
        cls.manifest = json.loads(gate.read(root, gate.MANIFEST))
        cls.story = gate.read(root, gate.STORYBOARD)
        cls.readme = gate.read(root, "README.md")
        cls.contract = gate.read(root, gate.CONTRACT)
        cls.agents = gate.read(root, "AGENTS.md")
        cls.old = gate.read(root, "docs/issue48-execution-storyboard.md")
        cls.preserve = gate.read(root, gate.PRESERVATION)

    def errors(self, manifest=None, story=None, readme=None):
        return gate.check_contract(
            self.root,
            copy.deepcopy(self.manifest) if manifest is None else manifest,
            self.story if story is None else story,
            self.readme if readme is None else readme,
            self.contract, self.agents, self.old, self.preserve,
        )

    def test_current_refinement_passes_structure_only(self):
        self.assertEqual(self.errors(), [])

    def test_removing_one_of_the_five_principles_fails(self):
        broken = copy.deepcopy(self.manifest)
        broken["scenes"] = [s for s in broken["scenes"] if s["id"] != "A08"]
        problems = self.errors(manifest=broken)
        self.assertTrue(any("A08" in text or "manifest scene IDs" in text for text in problems))

    def test_erasing_a_document_artifact_fails(self):
        broken = copy.deepcopy(self.manifest)
        next(s for s in broken["scenes"] if s["id"] == "R03")["document_object"] = ""
        self.assertTrue(any("R03" in text and "document" in text for text in self.errors(manifest=broken)))

    def test_missing_not_run_fails(self):
        broken = self.story.replace("B-pre 單向／雙向 PASS；duplicate NOT RUN",
                                    "B-pre 單向／雙向 PASS；duplicate PASS")
        self.assertNotEqual(broken, self.story)
        self.assertTrue(any("Q03" in text for text in self.errors(story=broken)))

    def test_false_stable_overview_fails(self):
        broken = copy.deepcopy(self.manifest)
        item = next(s for s in broken["scenes"] if s["id"] == "B04")
        item["state_delta"]["after"] = item["state_delta"]["before"]
        self.assertTrue(any("B04" in text and "identical" in text for text in self.errors(manifest=broken)))

    def test_missing_global_principle_fails(self):
        broken = self.readme.replace("| **P23** |", "| **PXX** |")
        self.assertTrue(any("P23" in text for text in self.errors(readme=broken)))

    def test_premature_implementation_without_render_fails(self):
        broken = copy.deepcopy(self.manifest)
        broken["development_phase"] = "implementation"
        problems = self.errors(manifest=broken)
        self.assertTrue(any("requires" in text and "G1" in text for text in problems))
        self.assertTrue(any("requires actual slides/rev13/index.html" in text for text in problems))


if __name__ == "__main__":
    unittest.main()
