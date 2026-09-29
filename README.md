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
