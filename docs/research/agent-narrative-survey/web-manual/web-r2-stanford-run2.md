# Stanford AI Agent / LLM Agent 課程 Survey — 第 2 輪驗證修正版

> 研究日期：2026-10-04（Asia/Taipei）  
> 目的：供 Agent 101 workshop 使用，特別回答「大家從 chat 開始，chat／單一 Agent 哪裡會出問題，如何自然過渡到 workflow／multi-agent」的敘事問題。  
> 規則：只把可查證內容算作來源說法；查不到就寫「查不到」。Stanford 課程指定的外部閱讀（Anthropic、Berkeley 等）會明確標為「非 Stanford 作者」。

---

## 0. 結論先行

### 最適合 Owner 想要的敘事：CS329A Lecture 1

在這輪驗證後，**Stanford CS329A《Self-Improving AI Agents》第一講是最貼近 Owner 想要的敘事，而且順序幾乎可以直接借來改 workshop。**

它不是一開始第一分鐘就講 chat；前約 40 分鐘先回顧 LLM scaling、reasoning、test-time compute。真正切到 Agent 時，敘事順序是：

1. **Chat / reasoning model 的問題**：仍主要是 single-turn / chat format，互動有趣，但不等於把任務做完（約 40:58–41:28）。
2. **Agent 的差別**：給 goal → plan → 跟 environment 互動 → 收 feedback → 修正 → 達成目標或停止（42:21–43:00）。
3. **現實產品其實常不是完全自由的 autonomous agent**：很多仍是較 static、人工畫好的 agentic workflows（43:34–44:44）。
4. **再介紹 workflow building blocks**：LLM calls、verifiers、critics/judges、tools（44:54–45:38）。
5. **最後才介紹模式**：prompt chaining → routing → parallelization → orchestrator → evaluator/judge → verifier（45:41–47:24）。
6. coding agent 被拿來當具體例子：模型不是只回文字，而是看 repo、找檔案、修改、執行 command、讀結果再決定下一步（48:02 之後）。

這個順序正好可以解掉目前「single agent、multi-agent、chat-driven、work-driven 全混在一起」的問題。

**來源直接表述（短引文）**：
- 40:58 附近：`still single turn or just in the chat format`
- 41:08 附近：`they’re not accomplishing a task for you`

**我的歸納**：這裡真正的第一個對比不是「single-agent vs multi-agent」，而是 **「回答一回合」vs「把 goal 做完的閉環」**。因此 workshop 也應先建立這個差異，再談 workflow 與 multi-agent。

來源：
- Stanford 官方課程：https://cs329a.stanford.edu/
- Stanford Online 官方影片：https://www.youtube.com/watch?v=6YnLB0XbTnI
- 公開字幕時間碼索引（第三方，內容對應上面官方影片）：https://lilys.ai/en/notes/ai-agent-20260920/cs329a-self-improving-ai-agents
- 另一份字幕索引：https://ainotes.us/summary/550

---

## 1. 第 2 輪來源驗證結果

| 來源 | Stanford？ | 已驗證網址 | 可驗證章節／時間 | 本研究是否採用 |
|---|---|---|---|---|
| CS329A Self-Improving AI Agents | 是 | https://cs329a.stanford.edu/ | Lecture 1 官方 YouTube；40:58–48:36 是核心段落 | **核心** |
| CS329Z Engineering AI Agents, Fall 2026 | 是 | https://cs329z.stanford.edu/ | 公開 schedule；截至 2026-10-04 已發生 9/23、9/28、9/30；公開影片時間碼查不到 | **核心補充** |
| CS224V Agentic AI, Fall 2026 | 是 | https://web.stanford.edu/class/cs224v/ | 9/23 Introduction 等；錄影在 Canvas，公開時間碼查不到 | **重要補漏** |
| CS224N Spring 2024 Lecture 14: Reasoning and Agents | 是 | https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1246/ | 官方 YouTube；Agent 段約 30:04/30:41 起 | 採用 |
| CS25 V3: Generalist Agents in Open-Ended Worlds | 是（Stanford 課程，講者 Jim Fan / NVIDIA） | https://web.stanford.edu/class/cs25/past/cs25-v3/index.html | 官方 YouTube；約 1:02 起「兩隻小貓」 | 採用 |
| CS324 Winter 2022 / 2023 | 是 | https://stanford-cs324.github.io/winter2022/ / https://stanford-cs324.github.io/winter2023/ | 公開 lecture notes / assignment；**agent 專章查不到** | 用作反例／歷史背景 |
| Stanford HAI: What is Agentic AI? | 是 | https://hai.stanford.edu/ai-definitions/what-is-agentic-ai | 網頁定義，無影片時間碼 | 採用 |
| Stanford HAI: An Open-Source AI Agent for Doing Tasks on the Web | 是 | https://hai.stanford.edu/news/an-open-source-ai-agent-for-doing-tasks-on-the-web | 文章章節，無影片時間碼 | 採用 |
| Stanford HAI: Predictions for AI in 2025 | 是 | https://hai.stanford.edu/news/predictions-for-ai-in-2025-collaborative-agents-ai-skepticism-and-new-risks | 「General Contractor LLMs」段 | 採用比喻 |
| Stanford HAI: AI Coding Agents Fail at Teamwork | 是 | https://hai.stanford.edu/news/ai-coding-agents-fail-at-teamwork | 文章「Critical Skills」「Talk Is Cheap」等 | 採用警告 |
| Anthropic: Building Effective Agents | **不是 Stanford**；但為 CS329Z 9/28 required reading | https://www.anthropic.com/engineering/building-effective-agents | What are agents / Routing / Orchestrator-workers / Evaluator-optimizer 等章節 | **核心外部閱讀** |
| Anthropic: Effective Context Engineering for AI Agents | **不是 Stanford**；但為 CS329Z 9/28 additional reading | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Context engineering / Long-horizon / Compaction / Structured note-taking / Sub-agent architectures | **Owner 六點的重要外部證據** |
| Berkeley CS294/194-196 Large Language Model Agents | **不是 Stanford，是 UC Berkeley** | https://rdi.berkeley.edu/llm-agents/f24 | Fall 2024 course | 僅列出避免誤歸屬 |

### 驗證時發現的兩個重要修正

1. **CS329Z 是第一輪很容易漏掉、但 2026 現在最直接的 Stanford「Engineering AI Agents」課。** 它明確把範圍定成 `simple LLM pipelines → compound AI systems → autonomous agents`，而且課程安排直接包含 workflows-vs-agents、memory、multi-agent、handoffs、state transfer、model selection、cost/latency tradeoff。
2. **CS224V 在 2026 已直接改名為 Agentic AI。** 9/23 的 Introduction 以「LLMs hallucinate；如何變成 useful, dependable agents？」為問題開場。但它不是從「chat session 的協作痛點」開始。

---

# 2. Stanford 各來源到底怎麼講

## 2.1 CS329A — 最值得直接借敘事結構

### 2.1.1 它如何開場介紹 Agent？

**來源直接內容**：Lecture 1 前約 40 分鐘先回顧 LLM scaling、instruction tuning、RLHF、reasoning 與 test-time scaling，不是立刻談 Agent。約 40:58 才問「what’s next, and why is this course relevant?」，接著指出 LLM 作為 chatbot / reasoning model 仍主要是 single-turn 或 chat format；約 41:28 用 Claude Code、Deep Research 說明 agentic workflow 可以完成 end-to-end task。

時間軸：

- **40:58–41:28**：chat/reasoning model → 還不是 end-to-end task execution。
- **41:28–41:57**：Deep Research 找租屋資訊、跨網站分析、給 pros/cons；Claude Code/Codex 改檔案與測試。
- **42:21–42:45**：正式回答「LLM → Agent 的 transition 是什麼」：goal、plan、environment interaction、feedback、correction、stop/fail。
- **43:00**：可能還需要 external tools 與某種 memory 來追蹤正在做的 task。

來源：
- https://www.youtube.com/watch?v=6YnLB0XbTnI
- https://lilys.ai/en/notes/ai-agent-20260920/cs329a-self-improving-ai-agents

**我的歸納**：這是目前找到最接近 Owner「先從大家熟悉的 chat 開始，再指出 chat 的問題，最後才帶出 agent/workflow」的 Stanford 來源。但它批評的是 **chat 不會自動把 end-to-end task 做完**，不是一次把 Owner 列的六種 chat 痛點全講完。

### 2.1.2 它怎麼從 chat 過渡到 workflow？

這一段順序非常清楚：

#### A. 先把 Agent 定義成閉環

- **42:21**：給 goal。
- 計畫步驟。
- 與 environment 互動。
- 根據 feedback 修正。
- **42:45**：知道什麼時候 stop，或回報做不到。
- **43:00**：必要時用 tool 與 memory。

**我的歸納成 workshop 用語**：

> Chat：你問，我答。  
> Agent：你給 Goal，我會持續 Plan → Act → Observe → Correct，直到 Done / Fail。

這句是我的重寫，不是 Stanford 原話。

#### B. 再做一次 reality check：今天多數系統仍是 workflow

- **43:34**：很多情境仍是 very static workflows。
- **43:39**：例子是一個 model 產生 solution，另一個 model judging 是否接受。
- **44:01**：Deep Research 是多個 LLM calls 後 aggregate。
- **44:18–44:44**：對 open-ended problem，實務上常直接人工建 graph，模擬 human 怎麼做；feedback 也可能由 LLM evaluator 提供。

這裡很重要，因為它避免了「只要不是 chat 就叫 autonomous agent」的混亂。

#### C. 最後才列 pattern

順序幾乎可以直接變成教學 slide：

1. **LLM call** — 44:54
2. **Verifier** — 45:09
3. **Critic / Judge（LLM-as-judge）** — 45:13
4. **Tool calls** — 45:16
5. **Prompt chaining** — 45:41
6. **Routing** — 45:56
7. **Parallelization** — 46:02–46:16
8. **Orchestrator / LLM manager** — 46:27
9. **Evaluator / Judge** — 46:48
10. **Verifier / unit tests** — 47:03–47:24

來源：同上官方影片與字幕索引。

### 2.1.3 Owner 六個問題對照 CS329A

| Owner 問題 | CS329A 是否有講 | 判定 |
|---|---|---|
| 一人分飾多角色 | 43:39 明確把 solution generator 與 judge 拆成兩個 model；46:48 另有 evaluator/judge。但**沒有**說「同一 chat 同時當 PM/DEV/QA 會互相污染」 | **部分命中** |
| context 污染 | Lecture 1 沒直接講 context pollution；43:00 只提 memory 可能必要 | **查不到直接證據** |
| 球員兼裁判 | 43:39 generator 與 judge 分離；45:13 critic/judge；46:48 evaluator；47:03 verifier | **強命中概念，但「球員兼裁判」是我的比喻** |
| 不同問題用不同 model / effort，避免殺雞用牛刀 | 45:56 routing 依 task complexity 走複雜或簡單 workflow；37:35 Q&A 也談 larger reasoning model + smaller model summarize | **部分到強命中**；但「effort」不是它的原詞 |
| compact 後遺忘 | Lecture 1 查不到 | **查不到** |
| 換 session 看不到之前內容／交接 | 43:00 只說可能需要 memory 追蹤 task；沒有講產品層面的「新 session 看不到舊 chat」 | **部分命中解法，不是問題原句** |

### 2.1.4 對非工程師最好用的圖／比喻

CS329A 自己最適合的不是生活比喻，而是 **「chat → closed-loop work」圖**：

`Goal → Plan → Action → Environment → Feedback → Correct → Stop`

再接第二張：

`Generator → Evaluator/Judge → Accept / Retry`

第三張再變成：

`Orchestrator → Worker A / Worker B / Tools → Aggregate → Verify`

**我的歸納**：如果 workshop 第一段已經教過 Kanban / Ticket 流程，這裡最自然的是把 Agent 的 closed loop 對回那條流程，不需要先講 multi-agent。

---

## 2.2 CS329Z — 2026 最完整的工程 taxonomy，但開場不是 chat-first

官方課程：https://cs329z.stanford.edu/

### 2.2.1 開場方式

**來源直接內容（課程首頁 / 9/23 Lecture）**：

- 首頁把變化描述成 **monolithic language models → compound AI systems**。
- agentic systems 的範圍是 **simple LLM pipelines → compound AI systems → autonomous agents**。
- 9/23 第一堂主題：`What Are Agentic Systems?`，講 monolithic model、compound system、agent 的 spectrum，以及 decomposition / data / evaluation 三個工程挑戰。

章節／時間：
- 2026-09-23：`Foundations & Landscape Introduction — What Are Agentic Systems?`
- 公開影片時間碼：**查不到**。

**我的歸納**：CS329Z 比較像「系統設計課」，不是「一般人先從 ChatGPT 用法遇到問題」的敘事。因此適合拿來做後半段 taxonomy，不適合取代 CS329A 的 chat → task transition。

### 2.2.2 截至 2026-10-04 已經能確認的內容

- **9/23**：monolithic → compound → agents；decomposition/data/evaluation。
- **9/28**：`LLMs for Builders`：structured I/O、test-time compute、**context engineering、model selection、cost/latency tradeoffs**。
- **9/30**：RAG、grounding、hallucination。

注意：
- **10/5 之後仍是未來排程**（相對研究日 2026-10-04）。不能寫成「已經在課上講過」。
- 但公開 syllabus 已排定：
  - 10/12：workflows-vs-agents taxonomy、five composable workflow patterns、ReAct / plan-and-execute / reflection。
  - 10/14：memory。
  - 10/19：single vs multi-agent、orchestration、**handoffs and state transfer**、delegation/collaboration、coordination/error propagation。

所以這些只能標成 **課程計畫／scheduled content**，不是已授課證據。

### 2.2.3 這門課與 Owner 六點的關係

| Owner 問題 | CS329Z 本身 | 判定 |
|---|---|---|
| 一人分飾多角色 | 9/23 強調 decomposition；10/19 預定 single vs multi-agent / delegation | **有架構支持；完整 multi-agent 內容尚未授課** |
| context 污染 | 9/28 明列 context engineering，但 syllabus 沒寫「pollution」細節 | **部分命中** |
| 球員兼裁判 | 課程重視 evaluation；11/9 預定 LLM-as-Judge，但尚未授課 | **有方向；不能當已講完** |
| model / effort 選擇 | 9/28 明列 `model selection` 與 `cost/latency tradeoffs`、test-time compute | **直接命中** |
| compact 後遺忘 | 課程本身 9/28 schedule 沒寫 compaction 細節 | **靠指定外部閱讀才有直接證據** |
| session / handoff | 10/19 syllabus 明列 `handoffs and state transfer`，但尚未授課 | **排程直接命中，尚未發生** |

### 2.2.4 CS329Z 指定 Anthropic 閱讀：一定要標「外部來源」

#### Anthropic — Building Effective Agents

網址：https://www.anthropic.com/engineering/building-effective-agents

身份：**不是 Stanford 內容**；是 Stanford CS329Z 2026-09-28 的 required reading。

它提供最乾淨的 taxonomy：

1. `What are agents?`
   - workflow：LLM/tools 走 predefined code paths。
   - agent：LLM 動態決定自己的 process / tool use。
2. `When (and when not) to use agents`
   - 先用最簡單方案，只有必要時才增加 agentic complexity。
3. `Prompt chaining`
4. `Routing`
5. `Parallelization`
6. `Orchestrator-workers`
7. `Evaluator-optimizer`
8. `Agents`

特別對 Owner #4 有直接證據：`Routing` 章節明確舉例 **easy/common → 小且便宜模型；hard/unusual → 更強模型**。

特別對 Owner #3 有直接證據：`Evaluator-optimizer` 是一個 LLM 產生，另一個 LLM 評估並回饋。

**我的歸納**：可以把這篇當成 CS329A 後半段的「名稱標準化」。CS329A 是很好的講法；Anthropic 是很好的 pattern catalog。

#### Anthropic — Effective Context Engineering for AI Agents

網址：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

身份：**不是 Stanford 內容**；是 CS329Z 2026-09-28 的 additional reading。

這篇才是 Owner #2 / #5 / #6 最強的明文來源：

- `Context engineering vs. prompt engineering`：早期很多 LLM use case 是 one-shot；agent 跨 multi-turn / long horizon 後，要管理 system instructions、tools、MCP、external data、message history 等整個 context state。
- `Why context engineering is important`：token 變多時會出現 context rot；context 是有限 attention budget。
- `Context engineering for long-horizon tasks`：長任務即使 context window 變大，仍會面對 **context pollution / relevance**。
- `Compaction`：把接近上限的 conversation 摘要後重新開 context；過度 aggressive compaction 會丟掉當下看似不重要、之後卻關鍵的細節。
- `Structured note-taking`：把 state 寫到 context 外的 persistent memory；context reset 後再讀回；可維持跨 session project state。
- `Sub-agent architectures`：specialized sub-agents 使用 clean context windows；main agent 只拿 distilled summary，達到 separation of concerns。

**我的歸納**：如果 workshop 要講「為什麼一個長 chat 越做越亂」與「為什麼拆 sub-agent / handoff」，應引用這篇，但 slide 上必須寫清楚：**Anthropic；Stanford CS329Z assigned reading**，不能標成 Stanford 教授原話。

---

## 2.3 CS224V — 2026 新版 Agentic AI，值得補進 survey

官方首頁：https://web.stanford.edu/class/cs224v/  
官方 schedule：https://web.stanford.edu/class/cs224v/schedule.html

### 它如何開場？

2026-09-23 Introduction 的公開描述是：

- LLMs hallucinate。
- 問題是如何把 LLM 變成 useful, dependable agents。
- 接著導入 computational thinking，以及 carefully designed LLM-based algorithms。

時間點：
- 課程章節：**9/23 Introduction**。
- 公開錄影：官方頁說 recordings 在 Canvas。
- 公開影片時間碼：**查不到**。

### 是否從 chat 限制出發？

**沒有。** 它從 hallucination / dependability 出發，不是從「聊天視窗用久了會失控」出發。

### single / multi-agent / workflow？

截至 2026-10-04，公開 schedule 已完成的前三堂是 Introduction、Knowledge Curation、Research Project Ideas。後面才排到 reactive agents、deep researcher、task-oriented agents、coding agents等。

沒有找到它在公開頁面用 Anthropic 那套 workflows-vs-agents taxonomy。

### Owner 六點

六點大部分 **查不到直接對應**。它最強的是可靠性、grounding、formal methods、hallucination，而不是 chat/session/multi-agent coordination。

**適合 workshop 的用途**：拿一句非常直覺的問題當輔助：

> 「LLM 會 hallucinate；怎麼把它變成 useful, dependable agent？」

但不要拿它當 multi-agent 敘事主軸。

---

## 2.4 CS224N Lecture 14 — Agent 是「在環境中行動」，不是 multi-agent 教學

官方課程：https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1246/  
官方 YouTube：https://www.youtube.com/watch?v=I0tj4Y7xaOQ

官方課程頁：2024-05-16 `Reasoning and Agents`, Shikhar Murty。  
官方 YouTube description 把內容分成 Reasoning in Language Models 與 Language Model Agents。  
第三方時間索引：https://podwise.ai/episodes/3192404

### 開場與過渡

- 00:05：課程導入。
- 04:01：reasoning。
- 20:24：reasoning 的 faithfulness / robustness。
- **30:04**：章節 `Language Model Agents and Instruction Following`。
- 另一個細分 transcript 把正式 agent 定義段標在約 **30:41**。

它的過渡是：

`LLM 能不能 reasoning？ → 能不能把 instruction 轉成一連串 actions，在 environment 裡完成任務？`

而不是：

`chat 太長會亂 → 所以拆 multi-agent`。

### 它對 single agent 問題講得最好的是什麼？

- 約 38:49 後：把 agent 看成 instruction + observations + past trajectory → next action 的 policy。
- MiniWoB → WebArena → WebLINX，任務越長越真實，performance 越差。
- 約 46:55 後談 synthetic demonstrations / multimodal agents。
- 後段展示很基本的 web 操作錯誤，例如把 email 放進 password 欄位，且難以恢復。

**我的歸納**：CS224N 提供的是 Owner 清單外、但很值得留的一個 failure mode：

> **長 horizon 下，Agent 不只是「會不會回答」；它必須持續正確地感知、規劃、執行、復原。**

### Owner 六點對照

- 一人分飾多角色：查不到。
- context 污染：查不到。
- 球員兼裁判：查不到。
- 不同 model / effort routing：查不到。
- compact 遺忘：查不到。
- session handoff：查不到。

所以不應把 CS224N 硬說成支援 Owner 六點。

---

## 2.5 CS25 — 最適合非工程師的比喻：兩隻小貓

官方課程：https://web.stanford.edu/class/cs25/past/cs25-v3/index.html  
官方影片：https://www.youtube.com/watch?v=wwQ1LQA3RCU  
公開時間戳 transcript：https://lawwu.github.io/transcripts/wwQ1LQA3RCU.html

講座：Jim Fan, NVIDIA AI, `Generalist Agents in Open-Ended Worlds`, 2023-10-24。

### 開場方式

- **約 1:02**：`story of two kittens`。
- 兩隻幼貓一隻能自己行動與探索，另一隻只被動接收相同視覺刺激；用來說明 active interaction 的重要性。
- **約 2:45–2:55**：從純文字／passive learning 轉向 active agent、environment feedback loop。
- **約 4:04–4:52**：AlphaGo 類 agent 很強，但只會一件事、單一 objective、固定 world，無法廣泛 generalize。
- **約 5:04**：開始定義 generalist agent 的特徵。

### 適合非工程師的圖／比喻

這是整份 Stanford survey 裡最強的生活型比喻：

> **Passive kitten vs Active kitten**  
> 只「看過世界」不等於能「在世界裡行動並從結果學習」。

另一個可以抽象成：

> AlphaGo = 世界冠軍，但只會下那個棋盤。  
> Generalist Agent = 要能面對 open-ended goals 與不同環境。

### Owner 六點

幾乎都沒有直接講。它針對的是 narrow specialist agent 的 limitation，不是 chat collaboration / context / session 問題。

**所以它適合當比喻，不適合當 Owner 六點的證據。**

---

## 2.6 CS324 — 不要硬塞成 agent 課

### Winter 2022

首頁：https://stanford-cs324.github.io/winter2022/  
Lecture notes：https://stanford-cs324.github.io/winter2022/lectures/

課程內容是 Large Language Models 的 capabilities、harms、data、modeling、training、parallelism、scaling、adaptation 等。

**Agent 專章：查不到。**

Introduction 有一個對 workshop 很好用、但不是 agent 的概念：單一大型 LM 是 `jack of all trades`，可以做很多 task，但不代表每個都做到最好。

### Winter 2023

首頁：https://stanford-cs324.github.io/winter2023/  
Assignment：https://stanford-cs324.github.io/winter2023/assignment/

Introduction assignment 的 `Prompt development` 明確說 prompting 可能很神奇，但也可能 **brittle**，需要 time / effort / creativity。

**我的歸納**：CS324 能用來支援「單一 prompt / prompt engineering 本身很脆弱」，但不能拿來支援「所以應該 multi-agent」。那個推論不是 CS324 課程原話。

Owner 六點：基本上都查不到直接對應。

---

# 3. Stanford HAI：最適合給非工程師的簡單說法

## 3.1 What is Agentic AI? — 最短的 chat → agent 定義

網址：https://hai.stanford.edu/ai-definitions/what-is-agentic-ai

**來源直接內容**：它直接把 purely reactive chatbot 與 agentic AI 對比：前者 turn-by-turn 回應；後者是 ongoing task execution，會拆 objective、協調 steps、使用 tools、根據 feedback 調整。

章節：整頁 `What is Agentic AI?`  
影片時間：不適用。

**我的歸納**：對非工程師可以濃縮成：

> Chatbot 的單位是「一回合回答」；Agent 的單位是「一個持續到完成的任務」。

這句是我的教學重寫。

## 3.2 An Open-Source AI Agent for Doing Tasks on the Web — 「chatbot → action bot」

網址：https://hai.stanford.edu/news/an-open-source-ai-agent-for-doing-tasks-on-the-web

文章開場先說 LLM 已經能幫人寫 email、essay、code，接著說開發者正在把 **chatbots 變成 action bots**：訂機票、跨網站找資訊、整理報表、建立 GitHub repo。

這是一個非常適合 workshop 的過渡句，因為完全不需要先解釋 agent architecture。

章節：文章 opening + `Learning Through Interaction`  
影片時間：不適用。

## 3.3 「General Contractor LLM」— 最好懂的 multi-agent 比喻

網址：https://hai.stanford.edu/news/predictions-for-ai-in-2025-collaborative-agents-ai-skepticism-and-new-risks

章節：`General Contractor LLMs`，Russ Altman。

來源描述的是一個面向 human customer 的 general-contractor LLM，把問題 subcontract 給不同 expert LLMs，再收回結果。

**我的歸納成 workshop 圖**：

`Owner / Human → General Contractor → 專家 A / 專家 B / 專家 C → General Contractor → Owner`

這比直接丟「orchestrator-worker」這個術語給非工程師更好懂。

## 3.4 Multi-agent 不是一定比較好 — Stanford HAI 2026 CooperBench

網址：https://hai.stanford.edu/news/ai-coding-agents-fail-at-teamwork

章節：`Critical Skills`, `Talk Is Cheap`。

來源指出在 CooperBench 的兩 agent coding collaboration 實驗中，兩個 agent 合作可能比單一 agent 更差，問題集中在 coordination、overlap、溝通後仍做出互相衝突的動作。

**我的歸納**：這一頁很重要，因為 workshop 不應留下「一隻 Agent 不夠 → 多開幾隻就比較強」的錯誤印象。正確訊息應是：

> **拆 Agent 是架構選擇，不是能力加法。**  
> 只有當角色邊界、state、handoff、驗收規則清楚，拆分才可能帶來好處。

後一句是我的歸納，不是文章原句。

---

# 4. Owner 六個問題：最後驗證矩陣

符號：
- **✓ 直接**：Stanford 自己有直接內容。
- **△ 部分**：概念相近，但不是 Owner 的說法。
- **Ext ✓**：Stanford 課程指定的外部 reading 有直接內容；不能標成 Stanford 原話。
- **—**：查不到。

| Owner 批評 | Stanford 直接證據 | Stanford 指定外部 reading | 最終判定 |
|---|---|---|---|
| 1. 一人分飾多角色 | CS329A 43:39 generator / judge 分離；CS329Z 有 decomposition，未來排程有 delegation | Anthropic Context Engineering：specialized sub-agents + separation of concerns | **△ / Ext ✓**。可以教，但「一人分飾 PM/DEV/QA」是 Owner 的教學比喻 |
| 2. context 污染 | CS329Z 9/28 有 context engineering；但公開 syllabus 沒細講 pollution | Anthropic Context Engineering 直接談 context rot / pollution / attention budget | **Ext ✓ 最強；Stanford 本身只部分** |
| 3. 球員兼裁判 | CS329A 43:39、45:13、46:48、47:03 明確拆 generator、judge、verifier | Anthropic Evaluator-optimizer 更明確 | **✓ 概念強命中**；「球員兼裁判」是自己的比喻 |
| 4. 不同問題選不同 model / effort，避免殺雞用牛刀 | CS329Z 9/28：model selection + cost/latency tradeoffs；CS329A 45:56 routing by complexity；37:35 larger reasoner + smaller summarizer | Anthropic Routing 明講 easy/common → small cheap model；hard/unusual → stronger model | **✓ / Ext ✓** |
| 5. compact 後遺忘 | CS329A Lecture 1 無；CS329Z schedule 未提供細節 | Anthropic Compaction：過度壓縮可能丟 subtle but critical context | **Stanford 直接：查不到；Ext ✓** |
| 6. 換 session 看不到舊內容／handoff | CS329A 43:00 說需要 memory keep track；CS329Z 10/19 預定 handoffs/state transfer（尚未授課） | Anthropic Structured note-taking：context reset 後讀 notes；maintain state across sessions | **△ / Ext ✓**；「ChatGPT 新 session 看不到舊內容」這個產品行為不是 Stanford 課程主張 |

### 對 Owner 原六點需要做的文字修正

若投影片要保持可考證，建議不要寫：

> Stanford 說單一 Agent 有這六個問題。

應寫：

> **我們在實務上會遇到這六類協作問題；Stanford 的 Agent 課程與其指定 reading 提供了其中多數問題的架構解法與理論背景。**

這樣才不會把自己的教學框架錯掛到 Stanford 名下。

---

# 5. single agent / multi-agent / workflow / agent：Stanford survey 後最乾淨的定義

這一段是**我的統整**；括號內標來源。

## Layer 0 — Chat / single LLM call

輸入 context → LLM → 回答。

- 適合單次、界線明確的問題。
- CS329A 40:58 的問題意識：chat format 本身不等於 end-to-end task execution。
- CS324 2023：prompting 本身可能 brittle。

## Layer 1 — Agent loop

`Goal → Plan → Act → Observe/Feedback → Correct → Stop`

- 這是 CS329A 42:21–43:00 最直接的 agent definition。
- 關鍵不是「多個 model」，而是 **goal-directed loop**。

## Layer 2 — Workflow

人工先畫好大致的 path / graph，再把 LLM / tools / validators 放進去。

- CS329A 43:34：現在很多 real-world system 還是 static agentic workflow。
- Anthropic：workflow = predefined code paths。

## Layer 3 — Workflow patterns

從簡單到複雜：

`Prompt chaining → Routing → Parallelization → Orchestrator-workers → Evaluator-optimizer`

- CS329A 45:41–47:24 已經照近似這個順序教。
- Anthropic `Building Effective Agents` 提供標準化圖與名稱。

## Layer 4 — Multi-agent

不是「workflow 的下一級一定要升級」，而是**某些角色／context／能力需要被隔離或平行化時的一種架構**。

可以拆的理由包含：

- clean context / context isolation（Anthropic context-engineering reading）
- specialized roles / separation of concerns
- parallel exploration
- 不同 model / cost / capability routing
- independent evaluator / verifier

但代價是：

- handoff / state transfer
- coordination
- duplicated work
- error propagation
- cost / latency

Stanford CS329Z 已把這些列在 2026-10-19 的 `Multi-Agent Systems` 排程；Stanford HAI CooperBench 則直接提醒 collaboration 可能讓能力下降。

---

# 6. 建議 Agent 101 投影片的新敘事順序

這一段是**我的 workshop 建議**，不是來源原話。

## Slide A — 大家現在其實都在「Chat」

畫面：一個 chat window。

文案可極簡：

> 你問一句，AI 回一句。  
> 很聰明，但工作的單位仍是「conversation turn」。

底下小字可引 CS329A 40:58、HAI `What is Agentic AI?`。

## Slide B — 但「工作」不是一個回答

把上一段已教過的 Kanban 流程搬回來：

`Goal → Ticket → Dev → Review → QA → Product Check → Done`

問觀眾：

> 如果只有一個 chat window，誰在維持這整條流程？

然後再展開 Owner 六個實務問題：角色混雜、context、self-review、model routing、compaction、session/handoff。

這六點可以標成「我們的實務問題整理」，不要冒充 Stanford 六點。

## Slide C — Agent 的第一個變化不是「多 Agent」

直接用 CS329A：

`Chat: Prompt → Answer`

變成：

`Agent: Goal → Plan → Act → Feedback → Correct → Stop`

一句話：

> **從回答問題，變成持續把 Goal 做完。**

## Slide D — 現實世界通常先用 Workflow

畫一張固定 graph：

`Input → Planner → Worker → Check → Retry / Done`

搭 CS329A 43:34–44:44：很多 production system 還是 static / hand-constructed workflow。

這會避免把「Agent = 完全自主」講得太滿。

## Slide E — Workflow 其實有幾個常見積木

由左到右增加複雜度：

1. Chaining
2. Routing
3. Parallel
4. Orchestrator → Workers
5. Generator ↔ Evaluator / Verifier

來源：CS329A 45:41–47:24 + Stanford CS329Z 指定 Anthropic reading。

## Slide F — 什麼時候才需要拆多 Agent？

不要說「一隻 Agent 不夠」。改問：

> **什麼東西需要被隔離？**

四格即可：

- **Role**：Dev ≠ Reviewer
- **Context**：每個角色只拿需要的資訊
- **Model**：簡單工作便宜 model；困難工作強 model
- **Execution**：可平行的就平行

再補一句：

> 多 Agent 不是免費升級；handoff 與 coordination 本身會製造新問題。

用 Stanford HAI CooperBench 做反例。

## Slide G — 接回你前面已經教過的軟體流程

最後才把 Agent 掛到原流程：

`Goal`  
`↓`  
`PO/PM Agent → Ticket Refinement`  
`↓`  
`Dev Agent`  
`↓`  
`PR Reviewer Agent`  
`↓`  
`QA / Verifier`  
`↓`  
`Product / Goal Check`  
`↓`  
`Done`

此時觀眾已經先理解了：

- 為什麼不是一直 chat 就好；
- agent 跟 chat 的差別；
- workflow 跟 agent 的差別；
- 為什麼「拆角色」只是其中一種工程手段；
- multi-agent 不是魔法。

---

# 7. 可直接拿來用的非工程師比喻

以下「來源比喻」與「我的教學比喻」分開。

## 來源有的比喻

### A. Active kitten vs passive kitten — CS25 Jim Fan

來源：https://www.youtube.com/watch?v=wwQ1LQA3RCU  
時間：約 1:02 起。

用途：解釋 **只讀／只回文字** 跟 **實際行動、拿 environment feedback** 的差別。

### B. General Contractor LLM — Stanford HAI / Russ Altman

來源：https://hai.stanford.edu/news/predictions-for-ai-in-2025-collaborative-agents-ai-skepticism-and-new-risks  
章節：`General Contractor LLMs`。

用途：解釋 orchestrator / expert agents。

### C. Unit test 作為 verifier — CS329A

來源：https://www.youtube.com/watch?v=6YnLB0XbTnI  
時間：47:03–47:24。

用途：解釋「judge 不是感覺；能客觀驗證時最好用 verifier」。

## 我的教學比喻

### A. Chat = 找一個超強同事坐你旁邊

什麼都問同一個人：需求、開發、review、QA，最後還問他自己「你剛才做得對嗎？」

用來帶 Owner 的「一人分飾多角＋球員兼裁判」。

### B. Workflow = SOP

先把「什麼時候交給誰、什麼算過關」寫清楚。LLM 可以出現在 SOP 的不同節點。

### C. Multi-agent = 專案團隊，不是多開幾個聊天室

真正的問題不是 agent 數量，而是：

- responsibility
- context boundary
- handoff artifact
- acceptance criteria
- verifier

這也能直接接回前一段 workshop 的 Ticket / AC / DoD / PR / QA。

---

# 8. 特別回答：各來源如何從「chat 的限制」過渡到「multi-agent / workflow」？

## CS329A — **有完整過渡；最推薦**

實際順序：

`LLM/chat 還是在 chat format，沒有替你完成 task`  
→ `Claude Code / Deep Research 可以 end-to-end workflow`  
→ `Agent = goal + planning + environment + feedback + stop`  
→ `現實仍多是 static agentic workflow`  
→ `generator / judge、parallel aggregate`  
→ `prompt chain / route / parallelize / orchestrate / evaluate / verify`

**這就是 workshop 最應該模仿的 spine。**

## CS329Z — **不是 chat-first；是 architecture-first**

`monolithic LM`  
→ `compound AI systems`  
→ `autonomous agents`  
→ 後續課程再拆 model selection、context、tool use、workflow patterns、memory、multi-agent。

適合 taxonomy，不適合當大眾敘事開頭。

## CS224V — **reliability-first**

`LLM hallucination`  
→ `useful dependable agent`  
→ computational thinking / retrieval / formal methods / reactive agents。

不是 chat→multi-agent。

## CS224N — **reasoning-first**

`LLM reasoning`  
→ `instruction following`  
→ `agent acts in environment`  
→ browser benchmarks / long-horizon failures。

不是 chat→workflow taxonomy。

## CS25 — **embodiment / interaction-first**

`passive perception`  
→ `active interaction + feedback`  
→ `narrow agent limitation`  
→ `generalist agents`。

非常適合比喻，但不處理 chat session 與 multi-agent orchestration。

## CS324 — **FM / prompting-first**

`foundation model / prompting`  
→ prompting brittleness / adaptation。

沒有查到 agent / multi-agent 的正式過渡。

## Stanford HAI — **最通俗的短過渡**

`chatbot`  
→ `action bot` / `ongoing task execution`

再透過 `general contractor` 比喻可以自然帶到 expert agents。但這是幾篇不同 HAI 文章拼成的教學路徑，不是同一堂課的原始順序。

---

# 9. 非 Stanford，但容易被誤認為 Stanford 的來源

## UC Berkeley — CS294/194-196 Large Language Model Agents, Fall 2024

官方：https://rdi.berkeley.edu/llm-agents/f24

- Instructor: Dawn Song（UC Berkeley）等。
- 明確是 Berkeley RDI / UC Berkeley 課程。
- **不是 Stanford。**

如果之後做 Berkeley round，可以獨立分析；本份不拿它來證明「Stanford 怎麼教」。

## BAIR — The Shift from Models to Compound AI Systems

Stanford CS329Z 9/23 把它列為 reading，但 BAIR = Berkeley AI Research。

所以：
- 「Stanford CS329Z 指定閱讀」：對。
- 「Stanford 提出 compound AI systems」：錯。

## Anthropic — Building Effective Agents / Effective Context Engineering

同理：
- 是 CS329Z 指定／補充 reading。
- 不是 Stanford 作者、不是 Stanford publication。

---

# 10. 最終建議：這段 workshop 不要叫「為什麼一隻 Agent 不夠」

**我的建議**：這個標題本身會逼敘事太早跳到 multi-agent。

比較乾淨的兩段是：

### Part 2 — 從 Chat 到 Work

核心問題：

> 為什麼「一直跟 AI 聊」不等於「工作會可靠地走到 Done」？

內容：
- chat turn vs task execution
- long-horizon / context / verification / role conflict
- agent loop

### Part 3 — 從一個 Agent 到一條 Agent Workflow

核心問題：

> 怎麼把 Goal → Ticket → Dev → Review → QA → Done 真的交給 AI 系統？

內容：
- workflow vs agent
- chaining / routing / parallelization
- orchestrator-worker
- evaluator / verifier
- 什麼時候才拆 multi-agent
- context isolation / model specialization / handoff
- multi-agent coordination risk

### 一句話版主線

> **先別問要幾隻 Agent。先問：我們是只要一個回答，還是要一個能把 Goal 推到 Done 的工作系統？**

這句是我的歸納。

---

# 11. 最值得直接引用／截圖的來源清單

1. **CS329A Lecture 1（首選）**  
   https://www.youtube.com/watch?v=6YnLB0XbTnI  
   - 40:58–41:28：chat format ≠ task completion
   - 42:21–43:00：goal / plan / action / feedback / stop / memory
   - 43:34–44:44：static agentic workflows、generator + judge、deep research aggregate
   - 45:41–47:24：chaining / routing / parallel / orchestrator / evaluator / verifier

2. **CS329Z Engineering AI Agents**  
   https://cs329z.stanford.edu/  
   - 9/23 `What Are Agentic Systems?`
   - 9/28 `context engineering, model selection, cost/latency tradeoffs`
   - 10/12 / 10/19 為未來排程（截至 2026-10-04），不可說已授課

3. **Anthropic — Building Effective Agents（CS329Z required reading；非 Stanford）**  
   https://www.anthropic.com/engineering/building-effective-agents  
   - `What are agents?`
   - `Routing`
   - `Orchestrator-workers`
   - `Evaluator-optimizer`

4. **Anthropic — Effective Context Engineering（CS329Z additional reading；非 Stanford）**  
   https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents  
   - `Why context engineering is important`
   - `Context engineering for long-horizon tasks`
   - `Compaction`
   - `Structured note-taking`
   - `Sub-agent architectures`

5. **Stanford HAI — What is Agentic AI?**  
   https://hai.stanford.edu/ai-definitions/what-is-agentic-ai  
   - 最簡單的 reactive chatbot vs ongoing task execution 定義

6. **Stanford HAI — General Contractor LLMs**  
   https://hai.stanford.edu/news/predictions-for-ai-in-2025-collaborative-agents-ai-skepticism-and-new-risks  
   - 非工程師 multi-agent 比喻

7. **Stanford HAI — AI Coding Agents Fail at Teamwork**  
   https://hai.stanford.edu/news/ai-coding-agents-fail-at-teamwork  
   - 用來防止「multi-agent 一定更好」的錯誤結論

8. **CS25 — Generalist Agents in Open-Ended Worlds**  
   https://www.youtube.com/watch?v=wwQ1LQA3RCU  
   - 約 1:02 起：two kittens

9. **CS224N Lecture 14 — Reasoning and Agents**  
   https://www.youtube.com/watch?v=I0tj4Y7xaOQ  
   - 約 30:04 / 30:41 起：Language Model Agents
   - 適合補 long-horizon planning / recovery failure，不適合硬套 Owner 六點

10. **CS324 2023 Introduction Assignment**  
    https://stanford-cs324.github.io/winter2023/assignment/  
    - `Prompt development`：prompting can be brittle

---

# 12. 最終判定

如果目標是重寫 Agent 101 這兩段，我會採用以下來源分工：

- **敘事骨架：CS329A Lecture 1**
- **taxonomy：CS329A + Anthropic Building Effective Agents（標明為 Stanford 指定外部閱讀）**
- **context / compact / session / sub-agent：Anthropic Effective Context Engineering（同樣標明外部閱讀）**
- **2026 Stanford 課程架構補強：CS329Z**
- **一般人定義與比喻：Stanford HAI + CS25**
- **single agent long-horizon failure：CS224N**
- **prompt brittleness 歷史背景：CS324**
- **multi-agent 反例：Stanford HAI CooperBench**

最重要的內容修正是：**不要聲稱 Stanford 有一堂課把 Owner 六個 chat 問題逐項列出。沒有。** Stanford 最直接支持的是「chat ≠ end-to-end task」「agent 是 goal-feedback loop」「實務上常用 workflow」「generator/evaluator/verifier 分離」「routing/orchestration」；context pollution、compaction loss、cross-session state 的直接說法主要來自 Stanford CS329Z 採用的 Anthropic context-engineering reading。
