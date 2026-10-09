"""Focused contract checks for the issue #48 candidate deck."""
from __future__ import annotations

import json
import re
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
STORYBOARD = ROOT / "docs/issue48-execution-storyboard.md"


def storyboard_rows():
    rows = []
    for line in STORYBOARD.read_text().splitlines():
        if not re.match(r"\|\s*\d{2,3}\s*\|", line):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        assert len(cells) == 9, f"Unexpected storyboard row: {line}"
        rows.append(cells)
    return rows


def remap(old_page: int) -> int:
    return old_page + sum(boundary < old_page for boundary in [7, 28, 35, 45, 49, 76, 88, 99])


def main():
    rows = storyboard_rows()
    assert len(rows) == 107, f"Expected 107 candidate pages, got {len(rows)}"
    exit_ids = {f"A{i:02}" for i in range(18, 26)}
    check_pages = [row for row in rows if row[4] in exit_ids]
    assert [int(row[0]) for row in check_pages] == [8, 30, 38, 49, 54, 82, 95, 107]
    assert [row[1] for row in check_pages] == ["C0", "C2", "C1", "C3", "C4", "C5", "C6", "APP"]
    original_rows = [row for row in rows if row[4] not in exit_ids]
    assert len(original_rows) == 99
    assert [int(row[0]) for row in rows] == list(range(1, 108))

    chapter_order = []
    for row in rows:
        if row[1] not in chapter_order:
            chapter_order.append(row[1])
    assert chapter_order == ["C0", "C2", "C1", "C3", "C4", "C5", "C6", "APP"]
    expected_counts = {"C0": 8, "C2": 22, "C1": 8, "C3": 11, "C4": 5, "C5": 28, "C6": 13, "APP": 12}
    assert {chapter: sum(row[1] == chapter for row in rows) for chapter in chapter_order} == expected_counts
    readme = (ROOT / "README.md").read_text()
    assert all(f"| {page_range} |" in readme for page_range in ["1–8", "9–30", "31–38", "39–49", "50–54", "55–82", "83–95", "96–107"])

    legacy_pages = [int(row[2]) for row in rows if row[2] != "—"]
    added_ids = [row[4] for row in rows if row[4] != "—"]
    source_ids = [token for row in rows for token in re.findall(r"[PNEX]\d+", row[3])]
    assert sorted(legacy_pages) == list(range(1, 83)), "Each legacy rev11 page must appear exactly once"
    assert sorted(added_ids) == [f"A{i:02}" for i in range(1, 26)], "Each A01–A25 page must appear exactly once"
    assert len(source_ids) == 90 and len(set(source_ids)) == 90, "Source IDs must remain unique and separate from legacy page numbers"
    g1_rows = []
    for line in (ROOT / "docs/issue49-review-fixes.md").read_text().splitlines():
        if re.match(r"\|\s*\d{2}\s*\|", line):
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            if len(cells) == 7 and cells[0].isdigit():
                g1_rows.append(cells)
    assert len(g1_rows) == 99
    assert [int(row[1]) for row in g1_rows] == list(range(1, 8)) + list(range(11, 27)) + [9, 10] + list(range(27, 40)) + [8] + list(range(40, 100))
    assert [row[1] for row in rows[:8]] == ["C0"] * 8
    assert [row[1] for row in rows[8:30]] == ["C2"] * 22
    assert [row[1] for row in rows[38:49]] == ["C3"] * 11
    assert "Backlog" not in original_rows[12][8], "Define Backlog on page 14 before using it in the transition"

    # The latest approved memory order keeps the five principles in place and
    # inserts the two new pages between P46 and P31.
    assert [row[4] if row[4] != "—" else row[2] for row in original_rows[54:61]] == ["A11", "47", "46", "A16", "A17", "45", "48"]
    assert original_rows[25][6].startswith("Sprint 與 Kanban 描述不同的拉票節奏")
    assert "WIP" in original_rows[26][6] and "退回" in original_rows[26][6]
    assert "上限" in original_rows[27][6] and "2/2" in original_rows[27][6]

    # Both formal candidate and preserved baseline must remain directly reviewable.
    baseline = BeautifulSoup((ROOT / "slides/rev11.html").read_text(), "html.parser")
    candidate = BeautifulSoup((ROOT / "slides/index.html").read_text(), "html.parser")
    assert len(baseline.select(".slide")) == 82
    assert len(candidate.select(".slide")) == 107
    opening = candidate.select_one('.slide[data-page="1"]')
    assert opening and opening.select_one('.r-desktop-reading-notice')
    assert '請用電腦版閱讀' in opening.get_text() and '手機版開發中' in opening.get_text()

    manifest = json.loads((ROOT / "drafts/rev12-review/manifest.json").read_text())

    # The top rail is the major-chapter navigation; covers reuse its labels
    # and do not show the inherited rev11 decorative numbering.
    rail_links = candidate.select(".section-rail [data-rail]")
    rail_labels = {link["data-rail"]: link.get_text(" ", strip=True) for link in rail_links}
    assert len(rail_links) == 8
    assert [link["data-rail"] for link in rail_links] == chapter_order
    assert not candidate.select(".section-slide .cover-mark")
    for cover in candidate.select(".slide.section-slide"):
        kicker = cover.select_one(".cover-kicker")
        assert kicker and kicker.get_text(" ", strip=True) == rail_labels[cover["data-section"]]

    # The previewed PR/merge pages are explicitly separate from #3's current start.
    preview_pr = candidate.select_one('.slide[data-page="36"]')
    preview_merge = candidate.select_one('.slide[data-page="37"]')
    mainline_start = candidate.select_one('.slide[data-page="39"]')
    assert preview_pr and preview_pr.h1.get_text().startswith("概念預演 1/2")
    assert preview_merge and preview_merge.h1.get_text().startswith("概念預演 2/2")
    assert mainline_start and mainline_start.h1.get_text().startswith("回到主線")
    assert "現在從 Ready 進 Dev 實作" in mainline_start.h1.get_text()
    assert "#3 已開始" in mainline_start.get_text()
    manifest_by_number = {page["number"]: page for page in manifest["pages"]}
    assert "概念預演" in manifest_by_number[remap(34)]["notes"]
    assert "概念預演" in manifest_by_number[remap(35)]["notes"]
    assert "回到主線" in manifest_by_number[remap(36)]["notes"]

    # WIP policy and current count must stay distinct on the inherited scenes.
    backlog = candidate.select_one('.slide[data-page="15"]')
    all_ready = candidate.select_one('.slide[data-page="24"]')
    cadence = candidate.select_one('.slide[data-page="28"]')
    appendix = candidate.select_one('.slide[data-page="106"]')
    assert backlog and "上限：1" in backlog.get_text() and "目前：0/1" in backlog.get_text()
    assert "已開始但未完成的票數（WIP）" in backlog.get_text()
    assert all_ready and "上限：1" in all_ready.get_text() and "目前：0/1" in all_ready.get_text()
    assert cadence and all(text in cadence.get_text() for text in ["本課 WIP", "上限", "2/2"])
    assert appendix and "WIP 1/1" in appendix.get_text() and "WIP 0/1" in appendix.get_text() and "DoD" in appendix.get_text()
    assert all("WIP=1" not in page.get_text() for page in [backlog, all_ready, cadence, appendix])

    # Candidate recap models Human Gate as a decision point, not a status column.
    baseline_appendix = baseline.select_one('.slide[data-page="82"] .recap-board')
    appendix_board = appendix.select_one(".recap-board")
    assert baseline_appendix and baseline_appendix.select_one(":scope > .human-gate-column")
    assert appendix_board and not appendix_board.select_one(":scope > .human-gate-column")
    status_labels = [
        column.h3.get_text(" ", strip=True)
        for column in appendix_board.find_all("div", recursive=False)
        if column.select_one(":scope > h3")
    ]
    assert status_labels == ["Backlog", "Ready", "Dev", "Review", "QA", "Product Check", "Done"]
    assert appendix.select_one('[data-gate-next]') and appendix.select_one('[data-gate-reset]')
    assert appendix.select_one('[data-gate-message]')
    gate_marker = appendix_board.select_one(".board-parent .human-gate-transition")
    assert gate_marker and all(word in gate_marker.get_text() for word in ["Product Check", "Human Gate", "Done", "放行", "暫停"])
    assert "決策點" in appendix.get_text() and "不另增看板狀態" in appendix.get_text()

    assert len(manifest["pages"]) == 107
    assert [page["number"] for page in manifest["pages"]] == list(range(1, 108))
    assert [page["oldRev11Page"] for page in manifest["pages"] if page["oldRev11Page"] is not None] == legacy_pages
    assert [page["addedId"] for page in manifest["pages"] if page["addedId"]] == [row[4] for row in rows if row[4] != "—"]

    # Preserve the full legacy process diagram and its progressive emphasis.
    flow_page = next(page for page in manifest["pages"] if "P06" in page["sourceIds"])
    process = candidate.select_one(f'.slide[data-page="{flow_page["number"]}"]')
    assert process and process.select_one(".flow-visual .rev10-flow-svg")
    assert len(process.select(".flow-visual .fragment.flow-step")) == 2
    assert process.get("data-process-stage") == "0"
    assert process.select_one(".flow-return-step") and process.select_one("[data-process-next]")
    assert len(process.select(".flow-mobile-lane")) == 3

    # The generated notes keep each page's immediate handoff and review links.
    assert all(page["prerequisite"] and page["transition"] for page in manifest["pages"])
    assert all(page["materialRefs"] and page["sourceCommentUrls"] for page in manifest["pages"])
    assert any(ref["path"].endswith("plan-before-execution.md") for ref in manifest["pages"][remap(53)-1]["materialRefs"])
    a09 = candidate.select_one('.slide[data-page="58"]')
    assert a09 and "交辦" in a09.get_text() and "計畫" in a09.get_text() and "FAIL" in a09.get_text()
    full_a_hash = manifest["demo"]["versionA"]
    full_b_hash = manifest["demo"]["versionB"]
    assert len(full_a_hash) == len(full_b_hash) == 64
    assert full_a_hash[:12] not in a09.get_text() and full_a_hash not in a09.get_text()
    # Opening narrative must teach roles inside a flow before the detailed software-process section.
    expected_stages = ["問題", "輸入", "交付", "接受"]
    roadmap = candidate.select_one('.slide[data-page="2"]')
    role_page = candidate.select_one('.slide[data-page="6"]')
    review_page = candidate.select_one('.slide[data-page="7"]')
    agent_map = candidate.select_one('.slide[data-page="84"]')
    assert roadmap and role_page and review_page and agent_map
    assert len(roadmap.select('.r-human-step')) == 4
    assert [x.h2.get_text(" ", strip=True) for x in role_page.select('.r-human-step')] == expected_stages
    assert [x.h2.get_text(" ", strip=True) for x in review_page.select('.r-human-step')] == ["交付", "審查", "驗證", "接受"]
    assert len(agent_map.select('.r-human-step')) == 4
    assert all("→" in item.get_text() or len(item.select(".r-human-arrow"))==3 for item in [role_page,review_page])
    for slide in [roadmap,role_page,review_page,agent_map]:
        cards = slide.select('.r-human-step')
        assert len(cards)==4
        assert all(len(card.get_text(" ", strip=True))<95 for card in cards)
        assert all(card.select_one(".r-human-role") and card.select_one(".r-human-action") for card in cards)
        assert not slide.select(".r-cols-3 > .r-card"), "Dense role list must not return"
    for cover_num in [5,9,31,55,83,96]:
        assert candidate.select_one(f'.slide[data-page="{cover_num}"] .r-storyline-phase')
    assert all(word in role_page.get_text() for word in ["Product Owner", "Goal", "AC", "UI／UX（畫面設計）", "#1 Like", "#2 配對列表", "實作 #1／#2／#3", "需求方"])
    assert "Reviewer" in review_page.get_text() and "QA" in review_page.get_text()
    assert all(word in agent_map.get_text() for word in ["PO／UI／UX", "Dev", "Reviewer／QA", "需求方", "Human Gate"])
    like_intro = candidate.select_one('.slide[data-page="4"]')
    brainstorm = candidate.select_one('.slide[data-page="10"]')
    assert like_intro and all(term in like_intro.get_text() for term in ["Like＝表示喜歡", "Pass＝略過", "雙方都 Like 才配對"])
    assert brainstorm and "Brainstorming 先釐清為誰解決什麼問題" in brainstorm.get_text()
    assert "parent Goal / Epic" not in brainstorm.get_text()
    assert "Match" not in brainstorm.get_text()
    goal_page = candidate.select_one('.slide[data-page="11"]')
    decomposition = candidate.select_one('.slide[data-page="12"]')
    assert goal_page and "不是目前進度欄位" in goal_page.get_text() and "workflow state" not in goal_page.get_text()
    assert decomposition and "IMPLEMENTATION SUB-ISSUE" not in decomposition.get_text() and "parent issue" not in decomposition.get_text() and "Match" not in decomposition.get_text()
    assert "Backlog＝待釐清或退回的待辦" in backlog.get_text() and "Ready＝可以開工" in backlog.get_text()
    refinement = candidate.select_one('.slide[data-page="22"]')
    assert refinement and "工作票整理" in refinement.h1.get_text() and "把需求、例子與未決問題整理成可接手的票" in refinement.get_text()
    chapter_cover = candidate.select_one('.slide[data-page="9"]')
    assert chapter_cover and chapter_cover.get("data-section") == "C2"
    qa_return = candidate.select_one('.slide[data-page="42"]')
    assert qa_return and all(word in qa_return.get_text() for word in ["Version A", "1 筆 M01", "FAIL", "退回", "Version B", "0 筆", "PASS"])
    assert "重複 Like" not in qa_return.get_text()

    def added_page(added_id):
        page_number = next(int(row[0]) for row in rows if row[4] == added_id)
        return candidate.select_one(f'.slide[data-page="{page_number}"]')

    tradeoffs = added_page("A06").get_text()
    assert "好處" in tradeoffs and "代價" in tradeoffs
    wip_definition = added_page("A05").get_text()
    assert "2/2" in wip_definition and "#1" in wip_definition and "#2" in wip_definition
    demo = added_page("A07")
    assert demo and all(word in demo.get_text() for word in ["重置", "初始", "操作", "開啟"])
    assert demo.select_one('a[href*="matching-demo"]')
    agent_intro = added_page("A08").get_text()
    assert all(word in agent_intro for word in ["AI", "工具", "回到判斷"])

    context = added_page("A11").get_text()
    assert all(word in context for word in ["上限", "未讀", "NOT RUN"])
    unread_side = added_page("A11").select_one('.not-on-desk')
    assert unread_side and "exercise.md" in unread_side.get_text() and "合併" not in unread_side.get_text()
    a09_text = candidate.select_one('.slide[data-page="58"]').get_text()
    a10_text = candidate.select_one('.slide[data-page="59"]').get_text()
    for text in (a09_text, a10_text):
        assert not any(token in text for token in ["A09-replay", "byte-identical", "SHA-256", "raw JSON", "replay path"])
    assert "B-pre" in a10_text and "補驗前" in a10_text
    qa_evidence = candidate.select_one('.slide[data-page="46"]').get_text()
    assert all(word in qa_evidence for word in ["B-pre", "B-post", "單向", "雙向", "重複", "NOT RUN", "PASS", "UI"])
    assert "快轉" in qa_evidence
    canonical_result = candidate.select_one('.slide[data-page="47"]').get_text()
    assert all(word in canonical_result for word in ["單向", "Version A", "FAIL", "Version B", "PASS"])
    assert "Arrange：準備已配對狀態" not in canonical_result
    assert "UI" not in canonical_result or "NOT RUN" in canonical_result
    wip_page = candidate.select_one('.slide[data-page="73"]')
    assert wip_page and wip_page.get("data-wip-stage") == "workflow"
    assert wip_page.select_one("[data-wip-reveal]") and wip_page.select_one("[data-wip-sequence][hidden]")
    assert not wip_page.select_one('.r-revision')
    handoff = added_page("A14")
    assert handoff and "參考補驗指令" in handoff.get_text() and handoff.select_one('a[href*="B-pre-supplement"]')
    assert len(handoff.select("details.r-tech-reveal")) == 2
    assert all(not detail.has_attr("open") for detail in handoff.select("details.r-tech-reveal"))
    a13 = added_page("A13").get_text()
    assert full_b_hash[:12] not in a13 and full_b_hash not in a13
    a13_slide = added_page("A13")
    assert a13_slide.select_one('[data-wip-reveal]')
    assert a13_slide.select_one('[data-wip-sequence][hidden]')
    assert "補驗前" in a13_slide.select_one('.r-content').get_text()
    assert "補驗後" in a13_slide.select_one('[data-wip-sequence]').get_text()
    a13_reveal = a13_slide.select_one('[data-wip-sequence]')
    a13_exercise = (ROOT / "workshop/matching-demo/exercise.md").read_text()
    assert "同一個 B 版" in a13_reveal.get_text() and "不要改規則" in a13_reveal.get_text()
    assert "--artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case duplicate" in a13_exercise
    assert "--artifact" not in a13_reveal.get_text()
    assert a13_reveal.select_one('a[href*="matching-demo/exercise.md"]')
    a12 = added_page("A12").get_text()
    assert all(word in a12 for word in ["versions/B/matching.py", "fixtures/users.json", "run_case.py", "--artifact", "one-way"])
    memory_session = added_page("A17").get_text()
    assert all(word in memory_session for word in ["已保存的工作對話", "接續最近的工作對話", "核對工作狀態"])
    a17_manifest = next(page for page in manifest["pages"] if page["addedId"] == "A17")
    assert all(command in a17_manifest["notes"] for command in ["codex resume", "claude --continue", "claude --resume"])
    assert "操作指令、產品差異" not in memory_session
    context_first_use = added_page("A11").get_text()
    session_first_use = candidate.select_one('.slide[data-page="61"]').get_text()
    compact_first_use = candidate.select_one('.slide[data-page="62"]').get_text()
    memory_first_use = added_page("A16").get_text()
    assert "Context 是 AI 這一輪實際取得" in context_first_use
    assert "Session 是一段工作對話" in session_first_use
    assert "摘要" in compact_first_use and "精簡" in compact_first_use
    assert all(word in memory_first_use for word in ["產品", "過去對話", "設定"])

    for quiz_no in [8, 30, 38, 49, 54, 82, 95, 107]:
        quiz = candidate.select_one(f'.slide[data-page="{quiz_no}"]')
        assert quiz and len(quiz.select(".r-exit-card")) == 3
        assert len(quiz.select("details.r-exit-answer")) == 3
        assert all(not d.has_attr("open") and d.select_one("summary") for d in quiz.select("details.r-exit-answer"))
        assert "本章學完" in quiz.get_text() and "參考答案" in quiz.get_text()

    # 2026-10-09 dual-branch merge contract: preserve both the cloud opening
    # notice and the local corrections to status, evidence and review policy.
    assert "請用電腦版閱讀" in candidate.select_one('.slide[data-page="1"]').get_text()
    assert "手機版開發中" in candidate.select_one('.slide[data-page="1"]').get_text()
    expected_board = ["Backlog", "Ready", "Dev", "Review", "QA", "Product Check", "Done"]
    recap = candidate.select_one('.slide[data-page="93"]')
    assert [e.h2.get_text(" ", strip=True) for e in recap.select(".recap-columns > article")] == expected_board
    assert recap.select_one(".r-recap-gate-note") and "不新增看板欄位" in recap.get_text()
    assert not recap.select_one(".recap-columns > .recap-human-gate")
    flow = candidate.select_one('.slide[data-page="26"]')
    assert "Product Check" in flow.get_text() and "Goal Check" not in flow.get_text()
    assert flow.h1.get_text().startswith("本課示範流程")
    qa = candidate.select_one('.slide[data-page="41"]')
    assert qa.select_one(".r-scenario-note") and "Reviewer 看 code" in qa.get_text()
    done = candidate.select_one('.slide[data-page="52"]')
    journey = candidate.select_one('.slide[data-page="53"]')
    assert "教學假設" in done.get_text() and "NOT RUN" in done.get_text()
    assert "教學假設" in journey.get_text() and "NOT RUN" in journey.get_text()
    gate = candidate.select_one('.slide[data-page="91"]')
    assert "依風險" in gate.h1.get_text()
    assert "配置 A" in gate.get_text() and "配置 B" in gate.get_text()
    assert "慢速節奏" not in gate.get_text() and "快速節奏" not in gate.get_text()
    for page_data in manifest["pages"]:
        slide = candidate.select_one(f'.slide[data-page="{page_data["number"]}"]')
        assert slide.h1.get_text(" ", strip=True) == page_data["title"], page_data["number"]

    print("issue48 storyboard contract: 107 pages, unique mapping, ordering, manifest, baseline and P06 diagram OK")


if __name__ == "__main__":
    main()
