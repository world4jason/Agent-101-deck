# 第 1 輪：李宏毅教授的 AI Agent 課程

**結論：最貼近 owner 敘事的材料，分散在不同講次。**2024 年的 Agent 課從「多數人今天怎麼用 AI」切入；2025 年秋季課清楚呈現對話與 Agent 執行時的 context 問題；2024 年另一講才用模型討論、裁判和公司分工帶出多模型合作。**沒有查到他把 owner 的六點依序串成一套「先批評 chat，再交給多個 Agent」的講法。**以下的「有講」只表示找到對應材料，不等於教授用了 owner 的措辭。[2024 年課程頁，第 5、9 講](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php)、[2025 年秋季課程頁，第 2 講](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php)

## 1. 他如何開場？

- **2024 年第 9 講〈以大型語言模型打造的 AI Agent〉最接近「從一般使用者談起」。**講義先放「今日多數人使用 AI 的方式」，再對照人們期待 AI 接到任務後，能持續多步驟行動的 Agent；接著才舉 AutoGPT、虛擬村民等例子。這是教授的講義順序。**我的歸納：**它適合作為 workshop 從「問 AI 一題」轉到「交付一個目標」的橋，但講義沒有把一般 chat 描述成必然失敗。[原講義，第 2–5 頁](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf)、[影片，第 9 講](https://www.youtube.com/watch?v=bJZTJ7MjYqg)

- **2025 年春季第 2 講不是從 ChatGPT 使用困境開場。**講義先區分「給 AI 明確指令」與「給目標，讓 AI 自己想辦法」，再以 AlphaGo 的目標、觀察、行動循環引入 LLM Agent；後段才依序分析記憶、工具、規劃。[原講義，第 2–6、27 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf)、[影片，開場](https://www.youtube.com/watch?v=M2Yg1kwPpts)

- **2025 年秋季第 2 講則從 Context Engineering 開場。**它先說明輸入包含什麼，後面才比較一般一問一答與能自己決定步驟的 Agent；講義明列「選擇、壓縮、Multi-Agent」作為管理 context 的方法。[原講義，第 3、40–42、55 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf)、[影片，約 1:02:00 起談 Agent 時代的挑戰](https://www.youtube.com/watch?v=lVdajtNpaGI&t=3720s)。影片時間取自[第三方章節索引](https://podwise.ai/episodes/5489184)；內容以原講義核對。

## 2. 對照 owner 的六個問題

| Owner 的問題 | 查到的對應內容與界線 |
|---|---|
| **一人分飾多角色** | **部分對應。**2024 年第 5 講從不同模型討論，走到「勇者小隊」各有職責，再到 Product Manager、Architect、Project Manager、Engineer 等語言模型員工。**我的歸納：**這能支持「分工」；但**查不到**他明說「一般 chat 因一個 Agent 分飾多角而出問題」。[影片，18:09、約 20:00–23:34](https://www.youtube.com/watch?v=inebiWdQW-4&t=1089s)；時間可對照[逐字稿索引](https://lilys.ai/notes/795133)。 |
| **context 污染** | **部分對應，教授用語較精確地說是過長、塞爆、找不到重點。**2025 秋季講義列出對話歷史、記憶、工具輸出、推理都會進入 context；資料太多可能讓模型忽略關鍵資訊，之後用選擇、壓縮及分開 Agent 的 context 處理。**我的歸納：**「context 污染」可作 workshop 用語，但不要當成他的原話。[原講義，第 40、46–55、71–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf)、[影片，約 1:14:18 起](https://www.youtube.com/watch?v=lVdajtNpaGI&t=4458s)；時間據[章節索引](https://podwise.ai/episodes/5489184)。 |
| **球員兼裁判** | **部分對應。**2024 年第 5 講先談模型自己反省，再談讓模型 A、B 討論，並引入另一個「裁判模型」判斷是否達成共識；他也指出自我反省時，模型不容易推翻自己原先的答案。**我的歸納：**這支持分開「產出」與「檢查」的教學例子；**查不到**他直接把「同一 Agent 寫程式又審自己的 PR」定為問題。[影片，05:49、12:03–13:05、15:32–16:27](https://www.youtube.com/watch?v=inebiWdQW-4&t=349s)；時間可對照[逐字稿索引](https://lilys.ai/notes/795133)。 |
| **不能依問題選 model／effort，殺雞用牛刀** | **model：有講；effort：查不到。**2023 年 FrugalGPT 講義明列「殺雞不用牛刀」：簡單問題交給較便宜的模型，難題才交給較強的模型。2024 年第 5 講也以 GPT-4 成本說明任務分派。這些材料沒有證實他談「同一模型設定不同 effort」。[2023 年 FrugalGPT 講義，第 9 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/FrugalGPT-v2.pdf)、[2024 年影片，約 02:00–05:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=120s)。 |
| **compact 後遺忘** | **有相近內容，但須限定。**2025 秋季講義畫出反覆摘要歷史後「遙遠的記憶就逐漸隨風而逝」，也說可把摘要存到外部，日後檢索。**我的歸納：**可用來解釋壓縮可能丟失細節；**查不到**他在這裡特指某個產品的 `/compact` 指令。[原講義，第 67–70 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf)、[影片，約 1:35:47 起的「壓縮」章節](https://www.youtube.com/watch?v=lVdajtNpaGI&t=5747s)；時間據[章節索引](https://podwise.ai/episodes/5489184)。 |
| **換 session／對話的交接** | **有直接對應。**2024 年第 9 講的「有記憶的 ChatGPT」投影片寫「每次開始新對話，一切都重頭來過」，接著示範摘要與檢索。**我的歸納：**這是 owner 六點中最能直接引用來講「交接」的一條；投影片談的是當時的對話記憶問題，不宜推論所有現今產品仍完全沒有跨對話記憶。[原講義，第 11–14 頁](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf)、[影片，第 9 講](https://www.youtube.com/watch?v=bJZTJ7MjYqg)。該段精確影片時間**查不到**。 |

六點之外，**2025 春季第 2 講還深入談單一 Agent 的三項能力**：記憶要決定讀取、寫入和整理什麼；工具能擴大能力，但工具結果也可能誤導模型；計畫必須隨新觀察修正。這些是教授明確的課程主軸，不能直接改寫成「多 Agent 能解決全部問題」。[原講義，第 27、31–45、48–69、71–95 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf)、[影片](https://www.youtube.com/watch?v=M2Yg1kwPpts)。可用的**影片章節入口**約為記憶 [30:42](https://www.youtube.com/watch?v=M2Yg1kwPpts&t=1842s)、工具 [47:51](https://www.youtube.com/watch?v=M2Yg1kwPpts&t=2871s)、規劃 [1:13:13](https://www.youtube.com/watch?v=M2Yg1kwPpts&t=4393s)，時間據[第三方章節索引](https://podwise.ai/episodes/3251161)。

## 3. 他怎麼帶出多 Agent？

**2024 年第 5 講的順序**是：芙莉蓮與費倫合作的故事 → 不同能力與成本的模型如何分派任務 → 兩個模型互相討論 → 用另一個模型當裁判 → 不同角色組成團隊 → MetaGPT、ChatDev。這是從「合作能做什麼」帶出角色分工，而非先列一般 chat 的六項毛病。他提到開源專案裡有各種語言模型員工，同時提醒：當時這類團隊能否完成真實世界的複雜軟體專案，仍是未知。[影片，開場、約 02:00–05:41、14:07–16:27、21:41–25:06](https://www.youtube.com/watch?v=inebiWdQW-4)、[逐字稿時間索引](https://lilys.ai/notes/795133)。

**2025 年秋季課提供另一個理由：隔開工作細節。**講義先畫單一 Agent 安排行程、訂餐廳和旅館，再改成主 Agent 分派訂位工作；主 Agent 收到「訂好了」的回報，各執行 Agent 只保留自己任務的細節。它也引用 ChatDev 的設計、編碼、測試與角色流程。**我的歸納：**這比抽象說「一隻 Agent 不夠」更容易接上你的 ticket 看板，因為觀眾看得到每段工作交給誰，以及交回什麼。[原講義，第 71–76 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf)、[影片，約 1:42:21 起](https://www.youtube.com/watch?v=lVdajtNpaGI&t=6141s)；時間據[章節索引](https://podwise.ai/episodes/5489184)。

**2026 年春季另有一講專談 Agent 彼此互動**，依序談協作方式、Agent 數量的效果，再延伸到狼人殺、劇本殺與社交互動。它說明「多個 Agent」還可能是在比較溝通方式，**不等同**軟體流程的職務分工；不建議把這一講當作 ChatDev 角色流程的直接證據。[官方課程頁，3/13「AI Agent 之間可以有什麼樣的互動」](https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php)、[影片，00:00、00:41、06:09 章節](https://www.youtube.com/watch?v=mmPmNezjCi0)、[章節索引](https://podwise.ai/episodes/7572310)。

## 4. 對非工程師最有用的比喻與敘事啟示

- **「給指令」與「給目標」：**2025 春季講義用這個對照定義 Agent，再以「下棋：觀察棋盤、走一步、看新局面」解釋循環。適合放在從 chat 進入「交付任務」的位置。[原講義，第 2–5 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf)

- **「訂餐廳、訂旅館」：**2025 秋季講義讓觀眾直接看懂為何執行細節會擠滿同一段對話，以及分派後主 Agent 只需收到結果。這是我認為最適合你目前兩段投影片的例子。[原講義，第 72–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf)

- **「殺雞不用牛刀」與「勇者小隊」：**前者說清楚依難度選模型與成本；後者說清楚各角色有不同工作。兩個比喻服務不同論點，放在同一頁容易再次混淆「選模型」與「分職責」。最後這句是**我的投影片歸納**。[FrugalGPT 講義，第 9 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/FrugalGPT-v2.pdf)、[2024 年第 5 講，18:09–18:51](https://www.youtube.com/watch?v=inebiWdQW-4&t=1089s)、[時間索引](https://lilys.ai/notes/795133)

若要借用李宏毅教授的材料來重排這兩段，**我的建議順序**是：先用 2024 年第 9 講呈現「大家怎麼跟 AI 一問一答」；再用 2024 年的跨對話記憶與 2025 秋季的 context、壓縮案例呈現具體困難；最後才用「訂餐廳／訂旅館」和 ChatDev 接回你已教過的工作流程。角色分工、模型選擇、裁判檢查應各自對應一個問題，避免把它們統稱為「多 Agent 的好處」。這是**根據上述來源所作的課程編排歸納**，不是教授原有的單一講課順序。[2024 Agent 講義，第 2、11 頁](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf)、[2025 秋季講義，第 46–55、67–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf)