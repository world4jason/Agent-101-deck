# Agent 101 Workshop：GitHub 公開 Agent 課程與教材調查
## 第 2 輪補查、逐項驗證後的完整版本

更新日期：2026-10-04

> 本文件是「第 2 輪」結果：重新驗證第 1 輪常見來源、刪除無法驗證的說法，並特別檢查「chat 的限制 → workflow / multi-agent」的過渡方式。
>
> **標示規則**
>
> - **【來源原意】**：只寫來源明確存在的內容；可能是短句引用或保守改寫。
> - **【我的歸納】**：根據多個來源整理出的教學結論，不冒充來源原話。
> - **查不到**：在公開 GitHub 教材中無法驗證，就直接標示，不用二手猜測補齊。
> - 本輪以 **GitHub 上可公開驗證的章節／小節位置** 為主要定位。若 GitHub repo 沒有影片轉錄或時間碼，**影片時間點一律寫「查不到」**。

---

# 0. 先講結論

如果目標是替 Agent 101 workshop 找一條適合非工程師的敘事，調查結果不支持一開始就丟出：

> single agent vs multi-agent  
> chat-driven vs work-driven

這幾個其實是**不同維度**，混在一起很容易亂。

更接近目前主流教材的順序是：

1. **先從一般 LLM / chat 開始**
2. 加入 **tools / action / agent loop**
3. 任務拉長後，開始碰到 **planning、state、memory、context**
4. 再把工作變成較明確的 **workflow**
5. 當單一執行者的 role / context / tools / review 負擔過大時，才拆成 **subagents / multi-agent**

其中最直接吻合 Owner 想要的「大家先用 chat → chat 開始有問題 → 才需要拆工作」的是 GitHub Copilot Learning Hub 的 **Agents and Subagents**。它甚至直接寫：

> “This distinction matters more as you move from simple chat prompts to orchestrated agentic workflows.”

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md  
章節：開頭、`Start with the mental model`、`What changes when work moves to a subagent`  
影片時間點：**查不到；這是文字教材。**

這篇的教學心智模型是：

- main agent = project lead
- subagents = focused contributors
- main agent 保留 broader conversation / goals
- subagent 只拿 narrower prompt + isolated context
- subagent 可用 planner / implementer / reviewer / researcher 等較窄角色
- subagent 可以選不同 model
- intermediate noisy work 不必全部塞回主 thread

這幾乎就是 Owner 想講的核心。

---

# 1. 熱門課程通常怎麼排？Multi-agent 放在哪裡？

## 1.1 Microsoft — AI Agents for Beginners

來源總表：  
https://github.com/microsoft/ai-agents-for-beginners

Study Guide：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md

### 已驗證章節順序

目前 repo 是 18 lessons。和本題最相關的順序為：

- 01 — Intro to AI Agents
- 02 — Agentic Frameworks
- 03 — Agentic Design Patterns
- 04 — Tool Use
- 05 — Agentic RAG
- 06 — Building Trustworthy AI Agents
- 07 — Planning Design Pattern
- **08 — Multi-Agent Design**
- 09 — Metacognition
- 10 — AI Agents in Production
- 11 — Agentic Protocols
- **12 — Context Engineering**
- **13 — Agent Memory**
- 14 — Microsoft Agent Framework
- …

Study Guide 的定位也很清楚：

- 07：learn to break complex tasks into steps
- 08：when to split work across specialized agents
- 09：agents review / improve their own output
- 12：select / trim / isolate / manage context
- 13：save useful information across interactions

### Multi-agent 在哪？

**第 8 課。**

也就是先教完 agent、framework、patterns、tools、RAG、trust、planning，才正式進 multi-agent。

Lesson 08：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

影片時間點：**查不到；GitHub 教材可驗證課名與文字章節，但本輪沒有可可靠對應的逐句影片時間碼。**

### 【來源原意】

Lesson 08 一開始就是在問：

- 什麼時候應從單一 agent 切換到多 agent？
- 多 agent 相較於「一個 agent 負責多種任務」有什麼優勢？

列出的核心優勢包括：

- specialization
- scalability
- fault tolerance

教材以旅遊預訂為例：若單一 agent 同時掌握航班、飯店、租車等所有 tools 與工作，系統會變得較 monolithic；拆成不同 specialist agents 後，每個 agent 專注自己的領域。

### 【我的歸納】

Microsoft 的起點不是「multi-agent 比 single agent 高級」，而是：

> **複雜度與責任增加到一定程度後，要不要把工作拆給專長不同的 agent。**

這很適合用來支持 Owner 的：

- 一人分飾多角色
- tool / responsibility overload

但 **Lesson 08 本身不是從 chat context 污染切入**；context 問題是後面的 Lesson 12 才完整教。

---

## 1.2 Hugging Face — Agents Course

主 repo：  
https://github.com/huggingface/agents-course

Unit 0：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit0/introduction.mdx

Unit 1：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/introduction.mdx

### 已驗證課程骨架

Top-level units：

- Unit 0 — Onboarding
- **Unit 1 — Agent Fundamentals**
- **Unit 2 — Frameworks**
- Unit 3 — Use Cases
- Unit 4 — Final Assignment

Unit 1 先教：

- What is an Agent
- LLM messages
- tools / actions
- Thought → Action → Observation
- build your first agent

Multi-agent 不是一開始獨立成一個大章，而是進入 **Unit 2 frameworks** 後，在不同 framework 的能力裡出現。

### Agency 分級

來源：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

章節：agent agency / levels table  
影片時間點：**查不到。**

教材用「agency level」而不是直接 single / multi 二分：

- 0★ simple processor
- 1★ router
- 2★ tool caller
- 3★ multi-step agent
- 3★ one agentic workflow can start another → multi-agent

### 【我的歸納】

這是一個很適合非工程師的分類法，因為它先講：

> AI 可以被賦予多少自主行動能力？

而不是先講架構名詞。

Multi-agent 只是 agentic workflow 再往上的一種組織方式。

---

## 1.3 Hugging Face Agents Course — smolagents 的 Multi-Agent Systems

來源：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx

章節：

- Multi-Agent Systems
- `Splitting the task between two agents`

影片時間點：**查不到。**

### 【來源原意】

教材指出，多 agent 讓 specialized agents 協作複雜任務，目的包含：

- modularity
- scalability
- robustness

而且在 `Splitting the task between two agents` 明確說到 **separate memories between sub-tasks** 的好處：

1. 每個 agent 可以更集中在自己的核心任務
2. 分開 memory 後，每一步需要放進 input 的 tokens 會更少，因此有利 latency / cost

官方 smolagents guided tour 也有同方向的說法：

https://github.com/huggingface/smolagents/blob/main/docs/source/en/guided_tour.md

核心例子可概括為：

> 為什麼要讓 coding agent 的 memory 塞滿 web-search agent 看過的網頁？

### 【我的歸納】

這是 Owner 的 **context 污染** 最強的教材證據之一。

它不是抽象說「multi-agent 很強」，而是：

> **不同 subtask 產生的 context 不應彼此污染。**

---

## 1.4 Hugging Face — Context Engineering Course

主 repo：  
https://github.com/huggingface/context-course

README：  
https://github.com/huggingface/context-course/blob/main/README.md

Unit 0：  
https://github.com/huggingface/context-course/blob/main/units/en/unit0/introduction.mdx

Unit 1：  
https://github.com/huggingface/context-course/blob/main/units/en/unit1/introduction.mdx

### 已驗證 top-level 順序

- Unit 0 — onboarding
- Unit 1 — Skills / portable knowledge
- Unit 2 — MCP
- Unit 3 — plugins
- **Unit 4 — Subagents: Multi-Agent Workflows**
- Unit 5 — hooks
- Unit 6 — Nano Harness

影片時間點：**查不到。**

### 【來源原意】

Unit 0 的核心前提是：

> agent 的表現高度依賴它取得的 context。

Unit 1 又把 problem 說得更實務：

- 若缺 context，agent 只能猜
- skills 可以讓知識超越單次 conversation
- 不然每次 conversation 都要重複塞長 prompt、散落 wiki，重新建 context

### 【我的歸納】

這套課的順序很值得 Agent 101 借：

> **先教 context / reusable capability，再教 subagents。**

也就是先讓聽眾知道「Agent 不是一隻有魔法記憶的 AI」，而是每次要拿到恰當 context / tools / instructions，之後才談多 agent。

---

## 1.5 GitHub Copilot Learning Hub — Agents and Subagents

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

章節：

- opening
- `Start with the mental model`
- `What changes when work moves to a subagent`
- orchestration patterns / common questions

影片時間點：**不適用；文字教學。**

這不是完整 semester-style course，但在這次 survey 裡，它是**最貼近 Owner 想要的敘事**。

### 【來源原意】

它直接把 transition 寫成：

> simple chat prompts → orchestrated agentic workflows

並用：

- main agent = project lead
- subagents = focused contributors

來解釋。

工作交給 subagent 後，改變的是：

- **Context isolation**
- **Focused instructions**
- Parallelism
- Controlled synthesis
- **Alternative model selection**

其中 focused role 直接舉：

- planner
- implementer
- reviewer
- researcher

還指出 subagent 可以改用另一個更適合 code review / research 的 model。

### 【我的歸納】

這篇比多數「Multi-Agent 介紹」更適合放在 workshop 中，因為它不是先教 graph / topology，而是先回答：

> **為什麼不要把所有工作繼續塞在同一條 chat？**

---

## 1.6 LangChain / LangGraph

LangChain multi-agent overview：  
https://github.com/langchain-ai/docs/blob/main/src/oss/langchain/multi-agent/index.mdx

Subagents：  
https://github.com/langchain-ai/docs/blob/main/src/oss/langchain/multi-agent/subagents.mdx

LangGraph 101：  
https://github.com/langchain-ai/langgraph-101/blob/main/README.md

影片時間點：**查不到。**

### 【來源原意】

目前官方 multi-agent docs 對「為什麼 multi-agent」的重點包括：

- context management
- distributed development
- parallelization

也特別指出：

- 如果 single agent tools 太多而開始做錯決定
- 需要大量 specialized knowledge / context
- 有 sequential constraints

multi-agent 就可能有價值。

同時官方也特別提醒：

> **不是每個複雜任務都需要 multi-agent。**

如果只需要 dynamic tools / prompt，一隻 agent 仍可能足夠。

官方列出的 multi-agent patterns 包含：

- Subagents
- Handoffs
- Skills
- Router
- Custom workflow

Subagents 文件則直接把 context isolation 當重點，避免 parent context bloat。

### 【我的歸納】

LangChain 的分類很值得拿來提醒：

> multi-agent 不是單一架構，而是一組 orchestration patterns。

而且它清楚反駁「工作一複雜就要多 agent」的過度推論。

---

## 1.7 Google — Agent Development Kit (ADK)

Tutorials index：  
https://github.com/google/adk-docs/blob/main/docs/tutorials/index.md

Agents overview：  
https://github.com/google/adk-docs/blob/main/docs/agents/index.md

About ADK：  
https://github.com/google/adk-docs/blob/main/docs/get-started/about.md

LLM Agents：  
https://github.com/google/adk-docs/blob/main/docs/agents/llm-agents.md

Agent Team tutorial：  
https://github.com/google/adk-docs/blob/main/docs/tutorials/agent-team.md

影片時間點：**查不到。**

### 已驗證的教學結構

ADK 的 tutorial 也是漸進式：

- 先 simple / multi-tool agent
- 再 Agent Team / multi-agent workflow
- 再往 streaming、進階 sample

ADK 的 agent taxonomy 很清楚：

- LLM Agent：用 LLM 決策
- Workflow Agents：Sequential / Parallel / Loop 等 deterministic orchestration

### 【來源原意】

Agents overview 說明：隨著能力與複雜度增加，可把能力拆進 workflows，以：

- manage behavior
- work within model context limits
- modularize code

### 【我的歸納】

這對 workshop 很重要：

> **workflow 和 multi-agent 不是同義詞。**

有些階段其實只需要 deterministic workflow，不需要另外找一隻會自主判斷的 agent。

---

## 1.8 Berkeley — LLM Agents MOOC

Fall 2024 syllabus：  
https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md

Spring 2025：  
https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/sp25.md

影片時間點：**查不到；本輪只驗證 GitHub syllabus 的日期／lecture title，不猜 YouTube timestamp。**

### Fall 2024 已驗證順序

前幾週大致是：

- Sep 9 — LLM Reasoning
- Sep 16 — LLM Agents: brief history and overview
- Sep 23 — Agentic AI Frameworks & AutoGen / Knowledge Assistant
- Sep 30 — Enterprise GenAI
- Oct 7 — Compound AI Systems & DSPy
- …

Sep 23 的 reading 已包含 AutoGen multi-agent conversation、StateFlow 等。

### 【我的歸納】

Berkeley 不適合拿來支持「大家先用 chat，chat 出問題，所以 multi-agent」這條故事。

它比較像：

> 從 reasoning / agents / frameworks / compound systems 的學術與系統觀點展開。

而且 multi-agent 並不是一定晚到最後才出現：Fall 2024 第 3 個 lecture block 就已碰 AutoGen。

所以不能寫成：

> 「熱門課程通常都到很後面才教 multi-agent。」

這個說法太強，**不成立**。

---

## 1.9 Datawhale — Hello-Agents

主 repo：  
https://github.com/datawhalechina/hello-agents

README：  
https://github.com/datawhalechina/hello-agents/blob/main/README.md

Chapter 9 Context Engineering：  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

Chapter 13 Travel Assistant：  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md

影片時間點：**查不到。**

### 已驗證章節骨架

- Ch1 agent 定義／類型／範式
- Ch2 發展史
- Ch3 LLM 基礎與限制
- Ch4 ReAct / Plan-and-Solve / Reflection 等經典 paradigm
- Ch5 low-code
- Ch6 framework
- Ch7 build your agent framework
- Ch8 memory + retrieval
- **Ch9 context engineering**
- Ch10 agent communication protocols
- Ch11 Agentic-RL
- Ch12 evaluation
- **Ch13 intelligent travel assistant：MCP + multi-agent collaboration**
- Ch14 Deep Research
- Ch15 cyber town
- **Ch16 capstone：完整 multi-agent application**

### 【來源原意：Chapter 9】

這章非常直接談長時程工作的問題：

- agent 長時間、多輪 reasoning 之後，context 持續擴張
- 單純把 context window 變大，不能根治 context pollution / relevance degradation
- 長任務可用：
  - **Compaction**
  - **Structured note-taking**
  - **Sub-agent architectures**

Sub-agent 的做法是：

- main agent 做 high-level planning / synthesis
- specialist subagents 在 **clean context windows** 內深入探索
- 最後只回傳較凝練 summary
- 搜尋產生的大量 noisy context 留在 subagent

### 【我的歸納】

這是「chat thread 越用越髒 → 不要什麼都留在同一個 context」很好的中文教材。

而且它沒有直接跳到 multi-agent，而是把三種處理手段並列：

1. 壓縮
2. 外部筆記／memory
3. subagents

這比說「context 太長，所以一定要 multi-agent」更精確。

---

## 1.10 Datawhale — Hugging Multi-Agent

來源：  
https://github.com/datawhalechina/hugging-multi-agent

README：  
https://github.com/datawhalechina/hugging-multi-agent/blob/main/README.md

影片時間點：**查不到。**

### 已驗證順序

大致為：

- Chapter 1：環境
- Chapter 2：agent structure + multi-agent framework
- Chapter 3：single / multi-function agents
- Chapter 4：multi-agent development

### 【我的歸納】

這種教材比較接近「single → multi」的傳統教法。

但如果 Owner 的目標是先讓非工程師理解：

> **為什麼 chat-based collaboration 會出問題？**

它的敘事就沒有 GitHub Learning Hub、Microsoft Context Engineering、Hello-Agents Chapter 9 那麼直接。

---

# 2. Owner 六個問題：哪些課程真的有講？

符號：

- **◎ 直接支持**：來源明確講同一問題
- **○ 間接支持**：來源做法能支持，但不是用 Owner 的說法
- **△ 只能當我的歸納**
- **— 查不到**

| Owner 的問題 | 驗證結果 | 最強來源 |
|---|---|---|
| 一人分飾多角色 | **◎** | Microsoft Lesson 08；GitHub Learning Hub；HF multi-agent |
| context 污染 | **◎** | GitHub Learning Hub；Microsoft Lesson 12；HF multi-agent；Hello-Agents Ch9 |
| 球員兼裁判 | **○，不可寫成定律** | GitHub Learning Hub 的 reviewer subagent；Microsoft Lesson 08 sample；但 Microsoft Lesson 09 又明確教 self-review |
| 不同問題選不同 model | **◎** | GitHub Learning Hub 明確寫 alternative model selection |
| 不同問題選不同 effort | **— 查不到** | 本輪公開課程未找到足以支持「per-agent reasoning effort」的章節原話 |
| compact 後遺忘 | **○ / △；不能寫成來源定論** | Hello-Agents Ch9、Microsoft Context Engineering / Memory 講 compression、trimming、working memory，但未直接說「compact 一定造成遺忘」 |
| 換 session 看不到之前內容／交接 | **◎** | Microsoft Lesson 13 Agent Memory：short-term session vs long-term memory |

以下逐點拆。

---

## 2.1 一人分飾多角色

### 【來源原意】

**Microsoft Lesson 08** 的核心問題就是：

> 何時不該再讓一個 agent 做多種任務，而應拆成 specialized agents？

來源：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md  
章節：Introduction / advantages / travel example

**GitHub Learning Hub** 直接把角色列成：

- planner
- implementer
- reviewer
- researcher

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md  
章節：`What changes when work moves to a subagent`

**Hugging Face** 則說 multi-agent 讓 agents 以 distinct capabilities 分工。

來源：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx  
章節：Multi-Agent Systems

### 【我的歸納】

Owner 這點可以放心保留，而且可把用語改得更精確：

> **一條 chat 裡同一個 agent 同時扮演 planner、doer、reviewer、researcher，角色與指令會越來越肥。**

---

## 2.2 Context 污染

### 【來源原意】

最直接的是 GitHub Learning Hub：

- subagent 有自己的 isolated context
- 目的之一是 reduce distraction from earlier conversation history
- noisy intermediate work 可以留在 subagent

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md  
章節：`Start with the mental model`、`What changes when work moves to a subagent`

Microsoft Lesson 12：

https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md

章節包括：

- Context Poisoning
- Context Distraction
- Context Confusion
- Context Clash
- context compression
- multi-agent as context engineering

它明確把：

- history 累積太多
- tools 太多
- 無關資訊
- 指令／資訊互相衝突

視為不同的 context failure modes。

Hugging Face：

https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx

章節：`Splitting the task between two agents`

直接把 separate memories 當成優點。

Hello-Agents Chapter 9：

https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

章節：`9.2.3 面向長時程任務的上下文工程`

直接談：

- context pollution
- compaction
- structured notes
- sub-agent architectures
- clean context windows

### 【我的歸納】

Owner 可以把「context 污染」當成這兩段的**主軸問題**，因為它比「multi-agent 很強」更貼近日常 chat 使用者的體感。

---

## 2.3 球員兼裁判

這點要改寫，不能寫成：

> 單一 Agent 自我 Review 一定不可靠，所以一定要多 Agent。

### 支持拆 reviewer 的來源

GitHub Learning Hub 將 `reviewer` 列為獨立 subagent role，而且介紹 multi-perspective review。

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

Microsoft Lesson 08 的 sample 也有獨立 `ReviewerAgent`：

https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/code_samples/workflows-agent-framework/dotNET/01.dotnet-agent-framework-workflow-ghmodel-basic.cs

### 反例：single agent self-review 也是正規 pattern

Microsoft Lesson 09：

https://github.com/microsoft/ai-agents-for-beginners/blob/main/09-metacognition/README.md

主題就是：

- metacognition
- self-reflection
- self-evaluation
- improve own output

Study Guide 還直接把 Lesson 09 寫成：

> How agents can review and improve their own output.

### 【我的歸納】

建議投影片不要寫「球員兼裁判 = 錯」。

改成：

> **同一隻 Agent 可以 self-review；但對高風險或需要獨立視角的 gate，把 reviewer 隔離成另一個 role / context / model，會比較容易得到真正的第二視角。**

這樣符合來源，也更專業。

---

## 2.4 不同問題選不同 model / effort

### Different model：有直接來源

GitHub Learning Hub 明確列：

**Alternative model selection**

意思是 subagent 可以使用不同 AI model，例如 main agent 用 generalist model，但 code review / research subagent 用更適合該工作的 model。

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md  
章節：`What changes when work moves to a subagent`、Common questions

### Different effort：查不到

本輪查到的 GitHub 公開課程／教材中，**沒有找到足以支持「每個 Agent 可依問題選不同 reasoning effort」作為通用 multi-agent 教學理由的明確章節原話。**

所以：

- 「不同 model」：可以標來源事實
- 「不同 effort」：若放投影片，應標成 Owner / 本課程的系統設計推論，不要說「主流課程都是這樣教」

### 【我的歸納】

真正更一般化的概念是：

> **不同工作，應配置不同的 capability / model / tool / budget。**

`effort` 是某些產品提供的具體 knob，不宜冒充成所有 agent framework 的通用概念。

---

## 2.5 Compact 之後遺忘

這點第 2 輪需要特別更正。

### 查到的內容

Hello-Agents Chapter 9 很明確有 **Compaction**：

https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

章節：`9.2.3 面向長時程任務的上下文工程`

它定義為：

- 接近 context limit 時
- 對 conversation 做高保真 summary
- 用 summary 開新 context window
- 保留 architecture decisions、open issues、implementation details
- 丟掉冗餘 tool output / noise

而且它明確建議先優化 recall，避免漏掉重要資訊。

Microsoft Lesson 12 也教：

- select
- trim
- compress
- isolate context

Lesson 13 又補：

- working memory
- long-term memory
- session memory

### 查不到的內容

**查不到主流教材直接下結論：「compact 之後一定會遺忘」。**

### 【我的歸納】

可以講的版本是：

> **Compaction 本質上是一種有損風險的 state handoff，所以關鍵決策、AC、未完成工作等不能只期待聊天摘要永遠保真，應外部化成 ticket / notes / artifacts / memory。**

但這句要標成「課程整理後的工程歸納」，不是來源原話。

---

## 2.6 換 session 看不到之前內容／交接問題

Microsoft Lesson 13：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md

章節：

- Types of Agent Memory
- Short-Term Memory
- Long-Term Memory
- Working Memory

影片時間點：**查不到。**

### 【來源原意】

教材明確區分：

**Short-term memory**

- 通常只維持在一個 conversation / session
- session 被持續 reuse 時，可保留上下文
- session 結束／application restart 後，若沒有 persistence，就不再保留

**Long-term memory**

- 用來跨 sessions 保存資訊

### 【我的歸納】

Owner 的「換 session 交接」是成立的，但最好把原因講準：

> **LLM 本身不是自動擁有跨 session 的完整工作記憶；continuity 必須透過 persisted state / memory / ticket / files / handoff artifact 明確建立。**

這會自然接回你第一段已經教過的 ticket / board。

---

# 3. 課程到底都用什麼分類方式？

這次 survey 最重要的發現之一是：

> **single / multi、chat / work、workflow / agent、autonomy level 不是同一個分類軸。**

不要放在同一張二分圖裡。

---

## 3.1 Chat / LLM → Agent

Microsoft Study Guide 很適合做最初的概念過渡：

來源：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md

### 【來源原意】

它以 beginner 角度對比：

- regular chatbot：主要回答
- agent：除了回答，還可以讀／搜尋、call tools、plan steps、使用 context / memory、留下 traces / guardrails

### 【我的歸納】

這是「chat → agent」的**能力差異**，不是 single → multi。

---

## 3.2 Agency / Autonomy Level

Hugging Face：

https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

從 simple processor → router → tool caller → multi-step → multi-agent。

### 【我的歸納】

這是在問：

> 「系統能自己決定多少步？」

不是問「有幾隻 Agent」。

---

## 3.3 Agent vs Workflow

Google ADK：

https://github.com/google/adk-docs/blob/main/docs/get-started/about.md

https://github.com/google/adk-docs/blob/main/docs/agents/index.md

明確有：

- LLM agent
- Sequential workflow
- Parallel workflow
- Loop workflow

### 【我的歸納】

這一軸在問：

> **工作下一步是由模型判斷，還是由預先設計的流程決定？**

這跟 single / multi 又是另一件事。

---

## 3.4 Single Agent vs Multi-Agent

Microsoft Lesson 08：

https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

HF：

https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx

### 【我的歸納】

這一軸才是在問：

> **責任、context、tools 是否要拆給多個 worker？**

---

## 3.5 Multi-Agent 內部還有不同 topology

LangChain：

https://github.com/langchain-ai/docs/blob/main/src/oss/langchain/multi-agent/index.mdx

目前分類：

- Subagents
- Handoffs
- Skills
- Router
- Custom workflow

GitHub Learning Hub 又用：

- coordinator-worker
- multi-perspective review
- research then act

### 【我的歸納】

所以「multi-agent」本身仍然不是一種架構。

---

## 3.6 Crews vs Flows

CrewAI 官方 repo：  
https://github.com/crewAIInc/crewAI

### 【來源原意】

CrewAI 目前把核心概念區分為：

- Crews：role-based autonomous teams
- Flows：event-driven workflows / precise control

影片時間點：**查不到。**

### 【我的歸納】

這再次證明：

> 「一群 Agent」和「工作流程」不是互斥，也不是同義。

你可以有：

- single agent + workflow
- multi-agent + workflow
- single autonomous agent
- orchestrator + deterministic workers
- human + agents mixed workflow

---

# 4. 哪些教材最適合非工程師？

## 第一名：GitHub Copilot Learning Hub — Agents and Subagents

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

原因：

1. 直接從 **simple chat prompts** 過渡到 **orchestrated agentic workflows**
2. 用 project lead / focused contributors，不需要先懂 graph
3. 一次命中：
   - context isolation
   - role specialization
   - reviewer
   - alternative model selection
4. 很容易接你前一段的 software workflow

最適合當「骨架」。

---

## 第二名：Microsoft Lesson 08 — Travel Booking

來源：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

原因：

- 飛機 / 飯店 / 租車專家非常直覺
- 很容易說明「一個人管所有工具與領域」為什麼會肥大
- 適合非工程師理解 specialization

最適合當「生活比喻」。

---

## 第三名：Datawhale Hello-Agents Ch9 + Ch13

Context Engineering：  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

Travel Assistant：  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md

原因：

- 中文
- 把長任務拆成：
  - compaction
  - structured notes
  - subagents
- 不會誤導成「context 長了只有 multi-agent 一條路」

適合補「為什麼 chat 越聊越難維持乾淨」。

---

## 第四名：Hugging Face agency ladder

來源：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

原因：

- 一張表就能解釋 autonomy 是連續光譜
- 可避免聽眾以為：
  - chat = single
  - agent = multi
  - multi = 更高級

適合當「名詞整理」。

---

# 5. 特別檢查：各來源怎麼從 chat / single agent 過渡到 workflow / multi-agent？

## 5.1 GitHub Learning Hub：最乾淨

**【來源原意】**

直接明講：

> simple chat prompts → orchestrated agentic workflows

接著馬上建立：

> main agent = project lead  
> subagents = focused contributors

然後列出 context isolation / roles / model selection。

### 【我的歸納】

這是這次 survey 最接近 Owner 想要的 transition：

> **Chat 本來很自然，但工作一旦變成長流程，就不應該再把所有角色、探索、review 都塞回同一條 thread。**

---

## 5.2 Microsoft：先 capability，再 complexity，再分工

Lesson 01：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/01-intro-to-ai-agents/README.md

Lesson 07：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/07-planning-design/README.md

Lesson 08：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

### 【來源原意】

大方向是：

- chatbot → agentic actions / tools
- planning → break complex work into steps
- multi-agent → split work across specialists

### 【我的歸納】

它其實是在教：

> **先學會讓一隻 agent 做事，工作複雜後再拆責任。**

缺點是 context / memory 在課程順序上比較後面，所以如果拿原 curriculum 順序直接照搬，不一定最適合你的 workshop。

---

## 5.3 Hugging Face：先 action loop，再 framework complexity

Unit 1：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/introduction.mdx

Unit 2：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit2/introduction.mdx

Multi-agent：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx

### 【來源原意】

- Unit 1：先理解 agent / tool / action-observation loop
- Unit 2：workflow 變複雜時，framework abstraction 才變有用
- multi-agent：再把複雜 task 分給 specialized agents

### 【我的歸納】

HF 的過渡不是「chat 壞掉了」，而是：

> **task / workflow complexity 上升 → 需要更好的 abstraction → multi-agent 是其中一種。**

---

## 5.4 Hello-Agents：長任務 → context engineering → subagent

Chapter 9：  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

### 【來源原意】

- 長時間、多輪工作，context 不斷長大
- 需要管理有限 context
- 三種典型手段：
  - compaction
  - structured notes
  - sub-agent architectures

### 【我的歸納】

這是最適合用來說：

> **multi-agent 不是起點，而是 context engineering 的一種解。**

---

## 5.5 LangChain：先問「是否真的需要 multi-agent」

來源：  
https://github.com/langchain-ai/docs/blob/main/src/oss/langchain/multi-agent/index.mdx

### 【來源原意】

先列出：

- context management
- distributed development
- parallelization

再提醒：

> not every complex task needs multi-agent

### 【我的歸納】

這對 workshop 是很好的 guardrail：

> **拆 Agent 有成本；如果只要切換 prompt / tools 就能解，不需要硬拆。**

---

# 6. 對 Owner 六點的最後判決

## 可以直接保留

### 1. 一人分飾多角色

證據充分。

建議用語：

> **同一條 chat 讓一隻 Agent 同時當 planner / implementer / reviewer / researcher，責任會快速膨脹。**

主要來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

---

### 2. Context 污染

證據非常充分，而且是最值得做主軸的一點。

建議用語：

> **研究、tool output、debug history、舊指令全部累積在同一個 context，會增加 distraction / confusion；subagent 可以用 isolated context 把 noisy work 留在外面。**

主要來源：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

---

### 3. 不同工作用不同 model

證據充分。

建議用語：

> **Research、implementation、review 不必綁死同一個 model；subagent 可以依任務使用不同 model。**

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

---

### 4. 換 session / 交接

證據充分。

建議用語：

> **session context 是暫時工作記憶；跨 session continuity 需要 persisted memory / notes / tickets / artifacts。**

來源：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md

---

## 要降級／改寫

### 5. 球員兼裁判

不要講成「一定不行」。

建議改：

> **Self-review 可以用；但重要 gate 需要獨立視角時，可把 reviewer 拆成不同 role / context / model。**

支持 reviewer 分離：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

同時支持 self-review：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/09-metacognition/README.md

---

### 6. Compact 之後遺忘

不要講成來源事實。

建議改：

> **長任務經過 compaction / context reset 時，需要可靠 handoff；重要 state 應外部化，不應只靠聊天歷史。**

來源能支持 compaction / notes / persistence，但**查不到「compact 一定遺忘」的課程原話**。

主要來源：  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md

---

### 7. 不同 effort

**查不到可靠課程原話。**

如果要講，建議放在：

> 「資源／成本配置」的 Owner 歸納

而不是說這是 multi-agent 課程的標準理由。

---

# 7. DeepLearning.AI：第 2 輪特別更正

官方 GitHub hub：  
https://github.com/https-deeplearning-ai/deeplearning-ai

Agentic AI public repo：  
https://github.com/https-deeplearning-ai/agentic-ai-public

CrewAI 官方 discussion，可確認相關課程存在：  
https://github.com/crewAIInc/crewAI/discussions/1151

### 驗證結果

DeepLearning.AI 的 GitHub hub 本身就說明：

- GitHub repos 主要放 companion code
- structured instruction / videos 在 deeplearning.ai 平台

因此，僅靠「GitHub 上公開的官方資料」，本輪**無法可靠驗證**：

- `Multi AI Agent Systems with crewAI` 每個 lecture 的完整章節順序
- 每段影片的 timestamp
- 網路上常被轉述的每一句「why multi-agent」是否真的是講者原話

### 處理方式

網路上有多個第三方 course-note / notebook mirror，會整理出：

- role-playing
- multiple LLMs
- manager agent
- sequential / hierarchical process

但這些**不是 DeepLearning.AI 官方 repo**。

所以本版不把它們當 primary evidence。

**結論：DeepLearning.AI 精確影片章節／時間點：查不到。**

這是刻意保守，不補猜測。

---

# 8. 第 1 輪容易犯的錯：本輪刪除／更正清單

## 更正 1：不能說「主流課程都很後面才教 multi-agent」

錯。

- Microsoft：Lesson 08 / 18
- HF Agents：Unit 2 framework 階段
- HF Context Course：Unit 4
- Hello-Agents：應用層到 Ch13 / capstone Ch16
- 但 Berkeley Fall 2024：第 3 個 lecture block 已經碰 AutoGen / multi-agent

比較準確：

> **多數 beginner-oriented 教材會先建立 agent / tools / planning 等基礎，但 multi-agent 的出現早晚差異很大。**

---

## 更正 2：不能說「single agent 不能 review 自己」

錯。

Microsoft Lesson 09 明確教 metacognition / self-review。

比較準確：

> **獨立 reviewer 是增加 role/context/model independence 的一種 pattern，不是 self-review 的唯一替代。**

---

## 更正 3：不能說「compact 一定忘記」

查不到這樣的課程定論。

比較準確：

> **compaction 必須管理 information loss risk；重要 state 宜外部化。**

---

## 更正 4：different model 有來源，different effort 沒有

GitHub Learning Hub 直接支持 alternative model selection。

但 **reasoning effort** 這個具體 knob：

> **查不到主流 GitHub 課程把它當作 multi-agent rationale。**

---

## 更正 5：chat / agent / workflow / multi-agent 不要畫成同一條成熟度階梯

它們至少是四個不同問題：

1. **chat vs agent**：能不能自己採取 action / call tools / 多步完成
2. **autonomy level**：模型可以自己決定多少步
3. **workflow vs free-form agent**：流程由誰決定
4. **single vs multi-agent**：責任與 context 是否拆給多個 worker

---

# 9. 最適合 Agent 101 的重組敘事

以下是**我的歸納，不是任何單一課程原話**。

你前一段已經教完：

> Goal  
> ↓  
> Ticket Refinement / Backlog  
> ↓  
> Ready  
> ↓  
> Dev  
> ↓  
> PR Review  
> ↓  
> QA / Verification  
> ↓  
> Product / Goal Check  
> ↓  
> Done

接下來最自然的不是先問：

> Single Agent 還是 Multi-Agent？

而是：

---

## Slide A — 大家其實都是從 Chat 開始

> 「我把需求丟給 AI，它幫我做完。」

對一次性的 bounded task，這很好用。

這一頁甚至不用先講 Agent taxonomy。

---

## Slide B — 但長工作不是一則 Chat

一條 conversation 開始同時裝：

- 需求
- brainstorming
- implementation
- tool outputs
- debug history
- review
- QA
- 新需求
- 前幾輪妥協
- 舊 assumptions

### 這時出現六類問題

1. **Role overload**  
   同一個人 planner / doer / reviewer / researcher 全包

2. **Context overload / pollution**  
   所有中間產物都塞進同一條 thread

3. **Review independence 不足**  
   self-review 可以，但重要 gate 有時需要真正第二視角

4. **Capability / cost mismatch**  
   每種工作被迫綁同一組 model / tools / resources

5. **Long-horizon state compression**  
   工作超過 context lifetime，就必須 summary / notes / external state

6. **Session / handoff**  
   換 session / worker 時，需要可交接的外部 artifact

其中 1、2、3、4 可用 GitHub Learning Hub 支持；  
5 用 Microsoft / Hello-Agents Context Engineering；  
6 用 Microsoft Agent Memory。

---

## Slide C — 所以第一步不是「多開幾隻 Agent」

而是：

> **把 Chat 裡隱藏的工作流程拉出來。**

也就是你上一段已教過的：

- ticket
- state
- AC
- evidence
- handoff
- board

工作狀態不應只存在聊天歷史裡。

這是 **work-driven** 真正應該放的位置。

---

## Slide D — 再決定每一步要誰做

這時才進 multi-agent：

| Workflow Stage | 可能角色 |
|---|---|
| Refinement | PO / PM Agent |
| Ready Check | Planner / Scrum Agent |
| Dev | Developer Agent |
| PR Review | Reviewer Agent |
| QA | QA Agent |
| Product / Goal Check | Product Agent |
| Done | workflow / human gate |

重點不是「Agent 數量變多」。

而是：

> **每個 worker 有 bounded responsibility、bounded context、適合的 tools / model，而且透過 ticket / artifact 交接。**

---

## Slide E — Multi-Agent 是結果，不是起點

一句收尾可以是：

> **不是因為 AI 一定要變成很多隻；而是當同一條 Chat 開始同時承擔做事、找資料、驗證、記憶與交接，我們先把工作拆成 Workflow，再決定哪些步驟值得交給不同 Agent。**

這句是**我的歸納**，但和這次 survey 的主流教材方向一致。

---

# 10. 最後答案：哪個課程最適合非工程師？

如果只能選一個來學「說法」，不是學 framework：

## **GitHub Copilot Learning Hub — Agents and Subagents**

https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

原因：

- 直接從 simple chat prompts 講到 orchestrated workflow
- project lead / contributor 比喻直觀
- 直接涵蓋 context isolation
- 直接涵蓋 focused roles
- 直接涵蓋 reviewer
- 直接涵蓋 different models
- 沒有先把聽眾淹沒在 framework API

如果要補「context 為什麼會壞」：

## **Microsoft Lesson 12 + Hello-Agents Chapter 9**

Microsoft：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md

Datawhale：  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

如果要補「一隻拆成多隻的生活例子」：

## **Microsoft Lesson 08 — Travel Booking**

https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

如果要補「不要把 autonomy 和 multi-agent 混在一起」：

## **Hugging Face — agency levels**

https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

---

# 11. 一頁版研究結論

> **主流教材並不把「single agent → multi-agent」當成唯一主線。**
>
> 更常見的底層邏輯是：
>
> **LLM / Chat**  
> → 能 call tools / act  
> → multi-step planning  
> → context / memory / state 變複雜  
> → workflow  
> → 必要時把角色、context、tools、review 拆給不同 agents
>
> Owner 列的六個問題中：
>
> - **一人分飾多角色：有強證據**
> - **context 污染：有非常強證據**
> - **球員兼裁判：只能說 independent reviewer 是好 pattern，不能說 self-review 無效**
> - **不同 model：有直接證據**
> - **不同 effort：本輪查不到通用課程證據**
> - **compact 後遺忘：不能寫成定律；應改成 compaction / handoff 有 information-loss risk**
> - **換 session / handoff：有直接 memory / session 證據**
>
> 對 Agent 101 最乾淨的敘事應該是：
>
> **「大家從 Chat 開始」  
> →「長工作把角色、context、review、state 都塞進同一條 Chat」  
> →「先把工作變成 Workflow」  
> →「再把適合拆的步驟交給不同 Agent。」**

