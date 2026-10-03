# 第 2 輪修訂：從聊天的限制，走到看板上的 Agent 分工

**核查結果：第 1 輪列出的 12 個網址都能開啟，所引章節也存在；需要修正的是幾處「來源說了什麼」的判讀。** 這些來源都是文章或文件，所以以下用章節、步驟定位。Notion 頁面雖嵌有影片，但本輪沒有核實影片時間點，**不標示影片時間碼**。

## 一、逐一核對第 1 輪來源

| 來源與核實位置 | 修正後可引用的內容 |
|---|---|
| [OpenAI Academy〈Workspace agents〉，開頭、〈What is an agent?〉](https://openai.com/academy/workspace-agents/) | 確實從起草、摘要等一次性聊天，過渡到需要共用系統、標準交接的重複工作。**不能用它證明「換 session 會失憶」**；第 1 輪對照表的⑥應刪除。 |
| [Anthropic〈Effective harnesses for long-running agents〉，開頭、〈The long-running agent problem〉、〈Getting up to speed〉](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | 輪班工程師的比喻、跨 session 沒有先前記憶、進度檔與工作紀錄都查得到。另須補充：文章註腳說「initializer agent／coding agent」在該案例主要是**不同起始提示的 session**，不能逕稱為兩種獨立專家 Agent。 |
| [Anthropic〈Building effective agents〉，〈What are agents?〉、〈When (and when not) to use agents〉、〈Building blocks, workflows, and agents〉及各 workflow 小節](https://www.anthropic.com/engineering/building-effective-agents) | 章節與 routing、parallelization、evaluator-optimizer 例子都存在。**Evaluator-optimizer 是兩次 LLM 呼叫**；它不等於必須建立兩個獨立 Agent。 |
| [OpenAI〈A practical guide to building agents〉，〈Selecting your models〉、〈Orchestration〉、〈When to consider creating multiple agents〉、〈Multi-agent systems〉](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) | 確實建議先發揮單一 Agent 的能力，再依指示複雜、工具選擇錯誤等情況拆分。第 1 輪漏了〈Selecting your models〉：它直接談不同工作選不同模型。 |
| [Notion〈How to set up Claude agents on your team’s Notion task board〉，〈What you’ll build〉、步驟 2–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board) | Ready 卡觸發、卡片留進度、PR 由隊友審查都存在。步驟 5 還**明說**：工作需要不同指示、觸發條件或存取權限時，可建立多個 Agent，以免一個 workflow 的指示漏進另一個。 |
| [Anthropic〈Effective context engineering for AI agents〉，〈Why context engineering is important…〉、〈Context engineering for long-horizon tasks〉下的 Compaction、Structured note-taking、Sub-agent architectures](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | context pollution、過度壓縮可能丟失細節、外部筆記與子 Agent 的不同用途都存在。**文章沒有說 compact 必然造成失憶**。 |
| [OpenAI API〈Reasoning models〉，〈Reasoning effort〉](https://developers.openai.com/api/docs/guides/reasoning) | 章節與 effort 設定存在；它證明的是可按支援的模型設定推理投入程度，**不是一般聊天產品完全無法選 effort**的證據。 |
| [Microsoft〈Execute tasks with Planner agent〉，〈Assign tasks to Planner Agent〉、〈Track Planner Agent’s progress on tasks〉](https://support.microsoft.com/en-us/planner/copilot/execute-tasks-with-planner-agent) | 指派卡片、排隊／進行中／需補資料／完成待審都存在。文件明說 Agent 不會替使用者把任務標成完成，須由人審查後完成。 |
| [LangChain〈Benchmarking Multi-Agent Architectures〉，〈Motivators for multi-agent systems〉、〈Results & Analysis〉、〈Improvements to supervisor〉](https://www.langchain.com/blog/benchmarking-multi-agent-architectures) | 「傳話遊戲」與主管轉述出錯確實存在。這是其**特定基準測試與架構**的結果，不宜概括為所有多 Agent 交接都較差。 |
| [Anthropic〈How we built our multi-agent research system〉，〈Benefits of a multi-agent system〉、〈Architecture overview for Research〉、〈Prompt engineering and evaluations for research agents〉](https://www.anthropic.com/engineering/multi-agent-research-system) | 平行研究的優勢、成本、依賴性限制都存在。第 1 輪漏了很貼題的〈Scale effort to query complexity〉：文章描述如何按問題難度調整 Agent 與工具呼叫數。 |
| [Salesforce Developers〈Build Headless Agents with the Agent API〉，開頭、〈Building complex, autonomous workflows〉](https://developer.salesforce.com/blogs/2025/04/build-headless-agents-with-the-agent-api) | 確實使用 *chat-driven agents* 一詞，並以無需使用者介面觸發的 headless Agent 對照。**沒有提出「chat-driven／work-driven」這組通用分類**。 |
| [GitHub Docs〈Using Copilot cloud agent on GitHub〉，〈Assigning an issue to Copilot〉](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github) | 指派 issue 的流程存在。此節還寫明可選模型，以及在模型支援時選推理等級；第 1 輪漏了這項直接相關的例子。 |

**本輪補入兩份重要來源：**[OpenAI Academy〈Using skills〉，〈What are skills?〉、〈Why use skills?〉](https://openai.com/academy/skills/)指出，反覆重貼相同步驟可先做成可重用的 skill；[Microsoft Azure Architecture Center〈AI agent orchestration patterns〉，〈Start with the right level of complexity〉、〈Overview〉、〈Choose a pattern〉](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)把單次呼叫、單一 Agent、多 Agent 放在同一個選擇階梯，並列出分工與協調成本。這兩份補足了「聊天遇到問題」與「立刻上多 Agent」之間的一段。前一句是**我的取材歸納**。

## 二、六個聊天痛點：證據能支持到哪裡

下表的「課堂說法」都是**我的歸納**；右欄標明來源實際談到的章節與界線。

| Owner 提的痛點 | 可用的課堂說法（我的歸納） | 來源實際支持的內容 |
|---|---|---|
| 一人分飾多角色 | 同一段對話要它規劃、執行、審查，角色與指示會愈堆愈多；若各段工作需要不同規則，再考慮分工。 | [OpenAI 指南，〈When to consider creating multiple agents〉](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)以複雜指示、工具過載作拆分條件；[Notion，步驟 5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)以不同指示、觸發與權限作條件。**「一人分飾多角」是比喻，不是來源用語。** |
| context 污染 | 不相關的歷史、工具結果或別項工作的規則混進目前任務，可能使重點難找、指示互相干擾。 | [Anthropic〈Effective context engineering〉，〈Why context engineering is important…〉、〈Context engineering for long-horizon tasks〉](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents/)談注意力與 context pollution；[Notion，步驟 5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)明說避免不同 workflow 的指示互相滲入；[LangChain，〈Improvements to supervisor〉](https://www.langchain.com/blog/benchmarking-multi-agent-architectures)提供交接訊息使子 Agent context 雜亂的案例。 |
| 球員兼裁判 | 產出後要有可辨認的審查關卡；必要時交給另一個評估呼叫或人。 | [Anthropic〈Building effective agents〉，〈Workflow: Evaluator-optimizer〉](https://www.anthropic.com/engineering/building-effective-agents)示範一個呼叫產出、另一個呼叫評估；[Notion，步驟 4](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)要求隊友審 PR；[Microsoft Planner，〈Track Planner Agent’s progress on tasks〉](https://support.microsoft.com/en-us/planner/copilot/execute-tasks-with-planner-agent)把完成待審留給人。**查不到這些來源證明「同一 Agent 自評一定不可靠」的定律。** |
| model／effort 殺雞用牛刀 | 每件工作都沿用同一套配置，可能多花成本；流程可按任務分流或調整投入。 | [Anthropic〈Building effective agents〉，〈Workflow: Routing〉](https://www.anthropic.com/engineering/building-effective-agents)舉簡單／困難問題分派給不同模型；[OpenAI API，〈Reasoning effort〉](https://developers.openai.com/api/docs/guides/reasoning)說明 effort；[Anthropic〈Multi-agent research〉，〈Scale effort to query complexity〉](https://www.anthropic.com/engineering/multi-agent-research-system)描述依題目難度調整資源。**不可說聊天「沒辦法」選**：例如 [GitHub Docs，〈Assigning an issue to Copilot〉](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github)就提供模型與支援時的推理等級選項。 |
| compact 後遺忘 | 摘要幫工作接續，但壓得太短時，當時看似次要的細節可能不見。 | [Anthropic〈Effective context engineering〉，〈Compaction〉、〈Structured note-taking〉](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)直接談效益、遺漏風險與外部筆記；[Anthropic〈Effective harnesses〉，〈The long-running agent problem〉](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)記載即使有 compaction，交給下一段工作的指示也未必夠清楚。 |
| 換 session 的交接 | 新對話不應靠「它應該記得」來接工作；下一手需要讀得懂的任務、決定、進度與成果。 | [Anthropic〈Effective harnesses〉，開頭、〈Getting up to speed〉](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)用輪班工程師比喻，並讓新 session 讀進度與紀錄；[Notion，〈How do External Agents work in Notion?〉、步驟 3–4](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)把更新與成果留在任務卡上。 |

## 三、來源如何完成「聊天限制 → workflow／多 Agent」的過渡

這裡的短引句是**來源原文**；「可借用的轉場」是**我的中文歸納**，並非來源逐字稿。

1. **OpenAI Academy：從熟悉的聊天用途轉到重複工作。** 開頭先列起草、摘要、腦力激盪與問答，再提出工作需要共用系統、標準交接、固定成果；接著寫：“That’s where workspace agents in ChatGPT fit.” 〈What is an agent?〉再以觸發、流程與工具解釋 Agent，並保留一次性探索適合一般聊天的情境。**可借用的轉場：**「這次問完就好，還是下週有人要照同一套方法接著做？」[OpenAI Academy〈Workspace agents〉，開頭、〈What is an agent?〉](https://openai.com/academy/workspace-agents/)

2. **OpenAI Academy 的 skills：先解決重複說明，不必立刻增加 Agent。** 文章用「一直重貼相同 prompt 或模板」作例子，把固定做法存成可重用的工作指示。**可借用的轉場：**「如果問題只是每次都要重新講規則，先把規則留下；等工作還要自動啟動、用工具、交接與審查，再談 Agent 流程。」後半句是我結合下一來源的歸納。[OpenAI Academy〈Using skills〉，開頭、〈What are skills?〉、〈Why use skills?〉](https://openai.com/academy/skills/)；[OpenAI Academy〈Workspace agents〉，〈What is an agent?〉](https://openai.com/academy/workspace-agents/)

3. **Anthropic：先處理 context，再依任務決定要不要分出子 Agent。** 〈Context engineering for long-horizon tasks〉先點出 context pollution，依序介紹 compaction、外部筆記、子 Agent；最後明列三者適用的工作：持續對話、具里程碑的迭代、可平行探索的研究。**可借用的轉場：**「聊天記錄變長，先整理；工作會跨 session，就留下筆記；需要各自深入找資料時，才分頭做。」[Anthropic〈Effective context engineering for AI agents〉，〈Context engineering for long-horizon tasks〉下的三小節](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents/)

4. **OpenAI 指南與 Microsoft：把 Agent 數量放在需求之後。** OpenAI 先介紹單一 Agent，再於〈When to consider creating multiple agents〉說明指示過於複雜、工具常選錯時的拆分條件；Microsoft 直接寫：“Use the lowest level of complexity that reliably meets your requirements.” **可借用的轉場：**「先讓工作有明確步驟和驗收；一位能完成就用一位，當某個關卡確實需要不同專長或權限，再交給下一位。」[OpenAI〈Practical guide〉，〈Orchestration〉、〈When to consider creating multiple agents〉](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)；[Microsoft〈AI agent orchestration patterns〉，〈Start with the right level of complexity〉、〈Overview〉](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)

5. **Notion：直接用看板完成最後一段轉場。** 文章先說同事可在任務上看規格、決定與 Agent 成果；卡片進入 `Ready for Agent` 後啟動，Agent 在卡片更新，完成後由隊友審查。步驟 5 才談何時建立多個 Agent。**可借用的例子：**「Ready 的卡交給執行者；成果回到卡片；In Review 由審查者確認。若兩種工作需要不同規則，再配置不同 Agent。」[Notion，〈How do External Agents work in Notion?〉、〈What you’ll build〉、步驟 2–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)

多 Agent 也會產生新的交接問題：LangChain 的特定測試中，主管 Agent 重新轉述子 Agent 答案會出錯；Anthropic 的研究系統則要求交辦時寫清目標、產出格式、工具與邊界。**我的歸納：**看板卡片若只留一句「已處理」，換誰接都難驗收；要留下能檢查的成果與待決事項。[LangChain，〈Results & Analysis〉、〈Improvements to supervisor〉](https://www.langchain.com/blog/benchmarking-multi-agent-architectures)；[Anthropic〈How we built our multi-agent research system〉，〈Prompt engineering and evaluations for research agents〉第 2 點](https://www.anthropic.com/engineering/multi-agent-research-system)

## 四、給這兩段投影片的修訂敘事

以下是**我的敘事建議**，不是任何來源原話：

> **大家先用 chat 完成眼前的一步。** 當工作走過好幾個關卡，聊天記錄會混進別的任務與角色，摘要可能漏細節，換 session 需要交接，產出還需要驗收。  
> **所以把工作放回已教過的看板：** ticket 說清目標與完成條件，每個關卡留下進度和成果；Ready 啟動執行，PR Review、QA 與 Product/Goal Check 各自檢查。先用能完成工作的最簡配置，再按需要加入分流、不同模型／effort 或專責 Agent。

這個順序取材自 [OpenAI Academy〈Workspace agents〉，開頭](https://openai.com/academy/workspace-agents/)、[Anthropic〈Building effective agents〉，〈When (and when not) to use agents〉及〈Building blocks, workflows, and agents〉](https://www.anthropic.com/engineering/building-effective-agents)、[Notion，看板指南步驟 2–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)。它也避開一個容易混淆的跳躍：**chat 的交接問題，不會因為 Agent 數量增加就自動消失**；多 Agent 仍須設計交接內容、驗收與成本。[Microsoft〈AI agent orchestration patterns〉，〈Context and state management〉、〈Cost and performance〉](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)；[Anthropic〈How we built our multi-agent research system〉，〈Benefits of a multi-agent system〉](https://www.anthropic.com/engineering/multi-agent-research-system)