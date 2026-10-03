# 第 2 輪修正版：從 chat 的問題，走到 workflow 與多 Agent

**研究結論：**最貼近這次投影片的過渡，出現在第 1 輪漏掉的 **CS329T 第 4 講**。它先列 ChatGPT 與 RAG，再說 agent 系統可依「傳統人類工作流程」組織；接著用軟體開發比較「人與 LLM 助手」「讓 LLM 寫程式」「不同角色的 AI 團隊」「人與 AI 混合團隊」。這能接上你已教過的看板，但**投影片沒有逐項提出 owner 的六個 chat 問題，也沒有證明一隻 Agent 一定不夠**。[CS329T 第 4 講，PDF 第 8、11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=8)

以下用**「來源內容」**標示教材確實說的事，用**「我的歸納／建議」**標示如何轉成這場 workshop 的敘事。PDF 頁碼均為閱讀器顯示的頁碼。

## 一、第 1 輪來源與位置核查

| 第 1 輪來源 | 核查結果與修正 |
|---|---|
| [Stanford Law School〈Agents Without the Hype〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/) | **存在。**Module 1〈What Makes Something an Agent?〉及〈Three systems, one question〉、Module 3〈Give It Context〉、Module 10〈Supervise an Agent〉及〈“Done” is a claim〉均存在。這是網頁教材，應引**模組與小節**，沒有影片時間點。 |
| [CS329T 第 2 講 PDF](https://web.stanford.edu/class/cs329t/slides/Lecture%202%20-%20CS%20329T%20Fall%202025.pdf#page=2) | **存在。**第 2 頁是大綱；「回覆可能錯誤、誤導或不當」在**第 4 頁**。第 1 輪籠統寫第 2–4 頁，應收窄到第 4 頁。[第 4 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%202%20-%20CS%20329T%20Fall%202025.pdf#page=4) |
| [CS329T 第 3 講 PDF](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=6) | **存在。**第 6 頁區分 workflow／agent；第 8–14 頁是 chaining、routing、parallelization、orchestrator-workers、evaluator-optimizer、agents；第 15 頁才列規劃、工具、反思、記憶、多 Agent 協作。第 19–21 頁的 Goal／Plan／Act 也存在。**用詞更正：第 14 頁投影片標題實為〈Workflow: Agents〉**，不宜改寫成教材自稱「自主 Agent 工作流」。[第 8–15 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=8) |
| [CS329A 課程首頁](https://cs329a.stanford.edu/)；[Stanford Online Part 1 影片](https://www.youtube.com/watch?v=6YnLB0XbTnI) | **課程表與影片連結存在。**課表確有〈Course Overview〉及驗證、記憶、長任務評估等講次。影片的**逐段時間點查不到可直接核對的官方逐字稿**；第 1 輪依影片摘要描述 prompt chaining 等細節，這次**不再把它當作已核實的影片授課內容**。[課程表第 1、3、14、17 講](https://cs329a.stanford.edu/) |
| [CS224N 2026 Lecture 10 PDF](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf#page=29) | **存在。**第 29–30 頁是文字輸出到觀察／行動的轉場；第 41–43 頁有 multi-agent debate／orchestrator；第 47 頁是記憶需求；第 68 頁是評估。第 1 輪所引位置成立。[第 41–47 頁](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf#page=41) |
| [CS25 V3 課表](https://web.stanford.edu/class/cs25/past/cs25-v3/index.html)；[11 月 28 日影片](https://www.youtube.com/watch?v=ylEk1TE1uBo) | **課表、影片連結存在。**10 月 24 日 Jim Fan 與 11 月 28 日〈Going Beyond LLMs…〉的**課表日期、標題、介紹**可核對；影片內相應分鐘數**查不到**，不能由介紹推定實際講述位置。[課表 10/24、11/28](https://web.stanford.edu/class/cs25/past/cs25-v3/index.html) |
| [CS324 Calendar](https://stanford-cs324.github.io/winter2022/calendar/)；[Lectures](https://stanford-cs324.github.io/winter2022/lectures/) | **兩個網址均存在。**公開課表沒有列出名為 Agent 或 multi-agent 的章節；這只能支持「**公開章節列表查不到**」，不能證明任何一堂課內絕未提到。[Calendar，全部章節](https://stanford-cs324.github.io/winter2022/calendar/) |
| [CS329Z 課程首頁](https://cs329z.stanford.edu/) | **存在，但第 1 輪日期應補正。**截至 **2026 年 10 月 3 日**，第 1 講與 9 月 30 日 RAG 講的投影片已列出；**10 月 12 日**是 workflow／agent 設計模式，**10 月 14 日**是記憶與跨 Agent 記憶，**10 月 19 日**才是 single／multi-agent 架構與交接。後三者仍是**預定課綱**，不能當作已講授結論。[課表第 1–5 週](https://cs329z.stanford.edu/) |
| [Stanford HAI 2025 Boot Camp 議程](https://hai.stanford.edu/events/2025-congressional-boot-camp-on-ai?section=day-1-agenda) | **存在。**Day 1 Session 6〈Agents on the Rise〉確以安排行程、補領處方藥介紹日常委託。議程不足以核實講者是否討論六點；影片時間點**查不到**。[Day 1 Session 6](https://hai.stanford.edu/events/2025-congressional-boot-camp-on-ai?section=day-1-agenda) |
| [CS224V〈Knowledge Curation〉PDF](https://web.stanford.edu/class/cs224v/lectures/2-knowledge-curation.pdf#page=39) | **存在。**第 39 頁是 Agent 圓桌；「主持人避免對話只剩狹窄問答」應引**第 40–42 頁**；「一位專家加一位主持人已有多數效益」在**第 46 頁**。第 1 輪把專家與主持人設計集中引第 39 頁，位置不夠精確。[第 40–42、46 頁](https://web.stanford.edu/class/cs224v/lectures/2-knowledge-curation.pdf#page=40) |
| [Stanford University IT 工作坊](https://uit.stanford.edu/service/techtraining/class/building-specialized-ai-assistants-claude-projects-analysis) | **存在。**Program Description、「Session 1／Module 1: The Memory Problem」與「Module 8: Troubleshooting & Best Practices」均存在。這是**課程大綱**，不是核對過的授課錄影。 |
| [Anthropic〈Building Effective AI Agents〉](https://www.anthropic.com/engineering/building-effective-agents) | **存在。**〈When (and when not) to use agents〉及各 workflow 小節存在；CS329T 第 3 講多頁明標此文為來源。它是**非 Stanford 原文**，第 1 輪的出處區分正確。 |
| [Berkeley RDI〈Education〉](https://rdi.berkeley.edu/education)；[Berkeley MOOC syllabus](https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md) | **均存在。**〈Large Language Model Agents MOOC〉列在 Berkeley RDI 的 Academic Offerings；第 1 輪提醒「不能因 Stanford 講者參與，就稱整門課為 Stanford 課」成立。[Education，Academic Offerings](https://rdi.berkeley.edu/education) |

## 二、補查後，最清楚的三種「過渡」

### 1. 從日常 chat，過渡到「誰決定下一步？」——Stanford Law School

**來源內容：**Module 1 先讓讀者辨認三個情境：貼一段文字請 AI 改寫、固定執行「摘要→條列→郵件草稿」、以及搜尋資料後依結果決定是否再找。教材用原句 **“Who decides what happens next?”** 串起三者；其判準是**下一步由預先寫好的流程決定，還是由模型依中途結果決定**。它也明說，步驟或工具變多，本身不會使系統成為 Agent。[〈Agents Without the Hype〉，Module 1〈Start with one question〉、〈Three systems, one question〉、〈Tools do not make something an agent〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)

**我的歸納：**這適合當第二段末尾的第一個轉場：觀眾先看到自己熟悉的 chat，接著問「這張 ticket 的下一步，現在是誰在決定？」它解釋 **chat→workflow／Agent**，但**沒有主張 workflow 必須由多隻 Agent 執行**。[同課 Module 1〈An agent is not always the better design〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)

### 2. 從 ChatGPT，過渡到「按人類工作流程分工」——CS329T 第 4 講，**本輪重要補充**

**來源內容：**第 8 頁〈Big Picture: How can we use AI in 2026?〉依序列 ChatGPT、RAG、agent 系統；在 agent 系統下寫的是依傳統人類工作流程組織。第 11 頁〈Example: Code development using LLMs〉把同一軟體開發情境展成四種安排：人加助手、LLM 單獨寫程式、AI Agent 團隊、以及人與 AI 的團隊。第 12 頁〈ChatCollab〉接著說可為人或 AI 指派角色，讓工作流程前進。這比第 1 輪只引用第 3 講的模式名詞，更直接接到你已畫出的看板。[CS329T 第 4 講，第 8、11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=8)

**我的歸納：**最自然的銜接句是：**「剛才我們把 ticket 放進人類團隊的流程；如果 AI 要參與，不能只看它會不會回答，還要決定它在每一站負責什麼、交給誰、誰檢查。」**這句是為你的投影片寫的，**不是課程原話**。ChatCollab 的原研究也確實以軟體工程為例，研究人與 AI 扮演不同職責及彼此等待交付的協作；它沒有證明所有軟體團隊都該改成多 Agent。[ChatCollab 論文〈Abstract〉](https://arxiv.org/abs/2412.01992)

### 3. 從「chat 問答太窄」，過渡到主持人與專家圓桌——CS224V

**來源內容：**這講先以「直接叫模型問 30 個問題」示範問題缺乏廣度與深度，再用不同視角及讀完資料後的追問改善探索；其後比較 RAG chatbot 與先產報告再問答的設計，最後導入 CoSTORM 的 Agent 圓桌。投影片指出對話容易一直走向狹窄的問答，因此設計主持人提出能打開新方向的問題，並讓使用者隨時插話。第 46 頁還說，一位專家加一位主持人就能取得多數效益。[CS224V〈Knowledge Curation〉，第 21–23、35–42、46 頁](https://web.stanford.edu/class/cs224v/lectures/2-knowledge-curation.pdf#page=21)

**我的歸納：**這是**探索知識**而非軟體開發的例子，適合說「分工是為了解決具體缺口」，不適合拿來證明「Agent 越多越好」。[同講第 40–42、46 頁](https://web.stanford.edu/class/cs224v/lectures/2-knowledge-curation.pdf#page=40)

## 三、Owner 六點：修正後可引用到什麼程度

| Owner 的問題 | 來源確實支持的說法；投影片用語界線 |
|---|---|
| **一人分飾多角色** | **來源內容：**CS329T 第 3 講的 parallelization 例子，把處理請求與安全檢查放在不同模型呼叫；第 4 講的軟體開發例子則把不同職責交給不同角色。[第 3 講第 10 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=10)；[第 4 講第 11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=11) **我的歸納：**「一人分飾多角色」是教學比喻；來源支持**職責可拆開**，未證明一個 Agent 無法完成所有 ticket。 |
| **context 污染** | **來源內容：**Stanford Law School Module 3 比較太少、太多、與按任務挑選的資料，明列過時、無關、令人混淆的材料會增加辨認負擔；CS224N 也指出，大量無關文件會使模型難以注意相關內容。[Law School，Module 3〈The job and the context do different work〉、〈Relevance beats accumulation〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[CS224N 第 23 頁](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf#page=23) **我的歸納：**「context 污染」可當簡稱，應解釋成**無關或過時資訊混進目前工作**。 |
| **球員兼裁判** | **來源內容：**CS329T 第 3 講第 13 頁把產出與評估分成兩個呼叫；Stanford Law School Module 10 則有更具體的查證例子：Agent 回報建立了檔案，教材到實際目標位置檢查，發現檔案位於產品工作區，而非上傳檔案的原始本機資料夾。[CS329T 第 13 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=13)；[Law School，Module 10〈“Done” is a claim〉、〈Two kinds of verification〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/) **我的歸納：**審查要對照證據與真正被改動的地方；增加另一個 LLM 評語，不等於已完成獨立驗證。 |
| **不同問題選 model／effort** | **來源內容：**CS329T 的 routing 範例把常見、容易問題送較小模型，困難問題送較強模型。[第 9 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=9) **effort 在該講查不到。**補查的**非 Stanford** OpenAI 文件確有〈Reasoning effort〉及〈Change reasoning mid-conversation〉，說明可依工作調整推理量，甚至在支援的配置中途調整。[OpenAI〈Reasoning models〉，兩小節](https://developers.openai.com/api/docs/guides/reasoning) **我的歸納：**可說「**若所有 ticket 都沿用同一配置，會失去按任務分配成本與時間的機會**」；不能說「chat 產品都不能選 model／effort」。 |
| **compact 之後遺忘** | **Stanford 來源內容：**Law School Module 3 說工作 context 有限，長任務可能摘要、挑選或捨棄資訊；CS224N 第 47 頁說視窗裝不下所有事件。[Law School，Module 3〈Context has limits〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[CS224N 第 47 頁](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf#page=47) **「compact 後必然忘記」在這兩份教材查不到。**補查的**非 Stanford** Anthropic 文件明說，可在預設摘要漏掉後續需要的資訊時改寫摘要提示；這直接支持「摘要有遺漏風險」，仍不支持「每次必然遺忘」。[Anthropic〈Compaction overview〉，〈Write your own summarization prompt〉](https://platform.claude.com/docs/en/build-with-claude/compaction) |
| **換 session 的交接** | **來源內容：**Stanford Law School Module 3 說它**不預設**產品會把內容帶到另一個 session；Stanford University IT 的工作坊大綱則直接以「新開 chat 得重講背景」作為 Module 1 的問題，並介紹專案知識與自訂指示。[Law School，Module 3〈Context is more than documents〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[University IT，Program Description、Session 1／Module 1](https://uit.stanford.edu/service/techtraining/class/building-specialized-ai-assistants-claude-projects-analysis) **我的歸納：**交接應留下 ticket 狀態、決策、證據與下一步；這是對你的看板提出的做法，並非教材提供的軟體開發交接規格。 |

**需保留的一個限制：**多 Agent 也會帶來協調問題。Stanford HAI 對 CooperBench 的報導指出，在其特定的雙 Agent 軟體工程測試中，協作表現低於單獨完成，並記錄了訊息沒有轉化成一致行動的例子。因此，這段課程宜說**「按工作需要分工，並設計交接與驗證」**，不要用「一隻必然不夠」作標題。[Stanford HAI〈AI Coding Agents Fail at Teamwork〉，〈Critical Skills〉、〈Talk Is Cheap〉](https://hai.stanford.edu/news/ai-coding-agents-fail-at-teamwork)

## 四、給這兩段投影片的敘事建議

以下**全是我的編排建議**，不是 Stanford 的統一教法；每一步附上它所依據的教材位置。

1. **先放熟悉的 chat：**「我問，AI 答；下一步通常還是我來追問或搬運結果。」用 Stanford Law School 的單次改寫例子開場；先不出現 single／multi-agent 名詞。[Module 1〈Three systems, one question〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)

2. **再用同一張 ticket 暴露六個風險：**需要多種職責、資料越聊越雜、完成回報待驗證、不同工作量使用同一配置、摘要取捨、跨 session 交接。六點應標為**owner 對 chat 協作的觀察**，逐點用上表教材支持其機制；不要稱為 Stanford 提出的「六大限制」。[Stanford Law School，Module 3、10](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[CS329T 第 3 講第 9–13 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=9)

3. **過渡句可用：**「我們已有 Refinement → Done 的路線；問題是 chat 裡的對話，誰負責記住 ticket 在哪一站、把成果交到下一站，並判斷它真的過關？」這是**我的講稿句**。它把前段看板接到 CS329T 第 4 講的「依人類工作流程組織 Agent」，再接到 Law School 的「誰決定下一步？」[CS329T 第 4 講第 8、11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=8)；[Law School Module 1〈Start with one question〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)

4. **最後才介紹變形：**已知路線可用固定 workflow；某站需要根據結果再決定步驟，可交給一個 Agent；職責確實需要分開時，才加入分工與交接。CS329T 第 3 講的模式順序可作後半段參照，但那些模式主要取自 Anthropic，**多次模型呼叫不自動等於多 Agent，多 Agent 也不自動比單 Agent 好**。[CS329T 第 3 講第 6–15 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=6)；[Anthropic〈When (and when not) to use agents〉、〈Building blocks, workflows, and agents〉](https://www.anthropic.com/engineering/building-effective-agents)

**素材取捨：**CS224N 第 29–30 頁的「文字→觀察／行動」圖，適合解釋 Agent 多了什麼；CS224V 第 39–42 頁的圓桌，適合解釋為何要分角色。CS25、CS324 與 HAI Boot Camp 議程經核對後仍可作背景資料，但目前沒有可核實的細部時間點或足夠直接的「chat 六點→軟體開發多 Agent」內容，不宜承擔這次的主論證。[CS224N 第 29–30 頁](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf#page=29)；[CS224V 第 39–42 頁](https://web.stanford.edu/class/cs224v/lectures/2-knowledge-curation.pdf#page=39)；[CS25 V3 課表](https://web.stanford.edu/class/cs25/past/cs25-v3/index.html)；[CS324 課表](https://stanford-cs324.github.io/winter2022/calendar/)；[HAI Day 1 Session 6](https://hai.stanford.edu/events/2025-congressional-boot-camp-on-ai?section=day-1-agenda)