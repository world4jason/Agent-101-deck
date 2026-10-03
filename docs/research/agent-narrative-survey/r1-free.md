# 第 1 輪研究：先講聊天，再講工作如何交接

最適合這場 workshop 的起點是：「大家已經會用 AI 聊天，問題出在一件工作要跨好幾步、好幾天、好幾個人時。」這是**我的敘事歸納**。OpenAI Academy 的文章確實先談一次性的提問，再談需要共用資料、標準交接與固定產出的重複工作；它也明說，腦力激盪等一次性探索仍適合一般聊天。[OpenAI Academy〈Workspace agents〉，〈What is an agent?〉](https://openai.com/academy/workspace-agents/)

## 1. 五種值得借用的講法

以下「順序」與「論點」是我對來源的整理；只有標成「來源比喻」的說法，才是來源本身使用的比喻。

| 講法 | 敘事順序、比喻與主要論點 |
|---|---|
| **從一次性幫忙到可重複的工作** | 先舉起草、摘要、問答等熟悉的聊天用途，再問：下週重做時，誰記得步驟、資料在哪、成果交給誰？最後才引入有觸發條件、步驟與工具的 Agent。**來源沒有特別比喻**；「一次性幫忙／可重複的工作」是我的濃縮。[OpenAI Academy〈Workspace agents〉，開頭、〈What is an agent?〉](https://openai.com/academy/workspace-agents/) |
| **像接力班一樣交班** | 先講長工作會跨越對話或 context window，再講下一個 session 如何接續。**來源比喻**是工程師輪班：每班新人到場時，都不記得上一班做過什麼。解法是留下進度與工作成果，讓下一班讀得懂。[Anthropic〈Effective harnesses for long-running agents〉，開頭、〈The long-running agent problem〉](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) |
| **從積木逐步組成流程** | 先從單次模型呼叫出發，再依需要加入固定步驟、分流、平行處理、執行者與評估者，最後才談自主 Agent。**來源比喻**是「building blocks」。它最適合解開「一隻不夠，所以立刻要很多隻」的跳躍：有時多一道檢查或分流就夠了。[Anthropic〈Building effective agents〉，〈When (and when not) to use agents〉、〈Building blocks, workflows, and agents〉](https://www.anthropic.com/engineering/building-effective-agents) |
| **先讓一位做事，再決定何時分工** | 先定義 Agent 能用工具執行工作，再區分單一 Agent 與多 Agent；當指示過於複雜、工具容易選錯時，才把工作交給專責 Agent。**來源用語**是 manager、specialist、handoff，近似經理分派與同事交接。[OpenAI〈A practical guide to building agents〉，〈Orchestration〉、〈When to consider creating multiple agents〉、〈Multi-agent systems〉](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) |
| **工作在卡片上，Agent 接卡片做事** | 先有 Backlog／Ready／In Progress／In Review／Done，再讓卡片進入 Ready 時觸發 Agent；進度、問題與成果留在卡片上，完成後仍有人審查。**來源比喻**是把 Agent 當能接工作的隊友。這篇最能直接接上你已教過的看板。[Notion〈How to set up Claude agents on your team’s Notion task board〉，〈What you’ll build〉、步驟 2–4](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board) |

## 2. 對照 owner 的六個問題

**● 直接談到；△ 談到相近現象或解法，但把它稱為該「問題」是我的歸納；— 該來源未談到。** 欄名依序為：① 一人多角、② context 污染、③ 球員兼裁判、④ 依題選 model／effort、⑤ compact 遺漏、⑥ 跨 session 交接。

| 來源及查核章節 | ① | ② | ③ | ④ | ⑤ | ⑥ |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| [OpenAI Academy，開頭及〈What is an agent?〉](https://openai.com/academy/workspace-agents/) | — | — | — | — | — | ● |
| [Anthropic〈Building effective agents〉，〈Routing〉、〈Evaluator-optimizer〉](https://www.anthropic.com/engineering/building-effective-agents) | △ | — | ● | ●¹ | — | — |
| [Anthropic〈Effective context engineering〉，〈Context engineering for long-horizon tasks〉](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)及[〈Effective harnesses〉，〈The long-running agent problem〉](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | — | ● | — | — | ● | ● |
| [OpenAI〈Practical guide〉，〈Orchestration〉、〈When to consider creating multiple agents〉](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) | △ | — | — | — | — | — |
| [Notion，看板指南步驟 2–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board) | ● | ● | ●² | △ | — | △ |

¹ Anthropic 的 **Routing** 直接舉「簡單問題交給較省成本的模型、困難問題交給較強模型」；推理 **effort** 的分級則見 [OpenAI〈Reasoning models〉，〈Reasoning effort〉](https://developers.openai.com/api/docs/guides/reasoning)。因此「一般聊天**沒辦法**選 model／effort」太絕對。較準確的痛點是：**若每張 ticket 都靠人臨時開 chat，工作流程不會自動按任務選擇模型與投入程度**。這句是我的歸納。

² Notion 明確要求隊友檢查 PR 與合併；Anthropic 也有「一個模型產出、另一個模型評估」的模式。但我查到的這些來源**沒有證明**「同一個 Agent 自評一定不可靠」；把「球員兼裁判」作為風險比喻可以，別說成已被來源證實的定律。[Notion，步驟 4](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)；[Anthropic，〈Evaluator-optimizer〉](https://www.anthropic.com/engineering/building-effective-agents)

「compact 之後遺忘」也宜說成**可能漏掉當時看似次要、後來卻重要的細節**；Anthropic 同時指出 compact 通常有助於延續工作，並非每次都會失憶。[Anthropic〈Effective context engineering〉，〈Compaction〉](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

## 3. 值得補給非工程師的問題與比喻

- **「大家看得到對話，卻未必看得到工作現在由誰接手。」** 這是我的歸納；Notion 的卡片把進度、待補資料與成果放在同一處，Microsoft Planner 也把待執行、需要輸入、待審查列為可追蹤狀態。這很適合接你已有的看板投影片。[Notion，步驟 3–4](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)；[Microsoft〈Execute tasks with Planner agent〉，〈Track Planner Agent’s progress on tasks〉](https://support.microsoft.com/en-us/planner/copilot/execute-tasks-with-planner-agent)
- **「交接也會像傳話遊戲失真。」** 多 Agent 不是自動解藥。LangChain 的實驗指出，主管 Agent 轉述專責 Agent 的回答時會出錯；它稱這類損失為 *telephone* 問題。適合提醒聽眾：交接應傳工作紀錄與成果，不能只靠一句口頭摘要。[LangChain〈Benchmarking Multi-Agent Architectures〉，〈Improvements to supervisor〉、〈Skipping the “translation” layer〉](https://www.langchain.com/blog/benchmarking-multi-agent-architectures)
- **「多請幾位幫手也要付協調成本。」** Anthropic 的研究案例顯示，多 Agent 在可平行的研究任務有優勢，同時會用更多 tokens；它也提醒，彼此依賴很高的工作未必適合平行分工。[Anthropic〈How we built our multi-agent research system〉，〈Benefits of a multi-agent system〉](https://www.anthropic.com/engineering/multi-agent-research-system)

## 4. 這些詞怎麼分類

| 詞 | 較準確的意思與使用範圍 |
|---|---|
| **single agent／multi-agent** | **通用的架構用語**，回答「幾個 Agent 協調執行？」單一 Agent 也能用工具完成多步工作；多 Agent 不是 Agent 的必經下一級。[OpenAI〈Practical guide〉，〈Orchestration〉](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) |
| **workflow** | **通用，但各來源定義不完全相同。** Anthropic 特指由預設路徑編排模型與工具；OpenAI 也用它泛指完成目標的一連串步驟。因此簡報第一次出現時，最好直接說「工作經過哪些步驟、由誰接手、何時檢查」。[Anthropic，〈What are agents?〉](https://www.anthropic.com/engineering/building-effective-agents)；[OpenAI〈Practical guide〉，〈What is an agent?〉](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/) |
| **chat-driven** | 有來源使用，但**不是上述架構分類的標準軸**；它描述「靠人發起對話推進工作」。可當課堂上的描述詞，第一次使用時自行定義。[Salesforce Developers〈Build Headless Agents with the Agent API〉，開頭](https://developer.salesforce.com/blogs/2025/04/build-headless-agents-with-the-agent-api) |
| **work-driven** | 在本輪查核的主要來源中，**查不到**它與 chat-driven 成對、且被普遍採用的分類。若要用，應標成**本課程自訂用語**，例如「Agent 根據已準備好的 ticket 與狀態開始工作」。 |
| **從看板拉工作** | 是**具體的啟動與交接方式**，不是 single／multi-agent 的同一分類軸。Notion 的例子是卡片移進 Ready 後自動觸發 Agent；GitHub 與 Microsoft 的例子則是把 issue／task **指派**給 Agent。投影片若說「拉票」，要說明你指的是自動接 Ready 卡，還是人指派卡片。[Notion，步驟 2](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)；[GitHub Docs，〈Assigning an issue to Copilot〉](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-on-github)；[Microsoft，〈Assign tasks to Planner Agent〉](https://support.microsoft.com/en-us/planner/copilot/execute-tasks-with-planner-agent) |

**給這兩段的敘事建議（我的歸納）：**先用「聊天很會幫我完成眼前這一步」開場；接著用「跨步驟的工作需要記錄、交接、分工與驗收」承接六個痛點；最後沿著既有看板展示可選的做法：一位 Agent 執行、流程在關卡分流或檢查、需要時再交給專責 Agent。這樣「看板上的工作如何流動」會是主線，Agent 數量只是其中一項選擇。[OpenAI Academy，開頭](https://openai.com/academy/workspace-agents/)；[Anthropic，〈Building blocks, workflows, and agents〉](https://www.anthropic.com/engineering/building-effective-agents)；[Notion，步驟 2–4](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)