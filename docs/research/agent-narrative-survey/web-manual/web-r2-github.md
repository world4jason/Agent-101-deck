# GitHub 公開 Agent 課程與整理：第 2 輪驗證修正版

> 核驗日期：2026-10-04  
> 範圍：GitHub 上可公開查驗的 agent 課程、教材、Learning Hub、官方 repo 與高訊號整理。  
> 原則：官方／一手教材優先；社群整理只作補充。所有結論均標示「來源明講」或「我的歸納」。若找不到直接依據，明寫「查不到」。  
> 定位方式：本報告不使用未逐秒核對的影片時間碼；全部使用可重現查找的「課程章節／小節／lecture 日期」定位。這符合「章節或時間點」要求，也避免虛構 timestamp。

---

## 0. 結論先行

### 0.1 這些課程通常怎麼開始？

**來源明講：**主流教材幾乎都不是從「為什麼要 multi-agent」開始，而是先建立下列其中一種基礎：

1. **LLM / Chatbot → Agent**：LLM 原本只產生文字；Agent 加入 tools、state/memory、planning 後可以採取行動。  
   - Microsoft《AI Agents for Beginners》Lesson 01：`Introduction to AI Agents and Agent Use Cases`  
     https://github.com/microsoft/ai-agents-for-beginners/blob/main/01-intro-to-ai-agents/README.md
   - Hugging Face《Agents Course》Unit 1：`Introduction to Agents` / `What are Agents?`  
     https://github.com/huggingface/agents-course/blob/main/units/en/unit1/introduction.mdx  
     https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

2. **Agent loop / tools / planning → workflow / orchestration → multi-agent**。  
   - Microsoft：Lesson 07 Planning → Lesson 08 Multi-Agent。  
     https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md
   - Hugging Face Agents Course：Unit 1 fundamentals → Unit 2 frameworks；multi-agent 是 Unit 2 `smolagents` 裡的一個進階小節，不是第一章。  
     https://github.com/huggingface/agents-course/blob/main/README.md  
     https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx
   - Hugging Face Context Course：Skills → MCP → Plugins → **Unit 4 Subagents: Multi-Agent Workflows**。  
     https://github.com/huggingface/context-course/blob/main/README.md

3. **較學術的 Berkeley 路線**：先 reasoning / agent overview，再進 frameworks、workflow、multi-agent、evaluation 等研究議題。  
   - Fall 2024：9/9 Reasoning → 9/16 LLM Agents Overview → 9/23 Agentic AI Frameworks & AutoGen；9/23 的 readings 已包含 AutoGen multi-agent conversation 與 StateFlow workflow。  
     https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md
   - Fall 2025：9/8 Intro → 9/15 LLM Agents Overview → 10/20 Multi-Agent AI → 11/17 Multi-Agent Systems in the Era of LLMs。  
     https://github.com/rdi-berkeley/agentic-ai/blob/main/index.md

**我的歸納：**你的 Owner 想要的順序「大家先用 chat → chat 出現問題 → 才導向 workflow / multi-agent」並不是多數課程原封不動的章節順序，但它與這些教材背後的概念順序是相容的。尤其 GitHub Copilot Learning Hub 已經直接使用「從 simple chat prompts 走向 orchestrated agentic workflows」的過渡語言，是最貼近你這段敘事的來源。

來源：GitHub Copilot Learning Hub，`Agents and Subagents` → `Start with the mental model`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

---

## 1. 第 2 輪核驗後，需更正／刪除的幾個重點

### 1.1 Microsoft 現行課程是 18 lessons；部分 awesome list 的「10 lessons / 12 lessons」已過時

**來源明講：**Microsoft 官方 repo / Study Guide 現在列到 Lesson 18；Lesson 07 是 Planning、08 是 Multi-Agent、12 是 Context Engineering、13 是 Memory。  
來源／章節：Microsoft `STUDY_GUIDE.md` → `Lesson-by-Lesson Guide`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md

**我的歸納：**若其他整理仍寫 10 或 12 lessons，不應拿它當現行章節順序的依據；本報告以官方 repo 為準。

### 1.2 Datawhale Hello-Agents 現行官方章序，不是「第 11 章 = Multi-Agent」

**來源明講：**官方 current README 的第 11 章是 Agentic-RL；真正明確以多智能體做完整案例的是：
- 第 13 章：智能旅行助手，`MCP 與多智能體協作`
- 第 16 章：畢業設計，`完整多智能體應用`

來源／章節：官方 README → `內容導航`  
https://github.com/datawhalechina/hello-agents/blob/main/README.md

**我的歸納：**網路上能搜到舊 fork 或舊章序把「Multi-Agent」放在第 11 章；那不是目前官方 repo 的章序，已從本報告移除。

### 1.3 DeepLearning.AI：GitHub 上有大量課程鏡像／學員 repo，但查不到一個可當作官方課程章節一手來源的 DeepLearning.AI repo

**已驗證：**CrewAI 官方 repo / Discussion 確實連到 DeepLearning.AI 的 `Multi AI Agent Systems with crewAI` 課程，因此課程本身是真的。  
來源：CrewAI 官方 Discussion  
https://github.com/crewAIInc/crewAI/discussions/1151  
來源：CrewAI 官方 repo → Learning Resources  
https://github.com/crewAIInc/crewAI

**但：**搜尋到的課程 notebook / README 大多是第三方學員整理，例如：  
https://github.com/akj2018/Multi-AI-Agent-Systems-with-crewAI  
https://github.com/ksm26/Multi-AI-Agent-Systems-with-crewAI

**結論：**
- DeepLearning.AI 課程存在：**已驗證**。
- 「DeepLearning.AI 官方 GitHub repo 的完整章序」：**查不到**。
- 因此本報告不把第三方鏡像裡的說法當成一手來源；只在補充處說明它們與 CrewAI 官方課程方向一致。

### 1.4 「compact 之後一定遺忘」要改寫

**來源明講：**Datawhale 第 9 章把 Compaction 定義為：接近 context 上限時做高保真摘要，再用摘要重啟新 context；教材同時提醒要先確保 recall，並在練習題直接提到「過度壓縮導致資訊丟失」這個失敗情境。  
來源／章節：Hello-Agents 第 9 章 → `9.2.3 面向長時程任務的上下文工程`、`Compaction`；章末思考題  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

**我的歸納：**可以在投影片講「compaction 是有損風險的交接／壓縮點，若摘要漏掉關鍵資訊，後面會像忘記」，但不要講成「所有 compact 都必然遺忘」。

### 1.5 「不同 model」有直接來源；「不同 reasoning effort」查不到

**來源明講：**GitHub Copilot Learning Hub 明確寫 subagent 可以選不同 AI model；也把「比較不同 models」列為 subagent 的使用情境。  
來源／章節：`Agents and Subagents` → `What changes when work moves to a subagent` / `When to use subagents` / `Common questions`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

Microsoft Memory lesson 也提到，可先用較便宜、較快的 model 判斷一筆資訊是否值得存取，再決定是否進較複雜流程。  
來源／章節：Lesson 13 → `Optimizations for Memory`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md

**但：**在本輪 GitHub 課程材料中，沒有找到把產品層的 `reasoning effort / thinking effort` 當作 multi-agent 教學理由的明確內容。  
**結論：model routing = 有來源；effort routing = 查不到。**

---

# 2. 熱門／高訊號課程的章節順序

## 2.1 Microsoft — AI Agents for Beginners

官方 repo：  
https://github.com/microsoft/ai-agents-for-beginners

官方 Study Guide：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md

### 驗證後順序

| Lesson | 主題 | 與本研究的關係 |
|---|---|---|
| 01 | Intro to AI Agents | Agent vs basic chatbot；先講「為什麼要 agent」 |
| 02 | Agentic Frameworks | framework 幫忙管 model/tools/state/workflows |
| 03 | Agentic Design Patterns | 建立 pattern 心智模型 |
| 04 | Tool Use | Agent 採取行動 |
| 05 | Agentic RAG | knowledge / retrieval |
| 06 | Trustworthy Agents | guardrail / oversight |
| 07 | Planning Design | multi-step planning |
| **08** | **Multi-Agent Design** | **正式進 multi-agent** |
| 09 | Metacognition | self-review / improve |
| 10 | Production | production concerns |
| 11 | Agentic Protocols | agents/tools/agents connectivity |
| **12** | **Context Engineering** | **context pollution / isolation / compression** |
| **13** | **Agent Memory** | **跨 interaction / session 記憶** |
| 14 | Microsoft Agent Framework | sequential/concurrent/group chat/handoff 等 orchestration |
| 15–18 | browser / scale / local / security | production extension |

來源／章節：`STUDY_GUIDE.md` → `Lesson-by-Lesson Guide`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md

### 這門課從哪裡開始講？

**來源明講：**Study Guide 對新手建議先完成 01–06；如果目標是 multi-step workflow，從 07 開始再接 08；若目標是 multi-agent，從 08，再補 07、09、11。  
來源／章節：`Choose Your Learning Path`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md

**我的歸納：**Microsoft 的課綱非常明確：**Agent basics → tools/trust → planning → multi-agent**。因此「一開始就混 single / multi / workflow」並不是它的教法。

---

## 2.2 Hugging Face — Agents Course

官方 repo：  
https://github.com/huggingface/agents-course

### 驗證後主結構

| Unit | 主題 | 與本研究的關係 |
|---|---|---|
| 0 | Welcome | onboarding |
| **1** | **Introduction to Agents** | Agent fundamentals、LLM、messages、tools、Think→Act→Observe |
| 1 Bonus | Function-calling fine-tuning | extension |
| **2** | **Frameworks for AI Agents** | smolagents / LlamaIndex / LangGraph；multi-agent 在這裡成為 framework 內的進階 pattern |
| 2 Bonus | Observability & Evaluation | evaluation |
| 3 | Agentic RAG | real use case |
| 4 | Final Project | evaluation / benchmark |

來源／章節：官方 README → `Content`  
https://github.com/huggingface/agents-course/blob/main/README.md

### Multi-agent 在哪裡？

**不是獨立的早期基礎單元。**它出現在 Unit 2 的 smolagents 小節：`Multi-Agent Systems`。  
來源／章節：Unit 2 → smolagents → `Multi-Agent Systems`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx

### 一個很重要的分類：Agency Level

Hugging Face Unit 1 的 `What are Agents?` 用 agency level 排成：
- simple processor
- router
- tool caller
- multi-step agent
- multi-agent

來源／章節：Unit 1 → `What are Agents?` → `Agency Level` table  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

**我的歸納：**這個表很適合拿來避免把「workflow」「agent」「multi-agent」當成同義詞；它是在談控制權／agency 程度的上升。

---

## 2.3 Hugging Face — Context Course

官方 repo：  
https://github.com/huggingface/context-course

### 驗證後順序

| Unit | 主題 |
|---|---|
| 0 | Onboarding |
| 1 | Agent Skills |
| 2 | Model Context Protocol |
| 3 | Plugins / workflows |
| **4** | **Sub-agents: Multi-Agent Workflows** |
| 5 | Hooks |
| 6 | Bonus: Nano Harness |

來源／章節：README → `Content` / Unit 0 → `What You'll Learn`  
https://github.com/huggingface/context-course/blob/main/README.md  
https://github.com/huggingface/context-course/blob/main/units/en/unit0/introduction.mdx

**來源明講：**Unit 3 的結尾直接說，前面建立的 plugin components 接下來會成為 Unit 4 multi-agent workflows 的 building blocks。  
來源／章節：Unit 3 quiz → `Next Steps`  
https://github.com/huggingface/context-course/blob/main/units/en/unit3/quiz2.mdx

**我的歸納：**這門課的順序更清楚地表達：**先把 context / skill / tools / plugin 管好，再進 multi-agent**。

---

## 2.4 UC Berkeley — LLM Agents MOOC, Fall 2024

公開課程 GitHub：  
https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md

### 驗證後前段順序

- **Sep 9** — LLM Reasoning
- **Sep 16** — LLM agents: brief history and overview
- **Sep 23** — Agentic AI Frameworks & AutoGen + LlamaIndex
  - readings 包含 AutoGen multi-agent conversation
  - readings 包含 StateFlow state-driven workflows
- Sep 30 — Enterprise trends / building successful agents
- Oct 7 — Compound AI Systems & DSPy
- Oct 14 — Agents for Software Development
- Oct 21 — AI Agents for Enterprise Workflows
- 後續再進 robotics、evaluation、safety 等

來源／章節：Fall 2024 syllabus  
https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md

**我的歸納：**Berkeley 2024 的 multi-agent 反而很早，在第三場正式 lecture 就透過 AutoGen 出現；它不是用「chat 壞掉」來引出，而是從 **reasoning → agent → agent framework/system architecture** 進去。

---

## 2.5 UC Berkeley — Agentic AI, Fall 2025（補查）

公開課程 GitHub：  
https://github.com/rdi-berkeley/agentic-ai/blob/main/index.md

### 與 multi-agent 最相關的定位

- Sep 8 — Introduction
- Sep 15 — LLM Agents Overview
- Sep 22 — Evolution of system designs from an AI engineer perspective
- Oct 6 — Agent Evaluation
- **Oct 20 — Multi-Agent AI**
- Nov 10 — Practical Lessons from Deploying Real-World AI Agents
- **Nov 17 — Multi-Agent Systems in the Era of LLMs**
- Dec 8 — Agentic AI Safety & Security

來源／章節：Fall 2025 `Syllabus`  
https://github.com/rdi-berkeley/agentic-ai/blob/main/index.md

**我的歸納：**2025 的 Berkeley 課更像「先理解與評估 agent，再談 multi-agent」，但依舊不是 chat limitation 型敘事。

---

## 2.6 Datawhale — Hello-Agents（中文社群高訊號）

官方 repo：  
https://github.com/datawhalechina/hello-agents

### 驗證後章序

- 第 1–3 章：Agent 與 LLM 基礎
- 第 4–7 章：ReAct / Plan-and-Solve / Reflection、低代碼、framework、自己做 Agent framework
- **第 8 章：記憶與檢索**
- **第 9 章：上下文工程**
- **第 10 章：MCP / A2A / ANP communication**
- 第 11 章：Agentic-RL
- 第 12 章：Agent evaluation
- **第 13 章：智能旅行助手 — MCP + 多智能體協作**
- 第 14–15 章：Deep Research / Cyber Town
- **第 16 章：完整多智能體應用畢業設計**

來源／章節：README → `內容導航`  
https://github.com/datawhalechina/hello-agents/blob/main/README.md

**我的歸納：**Hello-Agents 是這輪最符合「先 single agent、再遇到真實工程問題、最後拆 multi-agent」的完整中文教材。

---

## 2.7 GitHub — Awesome Copilot Learning Hub

Repo：  
https://github.com/github/awesome-copilot

關鍵教材：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

它不是傳統線性課程，但 `Agents and Subagents` 這篇非常適合本題，因為開場就直接把：

**simple chat prompts → orchestrated agentic workflows**

當成需要理解 agent / subagent 差異的背景。

來源／章節：`Agents and Subagents` → intro / `Start with the mental model`。

---

## 2.8 Awesome / curated repos

### A. `mahsa-teimourikia/awesome-ai-agents`

Repo：  
https://github.com/mahsa-teimourikia/awesome-ai-agents

這不是大學或公司官方課程，但它現在已整理成 notebook-first curriculum。最有價值的是它的分類階梯：

1. Single model call
2. Deterministic workflow
3. Agentic workflow
4. Single agent
5. Multi-agent system

來源／章節：README → `What is an AI agent?` / `Start with the least autonomous design...`  
https://github.com/mahsa-teimourikia/awesome-ai-agents/blob/main/README.md

它的課程也把：
- Beginner 03 = Workflow or Agent?
- Intermediate 02 = Context Engineering
- Advanced 01 = Single vs Multi-Agent
- Advanced 09 = Model Routing
- Advanced 11 = LLM-as-Judge / Agent Judges

明確拆開。

**我的歸納：**如果你只是想替 workshop 找一個「不要把名詞混在一起」的分類骨架，這個是本輪最乾淨的一個；但它是社群課程，不應當成業界標準定義。

### B. `barvhaim/awesome-ai-agents-free-courses`

Repo：  
https://github.com/barvhaim/awesome-ai-agents-free-courses

用途：找課程索引很好，列了 Berkeley、Microsoft、Hugging Face、Stanford 等。  
但其中 Microsoft lesson 數等描述已可能落後官方 repo，因此**只作 discovery index，不作章序證據**。

---

# 3. 這些課程怎麼說「為什麼需要 Agent」？

## 3.1 Microsoft：從「只回文字」到「能採取行動」

來源／章節：Lesson 01 → `What are AI Agents?`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/01-intro-to-ai-agents/README.md

**來源明講：**最短版本是：Agent 讓 LLM 能「實際做事」，而不只是回 prompt。沒有 agent system 時，LLM 只產生文字；有 Agent 後可搜尋 DB、call API、發訊息等。

**我的歸納：**這是非常適合非工程師的第一層轉換：

> Chat = 回答你；Agent = 可以為目標採取行動。

它還沒有談 single vs multi，這正是好處。

---

## 3.2 Hugging Face：Chat UI 其實只是把歷史重新塞進 prompt

來源／章節：Unit 1 → `Messages and Special Tokens`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/messages-and-special-tokens.mdx

**來源明講：**教材直接指出 chat interface 是 UI abstraction；對話訊息最後會被 concatenated 成單一 prompt；model 本身不是真的「記得」對話，而是每次重新讀入。

**我的歸納：**這可以很好地支撐你「先講大家都在用 chat，再揭露 chat 本質」的橋段：

> 你看到的是一段持續對話；模型看到的是這一輪被塞進去的一包 context。

但這段本身**沒有**直接導出 multi-agent。

---

## 3.3 Datawhale：從「命令—執行」到「目標—委託」

來源／章節：第 1 章 → `1.4 智能體應用的協作模式`  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter1/%E7%AC%AC%E4%B8%80%E7%AB%A0%20%E5%88%9D%E8%AF%86%E6%99%BA%E8%83%BD%E4%BD%93.md

**來源明講：**教材把人與 AI 的關係描述成從被動工具的「命令—執行」，進到把高層目標交付給自主協作者的「目標—委託」。

**我的歸納：**這比「chat vs agent」再多一步，開始貼近你的 workshop 核心：不是多聊幾句，而是把一個 goal 交出去。

---

# 4. 這些課程怎麼說「為什麼需要多個 Agent」？

## 4.1 Microsoft Lesson 08：專業分工、避免單體巨大化

來源／章節：Lesson 08 → `Scenarios Where Multi-Agents Are Applicable`、`Advantages of Using Multi-Agents Over a Singular Agent`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

**來源明講：**
- large workload 可以拆小並行；
- complex task 可以拆成各自專長的 subtask；
- diverse expertise 可由不同 agent 負責；
- 一個什麼都做的 agent 在複雜任務上可能搞混該做什麼；
- 單一 travel agent 同時負責 flight / hotel / rental car 會變成複雜、monolithic、難維護與擴充；multi-agent 可改成專職 agent。

教材用「一人包辦的旅行社 vs 有專業分工的旅行社」做類比。

**我的歸納：**它最直接命中 Owner 的「一人分飾多角色」。

---

## 4.2 Hugging Face：把不同 subtask 的 memory 分開

來源／章節：Unit 2 → smolagents → `Multi-Agent Systems` → `Splitting the task between two agents`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx

**來源明講：**拆成兩個 agent 有兩個具體效益：
1. 每個 agent 更聚焦自己的 core task；
2. 不同 subtask 的 memory 分開，減少每一步 input token，降低 latency 與 cost。

**我的歸納：**這是本輪最直接支撐「context isolation 不只是乾淨，還直接影響 token / latency / cost」的課程來源。

---

## 4.3 GitHub Copilot Learning Hub：subagent 不是「另一個分頁的同一隻 Agent」

來源／章節：`Agents and Subagents` → `What changes when work moves to a subagent`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

**來源明講：**subagent 的差異包含：
- isolated context
- 更窄的角色 instructions，例如 planner / implementer / reviewer / researcher
- 可平行執行
- parent 控制哪些結果帶回主 conversation
- 可使用不同 model

`When to use subagents` 還直接列出：
- compare approaches without polluting main thread
- parallel review perspectives：correctness / security / architecture
- compare across different models

**我的歸納：**這篇幾乎直接把你 Owner 的 1、2、3、4 四個問題連在同一個心智模型裡。

---

## 4.4 Datawhale 第 13 章：一個旅行規劃 Agent 開始變成「超大 prompt + 很難 debug」

來源／章節：第 13 章 → `13.3 多智能體協作設計` → `13.3.1 為何需要多智能體`  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md

**來源明講：**如果單一 Agent 同時負責景點、天氣、飯店、整合：
- tool invocation 變複雜；
- prompt 要同時塞所有任務規則，難維護；
- LLM 容易混淆不同任務的格式與參數；
- 出錯後難知道是哪個環節壞掉。

接著教材自然轉到：把複雜任務拆成簡單任務，讓不同 Agent 各司其職；再用現實旅行社的專業角色類比。

**我的歸納：**這是**最適合非工程師**的 single → multi 過渡故事，因為問題、例子、轉折全部在同一段完成。

---

# 5. Owner 六個 chat 問題：逐點對照來源

## 5.1 一人分飾多角色

### 直接證據 A — Microsoft
來源／章節：Lesson 08 → `Advantages of Using Multi-Agents Over a Singular Agent`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

**來源明講：**單 agent 做 flight / hotel / rental car 會形成複雜 monolith；不同 agent 專責不同任務較模組化。

### 直接證據 B — Datawhale
來源／章節：Chapter 13 → `13.3.1 為何需要多智能體`  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md

**來源明講：**單 agent 同時負責景點、天氣、酒店、整合會造成 prompt 複雜、混淆、難 debug；解法是各司其職。

### 直接證據 C — GitHub Learning Hub
來源／章節：`What changes when work moves to a subagent`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

**來源明講：**subagent 可用 planner / implementer / reviewer / researcher 等 focused role。

**判定：強支持。**

---

## 5.2 Context 污染

### 直接證據 A — Microsoft Context Engineering
來源／章節：Lesson 12 → `Common Context Failures`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md

**來源明講：**列出 context poisoning、distraction、confusion、clash；其中 distraction 是累積歷史太大，使模型被舊資訊干擾；multi-agent 亦被列為 context engineering 手段，因為每個 agent 有自己的 context window。

### 直接證據 B — GitHub Learning Hub
來源／章節：`What changes when work moves to a subagent` / `When to use subagents`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

**來源明講：**isolated context 可降低 earlier conversation history 的 distraction；也直接把「比較方案但不污染 main thread」列成 subagent use case。

### 直接證據 C — Hugging Face
來源／章節：Unit 2 → Multi-Agent Systems → `Splitting the task between two agents`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx

**來源明講：**不同 subtasks 分離 memory，agent 更聚焦，且減少 input tokens / latency / cost。

### 直接證據 D — Datawhale
來源／章節：第 9 章 → `9.2.3 面向長時程任務的上下文工程`  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

**來源明講：**增大 context window 不能根治「上下文污染」與 relevance degradation；subagent 在乾淨 context window 中探索，再回傳濃縮結果。

**判定：非常強支持。**

---

## 5.3 球員兼裁判

### 結構性直接證據 A — GitHub agent handoff example
來源／章節：`agents.instructions.md` → `Common Handoff Patterns` / `Example: Complete Workflow`  
https://github.com/github/awesome-copilot/blob/main/instructions/agents.instructions.md

**來源明講：**完整 workflow 示範把 Planning → Implementation → Review 分成不同 agent；Reviewer 只做品質、安全與 best-practice review。

### 結構性直接證據 B — GitHub Learning Hub
來源／章節：`When to use subagents` / `Orchestration patterns that work well`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

**來源明講：**可用多個 subagent 做 correctness / security / architecture 的獨立 review perspectives；也給出 coordinator + planner / implementer / reviewer pattern。

### 結構性證據 C — Microsoft
來源／章節：Lesson 08 quiz / single-agent choice  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

**來源明講：**若 workflow 需要 separate roles、different permissions、independent audit trails，就不是「單 agent 通常較佳」的情況。

**查不到的部分：**本輪沒有找到這些主流課程直接寫出「同一隻 Agent 自己做、自己 review 會因 self-bias 而不可信」這種一句話論證。

**我的歸納：**「球員兼裁判」是很好的 workshop 語言，但應標成**對上述角色隔離／獨立 review 設計的教學歸納**，不是來源原話。

**判定：強結構支持，但『球員兼裁判』是你的比喻。**

---

## 5.4 無法依問題選不同 model / effort，容易殺雞用牛刀

### 不同 model：直接支持
來源／章節：GitHub Learning Hub → `What changes when work moves to a subagent`、`Common questions`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

**來源明講：**subagent 可用不同 AI model；generalist main agent 可以把 code review / research 交給更專門的 model。

### 成本分層：直接支持
來源／章節：Microsoft Lesson 13 → `Optimizations for Memory`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md

**來源明講：**可以先用 cheaper / faster model 做價值判斷，再決定是否進更複雜流程。

### Community curriculum 補充
來源／章節：`awesome-ai-agents` → Advanced 09 `Model Routing`  
https://github.com/mahsa-teimourikia/awesome-ai-agents/blob/main/README.md

**來源明講：**model routing 可按 capability / cost / latency / fallback / ensemble 做路由。

### Effort
**查不到。**本輪調查的 GitHub 公開課程沒有明確把產品 UI 裡的 `reasoning effort / thinking effort` 當作 multi-agent 的教材理由。

**我的歸納：**投影片可以寫：
- 「不同角色可用不同 model / tools / context budget」＝有來源。
- 「不同角色可用不同 effort」＝你可以作產品實務補充，但不要標成這些課程的共同論點。

**判定：model 強支持；effort 查不到。**

---

## 5.5 Compact 之後遺忘

### 直接支持「compaction 有資訊損失風險」— Datawhale
來源／章節：第 9 章 → `9.2.3` 的 `Compaction`；章末思考題  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

**來源明講：**
- compaction 是摘要後重啟 context；
- 要先優化 recall，確保關鍵資訊不漏；
- 章末練習直接把「過度壓縮導致資訊丟失」當成失敗例子。

### Microsoft 的對應
來源／章節：Lesson 12 → `Context Distraction` / context summarization  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md

**來源明講：**對過大的 history 做 summarization，保留重要細節、移除冗餘 history，讓注意力重新聚焦。

**查不到的部分：**沒有找到官方課程直接說某一特定產品的 `/compact` 或 auto-compact 「必然」遺忘。

**我的歸納：**最準確的投影片語言是：

> 「Context 太長時需要壓縮；壓縮是資訊選擇，若摘要漏掉關鍵決策，就會形成『像忘記一樣』的後果。」

**判定：支持『有損風險』；不支持『compact 必然忘記』。**

---

## 5.6 換 session 看不到之前內容／交接問題

### 最直接來源 — Microsoft Memory
來源／章節：Lesson 13 → `Short Term Memory` / `Long Term Memory`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md

**來源明講：**short-term memory 只維持單一 conversation / session；Microsoft Agent Framework 的 AgentSession 在同一 session 重用時可保留 context，但 session 結束或 app restart 後並不持久。要跨 session，需要 long-term memory / persistent store。

### Hugging Face 的底層解釋
來源／章節：Unit 1 → `Messages and Special Tokens`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/messages-and-special-tokens.mdx

**來源明講：**model 並不真正記住 conversation，而是當前提供的 history 被重新組成 prompt。

### Datawhale 的 long-horizon 解法
來源／章節：第 9 章 → `Structured note-taking`  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md

**來源明講：**把重要狀態寫到 context 外的持久化 storage，可以跨多次 tool call 與多輪 context reset 維持進度與一致性。

### GitHub Learning Hub 的 handoff / delegated session 補充
來源／章節：`Tracking delegated work in VS Code`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

**來源明講：**delegated chats 需要 parent/child session linkage、source links、shareable session links 等機制來讓交接可追蹤。

**我的歸納：**你的「換 session 看不到之前內容」應該拆成兩件事講：
1. **model/session memory 邊界**：新 session 不自動擁有上一個 session 的完整 state；
2. **work handoff**：要把 goal、decisions、artifacts、remaining work 寫入可持久化狀態，不能只靠聊天紀錄。

**判定：非常強支持。**

---

# 6. 六點總表

| Owner 的問題 | 課程支援強度 | 最強來源 | 備註 |
|---|---|---|---|
| 一人分飾多角色 | **直接、強** | Microsoft L08；Datawhale Ch13；GitHub Learning Hub | specialization / role separation 是多教材共同理由 |
| context 污染 | **直接、很強** | Microsoft L12；GitHub Learning Hub；HF Unit2；Datawhale Ch9 | isolation 是 subagent / multi-agent 的核心優勢之一 |
| 球員兼裁判 | **結構性強支持** | GitHub handoff Planner→Implementer→Reviewer；Microsoft independent audit trails | 「球員兼裁判」字眼本身查不到，是你的歸納 |
| 不同 model / effort | **model 直接；effort 查不到** | GitHub Learning Hub；Microsoft L13 | model routing 可證；reasoning effort 不可硬說成課程共識 |
| compact 後遺忘 | **支持有損風險，不支持必然遺忘** | Datawhale Ch9；Microsoft L12 | 更精確應說「摘要／壓縮可能漏失關鍵資訊」 |
| 換 session / handoff | **直接、很強** | Microsoft L13；HF Messages；Datawhale Ch9 | short-term vs persistent memory 是教材明確概念 |

---

# 7. 這些課程使用哪些分類方式？

## 7.1 Chatbot / regular LLM vs Agent

### Microsoft
來源／章節：Study Guide → `A Simple Demo To Keep In Mind`  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md

**來源明講：**regular chatbot 可以根據既有知識回答；agent 可以搜尋課程檔案、用 tools、規劃 learning path、利用 context、memory、trace / citations。

### Hugging Face
來源／章節：Unit 1 → `What are Agents?`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

**來源明講：**agent = model + reasoning/planning + tools + environment interaction。

**我的歸納：**這是第一個維度：**只是回答，還是能為目標採取行動？**

---

## 7.2 Workflow vs Agent

### Hugging Face / smolagents 的 Agency Level
來源／章節：Unit 1 → `Agency Level`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

分類從 processor → router → tool caller → multi-step agent → multi-agent。

### Community `awesome-ai-agents`
來源／章節：README → `Start with the least autonomous design...`  
https://github.com/mahsa-teimourikia/awesome-ai-agents/blob/main/README.md

分類：
- Single model call
- Deterministic workflow
- Agentic workflow
- Single agent
- Multi-agent system

**我的歸納：**這是最適合你 workshop 的第二個維度：**路徑是人／code 事先定義，還是讓 model 根據狀態決定下一步？**

---

## 7.3 Single Agent vs Multi-Agent / Subagents

### Microsoft
來源／章節：Lesson 08  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

判斷依據：workload、complexity、specialization、scalability、fault tolerance；簡單工作未必需要 multi-agent。

### GitHub Learning Hub
來源／章節：`Start with the mental model`  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

Main agent vs subagent 分的是：lifetime、context、scope、output ownership。

**我的歸納：**這是第三個維度：**一個工作 context / role 就夠，還是要把工作拆成隔離、專職、可獨立審查的 workers？**

---

## 7.4 Orchestration pattern

Microsoft Architecture Center 公開 GitHub guide：  
https://github.com/microsoftdocs/architecture-center/blob/main/docs/ai-ml/guide/ai-agent-design-patterns.md

常見模式包括：
- Sequential
- Concurrent
- Group Chat
- Handoff
- Magentic / dynamic orchestration

Microsoft Agent Framework lesson 也以 workflow / orchestration 為主：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/14-microsoft-agent-framework/README.md

**我的歸納：**「multi-agent」不是單一結構；它下面還有**怎麼協作**這一層。

---

## 7.5 Datawhale 的架構分類

來源／章節：第 1 章 → `1.4 智能體應用的協作模式`  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter1/%E7%AC%AC%E4%B8%80%E7%AB%A0%20%E5%88%9D%E8%AF%86%E6%99%BA%E8%83%BD%E4%BD%93.md

它把 autonomous collaboration 的架構大致分成：
1. single-agent autonomous loop
2. multi-agent collaboration
   - role-playing conversation
   - organizational workflow
3. advanced control-flow architecture（例如 state graph）

**我的歸納：**這個分類特別有助於說明：**single/multi 是組織形態；workflow/control flow 是執行控制形態，兩者不是同一條軸。**

---

# 8. 各來源怎麼從「chat 的限制」過渡到 workflow / multi-agent？

## 8.1 GitHub Copilot Learning Hub — 最直接

來源／章節：`Agents and Subagents` → intro  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

**來源原意：**它直接說這個 distinction 在從「simple chat prompts」走向「orchestrated agentic workflows」時變得重要。

接著用：
- main agent = project lead
- subagent = focused contributor

做類比，再立刻引出 isolated context、focused role、parallelism、controlled synthesis、different model。

**我的歸納：**若你的投影片一定要有一句「Chat → Agent workflow」的橋，這篇最接近可直接借用的結構。

---

## 8.2 Datawhale Chapter 13 — 最自然、最適合非工程師

來源／章節：`13.3.1 為何需要多智能體`  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md

過渡流程是：

1. 先讓單一 Agent 處理旅行規劃；
2. 列出它要做的景點、天氣、酒店、整合；
3. 展示單 agent 的 tool / prompt / debugging 問題；
4. 再提出「把複雜任務拆成多個簡單任務，讓不同 Agent 各司其職」；
5. 用旅行社真人分工收束。

**我的歸納：**這幾乎就是你要的「先讓觀眾感受到痛，再給 multi-agent」模式。

---

## 8.3 Microsoft — 需要跨兩個 lesson 才完成過渡

### Step A：Chatbot → Agent
來源／章節：Lesson 01 / Study Guide  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/01-intro-to-ai-agents/README.md  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md

regular chatbot 回答；agent 能搜尋、規劃、call tools、採取 action。

### Step B：Single Agent → Multi-Agent
來源／章節：Lesson 08  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

單一 agent 遇到 complex tasks / diverse expertise 後，會有 specialization、maintainability、scalability 問題；旅行社例子轉成 multi-agent。

**我的歸納：**Microsoft 並沒有把「chat context 污染」當成 Lesson 08 的主要 bridge；context 問題是後面的 Lesson 12 才系統化講。因此若你把所有 chat 問題一次放在 single→multi 前，是你自己的重新編排，不是照抄 Microsoft 課綱。

---

## 8.4 Hugging Face Agents Course — 有素材，但沒有單一明確 bridge

### Chat 本質
來源／章節：Unit 1 → `Messages and Special Tokens`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/messages-and-special-tokens.mdx

model 不是真的保有 conversation；UI 把 history 組成 prompt。

### Agent capability
來源／章節：Unit 1 → `Introduction to Agents`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/introduction.mdx

Agent workflow = Think → Act → Observe，並使用 tools。

### Multi-agent
來源／章節：Unit 2 → `Multi-Agent Systems`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx

multi-agent 用 specialized roles，並分離 subtask memory 來提高 focus、降低 token / latency / cost。

**我的歸納：**你可以把這三段串成一條很好的 workshop 故事，但這是**跨章節的二次編排**，不是 HF 原課程本身的一句過渡。

---

## 8.5 Berkeley — 查不到「chat limitation → multi-agent」這種教法

來源／章節：Fall 2024 / Fall 2025 syllabus  
https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md  
https://github.com/rdi-berkeley/agentic-ai/blob/main/index.md

**來源明講：**Berkeley 是從 reasoning、planning、agent infrastructure、framework、evaluation 等研究能力逐步推進；multi-agent 是其中一個 system / research topic。

**查不到：**官方 GitHub syllabus 沒有用「聊天太長／context 污染／球員兼裁判」作為 multi-agent 的主敘事橋。

**我的歸納：**Berkeley 適合拿來證明「multi-agent 是 agent system design 的一個進階主題」，不適合拿來照搬你這段非工程師敘事。

---

## 8.6 DeepLearning.AI / CrewAI — 有方向，但 GitHub 一手材料不足

CrewAI 官方確實把 DeepLearning.AI 的 Multi AI Agent Systems 課程列為 learning resource：  
https://github.com/crewAIInc/crewAI

官方 Discussion：  
https://github.com/crewAIInc/crewAI/discussions/1151

第三方課程筆記通常整理成：
- team of agents 處理 complex multi-step tasks
- specialized role / goal / backstory
- memory / tools / guardrails / cooperation
- 部分鏡像還提到 different LLMs per task

例如：  
https://github.com/akj2018/Multi-AI-Agent-Systems-with-crewAI/blob/main/README.md

**但：**因為不是 DeepLearning.AI 官方 GitHub 課程正文，這些內容本報告只當次級證據。  
**官方 GitHub 的完整章節過渡句：查不到。**

---

# 9. 哪一個課程最適合非工程師？

## 第一名：Datawhale Hello-Agents 第 13 章

來源／章節：`13.3.1 為何需要多智能體`  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md

**原因（我的歸納）：**
- 先從一個人人懂的旅行規劃開始；
- 讓單一 Agent 真正撞牆；
- 問題是「prompt 太複雜、容易混淆、難 debug」，不需要工程背景也懂；
- 再用旅行社分工導入多 Agent。

這最接近你要的 workshop 講法。

## 第二名：Microsoft Lesson 01 + Lesson 08

來源：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/01-intro-to-ai-agents/README.md  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

**原因（我的歸納）：**
- Lesson 01 的「LLM 只回文字 → Agent 能做事」很乾淨；
- Lesson 08 又用旅行社做 single → multi；
- 兩段都很適合初學者。

缺點是 context / session 問題要另外借 Lesson 12–13 才完整。

## 第三名：GitHub Copilot Learning Hub — Agents and Subagents

來源：  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

**原因（我的歸納）：**
- 最直接命中你現在的問題；
- project lead / focused contributors 類比清楚；
- 一篇就把 context isolation、role、review、model selection、orchestration 串起來。

缺點是它偏 coding-agent / Copilot 語境，不如旅行社例子 universal。

## Hugging Face

**我的歸納：**適合拿來做技術硬證據，尤其：
- chat history 的真相；
- multi-agent memory isolation；
- token / latency / cost。

但不一定最適合直接照教材順序教非工程師。

## Berkeley

**我的歸納：**研究深度最高，但最不適合拿來當「一般人為什麼不要一直用同一個 chat」的第一個故事。

---

# 10. 對你的 Agent 101 敘事，我會怎麼重新排

> 以下全部是**我的歸納／教學設計建議**，不是任何單一來源原話。

## Slide A — 大家現在怎麼跟 AI 合作？「一個 Chat，從頭聊到尾」

先不要講 single-agent / multi-agent。

可以用 Hugging Face 的底層事實支撐：Chat UI 是 abstraction；model 每輪其實是在讀被提供的 context。  
來源：Unit 1 → `Messages and Special Tokens`  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/messages-and-special-tokens.mdx

### 核心句

**Chat 很適合「問一件事」；問題是我們開始拿它來「做一份長時間的工作」。**

---

## Slide B — 工作一長，Chat 開始出現六個問題

把六點全部放這裡，但用來源精度較高的語言：

1. **角色混在一起**：同一個 context 同時當 PM / Dev / Reviewer / QA。  
   來源：Microsoft L08；Datawhale Ch13；GitHub Learning Hub。
2. **Context 被歷史污染**：舊討論、探索噪音、不同任務互相干擾。  
   來源：Microsoft L12；GitHub Learning Hub；Datawhale Ch9。
3. **缺少獨立 review**：實作者與 reviewer 沒隔離，難建立真正獨立的 audit pass。  
   來源：GitHub handoff patterns；Microsoft L08 independent audit trails。
4. **所有問題共用同一 model / tool / context budget**：無法自然分工。  
   來源：GitHub Learning Hub；Microsoft L13。`effort` 另標為產品層延伸，不說是課程共識。
5. **Context 需要壓縮**：compaction / summary 有資訊選擇與遺漏風險。  
   來源：Datawhale Ch9；Microsoft L12。
6. **Session 有邊界**：短期 context 不等於持久 state；跨 session 需要 memory / artifacts / handoff。  
   來源：Microsoft L13；Datawhale Ch9。

---

## Slide C — 不要立刻跳到「所以要 Multi-Agent」

這是目前很多投影片最容易跳太快的地方。

先問：**這份工作到底需要多大的 autonomy？**

可借用的分類骨架：

`single model call → deterministic workflow → agentic workflow → single agent → multi-agent`

來源／章節：community `awesome-ai-agents` → `Start with the least autonomous design...`  
https://github.com/mahsa-teimourikia/awesome-ai-agents/blob/main/README.md

另可用 Hugging Face agency level 作較正式的技術補充：  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx

### 核心句

**Multi-Agent 不是「Agent 的下一版」；它只是當角色、context、tools、review 或 parallelism 真正需要隔離時的一種架構。**

---

## Slide D — 那什麼時候一隻 Agent 不夠？

用最容易懂的四個條件：

- **不同角色**：Planner / Dev / Reviewer / QA
- **不同 context**：不要讓 exploration noise 全塞同一包
- **不同能力**：tools / permissions / model 可以不一樣
- **需要獨立檢查或平行工作**

來源：
- Microsoft Lesson 08  
  https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md
- Hugging Face Unit 2 Multi-Agent Systems  
  https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx
- GitHub Copilot Learning Hub  
  https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

---

## Slide E — 把你前面教過的軟體流程，映射成 Agent team

你前面已教：

`Goal → Refinement → Ready → Dev → PR Review → QA → Product/Goal Check → Done`

現在才說：

- Goal / Refinement：PO / PM / Planner agent
- Dev：Implementation agent
- PR Review：Reviewer agent
- QA：QA / Verification agent
- Product/Goal Check：Product agent / human owner
- 看板／ticket：**external task state**，不是聊天記憶

這時觀眾才會理解：

> **Multi-Agent 的價值不是「多叫幾個 AI 一起聊天」，而是把工作流程裡原本就不同的責任、context、驗收點拆開。**

這個結論可由以下來源共同支撐，但句子本身是我的教學歸納：
- GitHub handoff Planner → Implementer → Reviewer  
  https://github.com/github/awesome-copilot/blob/main/instructions/agents.instructions.md
- Microsoft Multi-Agent specialization / independent roles  
  https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md
- Datawhale organizational workflow / multi-agent roles  
  https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter1/%E7%AC%AC%E4%B8%80%E7%AB%A0%20%E5%88%9D%E8%AF%86%E6%99%BA%E8%83%BD%E4%BD%93.md

---

# 11. 最終回答四個原始問題

## Q1. 熱門課程通常從哪裡開始？multi-agent / agentic workflow 排在哪？

**答案：**通常先 Agent fundamentals / tools / planning，再 workflow / multi-agent；不會一開始就把 single、multi、workflow 混成同一層。

- Microsoft：01 Agent → 07 Planning → **08 Multi-Agent** → 12 Context → 13 Memory。  
  https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md
- Hugging Face Agents：Unit 1 Agent fundamentals → **Unit 2 frameworks 裡的 multi-agent 小節**。  
  https://github.com/huggingface/agents-course/blob/main/README.md
- Hugging Face Context：Skills → MCP → Plugins → **Unit 4 Subagents / Multi-Agent Workflows**。  
  https://github.com/huggingface/context-course/blob/main/README.md
- Datawhale：single-agent / framework 基礎 → memory/context/protocol → **Ch13 multi-agent 實戰**。  
  https://github.com/datawhalechina/hello-agents/blob/main/README.md
- Berkeley：研究導向；Fall 2024 第 3 堂就有 AutoGen multi-agent，Fall 2025 則在中段正式兩次講 multi-agent。  
  https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md  
  https://github.com/rdi-berkeley/agentic-ai/blob/main/index.md

---

## Q2. 如何說明為什麼要 Agent / 多 Agent？Owner 六點有沒有被支持？

**答案：**
- Agent 的主理由：**從只回文字，變成能規劃、用工具、採取 action。**
- Multi-agent 的主理由：**specialization、context isolation、parallelism、independent review / audit、different tools/models、maintainability。**
- Owner 六點中：
  - 角色混雜：強支持
  - context 污染：強支持
  - 球員兼裁判：角色隔離／獨立 review 強支持，但比喻是你的
  - 不同 model：強支持；different effort 查不到
  - compact 遺忘：支持「壓縮可能失真／漏資訊」，不支持「必然忘」
  - session/handoff：強支持

來源詳見第 5–6 節。

---

## Q3. 課程用哪些分類？

**答案：至少四條不同維度，不該揉成一條：**

1. **Chatbot / LLM vs Agent** — 有沒有 action / tools / planning。  
2. **Workflow vs Agent** — path 是 code 預先決定，還是 model 動態決定。  
3. **Single vs Multi-Agent / Subagents** — 是否需要 role/context/tool/review isolation。  
4. **Orchestration pattern** — sequential / concurrent / group chat / handoff / dynamic。

因此 **chat-driven / work-driven / single / multi** 不是同一個分類軸。

主要來源：  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md  
https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md  
https://github.com/microsoftdocs/architecture-center/blob/main/docs/ai-ml/guide/ai-agent-design-patterns.md

---

## Q4. 哪個課程講法最適合非工程師？

**第一名：Datawhale Hello-Agents Ch13 §13.3.1。**  
旅行規劃 single agent → prompt/tool/debug 問題 → 旅行社分工 → multi-agent，最自然。  
https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md

**第二名：Microsoft Lesson 01 + Lesson 08。**  
先「LLM 回答 → Agent 做事」，再「一人旅行社 → 專業分工」。  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/01-intro-to-ai-agents/README.md  
https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md

**最適合補你六個問題的證據：GitHub Copilot Learning Hub。**  
它最集中地講 isolated context、roles、independent review perspectives、different models。  
https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md

---

# 12. 一句話給這份 workshop 的建議

> **先不要教「Single Agent vs Multi-Agent」。先讓觀眾理解：Chat 是一個共享 context；當你拿它來承載一整條工作流程，角色、context、review、成本與交接開始互相干擾。接著再說：Workflow、Single Agent、Multi-Agent 只是為了解不同問題而採用的不同工作架構。**

這句是**我的綜合歸納**，主要依據：
- Microsoft Agent vs chatbot、Planning、Multi-Agent、Context、Memory  
  https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md
- Hugging Face chat/message 與 multi-agent memory isolation  
  https://github.com/huggingface/agents-course/blob/main/units/en/unit1/messages-and-special-tokens.mdx  
  https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx
- GitHub Learning Hub 的 chat → orchestration / subagent mental model  
  https://github.com/github/awesome-copilot/blob/main/website/src/content/docs/learning-hub/agents-and-subagents.md
- Datawhale 的 context engineering 與旅行規劃 single→multi  
  https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter9/%E7%AC%AC%E4%B9%9D%E7%AB%A0%20%E4%B8%8A%E4%B8%8B%E6%96%87%E5%B7%A5%E7%A8%8B.md  
  https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md

