"""Learner-facing instructional and evidence contracts for the current rev12 candidate.

Not a human learning-effectiveness test. These assertions prevent factual regressions.
"""
import json
import re
import unittest
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
HTML = BeautifulSoup((ROOT / "slides/index.html").read_text(), "html.parser")
BASELINE = BeautifulSoup((ROOT / "slides/rev11.html").read_text(), "html.parser")
MANIFEST = json.loads((ROOT / "drafts/rev12-review/manifest.json").read_text())


def page(number: int):
    slide = HTML.select_one(f'.slide[data-page="{number}"]')
    assert slide, f"Slide {number} missing"
    return slide


class EducationalContract(unittest.TestCase):
    def test_page_inventory_and_revision(self):
        self.assertEqual(len(HTML.select(".slide")), 107)
        self.assertEqual(len(BASELINE.select(".slide")), 82)
        self.assertEqual(len(MANIFEST["pages"]), 107)
        self.assertEqual(
            [record["number"] for record in MANIFEST["pages"]],
            list(range(1, 108)),
        )
        for record in MANIFEST["pages"]:
            self.assertEqual(page(record["number"]).h1.get_text(" ",strip=True),record["title"])

    def test_desktop_only_notice_first_page(self):
        self.assertIn("請用電腦版閱讀", page(1).get_text())
        self.assertIn("手機版開發中", page(1).get_text())

    def test_first_use_and_policy(self):
        for keyword in ("Product Owner", "Goal", "AC"):
            self.assertIn(keyword,page(6).get_text())
        self.assertIn("Reviewer＝",page(7).get_text())
        self.assertIn("QA＝",page(7).get_text())
        self.assertIn("候選做法",page(10).get_text())
        self.assertIn("待確認",page(10).get_text())
        self.assertIn("觀測到的錯配事件",page(11).get_text())
        self.assertNotIn("錯誤配對率＝0",page(11).get_text())
        self.assertIn("本課",page(14).h1.get_text())
        self.assertIn("本課 WIP 政策",page(28).get_text())
        self.assertNotIn("完整名稱見筆記",page(17).get_text())
        self.assertNotIn("BRIEF",page(17).get_text())
        self.assertNotIn("等價分割",page(20).get_text())

    def test_kanban_and_release_are_taught_consistently(self):
        expected=["Backlog","Ready","Dev","Review","QA","Product Check","Done"]
        for n in (15,24,41,48,52):
            selector=".full-board-columns" if n==15 else ".mini-board-columns"
            x=page(n).select_one(selector)
            self.assertIsNotNone(x,f"Missing board at {n}")
            actual=[h.get_text(" ",strip=True) for h in x.select("h3" if n==15 else ".mini-column-head")]
            self.assertEqual(actual,expected,f"Board at {n}")
        recap=page(93)
        self.assertEqual([x.h2.get_text(" ",strip=True) for x in recap.select(".recap-columns > article")],expected)
        self.assertFalse(recap.select(".recap-human-gate"))
        self.assertIn("決策點",recap.get_text())
        self.assertIn("Product Check",page(26).get_text())
        self.assertNotIn("Goal Check",page(26).get_text())
        self.assertIn("教學假設",page(52).get_text())
        self.assertIn("NOT RUN",page(52).get_text())
        self.assertIn("教學假設",page(53).get_text())
        self.assertIn("本課的 Human Gate",page(91).h1.get_text())
        self.assertIn("依風險",page(91).get_text())

    def test_distinguish_review_and_runner_from_hypothetical_release(self):
        review=page(41).get_text()
        self.assertIn("教學示意",review)
        self.assertIn("Reviewer 看",review)
        self.assertIn("QA 依 AC",review)
        for n in (42,45,46,47,52,53):
            if n in (42,45,46,47):
                self.assertTrue(any(x in page(n).get_text() for x in ["規則層","NOT RUN"]))
            else:
                self.assertIn("NOT RUN",page(n).get_text())
        for n in (68,71,74,76):
            self.assertNotIn("SHIFT",page(n).get_text())

    def test_practice_questions_assess_actual_exit_outcomes(self):
        exits=[8,30,38,49,54,82,95,107]
        self.assertEqual([page(n).get("data-added-id") for n in exits],
                         [f"A{n:02}" for n in range(18,26)])
        for n in exits:
            exercise=page(n)
            self.assertEqual(len(exercise.select(".r-exit-card")),3)
            details=exercise.select("details.r-exit-answer")
            self.assertEqual(len(details),3)
            self.assertTrue(all(not node.has_attr("open") for node in details))
            self.assertTrue(all(node.select_one("summary") and node.select_one("p") for node in details))
        self.assertNotIn("Agent",page(8).select(".r-exit-card")[2].h2.get_text())
        self.assertIn("Ticket",page(30).select(".r-exit-card")[1].h2.get_text())
        self.assertIn("commit",page(38).select(".r-exit-card")[0].h2.get_text())
        self.assertIn("實際",page(49).select(".r-exit-card")[1].h2.get_text())
        self.assertIn("WIP",page(82).select(".r-exit-card")[0].h2.get_text())
        self.assertIn("Workflow",page(82).select(".r-exit-card")[1].select_one(".r-exit-answer").get_text())
        self.assertIn("寫一段",page(95).select(".r-exit-card")[0].h2.get_text())
        self.assertIn("頁碼",page(107).select(".r-exit-card")[0].h2.get_text())

    def test_independent_review_p1_fixes(self):
        self.assertIn("人＋一 Agent 的完整交付示例", page(64).get_text())
        self.assertIn("人依 AC 退回補驗", page(64).get_text())
        self.assertEqual(len(page(90).select("details.r-tech-reveal")),2)
        self.assertTrue(all(not x.has_attr("open") for x in page(90).select("details.r-tech-reveal")))
        self.assertIn("Merge／Release／上線檢查", (ROOT / "drafts/rev12.js").read_text())
        self.assertIn("共用 DoD 後",page(106).get_text())
        self.assertIn("'SUMMARY'",(ROOT / "drafts/rev12.js").read_text())

    def test_progressive_disclosure_not_mandatory_cli(self):
        novice=page(87)
        self.assertIn("非工程師",novice.get_text())
        self.assertEqual(len(novice.select("details.r-tech-reveal")),2)
        self.assertTrue(all(not x.has_attr("open") for x in novice.select("details.r-tech-reveal")))
        self.assertIn("python3 workshop/matching-demo/run_case.py",novice.get_text())
        self.assertIn("--artifact",novice.get_text())
        self.assertIn("GWT",page(86).get_text())
        self.assertIn("（GWT）",page(86).get_text())
        self.assertNotIn("PR #43",page(92).get_text())
        self.assertNotIn("SSOT #41",page(92).get_text())
        self.assertIn("活動報名",page(94).get_text())
        self.assertIn("本課用六層視角",page(105).h1.get_text())


if __name__ == "__main__":
    unittest.main()
