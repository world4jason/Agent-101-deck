"""Local negative regression tests for Rev13 v5 two-part architecture.

Runs without network or GitHub Actions; not a substitute for G1/G4 review.
"""
import copy
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import rev13_v5_two_part_check as gate


class TwoPartContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.original = gate.load(gate.ROOT)

    def errors(self, mutate=None, story=None):
        data, base, source, readme, agents, preserved, slides_html = self.original
        broken = copy.deepcopy(data)
        if mutate:
            mutate(broken)
        return gate.violations(broken, base, source if story is None else story,
                               readme, agents, preserved, slides_html)

    def test_current_v5_phase_is_structurally_valid(self):
        self.assertEqual(self.errors(), [])

    def test_implementation_accepts_complete_deck(self):
        self.assertEqual(self.errors(lambda data: data.update(development_phase="implementation")), [])

    def test_implementation_rejects_incomplete_deck(self):
        data, base, source, readme, agents, preserved, slides_html = self.original
        broken = copy.deepcopy(data)
        broken["development_phase"] = "implementation"
        slides_html = slides_html[:slides_html.index('data-rev13-scene-id="X01"')]
        problems = gate.violations(broken, base, source, readme, agents, preserved,
                                   slides_html)
        self.assertTrue(any("all 62 scenes" in message for message in problems))

    def test_cannot_erase_stage_output(self):
        def mutate(x):
            next(s for s in x["stage_contracts"] if s["key"]=="refinement")["output"]=""
        self.assertTrue(any("refinement" in msg and "output" in msg for msg in self.errors(mutate)))

    def test_cannot_make_human_gate_an_eighth_column(self):
        def mutate(x):
            next(s for s in x["stage_contracts"] if s["key"]=="human_gate")["kanban_state"]="Human Gate"
        self.assertTrue(any("eighth" in msg for msg in self.errors(mutate)))

    def test_cannot_omit_role_participation(self):
        def mutate(x):
            x["roles"]=[r for r in x["roles"] if r["role"]!="QA"]
        self.assertTrue(any("canonical human role" in msg for msg in self.errors(mutate)))

    def test_cannot_replace_matching_story_source(self):
        def mutate(x):
            x["core_part2"]=x["core_part2"][:-1]
        self.assertTrue(any("Part 2" in msg or "coverage" in msg for msg in self.errors(mutate)))

    def test_cannot_drop_core_agent_five(self):
        def mutate(x):
            x["preserved_agent_scene_ids"].remove("A09")
        self.assertTrue(any("A05–A11" in msg for msg in self.errors(mutate)))

    def test_cannot_switch_away_from_four_plus_one_opening(self):
        def mutate(x):
            x["foundations"]=["People","Process","Git"]
        self.assertTrue(any("four foundations" in msg for msg in self.errors(mutate)))

    def test_part1_is_human_only_and_moves_agent_scenes_after_human_flow(self):
        data, _, _, _, _, _, slides_html = self.original
        self.assertNotIn("O02", data["core_part1"])
        self.assertNotIn("C10", data["core_part1"])
        self.assertLess(data["core_part2"].index("HG02"), data["core_part2"].index("O02"))
        self.assertEqual(data["core_part2"][data["core_part2"].index("O02"):][:3], ["O02", "C10", "A01"])
        self.assertEqual(len(data["implementation_slide_map"]), 68)
        self.assertIn('data-rev13-merged-scenes="C10,A01"', slides_html)

    def test_expanded_slides_keep_scene_traceability_in_merged_metadata(self):
        data, _, _, _, _, _, slides_html = self.original
        expected = {8: "C02", 11: "C07", 12: "C08", 54: "C10", 55: "C10", 56: "C10,A01"}
        for page, linked in expected.items():
            mapping = next(item for item in data["implementation_slide_map"] if item["page"] == page)
            self.assertIsNone(mapping["scene_id"])
            self.assertEqual(mapping["merged_scene_ids"], linked.split(","))
            self.assertIn(f'data-page="{page}"', slides_html)
            self.assertIn(f'data-rev13-merged-scenes="{linked}"', slides_html)

    def test_cannot_move_agent_chapter_before_human_gate(self):
        def mutate(x):
            x["core_part2"].remove("O02")
            x["core_part2"].insert(0, "O02")
        self.assertTrue(any("after HG02" in msg for msg in self.errors(mutate)))

    def test_cannot_teach_stage_details_before_roles_and_documents(self):
        def mutate(x):
            x["part1_scenes"][4],x["part1_scenes"][12] = x["part1_scenes"][12],x["part1_scenes"][4]
        self.assertTrue(any("prerequisites" in m or "Stage Cards" in m for m in self.errors(mutate)))

    def test_cannot_erase_part1_focus(self):
        def mutate(x):
            next(s for s in x["part1_scenes"] if s["id"]=="C08")["focus"]=""
        self.assertTrue(any("C08" in msg for msg in self.errors(mutate)))


if __name__=="__main__":
    unittest.main()
