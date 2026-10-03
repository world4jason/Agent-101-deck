以下是**根據四份 survey 的統整與投影片編排建議**。頁名、轉場句及「六個問題」的分組都是我的歸納；來源只支持各欄所標出的教材內容，並未共同提出這套七頁架構。

## 一、四份材料的共同順序與差異

| Survey | 可借用的講述順序 | 對這次投影片最有用的差異 |
|---|---|---|
| **Stanford** | 從一問一答，問「誰決定下一步」，再展示固定流程與按軟體開發職責組織的團隊。[Stanford Law School，Module 1〈Three systems, one question〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[CS329T 第 4 講，第 8、11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=8) | **最適合接第一段看板**：第 4 講直接用軟體開發比較不同的人與 AI 角色安排。[CS329T 第 4 講，第 11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=11) |
| **李宏毅** | 從一般一問一答，走到固定 SOP、可調整步驟的 Agent；任務變長後，再談 context 的挑選、壓縮與分隔。[2025 秋季講義，第 42、46–55、67–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=42) | **最適合解釋痛點如何出現**：長任務累積資訊、反覆摘要可能流失舊細節；另有軟體專案的 PM、程式、測試交接例子。[2025 秋季講義，第 67–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=67)；[2024 第 5 講，20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s) |
| **GitHub 公開課程** | 先把目標拆成子任務，再看具體瓶頸，最後決定是否分工。[Microsoft 第 07 課〈Task Decomposition〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/07-planning-design/README.md)；[Hugging Face Unit 2.1〈Solving a complex task with a multi-agent hierarchy〉](https://huggingface.co/learn/agents-course/unit2/smolagents/multi_agent_systems) | **最適合防止跳步**：Hugging Face 先試一位執行者，碰到搜尋資料擠滿 context，才拆開搜尋與統籌工作。[Hugging Face Unit 2.1〈Splitting the task between two agents〉](https://huggingface.co/learn/agents-course/unit2/smolagents/multi_agent_systems) |
| **自由探索** | 從日常聊天用途走到重複工作與標準交接，再用任務卡的觸發、更新、審查呈現實際運作。[OpenAI Academy〈Workspace agents〉開頭及〈What is an agent?〉](https://openai.com/academy/workspace-agents/)；[Notion 看板指南，步驟 2–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board) | **最適合畫最後一頁**：Ready 卡啟動工作、成果留在卡片、隊友審 PR；需要不同指示或權限時才增加專責執行者。[Notion 看板指南，步驟 2–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board) |

**共同骨架（我的歸納）：**熟悉的聊天 → 長工作暴露資訊、職責與交接問題 → 先說清工作步驟和產物 → 按需要分工與驗收。四份材料對「為何分工」的著力點不同，因此不宜把它們講成「聊天失敗，所以一定要增加 Agent」。[Stanford Law School，Module 1](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[Microsoft 第 07、08 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md)；[OpenAI〈A practical guide to building agents〉，〈Orchestration〉](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)

## 二、建議頁序

以下每頁的**標題與講法均是我的編排**。第二段只讓觀眾看見 chat 承接整張 ticket 時的問題；第三段才介紹工作如何啟動、如何決定下一步、由誰執行。

### 第二段｜一張 ticket 放進 chat，工作會卡在哪裡？

| 頁序 | 每頁標題與講法 | 參考的來源講法 |
|---|---|---|
| **1** | **大家先把整張 ticket 丟進 chat**：畫面只放「我交代、AI 回答、我再追問」。讓觀眾認出自己的使用方式。 | 從一次性的起草、摘要、問答出發：[OpenAI Academy〈Workspace agents〉開頭](https://openai.com/academy/workspace-agents/)；一問一答的對照：[李宏毅 2025 秋季講義，第 42 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=42)。 |
| **2** | **同一段對話要規劃、執行，還要審查自己**：對照已教過的 Dev、PR Review、QA，帶出「一人分飾多角色」與「球員兼裁判」。講成**職責與驗證關卡需要被看見**，不講成自我檢查必然無效。 | 軟體開發的角色安排：[CS329T 第 4 講，第 11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=11)；「完成回報仍待查證」：[Stanford Law School，Module 10〈“Done” is a claim〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)。 |
| **3** | **越聊越長，下一步需要的細節反而找不到**：放一段逐漸變長的對話，標出舊要求、別項工作的資料、摘要後遺漏的決定。此頁處理 context 混雜與 compact 的取捨。 | context 的組成、長輸入與摘要：[李宏毅 2025 秋季講義，第 40、46–52、67–70 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=40)；[Microsoft 第 12 課〈Common Context Failures〉、〈Compressing Context〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md)。 |
| **4** | **每次開工，都要重新交代工作狀態與配置**：同一張 ticket 換 session，得重述進度；若每種工作都沿用同一模型與推理投入，也難按難度分配成本。收在一句轉場：**「下一位接手者，要去哪裡讀到這張卡的現況？」** | 跨 session 記憶範圍：[Microsoft 第 13 課〈Short Term Memory／Long Term Memory〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md)；按難度選模型：[CS329T 第 3 講，第 9 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=9)。推理投入的設定另見**非課程**的 [OpenAI API〈Reasoning effort〉](https://developers.openai.com/api/docs/guides/reasoning)。 |

### 第三段｜讓看板帶動工作，再決定誰接手、誰驗收

| 頁序 | 每頁標題與講法 | 參考的來源講法 |
|---|---|---|
| **5** | **Ready 卡片啟動工作，成果回到卡片**：在這一頁**一次說明啟動方式**：由人持續在對話中交辦（*chat-driven*），或由卡片狀態啟動並留下進度（本 workshop 稱 *work-driven*）。這兩個詞描述**工作從哪裡啟動**。 | 看板狀態觸發與卡片進度：[Notion 看板指南，步驟 2–3](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)；*chat-driven* 一詞見 [Salesforce Developers〈Build Headless Agents〉開頭](https://developer.salesforce.com/blogs/2025/04/build-headless-agents-with-the-agent-api)。**「work-driven」是我們的教學名稱，來源沒有提出這組通用分類。** |
| **6** | **關卡已經固定；站內才需要判斷下一步**：沿用 Refinement → Done 的看板。卡片何時進站、要交什麼由流程規定；遇到需看中途結果調整做法的工作，再讓 Agent 判斷站內下一步。此頁只講**工作路線與決策權**。 | 預定路線與動態決策的區分：[Stanford Law School，Module 1〈Who decides what happens next?〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；一問一答、固定 SOP、可調整步驟的並列：[李宏毅 2025 秋季講義，第 42 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=42)。 |
| **7** | **看板＋多 Agent＋Human Gate：每一關都有接手者與驗收者**：在最後一頁**一次說明執行者數量**：簡單卡可由一位執行者完成（*single-agent*）；當不同關卡確實需要分開指示、context 或職責，才配置多位（*multi-agent*）。畫同一張卡從 Ready → Dev → PR Review → QA → Product/Goal Check → Done：成果、決定與檢查證據留在卡片；人在 PR 審查及最後的產品／目標確認關卡作決定。 | 按職責安排人與 AI：[CS329T 第 4 講，第 11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=11)；先從具體瓶頸決定是否拆分：[Hugging Face Unit 2.1〈Splitting the task between two agents〉](https://huggingface.co/learn/agents-course/unit2/smolagents/multi_agent_systems)；卡片留進度、隊友審 PR：[Notion 看板指南，步驟 3–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)。**這張看板的人員配置與 Human Gate 位置是本 workshop 的設計。** |

這樣四個容易混淆的詞各有**一個講解位置**：第 5 頁講啟動方式，第 7 頁講執行者數量；第 6 頁先把「誰決定下一步」講清楚。[Stanford Law School，Module 1](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[Notion 看板指南，步驟 2–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)

## 三、Owner 六點的證據界線

| Owner 的說法 | 公開課程支持到哪裡 | 投影片應標成「我們的觀點」的部分 |
|---|---|---|
| **一人分飾多角色** | **有相近例子**：軟體開發可按 PM、程式、測試等職責交接；簡單任務也可以只用一位執行者。[李宏毅 2024 第 5 講，20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s)；[Microsoft 第 08 課〈Advantages of Using Multi-Agents〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md) | 「一人分飾多角色」是比喻；**一位必然做不好，查不到**。 |
| **context 污染** | **直接支持資訊混雜的機制**：過長歷史、無關資料或衝突資訊會干擾當前工作。[李宏毅 2025 秋季講義，第 40、46–52 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=40)；[Microsoft 第 12 課〈Common Context Failures〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md) | 把多種問題統稱「context 污染」是我們的簡稱；投影片最好寫成**舊資料、無關資料與衝突要求混在一起**。 |
| **球員兼裁判** | **支持另設檢查步驟、查證完成回報**。[CS329T 第 3 講，第 13 頁〈Evaluator-Optimizer〉](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=13)；[Stanford Law School，Module 10〈“Done” is a claim〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/) | 「同一位自評一定失準」**查不到**；球員兼裁判是提醒驗證責任的比喻。 |
| **無法依問題選 model／effort** | **支持按難度選模型與成本**：[李宏毅 FrugalGPT 講義，第 9 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/FrugalGPT-v2.pdf#page=9)；[CS329T 第 3 講，第 9 頁〈Routing〉](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=9)。這批課程對**逐任務調 effort：查不到**；設定方法見[非課程的 OpenAI API〈Reasoning effort〉](https://developers.openai.com/api/docs/guides/reasoning)。 | 「一般 chat **沒辦法**選」沒有得到支持。可改成：「**若所有工作沿用同一配置，可能殺雞用牛刀。**」 |
| **compact 之後遺忘** | **直接支持摘要可能漏掉舊細節**。[李宏毅 2025 秋季講義，第 67–70 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=67)；[Microsoft 第 12 課〈Compressing Context〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md) | 「每次 compact 必然遺忘」**查不到**；只能說**摘要有取捨，重要細節可能未被保留**。 |
| **換 session 的交接** | **直接支持 session 內資訊與跨 session 保存須區分**。[Microsoft 第 13 課〈Short Term Memory／Long Term Memory〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md)；長任務交接實例另見[非課程的 Anthropic〈Effective harnesses〉，〈The long-running agent problem〉、〈Getting up to speed〉](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)。 | 「任何產品換 session 都看不到先前內容」**查不到**。把**ticket 狀態、決策、成果、待辦**作為交接紀錄，是我們對這場看板教學提出的做法。 |

六點都能找到**相關的課程機制或例子**；但這份「六點清單」、三個比喻，以及「看板＋多 Agent＋Human Gate」的組合，都是本 workshop 的歸納。課程尤其沒有證明「chat 一定不能選配置」「自評一定無效」或「Agent 越多越好」。[Microsoft 第 08 課〈Advantages of Using Multi-Agents〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md)；[Stanford Law School，Module 10〈“Done” is a claim〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)