# Agent 101 Deck

給軟體開發小白的 90 分鐘工作坊。

主題不是「怎麼下更聰明的 Prompt」，而是：

> **一個需求，如何透過 Issue / AC / Git / PR / QA / Review / Release 變成可驗收的軟體，接著再把其中可驗收的工作交給 Agent。**

## GitHub Pages

網站入口：

- `index.html` 會導向 `/slides/`
- `slides/index.html` 是主投影片
- `slides/styles.css` 負責視覺與 RWD
- `slides/app.js` 負責鍵盤導覽、fragment reveal、hash routing

不需要 build step，可直接用 GitHub Pages 發布。

建議 Pages 設定：

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

## 導覽操作與回歸檢查

- `→` / `PageDown` / `Space`：下一步（先逐一顯示 fragment，再換頁）；`←` / `PageUp`：上一步；`Home` / `End`：第一頁 / 最後一頁。點過 Prev / Next 按鈕後方向鍵仍可用。
- 網址 `#N` 可直接跳到第 N 頁。鍵盤與按鈕導覽會更新網址但不新增瀏覽紀錄；手動改 hash 會新增紀錄，可用上一頁／下一頁返回同步。初次載入遇到無效 hash 會回到第 1 頁；載入後改成無效 hash 則保留目前頁面。

改動投影片或 `slides/app.js` 後，跑一次瀏覽器回歸檢查（逐頁 × 三種 viewport、fragment、鍵盤、hash、列印）：

```bash
pip install playwright && python3 -m playwright install chromium
python3 tests/deck_check.py
```

發布後網址預期為：

https://world4jason.github.io/Agent-101-deck/

## 教學主線

需求 → Issue + AC → Branch → PR → Verify → Review → Merge → Release → Post-release QA → Done

教學初期採用 **WIP=1** 作為執行政策：一次只推進一張工作卡。

## 四個 Section

1. 一個需求，怎麼變成軟體？
2. 怎麼把需求寫成可以開工的工作？
3. 一張 Issue，怎麼安全走到上線？
4. 哪些工作可以交給 Agent？
