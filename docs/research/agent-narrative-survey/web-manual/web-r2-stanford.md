# Stanford AI Agent / LLM Agent 課程 Survey — 第 2 輪補查與驗證後完整版本

> 研究日期：2026-10-04
>
> 目的：替 Agent 101 workshop 找一條適合非工程師的敘事：**大家先從 chat 開始 → chat / 單一工作空間的限制 → workflow / agentic workflow → 必要時才拆 multi-agent**，並核對 Stanford 公開課程是否真的這樣教。

## 0. 驗證規則與標記

這一版已重新逐一核對來源，並採以下標記：

- **【來源】**：來源明確講到的內容；若不是逐字引述，會寫成「來源意旨」。
- **【我的歸納】**：我根據多個來源整理出的教學結論，不是 Stanford 原話。
- **【查不到】**：在本輪可公開驗證的 Stanford 課程、投影片、影片或講座中，找不到足以支持該說法的原話或等價內容。

來源優先順序：Stanford 官方課程網站 / 官方投影片 / Stanford Online 官方影片 > 公開逐字稿。逐字稿只用來**定位影片時間點**；內容歸屬仍以 Stanford Online 正式影片為主。

**重要時間限制**：截至 2026-10-04，Stanford Fall 2026 正在進行中。CS329Z、CS224V 等課程在 10/5 之後的內容，本文件只可稱為「syllabus 已規劃」，不能當成已授課、已驗證的講課內容。

---

# 1. 先講結論

## 1.1 最符合你想要敘事的 Stanford 來源

### A. 最接近完整「限制 → workflow → multi-agent」：CS230 Lecture 8

**Stanford CS230, Autumn 2025, Lecture 8 — “Agents, Prompts, and RAG / Beyond the model: Enhancing LLM applications”**

- 官方 syllabus：<https://cs230.stanford.edu/syllabus/> — Lecture 8, 2025-11-11
- Stanford Online 正式影片：<https://www.youtube.com/watch?v=k1njvbBmfsw>
- 公開逐字稿（僅用於時間點回查）：<https://copyyoutubetranscript.com/transcript/k1njvbBmfsw/>

**【來源】順序非常清楚：**

1. `3:36–` 先問「只用 base model 有什麼限制？」：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=216s>
2. 接著講 prompting / chaining / RAG。
3. `53:47` 才正式進 agentic AI：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=3227s>
4. `55:35–56:33` 明講從 **one-step prompt → multi-step agentic workflow**，用「退款 chatbot」做例子：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=3335s>
5. `1:34:25` 最後一段才談 **multi-agent workflow**，而且講者先反問：workflow 已經多步、會多次 call LLM、也有 tools，**為什麼還需要 multiple agents？** <https://www.youtube.com/watch?v=k1njvbBmfsw&t=5665s>

**【我的歸納】**：這是 Stanford 公開內容裡，最適合直接借你現在投影片敘事骨架的一份。它不是從「ChatGPT UI 很糟」切入，而是從「單一/base LLM application 的限制」切入；但整體順序與你要的「先講目前做法，再逐層增加結構，multi-agent 最後才出場」高度一致。

---

### B. 最乾淨的「chatbot → agentic workflow」過渡：CS329A Lecture 1

**Stanford CS329A — Self-Improving AI Agents, Autumn 2025, Lecture 1 / Course Overview**

- 官方課程：<https://cs329a.stanford.edu/> — Lecture 1, 2025-09-22
- Stanford Online 正式影片：<https://www.youtube.com/watch?v=6YnLB0XbTnI>
- 公開時間稿（僅用於時間點回查）：<https://lilys.ai/en/notes/ai-agent-20260920/cs329a-self-improving-ai-agents>

**【來源】這裡有本輪找到最直接的一段：**

- `40:54`：講者明確把 LLM 作為 chatbot / reasoning model 描述為仍然偏 **single-turn / chat format**。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2454s>
- `41:07–41:08`：重點不是聊天不好玩，而是「它沒有替你完成 task」。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2467s>
- `41:14+`：Claude Code、Deep Research 這類東西讓模型進入 real-world workflow，開始 end-to-end 完成事情。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2474s>
- `42:21–42:45`：從 LLM 到 agent 的差異被整理成 goal → plan → action / environment → feedback → correction → stop。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2541s>
- `43:34–43:59`：講者反而提醒「目前很多情境還是 static workflows」；例子是一個 model 出 solution，另一個 model judge 是否接受。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2614s>
- `45:38–46:48`：再依序帶 prompt chaining → routing → parallelization → orchestrator → evaluator / judge / verifier。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2738s>

**【我的歸納】**：如果你只想抽一張「為什麼不要停在 chat」的投影片，這段比 CS224G 更貼近你的需求。它先把 **chat = interaction**，再把 **agentic workflow = accomplish a task end-to-end**，概念非常乾淨。

---

### C. 最適合非工程師的 chat-first 課程：CS193T Thinking with AI

**Stanford CS193T — Thinking with AI, Autumn 2026**

- 課程首頁：<https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/>
- Course placement：<https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/course/course_placement/>
- Lecture 2 — Core Prompting：<https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/lectures/02-prompting/>
- Assignment 1 — AI Foundations：<https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/assignments/1-ai-foundations/>

**【來源】它的定位幾乎就是你 workshop 的非工程師版本：**

- Course placement 的 **“To Code … or Not To Code (CS193T)”** 章節明寫：CS193T 適合想把 AI 用得「比 just chat 更進階、更 structured」，建立 workflows 的人；並明寫從 **conversational chat AI usage** 升級到 **autonomous, structured use cases**。
- Lecture 2 “Core Prompting” 明講長對話管理的 **context rot**、**lost in the middle**、以及何時應該 start fresh。
- Lecture 2 的非工程師比喻是：把 AI 當作 **capable but new hire**。
- Assignment 1 直接要求學生開一個全新的 chatbot chat，測試 instruction adherence；還要求可選擇比較同一廠商不同強度模型（例：Haiku / Sonnet / Opus）。

**限制**：截至 2026-10-04，課程仍在進行；公開頁面已證明其 curricular arc 是 `chat → structured/agentic workflows`，但後面正式講 agentic workflow 的 lecture 尚未全部公開，因此**不能編造後續實際講課時間點或轉場句**。

**【我的歸納】**：如果你的受眾不是工程師，CS193T 的語言與順序最值得模仿；CS230 / CS329A 則更適合補完整 agent/workflow taxonomy。

---

# 2. 一個關鍵修正：Workflow vs Agent，和 Single vs Multi-Agent 是兩條不同的軸

這是本輪最重要的概念整理。

## 2.1 Workflow vs Agent：控制路徑怎麼決定

**外部來源，但被 Stanford CS224G / CS329Z 明確採用：Anthropic “Building effective agents”**

- 官方文章：<https://www.anthropic.com/engineering/building-effective-agents>
- 章節：**What are agents?**、**Building blocks, workflows, and agents**

**【來源】Anthropic 的架構區分：**

- Workflow：LLM / tools 走**預先定義好的 code path**。
- Agent：LLM 會**動態決定自己的流程與 tool usage**。
- 文章順序是 augmented LLM → prompt chaining → routing → parallelization → orchestrator-workers → evaluator-optimizer → agents。
- 並反覆強調從最簡單的方案開始，只有當簡單方案不夠時才增加 agentic complexity。

Stanford CS224G Lecture 7 直接把這個區分放進投影片：

- 投影片：<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>
- **Lecture 7, slide 4：Workflow vs Agent**
- **slide 19：Patterns**
- **slides 23–24：Orchestrator-Workers / Evaluator-Optimizer**

## 2.2 Single vs Multi-Agent：有幾個角色 / 決策單元

同一份 CS224G Lecture 7：

- **slide 9**：Single Agent = one LLM、one tool set、one context window；缺點之一是 context window 很快被塞滿，且跨多 domain 時吃力。
- **slide 11**：Multi-Agent System = specialized agents，例如 Coder / Reviewer / Researcher，各自可有 system prompt / tools。
- **slide 12**：明寫指導原則 **“Start Single. Upgrade to MAS when you need distinct personas.”**

來源：<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>

**【我的歸納】所以投影片不要再把這四個詞排成一條成熟度階梯：**

```text
錯誤直覺：
chat → single agent → workflow → multi-agent

更準確：
軸 A：predefined workflow ←→ dynamic agent control
軸 B：single agent ←→ multiple specialized agents
```

一個 workflow 裡可以只有一個 LLM，也可以有很多 agent；一個 multi-agent 系統也可以被固定 workflow 編排，或由 orchestrator 動態決定下一步。

---

# 3. Owner 六個問題：Stanford 到底有沒有講？

標記：✅ = 直接支持；◐ = 支持底層機制，但不是 owner 那句話；— = 查不到。

| Owner 的問題 | 結論 | Stanford 可驗證內容 |
|---|---|---|
| 1. 一人分飾多角色 | ✅ | **CS224G Lecture 7 slides 9–12**：single agent 共用一個 context / monolithic instructions，multi-agent 則可依 Coder、Reviewer、Researcher 拆 specialized roles。<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>；**CS25 agent 段約 44:35–45:10**：single-thread vs multi-thread、specialized spreadsheet/Slack/browser agents，並以人類組織的 domain experts 類比。影片：<https://www.youtube.com/watch?v=ylEk1TE1uBo>；課程頁 Nov 28：<https://web.stanford.edu/class/cs25/past/cs25-v3/index.html> |
| 2. context 污染 | ✅ / 用詞是你的 | **CS193T Lecture 2** 直接用 `context rot`、`lost in the middle`，並談何時 start fresh。<https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/lectures/02-prompting/>；**CS224G Lecture 7 slides 9, 42–43**：single-agent shared context fills quickly；short-term memory 受 context limit 約束，會用 summarization/sliding window/truncation。<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>；**CS224N 2026 Lecture “Agents, Tool Use, and RAG” slides 23, 47**：長 context 中 relevant information 可能難以被 attention 找到，agent memory 不能只靠把所有事件塞進 context。<https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf> |
| 3. 球員兼裁判 | ◐ | **查不到 Stanford 直接用「同一 Agent 自己判自己，所以是球員兼裁判」這個論證。** 但有清楚的結構性拆分：CS329A `43:39` 是一個 model 產生 solution、另一個 model judge；<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2619s>。CS224G slide 24 是 generator → evaluator → feedback loop；slide 50 的 coding-agent 圖則拆 Planner / Coder / Executor / Tester / Evaluator。<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>。因此「球員兼裁判」可以當你的教學比喻，但要標成**你的比喻**，不要說 Stanford 原話。 |
| 4. 每種問題不能選不同 model / effort；殺雞用牛刀 | ✅ / `effort` 產品詞本身查不到 | **CS224G schedule Jan 13** 明講何時用 reasoning vs standard models，以及 cost/latency tradeoff。<https://web.stanford.edu/class/cs224g/schedule.html>；**CS230 `7:37–7:41`** 直接舉例：可能使用很 massive/heavy 的 model，實際只用到約 2% capability。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=457s>；**CS329A `45:56+` routing**：複雜問題走較複雜 LLM calls，其他走不同流程。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2756s>；**CS193T Assignment 1** 要學生比較不同 strength models。<https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/assignments/1-ai-foundations/>。但 OpenAI UI 裡叫 `effort` 的控制不是這些 Stanford 課程的原詞。 |
| 5. compact 之後遺忘 | — / ◐ | **精確說法查不到。** Stanford 有講 summarization / compression / truncation，但沒有找到一個公開課程直接說「ChatGPT compact 後會遺忘」。CS224G slide 43 講 summarization、sliding window、truncation 作為 context-limit 策略；<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>。CS224V 2026 Lecture 1 slide 13 甚至把 `automatic compression` 放在 context management 底下；<https://web.stanford.edu/class/cs224v/lectures_2026/l-introduction.pdf>。這只能支持「壓縮是 context management 方法，壓縮必然會取捨細節」的工程直覺，不能冒充 Stanford 對某產品 compact 行為的實證。 |
| 6. 換 session 看不到之前內容 / handoff | ✅ 底層機制；產品 UI 細節 ◐ | **CS224G Lecture 7 slide 42**：LLM 本身 stateless、不會自己記住 past conversations，state 必須外部管理再 inject；slide 15 有 checkpoint / resume later 的持久化概念。<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>。**CS329Z syllabus Oct 19（截至本研究日仍是未來規劃）**直接列 `handoffs and state transfer`；<https://cs329z.stanford.edu/>。**CS25 multi-agent 段約 45:18 之後**反而提醒 multi-agent 最大挑戰之一就是 communication / miscommunication。<https://www.youtube.com/watch?v=ylEk1TE1uBo>。但「某個 ChatGPT 新 session 一定看不到舊 session」是產品層行為，不宜用 Stanford 課程當成當前產品規格證明。 |

## 3.1 六點中最需要你改 wording 的兩點

### 「球員兼裁判」

**【查不到】** Stanford 公開內容直接這樣講。

**可安全改成：**「生成與驗證是不同責任；很多 workflow 會把 generator 與 evaluator / tester 分開。」

來源：CS329A `43:39`；CS224G Lecture 7 slides 24、50。

### 「compact 後遺忘」

**【查不到】** Stanford 對特定產品 compact 功能的公開課程證據。

**可安全改成：**「長對話需要 summarization / truncation / compression；任何壓縮都代表不能保留全部原始細節。」其中前半句有 Stanford 來源，後半句是資訊壓縮的一般性推論，應標成你的歸納。

來源：CS224G Lecture 7 slide 43；CS224V Lecture 1 slide 13。

---

# 4. 各 Stanford 來源完整拆解

## 4.1 CS230 Lecture 8：最佳整體敘事順序

### 1) 如何開場？是不是從 chat / single-turn 限制出發？

**【來源】不是直接從 chat UI 開場。** `0:44–1:00` 先說課程現在要 “one level beyond”，看工作上如何建 agentic AI systems；`1:40–3:22` 預告順序是 base-model challenges → prompting → fine-tuning → RAG → agentic workflows → evals → multi-agent。

- 影片：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=44s>
- `3:36–3:59`：正式以「只用 base model 有什麼 limitation？」開始第一個問題。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=216s>

### 2) 它講哪些單一 LLM 問題？

**【來源】**

- domain knowledge / current information 不足：`3:52–5:35`。
- model 太重：`7:25–7:41`；講者說可能用 massive/heavy model，卻只需要其中很少 capability。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=445s>
- `45:14+` recap standalone LLM 的問題：context window、長 context 細節難記、knowledge gap / cutoff、hallucination。影片：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=2714s>

### 3) 怎麼過渡到 workflow？

這段最值得你直接學。

**【來源】`53:47`**：從有 external knowledge 進一步到 multi-step autonomous workflows，講者說這裡才進入 proper agentic AI。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=3227s>

**【來源】`54:33–54:45`**：指出業界把很不一樣的東西都叫 agent：有人只有 prompt，也有人是很複雜的 multi-agent system，所以他採用較寬鬆的 **agentic workflows** 說法。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=3273s>

**【來源】`55:35–56:33`**：用退款客服最具體地示範：

- one-step chatbot：「退款政策是什麼？」→ 找 policy → 回答案。
- agentic workflow：「我可以退這筆訂單嗎？」→ 找 policy → 問 order number → call API 查 order → 判斷 eligibility → 回覆處理結果。

影片：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=3335s>

**【我的歸納】**：這個例子非常適合非工程師，因為差異不是「多一個 Agent 圖示」，而是從 **回答問題** 變成 **把工作往前推到完成**。

### 4) multi-agent 在哪裡才出場？

**【來源】`1:34:25` 才進最後一節 multi-agent。** 講者甚至先問：既然 workflow 已經有 multiple steps、multiple LLM calls、tools，為何還需要 multiple agents？<https://www.youtube.com/watch?v=k1njvbBmfsw&t=5665s>

接著回答：

- `1:34:52`：主要優勢之一是 parallelism。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=5692s>
- `1:35:14`：specialized agent 可以重用。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=5714s>
- `1:41:52+`：hierarchical multi-agent 時，user 可只跟 orchestrator 對話，再由 orchestrator 對 specialist 分派。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=6112s>
- `1:42:40+`：multi-agent 相較 single agent 也可帶來較容易 debug 等優勢。<https://www.youtube.com/watch?v=k1njvbBmfsw&t=6160s>

**【我的歸納】**：這門課非常明確證明「multi-agent 不該在 agentic workflow 前面講」。先讓學生理解一個 workflow 為何要多步與用 tools，再問什麼情況值得拆多個 agent，認知負擔低很多。

---

## 4.2 CS329A Lecture 1：最佳 chat → task-completion 過渡

### 1) 開場方式

整堂課前 40 分鐘先談 scaling / reasoning / test-time compute，因此**整堂 lecture 並非從 chat 開場**；但它的 **agent 章節** 是直接從 chatbot 限制開場。

- 官方課程章節：Lecture 1, Course Overview：<https://cs329a.stanford.edu/>
- 影片 agent 段：`40:54+`：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2454s>

### 2) 關鍵轉場

**【來源】**

- `40:54`：chatbot / reasoning model 仍偏 single-turn / chat format。
- `41:07–41:08`：互動很好玩，但不等於替使用者 accomplish a task。
- `41:14+`：Claude Code / Deep Research 代表進入 workflow。
- `42:21–42:45`：agent 被描述為拿到 goal 後，規劃 steps、與 environment 互動、得到 feedback、修正直到 goal / stopping condition。

來源：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2454s>

### 3) single agent / workflow / evaluator 怎麼講？

**【來源】`43:34–43:59`**：講者說多數目前情境其實仍是 static workflows；圖中是一個 model 產生 solution，另一個 model judge 是否接受。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2614s>

**【來源】`45:38–46:48`**：workflow pattern 依序：

1. prompt chaining
2. routing
3. parallelization
4. orchestrator
5. evaluator / judge / verifier

<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2738s>

**【我的歸納】**：它沒有急著說「一隻 Agent 不夠」，而是先問「chat 是否真的把 task 做完？」；接著才把 end-to-end task completion 拆成可編排的 workflow。這個順序非常適合你的 workshop。

---

## 4.3 CS224G：最佳 taxonomy / 圖，但不是最佳開場敘事

**課程：CS224G Building and Scaling LLM Applications, Winter 2026**

- Schedule：<https://web.stanford.edu/class/cs224g/schedule.html>
- Lecture 7 PDF：<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>

### 課程順序

**【來源】schedule：**

- Jan 13：reasoning vs standard models，cost / latency tradeoffs。
- Jan 20：context engineering、conversation history、context window、memory、token budget。
- Jan 22：persona、memory / RAG / user data、tools、orchestrators、agentic loops。
- Jan 27：Agentic Workflows & Design Patterns，才正式進 ReAct、multi-agent、sequential/router/collaborative patterns、state management。

**【我的歸納】**：其實 CS224G 也不是「先講 multi-agent」；它先把 model / context / memory 這些基礎補好，第四週才進 agentic orchestration。

### Lecture 7 的核心圖

- **slide 4**：workflow = predefined path；agent = model dynamically directs process/tools。
- **slide 6**：簡單 prompt 能解就不要升級複雜 agentic system。
- **slide 9**：single agent = one LLM + one tool set + one context window；shared context 容易長大。
- **slides 11–12**：multi-agent = specialized roles；`Start Single. Upgrade to MAS when you need distinct personas.`
- **slide 19**：prompt chaining / routing / parallelization / orchestrator-workers / evaluator-optimizer / ReAct / ReWOO。
- **slides 23–24**：orchestrator-workers 與 evaluator-optimizer 圖。
- **slides 42–43**：LLM stateless、short-term conversation context、summarization / sliding window / truncation。
- **slide 50**：coding agent 用 Planner → Coder → Executor → Tester → Evaluator；失敗則 feedback / retry。

來源全部同一 PDF：<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>

**最適合你借的圖：** slide 9/12 的 single vs multi-agent、slide 19 pattern map、slide 24 evaluator loop、slide 50 軟體開發角色鏈。

---

## 4.4 CS25 Transformers United V3：最佳非工程師比喻 + single → multi-agent

**課程：CS25 Transformers United V3, Autumn 2023, Nov 28**

- 官方課程頁：<https://web.stanford.edu/class/cs25/past/cs25-v3/index.html> — Nov 28, “Going Beyond LLMs: Agents…”
- 公開影片：<https://www.youtube.com/watch?v=ylEk1TE1uBo>
- 公開逐字稿：<https://lawwu.github.io/transcripts/transcript_ylEk1TE1uBo.html>

### 怎麼介紹 agent？

**【來源】agent 段約 19:23 開始**：從「大家從 language models 往 agents 移動」開始問：為什麼不只訓練一個更大的 LLM？

**【來源】約 21:19–22:10**：

- LLM 像一顆 compute chip / CPU。
- single call to LLM 通常不夠，需要 chaining、recursion 等系統層能力。
- build an agent 類似「組一台 computer」：CPU 之外還需要 RAM / memory / actions / interface / internet / personalization。

影片：<https://www.youtube.com/watch?v=ylEk1TE1uBo&t=1279s>

### single → multi-agent

**【來源】約 43:06 起**：就算 single agent 已經很可靠，它一次仍主要做一條 sequential execution；接著引出 parallel execution。

- 約 `43:53`：multi-agent 開始變得有意義。
- 約 `44:35`：single-threaded vs multi-threaded computers。
- 約 `44:42+`：spreadsheet / Slack / browser 等 specialized agents；不像一隻 agent 什麼都做，拆成 specialties。
- 接著直接類比**人類組織**：每個人是不同 domain expert。
- 約 `45:18+`：也提醒 multi-agent 最大難題之一是 communication / miscommunication。
- 約 `46:42+`：再用 human organization 的 manager hierarchy，比喻 user → manager/router → workers → aggregate results。

影片：<https://www.youtube.com/watch?v=ylEk1TE1uBo&t=2586s>

**【我的歸納】**：這份最有價值的不是精準 taxonomy，而是你可以直接借給非工程師的四個圖像：

1. **LLM = CPU**，Agent = 一整台會做事的電腦。
2. **single-thread vs multi-thread**。
3. **specialist team**，不要一個人包辦所有 domain。
4. **manager → specialists** 的組織圖。

而且它也提醒：拆人不是免費的，handoff / communication 會變成新問題。

---

## 4.5 CS224N Winter 2026：最佳「words → actions」與 context/memory 架構圖

**CS224N — Agents, Tool Use, and RAG（Winter 2026）**

- 課程 schedule：<https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1264/index.html> — Week 5, Feb 5
- 公開投影片：<https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf>
- 2026 影片僅供 enrolled students Canvas / Panopto；官方頁明寫無法公開，因此**公開影片時間點查不到**。

### 重點章節

**【來源】**

- **slide 23**：long-context 問題，不是 context 越長就一定好；relevant document 混在 irrelevant context 中仍可能難注意到。
- **slide 29 “Language agents: from words to action”**：LLM 主要預測文字，agent 則根據 observations 執行 actions。
- **slide 30**：agent component 圖：LLM core + planning/reasoning + memory + tools + environment。
- **約 slide 43**：orchestrator coordination 圖。
- **slide 47**：Generative Agents 需要 memory；context window 不可能永遠容納完整 event stream，而且即使塞得下，也可能找不到重要資訊。

來源：<https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf>

**【我的歸納】**：這份適合拿來回答「agent 到底多了什麼？」而不是「為什麼 chat 會壞」。對小白可以用 `words → actions` 作一句話定義，再用 memory / tools / environment 圖補全。

---

## 4.6 CS224V Fall 2026：很少見地真的把 Direct Chat 與 Agentic Workflows 放在同一張圖

**CS224V — Agentic AI, Fall 2026**

- Schedule：<https://web.stanford.edu/class/cs224v/schedule.html>
- Lecture 1：<https://web.stanford.edu/class/cs224v/lectures_2026/l-introduction.pdf>

截至本研究日，Lecture 1（9/23）、Knowledge Curation（9/28）、project ideas（9/30）已是過去；10/5 以後不能當成已授課內容。

### Lecture 1 的第一張核心能力圖

**【來源】Lecture 1, slide 2：**同一張 `Core User-Facing Capabilities of LLMs` 把以下東西並排：

- Conversational Q&A = direct chat with multi-turn context retention across a session
- RAG & Retrieval
- Function Calling
- Agentic Workflows = multi-step planning, tool use, self-correction with less supervision
- Computer Use
- Code Execution
- Extended Reasoning
- Multimodal I/O

來源：<https://web.stanford.edu/class/cs224v/lectures_2026/l-introduction.pdf>

**【我的歸納】**：這張圖非常適合你拿來說「chat 不是 agent 的反義詞；chat 是一種使用介面 / capability，而 agentic workflow 是另一層 execution capability」。

### 它怎麼從問題進入 workflow？

**【來源】Lecture 1 slides 13–19：**

- slide 13：LLM weakness 包括 long instructions / long documents / long horizon / long contexts；對應 RAG 與 context management，例如 automatic compression。
- slides 17–19：WikiChat 被拆成 7 prompts：query → retrieve → filter → generate → extract claims → fact-check/remove → draft → refine。

來源：<https://web.stanford.edu/class/cs224v/lectures_2026/l-introduction.pdf>

**【我的歸納】**：這又是一個很好的非工程師案例：不是「換成 multi-agent 就好了」，而是先把高風險回答**分解成可驗證的步驟**。

---

## 4.7 CS329Z Fall 2026：課程設計本身驗證了合理順序，但未來 lecture 不可當成已講過

**CS329Z — Engineering AI Agents, Fall 2026**

- 官方頁：<https://cs329z.stanford.edu/>

### 已發生的部分（截至 2026-10-04）

**【來源】syllabus：**

- 9/23 Foundations：從 monolithic model → compound AI systems → agents 的 spectrum。
- 9/28 LLMs for Builders：context length、test-time scaling、structured I/O、context engineering；指定閱讀 Anthropic “Building Effective Agents”。
- 9/30 RAG。

### 已排定、但截至研究日仍未發生的部分

以下**只能視為 curriculum design，不是已驗證 lecture content**：

- 10/5 Tool Use
- 10/7 Frameworks & Orchestration
- 10/12 Agent Design Patterns：workflow-vs-agent taxonomy、五種 workflow patterns、ReAct / plan-and-execute / reflection
- 10/14 Memory & cross-agent memory
- 10/19 Single vs multi-agent、orchestration、**handoffs and state transfer**、delegation/collaboration、coordination/error propagation
- 11/9 LLM-as-Judge

來源：<https://cs329z.stanford.edu/>

**【我的歸納】**：光是這個 syllabus 順序就能反駁「一開始就 single agent vs multi-agent 大雜燴」：它先教模型與 context → RAG → tools → framework → workflow-vs-agent → memory → **最後才正式 single vs multi-agent**。

---

## 4.8 CS324：你原 prompt 說「CS324 的 agent 章節」，但公開課程其實查不到這樣一章

### Winter 2022

- Lecture notes TOC：<https://stanford-cs324.github.io/winter2022/lectures/>
- 章節只有 Introduction、Capabilities、Harms、Data、Security、Legality、Modeling、Training、Parallelism、Scaling laws、Selective architectures、Adaptation、Environmental impact。

**【查不到】** dedicated agent chapter。

### Winter 2023

- Syllabus：<https://stanford-cs324.github.io/winter2023/syllabus/>
- 架構是 foundation models fundamentals / survey of FMs & applications / societal considerations。
- Multimodal/FM readings 可找到 generalist-agent 類 paper，但**查不到一個與你要的 chat → workflow → multi-agent 敘事對應的 agent 教學章節**。

**修正結論**：CS324 不應列為這一輪的主要 agent 教學證據。

---

## 4.9 Stanford HAI / Stanford Online

### Stanford Online

這輪最重要的兩支可公開驗證影片本身就是 Stanford Online：

1. CS230 Lecture 8：<https://www.youtube.com/watch?v=k1njvbBmfsw>
2. CS329A Lecture 1：<https://www.youtube.com/watch?v=6YnLB0XbTnI>

因此 Stanford Online 這一塊其實有非常好的材料。

### Stanford HAI

本輪查到較接近的 HAI 活動：

- **Suproteem Sarkar | AI Agents and Higher-Order Work**, 2026-04-06。HAI event index：<https://hai.stanford.edu/events?page=4&upcomingFilterBy=seminar>
- 公開摘要的重點是 agent 如何讓 knowledge work 從 implementation 轉向 supervision，特別適合可驗證工作。

**【查不到】**這場公開可驗證的完整錄影 / transcript 與精確時間點，因此不拿它來證明你要的「chat 限制 → workflow / multi-agent」轉場。

另有一些 HAI 對 ChatGPT / AI-assisted work 的活動，但本輪沒有找到一個比 CS230 / CS329A 更直接、又同時有公開錄影時間點可驗證的 agent taxonomy 講座。這是「本輪公開來源查不到」，不是宣稱 HAI 從來沒有這類內容。

---

# 5. Stanford 怎麼講 Orchestrator-Worker、Evaluator、Workflow 與 Agent？

## 5.1 最一致的模式表

### Prompt chaining

**【來源】** Anthropic 與 Stanford CS224G / CS329A 都用：把任務拆成固定子步驟，上一個輸出給下一個。

- Anthropic “Prompt chaining”：<https://www.anthropic.com/engineering/building-effective-agents>
- CS224G Lecture 7 slide 19：<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>
- CS329A `45:41`：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2741s>

### Routing

**【來源】**輸入先分類，導到不同 prompt / process / model；這直接對應你的「不同問題用不同 model / effort」想法。

- Anthropic Routing 章：<https://www.anthropic.com/engineering/building-effective-agents>
- CS329A `45:56+`：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2756s>
- CS224G Lecture 7 pattern map：同上 PDF slide 19。

### Parallelization

**【來源】**同一大任務拆獨立部分同時跑，或多次獨立判斷再 aggregate。

- Anthropic Parallelization：<https://www.anthropic.com/engineering/building-effective-agents>
- CS329A `46:16+`：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2776s>
- CS230 `1:34:52+` 把 parallelism 當 multi-agent 主要價值之一：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=5692s>

### Orchestrator-Workers

**【來源】**中央 LLM 動態拆 task、delegate workers、最後 synthesize。

- Anthropic Orchestrator-workers：<https://www.anthropic.com/engineering/building-effective-agents>
- CS224G Lecture 7 slide 23。
- CS329A `46:27+`：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2787s>
- CS25 約 `46:42+` 用 manager agent → worker agents 的人類組織比喻：<https://www.youtube.com/watch?v=ylEk1TE1uBo&t=2802s>

### Evaluator-Optimizer / Judge / Verifier

**【來源】**generator 生產 → evaluator 根據 criteria / test 給 feedback → 回去改。

- Anthropic Evaluator-optimizer：<https://www.anthropic.com/engineering/building-effective-agents>
- CS224G Lecture 7 slide 24；coding agent slide 50。
- CS329A `43:39`：一個 model solution、另一個 model judge：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2619s>
- CS329A `46:48+`：evaluator / judge / verifier：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2808s>

**【我的歸納】**：你的既有軟體流程 `Dev → PR Review → QA → Product/Goal Check` 天然就可以映射到這個 pattern；不必先教「多 Agent 很厲害」，直接把 evaluator / verifier 說成「原本軟工就有的品質關卡，現在只是把其中部分交給不同 agent / tool」即可。

---

# 6. 適合非工程師的比喻 / 圖，排名

## 1. 「聊天 vs 完成事情」— CS329A

**來源章節**：Lecture 1 `40:54–42:45`  
影片：<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2454s>

- Chatbot：能互動。
- Agentic workflow：拿 goal、規劃、行動、看 feedback、修正，直到 task 完成。

**【我的歸納】**：最少 jargon，適合第一張。

## 2. 「退款 chatbot → 真正處理退款」— CS230

**來源章節**：`55:35–56:33`  
影片：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=3335s>

從「告訴你政策」變成「查政策 → 問訂單號 → call API → 確認資格 → 推進處理」。

**【我的歸納】**：這是最好的「chat-driven → work-driven」例子。

## 3. 「LLM = CPU；Agent = 一台完整電腦」— CS25

**來源章節**：agent 段約 `21:19–22:10`  
影片：<https://www.youtube.com/watch?v=ylEk1TE1uBo&t=1279s>

CPU 之外還要 memory、tools/actions、interface、internet、personalization。

## 4. 「single-thread vs multi-thread」— CS25

**來源章節**：multi-agent 段約 `43:53–45:10`  
影片：<https://www.youtube.com/watch?v=ylEk1TE1uBo&t=2633s>

用來說明 parallelism 與 specialist roles，而不是說 multi-agent 天生更聰明。

## 5. 「公司組織：manager → specialists」— CS25 / CS230

- CS25 約 `46:42+`：<https://www.youtube.com/watch?v=ylEk1TE1uBo&t=2802s>
- CS230 `1:41:52+`：<https://www.youtube.com/watch?v=k1njvbBmfsw&t=6112s>

**【我的歸納】**：最容易直接映射成你的 PO/PM → Dev → Reviewer → QA。

## 6. 「AI = capable but new hire」— CS193T

**來源章節**：Lecture 2 Core Prompting  
<https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/lectures/02-prompting/>

非常適合非工程師，而且同一章緊接 context rot / lost in the middle / start fresh。

---

# 7. 本輪補查後，我會怎麼重排你的兩段投影片

以下全部是**【我的歸納】**，不是 Stanford 原話；每一步旁邊附的是支撐這個設計的 Stanford 來源。

## Part A — 先不要講 Single Agent / Multi-Agent；先講「為什麼 Chat 不夠」

### Slide A1：大家現在怎麼用 AI？— 一個 chat，什麼都在裡面做

一句話：

> Chat 很適合問答與協作，但「一直聊」不等於「有一條可靠的工作流程」。

支撐：CS224V Lecture 1 slide 2 把 `Conversational Q&A` 與 `Agentic Workflows` 分成不同 capability；<https://web.stanford.edu/class/cs224v/lectures_2026/l-introduction.pdf>。

### Slide A2：長 chat 開始出現什麼結構性問題？

只放 4–5 點，不要同時塞 taxonomy：

1. **角色混在一起**：同一個 prompt / context 同時叫它當 PM、Dev、Reviewer、QA。  
   支撐：CS224G Lecture 7 slides 9–12，single shared context vs specialized role contexts。<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>
2. **Context 越來越髒 / 越來越長**：context rot、lost in the middle、shared window fills up。  
   支撐：CS193T Lecture 2；CS224G slide 9 / 43。<https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/lectures/02-prompting/>
3. **工作狀態不等於聊天紀錄**：LLM 是 stateless，需要 external state / checkpoint / memory。  
   支撐：CS224G slides 42–43。<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>
4. **不是每一步都需要同樣昂貴的推理**：簡單工作可以 route 到比較小 / 簡單的模型或流程。  
   支撐：CS224G Jan 13；CS230 `7:37`; CS329A routing。<https://web.stanford.edu/class/cs224g/schedule.html>
5. **生成與驗證最好明確分責任**：generator → evaluator/tester。  
   支撐：CS329A `43:39`; CS224G slides 24/50。<https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2619s>

**不要把 `compact 後遺忘` 當 Stanford-backed headline。** 可以把它放成產品層例子：「長對話最後常得靠 compact / summary / start fresh 才繼續」，但 evidence 標成你的觀察；Stanford 只支持 context limit / summarization / compression 這個更一般的機制。

### Slide A3：真正的轉變不是「多養幾隻 Agent」，而是「把工作變成 Workflow」

用 CS230 的退款例子：

```text
Chat:
問政策 → 回答政策

Workflow:
理解需求
→ 查政策
→ 收集訂單資料
→ Call API
→ 判斷
→ 執行 / 回報
```

來源：CS230 `55:35–56:33` <https://www.youtube.com/watch?v=k1njvbBmfsw&t=3335s>

這時才第一次出現：**work-driven**。

---

## Part B — Workflow 畫好之後，才回答「一隻 Agent 夠不夠？」

### Slide B1：先拆兩條軸

```text
Workflow vs Agent
= 工作路徑是事先定義，還是模型動態決策？

Single vs Multi-Agent
= 做決策 / 承擔角色的是一個，還是多個？
```

來源：Anthropic workflow-vs-agent 定義 + CS224G Lecture 7 slides 4, 9–12。  
<https://www.anthropic.com/engineering/building-effective-agents>  
<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>

### Slide B2：先 Single；什麼情況才拆 Multi-Agent？

**來源原則**：CS224G slide 12：`Start Single. Upgrade to MAS when you need distinct personas.`

你可以翻成：

> 先用一個 Agent。只有在角色真的需要不同 context、instructions、tools、並行或獨立驗證時，才拆。

其中「不同 context/instructions/tools」有 CS224G 支持；「獨立驗證」有 CS329A / CS224G evaluator pattern 支持；這整句組合是**你的歸納**。

### Slide B3：把你前一段軟體開發流程直接映射成角色

```text
Goal / Ticket
   ↓
Orchestrator / PM
   ↓
Developer Agent
   ↓
Reviewer / Evaluator
   ↓
QA / Verifier
   ↓
Product / Goal Check
   ↓
Done
```

支撐圖：CS224G slide 50 的 Planner → Coder → Executor → Tester → Evaluator。  
<https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>

**【我的歸納】**：這樣就能跟你第一段的 Kanban / software lifecycle 直接接上，而不是突然開一個「multi-agent 是什麼」的新宇宙。

---

# 8. 你可以直接用的過渡句（全部是我的改寫，不是來源原話）

1. **從 chat 到 workflow**  
   「Chat 很會陪你做事；Workflow 才把事情拆成明確的步驟、狀態和驗收。」  
   靈感來源：CS329A `40:54–42:45`、CS230 `55:35–56:33`。

2. **先 workflow、後 multi-agent**  
   「先別問要幾隻 Agent。先把工作怎麼流畫清楚，再決定哪一步真的需要不同角色。」  
   靈感來源：CS230 先 agentic workflow 後 multi-agent；CS224G `Start Single`。

3. **三個詞拆開**  
   「Workflow 決定工作怎麼流；Agent 決定某一步能不能自主決策；Multi-agent 決定要不要拆成一個團隊。」  
   靈感來源：Anthropic workflow-vs-agent + CS224G single-vs-multi taxonomy。

4. **Reviewer / QA 的由來**  
   「不是因為 AI 流行才需要 Reviewer；原本的工程流程就有 Review 和 QA。Multi-agent 只是讓我們可以把這些責任真的分開執行。」  
   靈感來源：CS224G evaluator/coding-agent diagrams、CS329A generator/judge。

5. **為何不是每一步同一模型**  
   「有些票只要小模型快速分類，有些票才值得開高推理；把所有工作塞進同一個 chat，就很難在流程層做這種 routing。」  
   靈感來源：CS224G reasoning-vs-standard；CS230 heavy model / 2% capability；CS329A routing。

---

# 9. 非 Stanford、但本題容易混進來的來源

## 9.1 Anthropic — Building effective agents

**不是 Stanford。**

- 官方：<https://www.anthropic.com/engineering/building-effective-agents>
- 發布：2024-12-19
- 重要章節：What are agents? / Building blocks, workflows, and agents / Prompt chaining / Routing / Parallelization / Orchestrator-workers / Evaluator-optimizer / Agents

它之所以應列在這份 survey，是因為 Stanford CS224G 直接採用了相同的 workflow-vs-agent 區分，而 CS329Z 2026 也把這篇列為前兩週閱讀。

## 9.2 Berkeley LLM Agents MOOC / course

**不是 Stanford；是 UC Berkeley。**

- Fall 2024：**CS294/194-196 Large Language Model Agents**  
  <https://rdi.berkeley.edu/llm-agents/f24>
- Instructor：Dawn Song，頁面明寫 Professor, UC Berkeley。
- 課程內容包含 foundation LLMs、reasoning、planning/tool use、agent infrastructure、RAG、evaluation、human-agent interaction、multi-agent collaboration。

- Spring 2025：**CS294/194-280 Advanced Large Language Model Agents**  
  <https://rdi.berkeley.edu/adv-llm-agents/sp25>

所以如果之前任何 survey 把 “LLM Agents MOOC” 當 Stanford 課，應更正為 Berkeley。Fall 2024 課程裡確實有 Stanford 的 Percy Liang guest lecture，但**客座講者來自 Stanford ≠ 課程屬於 Stanford**。

---

# 10. 最終建議：你這兩段應該怎麼命名

這也是**【我的歸納】**。

原本如果是：

```text
交給 Agent
為什麼一隻 Agent 不夠
```

我會改成：

```text
Part 2：從 Chat 到 Workflow
— 為什麼「一直聊」不等於「可靠地把工作做完」

Part 3：從 Workflow 到 Agent Team
— 什麼時候一個 Agent 就夠，什麼時候才值得拆角色
```

原因：

- **CS329A** 最直接地把 chatbot limitation 定義成「沒有 end-to-end 完成 task」。
- **CS230** 實際順序就是 limitations → augmentations → agentic workflow → eval → 最後 multi-agent。
- **CS224G** 明確把 workflow-vs-agent 與 single-vs-multi 分成不同概念，並教 `Start Single`。
- **CS193T** 證明對非工程師最自然的入口確實是 conversational chat，再升級到 structured / autonomous workflows。
- **CS25** 提供最容易懂的 CPU / computer、single-thread / multi-thread、manager / specialists 比喻。

換句話說，**你原本混亂的根因不是資料少，而是把四個不同問題塞在同一條線上：**

1. 使用介面：chat / conversational interaction
2. 工作組織：workflow
3. 自主程度：predefined workflow / dynamic agent
4. 角色數量：single-agent / multi-agent

把這四層拆開後，你前面已經教過的 `Goal → Ticket → Dev → Review → QA → Product Check → Done` 反而會成為最好的橋：**那條看板本身就是 workflow；Agent 只是去承擔其中某些角色與決策。**

---

# 11. 最終來源清單（已回查）

## Stanford 官方

1. Stanford CS230 syllabus — Lecture 8  
   <https://cs230.stanford.edu/syllabus/>
2. Stanford Online — CS230 Lecture 8  
   <https://www.youtube.com/watch?v=k1njvbBmfsw>
3. CS230 公開逐字稿（時間點驗證用）  
   <https://copyyoutubetranscript.com/transcript/k1njvbBmfsw/>
4. Stanford CS329A — Self-Improving AI Agents  
   <https://cs329a.stanford.edu/>
5. Stanford Online — CS329A Lecture 1  
   <https://www.youtube.com/watch?v=6YnLB0XbTnI>
6. CS329A 公開時間稿（時間點驗證用）  
   <https://lilys.ai/en/notes/ai-agent-20260920/cs329a-self-improving-ai-agents>
7. Stanford CS224G schedule  
   <https://web.stanford.edu/class/cs224g/schedule.html>
8. CS224G Lecture 7 — Agent Orchestration & Workflow Design  
   <https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf>
9. Stanford CS25 Transformers United V3  
   <https://web.stanford.edu/class/cs25/past/cs25-v3/index.html>
10. CS25 Nov 28 public video  
    <https://www.youtube.com/watch?v=ylEk1TE1uBo>
11. CS25 公開逐字稿  
    <https://lawwu.github.io/transcripts/transcript_ylEk1TE1uBo.html>
12. Stanford CS224N Winter 2026  
    <https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1264/index.html>
13. CS224N 2026 — Agents, Tool Use, and RAG slides  
    <https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf>
14. Stanford CS193T Thinking with AI  
    <https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/>
15. CS193T Course Placement  
    <https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/course/course_placement/>
16. CS193T Lecture 2 — Core Prompting  
    <https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/lectures/02-prompting/>
17. CS193T Assignment 1 — AI Foundations  
    <https://web.stanford.edu/class/archive/cs/cs193t/cs193t.1272/assignments/1-ai-foundations/>
18. Stanford CS224V Fall 2026 schedule  
    <https://web.stanford.edu/class/cs224v/schedule.html>
19. CS224V Lecture 1  
    <https://web.stanford.edu/class/cs224v/lectures_2026/l-introduction.pdf>
20. Stanford CS329Z Engineering AI Agents, Fall 2026  
    <https://cs329z.stanford.edu/>
21. Stanford CS324 Winter 2022 lecture notes TOC  
    <https://stanford-cs324.github.io/winter2022/lectures/>
22. Stanford CS324 Winter 2023 syllabus  
    <https://stanford-cs324.github.io/winter2023/syllabus/>
23. Stanford HAI event index containing “AI Agents and Higher-Order Work”  
    <https://hai.stanford.edu/events?page=4&upcomingFilterBy=seminar>

## 外部、但 Stanford 課程有引用或本題容易混淆

24. Anthropic — Building effective agents  
    <https://www.anthropic.com/engineering/building-effective-agents>
25. UC Berkeley — CS294/194-196 Large Language Model Agents, Fall 2024  
    <https://rdi.berkeley.edu/llm-agents/f24>
26. UC Berkeley — Advanced Large Language Model Agents, Spring 2025  
    <https://rdi.berkeley.edu/adv-llm-agents/sp25>

