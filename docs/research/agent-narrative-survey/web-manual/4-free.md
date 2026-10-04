# 第 4 份：free（ChatGPT web Extra High＋搜尋，同一個對話依序送出）

## 第 1 則訊息（直接整段貼上）

```
背景：我在做 Agent 101 workshop 投影片，受眾不一定是工程師。第一段已經教完軟體開發流程：Goal 拆成 ticket，ticket 在看板上依序經過 Refinement → Ready → Dev → PR Review → QA → Product/Goal Check → Done。接下來兩段要說明「為什麼一般人用 chat 跟 AI 協作會出問題，以及怎麼把這條流程交給多個 Agent」。

Owner 對現況的批評：目前「交給 Agent」和「為什麼一隻 Agent 不夠」兩段都在談 single agent、multi agent、chat-driven、work-driven，講得很混亂。

Owner 希望的敘事是：先講大家都在用 chat，再講 chat 有什麼問題，最後才帶出各種變形。Owner 列出的 chat 問題如下：
- 一人分飾多角色
- context 污染
- 球員兼裁判
- 沒辦法依不同問題選用不同的 model 和 effort，殺雞用牛刀
- compact 之後遺忘
- 換 session 看不到之前的內容等交接問題

本次研究規則：
- 用繁體中文回答。
- 每一點都要附來源網址，以及課程或影片的章節或時間點。
- 查不到就寫「查不到」，絕對不要編造課程名稱、講者或內容。
- 要分清楚哪些是來源原話，哪些是你自己的歸納。

任務（第 1 輪，自由探索）：不限定來源，請你自由搜尋網路上講得最好的說明，主題是「為什麼光用 chat 跟 AI 協作不夠，以及如何走向 workflow、多 agent、從看板拉工作」。來源可以是課程、論文、業界文章（例如 Anthropic、OpenAI、Google、LangChain、Microsoft 的官方文章）、知名部落格或演講，中英文都可以。

請整理：
1. 你找到最清楚的三到五種講法：各自的敘事順序、用了什麼比喻、主要論點。
2. 這些講法列出的 chat 或單一 agent 問題，請逐項對照 owner 列出的六點，標出哪些有提到、哪些沒有。
3. 有沒有我們沒想到、但很適合非工程師聽的問題或比喻。
4. single agent、multi agent、workflow、chat-driven、work-driven 這幾個概念，業界常見的分類和用詞是什麼？標出哪些詞是業界通用，哪些是少數人或特定來源才用的。
```

## 第 2 則訊息（等第 1 則回完，在同一個對話送出）

```
任務（第 2 輪，補查與驗證）：對象是你上一則回覆的 survey 結果。請：
(a) 逐一驗證每個來源網址與時間點都真實存在，錯誤的請更正或刪除；
(b) 補上第 1 輪漏掉的重要課程或段落；
(c) 特別找出這個來源怎麼從「chat 的限制」過渡到「多 agent 或 workflow」，以及中間用了哪些過渡句或例子。
請輸出修正後的完整版本。
```

## 存檔

把**第 2 則的回覆**全文存成 `web-r2-free.md`，放在這個資料夾。
