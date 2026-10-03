# 第 1 輪：Stanford 資料調查

**最貼近 owner 敘事的 Stanford 教材，是 Stanford Law School 的非工程師課程：先讓學員辨認「問一次、答一次的 chat」，再比較固定流程與會自行決定下一步的 agent。** CS329T 則提供後半段所需的模式順序：從 prompting，走到 routing、分工、評估，最後才談自主 agent。這是我對投影片編排的**歸納**，不是 Stanford 提出的一套統一教法。[Stanford Law School〈Agents Without the Hype〉，Module 1〈What Makes Something an Agent?〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[CS329T 2025〈Agentic AI〉，PDF 第 6–15 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf)。

以下「有講」只表示查到相應內容；**不把相近概念冒充 owner 六點的原話**。PDF 頁碼均指閱讀器顯示的頁碼。

## 1. 各課程如何開場

| Stanford 資料 | 查到的開場與順序 |
|---|---|
| **Stanford Law School：〈Agents Without the Hype〉** | **來源內容：**Module 1 先舉「貼一段文字請 AI 改寫，得到一次回覆」作為 chat，再舉預先排好的多步驟工作，最後才舉能看結果、決定是否再搜尋的 agent。判斷問題是「誰決定下一步？」這門課明說不要求程式背景，是本輪最接近非工程師受眾的材料。[課程 Module 1〈What Makes Something an Agent?〉、〈Three systems, one question〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/) |
| **CS329T：〈Models, Prompting and RAG〉→〈Agentic AI〉** | **來源內容：**第 2 講先說 LLM 很容易產生流暢回覆，也可能給出錯誤、誤導或不當內容；接著教 prompting、RAG。第 3 講標題是「From Prompting LLMs to Agentic AI」，隨後介紹 workflow 與 agent，以及一系列模式。**歸納：**它先建立「單次輸出需要可靠性」的問題，再增加系統結構；但沒有以 owner 六點逐一批評 chat。[第 2 講，PDF 第 2–4 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%202%20-%20CS%20329T%20Fall%202025.pdf)；[第 3 講，PDF 第 5–15 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf) |
| **CS329A：〈Self-Improving AI Agents〉** | **來源內容：**課程首頁從模型改進、驗證、工具、記憶、規劃與評估安排內容。Stanford Online 發布的 **Part 1〈Course Overview〉官方影片摘要**，先講模型擴展、ChatGPT 與推理，再描述從單回合 chatbot 到 prompt chaining、routing、parallelization、orchestrator-worker。這可佐證「先 chat，後變形」；但我查到的是官方影片摘要，**各段確切分鐘數查不到**，不把摘要當逐字講稿。[課程表〈Course Overview〉及第 9、14、17 講](https://cs329a.stanford.edu/)；[Stanford Online 影片 Part 1〈Course Overview〉及其說明](https://www.youtube.com/watch?v=6YnLB0XbTnI) |
| **CS224N：2026〈RAG and Language Agents〉** | **來源內容：**先講問答與 RAG，才用「語言模型產生文字；agent 根據環境觀察採取行動」引出 agent；之後依序講推理、記憶、工具、評估。它**不是**從日常 chat 的協作困境開場。[Lecture 10，PDF 第 2、29–30、47、68 頁](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf) |
| **CS25：2023 講座** | **來源內容：**11 月 28 日〈Beyond LLMs…〉的課程介紹說要從單一大型語言模型走向自主 agent 系統；10 月 24 日 Jim Fan〈Generalist Agents in Open-Ended Worlds〉著重 Minecraft、機器人與低層控制。**歸納：**適合作「模型能做什麼」的補充，較不適合作 chat 協作問題的主線。兩場細部時間點**查不到**，此處只根據官方講座介紹。[CS25 V3 課表，10/24、11/28 章節](https://web.stanford.edu/class/cs25/past/cs25-v3/index.html)；[Stanford Online〈Beyond LLMs…〉影片說明](https://www.youtube.com/watch?v=ylEk1TE1uBo) |
| **CS324：2022〈Large Language Models〉** | **查不到 agent 章節。**公開課表的章節是模型能力、危害、資料、建模、訓練、擴展、模組化架構等；不能把「模組化架構／檢索」寫成它教過 multi-agent。[CS324〈Calendar〉，全部課程章節](https://stanford-cs324.github.io/winter2022/calendar/)；[〈Lectures〉目錄](https://stanford-cs324.github.io/winter2022/lectures/) |
| **CS329Z：2026〈Engineering AI Agents〉** | **來源內容：**課程首頁把單一模型、複合 AI 系統、自主 agent 當作光譜；第 1 講是這個全景。課表把 workflow 模式與 single／multi-agent 留到 **10 月 12、19 日**；以本輪日期 **2026 年 10 月 3 日** 計，這兩講仍屬預定內容，**不能寫成已講授的結論**。[課程首頁〈Welcome〉及課表第 1、4、5 週](https://cs329z.stanford.edu/) |
| **Stanford HAI 公開講座** | **來源內容：**2025 Congressional Boot Camp 的 Session 6〈Agents on the Rise〉以安排旅行、補領處方藥等日常委託引入 agent，並列出控制權與安全等疑慮。公開議程**沒有足夠內容**可判定講者是否講了 owner 六點或 multi-agent 模式；影片內時間點**查不到**。[HAI 議程，Day 1 Session 6](https://hai.stanford.edu/events/2025-congressional-boot-camp-on-ai?section=day-1-agenda) |

## 2. Owner 六點：Stanford 資料支持到哪裡？

| Owner 的問題 | 本輪判定與來源內容 | 能否直接放成「Stanford 說」？ |
|---|---|---|
| **一人分飾多角色** | **部分對應。**CS329T 的 parallelization 範例讓一個模型實例處理請求、另一個檢查內容；其投影片說，這通常比同一次 LLM 呼叫兼做兩件事好。CS224V 的 CoSTORM 則明確設計專家與主持人角色。[CS329T 第 3 講，PDF 第 10 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf)；[CS224V〈Knowledge Curation〉，PDF 第 39 頁](https://web.stanford.edu/class/cs224v/lectures/2-knowledge-curation.pdf) | **「一人分飾多角色」是 owner 的比喻與我的對照**；教材講的是分開處理不同職責，沒有證明每個 chat 都因此失敗。 |
| **context 污染** | **有相近內容。**Stanford Law School 的 Module 3 比較資訊太少、太多、恰好三種情況，說過時、無關、混淆的資料會與相關資訊競爭；也指出工作指示與參考資料功能不同。[〈Agents Without the Hype〉，Module 3〈Give It Context〉、〈Relevance beats accumulation〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/) | 可說教材**明講無關或過時內容會妨礙工作**；「context 污染」是我們的歸納用語。 |
| **球員兼裁判** | **有相近內容。**Stanford Law School 的 Module 10 說，agent 的完成回報仍是「報告」，重要結果應到 agent 自身回報以外的地方查證。CS329T 另介紹生成者與評估者分開的 evaluator-optimizer。[〈Agents Without the Hype〉，Module 10〈“Done” is a claim〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[CS329T 第 3 講，PDF 第 13 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf) | 可說教材**支持獨立查證／分開評估**。但「兩個 LLM 呼叫」本身不保證獨立、公正，不能誇稱已解決球員兼裁判。 |
| **不能依問題選 model／effort，殺雞用牛刀** | **model：直接有講。**CS329T 的 routing 例子把簡單常見問題送到較小模型、困難少見問題送到較強模型，以兼顧速度與成本。**effort：這些教材沒有直接展示「每張 ticket 選推理 effort」的做法，查不到。**[CS329T 第 3 講，PDF 第 9 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf) | 可引用 **model routing**；「chat 無法選 effort」不可歸給 Stanford，也不是所有 chat 產品的普遍限制。 |
| **compact 之後遺忘** | **精確說法查不到。**Stanford Law School 說 context 是有限工作空間，長任務可能摘要舊工作、只取相關資料，或捨棄資料；CS224N 說 context window 裝不下所有事件，即使裝得下也可能難找出重要事件。[〈Agents Without the Hype〉，Module 3〈Context has limits〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[CS224N Lecture 10，PDF 第 47 頁](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf) | 可說**摘要與有限 context 會帶來資訊取捨**；「compact 後必然忘記某決策」並非這些來源的原話或證據。 |
| **換 session 的交接問題** | **部分直接。**Stanford Law School 的 Module 3 明說不預設不同 session 之間會保留內容。Stanford University IT 一門工作坊的課程大綱，直接以「每次開新 chat 都得重講自己的業務」作為初學者困擾，並在 Module 8 列出 context window 與指示衝突；但這是**課程大綱**，不是我已核對的授課錄影。[〈Agents Without the Hype〉，Module 3〈Context is more than documents〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[University IT〈Building Specialized AI Assistants…〉，Program Description、Module 8](https://uit.stanford.edu/service/techtraining/class/building-specialized-ai-assistants-claude-projects-analysis) | 可說**跨 session 延續不能想當然耳，交接資訊需要明確安排**；不能說所有產品都看不到上一段對話。 |

**研究判斷：**owner 的六點適合作 workshop 的**問題清單**，但不是 Stanford 某一門課提出的六項定律。其中證據最直接的是**分流不同模型、整理 context、獨立驗證、跨 session 不預設延續**；「一人分飾多角色」屬教學比喻，「compact 後遺忘」須另找直接案例，不能借 Stanford 名義背書。上述判斷依據是六列所附的課程章節。

## 3. Single agent、multi-agent、workflow：教材實際怎麼排

**最清楚的順序是 CS329T 第 3 講：**

> 第 2 講 prompting／RAG → 第 3 講先定義 workflow 與 agent → augmented LLM → prompt chaining → routing → parallelization → orchestrator-workers → evaluator-optimizer → 自主 agents → 才列出 planning、tool use、reflection、memory、multi-agent collaboration 等構件。[CS329T 第 2 講，PDF 第 2 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%202%20-%20CS%20329T%20Fall%202025.pdf)；[第 3 講，PDF 第 6–15 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf)。

這套分類在 CS329T 投影片上**明確標註來源為 Anthropic**，不是 Stanford 原創術語。Anthropic 的區分是：**workflow** 的路徑預先安排；**agent** 在執行時由模型決定步驟與工具。Orchestrator-workers 是中央模型依任務動態拆工、委派並彙整；evaluator-optimizer 是一個呼叫產出、另一個呼叫回饋，反覆改善。它們都被列在 workflow 模式下，因此 **「多個 agent／多次模型呼叫」不等於「整套系統是自主 agent」**。[CS329T 第 3 講，PDF 第 6、12–13 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf)；[Anthropic 原文〈What are agents?〉、〈Building blocks, workflows, and agents〉（**非 Stanford**）](https://www.anthropic.com/engineering/building-effective-agents)。

**Single 與 multi 的關係也不是「一隻一定不夠」。**CS224N 先用一個 agent 的「模型核心＋推理＋記憶＋工具＋環境」圖解，再出現 multi-agent debate／orchestrator 範例；CS224V 的 CoSTORM 投影片甚至報告「一位專家加一位主持人已可取得大部分效益」。這支持按工作需要分工，**不支持 agent 數量越多越好**。[CS224N Lecture 10，PDF 第 30、41–43 頁](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf)；[CS224V〈Knowledge Curation〉，PDF 第 46 頁](https://web.stanford.edu/class/cs224v/lectures/2-knowledge-curation.pdf)。Stanford Law School 更提醒：工具多、步驟多，都不足以單獨判定一個系統是不是 agent。[〈Agents Without the Hype〉，Module 1〈Tools do not make something an agent〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)。

## 4. 適合非工程師的圖與比喻

| 可借用的素材 | 原教材的位置；如何用於你的投影片屬**我的建議** |
|---|---|
| **同一件事的三種做法：問一次、固定步驟、會依結果改路線** | Stanford Law School Module 1 已提供三個情境，可改寫成同一張 ticket 的三種處理方式。用「誰決定下一步？」收尾，先不引入 single／multi 的名詞。[〈Agents Without the Hype〉，Module 1〈Three systems, one question〉](https://ailearninghub.law.stanford.edu/agents-without-the-hype/) |
| **Goal → Plan → Act** | CS329T 有三圓圖，和你前段「Goal 拆 ticket」容易接上；但這張圖本身沒有呈現 PR Review、QA 或交接，若要對應看板，需要標明是你自行加的流程。[CS329T 第 3 講，PDF 第 19–21 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf) |
| **說話泡泡 → 觀察／行動循環** | CS224N 用「產生文字」與「觀察環境後採取行動」對照，再畫出模型、記憶、工具、環境。適合用來說明「交給 agent」究竟多了什麼。[CS224N Lecture 10，PDF 第 29–30 頁](https://web.stanford.edu/class/cs224n/slides_w26/cs224n-2026-lecture10-rag-agents.pdf) |
| **一個人一直問 chatbot，與有專家、主持人的圓桌** | CS224V 的 CoSTORM 先比較聊天機器人等資訊取得方式，再用專家圓桌、主持人與心智圖說明如何探索「自己不知道該問什麼」。這張圖服務於**探索知識**的情境；若借到軟體開發流程，須註明是類比。[CS224V〈Knowledge Curation〉，PDF 第 38–42 頁](https://web.stanford.edu/class/cs224v/lectures/2-knowledge-curation.pdf) |
| **「幫我安排行程」** | HAI 面向政策受眾的 Session 6 用安排旅行等日常委託開場，比程式碼例子容易理解。但議程沒有給出具體 agent 架構，適合作開場例子，不適合作多 agent 的證據。[HAI〈Agents on the Rise〉，Day 1 Session 6](https://hai.stanford.edu/events/2025-congressional-boot-camp-on-ai?section=day-1-agenda) |

**供你決定敘事的歸納：**第二段可以先停在「chat 是熟悉的入口；複雜 ticket 會遇到 context、分工、驗證與交接問題」。第三段再沿用既有看板，把 **routing、執行、審查、QA、Goal Check** 畫成不同職責；最後才介紹 single agent、固定 workflow、multi-agent 與自主 agent 各是什麼。這個編排參照 Stanford Law School 的 chat→workflow→agent 入門順序與 CS329T 的模式順序，**不是任何一門課已替你的看板做出的設計**。[Stanford Law School，Module 1](https://ailearninghub.law.stanford.edu/agents-without-the-hype/)；[CS329T 第 3 講，PDF 第 6–15 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf)。

**另列，非 Stanford：**常被一起轉傳的 *Large Language Model Agents MOOC*、*Advanced Large Language Model Agents MOOC* 是 **UC Berkeley RDI** 的課程；Stanford 講者曾出現在 Berkeley 課程中，也不會使整門課變成 Stanford 課。[Berkeley RDI〈Education〉課程列表](https://rdi.berkeley.edu/education)；[Berkeley RDI〈Large Language Model Agents〉課程人員與 syllabus](https://github.com/rdi-berkeley/llm-agents-mooc/blob/main/f24.md)。