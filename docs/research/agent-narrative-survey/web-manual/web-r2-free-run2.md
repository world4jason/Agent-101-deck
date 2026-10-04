# 第 2 輪：補查與驗證後完整版本
## 主題：為什麼光用 chat 跟 AI 協作不夠，以及如何走向 workflow、多 agent、從看板拉工作

驗證日期：2026-10-04

> 本版已重新驗證來源網址、文章章節與可查到的影片時間點。  
> 無法可靠確認的影片時間點一律標示「查不到」。  
> 文中會區分「來源明示」與「我的歸納」，避免把教學用比喻誤當成來源原話。

---

# 0. 結論先行

這輪查完後，我認為最適合 Agent 101、而且最不容易把概念講混的敘事不是：

> single agent → multi-agent → workflow → work-driven

因為這幾個詞其實不在同一個分類軸上。

比較乾淨的講法是：

**大家先從 chat / interactive session 開始**  
→ 任務一長、一多，就出現角色混雜、context 壓力、驗收不獨立、資源配置不合理、compact / session handoff 等問題  
→ 於是把「對話」改造成「有狀態、有步驟、有驗收點的工作流程」  
→ 不同步驟可以用不同 prompt / model / effort / tool，必要時再拆成不同 agent  
→ 當工作量再上升，連「開很多 agent session」都會變成人的管理負擔  
→ 最後把 **ticket / issue tracker / task queue 變成 control plane**，讓 agent 從工作系統取得工作，而不是人一直在 chat 視窗裡派工。

最值得拿來當這段主線的是 OpenAI 2026 年的 **Symphony**。它直接描述了這個轉變：

1. coding agents 雖然更強，但 web/CLI 本質上仍是 interactive tools；
2. 一個人同時管理 3–5 個 session 後，context switching 開始痛苦；
3. agent 很快，但瓶頸變成 **human attention**；
4. 他們因此不再以 session 為中心，而改以 issue / task / milestone 為中心；
5. issue tracker 最後變成 coding agents 的 **control plane**。

來源：
https://openai.com/index/open-source-codex-orchestration-symphony/

文章章節：
- `The ceiling of interactive coding agents`
- `A shift in perspective`
- `Turning our issue tracker into an agent orchestrator`

官方影片與可驗證時間點：**查不到**。

這條線和你前一段的 Kanban 幾乎可以直接接：

**Chat 是人盯著 AI 做事；Workflow 是把做事方法固定下來；Issue/Board-driven orchestration 是讓工作本身驅動 Agent。**

上面最後一句是**我的歸納，不是 OpenAI 原話**。

---

# 1. 已驗證來源清單

## S1. OpenAI — An open-source spec for Codex orchestration: Symphony

網址：
https://openai.com/index/open-source-codex-orchestration-symphony/

發布：2026-04-27

已驗證文章章節：
- `The ceiling of interactive coding agents`
- `A shift in perspective`
- `Turning our issue tracker into an agent orchestrator`

來源明示的核心：
- 多個 interactive coding sessions 會把人的 context switching 變成瓶頸。
- 他們觀察到多數人同時管理約 3–5 個 sessions 後就開始吃力。
- 軟體工作真正的單位比較接近 issues / tasks / tickets / milestones，而不是 session。
- Symphony 讓 issue tracker 成為控制 agent 工作的 control plane。
- 每個 active issue 可以對應獨立 agent workspace，持續執行直到進入下一個 handoff state。

可安全引用的短原句：
- “system bottleneck: human attention”
- “pull work from our task tracker”

官方影片時間點：**查不到**。

---

## S2. Anthropic — Building effective agents

網址：
https://www.anthropic.com/engineering/building-effective-agents

發布：2024-12-19

已驗證文章章節：
- `What are agents?`
- `When (and when not) to use agents`
- `Building blocks, workflows, and agents`
- `Workflow: Prompt chaining`
- `Workflow: Routing`
- `Workflow: Parallelization`
- `Workflow: Orchestrator-workers`
- `Workflow: Evaluator-optimizer`
- `Agents`

來源明示的核心：
- Anthropic 把 **workflow** 和 **agent** 分開定義。
- workflow：LLM / tools 走預先定義的 code path。
- agent：由 LLM 動態決定自己的 process 與 tool use。
- routing 可以把不同問題送去不同 downstream process、prompt、tool，甚至不同大小模型。
- parallelization 可以讓不同 call 分別處理不同考量。
- evaluator-optimizer 明確把「生成」和「評估」拆成兩個 LLM calls。
- orchestrator-workers 讓 central LLM 動態拆解工作並委派 worker。
- Anthropic 一再強調：先用最簡單可行方案，只有真的有收益才增加複雜度。

### 官方影片：Anthropic — Building more effective AI agents

網址：
https://www.youtube.com/watch?v=uhJJgc-0iTQ

已驗證 YouTube 章節：
- 06:40 — `The evolution of workflows and agents`
- 08:30 — `The value of simple agent architectures`
- 09:30 — `Building multi-agent systems: orchestrators, subagents, and tool calling`
- 12:25 — `Multi-agent use design patterns: parallelization, MapReduce, and test-time compute`
- 14:15 — `Common agent failure modes`
- 15:00 — `Best practices ... context engineering, MCPs, and tools`

這支影片很適合拿來證明：業界不是把「workflow / agent / multi-agent」當同一層級名詞。

---

## S3. Anthropic — Effective context engineering for AI agents

網址：
https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

發布：2025-09-29

已驗證文章章節：
- `Context engineering vs. prompt engineering`
- `Why context engineering is important to building capable agents`
- `Context retrieval and agentic search`
- `Context engineering for long-horizon tasks`
  - `Compaction`
  - `Structured note-taking`
  - `Sub-agent architectures`

來源明示的核心：
- context 是有限資源，LLM 有類似有限的 **attention budget**。
- context 越長，會出現 context rot / focus degradation。
- 長任務不只是 context window 容量問題，也有 **context pollution / information relevance** 問題。
- compaction 本質上是把快滿的 conversation 摘要後，重新開一個 context window。
- 壓縮太 aggressive 可能丟掉「當下看似不重要、之後才知道很關鍵」的細節。
- structured notes / external memory 可以讓重要狀態跨 context 存活。
- specialized subagents 可以用乾淨 context 做 focused task，再只回傳濃縮結果，讓主 agent 不被大量細節污染。

官方影片與可驗證時間點：**查不到**。

---

## S4. Anthropic — Effective harnesses for long-running agents

網址：
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

發布：2025-11-26

已驗證文章章節：
- `The long-running agent problem`
- `Environment management`
- `Feature list`
- `Incremental progress`
- `Testing`
- `Getting up to speed`
- `Agent failure modes and solutions`

來源明示的核心：
- 長時間工作一定會跨多個 context windows / sessions。
- **每個新 session 一開始沒有前一個 session 的記憶**。
- Anthropic 用「工程師輪班，每個新工程師上班時完全不記得上一班做了什麼」來比喻。
- compaction 仍然不夠；它不一定能把下一個 agent 需要的資訊交代清楚。
- 解法是把狀態外部化：feature list、progress file、git history、可重跑的 init script。
- 每個新 session 先讀這些 artifacts，再挑最高優先、尚未完成的 feature 工作。
- incremental progress（一個 session 做有限工作）比 one-shot 整個 project 更可靠。

官方影片與可驗證時間點：**查不到**。

可安全引用的短原句：
- “each new session begins with no memory”
- “compaction isn’t sufficient”

---

## S5. Anthropic — How we built our multi-agent research system

網址：
https://www.anthropic.com/engineering/multi-agent-research-system

發布：2025-06-13

已驗證文章章節：
- `Benefits of a multi-agent system`
- `Architecture overview for Research`
- `Prompt engineering and evaluations for research agents`
- `Effective evaluation of agents`
- `Production reliability and engineering challenges`

來源明示的核心：
- open-ended research 很難預先 hardcode 固定步驟。
- lead agent 負責策略與分工；subagents 各自在獨立 context window 裡探索。
- subagents 只回傳濃縮結果，形成 separation of concerns。
- 不同 agent 可以有不同 tools、prompts、exploration trajectories。
- 他們實際使用 lead Opus + subagent Sonnet，代表 multi-agent 架構也可以把不同模型放在不同角色。
- 他們明確設計 **effort scaling rules**：簡單查詢少 agent / 少 tool calls，複雜研究才增加 agent / calls。
- 但 multi-agent 成本很高：文中報告 single agents 約為 chat token 用量的 4×，multi-agent 約 15×。
- 不是所有問題都適合 multi-agent，尤其高度共享 context、相依性很多、難以平行化的工作。

官方影片可參考 S2 Anthropic 官方影片：
https://www.youtube.com/watch?v=uhJJgc-0iTQ

最相關時間：
- 09:30 — multi-agent systems
- 12:25 — multi-agent design patterns
- 14:15 — failure modes
- 15:00 — context engineering

---

## S6. Cognition — Don’t Build Multi-Agents

網址：
https://cognition.com/blog/dont-build-multi-agents

發布：2025-06-12

已驗證文章章節：
- `Principles of Context Engineering`
- `A Theory of Building Long-running Agents`
- `Applying the Principles`
- `Claude Code Subagents`
- `Multi-Agents`

來源明示的核心：
- 兩個核心原則：
  1. `Share context`
  2. `Actions carry implicit decisions`
- 把一個任務切給多個平行 agent，看似自然，但不同 agent 可能在各自看不到的地方做出互相衝突的隱含決策。
- Flappy Bird 例子：一個做背景、一個做鳥，兩邊各自完成卻風格與假設不一致，最後整合 agent 才承擔衝突。
- Cognition 當時建議很多情況先用 single-threaded linear agent，必要時再做 context compression。
- Claude Code 類型的 subagent 在其例子裡偏向 read / investigate，而不是多個 agent 同時寫同一份 shared state。

官方影片時間點：**查不到**。

---

## S7. Cognition — Multi-Agents: What’s Actually Working

網址：
https://cognition.com/blog/multi-agents-working

發布：2026-04-22

這是 S6 十個月後的更新，重要，因為它修正了「不要 multi-agent」可能造成的過度簡化。

已驗證文章章節：
- `A Refresher on Context Engineering`
- generator / verifier 相關段落
- `Large, expensive models are back — introducing “Smart Friend”`
- `What We Know Today`

來源明示的核心：
- 他們現在接受一小類實用 multi-agent pattern，但仍反對多個 writer 無限制平行修改 shared state。
- 有效形式之一是 **clean-context reviewer / generator-verifier loop**。
- 另一個有效方向是 `smart friend`：主模型遇到合適問題時，呼叫另一個更強或不同擅長領域的模型。
- 後來更接近 **capability router**：不是單純「弱模型問強模型」，而是依 sub-task 選最適合的模型。
- 他們的現況結論仍是：multi-agent 最有效時，額外 agent 多半「提供 intelligence」，而寫入 shared state 保持單線。

官方影片時間點：**查不到**。

---

## S8. OpenAI — A practical guide to building agents

網址：
https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

已驗證文章章節：
- agent 定義與 workflow
- `Multi-agent systems`
- `Manager (agents as tools)`
- `Decentralized (agents handing off to agents)`

來源明示的核心：
- workflow 是為完成 user goal 而執行的一串 steps。
- 單純 chatbot / one-shot LLM、沒有讓 LLM 控制 workflow execution，不等於 agent。
- multi-agent 常見兩類：
  - Manager / agents as tools
  - Decentralized / handoffs
- OpenAI 也建議不要為了 multi-agent 而 multi-agent；tool clarity、prompt structure 能解決時先保持簡單。

課程 / 官方影片時間點：**查不到**。

---

## S9. DeepLearning.AI — Multi AI Agent Systems with crewAI

網址：
https://www.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai

講師：João Moura  
課程長度：約 2h41m

已驗證課程章節：
- `Overview` — 11m
- `AI Agents` — 8m
- `Create agents to research and write an article` — 15m
- `Key elements of AI agents` — 11m
- `Multi agent customer support automation` — 18m
- `Mental framework for agent creation` — 3m
- `Key elements of well defined tasks` — 4m
- `Multi agent collaboration` — 5m
- `Multi agent collaboration for financial analysis` — 12m

官方課程頁明示：
- 用 team of agents 超越只 prompt 單一 LLM 的方式。
- 每個 agent 可以有 specific role / goal / backstory。
- 把 complex multi-step task 分給不同 agent。
- 核心元素包含 Role-playing、Memory、Tools、Focus、Guardrails、Cooperation。

注意：這門課比較像「如何組 multi-agent team」，**不是**最好的「為什麼 chat 不夠」來源；適合拿來補「一人分飾多角 → 專業分工」這一點。

---

# 2. 最清楚的五種講法

## 講法 A：OpenAI Symphony —「別再管理聊天視窗，管理工作」

### 敘事順序

1. Agent 已經很能做事。
2. 但 coding agent 仍然多半從 interactive web / CLI session 使用。
3. 人開始同時開很多 session，必須派工、追進度、叫醒卡住的 agent、記得每個視窗在做什麼。
4. Agent 的速度增加後，人的 attention / context switching 反而成為瓶頸。
5. 問題不應該被建模成「我怎麼管理更多 chat sessions」。
6. 真正穩定的工作單位本來就是 issue / task / ticket / milestone。
7. 所以改成讓 agent 從 task tracker 取工作，issue tracker 成為 control plane。

### 比喻

來源把大量 agents 比成一群能力很強的 junior engineers，但人類工程師卻被迫一直 micromanage 他們。

### 來源明示

這一整條「interactive sessions → human attention bottleneck → task tracker」是來源明示，不是我拼出來的。

### 我的歸納

最適合非工程師的一句：

> **Chat 是在盯人做事；Board 是在管理工作。**

這句是我的教學化改寫。

### 為什麼適合你的 deck

因為你的前一段已經教：

`Goal → Ticket → Refinement → Ready → Dev → PR Review → QA → Product Check → Done`

接下來只要問：

> 「既然人類團隊不靠一個超長聊天室管理全部工作，為什麼 AI 要？」

就可以自然進到 Agent。

來源：
https://openai.com/index/open-source-codex-orchestration-symphony/

文章位置：
`The ceiling of interactive coding agents` → `A shift in perspective` → `Turning our issue tracker into an agent orchestrator`

影片時間點：查不到。

---

## 講法 B：Anthropic —「不要先問幾隻 Agent；先問工作要怎麼被控制」

### 敘事順序

Anthropic 的 `Building effective agents` 不是從 single vs multi 開始，而是：

1. 先用最簡單 LLM call；
2. 需要固定步驟時，用 workflow；
3. workflow 裡可以：
   - prompt chaining
   - routing
   - parallelization
   - orchestrator-workers
   - evaluator-optimizer
4. 只有步驟真的不能預先定義，需要 model 自己動態決策時，才增加 agent autonomy。

### 關鍵價值

這個分類能直接解開你現在 deck 的混亂：

- **workflow**：控制流程怎麼走；
- **agent**：誰決定下一步；
- **multi-agent**：有幾個相對獨立的 agent；
- 這三個不是互斥選項。

一個 workflow 可以只有一個 agent，也可以有多個 agent。  
一個 multi-agent 系統也可以被一個固定 workflow 包起來。

### 比喻

`Evaluator-optimizer` 的官方比喻接近「作家寫稿 → 編輯給 feedback → 再改稿」。

這很適合轉成你的「球員兼裁判」問題。

### 來源明示

Anthropic 明確把 generator call 與 evaluator call 分開，也明確舉例說 guardrail 可以由另一個 model instance 負責，而不是同一 call 同時做主工作與檢查。

### 我的歸納

> **先拆 responsibility，再決定需不需要拆 Agent。**

這句是我的歸納。

來源：
https://www.anthropic.com/engineering/building-effective-agents

官方影片：
https://www.youtube.com/watch?v=uhJJgc-0iTQ

時間點：
- 06:40 workflow / agent 演進
- 09:30 multi-agent
- 12:25 multi-agent patterns
- 14:15 failure modes
- 15:00 context engineering

---

## 講法 C：Anthropic —「Context 是桌面，不是倉庫」

### 敘事順序

1. LLM 的 context 不是越多越好。
2. 它有有限 attention budget。
3. 對話越長，irrelevant / stale / noisy 資訊越多，會造成 context pollution / context rot。
4. 因此長任務不能只是一直把聊天紀錄塞回去。
5. 有三類解法：
   - compaction
   - external notes / memory
   - subagents with clean contexts

### 比喻

來源本身使用「attention budget」這個概念。

適合非工程師的教學化比喻：

> **Context 像工作桌，不像倉庫。把所有資料都堆桌上，不會讓你更聰明，只會更難找到現在要看的東西。**

後半句是我的比喻，不是來源原話。

### 對 chat 的直接攻擊點

這是 owner 六點裡最直接支援：
- context 污染
- compact 後遺失細節
- subagent 乾淨 context
- external memory / notes

來源：
https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

文章位置：
`Why context engineering is important...`
`Context engineering for long-horizon tasks`
`Compaction`
`Structured note-taking`
`Sub-agent architectures`

影片時間點：查不到。

---

## 講法 D：Anthropic Long-running Harness —「換班的人不記得上一班」

### 敘事順序

1. 真正長任務一定會跨 context window。
2. 新 session 不是上一個 session 的腦袋延續。
3. compact 也不保證交接完整。
4. 所以「進度」不能只存在 conversation history。
5. 把 project state 寫進外部 artifacts：
   - feature list
   - progress file
   - git history
   - tests
6. 每個 fresh session 重新讀 external state，再挑下一個未完成工作。

### 官方比喻

軟體團隊輪班；每個新工程師一上班完全不記得上一班做過什麼。

這是這批來源裡，講「session handoff」最清楚的一個。

### 我的歸納

> **Conversation history 不是 project state。**

以及：

> **真正能交接的不是記憶，而是 artifact。**

兩句都是我的濃縮。

### 很適合接 Kanban

Anthropic 的 feature list + highest-priority unfinished feature，雖然不是 Kanban board，精神上已經非常接近：

**外部工作清單是 source of truth，fresh agent 讀狀態後再取下一個工作。**

來源：
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

文章位置：
`The long-running agent problem`
`Incremental progress`
`Getting up to speed`

影片時間點：查不到。

---

## 講法 E：Cognition —「多 Agent 不是解藥；沒有 Context 還會更糟」

### 敘事順序

1. 很自然會想到：一隻 agent 太多角色，那就多開幾隻。
2. 但 agent 一拆開，context 也拆開。
3. 每個 agent 在行動時都會做出沒寫在 spec 裡的 implicit decisions。
4. 多個 writer 平行時，這些決策很容易互撞。
5. 因此 2025 Cognition 的建議是先維持 single-threaded context。
6. 到 2026，他們修正成：multi-agent 可以，但目前比較可靠的是
   - clean-context reviewer
   - read / investigate subagents
   - smart friend / capability router
   - manager + children + synthesis
   - shared state 的 writes 保持單線

### 比喻

官方 Flappy Bird 例子非常適合非工程師：
- 一個 agent 做背景；
- 一個 agent 做角色；
- 兩個都「完成了」；
- 但視覺與行為假設根本不一致。

### 對教材很重要的地方

這能避免把下一張投影片講成：

> 「single agent 有問題，所以答案就是 multi-agent。」

更準確應該是：

> 「chat / long session 有結構問題，所以先把 state、workflow、責任邊界做出來；其中某些邊界適合用不同 agent。」

來源：
https://cognition.com/blog/dont-build-multi-agents

2026 更新：
https://cognition.com/blog/multi-agents-working

影片時間點：查不到。

---

# 3. Owner 六點逐項驗證

標記：
- ✅ = 來源直接處理
- △ = 有高度相關內容，但不是以 owner 這句話描述
- — = 沒有找到

| 來源 | 一人分飾多角色 | context 污染 | 球員兼裁判 | 不同 model / effort | compact 遺忘 | 換 session 交接 |
|---|---:|---:|---:|---:|---:|---:|
| OpenAI Symphony | △ | △ | — | — | — | △ |
| Anthropic Building Effective Agents | △ | △ | ✅ | ✅ | — | — |
| Anthropic Context Engineering | ✅ | ✅ | — | △ | ✅ | ✅ |
| Anthropic Long-running Harness | △ | ✅ | △ | — | ✅ | ✅ |
| Anthropic Multi-agent Research | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cognition 2025 + 2026 | ✅ | ✅ | ✅ | ✅ | ✅ | △ |
| DeepLearning.AI crewAI | ✅ | △ | △ | ✅* | △ | △ |

`*` 不同 model 的直接描述，在 DeepLearning.AI 的進階 crewAI 課程更明確；本表主要仍以 S9 基礎課程的 role / task specialization 為主。

---

## 3.1 一人分飾多角色

### 找到什麼

**直接或高度相關：**
- DeepLearning.AI crewAI 明確教 specific role / goal / backstory、Focus、不同 agent 分工。
- Anthropic context engineering 說 specialized subagents 可各自負責 focused task。
- OpenAI practical guide 的 manager / specialist agents 也是同一思路。

來源：
https://www.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai

課程章節：
- `Mental framework for agent creation` — 3m
- `Key elements of well defined tasks` — 4m
- `Multi agent collaboration` — 5m

補充來源：
https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

文章章節：
`Multi-agent systems` → `Manager (agents as tools)` / `Decentralized`

### 來源明示 vs 我的歸納

來源沒有一句正式定律說「single agent 一人分飾多角一定不好」。

比較準確的說法是：

- 來源明示：複雜任務可透過角色、prompt、tools、context 的 specialization 做 separation of concerns。
- 我的歸納：當同一個 chat 同時要它當 PM、Developer、Reviewer、QA、PO，它很容易把每個角色的目標與上下文混成同一個 decision process。

所以投影片可寫「角色衝突 / responsibility 混在一起」，不要把它說成已被證明的 universal theorem。

---

## 3.2 Context 污染

### 這一點證據非常直接

Anthropic：

https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

文章章節：
- `Why context engineering is important to building capable agents`
- `Context engineering for long-horizon tasks`

來源明示：
- context 是 finite resource；
- token 增加會消耗 attention budget；
- long-horizon tasks 即使 context window 夠大，也仍會有 context pollution / relevance 問題；
- subagents 的 clean contexts 可以隔離詳細探索內容。

Anthropic multi-agent research：

https://www.anthropic.com/engineering/multi-agent-research-system

文章章節：
`Benefits of a multi-agent system`

來源明示：
- subagent 各自有 context window；
- distinct tools / prompts / trajectories 帶來 separation of concerns；
- 只把重要結果濃縮回 lead agent。

### 教材化比喻

> 一個 chat 用久了，就像桌面上同時攤著 PM 討論、debug log、舊需求、測試結果、臨時 brainstorm。資訊都「還在」，但現在最重要的東西越來越難被注意。

這是我的比喻。

---

## 3.3 球員兼裁判

### 有直接架構證據，但「球員兼裁判」是你的比喻

Anthropic：

https://www.anthropic.com/engineering/building-effective-agents

文章：
`Workflow: Evaluator-optimizer`

來源明示：
- 一個 LLM call 生成；
- 另一個 LLM call 評估並給 feedback；
- 再形成迴圈。

同頁 `Parallelization` 還舉例：
- 一個 model instance 處理主要求；
- 另一個 instance 做 guardrail screening；
- Anthropic 說這通常比同一 call 同時負責兩件事更好。

Cognition 2026：

https://cognition.com/blog/multi-agents-working

來源明示：
- clean-context reviewer / generator-verifier loop 是他們目前認為可工作的 multi-agent pattern 之一。

### 要注意不要過度宣稱

不能從這些來源推成：

> 「同一模型永遠不能 self-review。」

更準確：

> **當 verification 很重要時，把生成與驗證做成不同 call / context / role，能建立真正的 review boundary。**

「球員兼裁判」是很好的 workshop 說法，但應標成教學比喻。

---

## 3.4 沒辦法依不同問題選不同 model / effort，殺雞用牛刀

### 這一點來源也很直接

Anthropic：

https://www.anthropic.com/engineering/building-effective-agents

文章：
`Workflow: Routing`

來源明示的例子：
- easy / common query → 小而便宜的模型；
- hard / unusual query → 更強模型；
- 目的就是 performance / cost 最佳化。

Anthropic multi-agent research：

https://www.anthropic.com/engineering/multi-agent-research-system

文章：
`Prompt engineering and evaluations for research agents`

來源明示：
- 簡單 fact-finding：1 agent、較少 tool calls；
- comparison：更多 subagents / calls；
- complex research：再增加資源；
- 他們把這叫做讓 effort 跟 query complexity 對齊。

Cognition 2026：

https://cognition.com/blog/multi-agents-working

來源明示：
- `Smart Friend`
- 後來演變成按 sub-task 做 `capability router`；
- 不同模型可能各自更擅長 debugging、visual reasoning、tests 等。

### 重要修正

「single agent 天生不能切 model」這句太強。

技術上 single-agent harness 也可以動態 router 到不同模型。

真正的 chat 問題應該寫成：

> **在一般人工 chat 操作裡，使用者通常得自己決定這一輪要不要換 model / thinking effort；workflow 可以把 routing 規則系統化。**

這樣比較準確。

---

## 3.5 Compact 之後遺忘

### 直接證據

Anthropic Context Engineering：

https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

文章：
`Compaction`

來源明示：
- compaction 是摘要舊 context、重新開始新 context window。
- 如果壓得太 aggressive，可能遺失 subtle but critical context。

Anthropic Long-running Harness：

https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

文章：
`The long-running agent problem`

來源明示：
- compaction 不足以解決 long-running work；
- 它不總能把下一個 agent 所需指示交代清楚。

OpenAI 也把 compaction 定位成 long-running context 的管理手段，而不是「完整保留原 transcript」：

https://developers.openai.com/api/docs/guides/compaction

文章章節：
`Overview`
`Server-side compaction`
`Standalone compact endpoint`

### 教材說法

> **Compact 是壓縮，不是無損備份。**

這是我的歸納；非常適合投影片。

---

## 3.6 換 session 看不到之前內容，交接困難

### 最直接來源

Anthropic：

https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

文章：
`The long-running agent problem`

來源直接寫：
- fresh session 不記得上一個 session；
- 用工程師輪班但新班完全沒有上一班記憶來比喻。

後續解法：
- progress file
- feature list
- git history
- structured updates
- fresh session 一開始重新讀取 external state

### 我的歸納

這裡最值得講的不是「AI 記憶不好」，而是：

> **不要把專案真相放在某一個 chat session 裡。**

Project state 應放在可交接、可追蹤、可驗證的 external state：
ticket、board、repo、PR、test、artifact、progress log。

這一句也正好把內容帶回你前面已經教過的 ticket / Kanban。

---

# 4. 我們原本沒列，但很適合非工程師的問題

## 4.1 人才是 bottleneck：Human attention 不會跟 Agent 數量一起擴張

這是 OpenAI Symphony 最值得補進來的一點。

來源：
https://openai.com/index/open-source-codex-orchestration-symphony/

文章：
`The ceiling of interactive coding agents`

問題不是 AI 做太慢，而是：

- 你得記得每個 session 在做什麼；
- 你得逐一派工；
- 卡住時你得逐一處理；
- 完成後你還要逐一看。

### 非工程師比喻

> 你不是多了五個員工；你是多了五個一直私訊你的員工。

我的歸納。

這一點非常適合放在「chat 的問題」最後，因為它自然導向 board / pull-based work。

---

## 4.2 對話狀態不是工作狀態

來源：
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

文章：
`Getting up to speed`

以及：
https://openai.com/index/open-source-codex-orchestration-symphony/

文章：
`A shift in perspective`

### 我的歸納

Chat 告訴你「剛才聊了什麼」；  
Ticket / board 告訴團隊「現在工作處於什麼狀態」。

這兩種 state 不同。

對 workshop 小白可以用：

> **聊天室是會議紀錄；看板才是工作系統。**

---

## 4.3 One-shot / 一口氣做完整件大事，容易失控

Anthropic long-running harness 明確觀察到 agent 會嘗試 one-shot 整個 app，造成：
- context 用完；
- 留下半完成、未記錄狀態；
- 下個 session 得猜前面做了什麼。

來源：
https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents

文章：
`The long-running agent problem`
`Incremental progress`

### 教材化

這正好支撐：

> Goal 不直接丟給 Developer Agent；先拆成 ticket，再一張一張拉。

---

## 4.4 沒有 checkpoint / durable state，失敗時只能重來

Anthropic multi-agent research：

https://www.anthropic.com/engineering/multi-agent-research-system

文章：
`Production reliability and engineering challenges`

來源明示：
- agents 長時間保持 state，errors 會 compound；
- restart from beginning 很貴；
- 需要 resume、retry、checkpoint。

Microsoft Agent Framework 也把 workflow 能力明確列出：
- checkpoints and resuming
- observability
- human-in-the-loop

來源：
https://learn.microsoft.com/en-us/agent-framework/workflows/

文章：
`Interaction and durability`
`Operations`

### 非工程師比喻

> Chat 比較像「事情正在某人腦中進行」；workflow 比較像「每一站都有紀錄，可以從上一站恢復」。

我的比喻。

---

## 4.5 多 Agent 的問題不是「溝通不夠多」，而是決策可能互撞

Cognition：

https://cognition.com/blog/dont-build-multi-agents

文章：
`Principles of Context Engineering`

核心是：
- share context
- actions carry implicit decisions

這一點很適合防止 workshop 聽眾得到錯誤結論：

> 「多 Agent = 多開幾個 chat 讓它們互聊。」

反而應該說：

> **好的 multi-agent 要有 ownership、context boundary、handoff contract、shared state；不是把聊天室變多。**

後半是我的歸納。

---

## 4.6 Multi-agent 很貴，不是免費平行化

Anthropic：

https://www.anthropic.com/engineering/multi-agent-research-system

文章：
`Benefits of a multi-agent system`

來源明示：
- agent token usage 約 chat 的 4×；
- multi-agent 約 chat 的 15×；
- 只有工作價值足以支付增加成本時才划算。

這其實跟「殺雞用牛刀」是同一類資源配置問題，值得放在旁邊。

---

# 5. 這幾個概念到底怎麼分類？

這是目前 deck 最需要先理乾淨的地方。

## 5.1 不要把它們排成同一條光譜

`single agent / multi-agent / workflow / chat-driven / work-driven`

不是五種互斥模式。

比較正確是至少分成三個軸：

### 軸 A：人怎麼把工作交進系統？
**Interaction / Control Plane**

- Interactive chat / session
- Task / queue
- Issue tracker / board
- Event / trigger

OpenAI Symphony 最清楚地展示：
`interactive sessions → issue tracker as control plane`

---

### 軸 B：流程由誰決定？
**Execution Control**

- Predefined workflow：步驟主要由 code / graph 決定
- Agentic execution：LLM 動態決定下一步

Anthropic 明確把 workflow / agent 用這條界線區分。

來源：
https://www.anthropic.com/engineering/building-effective-agents

---

### 軸 C：有幾個 autonomous workers？
**Worker Topology**

- Single-agent
- Manager + subagents
- Peer handoffs
- Sequential / concurrent specialists

OpenAI：
- Manager / agents as tools
- Decentralized / handoffs

來源：
https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/

Microsoft：
- Sequential
- Concurrent
- Handoff
- Group Chat
- Magentic

來源：
https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/

---

# 6. 哪些詞是業界通用，哪些不是？

## 高度通用

### Agent / AI agent
非常通用。

### Single-agent / Multi-agent
非常通用。OpenAI、Anthropic、Microsoft、Google、LangChain、CrewAI 都用。

### Workflow / Agentic workflow
非常通用，但各家對邊界略有不同。

### Orchestration
非常通用。尤其講多 agent、workflow、routing、handoff 時。

### Routing
非常通用。

### Handoff
很常見。OpenAI、Microsoft、A2A / multi-agent 框架都能看到類似概念。

### Orchestrator / Manager + Workers / Subagents
非常常見的 pattern，但命名略不同。

### Sequential / Parallel / Concurrent
通用。

### Evaluator / Verifier / Judge
通用概念；不同來源名稱不同。

### Context engineering
到 2025–2026 已經非常常見，Anthropic、Cognition、LangChain 都直接使用。

---

## 常見，但比較像 pattern 名稱，不是唯一標準分類

### Prompt chaining
Anthropic 常用；概念廣泛存在。

### Orchestrator-workers
Anthropic 用詞；別家可能叫 manager / supervisor / coordinator。

### Evaluator-optimizer
Anthropic pattern 名稱；別家可能叫 generator-verifier、critic-reviser、judge loop。

### Agents as tools
OpenAI 常用名稱；概念很常見，但不是每家都這樣叫。

### Group chat
AutoGen / Microsoft 生態常見；不是整個業界唯一標準名稱。

---

## `chat-driven`

**在本輪檢索的一手 OpenAI / Anthropic / Google / Microsoft / LangChain 架構文件中，查不到它被當成主流標準分類名稱。**

網路上確實有人使用 `chat-driven` 描述產品或 workflow，但比較像描述性用語。

所以投影片可以使用，但最好標成你自己的分類，例如：

> **Interactive / chat-driven**

而不要說「業界把這種架構叫 chat-driven」。

更穩的業界描述：
- interactive agent
- conversational interface
- session-based interaction
- interactive coding agent

OpenAI Symphony 直接用的詞是 **interactive tools / coding sessions**。

---

## `work-driven`

**在本輪一手主流來源中，查不到它是固定架構術語。**

不建議直接把它當成跟 `multi-agent` 同級的正式名詞。

更有來源支撐的說法：

- task-driven
- issue-driven
- issue-tracker-driven
- task queue
- issue tracker as control plane
- task-oriented orchestration

其中最強的一手來源仍是 OpenAI Symphony：

https://openai.com/index/open-source-codex-orchestration-symphony/

它沒有主打 `work-driven` 這個字，但明確說：
- 從 supervision of sessions
- 移到 issues / tasks / tickets / milestones
- agents pull work from task tracker
- issue tracker becomes control plane

---

## `issue-driven`

這個詞目前有實際專案和文章在用，但還不能說是所有業界共同的正式 taxonomy。

例如：
- issuekit：`Issue-driven development for AI coding agents`
  https://github.com/hirokisakabe/issuekit
- OpenAI Symphony 的概念本質也是 issue-tracker-driven，但官方主文更偏向 `issue tracker as control plane`。

所以教材若想最穩：

> **Chat / session-centric → Task / issue-centric**

或：

> **Interactive chat → Workflow → Issue tracker as control plane**

比 `chat-driven → work-driven` 更貼近一手來源。

---

# 7. Google / Microsoft 對「工作」的語言，也支持 task 是獨立 state

Google A2A：

https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/

來源明示：
- agent 間的協作以 task completion 為導向；
- task 是有 lifecycle 的物件；
- long-running task 可以交換進度；
- task 的 output 是 artifact。

Google codelab 也直接把 Task 定義為：

> fundamental unit of work

來源：
https://codelabs.developers.google.com/intro-a2a-purchasing-concierge

章節：
`Agent2Agent (A2A) Protocol`
`The Communication Protocols`

Microsoft Agent Framework：

https://learn.microsoft.com/en-us/agent-framework/workflows/

來源明示：
- workflow 可以有 state；
- checkpoint / resume；
- human-in-the-loop；
- observability；
- multi-agent orchestration。

這些都支持一個很重要的教材結論：

> **當 AI 從「回答我」進到「替我持續完成工作」，工作本身需要有獨立於 chat 的 lifecycle/state。**

這句是我的歸納。

---

# 8. 特別回答第 2 輪要求 (c)：各來源如何從 chat 限制過渡到 workflow / multi-agent？

## OpenAI Symphony：最完整、最直接

過渡方式：

`interactive coding session`
→ sessions 變多
→ human context switching / attention 成為 bottleneck
→ 發現 session 不是真正 work unit
→ issues / tasks / tickets 才是
→ agents 從 tracker pull work
→ tracker becomes control plane

這是目前最適合當你 slide transition 的來源。

### 可改成投影片

**Slide 1**
> 我們現在怎麼用 AI？  
> 開一個 Chat → 丟工作 → 看結果 → 繼續追問。

**Slide 2**
> 工作一多，誰在管理誰？  
> 5 個 Agent = 5 個視窗 = 5 份 context 要人記住。

**Slide 3**
> 問題不在 Agent 不夠強。  
> 問題是工作還綁在 Chat Session。

**Slide 4**
> 把工作搬出聊天室。  
> Goal → Ticket → Workflow → Agent。

**Slide 5**
> 不再由人把工作塞進每個 Chat。  
> Agent 從 Ready queue 拉下一張 Ticket。

這五張是我的教材設計，不是 OpenAI 原文。

---

## Anthropic Building Effective Agents：從「單一 prompt」過渡到組合式 workflow

過渡方式：

simple LLM
→ augmented LLM
→ prompt chaining
→ routing
→ parallelization
→ orchestrator-workers
→ evaluator-optimizer
→ autonomous agent

核心不是「chat 壞了，所以 multi-agent」，而是：

> **任務開始需要不同控制模式，所以逐步增加結構。**

這條線適合拿來當「技術分類」頁。

---

## Anthropic Context Engineering：從「長聊天」過渡到 context architecture

過渡方式：

long interaction
→ attention budget 被消耗
→ context pollution / rot
→ compaction
→ structured notes
→ clean-context subagents

所以 multi-agent 在這裡不是「更多人格」，而是 **context isolation 技術**。

這個觀點非常值得放進 deck。

---

## Anthropic Long-running Harness：從 session memory 過渡到 external state

過渡方式：

fresh session 無記憶
→ compaction 仍不可靠
→ progress / feature state 寫到外部
→ 新 session read state
→ 選一個未完成 feature
→ incremental work
→ 再寫回 external state

它其實已經非常接近：
`Ready → Dev → Verify → Done`

只是來源用 feature list / git，而不是 Kanban UI。

---

## Cognition：從「拆多 Agent」退回「先保 context」

過渡方式：

complex task
→ 想平行拆 subagents
→ context 不完整 + implicit decisions 衝突
→ 不要無限制 parallel writers
→ single-thread 或 read-only subagents
→ 2026 再加入 clean-context reviewer / capability router

這是很好的反例，能提醒聽眾：

> **multi-agent 是手段，不是成熟度等級。**

---

# 9. 對你的六點，我會怎麼重新命名

Owner 原本六點都合理，但如果是 workshop slide，我會稍微抽象成四組，讓非工程師比較容易記：

## A. Responsibility
- 一人分飾多角色
- 球員兼裁判

一句話：
> **同一個腦袋同時做、審、驗，很難形成真正的責任邊界。**

---

## B. Context
- context 污染
- compact 之後遺忘
- 換 session 交接問題

一句話：
> **Chat history 既太多、又不保證永遠在。**

---

## C. Resource allocation
- 不同問題不能自動選不同 model / effort
- 簡單問題用昂貴模型，複雜問題又可能 effort 不夠

一句話：
> **每份工作不需要同一種人、同一種工具、同一種成本。**

---

## D. Coordination（建議新增）
- 人要追很多 sessions
- 沒有共同工作狀態
- 沒有 queue / priority / checkpoint / retry
- progress 藏在 chat 裡

一句話：
> **Chat 可以協作，但不是工作管理系統。**

這一組是 OpenAI Symphony 最強的補充。

---

# 10. 我建議最後在 deck 用的術語

避免：

`Chat-driven → Single Agent → Multi-Agent → Work-driven`

因為容易讓人誤以為是四個成熟度階段。

建議改成：

## 第一層：從哪裡管理工作？

**Chat / Session-centric**  
↓  
**Task / Issue-centric**

---

## 第二層：工作怎麼走？

**Ad-hoc conversation**  
↓  
**Explicit Workflow**

---

## 第三層：每一站誰來做？

- Human
- Single Agent
- Specialized Agent
- Deterministic Tool

---

因此整體可以是一句：

> **從「人在 Chat 裡指揮一隻 AI」，變成「工作在 Workflow 裡流動，每一站交給最適合的 Agent / Model / Tool」。**

這是我的總結，不是來源原話。

它能完整容納：
- single agent
- multi-agent
- routing
- model / effort selection
- reviewer / verifier
- context isolation
- session handoff
- Kanban
- Symphony 式 issue pull

而且不會把不同維度的術語混成一條線。

---

# 11. 最適合直接拿去講的三個比喻

以下皆為**我的教學化比喻**，不是來源原話；但各自有上面的來源支撐。

### 1. Chat 是會議室，Ticket 是工單

會議室很適合討論。  
但你不會期待公司靠一個永遠不關的會議室來管理所有專案。

對應來源：
OpenAI Symphony。

---

### 2. Context 是工作桌，不是倉庫

把所有歷史資料都放桌上，並不會讓人做得更好。  
真正要做的是：現在這一步，只拿需要的資料上桌。

對應來源：
Anthropic Context Engineering。

---

### 3. Session 像輪班

下一班如果沒有 ticket、交接紀錄、repo、test，只能猜上一班做了什麼。

對應來源：
Anthropic Long-running Harness。

---

# 12. 最終研究結論

如果目標是把「交給 Agent」和「為什麼一隻 Agent 不夠」重新整理，我不建議再用「single vs multi」當主敘事。

資料比較支持這條：

### ① 大家從 Chat 開始
因為最自然，直接問、直接改、直接追問。

### ② Chat 適合互動，但不適合承載長期工作系統
會出現：
- responsibility 混雜
- context pollution
- self-review boundary 不清
- model / effort 無系統化 routing
- compaction loss
- session handoff
- human attention / session management bottleneck

### ③ 第一個解法不是「加更多 Agent」
而是把工作拆成：
- explicit steps
- explicit state
- explicit acceptance / verification
- external artifacts

也就是 workflow。

### ④ 然後才決定每一步由誰執行
可能是：
- 同一隻 agent
- 不同 specialized agents
- verifier / reviewer
- deterministic code
- human gate

### ⑤ 再往前一步，把工作入口也從 Chat 搬出去
Issue / Ticket / Board 成為 source of truth / control plane。

Agent 不再等人逐一開 Chat 派工，而是：

`Ready ticket`
→ agent picks work
→ implementation
→ independent review / QA
→ product / goal check
→ done

這就是 OpenAI Symphony 最值得借用的思想。

---

# 13. 對 Agent 101 的一句最終建議

如果只留一條主線，我會用：

> **Chat 是介面，不是流程；Session 是工作空間，不是專案狀態；Agent 是執行者，不是工作系統。**

然後下一張接：

> **把 Goal 變成 Ticket，把 Ticket 放進 Workflow，再讓最適合的 Agent 從 Workflow 接手。**

兩句都是我的總結。

---

# 14. 來源驗證附錄

## 已確認可用
- OpenAI Symphony  
  https://openai.com/index/open-source-codex-orchestration-symphony/
- Anthropic Building effective agents  
  https://www.anthropic.com/engineering/building-effective-agents
- Anthropic official video — Building more effective AI agents  
  https://www.youtube.com/watch?v=uhJJgc-0iTQ
- Anthropic Effective context engineering for AI agents  
  https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Anthropic Effective harnesses for long-running agents  
  https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
- Anthropic How we built our multi-agent research system  
  https://www.anthropic.com/engineering/multi-agent-research-system
- Cognition Don’t Build Multi-Agents  
  https://cognition.com/blog/dont-build-multi-agents
- Cognition Multi-Agents: What’s Actually Working  
  https://cognition.com/blog/multi-agents-working
- OpenAI A practical guide to building agents  
  https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- DeepLearning.AI Multi AI Agent Systems with crewAI  
  https://www.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai
- Microsoft Agent Framework — Workflow orchestrations  
  https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/
- Microsoft Agent Framework — Workflow capabilities  
  https://learn.microsoft.com/en-us/agent-framework/workflows/
- Google A2A announcement  
  https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/
- Google A2A codelab  
  https://codelabs.developers.google.com/intro-a2a-purchasing-concierge
- OpenAI Compaction guide  
  https://developers.openai.com/api/docs/guides/compaction

## 本輪特別查核但不建議當主證據
- `chat-driven`：有零散產品 / 專案使用，但查不到它在主要一手廠商文件中成為統一 taxonomy。
- `work-driven`：同樣查不到是主流標準 agent architecture 名稱。
- `issue-driven`：已有社群專案與方法論使用，但目前較穩的官方表述是 OpenAI Symphony 的 `issue tracker as control plane` / agents `pull work from task tracker`。

## 影片時間點查核
已可靠取得章節時間的主要官方影片：
- Anthropic — Building more effective AI agents  
  https://www.youtube.com/watch?v=uhJJgc-0iTQ
  - 06:40 workflows and agents
  - 08:30 simple architectures
  - 09:30 multi-agent systems
  - 12:25 multi-agent patterns
  - 14:15 failure modes
  - 15:00 context engineering

其餘本文主來源若沒有可可靠驗證的官方影片章節，均已標成「查不到」，沒有自行猜測時間點。
