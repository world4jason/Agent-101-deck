# 第 1 輪研究：GitHub 公開教材怎麼安排這段故事

**結論（我的歸納）：**這批教材通常先讓學員理解「AI 回答問題」與「AI 使用工具、分步完成任務」的差別，再講工作流程，之後才討論何時需要多個 Agent。Owner 提出的六點很適合作為 workshop 的**問題敘事**，但不能全部說成「chat 天生做不到」或「多 Agent 都能解決」：記憶、模型選擇與評估也可以在單一 Agent 或工作流程中處理。[Microsoft《Study Guide》第 01、07、08、12、13、16 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md)、[Hugging Face《What is an Agent?》與 Unit 2.1](https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx)

以下只把 **GitHub 上可核對的章節**當成課程證據；未核對影片內容，因此不填影片時間點。DeepLearning.AI 的逐節內容使用 **Datawhale 社群整理**，不冒稱為官方逐字稿。

## 1. 課程先講什麼？Multi-agent 排在哪裡？

| 教材 | 可核對的章節順序 | Multi-agent／workflow 的位置 |
|---|---|---|
| **Microsoft — AI Agents for Beginners** | 第 01 課先比較 agent 與基本 chatbot；第 04 課工具、第 07 課規劃。 | **第 07 課**規劃多步工作、**第 08 課**專講多 Agent；上下文與記憶分別在第 12、13 課。[課程逐課指南](https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md) |
| **Hugging Face — Agents Course** | Unit 1 從「什麼是 Agent」、模型、工具，以及 **Think → Act → Observe** 開始；Unit 2 才進入框架。 | **Unit 2.1〈Multi-Agent Systems〉**介紹專門化 Agent 與協調者；主目錄沒有獨立的「chat 問題」單元。[主目錄](https://github.com/huggingface/agents-course)、[Unit 1 導言](https://github.com/huggingface/agents-course/blob/main/units/en/unit1/introduction.mdx)、[Unit 2.1〈Multi-Agent Systems〉](https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx) |
| **UC Berkeley — LLM Agents MOOC（2024 秋）** | 第 1 場講 LLM 推理，第 2 場講 Agent 歷史與概覽。 | **第 3 場（9 月 23 日）**的 Agentic AI Frameworks／AutoGen 涉及多 Agent 對話；**第 7 場（10 月 21 日）**講企業工作流程。課綱沒有把「為什麼一隻不夠」列為獨立一場。[2024 秋課綱](https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md) |
| **DeepLearning.AI — Agentic AI（依 Datawhale 整理）** | Module 1 工作流程導論 → Module 2 反思 → Module 3 工具 → Module 4 實作技巧 → Module 5 高自主性模式。 | **1.8 節**先概述多 Agent 協作；**5.5 節**才專講多 Agent 工作流程，**5.7 節**講溝通模式。這是社群整理的章節定位，非官方影片時間碼。[Datawhale 目錄](https://github.com/datawhalechina/agentic-ai)、[Module 1 小節目錄](https://github.com/datawhalechina/agentic-ai/tree/main/1.%20Agentic%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%AE%80%E4%BB%8B%5BIntroduction%20to%20Agentic%20Workflows%5D)、[Module 5 小節目錄](https://github.com/datawhalechina/agentic-ai/tree/main/5.%20%E9%AB%98%E5%BA%A6%E8%87%AA%E6%B2%BB%E6%99%BA%E8%83%BD%E4%BD%93%E7%9A%84%E6%A8%A1%E5%BC%8F%5BPatterns%20for%20Highly%20Autonomous%20Agents%5D) |
| **Datawhale — Hello-Agents** | 第 1–3 章基礎；第 4 章 ReAct、規劃與反思；第 8、9 章記憶與上下文。 | 第 10 章講 Agent 通訊協定，第 13 章才有多 Agent 實例，第 16 章以多 Agent 應用作畢業設計。教材自述需要基本 Python，較不適合作為非工程師投影片主線。[課程目錄與學習建議](https://github.com/datawhalechina/hello-agents) |
| **社群教材／awesome 整理** | 一份 [GitHub 社群教材《Awesome AI Agents & Agentic Workflows》](https://github.com/mahsa-teimourikia/awesome-ai-agents/blob/main/README.md)在入門第 03 步就教「Workflow or Agent?」，到進階第 01 步才教「Single vs Multi-Agent」。[繁中課程地圖](https://github.com/WenyuChiou/awesome-agentic-ai-zh/blob/main/resources/courses.md)及 [Awesome AI Agents Free Courses](https://github.com/barvhaim/awesome-ai-agents-free-courses)主要是**選課索引**，不能當作所列課程的章節原文或影片時間點。 | 對 workshop 有用的是前者的選擇順序；兩份索引的「multi-agent 在第幾章」：**查不到**，須回各課原目錄確認。 |

**對章節順序的歸納：**先講「一個任務如何由回答變成行動與步驟」，再講「步驟如何交接給不同角色」，與這些教材的順序相符。這是我的教學歸納，不是某門課對你這份投影片的指示。[Microsoft 第 01、07、08 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md)、[Hugging Face Unit 1–2](https://github.com/huggingface/agents-course)

## 2. Owner 六點：教材實際支持到哪裡？

表中的**「來源內容」是教材的說法或貼近原意的轉述**；**「對投影片的判讀」是我的歸納**。

| Owner 的問題 | 來源內容與章節 | 對投影片的判讀 |
|---|---|---|
| **一人分飾多角色** | Microsoft **第 08 課〈Multi-agent design patterns〉**說：簡單任務可由單一 Agent 完成；複雜任務可依專長拆分，避免單一 Agent 包攬太多任務而混淆。[第 08 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md) | **有直接依據，但「chat 一定會混亂」是延伸說法。**可用「同一段對話要兼顧規劃、實作、審查，角色容易混在一起」作生活化例子。 |
| **Context 污染** | Microsoft **第 12 課〈Context Engineering〉**分別描述錯誤資訊反覆進入上下文（*poisoning*）、累積歷史使模型分心（*distraction*）、資訊衝突（*clash*）；Hugging Face **Unit 2.1〈Multi-Agent Systems〉**明講拆開子任務的記憶可讓各 Agent 聚焦並減少輸入 token。[Microsoft 第 12 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md)、[Hugging Face Unit 2.1](https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx) | **直接支持「混雜上下文會影響工作」**；但教材的 *context poisoning* 特指錯誤資訊反覆被引用，別把所有上下文問題都翻成這一個術語。 |
| **球員兼裁判** | Datawhale 整理的 **1.8 節〈Agentic design patterns〉**說反思可由同一模型，也可由另一個專門的審查模型執行；Microsoft **第 09 課**安排 Agent 檢查自身輸出的元認知模式。[Datawhale 1.8 節](https://github.com/datawhalechina/agentic-ai/blob/main/1.%20Agentic%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%AE%80%E4%BB%8B%5BIntroduction%20to%20Agentic%20Workflows%5D/1.8%20Agentic%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%5BAgentic%20design%20patterns%5D.md)、[Microsoft 第 09 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/09-metacognition/README.md) | **教材支持「檢查是獨立步驟」，不支持「自我檢查必然無效」。**若要對應既有 PR Review、QA，建議說「需要另一道可檢查的關卡」；是否由另一個 Agent、人或測試執行，留到後面介紹。 |
| **不同問題選不同 model／effort，避免殺雞用牛刀** | Microsoft **第 16 課〈Deploying Scalable Agents〉**明講把簡單請求交給較小、較快、較便宜的模型，把複雜推理留給大型模型。[第 16 課〈Model routing〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/16-deploying-scalable-agents/README.md) | **「依任務選模型」有直接依據；「必須多 Agent 才能選模型」不成立，該課在單一服務中也做路由。**這批教材對逐任務設定 **effort** 的明確章節：**查不到**。 |
| **Compact 之後遺忘** | Microsoft **第 12 課〈Compressing Context〉**說摘要或裁切可能移除較舊訊息，並要求檢查下一次模型呼叫是否缺少所需資訊；**第 13 課〈Memory〉**說工作記憶可保留長對話或遭截斷對話中的關鍵需求、決策與行動。[第 12 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md)、[第 13 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md) | **「壓縮可能漏掉重要細節」是合理歸納**；「每次 compact 後必定遺忘」的課程原話：**查不到**。 |
| **換 session 的交接** | Microsoft **第 13 課〈Short Term／Long Term Memory〉**明講單一 session 的上下文不會自動在 session 結束或重啟後持續存在，跨 session 的資訊需另行保存；**第 12 課**也把跨 session 記憶列為另一項策略。[第 13 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/13-agent-memory/README.md)、[第 12 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/12-context-engineering/README.md) | **直接支持「需要交接機制」**。重點是把 ticket 狀態、決策和產物留在可再讀取的地方；增加 Agent 數量本身不會替你保存它們。 |

## 3. 教材怎麼分類？哪些詞不宜混成同一條軸？

- **能力／自主程度：**Hugging Face **Unit 1〈What is an Agent?〉**把簡單處理、路由、工具呼叫、多步 Agent、Agent 啟動另一個 Agent 放在逐漸增加的 *agency* 光譜；Datawhale 整理的 **1.3 節〈Degrees of autonomy〉**也用「步驟預先固定」到「模型自行決定步驟」說明自主程度。[Hugging Face Unit 1](https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx)、[Datawhale 1.3 節](https://github.com/datawhalechina/agentic-ai/blob/main/1.%20Agentic%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%AE%80%E4%BB%8B%5BIntroduction%20to%20Agentic%20Workflows%5D/1.3%20%E8%87%AA%E4%B8%BB%E6%80%A7%E7%AD%89%E7%BA%A7%5BDegrees%20of%20autonomy%5D.md)

- **流程由誰決定：**[社群教材《Awesome AI Agents & Agentic Workflows》〈What is an AI agent?〉](https://github.com/mahsa-teimourikia/awesome-ai-agents/blob/main/README.md)依序區分「單次模型呼叫 → 固定流程 → Agentic workflow → 單一 Agent → 多 Agent」，判準包括路徑是否已知、是否需模型判斷，以及拆分上下文、工具或審查是否有幫助。這是**該社群教材的分類**，不是各課通用的正式標準。

- **多 Agent 怎麼合作：**Microsoft **第 08 課**列出 group chat、handoff 等模式；Datawhale 整理的 **5.7 節〈Communication patterns〉**列線性、雙層、多層、去中心模式。這是在**已決定使用多 Agent 後**才需要的分類。[Microsoft 第 08 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md)、[Datawhale 5.7 節](https://github.com/datawhalechina/agentic-ai/blob/main/5.%20%E9%AB%98%E5%BA%A6%E8%87%AA%E6%B2%BB%E6%99%BA%E8%83%BD%E4%BD%93%E7%9A%84%E6%A8%A1%E5%BC%8F%5BPatterns%20for%20Highly%20Autonomous%20Agents%5D/5.7%20%E5%A4%9A%E6%99%BA%E8%83%BD%E4%BD%93%E7%B3%BB%E7%BB%9F%E7%9A%84%E9%80%9A%E4%BF%A1%E6%A8%A1%E5%BC%8F%5BCommunication%20patterns%20for%20multi-agent%20systems%5D.md)

**我的歸納：**`chat` 是人使用 AI 的互動形式；`workflow` 是工作步驟如何銜接；`single／multi-agent` 是執行者如何分工；`autonomy` 是 AI 有多少決策權。它們回答不同問題，不宜放成四個互斥選項。Hugging Face 甚至把客服 **chatbot** 列為可能使用工具並採取行動的 Agent 例子，因此「chat＝沒有 Agent 能力」也不是教材的定義。[Hugging Face Unit 1〈What is an Agent?〉](https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx)

## 4. 哪一種講法最適合這場非工程師 workshop？

**若選一門作為開場講法，我選 Hugging Face 的 Unit 1。**它先用 Alfred「收到要咖啡的要求 → 想步驟 → 使用咖啡機 → 把咖啡送來」說明 Agent，接著才引入工具與行動；非工程師可以先理解差別，再聽架構名詞。**限制**是它的完整課程預設基本 Python 與 LLM 知識，所以適合借用**講法**，不適合整套照搬。[Unit 1〈What is an Agent?〉](https://github.com/huggingface/agents-course/blob/main/units/en/unit1/what-are-agents.mdx)、[課程主目錄與先備知識](https://github.com/huggingface/agents-course)

**對你已有的看板流程，我的建議敘事是：**「大家先在 chat 裡交代任務」→「當一張 ticket 要經過多步、審查與跨次交接時，上述六種問題開始浮現」→「把已教過的看板步驟變成可看見、可交接的工作」→「再視步驟需要，安排專門角色與模型」。這是根據教材順序做的**投影片建議**，不是課程原話；其中「多 Agent」應在觀眾理解**工作怎麼交接**之後登場。[Microsoft 第 07–08 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/STUDY_GUIDE.md)、[Hugging Face Unit 2.1](https://github.com/huggingface/agents-course/blob/main/units/en/unit2/smolagents/multi_agent_systems.mdx)