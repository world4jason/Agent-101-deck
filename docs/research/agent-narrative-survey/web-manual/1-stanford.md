# 第 1 份：stanford（ChatGPT web Extra High＋搜尋，同一個對話依序送出）

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

任務（第 1 輪，只查 Stanford）：請盡可能深入調查 Stanford 的 AI agent／LLM agent 相關課程與公開講座，例如 CS329A、CS25、CS224N 和 CS324 中的 agent 章節，以及 Stanford Online 或 HAI 的講座。若某門課實際上屬於別的學校（例如 Berkeley 的 LLM Agents MOOC），請標明不是 Stanford，並另外列出。

請整理：
1. 他們如何開場介紹 agent？是否從 chat 或 LLM 單次對話出發，指出它的限制？
2. 他們講了哪些 chat 或單一 agent 的問題？請對照 owner 列出的六點，說明哪些有講、哪些沒講。
3. 他們如何介紹 single agent、multi-agent、workflow 與 agent 的差別（例如 Anthropic 的 "Building effective agents" 提出的 workflows vs agents），以及 orchestrator-worker 和 evaluator 等模式？順序是什麼？
4. 有哪些適合非工程師的比喻或圖？
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

把**第 2 則的回覆**全文存成 `web-r2-stanford.md`，放在這個資料夾。
