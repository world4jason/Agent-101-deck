#!/usr/bin/env python3
"""G4 regression: projector is an aid, not a document read aloud.

Hard checks apply only to specific projector-facing slide patterns. Extra data
can remain in notes/Evidence. A human visual check is still required.
"""
from pathlib import Path
from bs4 import BeautifulSoup
import json,unittest

ROOT=Path(__file__).resolve().parents[1]
DOC=BeautifulSoup((ROOT/"slides/index.html").read_text(),"html.parser")
MANIFEST=json.loads((ROOT/"drafts/rev12-review/manifest.json").read_text())
def page(n):
    s=DOC.select_one('.slide[data-page="%d"]'%n)
    assert s
    return s
def visible(n):
    copy=BeautifulSoup(str(page(n)),"html.parser")
    for x in copy.select("script,style,[hidden],details:not([open])"):x.decompose()
    return copy.get_text(" ",strip=True)

class VisualStorytelling(unittest.TestCase):
    def test_all_8_chapter_intros_are_learning_routes(self):
        starts={5:"C0",9:"C2",31:"C1",39:"C3",50:"C4",55:"C5",83:"C6",96:"APP"}
        self.assertEqual(len(DOC.select(".slide")),len(MANIFEST["pages"]))
        for n,chapter in starts.items():
            s=page(n)
            body=s.select_one(".r-chapter-overview")
            self.assertIsNotNone(body,(n,"no overview"))
            self.assertEqual(body["data-overview-chapter"],chapter)
            parts=body.select(".r-overview-agenda li")
            self.assertEqual(len(parts),3,n)
            self.assertTrue(all(len(x.get_text(" ",strip=True))<=22 for x in parts),n)
            self.assertTrue(body.select_one(".r-overview-outcome > strong"),n)
            self.assertTrue(body.select_one(".r-overview-bridge > strong"),n)
            self.assertFalse(s.select(".r-storyline-phase"),n)
            self.assertLess(len(visible(n)),155,n)
        # The appendix is reference navigation; no required step-order arrows.
        self.assertIn("按需查閱",visible(96))
        self.assertIn("P97–102",MANIFEST["pages"][95]["notes"])

    def test_whole_picture_does_not_repeat_three_description_lines(self):
        cards=page(2).select(".r-course-map-card")
        self.assertEqual(len(cards),8)
        self.assertTrue(all(x.select_one(".r-course-map-title") for x in cards))
        self.assertTrue(all(x.select_one(".r-course-map-purpose") for x in cards))
        self.assertFalse(any(x.select_one(".r-course-map-question") for x in cards))
        self.assertTrue(all(len(x.get_text(" ",strip=True))<=58 for x in cards))
        self.assertIn("Agent",visible(2))

    def test_at_is_a_real_three_step_scenario(self):
        s=page(23)
        at=s.select_one(".r-ticket-at")
        self.assertIsNotNone(at)
        steps=at.select(".r-at-steps article")
        self.assertEqual(len(steps),3)
        for term in ("前提","操作","預期結果","已配對 1 筆","再按 Like","仍是 1 筆"):
            self.assertIn(term,at.get_text())
        self.assertEqual(len(s.select(".r-ticket-ac-brief > span")),3)
        evidence=s.select_one(".r-ticket-evidence")
        self.assertIn("NOT RUN",evidence.get_text())
        self.assertIn("實際結果",evidence.get_text())
        self.assertIn("DoD",visible(23))
        self.assertFalse(s.select(".r-ticket-three"))

    def test_ready_is_one_decision(self):
        s=page(24)
        self.assertEqual(len(s.select(".r-ready-questions article")),3)
        self.assertTrue(s.select_one(".r-ready-status > i"))
        for term in ("做得到嗎","驗得出嗎","缺資料嗎","Backlog","Ready","Refinement","0/1"):
            self.assertIn(term,visible(24))
        self.assertFalse(s.select(".r-ready-outcome"),"WIP status already shown above, don't repeat it")
        self.assertFalse(s.select(".mini-board"),"Seven-column board belongs on P26/P93")

    def test_human_led_vs_process_led_is_a_real_comparison(self):
        s=page(75)
        self.assertEqual(len(s.select(".r-collaboration-choice article")),2)
        grill=s.select_one(".r-grill-me").get_text(" ",strip=True)
        powers=s.select_one(".r-superpowers").get_text(" ",strip=True)
        for word in ("Grill Me","本人確認","不執行","#3"):
            self.assertIn(word,grill)
        for word in ("Superpowers","人工設計核准","計畫","Agent 實作","Review","人"):
            self.assertIn(word,powers)
        self.assertLess(len(visible(75)),250)
        self.assertFalse(s.select(".r-collaboration-choice small"),"No hidden footnote disguised as another paragraph")

    def test_notes_and_real_evidence_boundaries_remain(self):
        self.assertEqual(sorted(x["oldRev11Page"] for x in MANIFEST["pages"] if x["oldRev11Page"] is not None),list(range(1,83)))
        self.assertIn("NOT RUN",visible(45))
        self.assertIn("NOT RUN",visible(46))
        self.assertIn("Human Gate",visible(106))
        self.assertNotIn("護欄訊號",visible(11))
        for n in (2,5,9,23,24,31,39,50,55,75,83,96):
            for phrase in ("總結來說","深入探討","值得注意的是","不僅如此"):
                self.assertNotIn(phrase,visible(n),n)
        self.assertEqual(len([x for x in MANIFEST["pages"] if x.get("addedId")]),25)
        self.assertEqual(len([x for x in MANIFEST["pages"] if x.get("oldRev11Page") is not None]),82)

if __name__=="__main__":
    unittest.main()
