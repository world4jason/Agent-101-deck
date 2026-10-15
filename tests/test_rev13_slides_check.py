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


if __name__ == "__main__":
    unittest.main()
