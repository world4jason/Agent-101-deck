# Agent 101：從 Chat 到 Workflow / Multi-Agent
## 第 2 輪補查與驗證：修正後完整版本

> 研究目標：找出「為什麼光用 chat 跟 AI 協作不夠，以及如何走向 workflow、多 agent、從外部工作狀態／看板拉工作」最清楚、可驗證、適合非工程師的說法。
>
> 驗證規則：以官方原始資料優先；每個重點附網址與章節定位。選中的核心來源都是文章、文件或 Codelab，因此**沒有影片時間碼可填**；時間點一律標示「不適用」，不臆造。凡來源沒有直接支持的說法，明確標成「我的歸納」或「查不到」。

---

# 0. 先講結論

研究後，我不建議把課程主軸講成：

> Single agent 不夠 → 所以要 Multi-agent。

更穩、更符合業界材料的敘事是：

> **大家最先學會的是 Chat，因為它非常適合一次性的討論與產出。**  
> 當工作變成長時間、重複、多步驟、多角色，而且需要交接、驗收、追蹤狀態時，問題就不再只是「模型夠不夠聰明」，而是**工作狀態、角色責任、context、控制流程與資源配置沒有被外部化**。  
> 這時先把 Chat 變成 **Workflow**；只有在需要角色隔離、context 隔離、平行工作或不同專長時，再把某些 workflow step 交給不同 Agent，形成 **Multi-agent orchestration**。

這條線與 OpenAI、Anthropic、Google、LangChain、Microsoft 的官方材料最一致。

最值得直接拿進 Agent 101 的一句話，我會寫成：

> **Chat 是互動介面；Agent 是工作者；Workflow 是流程；Ticket / Kanban 是工作狀態。Multi-agent 是在需要時，把不同工作交給不同工作者。**

這句是**我的歸納**，不是任何來源原話。

---

# 1. 第 1 輪結果經第 2 輪驗證後：最清楚的五種講法

## 1.1 OpenAI：從「一次性 Chat」直接過渡到「可重複的工作流程」

**來源**：OpenAI Academy — *Workspace agents*  
URL：https://openai.com/academy/workspace-agents/  
定位：頁首導言、`What is an agent?`、`Agent workflow examples`  
時間點：不適用（文章）

### 敘事順序

1. 大多數人已經會用 ChatGPT 做一次性的 drafting、summarizing、brainstorming、問答。
2. 下一階段不是「再會 prompt 一點」，而是把 AI 放進日常、**可重複的 workflow**。
3. 可重複工作需要 shared systems、standard handoffs、consistent outputs，以及時間、正確性、流程等現實限制。
4. Agent 被拆成三個核心：**Trigger → Process / Skills → Tools / Systems**。
5. 若是 open-ended brainstorming / one-off writing，regular chat 反而仍然比較適合。
6. 若是 repeatable、structured、time/event-driven、tool-based，就適合 agent/workflow。
7. 官方舉的工具甚至直接包含 `ticketing system`、shared document；workflow pattern 也有 triage and routing、planning and coordination。

### 來源原意（非逐字翻譯）

OpenAI 並沒有說「Chat 很差」，而是畫出明確的**使用邊界**：Chat 適合一次性的探索；當工作需要重複執行、依賴共享系統、標準交接與固定輸出時，就該進到 agent workflow。

### 它怎麼從 Chat 過渡到 Workflow？

這是目前找到**最貼近 Owner 想要敘事順序**的來源，因為它第一段就真的先從「大家已經用 Chat 做一次性工作」開始，下一句才轉成「repeatable workflows」。中間不是先講 single-agent / multi-agent，而是先講**工作型態改變**。

### 使用的比喻 / 例子

來源沒有特別用一個戲劇化比喻，而是用工作系統本身說明：ticketing system、shared document、triage/routing、planning/coordination。

### 我的歸納

這非常適合當第二段的第一張投影片：

> **Chat 很適合「這次幫我做一下」；Workflow 解的是「這件事以後每次都要照這套方式做」。**

這比一開始就講 single agent vs multi-agent 清楚很多。

---

## 1.2 Anthropic：Context 不是越多越好；長任務會自然走向 Compaction、外部 Memory、Sub-agents

**來源**：Anthropic — *Effective context engineering for AI agents*  
URL：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents  
定位：`Why context engineering is important to building capable agents`、`Context engineering for long-horizon tasks`、`Compaction`、`Structured note-taking`、`Sub-agent architectures`  
時間點：不適用（文章）

### 敘事順序

1. Prompt engineering 處理的是「怎麼寫 prompt」；長時間 Agent 更大的問題是「每一步到底要把哪些資訊放進 context」。
2. Context 是有限的 attention budget；內容愈多，不代表模型愈能抓住重要資訊，會有 context rot / relevance 問題。
3. Long-horizon task 會超過 context window；就算 context window 變大，仍然會面臨 context pollution 與資訊相關性問題。
4. Anthropic 接著直接列出三種解法：
   - **Compaction**：把接近上限的對話壓縮成摘要後繼續。
   - **Structured note-taking / agentic memory**：把重要資訊寫到 context 外，之後再取回。
   - **Multi-agent architectures**：讓 specialized sub-agents 在乾淨 context 中做聚焦任務，只把濃縮結果交回主 Agent。
5. Anthropic 也明確提醒：compaction 太積極會遺失「當下看似不重要、後來才知道很關鍵」的細節。
6. Structured notes 可以維持 project state across sessions，不必把全部歷史塞回 context。

### 來源原意（非逐字翻譯）

這篇的核心不是「多 Agent 比單 Agent 強」，而是：**Context 本身就是稀缺資源**。長任務必須主動決定什麼留下、什麼外部化、什麼交給乾淨 context 的 sub-agent。

### 它怎麼從 Chat 限制過渡到 Multi-agent？

過渡非常直接：

> 長時間互動 → context 持續累積 → context pollution / relevance 問題 → compaction / notes / multi-agent architectures。

因此 multi-agent 在這裡不是「組一個 AI 公司」的概念，而是**context architecture 的一種解法**。

### 使用的比喻 / 例子

Anthropic 用人類有限 working memory / attention budget 作類比，並把外部檔案、資料夾、inbox、bookmark 當作「人類不會全部背在腦中，而會把資訊外部化」的例子。

### 我的歸納

很適合非工程師的講法：

> **Context 像桌面，不像倉庫。東西全部堆在桌上，不會讓你工作得更好。**

再接：

> **Compaction 像交班摘要：能續命，但摘要一定有取捨；重要工作不能只靠聊天紀錄活著。**

這兩句都是我的比喻，不是 Anthropic 原話。

---

## 1.3 Google：不要把所有角色塞進一個巨大 Prompt；把它拆成「真實團隊」

**來源**：Google Codelabs — *Build Multi-Agent Systems with ADK*  
URL：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk  
定位：`§2 Multi-Agent Systems`、`§9 Workflow Agents`、`§10 SequentialAgent`、`§11 LoopAgent`、`§12 ParallelAgent`  
時間點：不適用（Codelab）

### 敘事順序

1. Google 在 §2 直接把對照寫成：不是「one complex prompt」，而是讓多個較簡單、專門化的 agents 分工合作。
2. 官方列出的好處是：simpler design、reliability、maintainability、modularity。
3. Agent tree 的結構被描述為受到 real-world teams 啟發，讓 delegation / conversation flow 更可控、更好 debug。
4. 前半段先示範 parent agent 把 conversation transfer 給 sub-agent。
5. 到 §9 才正式引入 **Workflow Agents**：不用每一步都等 user，再自動把 sub-agents 串成流程。
6. Workflow 被拆成三個很直觀的 pattern：
   - SequentialAgent：按順序工作。
   - LoopAgent：反覆修改直到條件成立。
   - ParallelAgent：可獨立的工作同時做。
7. 最適合教學的例子是 movie-pitch 的 **writer’s room**：researcher → screenwriter → critic，critic 覺得還不夠好就回圈；之後再 fan-out 給 box-office / casting 等平行角色。

### 來源原意（非逐字翻譯）

Google 的論證是：當一個 monolithic prompt 需要同時承擔太多能力，拆成小而專門的 Agent，可以讓設計、可靠性與維護性更清楚；再用 workflow agent 定義它們要按順序、迴圈或平行執行。

### 它怎麼從 Chat / Single Agent 過渡到 Workflow / Multi-agent？

它的過渡順序比 Anthropic 更像「組織設計」：

> one complex prompt → specialized agents → hierarchy / handoff → automated workflow → sequential / loop / parallel。

### 使用的比喻 / 例子

`writer's room` 是來源自己使用的例子，而且 researcher / screenwriter / critic 很適合非工程師理解。

### 我的歸納

這可以直接映射回你的軟體流程：

> Developer 不是 QA；QA 不是 Product Owner；PR Reviewer 也不是單純再叫同一個人「換帽子」。

來源沒有使用這句，但 Google 的「real-world teams」與 writer / critic 分工提供了很好的教學支撐。

---

## 1.4 Anthropic：不要一開始就 Agent 化；先從 Workflow Patterns 逐步增加複雜度

**來源**：Anthropic — *Building Effective AI Agents*  
URL：https://www.anthropic.com/engineering/building-effective-agents  
定位：`Building blocks, workflows, and agents`、`Workflow: Prompt chaining`、`Routing`、`Parallelization`、`Orchestrator-workers`、`Evaluator-optimizer`、`Agents`  
時間點：不適用（文章）

### 敘事順序

Anthropic 明確把系統排成一個「由簡到複雜」的階梯：

1. Augmented LLM。
2. Prompt chaining。
3. Routing。
4. Parallelization。
5. Orchestrator-workers。
6. Evaluator-optimizer。
7. 真正 autonomous agent。

而且它一直強調：**先用最簡單能工作的方案**，只有當需求真的需要時才加複雜度。

### 對本研究最重要的三個 pattern

#### Routing

來源說 routing 可以把不同類型問題送到 specialized downstream task；例子甚至直接是：容易、常見的問題送到較小且便宜的模型，困難／不尋常的問題送到更強的模型。

這直接支持 Owner 的「不要每件事都殺雞用牛刀」。

#### Parallelization / separation

Anthropic 的 guardrail 例子是：一個 model call 處理核心回答，另一個 model call 做 screening；官方還說這通常比同一個 call 同時負責兩件事表現更好。

這可以支持「球員兼裁判」背後的機制，但**來源沒有使用『球員兼裁判』這個比喻**。

#### Evaluator-optimizer

一個 LLM 產生結果，另一個 LLM 負責 evaluation / feedback，再迭代改善。

這是把「做」與「驗」拆開最直接的官方 pattern。

### 它怎麼從 Chat 限制過渡到 Workflow / Agent？

這篇不是從 consumer chat 開場，而是從系統設計出發：**不要把所有複雜度都丟給一個自治 Agent；固定可預測的事情先 workflow 化，真的無法預先知道步數與路徑，才讓 agent 動態決策。**

### 我的歸納

它很適合拿來糾正「Multi-agent 才是高級答案」這個迷思：

> **流程固定，就用 workflow；需要不同專長，再拆 agent；只有路徑真的無法事先寫死，才增加 autonomous agent 的自由度。**

---

## 1.5 Anthropic：Multi-agent 真正有用的地方是「分離 context、平行探索、按問題複雜度配置資源」

**來源**：Anthropic — *How we built our multi-agent research system*  
URL：https://www.anthropic.com/engineering/multi-agent-research-system  
定位：`Benefits of a multi-agent system`、`Architecture overview for Research`、`Prompt engineering and evaluations for research agents`、Appendix `Long-horizon conversation management` / `Subagent output to a filesystem...`  
時間點：不適用（文章）

### 敘事順序

1. Open-ended research 是 path-dependent，無法事先 hard-code 完整路徑；linear one-shot pipeline 不夠。
2. Lead agent 規劃，specialized subagents 各自用自己的 context window 平行探索。
3. Subagents 把結果壓縮後回傳給 lead，讓詳細搜尋歷程不污染主 context。
4. Plan 會先寫進 Memory，因為 context 超限後可能被截斷；這是一個非常直接的「工作狀態不能只放在對話裡」例子。
5. 後續另外有 CitationAgent 做引用處理，也就是把某個 validation / post-processing role 獨立出來。
6. Anthropic 特別加了一條「Scale effort to query complexity」：簡單問題只用一個 agent、少量 tool calls；直接比較才用 2–4 個 subagents；複雜研究才上更多 subagents。
7. Appendix 建議 subagent 可以直接把成果寫進 filesystem / artifact system，只把 reference 交給 coordinator，避免多階段傳話造成資訊損失。

### 來源原意（非逐字翻譯）

Multi-agent 並非免費午餐。Anthropic 自己的資料顯示，multi-agent 會大幅增加 token 使用；若問題高度相依、大家必須共用同一 context，也可能不適合 multi-agent。

### 它怎麼從 Single Agent 過渡到 Multi-agent？

這裡的核心不是角色扮演，而是三個硬需求：

- 問題可拆成多條獨立探索線。
- 單一 context 容不下所有細節。
- 平行化真的能換來更高覆蓋率或更低 wall-clock time。

### 我的歸納

這是很好的反方材料：

> **Multi-agent 不是「Agent 越多越厲害」；它是花更多 coordination / token 成本，換 context isolation、parallelism、specialization。**

這一句適合放在課堂上，避免學生聽完成「AI 公司愈多人愈好」。

---

# 2. Owner 六個問題逐項驗證

## 2.1 一人分飾多角色

**判定：有強力支持，但來源通常不把它講成「角色扮演會壞」，而是講 specialization / separation of concerns / modularity。**

### 支持來源

1. Google ADK：§2 說明多個 small specialized agents 相較 monolithic prompt 的 simpler design、reliability、maintainability、modularity；並以 real-world teams 為 agent hierarchy 的直覺。  
URL：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk  
定位：`§2 Multi-Agent Systems`

2. OpenAI Orchestration：multi-agent workflow 適合 specialists 擁有不同工作部分；文件建議每個 specialist 給 narrow job，只在需要不同 instructions / tools / policy 時才拆。  
URL：https://developers.openai.com/api/docs/guides/agents/orchestration  
定位：`Choose the orchestration pattern`、`Use handoffs for delegated ownership`、`Add specialists only when the contract changes`

3. LangChain：multi-agent 的用途之一是 distributed development 與 context management，讓能力有清楚邊界。  
URL：https://docs.langchain.com/oss/python/langchain/multi-agent  
定位：`Why multi-agent?`

### 適合投影片的說法（我的歸納）

> **同一個 Chat 可以叫 AI 一下當 PM、一下當 Dev、一下當 QA；但真正的流程通常會把責任、工具、context 與驗收條件分開。**

注意：這不是在宣稱「單一 Agent 技術上不能切角色」；它可以。問題是當工作變長、規則變多時，**角色邊界不再是顯式的系統結構，而只存在 prompt 裡**。

---

## 2.2 Context 污染

**判定：明確、直接、有官方原文支持。這是六點中證據最強的一點。**

### 支持來源

1. Anthropic 明確使用 `context pollution`，並說長任務即使 context window 變大，仍會有 context pollution 與 relevance 問題。  
URL：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents  
定位：`Context engineering for long-horizon tasks`

2. 同篇把解法直接連到 compaction、structured note-taking、multi-agent architectures；sub-agents 用 clean context windows，詳細內容留在各 subagent，lead 只拿 distilled summary。  
URL：同上  
定位：`Compaction`、`Structured note-taking`、`Sub-agent architectures`

3. OpenAI Multi-agent 文件把優點寫成 `Focused context`：每個 subagent 收到 bounded task 並維持自己的 context，降低不相關工作線互相干擾。  
URL：https://developers.openai.com/api/docs/guides/responses-multi-agent  
定位：`When to use Multi-agent`

4. LangChain 也把 context management 放在「Why multi-agent?」第一項，並明說 multi-agent 設計核心是決定每個 agent 看見什麼資訊。  
URL：https://docs.langchain.com/oss/python/langchain/multi-agent  
定位：`Why multi-agent?`

### 適合投影片的說法（我的歸納）

> **Context 不是資料湖，是 working memory。Dev 的 30 頁 debug log，不一定該一起塞給 QA；PM 的 brainstorm 草稿，也不一定該污染最後驗收。**

---

## 2.3 球員兼裁判

**判定：機制有強力支持；「球員兼裁判」這個固定比喻查不到主流官方來源直接這樣說。**

### 支持來源

1. Anthropic Parallelization：guardrail 的例子就是一個 model instance 做核心處理，另一個負責 screening；官方指出這通常比同一個 LLM call 同時做兩者更好。  
URL：https://www.anthropic.com/engineering/building-effective-agents  
定位：`Workflow: Parallelization`

2. Anthropic Evaluator-optimizer：一個 LLM call 生成，另一個 LLM call 評估並提供 feedback。  
URL：同上  
定位：`Workflow: Evaluator-optimizer`

3. Google writer’s room：researcher、screenwriter、critic 分開，critic 決定是否繼續迭代。  
URL：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk  
定位：`§11 LoopAgent`

### 查不到

- 查不到 Anthropic / OpenAI / Google / Microsoft / LangChain 把這個問題正式命名為「player-referee problem」或直接使用「球員兼裁判」作為標準術語。

### 適合投影片的說法（我的歸納）

> **不是不能讓同一個模型「自我檢查」，而是重要關卡最好把『產出』與『判定是否通過』分成兩個明確步驟，必要時甚至用不同 prompt、model、context 或 human gate。**

這比說「同一個模型不能 review 自己」更準確。

---

## 2.4 無法依不同問題選用不同 Model / Effort，殺雞用牛刀

**判定：概念明確有支持，但要修正 Owner 的字面說法。並不是 single agent 在技術上『絕對不能』做 model routing；真正的問題是，如果整個工作被包在同一個 Chat / 同一組 model settings 裡，就沒有顯式、系統化的 per-stage resource routing。**

### 支持來源

1. Anthropic Routing：官方例子直接是 easy/common queries → smaller, cost-efficient model；hard/unusual queries → more capable model。  
URL：https://www.anthropic.com/engineering/building-effective-agents  
定位：`Workflow: Routing`

2. OpenAI Agents SDK：`Mixing models in one workflow` 明確說同一 workflow 可讓每個 agent 使用不同 model，例如 triage 用 smaller/faster model，complex task 用 larger/more capable model。  
URL：https://openai.github.io/openai-agents-python/models/  
定位：`Mixing models in one workflow`

3. 同一份 OpenAI 文件顯示 `ModelSettings` 可設定 reasoning effort；因此 model 與 effort 都可以成為 workflow / agent 層級配置。  
URL：同上  
定位：`GPT-5 models`、`Mixing models in one workflow`

4. Anthropic multi-agent research 另外明確寫 `Scale effort to query complexity`，並給簡單查詢、比較、複雜研究不同 agent / tool-call budget。  
URL：https://www.anthropic.com/engineering/multi-agent-research-system  
定位：`Prompt engineering and evaluations for research agents` → `Scale effort to query complexity`

### 適合投影片的說法（我的歸納）

> **不是每一張 ticket 都需要最強模型、最高 reasoning。Workflow 才能把「這一關需要多少腦力」變成系統設計，而不是每次靠人臨時切。**

---

## 2.5 Compact 之後遺忘

**判定：明確支持，但應說「有資訊損失風險」，不要講成「compact 一定會忘」。**

### 支持來源

Anthropic 對 compaction 的定義就是：接近 context 上限時，把對話摘要後重啟新的 context。它同時明確提醒，過度 aggressive 的 compaction 可能丟掉 subtle but critical context，這些資訊的重要性可能要到後面才浮現。  
URL：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents  
定位：`Compaction`

### 適合投影片的說法（我的歸納）

> **Compact 不是完整備份，是摘要。摘要能延續工作，但不能當唯一的 project state。**

---

## 2.6 換 Session 看不到之前內容／交接問題

**判定：問題成立，但必須區分「LLM/API 架構」與「特定 Chat 產品是否額外提供 memory/project state」。不能籠統說所有 Chat 換 session 都一定失憶。**

### 支持來源

1. OpenAI Conversation State 文件：每個 text-generation request 原本是 independent / stateless；若要多輪 continuity，必須把 state 帶回，或使用持久化的 conversation object。官方也寫明 Conversations API 可以讓 durable conversation identifier 跨 sessions、devices、jobs 使用。  
URL：https://developers.openai.com/api/docs/guides/conversation-state  
定位：`Manually manage conversation state`、`Using the Conversations API`

2. Anthropic Structured note-taking：把 notes 寫在 context 外，可以 maintain project state across sessions，之後再 reference previous work。  
URL：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents  
定位：`Structured note-taking`

3. Microsoft Agent Framework：workflow 有 checkpoints / resuming，可保存、恢復 workflow progress；handoff orchestration 也明確處理 context preservation。  
URL：https://learn.microsoft.com/en-us/agent-framework/workflows/  
定位：`Interaction and durability`  
URL：https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/handoff  
定位：頁面下方 capability summary 的 `Context Preservation`、`Checkpointing`

4. Anthropic multi-agent research Appendix：長任務會把 completed phase 摘要、essential information 存入 external memory；接近 context limit 時可 spawn fresh subagent，靠 careful handoff 與 stored context 延續。  
URL：https://www.anthropic.com/engineering/multi-agent-research-system  
定位：Appendix `Long-horizon conversation management`

### 適合投影片的說法（我的歸納）

不要寫：

> 「開新 Chat，AI 就什麼都不知道。」

更準確的是：

> **Chat transcript 是 session context，不應該被當成唯一的工作狀態。真正要交接的東西，要外部化成 ticket、artifact、decision、checkpoint、memory / state。**

這句剛好能自然接到「為什麼要 Kanban / Issue」。

---

# 3. 六點總表

| Owner 問題 | 官方來源支持度 | 最強來源 | 要不要修正文案 |
|---|---|---|---|
| 一人分飾多角色 | 強 | Google ADK §2；OpenAI Orchestration | 建議講「角色／責任／工具邊界不明」而不是「單 Agent 做不到」 |
| context 污染 | **非常強，且有同名術語** | Anthropic Context Engineering；OpenAI Multi-agent | 可直接使用 `context pollution / focused context` |
| 球員兼裁判 | 機制強；比喻查不到 | Anthropic Parallelization / Evaluator-optimizer；Google critic loop | 標明是教學比喻，不是業界術語 |
| 不同 model / effort | **非常強** | Anthropic Routing；OpenAI Models；Anthropic Scale effort | 修正成「Workflow 可顯式路由 model / effort」 |
| compact 後遺忘 | **非常強** | Anthropic Compaction | 改成「摘要有資訊損失風險」，不要說必然失憶 |
| 換 session / handoff | 強，但產品依實作而異 | OpenAI Conversation State；Anthropic notes；Microsoft checkpoint | 強調 externalized state，不要把所有產品講成完全無跨 session 能力 |

---

# 4. 我們原本沒列、但很適合非工程師理解的問題

## 4.1 「工作狀態只活在聊天裡」比「記憶不足」更根本

**來源支持**：

- OpenAI Workspace Agents 把 agent workflow 放在 shared systems、standard handoffs、ticketing system、shared documents 上。  
  URL：https://openai.com/academy/workspace-agents/  
  定位：導言、`What is an agent?`、`Agent workflow examples`
- Microsoft Workflow 能 checkpoint / resume。  
  URL：https://learn.microsoft.com/en-us/agent-framework/workflows/  
  定位：`Interaction and durability`
- Anthropic structured note-taking 把 project state 放在 context 外。  
  URL：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents  
  定位：`Structured note-taking`

### 我的歸納

真正的問題不只是「AI 記不記得」，而是：

> **目前做到哪、誰負責、下一步是什麼、驗收標準是什麼，如果只存在對話裡，人和 Agent 都很難接手。**

這其實就是你前面已經教完的 Kanban / Ticket 可以再次登場的最佳位置。

---

## 4.2 可觀測性：出錯時不知道是哪一關壞掉

**來源支持**：

- Microsoft Workflow 把 observability、visualization 列為 workflow capabilities。  
  URL：https://learn.microsoft.com/en-us/agent-framework/workflows/  
  定位：`Operations`
- OpenAI Orchestration 說只有在 specialist 能改善 `trace legibility` 等條件時才值得拆。  
  URL：https://developers.openai.com/api/docs/guides/agents/orchestration  
  定位：`Add specialists only when the contract changes`
- Google 說 hierarchical agent tree 讓流程更 predictable、easier to debug。  
  URL：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk  
  定位：`§2 The Hierarchical Agent Tree`

### 我的歸納

> **一個超長 Chat 最後做壞了，你只知道「結果不對」；Workflow 會讓你知道是 Refinement、Dev、Review 還是 QA 那一關出了問題。**

這對非工程師其實比「multi-agent 很酷」更有說服力。

---

## 4.3 控制點與 Human Gate：不是每一步都該讓 Agent 自己決定

**來源支持**：

- Anthropic Prompt chaining 可以在中間加 programmatic gate。  
  URL：https://www.anthropic.com/engineering/building-effective-agents  
  定位：`Workflow: Prompt chaining`
- OpenAI Workspace Agents 在 governance 例子中使用 approval / escalation；builder 也能設定 human-in-the-loop checkpoint。  
  URL：https://openai.com/academy/workspace-agents/  
  定位：`Anatomy of an agent`、`Building your own agent in ChatGPT`
- Microsoft Orchestrations 支援 human-in-the-loop tool approval。  
  URL：https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/  
  定位：頁首 pattern table 下方 Tip

### 我的歸納

> **Agentic 不等於全自動。成熟的流程反而會很清楚哪些地方可以放手、哪些地方一定要過 gate。**

這可以直接對應你前面的 PR Review、QA、Product / Goal Check。

---

## 4.4 Multi-agent 本身也有成本與協調問題

**來源支持**：

Anthropic 明確說 multi-agent 會增加 coordination complexity，而且其 Research 系統中 multi-agent 的 token 消耗顯著高於一般 chat；需要共享同一 context、相依性很高的工作也未必適合。  
URL：https://www.anthropic.com/engineering/multi-agent-research-system  
定位：`Benefits of a multi-agent system`、`Prompt engineering and evaluations for research agents`

OpenAI 也提醒 subagents 會增加 token usage，不適合單一路徑強相依、shared mutable resource 或本來就很小的工作。  
URL：https://developers.openai.com/api/docs/guides/responses-multi-agent  
定位：`When to use Multi-agent`

LangChain 同樣明確寫「not every complex task requires multi-agent」。  
URL：https://docs.langchain.com/oss/python/langchain/multi-agent  
定位：頁首、`Why multi-agent?`

### 我的歸納

可以用一張反例 slide：

> **不要把 1 張 ticket 開成 8 個 Agent 開會。**

Multi-agent 是 trade-off，不是成熟度排行榜。

---

# 5. 適合非工程師的比喻：哪些是來源、哪些是我們自己的

| 比喻 | 類型 | 可對應的來源 |
|---|---|---|
| Writer’s room：researcher / screenwriter / critic | **來源真的有用** | Google ADK §1、§11：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk |
| 真實團隊 / hierarchical team | **來源真的有用** | Google ADK §2，同上 |
| Working memory / attention budget | **來源真的有類比** | Anthropic Context Engineering：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| Chat = 一次性的談話；Workflow = 可重複 SOP | **我的歸納** | 受 OpenAI Workspace Agents 導言與 What is an agent? 支持：https://openai.com/academy/workspace-agents/ |
| Context = 工作桌，不是倉庫 | **我的比喻** | 受 Anthropic context finite resource 支持：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents |
| Compaction = 交班摘要 | **我的比喻** | 受 Anthropic Compaction 支持，同上 |
| 球員兼裁判 | **我的比喻；查不到是官方固定說法** | 機制受 Anthropic Evaluator-optimizer / Parallelization 支持：https://www.anthropic.com/engineering/building-effective-agents |
| Kanban = 外部工作記憶 / source of truth | **我的比喻** | 受 OpenAI ticketing/shared systems、Microsoft checkpoint、Anthropic external memory 支持 |
| 殺雞用牛刀 | **Owner / 教學比喻，不是官方術語** | 機制受 Anthropic Routing、OpenAI per-agent model settings 支持 |

---

# 6. Single agent、Multi-agent、Workflow、Chat-driven、Work-driven：業界實際怎麼分

## 6.1 Agent / Single Agent

**業界通用程度：高。**

`agent` 是高度通用詞；`single-agent` 也是很常見的對照描述。

Anthropic 在 *Building Effective AI Agents* 對 workflow 與 agent 做了實用區分：workflow 是 LLM / tools 走預先定義的 code path；agent 則讓 LLM 動態決定 process / tool usage。  
URL：https://www.anthropic.com/engineering/building-effective-agents  
定位：文章前段 `What are agents?`，以及 `Building blocks, workflows, and agents`

**建議課堂用法**：可以放心用。

---

## 6.2 Multi-agent / Multi-agent system

**業界通用程度：非常高。**

OpenAI、Anthropic、Google、LangChain、Microsoft 都直接使用 multi-agent / multi-agent system。

代表來源：

- OpenAI：https://developers.openai.com/api/docs/guides/responses-multi-agent
- Anthropic：https://www.anthropic.com/engineering/multi-agent-research-system
- Google：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk
- LangChain：https://docs.langchain.com/oss/python/langchain/multi-agent
- Microsoft：https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/

**建議課堂用法**：可以放心用，但不要把 multi-agent 當成 workflow 的同義詞。

---

## 6.3 Workflow / Agentic workflow

**業界通用程度：非常高。**

不同來源的細節定義稍有差異，但「workflow」與「agentic workflow」已是主流用語。

- Anthropic：Prompt chaining、Routing、Parallelization、Orchestrator-workers、Evaluator-optimizer 都被列在 workflows。  
  URL：https://www.anthropic.com/engineering/building-effective-agents
- Google：SequentialAgent / LoopAgent / ParallelAgent 被稱為 Workflow Agents。  
  URL：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk
- Microsoft：有完整 Workflow / Orchestration API。  
  URL：https://learn.microsoft.com/en-us/agent-framework/workflows/
- OpenAI Academy：直接用 repeatable workflows / agent workflow patterns。  
  URL：https://openai.com/academy/workspace-agents/

**建議課堂用法**：這應該是你兩段之間最重要的中介詞。

---

## 6.4 Orchestration

**業界通用程度：非常高。**

用來指多個 agent / step 怎麼被協調、路由、交接。

- OpenAI：`Orchestration and handoffs`  
  https://developers.openai.com/api/docs/guides/agents/orchestration
- Google：Codelab 直接說 orchestrate complex multi-agent systems。  
  https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk
- Microsoft：`Workflow orchestrations`  
  https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/

**建議課堂用法**：可以用，但對小白最好翻成「誰決定下一棒交給誰」。

---

## 6.5 Sequential / Parallel (Concurrent) / Loop

**業界通用程度：高，但命名略有差異。**

- Google：Sequential / Loop / Parallel。
- Microsoft：Sequential / Concurrent。
- Anthropic：Prompt chaining / Parallelization。

來源：

- Google：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk
- Microsoft：https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/
- Anthropic：https://www.anthropic.com/engineering/building-effective-agents

**建議課堂用法**：非常適合非工程師，甚至可只畫三種箭頭就講完。

---

## 6.6 Routing / Router

**業界通用程度：高。**

Anthropic 與 LangChain 都直接用 Routing / Router；OpenAI 也有 triage / routing pattern。

來源：

- Anthropic：https://www.anthropic.com/engineering/building-effective-agents — `Workflow: Routing`
- LangChain：https://docs.langchain.com/oss/python/langchain/multi-agent — `Patterns: Router`
- OpenAI：https://openai.com/academy/workspace-agents/ — `Agent workflow examples: Triage and routing`

**建議課堂用法**：可以用，而且正好連到 model / effort routing。

---

## 6.7 Handoff

**業界通用程度：高。**

OpenAI、LangChain、Microsoft 都把 Handoff 當一級 pattern。

來源：

- OpenAI：https://developers.openai.com/api/docs/guides/agents/orchestration
- LangChain：https://docs.langchain.com/oss/python/langchain/multi-agent
- Microsoft：https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/handoff

**建議課堂用法**：可以直接連到「交接不是把上一整串聊天複製貼上」。

---

## 6.8 Subagent / Orchestrator-worker

**業界通用程度：高到中高。**

`subagent` 很常見；`orchestrator-worker` 是非常常見、容易理解的 architecture pattern，但各框架可能換名字，例如 manager / worker、manager / specialist。

來源：

- Anthropic：https://www.anthropic.com/engineering/building-effective-agents — `Orchestrator-workers`
- Anthropic：https://www.anthropic.com/engineering/multi-agent-research-system — `Architecture overview for Research`
- LangChain：https://docs.langchain.com/oss/python/langchain/multi-agent — `Subagents`

---

## 6.9 Evaluator-optimizer / Critic loop

**業界概念通用，名稱不完全統一。**

Anthropic 用 `Evaluator-optimizer`；Google 的具體教學是 screenwriter + critic 的 LoopAgent。

來源：

- Anthropic：https://www.anthropic.com/engineering/building-effective-agents — `Evaluator-optimizer`
- Google：https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk — `§11 LoopAgent`

**建議課堂用法**：對小白可以講「Do → Review → Revise loop」，不用強迫記 pattern 名稱。

---

## 6.10 Agents as tools

**業界可辨識，但偏 OpenAI / LangChain 的具體 pattern wording。**

OpenAI 的分類非常清楚：

- Handoff：specialist 接管 conversation。
- Agents as tools：manager 保持控制，specialist 只是 bounded helper。

URL：https://developers.openai.com/api/docs/guides/agents/orchestration  
定位：`Choose the orchestration pattern`

LangChain 的 Subagents pattern 也很接近「main agent 把 subagent 當工具呼叫」。  
URL：https://docs.langchain.com/oss/python/langchain/multi-agent

**建議課堂用法**：進階補充，不必在 Agent 101 前半段強調。

---

## 6.11 Chat-driven

**業界通用程度：低。查不到它是主要 Agent framework 的標準分類詞。**

我沒有在這次驗證過的 OpenAI / Anthropic / Google / Microsoft / LangChain 核心架構文件中找到一套正式 taxonomy，把系統分成 `chat-driven` vs 其他類別。

它可以當你自己的教學標籤，但必須明講是**課程用語**。

### 建議

若保留，定義成：

> **Chat-driven（本課程用語）＝工作主要由人持續在同一對話中下指令、追問、修正，conversation 本身同時扮演 UI、context 與工作進度。**

---

## 6.12 Work-driven

**業界通用程度：低。查不到它是主要 Agent framework 的標準架構分類。**

主流文件更常出現：

- workflow / agentic workflow
- task
- trigger
- event-driven
- orchestration
- queue / job（偏軟體系統語境）
- durable state / checkpoint

OpenAI Workspace Agents 的正式說法是 repeatable workflow、time-based or event-driven、shared systems、standard handoffs。  
URL：https://openai.com/academy/workspace-agents/

### 建議

如果你想保留「work-driven」來跟 Chat 對比，投影片上最好寫：

> **Work-driven（本課程用語）**

並在下面用正式概念解釋：

> Work item / Ticket + State + Workflow + Trigger + Agent assignment

這樣不會讓觀眾誤以為 `work-driven agent` 是全業界公認類別。

---

## 6.13 「從 Kanban 拉工作」

**業界通用程度：作為軟工／Ops pattern 很直覺，但不是 AI agent 的標準 taxonomy。**

這次查到的主流 AI 文件會說 ticketing system、trigger、workflow、routing、state、checkpoint、handoff，但沒有把 `Kanban-pull agent architecture` 當作通用正式分類。

### 我的建議

你可以把它定位成**你的課程整合**：

> 前半段已經有：Goal → Ticket → Kanban state。  
> 後半段不是發明另一套 Agent flow，而是讓 Agent **從既有 work item 取得工作**，完成後把 artifact / evidence / state 寫回去。

因此你的核心詞甚至可以不是 `work-driven`，而是：

> **Conversation-driven → Workflow-driven → Work-item-driven execution**

其中後兩個是教學描述，不要冒充業界標準 taxonomy。

---

# 7. 最推薦給 Agent 101 的敘事重排

以下是**我的歸納與課程設計建議**，不是任何單一來源原話；但每一步都有上面來源支撐。

## Slide A — 大家現在怎麼用 AI？Chat

主標：

> **Chat 很強，尤其適合一次性的工作。**

內容只放三四個例子：

- 幫我 brainstorm。
- 幫我寫一版。
- 幫我看一下。
- 幫我改到好。

底下注記來源：OpenAI Workspace Agents 明確把 regular chat 定位在 open-ended / exploratory / one-off tasks。  
URL：https://openai.com/academy/workspace-agents/  
定位：導言、`What is an agent?`

---

## Slide B — 但當「一段 Chat」開始承擔整個專案

畫一個超長 chat，中間依序寫：

PM → Dev → Review → QA → PM → 修 bug → QA → Release

然後指出六個問題：

1. 一個 context 裡切很多角色。
2. 不相關資訊互相污染。
3. 產出者又自己判定 pass。
4. 每一步都用同一套 model / effort，不易做系統化資源分配。
5. 太長後 compaction 會有資訊損失風險。
6. Session / agent 換手時，若沒有 external state，就會有 handoff 問題。

這時**還不要講 multi-agent**。

---

## Slide C — 問題不是「AI 不夠聰明」，是「工作沒有被外部化」

主標：

> **不要讓 Chat 同時當聊天視窗、記憶、待辦清單、流程引擎、驗收紀錄。**

畫成：

```text
Chat / Agent
    ↕
Ticket / Kanban / Artifact / Decision / Evidence
    ↕
Workflow state
```

這是你的課程關鍵轉折。

支撐來源：

- OpenAI：shared systems / standard handoffs / ticketing system。
- Anthropic：structured notes / external memory / filesystem artifacts。
- Microsoft：checkpoint / resume / observability。

---

## Slide D — 先有 Workflow，再決定每一關誰做

直接把第一段課程流程拿回來：

```text
Goal
 ↓
Ticket Refinement
 ↓
Ready
 ↓
Dev
 ↓
PR Review
 ↓
QA
 ↓
Product / Goal Check
 ↓
Done
```

旁邊補一句：

> **Workflow 決定下一步；Agent 負責執行某一步。**

這一句是我的課程歸納。

此處可以接 Anthropic 的 prompt chaining / routing / evaluator-optimizer，以及 Google Sequential / Loop / Parallel。

---

## Slide E — 到這裡，Multi-agent 才自然出現

主標：

> **當不同 step 需要不同 context、工具、規則、model 或責任人，就拆成不同 Agent。**

例如：

| Stage | Agent | Context | Model / Effort | Output |
|---|---|---|---|---|
| Refinement | PM Agent | Goal + user need | 中 | refined ticket |
| Dev | Dev Agent | code + ticket | 高 | commit / PR |
| PR Review | Reviewer Agent | diff + AC | 中高 | review findings |
| QA | QA Agent | AC + runnable build | 中 | evidence / pass-fail |
| Product Check | PO Agent / Human | Goal + outcome | 高或 Human | accept / reopen |

這張就能一次解決「角色」、「context」、「球員裁判」、「不同 model/effort」。

---

## Slide F — Multi-agent 不是目的

放三個判斷：

### 一個 Agent 就好

- task 很小。
- 每一步高度相依。
- context 本來就高度共享。

### Workflow 就好

- 路徑可預測。
- 有固定 sequential / gate / retry。

### Multi-agent 值得

- context 需要隔離。
- 工作可平行。
- 專長 / tools / policy 明顯不同。
- 需要明確 handoff / ownership。

來源：OpenAI Multi-agent、OpenAI Orchestration、Anthropic Building Effective Agents、Anthropic Multi-agent Research、LangChain Multi-agent。

---

# 8. 對原本兩段「交給 Agent」／「為什麼一隻 Agent 不夠」的具體修改建議

## 不建議繼續維持兩個平行問題

原本如果是：

1. 交給 Agent
2. 為什麼一隻 Agent 不夠

很容易把四種不同層次混在一起：

- UI：Chat。
- Executor：Agent。
- Process：Workflow。
- Organization：Multi-agent。

這正是目前敘事會亂掉的原因。

## 建議改成兩段

### 第二段：**從 Chat 到 Work**

回答：為什麼一個長 Chat 不適合承擔整個長期工作系統？

核心：

- Context 有限。
- State 要外部化。
- Process 要可見。
- Handoff 要有 artifact。
- Checkpoint / evidence / approval 要落地。

終點是：**Workflow + Ticket / Kanban**。

### 第三段：**從 Workflow 到 Multi-agent**

回答：有了 workflow 之後，什麼時候才需要多 Agent？

核心：

- specialization。
- context isolation。
- parallelism。
- independent evaluation。
- model / effort routing。

終點是：**每個 agent 從 workflow / work item 拿到 bounded task，完成後把 artifact / evidence / state 交回系統。**

這樣就不會再把 single agent、multi-agent、chat-driven、work-driven 全塞在同一層比較。

---

# 9. 一張 taxonomy 圖就可以講清楚

以下為**我的整理**：

```text
                     ┌──────────────┐
                     │     Chat     │
                     │ 互動 / 輸入層 │
                     └──────┬───────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   Workflow   │
                     │ 控制流程 / Gate│
                     └──────┬───────┘
                            │
           ┌────────────────┼────────────────┐
           ▼                ▼                ▼
      ┌─────────┐      ┌─────────┐      ┌─────────┐
      │ PM Agent│      │Dev Agent│      │ QA Agent│
      └─────────┘      └─────────┘      └─────────┘
           │                │                │
           └────────────────┼────────────────┘
                            ▼
                  ┌──────────────────┐
                  │ Ticket / Kanban  │
                  │ State / Artifact │
                  │ Evidence / Goal  │
                  └──────────────────┘
```

對應詞：

- **Chat**：互動方式，不等於整套 Agent architecture。
- **Agent**：會執行任務的工作者。
- **Workflow**：步驟、路由、gate、loop、parallelism。
- **Multi-agent**：多個 specialized agents 被 orchestration。
- **Ticket / Kanban / artifact**：外部、可持續、可交接的 work state。

最後一句可收：

> **我們不是把 Chat 變成更多 Chat，而是把工作從 Chat 裡拿出來，再讓 Agent 進入流程。**

這句是我的課程文案建議。

---

# 10. 第 2 輪補查：哪些重要來源是第 1 輪容易漏掉、但應補進來的

## 10.1 OpenAI Workspace Agents — 必補

URL：https://openai.com/academy/workspace-agents/  
定位：導言、`What is an agent?`、`Agent workflow examples`

**原因**：目前找到最直接以「大家先用 one-off Chat → repeatable workflows」為敘事起點的官方材料，與 Owner 要求高度一致。

---

## 10.2 Anthropic Effective Context Engineering — 必補

URL：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents  
定位：`Context engineering for long-horizon tasks`、`Compaction`、`Structured note-taking`、`Sub-agent architectures`

**原因**：Owner 六點中的 context pollution、compaction、cross-session state、subagent clean context 幾乎全部能在同一篇得到直接支持。

---

## 10.3 OpenAI Agents SDK Models — 必補在「殺雞用牛刀」那張

URL：https://openai.github.io/openai-agents-python/models/  
定位：`GPT-5 models`、`Mixing models in one workflow`

**原因**：它不是概念文章，而是直接證明「同一 workflow 可以 per-agent 選不同 model，且可設定 reasoning effort」。

---

## 10.4 OpenAI Conversation State / Microsoft Checkpoint — 必補在 Handoff

OpenAI：  
https://developers.openai.com/api/docs/guides/conversation-state  
定位：`Manually manage conversation state`、`Using the Conversations API`

Microsoft：  
https://learn.microsoft.com/en-us/agent-framework/workflows/  
定位：`Interaction and durability`

**原因**：可以避免把「session」講成玄學。它其實就是 state 是否被 durable 地保存、傳遞、恢復。

---

## 10.5 LangChain Multi-agent — 適合拿來做 taxonomy 交叉驗證

URL：https://docs.langchain.com/oss/python/langchain/multi-agent  
定位：`Why multi-agent?`、`Patterns`、`Performance comparison`

**原因**：LangChain 把 multi-agent 的理由講得很務實：context management、distributed development、parallelization；並列出 Subagents、Handoffs、Skills、Router、Custom workflow。也明確說不是每個複雜問題都要 multi-agent。

---

# 11. 驗證後刪除／修正的說法

以下是我在第 2 輪會主動修正的地方：

1. **不再把「Chat-driven / Work-driven」寫成業界公認二分法。**  
   查不到主流官方框架把這兩個詞當標準 taxonomy；可作課程用語，但需註明。

2. **不再把「球員兼裁判」說成來源原話。**  
   查不到這個固定比喻；只能說 evaluator / critic separation 的機制有官方支持。

3. **不再寫「Single agent 不能使用不同 model」。**  
   技術上完全可以由 routing / orchestration 做 model selection；應改成「若全部工作被綁在單一 chat / 單一 model config，就缺乏顯式 per-stage routing」。

4. **不再寫「Compact 一定會忘記」。**  
   Anthropic 的精確說法是 compaction 有取捨，過度 aggressive 時可能失去 subtle but critical context。

5. **不再寫「換 session 一定看不到任何以前內容」。**  
   不同產品可能有 memory / project / persisted conversation；真正普遍的架構問題是：state 不會憑空存在，必須被保存、帶入或外部化。

6. **不再暗示 Multi-agent 必然比 Single agent 好。**  
   OpenAI、Anthropic、LangChain 都明確說有適用條件與成本；小、序列、高共享 context 的任務往往一個 agent 更好。

7. **沒有加入無法驗證的影片時間碼。**  
   本版核心證據全部使用可定位章節的官方文章／文件／Codelab；沒有拿未驗證的 YouTube 時間點湊數。

---

# 12. 最終建議：這兩段課的核心命題

如果只保留三句，我會選：

> **1. Chat 適合一次性的互動；長期工作需要 external state 與 repeatable workflow。**

> **2. Workflow 決定工作怎麼流；Agent 只是負責其中一段工作的執行者。**

> **3. Multi-agent 不是為了多，而是為了 specialization、context isolation、independent evaluation、parallelism 與 resource routing。**

這三句都是**我的歸納**，不是來源逐字原話；但分別由 OpenAI Workspace Agents、Anthropic Context Engineering / Building Effective Agents、Google ADK、OpenAI Multi-agent / Models、LangChain / Microsoft 等官方資料共同支持。

若要再濃縮成一張 workshop transition slide：

```text
Chat
「幫我做這件事」
        ↓
Workflow
「這件事每次怎麼做」
        ↓
Work state
「現在做到哪、誰負責、證據在哪」
        ↓
Multi-agent
「不同步驟交給最適合的人／模型」
```

然後下一張直接把它對回你第一段已經教完的：

```text
Goal → Refinement → Ready → Dev → PR Review → QA → Product/Goal Check → Done
```

這樣「軟體流程」與「Agent 協作」會變成同一件事的兩層，而不是另外突然冒出一套 single-agent / multi-agent 名詞課。

---

# 13. 已驗證來源索引

## OpenAI

1. **Workspace agents**  
   https://openai.com/academy/workspace-agents/  
   已驗證定位：導言、`What is an agent?`、`Anatomy of an agent`、`Agent workflow examples`、`Building your own agent in ChatGPT`

2. **Orchestration and handoffs**  
   https://developers.openai.com/api/docs/guides/agents/orchestration  
   已驗證定位：`Choose the orchestration pattern`、`Use handoffs for delegated ownership`、`Use agents as tools for manager-style workflows`、`Add specialists only when the contract changes`

3. **Multi-agent**  
   https://developers.openai.com/api/docs/guides/responses-multi-agent  
   已驗證定位：`When to use Multi-agent`，包含 Parallel execution、Focused context、Model-directed coordination 與 one-agent / multi-agent 適用條件。

4. **Agents SDK — Models**  
   https://openai.github.io/openai-agents-python/models/  
   已驗證定位：`GPT-5 models`、`Mixing models in one workflow`；支援 per-agent model 與 reasoning effort 設定。

5. **Conversation state**  
   https://developers.openai.com/api/docs/guides/conversation-state  
   已驗證定位：`Manually manage conversation state`、`Using the Conversations API`；說明 request stateless 與 durable conversation state。

## Anthropic

6. **Effective context engineering for AI agents**  
   https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents  
   已驗證定位：`Why context engineering is important...`、`Context engineering for long-horizon tasks`、`Compaction`、`Structured note-taking`、`Sub-agent architectures`。

7. **Building Effective AI Agents**  
   https://www.anthropic.com/engineering/building-effective-agents  
   已驗證定位：`Building blocks, workflows, and agents`、`Prompt chaining`、`Routing`、`Parallelization`、`Orchestrator-workers`、`Evaluator-optimizer`、`Agents`。

8. **How we built our multi-agent research system**  
   https://www.anthropic.com/engineering/multi-agent-research-system  
   已驗證定位：`Benefits of a multi-agent system`、`Architecture overview for Research`、`Prompt engineering and evaluations for research agents`、Appendix long-horizon / filesystem artifact 段落。

## Google

9. **Build Multi-Agent Systems with ADK**  
   https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk  
   已驗證定位：`§2 Multi-Agent Systems`、`§9 Workflow Agents`、`§10 SequentialAgent`、`§11 LoopAgent`、`§12 ParallelAgent`、`§14 Congratulations`。

## LangChain

10. **Multi-agent**  
    https://docs.langchain.com/oss/python/langchain/multi-agent  
    已驗證定位：`Why multi-agent?`、`Patterns`、`Performance comparison`；Subagents / Handoffs / Skills / Router / Custom workflow。

## Microsoft

11. **Workflow capabilities**  
    https://learn.microsoft.com/en-us/agent-framework/workflows/  
    已驗證定位：`Interaction and durability`、`Operations`、`Multi-agent orchestration`；包含 checkpoint/resume、observability、visualization。

12. **Workflow orchestrations in Agent Framework**  
    https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/  
    已驗證定位：pattern table；Sequential / Concurrent / Handoff / Group Chat / Magentic。

13. **Handoff orchestration**  
    https://learn.microsoft.com/en-us/agent-framework/workflows/orchestrations/handoff  
    已驗證定位：capability summary；Context Preservation、Specialized Expertise、Autonomous Mode、Checkpointing。

---

# 14. 一句話版本

**最適合這套 Agent 101 的故事不是「一隻 Agent 不夠，所以改 Multi-agent」，而是「Chat 適合一次性互動；工作一旦變長、可重複、需要角色與交接，就把 state 和流程移出 Chat；Workflow 建好後，再按需要把每一步交給不同 Agent」。**
