你是 Agent 101 workshop 投影片的研究統整者。請用繁體中文作答，只做統整，不修改任何檔案。

## 要讀的資料（目前目錄：docs/research/agent-narrative-survey/）

- **Codex 路線**（gpt-6-sol 加網路搜尋）：`r2-stanford.md`、`r2-hylee.md`、`r2-github.md`、`r2-free.md`，以及先前的統整 `r3-synthesis.md`。
- **ChatGPT web 路線**（Extra High 加搜尋，owner 手動執行）：`web-manual/` 底下所有 `web-r2-*.md`。檔名帶「(1)」的是同一題另跑一次的結果。另有 `web-manual/standford-workflow-agent-vs-single-multi-agent.md`，是 owner 額外追問的一題：Stanford 如何區分 workflow vs agent，以及 single vs multi-agent。
- 這些檔案都要讀完。

## Owner 定的結構原則（修訂 10，必須遵守）

共 7 段，分三幕：

**第一幕：軟工＋版控**
1. 軟體是怎麼被做出來的：全貌，包括範例產品 Matching、流程圖、角色。
2. Git 與 GitHub。
3. 從想法到票、從票到上線：用同一張 #3 票走一遍，工具邊走邊帶出來；要講「怎樣是一張好票」，最後做總回顧。

**第二幕：Agent 從 chat 演進到現在**

4. 從 chat 開始，以及 chat 的問題。結尾帶到「那為什麼一隻 Agent 不夠」。
5. 交給多個 Agent。結尾帶出多 Agent 的問題，也就是 SHIFT：沒有 re-anchor 的話，多 Agent 會逐漸偏離初始目標；沒人糾正時，一點點偏誤都會隨迭代放大。

**第三幕：Agent＋軟工＋版控**

6. 為什麼多 Agent 要配合軟體工程：五個原則（External task state、Bounded execution、Role separation、Independent verification、Goal re-anchoring）。每個原則都要說明它解決第 4、5 段的哪個問題。
7. 重新走一次整個系統：用同一張 #3，把每個人類角色換成 Agent。例如 Brainstorming 原本是 PM／PO 討論，現在變成 PM Agent 和 PO Agent，後面依此類推；Human Gate 的位置也要標出來。

其他規則：
- single、multi、chat-driven、work-driven、workflow vs agent 這些概念，每個只在一個地方講清楚。
- 標題就是內容。
- 受眾不一定是工程師。

Owner 列出的 chat 問題：
- 一人分飾多角色
- context 污染
- 球員兼裁判
- 無法依問題選 model／effort（殺雞用牛刀）
- compact 之後遺忘
- 換 session 看不到前面的內容，也就是交接問題

## 請輸出

1. **兩條路線對照**：哪些結論兩邊都有、可信度高；哪些只有一邊有；哪些互相矛盾。矛盾的地方要附上兩邊的來源，並判斷哪一邊對。
2. **第 4、5、6 段逐頁草稿**：每頁寫出標題（就是內容）、一句話重點、主圖建議，以及依據的來源（網址加頁碼或時間點，必須取自上述檔案）。每段 3–6 頁。
3. **SHIFT（偏移放大）**：有沒有公開來源支持「多 Agent 或長任務中的小偏誤會隨迭代放大」？例如 error compounding、goal drift、cascading failures 這類說法。請列出來源；沒有就寫查不到。
4. **第 7 段逐頁草稿**：依流程順序寫出每一站由哪個 Agent 負責、交出什麼產物、存在哪裡、Human Gate 在哪。
5. **七段的段落標題候選**：每段 2 個，要具體，不能空泛。
6. **Owner 六點的證據界線**：沿用 r3-synthesis 的格式，用兩條路線的資料一起更新。

每個說法都要標明是「來源明示」還是「歸納」。查不到就寫查不到，不要編造。
