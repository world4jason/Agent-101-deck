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
        if not re.match(r"\|\s*\d{2}\s*\|", line):
            continue
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        assert len(cells) == 9, f"Unexpected storyboard row: {line}"
        rows.append(cells)
    return rows


def main():
    rows = storyboard_rows()
    assert len(rows) == 99, f"Expected 99 candidate pages, got {len(rows)}"
    assert [int(row[0]) for row in rows] == list(range(1, 100))

    chapter_order = []
    for row in rows:
        if row[1] not in chapter_order:
            chapter_order.append(row[1])
    assert chapter_order == ["C0", "C2", "C1", "C3", "C4", "C5", "C6", "APP"]
    expected_counts = {"C0": 7, "C2": 21, "C1": 7, "C3": 10, "C4": 4, "C5": 27, "C6": 12, "APP": 11}
    assert {chapter: sum(row[1] == chapter for row in rows) for chapter in chapter_order} == expected_counts
    readme = (ROOT / "README.md").read_text()
    assert all(f"| {page_range} |" in readme for page_range in ["1–7", "8–28", "29–35", "36–45", "46–49", "50–76", "77–88", "89–99"])

    legacy_pages = [int(row[2]) for row in rows if row[2] != "—"]
    added_ids = [row[4] for row in rows if row[4] != "—"]
    source_ids = [token for row in rows for token in re.findall(r"[PNEX]\d+", row[3])]
    assert sorted(legacy_pages) == list(range(1, 83)), "Each legacy rev11 page must appear exactly once"
    assert sorted(added_ids) == [f"A{i:02}" for i in range(1, 18)], "Each A01–A17 page must appear exactly once"
    assert len(source_ids) == 90 and len(set(source_ids)) == 90, "Source IDs must remain unique and separate from legacy page numbers"
    g1_rows = []
    for line in (ROOT / "docs/issue49-review-fixes.md").read_text().splitlines():
        if re.match(r"\|\s*\d{2}\s*\|", line):
            cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
            if len(cells) == 7 and cells[0].isdigit():
                g1_rows.append(cells)
    assert len(g1_rows) == 99
    assert [int(row[1]) for row in g1_rows] == list(range(1, 8)) + list(range(11, 27)) + [9, 10] + list(range(27, 40)) + [8] + list(range(40, 100))
    assert [row[1] for row in rows[:7]] == ["C0"] * 7
    assert [row[1] for row in rows[7:28]] == ["C2"] * 21
    assert [row[1] for row in rows[35:45]] == ["C3"] * 10
    assert "Backlog" not in rows[12][8], "Define Backlog on page 14 before using it in the transition"

    # The latest approved memory order keeps the five principles in place and
    # inserts the two new pages between P46 and P31.
    assert [row[4] if row[4] != "—" else row[2] for row in rows[54:61]] == ["A11", "47", "46", "A16", "A17", "45", "48"]
    assert rows[25][6].startswith("Sprint 與 Kanban 描述不同的拉票節奏")
    assert "目前 WIP" in rows[26][6] and "上限" in rows[26][6]
    assert "上限" in rows[27][6] and "2/2" in rows[27][6]

    # Both formal candidate and preserved baseline must remain directly reviewable.
    baseline = BeautifulSoup((ROOT / "slides/rev11.html").read_text(), "html.parser")
    candidate = BeautifulSoup((ROOT / "slides/index.html").read_text(), "html.parser")
    assert len(baseline.select(".slide")) == 82
    assert len(candidate.select(".slide")) == 99
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
    preview_pr = candidate.select_one('.slide[data-page="34"]')
    preview_merge = candidate.select_one('.slide[data-page="35"]')
    mainline_start = candidate.select_one('.slide[data-page="36"]')
    assert preview_pr and preview_pr.h1.get_text().startswith("概念預演 1/2")
    assert preview_merge and preview_merge.h1.get_text().startswith("概念預演 2/2")
    assert mainline_start and mainline_start.h1.get_text().startswith("回到主線")
    assert "現在從 Ready 進 Dev 實作" in mainline_start.h1.get_text()
    assert "#3 已開始" in mainline_start.get_text()
    manifest_by_number = {page["number"]: page for page in manifest["pages"]}
    assert "概念預演" in manifest_by_number[34]["notes"]
    assert "概念預演" in manifest_by_number[35]["notes"]
    assert "回到主線" in manifest_by_number[36]["notes"]

    # WIP policy and current count must stay distinct on the inherited scenes.
    backlog = candidate.select_one('.slide[data-page="14"]')
    all_ready = candidate.select_one('.slide[data-page="23"]')
    cadence = candidate.select_one('.slide[data-page="27"]')
    appendix = candidate.select_one('.slide[data-page="99"]')
    assert backlog and "上限：1" in backlog.get_text() and "目前：0/1" in backlog.get_text()
    assert "已開始但未完成的票數（WIP）" in backlog.get_text()
    assert all_ready and "上限：1" in all_ready.get_text() and "目前：0/1" in all_ready.get_text()
    assert cadence and all(text in cadence.get_text() for text in ["已開始未完成的票數", "上限是政策設定", "2/2"])
    assert appendix and "上限：1" in appendix.get_text() and "目前：0/1" in appendix.get_text()
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
    gate_marker = appendix_board.select_one(".board-parent .human-gate-transition")
    assert gate_marker and all(word in gate_marker.get_text() for word in ["Product Check", "Human Gate", "Done", "放行", "暫停"])
    assert "決策點" in appendix.get_text() and "不另增看板狀態" in appendix.get_text()

    assert len(manifest["pages"]) == 99
    assert [page["number"] for page in manifest["pages"]] == list(range(1, 100))
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
    assert any(ref["path"].endswith("plan-before-execution.md") for ref in manifest["pages"][52]["materialRefs"])
    a09 = candidate.select_one('.slide[data-page="53"]')
    assert a09 and "交辦" in a09.get_text() and "計畫" in a09.get_text() and "FAIL" in a09.get_text()
    full_a_hash = manifest["demo"]["versionA"]
    full_b_hash = manifest["demo"]["versionB"]
    assert len(full_a_hash) == len(full_b_hash) == 64
    assert full_a_hash[:12] not in a09.get_text() and full_a_hash not in a09.get_text()
    role_page = candidate.select_one('.slide[data-page="6"]')
    assert role_page and len(role_page.select('.r-cols-3 .r-card')) == 3
    assert all(word in role_page.get_text() for word in ["Planning／PO", "UI／UX", "Developer", "輸入", "交付", "接手", "#1 Like", "#2 配對列表"])
    like_intro = candidate.select_one('.slide[data-page="4"]')
    brainstorm = candidate.select_one('.slide[data-page="9"]')
    assert like_intro and all(term in like_intro.get_text() for term in ["Like＝表示喜歡", "Pass＝略過", "雙方都 Like 才配對"])
    assert brainstorm and "Brainstorming：共同釐清使用者問題與可能方案" in brainstorm.get_text()
    assert "parent Goal / Epic" not in brainstorm.get_text()
    assert "Match" not in brainstorm.get_text()
    goal_page = candidate.select_one('.slide[data-page="10"]')
    decomposition = candidate.select_one('.slide[data-page="11"]')
    assert goal_page and "不是目前進度欄位" in goal_page.get_text() and "workflow state" not in goal_page.get_text()
    assert decomposition and "IMPLEMENTATION SUB-ISSUE" not in decomposition.get_text() and "parent issue" not in decomposition.get_text() and "Match" not in decomposition.get_text()
    assert "Backlog＝尚未開始的工作清單" in backlog.get_text() and "Ready＝資訊齊全、可以開始" in backlog.get_text()
    refinement = candidate.select_one('.slide[data-page="21"]')
    assert refinement and "工作票整理" in refinement.h1.get_text() and "把需求、例子與未決問題整理成可接手的票" in refinement.get_text()
    chapter_cover = candidate.select_one('.slide[data-page="8"]')
    assert chapter_cover and chapter_cover.get("data-section") == "C2"
    qa_return = candidate.select_one('.slide[data-page="39"]')
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
    a09_text = candidate.select_one('.slide[data-page="53"]').get_text()
    a10_text = candidate.select_one('.slide[data-page="54"]').get_text()
    for text in (a09_text, a10_text):
        assert not any(token in text for token in ["A09-replay", "byte-identical", "SHA-256", "raw JSON", "replay path"])
    assert "B-pre" in a10_text and "補驗前" in a10_text
    qa_evidence = candidate.select_one('.slide[data-page="43"]').get_text()
    assert all(word in qa_evidence for word in ["B-pre", "B-post", "單向", "雙向", "重複", "NOT RUN", "PASS", "UI"])
    assert "快轉" in qa_evidence
    canonical_result = candidate.select_one('.slide[data-page="44"]').get_text()
    assert all(word in canonical_result for word in ["單向", "Version A", "FAIL", "Version B", "PASS"])
    assert "Arrange：準備已配對狀態" not in canonical_result
    assert "UI" not in canonical_result or "NOT RUN" in canonical_result
    wip_page = candidate.select_one('.slide[data-page="68"]')
    assert wip_page and wip_page.get("data-wip-stage") == "workflow"
    assert wip_page.select_one("[data-wip-reveal]") and wip_page.select_one("[data-wip-sequence][hidden]")
    assert not wip_page.select_one('.r-revision')
    handoff = added_page("A14")
    assert handoff and "下一句交辦" in handoff.get_text() and handoff.select_one('a[href*="B-pre-supplement"]')
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
    session_first_use = candidate.select_one('.slide[data-page="56"]').get_text()
    compact_first_use = candidate.select_one('.slide[data-page="57"]').get_text()
    memory_first_use = added_page("A16").get_text()
    assert "Context 是 AI 這一輪實際取得" in context_first_use
    assert "Session 是一段工作對話" in session_first_use
    assert "摘要" in compact_first_use and "精簡" in compact_first_use
    assert all(word in memory_first_use for word in ["產品", "過去對話", "設定"])

    print("issue48 storyboard contract: 99 pages, unique mapping, ordering, manifest, baseline and P06 diagram OK")


if __name__ == "__main__":
    main()
