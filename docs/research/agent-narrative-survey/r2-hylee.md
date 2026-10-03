# 第 2 輪：李宏毅教授 AI Agent 課程補查與更正

**查核結論：第 1 輪的主要講義網址、課程與影片網址都存在，但有兩處敘述需要修正。**2024 年第 5 講的「勇者小隊」從 **18:51** 開始，軟體專案角色分工從 **20:31** 開始；18:09 談的是模型討論。2025 年秋季講義提到 ChatDev 並展示多 Agent 的 context 分隔，**具體的 Project Manager → Programmer → Tester 工作交接，則出現在 2024 年第 5 講**。[2024 年第 5 講逐字稿時間索引](https://lilys.ai/notes/795133)、[2025 年秋季講義，第 71–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=71)

以下的**講義頁碼已核對官方 PDF**。影片網址已與官方課程頁核對；精確影片時間則以第三方逐字稿或章節索引交叉核對，**本輪未能直接逐秒播放 YouTube 驗證**。找不到時間索引的地方，只列講義頁碼，不猜秒數。[2024 課程頁](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php)、[2025 春季課程頁](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php)、[2025 秋季課程頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php)

## 最值得補上的兩個段落

1. **2025 年秋季第 2 講，第 42 頁：直接區分三種用法。**講義並列「一般使用 AI 的一問一答」、依固定 SOP 執行的 **Agentic Workflow**（例子是批改作業：檢查相關性、給分、檢查分數），以及能自行決定步驟、調整計畫的 **AI Agent**。這張投影片可先替非工程師釐清 *chat、workflow、agent*，但它尚未主張每個 workflow 都需要多個 Agent。[官方講義，第 42 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=42)；[官方影片，第三方章節索引約 1:02:00](https://www.youtube.com/watch?v=lVdajtNpaGI&t=3720s)、[時間索引](https://podwise.ai/episodes/5489184)。

2. **2024 年第 5 講，20:31–22:11：直接接上軟體開發流程。**教授舉「完成一項程式專案」為例，先提出 Project Manager、寫程式者、測試者，再描述規劃交給 Programmer、程式交給 Tester、測試結果回到 Project Manager 的循環。**我的歸納：**這是銜接你已教過的看板流程最直接的一段；但教授是在展示模型合作的可能形式，沒有逐一對應你的 Refinement、PR Review、QA、Product/Goal Check 關卡。[官方影片，20:31 起](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s)、[逐字稿時間索引](https://lilys.ai/notes/795133)。

## 修正後：六個 chat 問題各有多少來源支持？

| Owner 的問題 | 課程實際內容與可用界線 |
|---|---|
| **一人分飾多角色** | **部分支持。**2024 年第 5 講先以「勇者小隊」說明不同職責（18:51），再以軟體專案說明 PM、程式與測試分工（20:31）。教授也說角色可以來自模型的專長，或由 prompt 指派（20:45–21:14）。**我的歸納：**可用來解釋分工；**查不到**教授明說「一般 chat 因一個 Agent 分飾多角而失敗」。尤其「不同角色」不必然等於「不同底層模型」。[官方影片，18:51、20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1131s)、[逐字稿時間索引](https://lilys.ai/notes/795133)。 |
| **context 污染** | **部分支持，宜換成更精確的描述。**2025 秋季講義列出對話歷史、記憶、外部資料、工具結果與推理都可能進入 context（第 40 頁）；接著談輸入過長、重要資訊被淹沒（第 46–52 頁）。**我的歸納：**可說「不同工作細節混在同一段 context，增加長度並干擾找重點」；「context 污染」不是這段講義的原用語。[官方講義，第 40、46–52 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=40)；[官方影片，第三方章節索引約 1:14:18](https://www.youtube.com/watch?v=lVdajtNpaGI&t=4458s)、[時間索引](https://podwise.ai/episodes/5489184)。 |
| **球員兼裁判** | **只支持「自我檢查有侷限」這個較窄的說法。**2024 年第 5 講在 05:49 談模型自我反省；12:03–13:05 比較自我反省與不同模型討論，指出前者較不容易推翻先前答案；15:32 引入另一個模型判斷討論是否達成共識。**我的歸納：**可借來說明為何要分開產出與檢查；**查不到**教授以「同一 Agent 寫程式又審自己的 PR」為例。片中的裁判判斷的是**共識**，不能說成它已驗證程式品質。[官方影片，05:49、12:03–13:05、15:32–16:27](https://www.youtube.com/watch?v=inebiWdQW-4&t=723s)、[逐字稿時間索引](https://lilys.ai/notes/795133)。 |
| **不能依問題選 model／effort，殺雞用牛刀** | **選模型與成本：有；調整 effort：查不到。**2023 年 FrugalGPT 講義明寫「殺雞不用牛刀」，以便宜模型處理簡單問題，難題才交給較強模型（第 9 頁）。2024 年第 5 講約 01:27–05:41 也講任務分派與 GPT-4 的成本。這些來源**不能證明一般 chat 一定無法選模型**，也沒有講同一模型的 effort 設定。[FrugalGPT 官方講義，第 9 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/FrugalGPT-v2.pdf#page=9)、[2024 年第 5 講影片，約 01:27–05:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=87s)、[逐字稿時間索引](https://lilys.ai/notes/795133)。 |
| **compact 後遺忘** | **支持「反覆摘要可能流失舊細節」，不支持特定指令的說法。**2025 秋季講義在第 67–68 頁畫出反覆摘要後，早期記憶逐漸消失；第 69–70 頁再提出把摘要存到外部、日後檢索。**我的歸納：**可用於說明壓縮的取捨；教授在這裡沒有特指 `/compact`。[官方講義，第 67–70 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=67)；[官方影片，第三方章節索引約 1:35:47](https://www.youtube.com/watch?v=lVdajtNpaGI&t=5747s)、[時間索引](https://podwise.ai/episodes/5489184)。 |
| **換 session 的交接** | **有歷史情境的直接對應。**2024 年第 9 講的「有記憶的 ChatGPT」從新對話重頭開始，接著展示摘要與檢索（第 11–14 頁）。2025 秋季講義第 24–27 頁也把對話歷史與長期記憶分開。**我的歸納：**適合說明「重要工作狀態需要可帶走的交接資料」；不能把 2024 年的投影片當成所有現今產品都沒有跨對話記憶的證據。2024 年第 9 講此段的精確影片時間：**查不到**。[2024 官方講義，第 11–14 頁](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf#page=11)、[官方影片](https://www.youtube.com/watch?v=bJZTJ7MjYqg)、[2025 秋季講義，第 24–27 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=24)。 |

## 來源實際怎麼過渡到 Agent、workflow 或多 Agent？

### 路徑一：一般使用方式 → 交付目標

**來源順序。**2024 年第 9 講先用「今日多數人使用 AI 的方式」對照「未來人類對 AI 的期待」（第 2–3 頁），才進入 AutoGPT 等 Agent 例子（第 4 頁）。2025 春季第 2 講把差別說得更明確：人給明確指令、AI 一個口令一個動作；或人給目標，AI 以多步驟行動並隨觀察調整（第 2–6 頁）。[2024 官方講義，第 2–4 頁](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf#page=2)、[2025 春季官方講義，第 2–6 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf#page=2)；[2025 春季影片，第三方章節索引 00:02–13:16](https://www.youtube.com/watch?v=M2Yg1kwPpts)、[時間索引](https://podwise.ai/episodes/3251161)。

**過渡用例。**2025 春季講義用下棋說明 Goal → Action → Observation：走一步後要看新的棋盤局面，再決定下一步。**我的歸納：**可以從「問 AI 一題」轉為「把目標交出去，讓它持續做下一步」。這條路徑引出的是 **Agent 的行動循環**，還沒有回答為何要多個 Agent。[官方講義，第 3–6 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf#page=3)。

### 路徑二：一問一答 → 工作變長、資訊變雜 → 分隔 context

**來源順序。**2025 秋季第 2 講先列出 context 的組成（第 40 頁），再把一問一答、固定 SOP workflow、可自行調整的 Agent 並列（第 42 頁）；接著畫出 Agent 持續行動造成輸入過長（第 45–46 頁），比較長輸入的問題（第 48–52 頁），最後提出 **Select、Compress、Multi-Agent** 三種管理方式（第 55 頁）。這是第 1 輪漏掉的、最完整的**問題到方法**過渡。[官方講義，第 40–55 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=40)；[官方影片，第三方章節索引 1:02:00、1:14:18、1:23:34](https://www.youtube.com/watch?v=lVdajtNpaGI&t=3720s)、[時間索引](https://podwise.ai/episodes/5489184)。

**過渡用例。**講義先讓單一 Agent 規劃旅行、訂餐廳、訂旅館，保留每次與網站互動的細節；下一頁改由主 Agent 分派兩個訂位工作，主 Agent 收到「訂好了」的回報，各執行 Agent 只保留自己任務的細節（第 72–73 頁）。**我的歸納：**這個例子說清楚的是「工作如何分派、結果如何交回、細節留在哪裡」，比籠統宣稱「一隻 Agent 不夠」更貼近你的 ticket 流程。[官方講義，第 72–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=72)；[官方影片，第三方章節索引約 1:42:21](https://www.youtube.com/watch?v=lVdajtNpaGI&t=6141s)、[時間索引](https://podwise.ai/episodes/5489184)。

### 路徑三：模型合作 → 分角色 → 軟體工作交接

**來源順序。**2024 年第 5 講從芙莉蓮與費倫合作開場，先談按能力和成本分派問題（約 01:27–05:41），再談模型自我反省與彼此討論（05:49–13:05）、討論的裁判（15:32）、勇者小隊的分工（18:51），最後落到軟體專案中 PM、程式與測試工作的交接（20:31–21:41）。[官方影片，開場至 21:41](https://www.youtube.com/watch?v=inebiWdQW-4)、[逐字稿時間索引](https://lilys.ai/notes/795133)。

**界線。**這一講是從「合作能帶來什麼」走向團隊，不是先逐項批評 chat。教授在 22:58–25:06 也提醒：當時模型團隊能否做好真實、複雜的軟體專案，仍未確定。**我的歸納：**適合取用它的「工作交接」例子，但不宜把角色分工、模型路由、獨立審查和 context 分隔說成同一件事。[官方影片，22:58–25:06](https://www.youtube.com/watch?v=inebiWdQW-4&t=1378s)、[逐字稿時間索引](https://lilys.ai/notes/795133)。

## 其他講次的位置

- **2024 年第 2 講〈從「工具」變為「工具人」〉是可補的前導。**講義先說 ChatGPT 不只有固定功能，使用者要說清楚想做什麼（第 2、11 頁）。**我的歸納：**它能替非工程師建立「從使用工具到交付任務」的語感；沒有直接論證多 Agent。[官方講義，第 2、11 頁](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0301/0301_universal.pdf#page=2)、[官方影片](https://www.youtube.com/watch?v=glBhOQ1_RkE)；相關精確影片時間**查不到**。
- **2025 春季第 2 講的後半段補的是單一 Agent 能力。**它依序談記憶、工具與規劃；工具結果可能誤導模型，計畫也需隨新觀察修改。這些內容不能直接改寫成「多 Agent 解決所有問題」。[官方講義，第 27、31–45、48–69、71–95 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf#page=27)；[官方影片，第三方章節索引 30:42、47:51、1:13:13](https://www.youtube.com/watch?v=M2Yg1kwPpts)、[時間索引](https://podwise.ai/episodes/3251161)。
- **2026 春季〈AI Agent 之間可以有什麼樣的互動〉確實存在，但主題不同。**官方課程頁列於 3/13；第三方章節索引的 00:41、06:09 分別是協作結構與 Agent 數量，後面延伸到遊戲與社交。它可補充「多 Agent 有多種互動方式」，不適合作為你那條軟體看板流程的主要依據。[官方課程頁，3/13](https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php)、[官方影片](https://www.youtube.com/watch?v=mmPmNezjCi0)、[時間索引](https://podwise.ai/episodes/7572310)。

## 給這兩段投影片的敘事歸納

**這是我的編排建議，不是教授某一講的原有順序：**

> **大家先用 chat 一問一答** → **任務一長，角色、資訊、檢查與交接都擠在同一段對話** → **先把工作寫成有明確產出與交接的流程** → **再視工作需要，把執行、檢查或不同子任務交給不同 Agent，並按任務選模型。**

第一個轉折可用 2025 秋季的「一問一答／固定 SOP／Agent」投影片；第二個轉折用同講的 context 過長與旅行訂位例子；最後接 2024 年第 5 講的 PM → Programmer → Tester 交接。六個問題中，**context、壓縮與交接有較直接的講義證據；角色分工、自我審查與模型成本有相近材料；「依任務調 effort」在上述課程中查不到。**[2025 秋季講義，第 42、46–55、67–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=42)、[2024 年第 5 講，20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s)、[FrugalGPT 講義，第 9 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/FrugalGPT-v2.pdf#page=9)。