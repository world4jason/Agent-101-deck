# Agent 101 Deck

**v7 簡報；學習成效未驗證**

v7 依 [Issue #41](https://github.com/world4jason/Agent-101-deck/issues/41) 的 SSOT 編排，共六段、42 張投影片：

1. **軟體是怎麼被做出來的**：用 Matching 票 #3「雙向喜歡才配對」走過人類敏捷／看板流程。
2. **工作記錄在哪裡：Git 與 GitHub**：對照流程中的 Issue、branch、commit、PR 與 merge。
3. **把同一條流程交給 Agent**：呈現角色替換、產物交接、Human Gate，以及本簡報改寫紀錄。
4. **為什麼一隻 Agent 不夠**：比較 AI 使用方式、Single／Multiple、Chat-driven／Work-driven。
5. **讓多個 Agent 可靠協作的五個原則**：以具體工作產物說明五項原則。
6. **系統長什麼樣**：整合六層架構與 #3 的 Kanban 流轉。

本版不含第七段 Travel Lite。

## GitHub Pages

- `index.html` 導向 `/slides/`
- `slides/index.html` 是投影片
- `slides/styles.css` 負責視覺與響應式版面
- `slides/app.js` 負責鍵盤導覽、fragment 與 hash routing

不需要 build step，可直接用 GitHub Pages 發布。投影片支援鍵盤方向鍵、PageUp／PageDown、Home／End、頁面按鈕與網址 `#N` 導覽。

建議 Pages 設定：Deploy from a branch，選 `main` 與 `/(root)`。

## 導覽回歸檢查

改動投影片或導覽程式後，可用 Playwright 檢查桌機、手機、fragment、鍵盤、hash 與列印：

```bash
pip install playwright && python3 -m playwright install chromium
python3 tests/deck_check.py
```
