#!/usr/bin/env python3
"""G1 narrative progression contract for the Agent 101 learner-facing deck.

Contract covers semantic scene changes, timeline, source preservation and all
all candidate transitions. This complements, never replaces, novice review.
"""
from pathlib import Path
from bs4 import BeautifulSoup
import json,re
import unittest

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/"docs/issue48-execution-storyboard.md"
MANIFEST=ROOT/"drafts/rev12-review/manifest.json"
DECK=ROOT/"slides/index.html"

def get_map():
    result=[]
    for line in SOURCE.read_text().splitlines():
        if not re.match(r'^\|\s*\d{1,3}\s*\|',line):continue
        columns=[v.strip() for v in line.strip().strip('|').split('|')]
        if len(columns)!=9 or not columns[0].isdigit():continue
        result.append(dict(number=int(columns[0]),chapter=columns[1],old=columns[2],
            sources=columns[3],id=columns[4],title=columns[5],claim=columns[6],
            visual=columns[7],transition=columns[8]))
    return result
rows=get_map()
deck=BeautifulSoup(DECK.read_text(),"html.parser")
manifest=json.loads(MANIFEST.read_text())
slides={int(el['data-page']):el for el in deck.select('section.slide')}

def text(n):return slides[n].get_text(" ",strip=True)

class Narrative(unittest.TestCase):
    def test_every_link_has_a_current_claim_and_next_question(self):
        self.assertEqual(len(rows),len(slides))
        self.assertEqual([x["number"] for x in rows],list(range(1,len(rows)+1)))
        self.assertEqual(len(manifest["pages"]),len(rows))
        for row in rows:
            n=row["number"]
            self.assertTrue(slides[n],n)
            self.assertEqual(slides[n].h1.get_text(" ",strip=True),row["title"])
            self.assertTrue(len(row["claim"])>=4, n)
            self.assertTrue(len(row["transition"])>=7, n)
            if n<len(rows):
                self.assertTrue(rows[n]["claim"],(n,n+1))
        # Earlier generic exits were specific-bridged toward the next real issue.
        for number in (8,30,38,49,54,82,95):
            self.assertNotIn("確認自己能解釋後",rows[number-1]["transition"],number)

    def test_qa_method_before_qa_bug_and_actual_evidence(self):
        self.assertEqual([int(manifest["pages"][n-1]["oldRev11Page"]) for n in (42,43,44)],
                         [34,35,6])
        self.assertIn("輸入",text(42))
        self.assertIn("應觀察",text(42))
        self.assertIn("預期",text(43))
        self.assertIn("四種 Like 組合",slides[43].h1.get_text())
        self.assertIn("下一頁先學怎麼驗",text(41))
        self.assertIn("四", rows[42]["claim"]+" "+text(43))
        self.assertIn("Version A",text(44))
        self.assertIn("FAIL",text(44))
        self.assertIn("退回",text(44))
        self.assertIn("Version B",text(44))
        self.assertIn("Version B 補驗前",text(45))
        self.assertIn("NOT RUN",text(45))
        self.assertIn("Version B 補驗後",text(46))
        self.assertIn("重複",text(46))
        self.assertIn("同一",text(47))
        self.assertIn("Version B 補驗前",text(47))
        self.assertIn("Version B 補驗後",text(47))
        self.assertIn(manifest["demo"]["versionB"][:12],text(47))
        self.assertIn("PASS",text(47))
        self.assertIn("NOT RUN",text(47))
        self.assertNotIn("Version A",text(47),
                         "P47 must add the new same-B-program proof, not replay Version A")

    def test_agent_replay_has_a_reason_then_context_and_handback(self):
        self.assertIn("Version A",text(57))
        self.assertIn("教學重演",text(58))
        self.assertIn("Version B 補驗前",text(59))
        self.assertIn("Agent 這輪",text(59))
        self.assertIn("Context",text(60))
        self.assertIn("Agent",text(60))
        self.assertIn("這一輪拿到",text(60))
        self.assertIn("session",text(61).lower())
        self.assertIn("人",text(64))
        self.assertIn("Version B 補驗後",text(64))
        self.assertIn("產出又自評",text(64))

    def test_same_matching_story_carries_into_workflow(self):
        self.assertEqual(len(slides[67].select(".r-multi-agent-compare article")),2)
        self.assertIn("#3",text(67))
        self.assertIn("#2",text(67))
        self.assertIn("漏",rows[68]["title"]+" "+text(69))
        self.assertIn("看不到",text(70))
        self.assertIn("原始目標",text(71))
        self.assertEqual(len(slides[72].select(".r-flow > .r-card")),3)
        self.assertTrue(all(term in text(72) for term in ["不重複配對","已測／未測","Goal","Workflow"]))
        self.assertNotIn("廚房",text(72))
        self.assertIn("Workflow",text(73))
        self.assertIn("model",text(74))
        self.assertIn("effort",text(74))
        self.assertIn("Grill Me",text(75))
        self.assertIn("Superpowers",text(75))
        self.assertIn("人工設計核准",text(75))
        self.assertIn("五項",text(76))

    def test_gate_risk_stays_in_matching_story(self):
        self.assertIn("Human Gate",text(91))
        self.assertIn("尚未放行",text(91))
        self.assertTrue(all(term in text(91) for term in ("未測", "授權", "補驗／暫停")))
        self.assertNotIn("須補驗後才討論 Merge",text(91))
        self.assertIn("Version B 補驗後",text(92))
        self.assertIn("小晴→小安",text(92))
        self.assertIn("雙方未 Like",text(92))
        self.assertIn("證據足夠再由人判斷放行",text(92))
        self.assertIn("教學假設",text(92))
        self.assertIn("NOT RUN",text(92))
        self.assertIn("#1→#3→#2",text(92))
        self.assertNotIn("教材首版",text(92))
        self.assertNotIn("PR #43",text(92))
        self.assertIn("Human Gate",text(93))
        self.assertIn("七個",slides[93].h1.get_text() if "七個" in slides[93].h1.get_text() else text(93))

    def test_appendix_methods_then_practice_then_operational_questions(self):
        self.assertEqual([int(manifest["pages"][n-1]["oldRev11Page"])
                          for n in (101,102,103,104)],[77,79,78,80])
        self.assertIn("演練",text(101))
        self.assertIn("共識",text(102))
        self.assertIn("驗證",text(102))
        self.assertIn("Blocked",text(103))
        self.assertIn("事故",rows[103]["transition"]+" "+text(104))
        self.assertIn("先前阻礙已解除",text(104))
        self.assertIn("P97–102",text(96))
        self.assertIn("P103–104",text(96))

    def test_learner_support_and_exit_checks_survive(self):
        self.assertEqual([n for n in slides if slides[n].get("data-added-id") in
                         {f"A{i:02d}" for i in range(18,26)}],
                         [8,30,38,49,54,82,95,107])
        for n in (8,30,38,49,54,82,95,107):
            self.assertEqual(len(slides[n].select(".r-exit-card")),3)
            details=slides[n].select("details.r-exit-answer")
            self.assertEqual(len(details),3)
            self.assertTrue(all(not x.has_attr("open") for x in details))
        for n in (59,88,89,90,91,92):
            self.assertIn("NOT RUN",text(n),n)
        self.assertIn("Human Gate",text(106))

if __name__=="__main__":
    unittest.main()
