"""Regression tests for learner-visible forbidden-word scanning."""

import unittest

import rev13_slides_check as gate


class BannedLearnerTextTests(unittest.TestCase):
    def test_visible_b_pre_text_is_rejected(self):
        self.assertEqual(gate.banned_terms_in("B-pre"), ["B-pre"])

    def test_class_attributes_and_speaker_notes_are_ignored(self):
        markup = (
            '<div class="B-pre Data Insight Go" data-label="candidate Data Insight Go">Ready</div>'
            '<aside class="notes"><p>B-pre SHA-256 Data Insight Go</p></aside>'
        )
        self.assertEqual(gate.banned_terms_in(gate.visible_text_from_markup(markup)), [])

    def test_data_insight_go_fields_are_rejected_in_visible_text_and_notes(self):
        for field in ("Data", "Data:", "Data：", "Insight", "Insight:", "Insight：", "Go", "Go:", "Go："):
            expected = field.rstrip(":：")
            self.assertEqual(gate.banned_terms_in(field), [expected])
        self.assertEqual(gate.banned_terms_in("本頁重點：Data：工作狀態"), ["Data"])
        self.assertEqual(gate.banned_terms_in("data-rev13-scene-id"), [])

        markup = (
            '<section class="slide" data-page="60">'
            '<p>Insight</p>'
            '<aside class="notes"><p>Data：</p><p>Go:</p></aside>'
            '</section>'
        )
        self.assertEqual(gate.banned_terms_in(gate.visible_text_from_markup(markup)), ["Insight"])

        parser = gate.SlideParser()
        parser.feed(markup)
        parser.close()
        errors = []
        gate.append_banned_text_errors(
            errors,
            [("60", 0, text) for text in parser.slides[0]["note_text"]],
            "index.html notes",
        )
        self.assertTrue(any("banned term 'Data'" in error for error in errors))
        self.assertTrue(any("banned term 'Go'" in error for error in errors))

    def test_evidence_scope_is_rejected_in_visible_text_and_notes(self):
        self.assertEqual(gate.banned_terms_in("Evidence scope：教學示意"), ["Evidence scope"])
        self.assertEqual(gate.banned_terms_in("data-evidence-scope"), [])

        markup = (
            '<section class="slide" data-page="40" data-label="Evidence scope">'
            '<p>Evidence scope</p>'
            '<aside class="notes"><p>Evidence scope：</p></aside>'
            '</section>'
        )
        self.assertEqual(
            gate.banned_terms_in(gate.visible_text_from_markup(markup)),
            ["Evidence scope"],
        )

        parser = gate.SlideParser()
        parser.feed(markup)
        parser.close()
        errors = []
        gate.append_banned_text_errors(
            errors,
            [("40", 0, text) for text in parser.slides[0]["note_text"]],
            "index.html notes",
        )
        self.assertTrue(any("banned term 'Evidence scope'" in error for error in errors))

    def test_js_template_text_is_checked_but_attributes_and_notes_are_ignored(self):
        source = r'''const html = `<div class="B-pre Data" data-label="candidate Insight Go">Ready</div>
          <aside class="notes">B-post</aside><p>SHA-256</p>`;'''
        visible = " ".join(text for _, text in gate.javascript_visible_text(source))
        self.assertEqual(gate.banned_terms_in(visible), ["SHA-256"])

    def test_agent_chapter_follows_human_flow_and_adds_roles_in_order(self):
        parser = gate.SlideParser()
        parser.feed(gate.HTML_PATH.read_text(encoding="utf-8"))
        parser.close()
        slides = parser.slides
        self.assertEqual(slides[0]["attrs"].get("data-rev13-scene-id"), "O01")
        self.assertEqual(slides[1]["attrs"].get("data-outline-part"), "1")
        self.assertEqual([slide["attrs"].get("data-ticket-step") for slide in slides[2:7]], ["1", "2", "3", "4", "5"])
        self.assertEqual([slide["attrs"].get("data-rev13-scene-id") for slide in slides[7:16]], [f"C{number:02}" for number in range(11, 20)])
        self.assertTrue(all(slide["attrs"].get("data-agent") == "false" for slide in slides[:49]))
        self.assertEqual(slides[49]["attrs"].get("data-rev13-scene-id"), "O02")
        self.assertEqual(slides[50]["attrs"].get("data-rev13-scene-id"), "C10")
        self.assertEqual(
            [slides[page - 1]["attrs"].get("data-role-capability") for page in (52, 53, 54)],
            ["delegate", "assist", "human"],
        )
        self.assertEqual(
            [slides[page - 1]["attrs"].get("data-rev13-merged-scenes") for page in (52, 53, 54)],
            ["C10", "C10", "C10,A01"],
        )
        self.assertEqual(slides[58]["attrs"].get("data-outline-part"), "4")


if __name__ == "__main__":
    unittest.main()
