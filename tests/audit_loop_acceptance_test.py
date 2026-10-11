#!/usr/bin/env python3
"""G3/G4 audit-loop contract: evidence scopes, learning prerequisites and gates."""
from pathlib import Path
from bs4 import BeautifulSoup
import unittest
ROOT=Path(__file__).resolve().parents[1]
doc=BeautifulSoup((ROOT/'slides/index.html').read_text(),'html.parser')
def slide(n):
 r=doc.select_one(f'.slide[data-page="{n}"]')
 assert r,n
 return r
def text(n):return slide(n).get_text(' ',strip=True)

class AuditLoop(unittest.TestCase):
 def test_whole_picture_first_uses_plain_actions(self):
  a=slide(2).select('.r-course-map-card')
  self.assertEqual(len(a),8)
  self.assertIn('寫出能開工、能驗收的票',slide(2).get_text())
  self.assertIn('留下版本、分開改、送人審查',slide(2).get_text())
 def test_ticket_is_prioritized_before_any_wip_begins(self):
  self.assertIn('確認能進 Ready 後才開始實作',text(15))
  self.assertIn('0/1',text(15))
  self.assertNotIn('先做 #3',text(15))
 def test_kanban_side_note_does_not_introduce_new_user_story(self):
  self.assertNotIn('User Story',text(27))
  self.assertEqual(len(slide(27).select('.compare-card')),2)
 def test_wip_is_3_clear_count_scenarios_not_dense_matrix(self):
  cards=slide(28).select('.r-wip-comparison article')
  self.assertEqual(len(cards),3)
  self.assertEqual([x.strong.get_text() for x in cards],['0/1','1/1','2/2'])
  self.assertIn('Blocked',text(28))
  self.assertIn('Done',text(28))
  self.assertEqual(len(slide(28).select('table')),0)
  self.assertIn('上限 1 與 2',slide(29).h1.get_text())
 def test_pr_and_ci_not_universal_sequential_gate(self):
  self.assertIn('交錯執行',text(40))
  self.assertIn('依團隊設定',text(40))
 def test_version_hash_claim_matches_short_disclosed_value(self):
  self.assertIn('短指紋',text(47))
  self.assertIn('完整 SHA',text(47))
  self.assertNotIn('Version B 的 Version B',text(59))
 def test_model_effort_is_comparison_not_fixed_rule(self):
  for phrase in ['model＝選哪個','effort＝可用','教學假設','沒有依難度就一定要換模型']:
   self.assertIn(phrase,text(74))
 def test_five_principles_link_actual_followup_pages(self):
  for page in range(77,82):
   self.assertIn('P'+str(page),text(76))
  self.assertEqual(len(slide(76).select('.r-five-fixes li')),5)
 def test_reveal_results_are_scope_specific(self):
  a=slide(89).select_one('[data-wip-sequence]')
  self.assertIsNotNone(a)
  self.assertTrue(a.has_attr('hidden'))
  self.assertIn('重複 Like 規則層補驗',a.get_text())
  self.assertIn('UI／整合：NOT RUN',a.get_text())
  d=slide(90).select('details.r-tech-reveal')
  self.assertEqual(len(d),2)
  self.assertTrue(all(not x.has_attr('open') for x in d))
  last=d[1].get_text(' ',strip=True)
  self.assertIn('重複 Like 規則層補驗：PASS',last)
  self.assertIn('UI／整合：NOT RUN',last)
 def test_gate_is_extra_column_neither_here_nor_in_recap(self):
  self.assertEqual(len(slide(93).select('.recap-columns > article')),7)
  self.assertIn('欄外決策點',text(93))
  self.assertIn('由人決定放行',text(93))
  self.assertEqual(len(slide(106).select('.kanban-board > div:has(> h3)')),7)
  self.assertIn('欄外決策',text(106))
  self.assertIn('Human Gate',text(106))
  self.assertIn('Product Check',text(106))
  self.assertIn('Done',text(106))
 def test_gwt_recall_is_self_explanatory(self):
  title=slide(97).select_one('.r-cols > .r-card:nth-child(2) h2')
  self.assertIsNotNone(title)
  for word in ('Given–When–Then','前提','操作','預期'):self.assertIn(word,title.get_text())

if __name__=='__main__':unittest.main()
