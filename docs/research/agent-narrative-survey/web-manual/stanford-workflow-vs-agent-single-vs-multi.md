# Stanford — Workflow vs Agent 與 Single vs Multi-Agent：兩個不同問題的證據整理

> 驗證日期：2026-10-04  
> 檔名依要求以 `standford` 開頭。  
> 本文件把「來源原話」與「教學歸納」明確分開；**Stanford 並沒有直接畫出一張 2×2 圖說這是兩條正交軸**，2×2 是根據課程結構與定義做的教學抽象。

---

## TL;DR

最精確的說法是：

- **Workflow vs Agent**：主要在問「執行路徑由誰決定？」
  - Workflow：predefined code paths
  - Agent：model dynamically decides process / tool use
- **Single-Agent vs Multi-Agent**：主要在問「責任與 context 如何分配？」
  - Single-Agent：一個 LLM / 一組 tools / 一個 shared context
  - Multi-Agent：多個 specialized roles，各自可以有 system prompt / tools / context

因此，不應直接把它們畫成一條：

```text
Workflow → Single Agent → Multi-Agent
```

比較好的教學抽象是：

```text
維度 A：Control / Autonomy
Workflow  ←────────────→  Agent
預先定義流程               model 動態決策

維度 B：Responsibility / Roles
Single    ←────────────→  Multi
單一角色                    多個 specialized roles
```

**注意：上面兩條「維度」是本文歸納，不是 Stanford 原文。**

---

# 1. Stanford CS224G：最直接的證據

課程：

- **CS 224G: Building & Scaling LLM Applications**
- Winter 2026
- Lecture 7: **Agent Orchestration & Workflow Design**
- 講者：Rakshit Agrawal
- 日期：2026-01-27

官方課程頁：
https://web.stanford.edu/class/cs224g/

官方 schedule：
https://web.stanford.edu/class/cs224g/schedule.html

Lecture 7 PDF：
https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf

---

## 1.1 Workflow vs Agent：在定義「控制流程」

### PDF 第 5 頁 — What is an "Agent"?

Stanford 投影片引用 Anthropic 的 agent 定義，接著直接給出：

> **Key Distinction**
>
> Workflow: Predefined code paths (deterministic)  
> Agent: Dynamic, model-driven decision-making

也就是，這一頁在比較的核心是：

```text
流程預先決定
    ↓
Workflow

vs.

模型在 runtime 決定下一步
    ↓
Agent
```

這裡沒有在定義「有幾隻 Agent」。

### 可用於 workshop 的一句話

> **Workflow vs Agent 問的是：誰決定下一步？**

這句是教學歸納，不是投影片逐字原句。

---

# 2. Single-Agent vs Multi-Agent：在定義「角色與責任分配」

## 2.1 PDF 第 10 頁 — Single-Agent Architecture

Stanford 對 Single-Agent 的描述：

- A single autonomous entity making centralized decisions
- One LLM
- One set of tools
- One context window
- Context window fills up fast
- Struggles with complex, multi-domain tasks

這裡的問題已經不是「流程是否 deterministic」，而是：

- 決策集中在一個 entity
- tools 集中
- context 共用
- 複雜、多 domain 工作都塞進同一個 agent

---

## 2.2 PDF 第 12 頁 — Multi-Agent Systems (MAS)

Stanford 原文：

> **Definition:** Specialized agents collaborating to solve problems.

並寫：

> **Key Insight:** Partition the problem space.

投影片列出：

- Each agent has a focused role
  - Coder
  - Reviewer
  - Researcher
- Each agent has its own system prompt and tools

這是非常直接的「角色分工」概念。

### 可用於 workshop 的一句話

> **Single vs Multi-Agent 問的是：工作要不要拆成不同責任角色？**

這句同樣是教學歸納。

---

# 3. PDF 第 13 頁：Stanford 直接比較 Single / Multi

投影片：**Single vs. Multi-Agent: Trade-offs**

| Feature | Single Agent | Multi-Agent System |
|---|---|---|
| Context | Single, shared window | Partitioned by role |
| Prompting | One "monolithic" prompt | Modular, specialized instructions |
| Control | Heuristic & fluid | Strict graph-based workflows |
| Performance | Lower latency | Higher latency (inter-agent calls) |
| Maintenance | Easy to debug | Complex orchestration |

底下的 guidance：

> **Start Single. Upgrade to MAS when you need distinct "personas".**

這頁對 Agent 101 特別有用，因為它直接支持你原本在談的幾個問題：

### 一隻 Agent 的問題

- shared context
- monolithic prompt
- 多 domain 任務集中
- context 容易塞滿

### Multi-Agent 的價值

- context partitioned by role
- specialized instructions
- distinct personas / responsibilities

---

# 4. 最有力的證據：CS224G 自己在 Key Takeaways 分成兩件事

## PDF 第 61 頁 — Key Takeaways

Stanford 把以下兩條**分開列**：

> **Agents vs. Workflows: When to use each**

以及：

> **Architectures: Single-Agent (ReAct) vs. Multi-Agent**

這是本文「兩個不同問題」判斷最直接的結構性證據。

課程沒有把它總結成：

```text
Workflow → Agent → Multi-Agent
```

而是分成：

```text
問題 1：
Agents vs Workflows

問題 2：
Single-Agent vs Multi-Agent architectures
```

因此，在教學上把兩者混成同一條成熟度階梯，會失去這個 distinction。

---

# 5. Orchestrator-Workers：為什麼「很多 LLM」不等於 taxonomy 上的 Multi-Agent

## PDF 第 24 頁 — Orchestrator-Workers

Stanford 定義：

> A central "Orchestrator" LLM dynamically breaks down a plan and delegates to "Workers".

並特別比較 Parallelization：

> Subtasks are NOT pre-defined; the Orchestrator determines them at runtime.

這裡至少包含：

- Orchestrator LLM
- 多個 Worker / worker calls
- runtime delegation

但 CS224G 把它放在：

> **Agentic Patterns (Workflows)**

章節內。

這說明「用了多個 LLM call / worker」本身，並不足以決定你在講：

- Workflow vs Agent
- 還是 Single vs Multi-Agent architecture

這兩種分類是在回答不同問題。

---

# 6. Evaluator-Optimizer：做的人和驗的人可以拆開，但仍可是一個 Workflow pattern

## PDF 第 25 頁 — Evaluator-Optimizer

Stanford：

> Generate → Evaluate → Feedback Loop

流程：

1. Generator produces candidate solution
2. Evaluator scores or tests the solution
3. Failure feedback goes back to Generator

Coding Agent use case：

- Generator: writes code
- Evaluator: runs unit tests
- Feedback → Generator fixes it

這個 pattern 特別適合對應 Agent 101 的軟工流程：

```text
Developer
   ↓
Review / QA
   ↓ fail
Developer 修正
```

### 教學上的重點

「做」與「驗」可以拆成兩個責任，甚至用不同 LLM call / prompt / model。

但這仍然可以被描述成一個 **workflow pattern**。

所以：

> **角色分工 ≠ 一定要讓整個系統變成 fully autonomous multi-agent system。**

---

# 7. Anthropic 原始 taxonomy：CS224G 的定義來源

Stanford Lecture 7 明確採用 Anthropic 的 workflow / agent distinction。

Anthropic：
https://www.anthropic.com/engineering/building-effective-agents

Anthropic 原始定義：

> Workflows are systems where LLMs and tools are orchestrated through predefined code paths.

> Agents are systems where LLMs dynamically direct their own processes and tool usage.

Anthropic 接著把這些放在 workflow patterns：

- Prompt chaining
- Routing
- Parallelization
- Orchestrator-workers
- Evaluator-optimizer

然後才另外介紹 autonomous agents。

這提供了另一個關鍵訊息：

> **「有多個 LLM / workers / evaluator」不代表系統就必須被分類為 autonomous agent。**

---

# 8. Stanford CS329Z：課綱也把兩個問題拆開

課程：

- **CS 329Z: Engineering AI Agents**
- Stanford / Fall 2026

官方網站：
https://cs329z.stanford.edu/

> 注意：以下依 2026-10-04 的官方 syllabus。  
> 10/12 與 10/19 的課尚未實際舉行，因此目前只能引用 syllabus，不能假裝引用尚未公開的 lecture 內容。

---

## 8.1 2026-10-12 — Agent Design Patterns & Scaffolds

官方 syllabus：

> **The workflows-vs-agents taxonomy**, five composable workflow patterns, agent patterns (ReAct, plan-and-execute, reflection), and scaffolds as design decisions.

這堂課把：

```text
workflows vs agents
```

明確稱為一個 **taxonomy**。

---

## 8.2 2026-10-19 — Multi-Agent Systems

另外一堂才教：

> **Single vs. multi-agent architectures**, orchestration patterns, handoffs and state transfer, delegation and collaboration patterns, and the challenges of coordination and error propagation.

也就是 syllabus 本身分成：

### 10/12

```text
workflows vs agents taxonomy
```

### 10/19

```text
single vs multi-agent architectures
```

這與 CS224G 的課程結構一致：

> 它們相關，但不是同一個分類問題。

---

# 9. 建議 Agent 101 怎麼畫

## 不建議

```text
Chat
  ↓
Workflow
  ↓
Single Agent
  ↓
Multi-Agent
```

這會讓人以為 Workflow、Single Agent、Multi-Agent 是同一條 autonomy / maturity continuum。

---

## 建議：先教兩個問題

### 問題 A：誰決定下一步？

```text
Workflow                           Agent
───────────────────────────────────────>
Predefined path             Model-driven decisions
```

### 問題 B：誰負責工作？

```text
Single role                    Multiple specialized roles
───────────────────────────────────────>
one shared context             context / prompt by role
```

然後再說實際系統可以混搭。

---

# 10. 可用的 2×2 教學抽象

> **重要：這張 2×2 不是 Stanford 原圖，是根據 Stanford + Anthropic taxonomy 做的教學整理。**

| | Single responsibility | Multiple specialized responsibilities |
|---|---|---|
| **Predefined / workflow-heavy** | Single-agent / single-role workflow | Orchestrated multi-role workflow |
| **Dynamic / agent-heavy** | Autonomous single agent | Autonomous multi-agent system |

例子：

### 左上
固定 Prompt Chaining：

```text
Draft → Translate → Check
```

### 右上
固定軟工流程，多角色：

```text
DEV → Reviewer → QA → Product Check
```

流程固定，但每個角色可以有：

- 不同 prompt
- 不同 model
- 不同 tools
- 不同 context

### 左下
單一 autonomous coding agent：

```text
Goal
 ↓
Agent 自己 decide next action
 ↓
tool
 ↓
observe
 ↓
continue
```

### 右下
多 Agent 自主協作：

```text
Orchestrator / Planner
      ↓
DEV ─ Reviewer ─ Researcher
      ↓
根據 runtime 狀況持續協調
```

---

# 11. 對你原本 Agent 101 敘事的實際意義

如果上一段已經教：

```text
Goal
→ Refinement
→ Ready
→ Dev
→ PR Review
→ QA
→ Product / Goal Check
→ Done
```

下一段不需要直接跳：

```text
Single Agent → Multi-Agent
```

更自然的順序是：

```text
人本來透過 chat 叫一個 AI 做全部事情
            ↓
一個 context / 一個 prompt / 一個角色承擔所有責任
            ↓
開始出現 shared-context、monolithic-role、自我驗證等問題
            ↓
先把「流程」固定下來
            ↓
再把不同責任拆給 specialized roles
            ↓
需要時才增加 autonomy
```

也就是：

> **先談 workflow / process，再談 role separation，最後談 autonomy。**

這樣可以避免把「Multi-Agent」錯教成「Agent 的下一級」。

---

# 12. 一個需要保留的 caveat

雖然本文用「兩個維度」來教，但不要說 Stanford 明確證明兩軸完全獨立或 mathematically orthogonal。

理由是 CS224G 的 Single vs Multi-Agent trade-off 表裡，`Control` 一列本身就寫：

- Single Agent：Heuristic & fluid
- Multi-Agent：Strict graph-based workflows

代表實務上：

- 多角色系統往往需要更強 orchestration
- architecture choice 與 control choice 會互相影響

因此最精確的用語是：

> **它們是兩個「概念上不同、實務上相關」的設計問題。**

而不是：

> 它們是完全獨立的兩個正交軸。

---

# 13. 最適合直接放投影片的版本

## Slide title

**不要把 Workflow、Agent、Multi-Agent 當成同一條線**

## Body

```text
問題 1｜誰決定下一步？
Workflow ───────── Agent
固定流程             Model 動態決策

問題 2｜誰負責工作？
Single ─────────── Multi
單一責任             多個 specialized roles
```

Bottom note：

> Stanford CS224G 分別教「Agents vs. Workflows」與「Single-Agent vs. Multi-Agent architectures」；CS329Z syllabus 也分成 workflows-vs-agents taxonomy 與 single-vs-multi-agent architectures。

---

# References

## Stanford CS224G

Course:
https://web.stanford.edu/class/cs224g/

Schedule:
https://web.stanford.edu/class/cs224g/schedule.html

Lecture 7 — Agent Orchestration & Workflow Design:
https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf

Relevant PDF pages:

- p.5 — What is an "Agent"? / Workflow vs Agent
- p.10 — Single-Agent Architecture
- p.12 — Multi-Agent Systems
- p.13 — Single vs. Multi-Agent: Trade-offs
- p.20 — Pattern Overview
- p.24 — Orchestrator-Workers
- p.25 — Evaluator-Optimizer
- p.61 — Key Takeaways

## Stanford CS329Z

Official course page and syllabus:
https://cs329z.stanford.edu/

Relevant scheduled lectures:

- 2026-10-12 — Agent Design Patterns & Scaffolds
  - workflows-vs-agents taxonomy
- 2026-10-19 — Multi-Agent Systems
  - single vs. multi-agent architectures

## Anthropic

Building Effective Agents:
https://www.anthropic.com/engineering/building-effective-agents
