# Agent 101 Deck

**v6 Core pilot — 未經 #12 學員驗證**

這份簡報先講軟體工程與人類角色如何一起交付，再說明如何把有邊界、可驗收的工作交給 Agent。教學段落依序為 S0–S7；節奏由講師依受眾與情境控制，簡報不標分鐘數。

## 課程範圍

- **Core：**S0–S7（不含 S7-04、S7-05），從產品工作流、角色、Issue／AC、QA／Review、Git 版本狀態、Kanban、Agent 授權與 session handoff，最後以 Travel Lite 實作串起流程。
- **Optional：**S7-04、S7-05 與 O1。可依受眾選用，跳過不影響 Core 主線。
- **Appendix：**A1 詞彙查表、A2 框架對照，供查閱，不是 Core 前置。
- **Core／Advanced 邊界：**Core 用個人行程與靜態 GitHub Pages 站練習流程、修改、驗收和交接。Advanced Matching 路徑再處理 Frontend、Backend、Auth、共用資料庫與 A／B／C 權限情境；Advanced 不是 Core hands-on 的前置，也不表示已有公開服務。

## GitHub Pages

網站入口：

- `index.html` 會導向 `/slides/`
- `slides/index.html` 是主投影片
- `slides/styles.css` 負責視覺與 RWD
- `slides/app.js` 負責鍵盤導覽、fragment reveal 與 hash routing

不需要 build step，可直接用 GitHub Pages 發布。

建議 Pages 設定：

- Source: **Deploy from a branch**
- Branch: **main**
- Folder: **/(root)**

## 導覽操作與回歸檢查

- `→` / `PageDown` / `Space`：下一步；`←` / `PageUp`：上一步；`Home` / `End`：第一頁 / 最後一頁。
- 網址 `#N` 可直接跳到第 N 頁。
- 改動投影片或導覽程式後，可用瀏覽器逐頁檢查桌機、手機、fragment、鍵盤、hash 與列印：

```bash
pip install playwright && python3 -m playwright install chromium
python3 tests/deck_check.py
```

發布後網址預期為：

https://world4jason.github.io/Agent-101-deck/
