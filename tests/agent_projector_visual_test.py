#!/usr/bin/env python3
"""Learner-visible visual grammar regression on six changed Agent slides."""
from pathlib import Path
from bs4 import BeautifulSoup
import unittest
ROOT=Path(__file__).resolve().parents[1]
doc=BeautifulSoup((ROOT/'slides/index.html').read_text(),'html.parser')
def page(n):
 el=doc.select_one(f'.slide[data-page="{n}"]')
 assert el
 return el
def visible(n):
 el=BeautifulSoup(str(page(n)),'html.parser')
 for dead in el.select('script,style,[hidden],details:not([open])'):dead.decompose()
 return el.get_text(' ',strip=True)

class AgentProjectorRepair(unittest.TestCase):
 def test_p64_learner_sees_one_4_step_handoff(self):
  stage=page(64).select('.r-review-timeline > article')
  self.assertEqual(len(stage),4)
  self.assertTrue(all(x.select_one('strong') and x.select_one('b') for x in stage))
  for v in ('Version B 補驗前','Version B 補驗後','人依 AC 退回補驗','NOT RUN','PASS','不發布'):
   self.assertIn(v,visible(64))
  details=page(64).select_one('details.r-session-reference')
  self.assertTrue(details and not details.has_attr('open'))
 def test_p68_handoff_contract_is_center_and_concrete(self):
  s=page(68)
  self.assertFalse(s.select('.split-work'))
  roles=s.select('.r-handoff-main section')
  self.assertEqual(len(roles),3)
  self.assertIn('交接卡',roles[1].get_text())
  for keyword in ('#3','Issue','PR','M01','已測','未測','Agent B','列表'):
   self.assertIn(keyword,visible(68))
  self.assertEqual(len(s.select('.r-handoff-arrow')),2)
 def test_p69_p70_are_one_risk_each(self):
  for number in (69,70):
   slide=page(number)
   self.assertEqual(len(slide.select('.r-risk-track section')),3)
   self.assertEqual(len(slide.select('.r-risk-track > i')),2)
  for phrase in ('AC','交接摘要','重複','Ticket'):
   self.assertIn(phrase,visible(69))
  for phrase in ('Version B','PASS','NOT RUN','教學假設','交接卡','跳過重複 Like 補驗'):
   self.assertIn(phrase,visible(70))
  self.assertNotIn('重做或漏測',visible(70))
  self.assertFalse(page(69).select('.coordination-problems'))
  self.assertFalse(page(70).select('.rework-silo'))
 def test_p76_five_compact_action_pairs(self):
  s=page(76)
  self.assertEqual(len(s.select('.r-five-fixes ol > li')),5)
  self.assertFalse(s.select('.principle-overview'))
  for phrase in ('狀態寫進 Ticket','先定核准範圍','分清職責','獨立核對證據','每輪核對目標'):
   self.assertIn(phrase,visible(76))
  for english in ('External task state','Bounded execution','Role separation','Independent verification','Goal re-anchoring'):
   self.assertNotIn(english,visible(76))
 def test_p85_approval_path(self):
  s=page(85)
  self.assertEqual(len(s.select('.r-planning-main article')),3)
  self.assertFalse(s.select('.brainstorm-compare'))
  for phrase in ('人定方向','Agent 整理','人再確認','Scope／AC／AT','符合目標才交 Dev'):
   self.assertIn(phrase,visible(85))
 def test_p86_example_mapping_does_not_add_unapproved_ac(self):
  s=page(86)
  self.assertEqual(len(s.select('.r-example-steps article')),3)
  for phrase in ('只有一方 Like','預期：0 筆','Given–When–Then（GWT）','取消 Like','待釐清','不自行加進 AC'):
   self.assertIn(phrase,visible(86))
  self.assertFalse(s.select('.r-cols'))
 def test_p88_human_asks_for_missing_evidence(self):
  s=page(88)
  self.assertEqual(len(s.select('.r-human-checks > span')),4)
  self.assertFalse(s.select('.r-cols'))
  for phrase in ('Version B','預期','實際','NOT RUN','補驗','UI','僅晴→安'):
   self.assertIn(phrase,visible(88))
  self.assertNotIn('Human Gate 通過',visible(88))
 if __name__=='__main__':pass

if __name__=='__main__':unittest.main()
