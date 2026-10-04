# 李宏毅教授 AI Agent 課程 Survey — 第 2 輪補查與驗證（修正版）

> 研究日期：2026-10-04  
> 目的：供 Agent 101 workshop 敘事設計使用。  
> 規則：只保留可核實內容；無法核實的精確時間點明寫「查不到」。來源原話／課程明確主張與我的歸納分開標示。

---

## 0. 第 2 輪驗證後的核心結論

先講最重要的修正：

1. **李宏毅其實有一堂 2024 年的 Agent 課，開場非常接近 Owner 想要的敘事。**  
   《生成式 AI 導論 2024》第 9 講一開始就是「今日多數人使用 AI 的方式」，先講一般人通常叫 AI 做一件事，再對比人類會做多步驟、需要規劃與臨場調整的複雜任務，才導入 AI Agent。  
   這比 2025 春季那堂 Agent 課更貼近「先從大家怎麼用 AI / chat 講起」。

2. **但李宏毅沒有把 Owner 的六個 chat 痛點一次整理成一組。**  
   六點分散在 2024、2025、2026 不同課程中。最接近的來源組合是：
   - 2024 第 5 講：模型選擇、成本、反省 vs 多模型討論、角色分工、MetaGPT / ChatDev。
   - 2024 第 9 講：一般 AI 使用方式 → 多步驟 Agent；新對話「一切都重頭來過」。
   - 2025 秋季 Context Engineering：dialogue history、memory、tool use、reasoning 全部塞進 context；長 context 會失效；Select / Compress / Multi-Agent。
   - 2026 AI Agent 1/3：compression 會造成 Context Collapse；sub-agent 可視為「自主壓縮／context 隔離」。
   - 2026 AI Agent 2/3：多 agent 協作本身的拓撲、數量與互動。

3. **最適合 Agent 101 的敘事，不是照任何一堂課原封不動搬。**  
   如果目標是「大家都在 chat → chat 開始出問題 → workflow → multi-agent」，最好的做法是把李宏毅不同年份的材料重新編排。這是**我的歸納**，不是李宏毅某一堂課的原始順序。

4. **Owner 六點中，李宏毅明確覆蓋程度如下：**
   - 一人分飾多角色：**部分覆蓋**，他從「不同角色組成團隊」的解法講，不是把「一隻 agent 分飾多角」明確列成問題。
   - context 污染：**高度覆蓋**，尤其 2025 Context Engineering / 2026。
   - 球員兼裁判：**概念上覆蓋**，透過 self-reflection vs multi-agent debate；但「球員兼裁判」不是他的原話。
   - 不同問題選不同 model / effort、殺雞用牛刀：**model / 成本明確覆蓋；effort 這個產品層級概念查不到。**
   - compact 後遺忘：**compression 導致資訊丟失明確覆蓋；若特指 ChatGPT 的 compact 功能，查不到。**
   - 換 session 看不到之前內容／交接：**明確覆蓋**，2024 投影片甚至直接寫「每次開始新對話，一切都重頭來過」。

---

# 1. 已驗證的主要來源

## A. 2024《生成式人工智慧導論》第 5 講
**課名：**「訓練不了人工智慧？你可以訓練你自己（下）— 讓語言彼此合作，把一個人活成一個團隊」

- 官方課程頁：  
  https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php
- 官方 YouTube：  
  https://www.youtube.com/watch?v=inebiWdQW-4
- 可交叉核對章節的課程筆記：  
  https://hackmd.io/@shaoeChen/SyIc2wOZC

**官方頁面可驗證：** 2024/3/22 課程確實列出這支影片。  
**相關章節：**
- 模型合作：讓合適的模型做合適的事情
- 模型合作：讓模型彼此討論
- 反省 vs 討論
- 引入不同角色／組建團隊
- 開源專案 MetaGPT / ChatDev

**精確影片時間：查不到。**  
目前可找到的公開課程筆記沒有可靠逐段時間碼，因此以下只引用章節，不猜時間。

---

## B. 2024《生成式人工智慧導論》第 9 講
**課名：**「以大型語言模型打造的 AI Agent」

- 官方課程頁：  
  https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php
- 官方 YouTube：  
  https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 官方投影片 PDF：  
  https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf
- 課程筆記（用於文字交叉核對）：  
  https://hackmd.io/@shaoeChen/SJxkkqtGA

**官方投影片可直接驗證的重要頁面：**
- p.2：「今日多數人使用 AI 的方式」
- p.3：「未來人類對 AI 的期待」
- p.10：Agent = 終極目標、計畫、記憶、狀態、行動
- p.11：「有記憶的 ChatGPT」；「每次開始新對話，一切都重頭來過」
- p.20 起：計畫、行動、反思
- 影片標題本身標出 **14:50** 為芙莉蓮泥人哥列姆示範段落

這是本次補查後，**最值得 Agent 101 借鑑的早期開場來源**。

---

## C. 2025 春季《生成式 AI 時代下的機器學習》AI Agent
**課名：**「一堂課搞懂 AI Agent 的原理（AI 如何透過經驗調整行為、使用工具和做計劃）」

- 官方課程頁：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php
- 官方 YouTube：  
  https://www.youtube.com/watch?v=M2Yg1kwPpts
- 官方投影片 PDF：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf

**官方投影片章節：**
- p.2：今天使用 AI 的方式 vs AI Agent
- p.3–10：Goal / Action / Observation、RL 與直接使用 LLM
- p.27：AI Agent 關鍵能力：經驗、工具、計畫
- p.31–46：Agent Memory / Read / Write / Reflection / 有記憶的 ChatGPT
- p.48 起：Tool Use
- 後段：Planning

**精確影片分段時間：大多查不到。**  
官方 YouTube 搜尋結果沒有提供完整 chapter timestamp，因此以官方投影片頁數作為可驗證章節定位。

---

## D. 2025 秋季《生成式人工智慧與機器學習導論》第 2 講
**課名：**「上下文工程（Context Engineering）— AI Agent 背後的關鍵技術」

- 官方課程頁：  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php
- 官方 YouTube：  
  https://www.youtube.com/watch?v=lVdajtNpaGI
- 官方投影片 PDF：  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf

**這是和 Owner 所列 chat 問題最接近的一堂。**

官方投影片可驗證：
- p.24：Dialogue History = 短期記憶
- p.25：過去如果開啟新對話……
- p.40：Context 包含 User Prompt、System Prompt、Dialogue History、Memory、外部資訊、Tool Use、Reasoning；結論是「Very long」
- p.41：一般使用 AI（一問一答）→ Agentic Workflow（固定 SOP）→ AI Agent（自行決定步驟、靈活調整計畫）
- p.45–52：AI Agent 持續累積 observation / action，輸入過長；Long Context 不代表能理解 Long Context；Lost in the Middle / Context Rot
- p.54：Context Engineering 基本策略：**Select / Compress / Multi-Agent**
- p.59：不要把所有工具說明全塞進 context
- p.60–61：Memory RAG，不必不斷回憶 Agent 一生
- p.67–70：壓縮歷史；細節可外存、日後 RAG 取回
- p.71：Multi-Agent / ChatDev
- p.72–73：旅遊訂餐廳／訂旅館，Lead Agent 只收到「訂好了」，各 agent 的 context 只保留自己的工作
- p.74 起：用 overview paper 說明 multi-agent 分工

**精確影片時間：查不到。**  
官方投影片能精確定位頁面，但未找到可獨立驗證的完整 YouTube 章節時間表，因此不猜。

---

## E. 2026 春季 Machine Learning：AI Agent 1/3
**課名：**「核心技術 Context Engineering 基本概念解說」

- 官方課程頁：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php
- 官方 YouTube：  
  https://www.youtube.com/watch?v=urwDLyNa9FU
- 有逐段時間碼的課程整理：  
  https://hackmd.io/r4DPEoLPT3WCHg6dw5w5yA
- 另一份時間章節索引：  
  https://podwise.ai/episodes/7572311

**可交叉核對的時間點：**
- 00:00–01:08：課程介紹
- 01:08–03:08：LLM 只處理當前輸入；Agent 工作愈久，歷史會一直串進 context
- 03:08–04:43：AI Agent 作為 LLM 的「守門人」，管理它真正看到的輸入
- 04:43–08:56：Context 壓縮；包含 compaction / summary
- 17:38 左右：Context Collapse；摘要可能把任務關鍵資訊壓掉
- 30:21–31:58：**Sub-agent 可以視為自主壓縮**
- 31:58–34:17：sub-agent 搜尋論文例子；只回傳必要結果，主 agent 不保留整段搜尋過程
- 36:05–40:03：從源頭過濾 context
- 40:03 起：Memory / Skill 按需載入
- 44:34 起：Agentic Context Engineering

> 注意：這些細時間碼來自第三方課程整理，不是 YouTube 官方 chapters；但至少有兩份獨立索引互相吻合，因此可用於「定位」，不應假裝是官方章節。

---

## F. 2026 春季 Machine Learning：AI Agent 2/3
**課名：**「AI Agent 之間可以有什麼樣的互動」

- 官方課程頁：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php
- 官方 YouTube：  
  https://www.youtube.com/watch?v=mmPmNezjCi0
- 時間章節索引：  
  https://podwise.ai/episodes/7572310

可核對的時間點：
- 00:00：多個 agent 協作，「多個臭皮匠勝過一個諸葛亮」
- 00:41：不同 agent 互動拓撲
- 06:09：agent 數量與效能 scaling
- 07:10：狼人殺
- 10:03：劇本殺
- 13:44：agent 社交實驗
- 18:56：agent 自我意識與社交

這堂比較偏「agent-agent interaction」，不是最適合拿來解釋 chat 為何出問題，但適合放在 multi-agent 之後作延伸。

---

# 2. 他如何開場介紹 AI Agent？是否從一般使用者如何用 ChatGPT 談起？

## 2.1 2024 第 9 講：答案是「是，而且非常接近」

### 【來源明確主張】
官方投影片一開始就是：

- p.2：「今日多數人使用 AI 的方式」
- 接著對比「未來人類對 AI 的期待」
- 課程筆記進一步記錄：多數人叫 AI 做的是單一任務，例如問問題、翻譯、畫圖；但人類能完成有順序、需要因環境調整的多步驟工作，例如辦聚餐。

來源：
- PDF：https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf
- 影片：https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 章節：開場 p.2–3；精確影片時間查不到。

### 【我的歸納】
這堂的開場其實非常適合 workshop：

> **現在：你叫 AI 做一件事。**  
> **期待：你只給它一個任務／目標，它自己完成一連串工作。**

它不是從術語「single agent / multi-agent」開始，而是先建立使用者熟悉的互動差異。

而且它比「ChatGPT 很笨」更好：問題不在模型單次回答能力，而在**工作本身跨很多步、會遇到新狀況、需要持續保存狀態並改計畫**。

---

## 2.2 2025 春季 AI Agent：也是從一般使用方式切入，但更像「指令 vs 目標」

### 【來源明確主張】
官方投影片 p.2 直接對照：

- 今天使用 AI：人類給明確指令，AI「一個口令、一個動作」
- AI Agent：人類給目標，AI 自己想辦法達成；工作可能需要多步驟並靈活調整計畫

來源：
- PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 影片：https://www.youtube.com/watch?v=M2Yg1kwPpts
- 章節：投影片 p.2；精確影片時間查不到。

### 【我的歸納】
2025 版本已經把 2024 的「single task vs complex task」收斂成更漂亮的一句：

> **Instruction-driven → Goal-driven**

但是它後面主要往 Agent 的 memory / tool / planning 原理走，**不是**往「Chat 的六個缺點 → multi-agent」走。

---

## 2.3 2025 秋季：最適合講「chat → workflow → agent」

### 【來源明確主張】
官方投影片 p.41 直接把三種方式放在一起：

1. 一般使用 AI：一問一答
2. Agentic Workflow：按照固定 SOP
3. AI Agent：自己決定解決問題的步驟、靈活調整計畫

來源：
- PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 影片：https://www.youtube.com/watch?v=lVdajtNpaGI
- 章節：投影片 p.41。

### 【我的歸納】
如果 Agent 101 要把「chat-driven / work-driven / agentic」講清楚，這張比硬定義術語有效：

**一問一答 → 固定工作流 → 自主工作流**

它自然接得上你前一段已經教的 ticket / Kanban 軟體流程。

---

# 3. Owner 六個 chat 問題逐一對照

| Owner 的問題 | 李宏毅有沒有講 | 最接近來源 | 判定 |
|---|---|---|---|
| 一人分飾多角色 | 有角色分工，但沒有把「單一 chat 分飾多角」明列為問題 | 2024 第5講「引入不同角色／組建團隊」 | **部分覆蓋** |
| context 污染 | 明確而且大量 | 2025 Context Engineering；2026 Agent 1/3 | **高度覆蓋** |
| 球員兼裁判 | self-reflection vs multi-model discussion 有對應概念，但沒有這個說法 | 2024 第5講 | **概念覆蓋** |
| 不同問題不同 model / effort，殺雞用牛刀 | 不同模型、不同能力、不同成本明確講；effort 查不到 | 2024 第5講 | **model 有；effort 查不到** |
| compact 後遺忘 | compression 會丟掉重要資訊明確講；ChatGPT 特定 compact 功能查不到 | 2025 秋、2026 Agent 1/3 | **概念明確覆蓋** |
| 換 session 看不到之前內容／交接 | 明確講 | 2024 第9講；2025 Context Engineering | **明確覆蓋** |

下面逐點展開。

---

## 3.1 一人分飾多角色

### 【來源明確主張】
2024 第 5 講從模型合作一路帶到「團隊需要有不同角色」。課程筆記記錄的軟體專案例子包含：

- PM
- 使用者／測試者
- 程式設計師

不同模型扮演不同角色，各自專注在自己的部分。

來源：
- 官方影片：https://www.youtube.com/watch?v=inebiWdQW-4
- 章節筆記：https://hackmd.io/@shaoeChen/SyIc2wOZC
- 章節：「團隊需要有不同的角色」→「引入不同的角色－組建團隊」
- 精確影片時間：**查不到**

### 【我的歸納】
這可以支持你的「一人分飾多角色會開始不自然」論點，但要注意：

**李宏毅講的是 solution：團隊裡應有不同角色。**  
他沒有明講：「因為一隻 agent 同時當 PM / Dev / Reviewer / QA，所以一定會失敗。」

所以投影片可以寫成你的推論，但不要掛成李宏毅原話。

---

## 3.2 context 污染／上下文愈做愈髒

### 【來源明確主張】
2025 Context Engineering 是最強證據。

投影片 p.40 列出 Context 內會出現：
- User prompt
- System prompt
- Dialogue history
- Memory
- 外部檢索資訊
- Tool use
- Reasoning

然後直接標示 **Very long**，下一頁再從一般一問一答轉到 workflow / agent。到 p.45，Agent 每一步的 observation / action 都持續累積，核心挑戰就是「輸入過長」。

後面更進一步談：
- Long Context 不代表真的理解長 context
- Lost in the Middle
- Context Rot
- Context Engineering = 把需要的放進去、不需要的清出去
- 三大方法：Select / Compress / Multi-Agent

來源：
- PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 影片：https://www.youtube.com/watch?v=lVdajtNpaGI
- 章節：p.40、p.45–54。

### 【我的歸納】
Owner 說的「context 污染」不是李宏毅在這堂課固定使用的單一術語，但概念完全對上：

> **長工作不是只怕 token 不夠；是有用、沒用、過時、瑣碎的東西一起累積，模型反而更難抓住真正重要的狀態。**

這是「chat-driven 做長任務」最應該先講的根本問題。

---

## 3.3 球員兼裁判

### 【來源明確主張】
2024 第 5 講先談 self-reflection，再比較 multi-model discussion。課程筆記對應論文結果指出：

- 自我反省時，模型推翻自己前一個答案的機率較低
- 多模型討論比較容易得到新的刺激、推翻先前答案

後面也介紹「裁判模型」判斷討論是否結束。

來源：
- 官方影片：https://www.youtube.com/watch?v=inebiWdQW-4
- 課程筆記：https://hackmd.io/@shaoeChen/SyIc2wOZC
- 章節：「反省 vs 討論」／「討論要怎麼停下來？」
- 精確時間：**查不到**

### 【我的歸納】
「球員兼裁判」是非常好的 workshop 比喻，但**不是李宏毅的原話**。

你可以安全地說：

> 李宏毅課程裡比較了「自己反省自己的答案」和「讓其他模型加入討論」；後者更容易帶來真正不同的觀點。  
> **把它翻成 workshop 語言，就是：不要總讓同一個人同時當作者與 reviewer。**

這個翻譯是我們的教學歸納。

---

## 3.4 不同問題應該選不同 model；殺雞焉用牛刀

### 【來源明確主張】
2024 第 5 講有一整段「讓合適的模型做合適的事情」。

課程筆記明確整理：
- 不同模型有不同能力
- 使用成本不同
- 可以再用一個模型做 routing，決定任務交給哪個模型
- 簡單工作可以交給便宜模型，合作可降低成本
- 對應 FrugalGPT

其中筆記直接用了「殺雞焉用牛刀」這個說法。

來源：
- 官方影片：https://www.youtube.com/watch?v=inebiWdQW-4
- 課程筆記：https://hackmd.io/uSMSupRPR2Kz71Tvrt4F7w
- 章節：「模型合作：讓合適的模型做合適的事情」
- 精確時間：**查不到**

2025 春季 Agent 投影片也把「Other AI」列成工具，並標示不同 AI 有不同能力，有些更強但更昂貴：
- https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 章節：p.48、p.52 起。

### 【我的歸納】
這一點與 Owner 想講的非常接近，但要拆成兩層：

- **不同 model / cost routing：有直接來源。**
- **不同 thinking effort / reasoning effort：查不到李宏毅在上述 Agent 課中明確這樣講。**

因此投影片如果寫「不同 model / effort」，最好把 effort 標成你自己延伸的現代產品實務，不要說李宏毅有講。

---

## 3.5 compact 後遺忘

### 【來源明確主張：2025】
2025 Context Engineering 投影片 p.67–70 直接講「壓縮內容」：

- 歷史 observation / action 會被摘要成較短 history
- 遙遠的記憶會逐漸被壓掉
- 訂位這類 computer-use 過程很瑣碎，成功後只需要保留「A 餐廳訂位成功」等結果
- 若擔心詳細內容之後還需要，可以外存，再透過 RAG 取回

來源：
- https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 章節：p.67–70。

### 【來源明確主張：2026】
2026 Agent 1/3 進一步講到 **Context Collapse**：

- 普通摘要雖然變短，卻可能刪掉任務真正需要的重要資訊
- 被壓縮後，本來答得對的任務反而可能失敗

時間索引：
- 約 **17:38**：Context Collapse
- **30:21–31:58**：Sub-agent = 自主壓縮
- **31:58–34:17**：sub-agent 只回傳必要成果，整段中間過程不回到主 context

來源：
- 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php
- 影片：https://www.youtube.com/watch?v=urwDLyNa9FU
- 時間整理：https://hackmd.io/r4DPEoLPT3WCHg6dw5w5yA

### 【我的歸納】
這足以支持：

> **compact / summary 不是免費的。它用較短 context 換取資訊損失風險。**

但若 Owner 所謂 compact 是特指某個 ChatGPT / Codex 產品裡名為 `compact` 的功能：

**查不到李宏毅在這些來源中針對該產品功能本身下過同樣結論。**

要寫成「Context compression 可能遺失關鍵資訊」才最準。

---

## 3.6 換 session 看不到之前內容／交接問題

### 【來源原始投影片非常直接】
2024 第 9 講官方投影片 p.11：

> 「每次開始新對話，一切都重頭來過」

同一段接著用「有記憶的 ChatGPT」、摘要與 RAG 說明怎麼讓系統跨對話保留重要資訊。

來源：
- PDF：https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf
- 影片：https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 章節：p.11「有記憶的 ChatGPT」
- 精確影片時間：**查不到**

2025 Context Engineering 又把 Dialogue History 明確定義成**短期記憶**，並用開新對話說明短期歷史不會自然存在於新 session。

來源：
- https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 章節：p.24–26。

### 【我的歸納】
這是六點中最能直接引用李宏毅的。

而且它很自然能接到軟體工程裡的 handoff：

> **聊天紀錄不是專案狀態。**  
> 如果工作需要跨 session / agent 持續，關鍵決策、artifact、ticket state、驗收結果必須存在對話之外。

後半句是我們的軟工延伸，不是李宏毅原話。

---

# 4. 他還講了哪些單一 LLM / Agent 問題？

## 4.1 Memory：不能把 Agent 一生全部塞進去
### 【來源明確主張】
2025 春季投影片 p.31 直接畫出 Agent 到第 10,000 次 observation 後，如果一直回憶完整一生，會出問題；因此導入：

- Read：只取 Relevant Experience，本質上是 RAG
- Write：決定哪些事情值得記住
- Reflection：重新整理記憶
- Knowledge Graph / GraphRAG 等

來源：
https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf  
章節：p.31–46。

---

## 4.2 Tool Use：工具說明本身也會塞爆 context
### 【來源明確主張】
2025 春季介紹 Function Call / tool selection。  
2025 秋季更明確指出「不要把所有工具的使用說明放入 Context」，應選出當下需要的工具。  
2026 又延伸成 Skill 按需載入。

來源：
- 2025 春：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf ，p.48–57
- 2025 秋：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf ，p.59
- 2026：https://www.youtube.com/watch?v=urwDLyNa9FU ，約 40:03 起

---

## 4.3 Planning：Agent 的本質不是一次產出完整答案
### 【來源明確主張】
2024 第 9 講把 Agent 畫成：

終極目標 → 根據記憶與狀態產生短期計畫 → 行動 → 環境改變 → 取得新狀態 → 修改計畫。

2025 春季再次用 Goal / Observation / Action 框架講 Agent，並把「能不能做計劃」列為關鍵能力。

來源：
- 2024 PDF：https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf ，p.10、p.20 起
- 2025 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf ，p.2–10、p.27 起

---

## 4.4 Self-reflection：有用，但不是萬靈丹
2024 第 5 講最重要的訊息不是「reflection 沒用」，而是：

- 可以讓模型自我反省
- 但跟多模型互相刺激相比，自我反省比較不容易真的推翻自己的舊答案

來源：
https://hackmd.io/@shaoeChen/SyIc2wOZC  
章節：「反省 vs 討論」；精確時間查不到。

這與「independent review」概念相當接近。

---

# 5. 他如何介紹 Multi-Agent 和角色分工？

## 5.1 2024：先從「合作」而不是「架構」講
### 【來源明確主張】
第 5 講標題本身就是：

「讓語言彼此合作，把一個人活成一個團隊」

敘事大致是：

1. 不同模型有不同能力與成本
2. 讓合適模型做合適工作
3. 讓模型彼此討論
4. 自我反省 vs 他人刺激
5. 多模型要怎麼討論
6. 團隊需要不同角色
7. 讓不同模型扮演 PM / tester / programmer
8. MetaGPT / ChatDev 等開源例子
9. 未來不一定要打造一個什麼都會的全能模型，可以專業分工

來源：
- 官方影片：https://www.youtube.com/watch?v=inebiWdQW-4
- 筆記：https://hackmd.io/@shaoeChen/SyIc2wOZC
- 精確時間：查不到。

### 【我的歸納】
這堂非常適合回答：

> **為什麼不是「一隻更大的 agent」就好？**

李宏毅的回答脈絡其實有三種不同理由：

- **能力異質性**：不同模型擅長不同事
- **成本**：簡單任務不必用最貴模型
- **認知獨立性**：別的模型能帶來真正不同的刺激
- 再加上後面的**角色專業化**

這四件事不應混成「multi-agent 比 single-agent 強」一句話。

---

## 5.2 2025 秋：Multi-Agent 被放進 Context Engineering
這是很重要的轉變。

### 【來源明確主張】
官方投影片先講：
- Context 太長
- Select
- Compress
- 然後才是 Multi-Agent

旅遊例子：
- Single Agent 要自己規劃、訂餐廳、跟網頁互動、訂旅館，所有細節都在同一份 context 裡
- Multiple Agents 時：
  - Agent 1 只負責餐廳
  - Agent 2 只負責旅館
  - Lead Agent 最後只收到「訂好了」
  - 各 agent context 不混入另一邊的細節

來源：
https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf  
章節：p.71–74。

### 【我的歸納】
這可能是整批資料中，**最適合 Agent 101 的 multi-agent 解釋**：

> Multi-agent 不只是「多人比較聰明」。  
> **它也是把工作、上下文、責任邊界切開。**

這直接對應你前面已經教的：
Goal → Ticket → Dev → Review → QA → Product Check。

---

## 5.3 2026：Sub-agent 被重新解釋為「自主 context 壓縮」
### 【來源明確主張】
2026 Agent 1/3 在約 30:21 開始，直接說 sub-agent 可以視為自主壓縮。

子 agent 執行搜尋、讀檔、操作等繁瑣工作後，只把必要結果 `return` 給主 agent；中間整段互動不需要留在主 agent 的 context。

來源：
https://www.youtube.com/watch?v=urwDLyNa9FU  
時間：30:21–34:17  
時間文字核對：https://hackmd.io/r4DPEoLPT3WCHg6dw5w5yA

### 【我的歸納】
這比「多一隻 Agent 幫忙」更精確：

> **Delegate work, return artifact/result, discard working noise.**

非常像人類公司裡的 handoff，而不是把所有人的 Slack 訊息全部轉寄給主管。

---

# 6. 特別補查：他怎麼從「chat / context 的限制」過渡到 workflow / multi-agent？

這是第 2 輪最重要的問題。

## 路線一：2024 第 9 講
### 【來源順序】
1. 今日多數人使用 AI：做單一任務
2. 人類能處理多步驟複雜任務
3. 任務有順序，計畫還會因情況改變
4. 如果 AI 能完成這種工作，就是 AI Agent
5. Agent 需要目標、記憶、狀態、計畫、行動、反思

來源：
https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf  
章節：p.2–3 → p.10 起。

### 【適合 workshop 的過渡句，我的改寫】
**Chat 是「叫它做一件事」；工作是「讓一件事走到完成」。**

這不是李宏毅逐字原話，是依他的開場做的教學濃縮。

---

## 路線二：2025 秋 Context Engineering
### 【來源順序】
1. 先拆 context 裡到底有什麼
2. 對話歷史只是短期記憶
3. 一問一答 → 固定 SOP workflow → AI Agent
4. Agent 每一步都產生新的 observation / action
5. 所以 context 變超長
6. 長 context 不代表看得懂
7. Context Engineering：Select / Compress / Multi-Agent
8. 最後用餐廳／旅館說明 multi-agent 如何讓每隻只保留自己的 context

來源：
https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf  
章節：p.24–26 → p.40–54 → p.67–74。

### 【我的判斷】
**這是最完整的「限制 → workflow / agent → multi-agent」邏輯鏈。**

唯一差別是，他的起點叫 Context Engineering，不是先列出「chat 的六個抱怨」。

---

## 路線三：2026 Agent 1/3 → 2/3
### 【來源順序】
1. LLM 本身只看到當下送進去的 input
2. 長任務必須一直把歷史帶回去
3. input 有長度與品質限制
4. Agent 要當 context 守門人
5. 壓縮可以救長度，但會有 Context Collapse
6. sub-agent = 自主壓縮／上下文隔離
7. 下一講正式談 agent-agent interaction

來源：
- https://www.youtube.com/watch?v=urwDLyNa9FU
- https://www.youtube.com/watch?v=mmPmNezjCi0
- 2026 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php

### 【我的判斷】
2026 的說法最適合技術版：

> **不是因為「multi-agent 很潮」才拆 agent；而是單一 agent 長時間工作時，context management 本身就會逼出 delegation / sub-agent。**

---

# 7. 對非工程師特別有效的比喻／例子

## 7.1 「一個口令，一個動作」vs「只給目標」
來源：2025 春季 Agent，投影片 p.2。  
https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf

**適用：** Agent 是什麼。  
**優點：** 不必先解釋 loop、tool calling、planner。

---

## 7.2 聚餐：人類工作天然是多步驟、會改計畫
來源：2024 第 9 講開場。  
https://www.youtube.com/watch?v=bJZTJ7MjYqg  
章節：開場；精確時間查不到。

**適用：** 從一般 chat 過渡到 agent。  
**優點：** 非工程師立即懂「先問時間、再訂餐廳；客滿就換」。

---

## 7.3 「殺雞焉用牛刀」
來源：2024 第 5 講的公開課程筆記。  
https://hackmd.io/uSMSupRPR2Kz71Tvrt4F7w

**適用：** model routing / 成本。  
**注意：** 可引用為筆記中的說法，不要延伸成李宏毅講過「thinking effort」。

---

## 7.4 自己反省 vs 找另一個人挑錯
來源：2024 第 5 講。  
https://hackmd.io/@shaoeChen/SyIc2wOZC

**適用：** 解釋為什麼 reviewer 要獨立。  
**workshop 翻譯：**「作者自己 review 自己」不等於獨立 review。  
這句是我的歸納。

---

## 7.5 訂餐廳 Agent / 訂旅館 Agent
來源：2025 秋 Context Engineering p.72–73。  
https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf

**適用：** context isolation、handoff、Lead Agent。  
**這是我最推薦拿進 Agent 101 的例子。**

主 Agent 不需要看到：
- 點了哪些按鈕
- 網頁跳了什麼廣告
- 搜了多少頁

它只需要 artifact / state：

> 餐廳：訂好了。  
> 旅館：訂好了。

這非常容易映射到：
> Dev：PR ready。  
> Reviewer：approved / changes requested。  
> QA：AC passed / failed。

後面三句是 workshop 映射，不是原課程內容。

---

## 7.6 「Sub-agent = 自主壓縮」
來源：2026 Agent 1/3，30:21 起。  
https://www.youtube.com/watch?v=urwDLyNa9FU

**適用：** 解釋為什麼長任務拆 agent 不是只為「平行化」。

---

## 7.7 「多個臭皮匠勝過一個諸葛亮」
來源：2026 Agent 2/3，00:00。  
https://www.youtube.com/watch?v=mmPmNezjCi0

**適用：** multi-agent collaboration 的下一層。  
**不建議拿來當第一個 multi-agent 理由**，因為會讓聽眾誤以為 multi-agent 只是 voting / 多找幾隻模型，而忽略 role、context、handoff。

---

# 8. 對 Agent 101 最有用的重組方式

以下全部是**我的歸納／教材建議，不是李宏毅原課順序**。

你前一段已經有：

Goal  
→ Refinement  
→ Ready  
→ Dev  
→ PR Review  
→ QA  
→ Product / Goal Check  
→ Done

那下一段其實可以非常直：

## Slide A：大家現在怎麼跟 AI 工作？
**Chat：我說一句，你回一句。**

借 2024/2025 李宏毅開場：
- 做單一任務
- 「一個口令，一個動作」

先不要講 single-agent / multi-agent。

---

## Slide B：Chat 做短任務很好；工作一長，六個問題一起出現

可以整理成三大類，比六個平鋪更有邏輯：

### 1. 一個腦袋做所有角色
- PM / Dev / Reviewer / QA 混在一起
- 自己寫、自己 review
- 同一個 model 做所有難度的事

對應來源：
2024 第 5 講的 role specialization、model routing、reflection vs discussion。

### 2. 一個 context 裝所有東西
- conversation history
- tool output
- memory
- reasoning
- 過時資訊
- 壓縮後又可能遺失重要資訊

對應來源：
2025 Context Engineering + 2026 Context Collapse。

### 3. 一個 session 扛整個專案
- 開新 session 短期歷史消失
- 長 session 又愈來愈髒
- 只靠 chat history 無法當 project state

對應來源：
2024「每次開始新對話，一切都重頭來過」+ 2025 dialogue history = short-term memory。

---

## Slide C：所以先不要急著「多 Agent」；先把工作變成 workflow

這裡接回你前面教過的看板：

**Chat 裡的對話 → 外部可見的工作狀態**

Goal  
→ Ticket  
→ Dev output  
→ PR  
→ Review result  
→ QA evidence  
→ Product decision

Agent 可以換、session 可以換，但 ticket / PR / evidence 還在。

這是你的 software-workflow 教學邏輯，不是李宏毅課程原話。

---

## Slide D：Workflow 固定之後，再問「誰負責每一步？」

這時才出現 single agent / multi-agent。

不是：

> Single agent 不夠強，所以多開幾隻。

而是：

> **工作本來就已經有不同角色、不同 context、不同驗收責任。  
> 現在只是把每個工作站交給適合的 agent。**

---

## Slide E：Multi-Agent 帶來的不是只有更多智力

四個效果：

1. **Role specialization**  
   PM / Dev / Reviewer / QA 各自有不同責任。

2. **Independent audit**  
   reviewer 不和作者共用完全相同的思考路徑。

3. **Context isolation**  
   QA 不需要看到 Dev 操作終端的每一行；只需要 build、artifact、AC、evidence。

4. **Model / effort routing**  
   簡單工作用便宜／快模型；困難 review 或規劃再提高能力與 effort。  
   其中「model/cost routing」有李宏毅直接來源；「effort」是現代產品層級延伸。

---

## Slide F：Handoff 不是把整段聊天丟給下一隻 Agent

借 2025 訂餐廳／旅館 + 2026 sub-agent：

**錯：**
> 「這是我前面 80,000 tokens 的聊天，你自己看。」

**對：**
> Ticket + current state + artifact + evidence + unresolved questions

這正好對應你的：
- AC
- DoD
- out-of-scope
- PR
- QA evidence

---

# 9. 哪些話不能說成「李宏毅教授有講」

為避免投影片引用過頭，以下要明確標示。

## 「一隻 Agent 一人分飾多角色是問題」
**查不到他用這句診斷。**  
他有講不同角色組團隊，但主要是正面介紹合作方式。

## 「球員兼裁判」
**查不到這個比喻。**  
可從 self-reflection vs multi-agent discussion 歸納，但必須說是你的比喻。

## 「不同 task 應該用不同 thinking effort」
**查不到。**  
他明確講 model capabilities / model cost / routing，但不是 ChatGPT 類產品的 effort selector。

## 「ChatGPT compact 一定會忘記」
**查不到針對 ChatGPT 產品功能的直接說法。**  
可說「context compression / summarization 可能遺失關鍵資訊，甚至造成 Context Collapse」。

## 「Multi-agent 一定比 single agent 好」
**不能這樣講。**  
李宏毅的材料反而支持更精確的說法：multi-agent 是否有利，取決於任務、互動方式、context management 與成本；不是單純 agent 越多越好。

---

# 10. 最後給 Owner 的一版濃縮答案

如果只問「李宏毅的課能不能支持我們現在想要的敘事？」：

**可以，但要跨年份拼起來，不能假裝某一堂課完整講過。**

最好的組合是：

1. **2024 第 9 講**  
   「今日多數人用 AI 做單一任務」→ 人類工作是多步驟 → Agent。  
   同一堂還有「每次開始新對話，一切都重頭來過」。

2. **2024 第 5 講**  
   不同模型做不同事、成本 routing、reflection vs discussion、不同角色、MetaGPT / ChatDev。

3. **2025 秋 Context Engineering**  
   把 chat / agent 的真正長期問題說清楚：dialogue、memory、tools、reasoning 全部累積，context 會塞爆；解法是 Select / Compress / Multi-Agent。  
   「訂餐廳／訂旅館」是非常好的 context isolation + handoff 例子。

4. **2026 Agent 1/3**  
   補上最新的一塊：compression 不是免費的，會 Context Collapse；sub-agent 可以視為自主壓縮，做完只把必要結果交回。

因此，Agent 101 的敘事可以收斂成：

> **大家先從 Chat 開始。**  
> Chat 很適合一問一答，但真正的工作會變長、變多角色、跨 session，context 也會愈來愈難管理。  
> 所以先把「聊天」外化成有狀態、有驗收的 workflow。  
> 當 workflow 已經有 Dev / Review / QA 等責任邊界，再把不同工作站交給不同 Agent。  
> Multi-Agent 不是目的；**穩定地讓工作跨時間、跨角色走到 Done 才是目的。**

最後這段是**我的教材歸納**，不是李宏毅逐字原話；但其每個技術理由都能由上面已核實的課程內容支持。

---

# 11. 來源清單

## 官方
- 李宏毅《生成式人工智慧導論 2024》課程頁  
  https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php
- 2024 第 5 講 YouTube  
  https://www.youtube.com/watch?v=inebiWdQW-4
- 2024 第 9 講 YouTube  
  https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 2024 第 9 講官方投影片  
  https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf
- 李宏毅 Machine Learning 2025 Spring  
  https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php
- 2025 Spring AI Agent YouTube  
  https://www.youtube.com/watch?v=M2Yg1kwPpts
- 2025 Spring AI Agent 官方投影片  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 李宏毅 GenAI & ML 2025 Fall  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php
- 2025 Context Engineering YouTube  
  https://www.youtube.com/watch?v=lVdajtNpaGI
- 2025 Context Engineering 官方投影片  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 李宏毅 Machine Learning 2026 Spring  
  https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php
- 2026 Agent 1/3  
  https://www.youtube.com/watch?v=urwDLyNa9FU
- 2026 Agent 2/3  
  https://www.youtube.com/watch?v=mmPmNezjCi0

## 第三方筆記／時間索引（只用於定位與交叉核對）
- 2024 第 5 講筆記  
  https://hackmd.io/@shaoeChen/SyIc2wOZC
- 2024 課程另一份筆記  
  https://hackmd.io/uSMSupRPR2Kz71Tvrt4F7w
- 2024 第 9 講筆記  
  https://hackmd.io/@shaoeChen/SJxkkqtGA
- 2026 Agent 1/3 逐段整理  
  https://hackmd.io/r4DPEoLPT3WCHg6dw5w5yA
- 2026 Agent 1/3 時間索引  
  https://podwise.ai/episodes/7572311
- 2026 Agent 2/3 時間索引  
  https://podwise.ai/episodes/7572310

---

## 驗證註記

- 官方課程頁、官方 YouTube、官方 PDF 視為第一級來源。
- HackMD / Podwise 只用於「找章節文字、定位時間」，若與官方投影片衝突，以官方為準。
- 沒有可靠時間碼的段落一律寫「查不到」，沒有用推測時間補洞。
- 「球員兼裁判」「chat-driven / work-driven」「不同 thinking effort」等 workshop 用語，只在李宏毅材料能支持其概念時列為**我的歸納**，不偽裝成教授原話。
