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

    def test_whole_picture_comes_before_details_and_role_agent_transfer(self):
        # The owner asked for a big-picture advance organizer, NOT a fixed
        # number of teaching phases. The map must follow the current SSOT.
        self.assertIn("開場先給 Whole Picture", (ROOT / "README.md").read_text())
        self.assertIn("先看整門課", page(2).h1.get_text())
        outline = page(2).select(".r-course-map-card")
        chapters = ["C0", "C2", "C1", "C3", "C4", "C5", "C6", "APP"]
        starts = ["#3", "#9", "#31", "#39", "#50", "#55", "#83", "#96"]
        self.assertEqual([card["data-outline-chapter"] for card in outline], chapters)
        self.assertEqual([card["href"] for card in outline], starts)
        self.assertEqual(len(outline), len({p["chapter"] for p in MANIFEST["pages"]}))
        for item in outline:
            self.assertTrue(item.select_one(".r-course-map-title"))
            self.assertIsNone(item.select_one(".r-course-map-question"), "Outline should not repeat a third explanatory line")
            self.assertTrue(item.select_one(".r-course-map-purpose"))
            self.assertLess(len(item.get_text(" ", strip=True)), 100)
        self.assertIn("r-course-reference", outline[-1].get("class", []))
        self.assertIn("查閱", outline[-1].get_text())
        self.assertNotIn("四階段", page(2).get_text())
        for n in (6, 7, 84):
            cards = page(n).select(".r-human-step")
            self.assertEqual(len(cards), 4)
            self.assertTrue(all(len(card.get_text(" ", strip=True)) < 95 for card in cards))
        self.assertEqual(
            [x.h2.get_text(" ", strip=True) for x in page(6).select(".r-human-step")],
            ["問題", "輸入", "交付", "接受"],
        )
        self.assertIn("Human Gate", page(84).get_text())
        self.assertIn("需求方", page(7).get_text())
        self.assertNotIn("輸入：使用者問題", page(6).get_text())
        for cover in HTML.select('.slide.section-slide:not([data-page="1"])'):
            # Only true chapter cover slides need the explicit back-to-outline cue.
            self.assertIsNotNone(cover.select_one(".r-chapter-overview"), "A chapter needs a real learning route")
            link = cover.select_one(".r-back-to-outline")
            self.assertIsNotNone(link)
            self.assertEqual(link["href"], "#2")

    def test_desktop_only_notice_first_page(self):
        self.assertIn("請用電腦版閱讀", page(1).get_text())
        self.assertIn("手機版開發中", page(1).get_text())

    def test_first_use_and_policy(self):
        for keyword in ("Product Owner", "Goal", "AC"):
            self.assertIn(keyword,page(6).get_text())
        self.assertIn("Reviewer（看改動）",page(7).get_text())
        self.assertIn("QA（驗行為）",page(7).get_text())
        self.assertIn("問題",page(6).get_text())
        self.assertIn("輸入",page(6).get_text())
        self.assertIn("交付",page(6).get_text())
        self.assertIn("接受",page(6).get_text())
        self.assertIn("候選做法",page(10).get_text())
        self.assertIn("待確認",page(10).get_text())
        self.assertIn("不希望發生：錯誤配對",page(11).get_text())
        self.assertNotIn("錯誤配對率＝0",page(11).get_text())
        self.assertIn("本課",page(14).h1.get_text())
        self.assertIn("本課 WIP 政策",page(28).get_text())
        self.assertNotIn("完整名稱見筆記",page(17).get_text())
        self.assertNotIn("BRIEF",page(17).get_text())
        self.assertNotIn("等價分割",page(20).get_text())

    def test_kanban_and_release_are_taught_consistently(self):
        expected=["Backlog","Ready","Dev","Review","QA","Product Check","Done"]
        board=page(15).select_one(".full-board-columns")
        self.assertIsNotNone(board,"Missing seven-column canonical board at P15")
        self.assertEqual([h.get_text(" ",strip=True) for h in board.select("h3")],expected)
        ready=page(24)
        self.assertEqual(len(ready.select(".r-ready-questions article")),3)
        self.assertIn("目前：0/1",ready.get_text())
        self.assertIn("Backlog",ready.get_text())
        self.assertIn("Ready",ready.get_text())
        self.assertIsNotNone(ready.select_one(".r-ready-status > i"), "A directed move must be visibly shown")
        # Tutorial slides deliberately use focused diagrams in place of
        # repeating the full seven-column board on every page.
        assert len(page(41).select('.r-pr-frame > article'))==3
        assert page(48).select_one('.r-product-story')
        assert page(52).select_one('.r-done-journey')
        recap=page(93)
        self.assertEqual([x.h2.get_text(" ",strip=True) for x in recap.select(".recap-columns > article")],expected)
        self.assertFalse(recap.select(".recap-human-gate"))
        self.assertIn("決策點",recap.get_text())
        self.assertIn("Product Check",page(26).get_text())
        self.assertNotIn("Goal Check",page(26).get_text())
        self.assertIn("教學假設",page(52).get_text())
        self.assertIn("NOT RUN",page(52).get_text())
        self.assertIn("教學假設",page(53).get_text())
        self.assertIn("審查可分工",page(91).h1.get_text())
        self.assertIn("放行仍由人決定",page(91).h1.get_text())
        self.assertIn("Human Gate",page(91).get_text())
        self.assertIn("NOT RUN",page(91).get_text())
        self.assertIn("依風險",page(91).get_text())

    def test_distinguish_review_and_runner_from_hypothetical_release(self):
        review=page(41).get_text()
        self.assertIn("教學示意",review)
        self.assertIn("Reviewer 看",review)
        self.assertIn("QA 依 AC",review)
        for n in (44,45,46,47,52,53):
            if n in (44,45,46,47):
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

    def test_whole_picture_promises_are_earned_by_later_evidence(self):
        # Full handoff+human-verification BEFORE the multi-agent section,
        # concrete candidate evidence, untouched NOT RUN cases, true DoD.
        cycle=page(64).select('.r-one-agent-cycle > article')
        self.assertEqual(len(cycle),4)
        sequence=' '.join(c.get_text(' ',strip=True) for c in cycle)
        for claim in ('Version B 補驗前','人依 AC 退回補驗','Version B 補驗後','NOT RUN','不發布'):
            self.assertIn(claim,sequence)
        acceptance=page(88).get_text(' ',strip=True)
        for claim in ('Version B','預期','實際','NOT RUN','僅晴→安','UI'):
            self.assertIn(claim,acceptance)
        handoff=page(90).get_text(' ',strip=True)
        for claim in ('僅晴→安','雙方未 Like','NOT RUN','不能宣稱'):
            self.assertIn(claim,handoff)
        recap=page(93).get_text(' ',strip=True)
        for claim in ('DoD','上線檢查','決策點','Merge'):
            self.assertIn(claim,recap)
        self.assertIn('DoD',page(93).select_one('.recap-columns > article:last-of-type').get_text())

    def test_human_gate_never_licenses_unverified_release(self):
        mainline=page(91).get_text(' ',strip=True)
        for claim in ('僅晴→安','雙方未 Like','NOT RUN','尚未放行','補驗'):
            self.assertIn(claim,mainline)
        appendix=page(105).get_text(' ',strip=True)
        for claim in ('Release','上線檢查','DoD','Done'):
            self.assertIn(claim,appendix)

    def test_editorial_density_changes_keep_evidence_and_learning_actions(self):
        # The former full memo / seven-column board / PR thread cannot return
        # to pages where only one learner decision should be visible.
        p22=page(22)
        self.assertEqual(len(p22.select(".r-ac-row")),3)
        self.assertFalse(p22.select(".refinement-grid"))
        self.assertFalse(p22.select(".refinement-ac"))
        self.assertFalse(p22.select(".mini-board"))
        self.assertIsNotNone(p22.select_one(".r-ticket-place"))
        p41=page(41)
        self.assertIsNotNone(p41.select_one(".r-pr-story[data-pr-stage='0']"))
        self.assertEqual(len(p41.select("[data-pr-pane]")),3)
        self.assertEqual([x.get("hidden") is not None for x in p41.select("[data-pr-pane]")],
                         [False,True,True])
        self.assertIn("教學示意",p41.get_text())
        self.assertIn("Reviewer 看改動",p41.get_text())
        self.assertIn("QA 依 AC",p41.get_text())
        p45=page(45)
        self.assertIn("重複 Like：NOT RUN",p45.get_text())
        self.assertEqual(len(p45.select(".r-table tbody tr")),4)
        self.assertTrue(any("① 操作步驟" in link.get_text()
                            for link in p45.select(".r-content > .r-meta a")))
        p46=page(46)
        self.assertEqual(len(p46.select(".r-evidence-checkpoint")),2)
        self.assertIn("同一版",p46.get_text())
        self.assertIn("NOT RUN",p46.get_text())
        self.assertIn("PASS",p46.get_text())
        p48=page(48)
        self.assertEqual(len(p48.select(".r-product-routes article")),3)
        self.assertNotIn("goal-check-layout",str(p48))
        for token in ("Product Check","Human Gate","Backlog","Dev","NOT RUN"):
            self.assertIn(token,p48.get_text())
        p52=page(52)
        self.assertEqual(len(p52.select(".r-done-steps article")),3)
        self.assertFalse(p52.select(".done-summary"))
        for token in ("#1","#2","#3","教學假設","NOT RUN","DoD"):
            self.assertIn(token,p52.get_text())
        p91=page(91)
        self.assertFalse(p91.select(".launch-timeline"))
        self.assertIn("尚未放行",p91.get_text())
        self.assertIn("Human Gate",p91.get_text())
        recap=page(93)
        self.assertIsNotNone(recap.select_one(".return-routes .return-goal-path"))
        self.assertIsNotNone(recap.select_one(".return-routes .return-product-dev-path"))
        self.assertIn("需求問題退回 Backlog",recap.get_text())
        self.assertIn("實作問題回 Dev",recap.get_text())
        p95=page(95)
        question=p95.select(".r-exit-card")[2].select_one("h2")
        answer=p95.select(".r-exit-card")[2].select_one("details p")
        self.assertIn("還沒執行",question.get_text())
        self.assertIn("候選版本＝無",answer.get_text())
        self.assertIn("未測＝全部 AC",answer.get_text())
        self.assertIn("Version B 補驗前",p95.select(".r-exit-card")[1].h2.get_text())

    def test_novice_prerequisites_and_human_gate_boundaries(self):
        self.assertIn("課程先教人類流程",page(2).get_text())
        self.assertIn("PR＝把一組修改交給別人審查",page(33).get_text())
        self.assertIn("diff＝這次改了哪些內容",page(33).get_text())
        self.assertIn("diff",page(36).get_text())
        p37=page(37).get_text()
        self.assertIn("Merge 更新共同版本",p37)
        self.assertIn("Release",p37)
        self.assertIn("Goal 成效另待觀察",p37)
        self.assertIn("Human Gate 由人放行",p37)
        self.assertIn("#3 的工作分支",page(35).h1.get_text())
        position=page(48).select_one(".r-product-position")
        self.assertIn("流程示意",position.get_text())
        self.assertIn("NOT RUN",position.get_text())
        self.assertIn("未完整通過 QA",position.get_text())
        note=page(73).select_one(".two-axis-note")
        self.assertIn("人先約定",note.get_text())
        self.assertIn("Workflow 和 Agent 可以一起使用",note.get_text())
        model=page(74).get_text()
        self.assertIn("同一 App 的不同工作",model)
        self.assertIn("#1 改按鈕文字",model)
        self.assertIn("#3 判斷雙向配對規則",model)
        scope=page(81).get_text()
        self.assertIn("由人重新確認",scope)
        self.assertNotIn("改 Goal 時交 Human Gate 決定",scope)
        check=page(82).select(".r-exit-card")
        self.assertEqual(len(check),3)
        self.assertIn("人事先約定",check[1].get_text())
        self.assertFalse(any(x.has_attr("open") for x in page(82).select("details")))
        transfer=page(30).select(".r-exit-card")[1].get_text()
        self.assertIn("遷移練習",transfer)
        p89=page(89)
        self.assertNotIn("核對同一個 B artifact",p89.select_one(".r-ribbon").get_text())
        hidden=p89.select_one("[data-wip-sequence]")
        self.assertIsNotNone(hidden)
        self.assertTrue(hidden.has_attr("hidden"))
        self.assertIn("Version B 補驗後",hidden.get_text())
        p90=page(90)
        self.assertIn("Version B 補驗後 結果（先核對）",p90.get_text())
        self.assertFalse(any(x.has_attr("open") for x in p90.select("details.r-tech-reveal")))

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
        self.assertIn("六層如何接力",page(105).h1.get_text())
        self.assertIn("驗收與放行",page(105).h1.get_text())

    def test_all_chapters_open_with_a_teachable_overview(self):
        starts={5:"C0",9:"C2",31:"C1",39:"C3",50:"C4",55:"C5",83:"C6",96:"APP"}
        for number,chapter in starts.items():
            slide=page(number)
            overview=slide.select_one(".r-chapter-overview")
            self.assertIsNotNone(overview, f"chapter overview missing at {number}")
            self.assertEqual(overview.get("data-overview-chapter"),chapter)
            self.assertTrue(overview.select_one(".r-overview-bridge"))
            agenda=overview.select(".r-overview-agenda li")
            self.assertIn(len(agenda),(2,3),f"overview at {number} needs 2–3 topics")
            self.assertTrue(overview.select_one(".r-overview-outcome"))
            if number in (39,50):
                content=slide.select_one(".r-content")
                self.assertIs(content.find(recursive=False),overview)
        # The three route steps must be readable and do actual teaching;
        # keeping old detailed agenda text on the projector is a regression.
        for page_id in starts:
            slide=page(page_id)
            steps=slide.select(".r-overview-agenda li")
            self.assertEqual(len(steps),3)
            self.assertTrue(all(len(item.get_text(" ",strip=True))<=24 for item in steps))
            self.assertIsNone(slide.select_one(".r-storyline-phase"))
            self.assertTrue(slide.select_one(".r-overview-bridge > strong"))
            self.assertTrue(slide.select_one(".r-overview-outcome > strong"))
        self.assertIn("Ready",page(39).get_text())
        self.assertIn("Dev",page(39).get_text())
        self.assertIn("假資料環境",page(50).get_text())
        self.assertIn("真實使用者環境",page(50).get_text())

    def test_goal_signal_does_not_claim_unobserved_zero_events(self):
        signal=page(11).get_text(" ",strip=True)
        self.assertNotIn("護欄訊號",signal)
        self.assertIn("不希望發生：錯誤配對",signal)
        self.assertNotIn("錯配率",signal)
        self.assertRegex(signal,r"須有監測或回報資料")

    def test_good_ticket_links_ac_to_at_and_actual_evidence(self):
        ticket=page(23)
        self.assertIn("AC",ticket.get_text())
        self.assertIn("AT",ticket.get_text())
        test=ticket.select_one(".r-ticket-at")
        self.assertIsNotNone(test)
        for term in ("前提", "操作", "預期結果"):
            self.assertIn(term,test.get_text())
        evidence=ticket.select_one(".r-ticket-evidence")
        self.assertIsNotNone(evidence)
        self.assertIn("NOT RUN",evidence.get_text())
        self.assertIn("PASS",evidence.get_text())
        self.assertIn("DoD",ticket.get_text())

    def test_refinement_is_ongoing_and_ready_is_a_three_question_check(self):
        ready=page(24).get_text(" ",strip=True)
        for question in ("做得到嗎", "驗得出嗎", "缺資料嗎"):
            self.assertIn(question,ready)
        self.assertIn("持續",ready)
        self.assertIn("Backlog",ready)
        self.assertNotIn("所有欄位都要",ready)
        self.assertNotIn("新增欄位",ready)

    def test_page_75_compares_human_led_grill_me_with_gated_superpowers(self):
        choices=page(75)
        self.assertEqual(len(choices.select(".r-collaboration-choice article")),2)
        grill=choices.select_one(".r-grill-me")
        powers=choices.select_one(".r-superpowers")
        self.assertIsNotNone(grill)
        self.assertIsNotNone(powers)
        for term in ("Grill Me", "本人確認", "不執行", "#3"):
            self.assertIn(term,grill.get_text())
        for term in ("Superpowers", "人工設計核准", "計畫", "實作", "Review", "人"):
            self.assertIn(term,powers.get_text())
        self.assertIn("五項協作原則",page(76).h1.get_text())

    def test_b_version_timeline_labels_explain_the_internal_aliases(self):
        before=page(45).select_one(".r-version-time-label")
        after=page(46).select_one(".r-version-time-label")
        self.assertIsNotNone(before)
        self.assertIsNotNone(after)
        self.assertIn("Version B 補驗前",before.get_text())
        self.assertIn("B-pre",before.get_text())
        self.assertIn("Version B 補驗後",after.get_text())
        self.assertIn("B-post",after.get_text())
        for number in (47,59,63,64,88,89,90):
            visible=page(number).get_text(" ",strip=True)
            self.assertNotRegex(visible,r"(?<!Version B 補驗前（)B-pre")
            self.assertNotRegex(visible,r"(?<!Version B 補驗後（)B-post")
        self.assertIn("時間倒回",page(58).get_text())
        self.assertIn("Version B 補驗前",page(59).get_text())
        self.assertIn("Version B 補驗後",page(64).get_text())
        self.assertIn("Version B 補驗前",page(88).get_text())
        self.assertIn("Version B 補驗後",page(89).get_text())
        # The raw evidence paths remain canonical technical references.
        refs=MANIFEST["pages"][45-1]["materialRefs"]
        self.assertTrue(any("B-pre-supplement" in ref["path"] for ref in refs))
        self.assertTrue(any("B-post-supplement" in ref["path"] for ref in MANIFEST["pages"][89-1]["materialRefs"]))


if __name__ == "__main__":
    unittest.main()
