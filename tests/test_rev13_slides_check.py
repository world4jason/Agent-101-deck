"""Regression tests for learner-visible forbidden-word scanning."""

import unittest

import rev13_slides_check as gate


class BannedLearnerTextTests(unittest.TestCase):
    def test_visible_b_pre_text_is_rejected(self):
        self.assertEqual(gate.banned_terms_in("B-pre"), ["B-pre"])

    def test_class_attributes_and_speaker_notes_are_ignored(self):
        markup = (
            '<div class="B-pre" data-label="candidate">Ready</div>'
            '<aside class="notes"><p>B-pre SHA-256</p></aside>'
        )
        self.assertEqual(gate.banned_terms_in(gate.visible_text_from_markup(markup)), [])

    def test_js_template_text_is_checked_but_attributes_and_notes_are_ignored(self):
        source = r'''const html = `<div class="B-pre" data-label="candidate">Ready</div>
          <aside class="notes">B-post</aside><p>SHA-256</p>`;'''
        visible = " ".join(text for _, text in gate.javascript_visible_text(source))
        self.assertEqual(gate.banned_terms_in(visible), ["SHA-256"])

    def test_agent_chapter_follows_human_flow_and_adds_roles_in_order(self):
        parser = gate.SlideParser()
        parser.feed(gate.HTML_PATH.read_text(encoding="utf-8"))
        parser.close()
        slides = parser.slides
        self.assertEqual(
            [slide["attrs"].get("data-rev13-scene-id") for slide in slides[:7]],
            ["O01", "C01", "C03", "C05", "C08", "C02", "C07"],
        )
        self.assertTrue(all(slide["attrs"].get("data-agent") == "false" for slide in slides[:51]))
        self.assertEqual(slides[51]["attrs"].get("data-rev13-scene-id"), "O02")
        self.assertEqual(slides[52]["attrs"].get("data-rev13-scene-id"), "C10")
        self.assertEqual(
            [slides[page - 1]["attrs"].get("data-role-capability") for page in (54, 55, 56)],
            ["delegate", "assist", "human"],
        )
        self.assertEqual(
            [slides[page - 1]["attrs"].get("data-rev13-merged-scenes") for page in (54, 55, 56)],
            ["C10", "C10", "C10,A01"],
        )


if __name__ == "__main__":
    unittest.main()
