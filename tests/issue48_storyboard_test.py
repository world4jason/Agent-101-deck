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
    expected_counts = {"C0": 10, "C2": 19, "C1": 7, "C3": 9, "C4": 4, "C5": 27, "C6": 12, "APP": 11}
    assert {chapter: sum(row[1] == chapter for row in rows) for chapter in chapter_order} == expected_counts
    readme = (ROOT / "README.md").read_text()
    assert all(f"| {page_range} |" in readme for page_range in ["1–10", "11–29", "30–36", "37–45", "46–49", "50–76", "77–88", "89–99"])

    legacy_pages = [int(row[2]) for row in rows if row[2] != "—"]
    added_ids = [row[4] for row in rows if row[4] != "—"]
    source_ids = [token for row in rows for token in re.findall(r"[PNEX]\d+", row[3])]
    assert sorted(legacy_pages) == list(range(1, 83)), "Each legacy rev11 page must appear exactly once"
    assert sorted(added_ids) == [f"A{i:02}" for i in range(1, 18)], "Each A01–A17 page must appear exactly once"
    assert len(source_ids) == 90 and len(set(source_ids)) == 90, "Source IDs must remain unique and separate from legacy page numbers"

    # The latest approved memory order keeps the five principles in place and
    # inserts the two new pages between P46 and P31.
    assert [row[4] if row[4] != "—" else row[2] for row in rows[54:61]] == ["A11", "47", "46", "A16", "A17", "45", "48"]
    assert rows[26][6].startswith("Sprint 與 Kanban 描述不同的拉票節奏")
    assert "目前 WIP" in rows[27][6] and "上限" in rows[27][6]

    # Both formal candidate and preserved baseline must remain directly reviewable.
    baseline = BeautifulSoup((ROOT / "slides/rev11.html").read_text(), "html.parser")
    candidate = BeautifulSoup((ROOT / "slides/index.html").read_text(), "html.parser")
    assert len(baseline.select(".slide")) == 82
    assert len(candidate.select(".slide")) == 99

    # WIP policy and current count must stay distinct on the inherited scenes.
    backlog = candidate.select_one('.slide[data-page="24"]')
    all_ready = candidate.select_one('.slide[data-page="26"]')
    cadence = candidate.select_one('.slide[data-page="27"]')
    appendix = candidate.select_one('.slide[data-page="99"]')
    assert backlog and "上限：1" in backlog.get_text() and "目前：0/1" in backlog.get_text()
    assert all_ready and "上限：1" in all_ready.get_text() and "目前：0/1" in all_ready.get_text()
    assert cadence and all(text in cadence.get_text() for text in ["已開始未完成的票數", "上限：1", "0/1"])
    assert appendix and "上限：1" in appendix.get_text() and "目前：0/1" in appendix.get_text()
    assert all("WIP=1" not in page.get_text() for page in [backlog, all_ready, cadence, appendix])

    manifest = json.loads((ROOT / "drafts/rev12-review/manifest.json").read_text())
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
    assert full_a_hash[:12] in a09.get_text() and full_a_hash not in a09.get_text()
    role_page = candidate.select_one('.slide[data-page="6"]')
    assert role_page and len(role_page.select('.r-cols-3 .r-card')) == 3
    assert all(word in role_page.get_text() for word in ["Planning／PO", "UI／UX", "Developer", "輸入", "交付", "接手", "#1 Like", "#2 配對列表"])
    return_page = candidate.select_one('.slide[data-page="8"]')
    assert return_page and all(word in return_page.get_text() for word in ["單向", "FAIL", "退回", "重驗"])
    assert len(return_page.select('.r-cols-3 .r-card')) == 3 and len(return_page.select('a[href*="one-way.json"]')) == 2

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
    assert all(word in context for word in ["容量有限", "未讀", "NOT RUN"])
    unread_side = added_page("A11").select_one('.not-on-desk')
    assert unread_side and "exercise.md" in unread_side.get_text() and "合併" not in unread_side.get_text()
    wip_page = candidate.select_one('.slide[data-page="68"]')
    assert wip_page and wip_page.get("data-wip-stage") == "workflow"
    assert wip_page.select_one("[data-wip-reveal]") and wip_page.select_one("[data-wip-sequence][hidden]")
    assert not wip_page.select_one('.r-revision')
    handoff = added_page("A14")
    assert handoff and "下一句交辦" in handoff.get_text() and handoff.select_one('a[href*="B-pre-supplement"]')
    a13 = added_page("A13").get_text()
    assert full_b_hash[:12] in a13 and full_b_hash not in a13
    memory_session = added_page("A17").get_text()
    assert all(word in memory_session for word in ["讀票", "核對版本", "確認未測"])
    assert "操作指令、產品差異" not in memory_session

    print("issue48 storyboard contract: 99 pages, unique mapping, ordering, manifest, baseline and P06 diagram OK")


if __name__ == "__main__":
    main()
