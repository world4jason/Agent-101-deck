# Agent 101 Deck

**rev12 候選：107頁（主線95頁、附錄12頁）；原99頁全數保留、各章新增一張 Exit Check（A18–A25），rev11 82頁基線保留。**

**閱讀提醒：請用電腦版閱讀；手機版開發中。** 本版以電腦／投影為正式閱讀環境，手機截圖只用於技術回歸，不視為手機直向閱讀可用性驗收。

用同一個配對 App 的三張票，先看人類如何協作、版本管理與驗收，再看 Agent 接手後的分工、交接與人的決策。

頂端導覽只列八個大章節；章封面小標與導覽章名一致，內頁主題封面不再顯示舊版編號。

- [正式投影片](https://world4jason.github.io/Agent-101-deck/slides/)
- [版本總覽｜v7、v10、最新版及 PPTX 下載](versions/)
- [v7 存檔｜44 頁](versions/v7/)（來源：2026-10-01 合併版本 e33e696）
- [v10 草稿｜55 頁](drafts/rev10.html)
- [最新版 PPTX｜107 頁](downloads/agent101-current.pptx)
- [v10 PPTX](downloads/agent101-v10.pptx) · [v7 PPTX](downloads/agent101-v7.pptx)
- [rev12 執行故事板與頁面對照](docs/issue48-execution-storyboard.md)
- [Issue #49 review 修正的 G1 頁序與先備檢查](docs/issue49-review-fixes.md)
- [Issue #48 交付與檢查紀錄](docs/issue48-delivery.md)
- [rev11 基線 SSOT](docs/rev10-slide-by-slide-v1.md)（原檔名保留）
- [rev11 正式版存檔](slides/rev11.html)
- [rev10原稿](drafts/rev10.html)
- [三版本內容對照](docs/three-version-comparison.md)
- [rev11交付紀錄](docs/rev11-delivery.md)

## 開場先給 Whole Picture（Advance Organizer）

**不是固定四個、五個或八個教學階段，而是讓零基礎學員先看懂整份教材的目的與前後關係。** 目前八章照現有教學需要保留；若確實存在學習斷點，可依 G1 審查證據討論增加、合併或調整章節。

**整份教材要回答的問題：**如何用同一個配對 App，先理解人類軟體開發的合作方式，再把可交辦的工作交給 Agent，最後由人根據工作票、版本與證據驗收？

目前的路線是：

- **人類先怎麼合作？**（C0）：有哪些職能、交回什麼、怎麼接力。
- **如何讓工作可交辦？**（C2）：從想法、Goal、Ticket 到 Ready。
- **多人怎麼協作修改？**（C1）：Git、commit、branch、PR、merge。
- **怎麼證明真的完成？**（C3）：Dev、Review、QA、AC 與規則層證據。
- **誰決定可否放行？**（C4）：Human Gate、Done 與上線後 Goal 的差別。
- **Agent 能接手哪些職能？**（C5）：先一人＋一 Agent 的完整交付，再談多 Agent／Workflow／Session。
- **人怎麼驗收 Agent？**（C6）：交辦、退回補驗、接續、核對版本與證據。
- **附錄是查閱工具箱**（APP）：不是必修的第八段主線，按需使用。

**具體呈現規則：**第 2 頁提供完整可點擊的章節路線與各章核心提問；頂部既有八章導航保留；章封面標示當前位置、允許回看全圖。Outline 不只列名詞，而須表達章節的因果關係。新增章節須先說明前提缺口，並同步 Storyboard、Manifest、導航與 Exit Checks。

## 教材製作與 Review Principles

> **單頁正確，不代表教材正確。**
>
> 一頁只有在「前置知識、術語、running example、版本、證據、狀態與後續結論」全部一致時，才算正確。
>
> **Correct locally is not enough.** A slide is correct only when its prerequisite, terminology, running example, version, evidence, state, and downstream conclusion are all consistent.

這份 deck 的預設受眾是第一次接觸軟體工程、專案管理與 Agent 工作流程的人。任何新增、重排或修改都必須遵守以下原則；PR review 也應依同一套規則驗收。

| # | Principle | 固定規則 |
|---|---|---|
| P1 | Audience first | 預設學員是完全不懂軟體工程／專案管理的行銷、老師、行政等非工程背景受眾。術語第一次出現前，先用白話建立概念。 |
| P2 | Prerequisite before consequence | 一個概念只能在前置知識已出現後使用。敘事應是「先遇到問題 → 再引出工具／概念」，不能先給答案再補前提。 |
| P3 | Brainstorming → Goal → Ticket → Delivery → Evidence | 教學主線從 **Brainstorming → Goal → Backlog（於 Refinement 活動形成票、AC／AT／DoD）→ Ready → Dev → PR Review → QA／Verification → Product Check → Human Gate（欄外決策）→ Merge／Release／檢查 → Done**，上線後再量 Goal 成效；敘事不能先給結論才補形成過程。 |
| P4 | One canonical running example | 配對 App 與工作票是同一條 running example。全 deck 不可偷偷產生第二條互相矛盾的版本／案例世界線。 |
| P5 | One state, one timeline | 同一案例只能有一條版本、測試與證據時間線。倒帶、快轉、切換 snapshot 時必須在投影片主畫面明說。 |
| P6 | Evidence proves exactly the claim | Evidence 只能支持它真正驗證過的 claim。規則層、UI、整體串接、Goal 驗收必須分層，不可互相代替。 |
| P7 | No evidence → no claim | 沒跑就是 NOT RUN；沒有獨立證據就不能宣稱 PASS／Done；沒有真人試教就不能宣稱學習效果已驗證。 |
| P8 | Roles ≠ People ≠ Agents | PO／Dev／Reviewer／QA 是責任，不等於人數，也不等於 Agent 數量。獨立驗證可由另一 Agent 或人承擔。 |
| P9 | Single Agent before Multi-Agent | 先完整示範「一個人 + 一個 Agent」如何拿票、執行、測試、回報、被退回、修正與驗收，再引入 Multi-Agent。 |
| P10 | Separate orthogonal concepts | Chat、Agent、Workflow、Agent count、Model、Effort、Session、Context、Memory、WIP 是不同軸，不可由一個問題直接推出另一個方案。 |
| P11 | Teach the minimum visible truth | 主投影片只放學員此刻需要理解的資訊；raw JSON、完整 diff、replay path、完整 hash 等審計細節放 Evidence / Notes。 |
| P12 | Change propagates downstream | 改案例、版本、狀態、頁序或術語後，必須全 repo 搜尋並同步 deck、storyboard、notes、exercise、demo、manifest 與 README。禁止只 local fix。 |
| P13 | SSOT over duplicated truth | 同一個事實只保留一個 canonical source。投影片引用 evidence，不另外手打一份「差不多」的結果。 |
| P14 | Exercise ≠ Answer sheet | 練習必須先讓學員做決策／輸出，再 reveal 答案；不能同頁先把正解與完整結果全部公開。 |
| P15 | Every instruction must be executable | Deck、exercise、README 出現的命令、prompt、操作步驟，都必須由 reviewer 原樣 copy-paste 實跑一次。 |
| P16 | Preserve scope intentionally | 重排是為了解決敘事，不是順手刪章節或擴 scope。延伸議題應另列 Issue，不偷塞進當前 PR。 |
| P17 | Different gates prove different things | Content correctness、Evidence correctness、Narrative QA、Desktop/Mobile QA、真人小白試教、Release 是不同 gate；一個 gate 通過不代表其他 gate 通過。 |

### 初學者術語與教學例子

- **Agent：**按照工作票決定下一步、使用工具、讀取結果並繼續工作的 AI。
- **Context：**Agent 這一輪已取得且可以使用的資料，例如 Ticket、AC、已測紀錄。資料存在專案中，不代表本輪已讀到。
- **AC（Acceptance Criteria）：**怎樣的結果能接受。配對例：單向 0 筆，雙向 1 筆，重複 Like 不新增。
- **AT（Acceptance Test）：**怎樣驗證 AC。例：先有一筆配對，再次 Like，預期仍只有一筆；執行前是預期，執行後才有實際 Evidence。
- **Refinement：**持續釐清工作票的活動，通常讓 Backlog 漸漸可進 Ready；開發或測試遇到需求不清楚、無法執行或無法驗證，也要把問題記回票面討論。七欄看板不為它另增欄位。
- **Version B 補驗前／補驗後：**同一份 Version B 程式，原 Evidence 資料夾名稱為 B-pre 與 B-post；前者重複 Like 尚未執行，後者新增重複 Like 的結果。沒有新增 UI 整合／部署證據。
- **兩種 Agent 工作安排：**Grill Me 協助人逐題澄清、由本人確認；Superpowers 有人核准設計後才建立計畫、實作和 Review。兩者都需依工作範圍核對成果。參考 [Grill Me](https://github.com/stevegsax/grill-me) 與 [Superpowers](https://github.com/obra/superpowers)。

用語原則：在主畫面以「不希望發生的錯誤配對」「怎樣驗」「哪些未測」這類自然語句描述任務。避免將尚無觀測的錯配事件寫成 0；不得靠模糊的工程名詞替代明確的測試前提與資料來源。

參考：[Agile Alliance Acceptance Testing](https://agilealliance.org/glossary/acceptance-testing/)；[Scrum.org Product Backlog Refinement](https://www.scrum.org/resources/product-backlog-refinement)；[OpenAI Agents SDK Agents](https://openai.github.io/openai-agents-python/agents/) 與 [Context](https://openai.github.io/openai-agents-python/context/)。

### 本課的唯一看板模型（Canonical Workflow）

- **七個看板狀態欄**：Backlog → Ready → Dev → Review → QA → Product Check → Done。
- **Refinement** 是在 Backlog 梳理工作票、形成共識的活動，不新增看板欄。
- **Product Check** 問「這張票是否符合需求、仍推進 Goal？」；真正的整體 Goal 成效要上線後衡量。
- **Human Gate** 是 Product Check → Done 間的人類放行／暫停決策註記，不是第八欄。放行之前仍停在 Product Check。
- **Merge／Release／上線檢查** 是人放行後、達成此課 DoD 才能 Done 的工作，不因規則層測試通過就自動發生。
- **WIP 計數**採本課示範政策：票首次進 Dev 算已開工，到 Done 前仍計入；即使退回 Backlog／Refinement、Blocked 或等待驗收，也不會變回 0。未開工的 Backlog／Ready 不計；此非所有團隊唯一的算法。
- **Evidence scope**：Matching A/B 真實實測只涵蓋規則層；任何 Done／Merge／UI／Release 畫面若無實際外部證據，必須明示為條件式教學流程推演。

### Merge gates

以下六條視為硬規則。任何一條不成立，PR 不應直接 merge：

1. **前面沒教過的東西，後面不能假設學員懂。**
2. **同一 running example 只能有一條版本／狀態／證據時間線。**
3. **每個 PASS／FAIL／Done 都能回答：哪個版本、哪個 case、哪份 evidence？**
4. **改一頁的事實，要搜尋並核對全 deck 與 supporting material 的所有引用；禁止只 local fix。**
5. **投影片上的命令、prompt、操作流程，必須原樣實跑。**
6. **Reviewer 必須同時回答：這句話本身正確嗎？小白走到這一頁時，已經有足夠資訊理解它嗎？**

### Evidence presentation

「Evidence 必須真實」不等於「所有 evidence 都要塞進投影片」。

主畫面優先呈現：
- 人交代了什麼。
- 工具實際回傳什麼。
- 預期與實際差在哪裡。
- Agent 做了什麼修改。
- 相同 case 重測後結果如何。
- 交回哪個版本、還有哪些 NOT RUN。

詳細 evidence 再放到可追溯材料：
- artifact path / candidate ID
- SHA-256 或其他版本指紋
- command
- raw JSON
- diff
- replay / log

第一次使用技術識別時要給白話定義，例如：**「檔案指紋：用來確認測的是同一份程式；不一定等於 Git commit。」**

### Reviewer checklist

每次內容變更至少逐項檢查：

- **Prerequisite：**這頁使用的術語與概念，前面是否已經教過？
- **Narrative：**上一頁為什麼自然地需要這一頁？這一頁又交出什麼給下一頁？
- **Running example：**案例、ticket、角色與目標是否仍是同一條故事？
- **State / timeline：**版本、PASS／FAIL／NOT RUN、Human Gate 是否與前後頁一致？
- **Evidence：**這個證據真的支持這個 claim 嗎？是否跨越了規則層／UI／整體產品的驗收邊界？
- **SSOT：**數字、版本、命令、結果是否直接來自 canonical material，而不是手動複製的第二份真相？
- **Executability：**命令、prompt、操作步驟是否已原樣跑過？
- **Cognitive load：**主畫面是否只保留此刻必要的資訊？工程審計細節是否應移到 Evidence / Notes？
- **Exercise：**若這頁是練習，學員是否先有真正做判斷的空間，再看到答案？
- **Propagation：**本次改動是否已同步 storyboard、slides、notes、demo、exercise、manifest、README？
- **Gate：**內容、證據、瀏覽器畫面、真人試教等狀態是否分開陳述，沒有把其中一項通過寫成全部通過？


### 教學投影片設計 Guideline｜十項可驗收原則（2026-10-11）

> **目的：**讓非工程背景學員能理解、記住、串接前後知識，並在練習中運用。這是原 P1–P17 與 G1–G5 的共同編輯規範，**不另外發明一套 Gate**；各頁真正的事實、驗收範圍與人類放行仍須符合現有規則。

| 原則 | 製作要求 | Reviewer 如何判斷／不符合時怎麼修 |
|---|---|---|
| **1. 先給全貌與章節定位** | 課程開場有 Whole Picture；每章開始交代已知前提、這章要學的任務、學完能做什麼。 | 觀眾能說出本章為何接在上一章後。避免每章用同一套三張文字卡；用短路徑或真正的實例。 |
| **2. 一頁有一個教學任務** | 一頁主要用於解釋、比較、決策、操作或練習之一；多個例子可共同支持同一主張。 | 能指出這頁唯一要帶走的判斷。若流程、定義、例外、完整工作票同時爭注意力，移入 Notes、分步揭露或合理增頁。 |
| **3. 相鄰頁有資訊增益** | 每頁交代「前頁已知 → 本頁新增 → 下頁要用它回答什麼」，名詞先教後用，情境與時間線不任意跳回。 | G1 要檢查前後至少各一頁；沒有新增能力的重複需合併或改成練習。換案例、切到補驗前時要有可見的情境定位。 |
| **4. 標題與主畫面一致** | 概念頁優先採 **Message Title／Assertion–Evidence**，標題表達觀點，圖／例／資料支持它；問題、練習與章封面可以使用問句或任務式標題。 | 蓋住 Notes 也能從主畫面找到標題依據。練習標題不得先洩漏答案；避免只有「Review」「Context」等無方向的主題名。 |
| **5. 讓圖解真正表達關係** | 用箭頭表示順序／退回／依賴，用表格比較條件，用資料標明預期與實際；視覺提示貼在對應元素旁。 | 若移除彩色卡片外框後只剩好幾段可逐字唸的文字，重新設計圖解；箭頭不得為裝飾或指錯方向。 |
| **6. 控制認知負擔** | 遵循 **Coherence、Signaling、Segmenting、Pre-training**：刪除當下無關細節，突顯目前焦點，複雜流程依時間分段，必要術語先以白話建立。 | 不同時間點、完整表單與驗收結果不應預先同權重顯示；不要用縮小字型或換成多張顏色卡來假裝減少資訊。 |
| **7. 投影可讀性與無障礙** | 使用一致字級層次、留白、清楚對比與可辨箭頭；狀態同時顯示文字，不只用紅綠顏色。 | 在本輪實際支援的桌面／投影尺寸看**最新截圖**，核對標題、表格、圖與小字；沒有 JavaScript 錯誤和 overflow 不代表投影片易讀。 |
| **8. 主張有真實且有界線的證據** | 規則層、UI、整合、部署的證據不能混稱；Version A／B、補驗前／後、PASS／FAIL／NOT RUN 要有一致的版本與時點。 | 見到數值或成功宣稱，必須找得到來源及測試範圍；流程假設明示「教學示意」，不可把尚未執行的測試寫成 PASS。 |
| **9. 練習能驗證學會了什麼** | 學習目標、示範、練習與 Exit Check 對應；學員先作答，再揭露參考答案和回饋。 | 不能只問縮寫定義。至少能讓學員根據一張票、預期／實際結果提出接受、補驗或退回的理由；保留遷移到自己工作的機會。 |
| **10. 全課術語、案例與角色一致** | 持續用 Matching App 的 #1 輸入 → #3 配對 → #2 列表；同一 Workflow、WIP、Human Gate、Agent／Context、AC／AT／DoD 前後定義一致。 | 逐頁找沒有解釋的英文、制式 AI 話術與空泛新名詞；以人會說的具體操作替代，例如「不希望發生：錯誤配對」，不要使用「護欄訊號」。 |

#### 版面選擇與資訊分層

**學員畫面**只放此刻的主張、可理解它的圖／例子，以及影響判斷的狀態。**講者筆記（Notes）**放名詞細節、提問方式、轉場、操作口令與補充說明。**Evidence／附錄**保留 raw JSON、完整 SHA、執行命令、diff、文獻與可重播資料。精簡畫面時**不可以刪掉可追溯證據**。

優先依資訊類型選版型：時間／交接用路徑圖、條件用決策表、前後差異用對照、驗收用預期／實際／未測、練習用「先回答 → 揭露」。**圖片與動畫不是必要條件**；沒有教學功能的裝飾應移除。P23 的 AT 可用「已配對一筆 → 再按 Like → 預期仍是一筆」表示；執行前 Evidence 必須是 NOT RUN。

#### 可讀性的實務參考

- Waterloo 的教學簡報指南提供**標題約 32–40 pt、內文約 24–28 pt** 的起始建議；其無障礙清單偏好 24–32 pt，18 pt 是較低的數位閱讀建議，**不能當成教室後排一定可讀的保證**。網頁 CSS px 和 PPTX pt 也不可直接視為同一單位。
- 網頁版以 **WCAG 2.2 AA** 作數位可讀性參考：一般文字對比至少 4.5:1、大字至少 3:1；理解內容必需的圖形／控制元件至少 3:1。顏色不是 PASS／FAIL 的唯一訊號。符合對比數字仍需人工看投影。
- **五秒掃讀**是專案編輯檢查：請審查者不看 Notes，快速辨認主張、先看哪裡、狀態代表什麼。它不是已證實的普遍學習測驗。**6×6、10/20/30、固定字數、固定頁數、每頁三卡**也不是強制科學標準。
- 真實練習可有必要重複：介紹 AC → 在 #3 案例使用 → 讓學員獨立驗收，三次用途不同。要移除的是**沒有新增判斷能力**的重述。

#### 每輪 PR 的操作驗收（直接對應 G1–G5）

| 階段 | Reviewer 必須留下的可核對證據 |
|---|---|
| **G1 故事板** | 逐頁「已知／新增／下一頁問題」、章節學習成果、術語首次定義、與本次變更相關的相鄰頁；調整頁數／頁序可以，但更新 SSOT。 |
| **G2 事實與示範** | Ticket、AC/AT、候選版本、預期／實際、原始 Evidence、NOT RUN 及 Human Gate 的對應；演示命令真正重跑。 |
| **G3 零基礎審查** | 不預讀作者解釋的審查者，記錄頁碼、看不懂什麼、缺少什麼前提、會做錯哪一步；AI 模擬不能冒稱真人試教。 |
| **G4 視覺審查** | **最新 HEAD** 之改動頁及相鄰頁真實截圖，檢查畫面主角、視線順序、文字密度、字級、對比、箭頭、圖／文對齊；必要時 before／after；與作者的自檢分開。 |
| **G5 成品驗收／人放行** | 最新 SHA、重建結果、互動與鍵盤操作、章末答題揭露、頁面幾何、PPTX 同步、剩餘 P0／P1／P2、各項 NOT RUN；由 Owner 決定 Merge／Release。 |

**放行界線：**事實錯誤、反向證據、學習所需先備概念缺失、嚴重跨頁跳接、主畫面無法辨讀、練習提前洩漏答案等列 **P0／P1**，應先修再重新截圖審查。可讀性小調整列 **P2** 並指向頁碼。**不得**把自動化測試 PASS、模型審查 PASS、真人教學成效、正式發布混成一個狀態。

#### 研究來源與適用界線

以下**研究原則或機構指南**支持大方向；表格中的具體 G1–G5 操作、五秒掃讀、PR 優先級屬**本專案的工作規範**，不應描述為論文驗證過的數值標準。

- **Mayer／Fiorella，Cambridge Handbook of Multimedia Learning（2021）**：Coherence、Signaling、Redundancy、Spatial／Temporal Contiguity。https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning/F29A19FCD34C542806F736E0661C05F5
- **Mayer／Fiorella（2021）**：Segmenting、Pre-training 與 Modality。https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-managing-essential-processing-in-multimedia-learning/A9E77D0172F905AC957689D1771E2888
- **Garner & Alley（2013）**：Assertion–Evidence，110 位工程學生的理解、回憶與認知負擔比較；研究發現不能直接保證任何其他教材對所有人同樣有效。https://pure.psu.edu/en/publications/how-the-design-of-presentation-slides-affects-audience-comprehens/
- **Carnegie Mellon Eberly Center**：課程依學習目標組織，從先備能力逐漸整合，並讓教學、練習與評量互相對應。https://www.cmu.edu/teaching/designteach/design/contentschedule.html ；https://www.cmu.edu/teaching/assessment/basics/alignment.html
- **University of Waterloo CTE**：一頁主題、主張與圖形匹配、簡潔投影文字、字級、對比與留白。https://uwaterloo.ca/centre-for-teaching-excellence/catalogs/tip-sheets/designing-visual-aids ；https://uwaterloo.ca/centre-for-teaching-excellence/accessibility-checklist-ms-powerpoint
- **W3C WCAG 2.2**：文字、圖形／控制元件對比以及不可只靠顏色傳達資訊的數位無障礙基準。https://www.w3.org/TR/WCAG22/

**對應 Issue：**[#51 標題與畫面對齊](https://github.com/world4jason/Agent-101-deck/issues/51)、[#53 主畫面／Notes／Evidence 分層](https://github.com/world4jason/Agent-101-deck/issues/53)、[#54 演練與學習遷移](https://github.com/world4jason/Agent-101-deck/issues/54)、**[#55 G4／G5 視覺驗收](https://github.com/world4jason/Agent-101-deck/issues/55)**。此處是長期準則，執行狀態與未通過頁面追蹤在 #55。

### 教材 PR 的五道必要 Quality Gates

> 以下是 P1–P17 的**執行流程**，不是另一套彼此競爭的原則。每道關卡都要記錄審查版本、涵蓋範圍、結果與證據；未執行寫 **NOT RUN**，不能用其他關卡的 PASS 代替。

| Gate | 必須實際檢查什麼 | 最低可核對產出 |
|---|---|---|
| **G1 故事板／先備知識**（製作前） | 按學員視角從開場到結尾推演完整故事，確認 Brainstorming、Goal、需求／票、版本、驗證到 Agent 接手的因果順序；不能只看 SSOT 合規，因為規格也可能錯。 | 逐頁主張、首次名詞、前後轉場、先備概念與待修頁面。 |
| **G2 事實／證據一致性**（示範材料完成後） | 沿同一 Matching 案例逐頁比對票、AC、版本、fixture、PASS／FAIL／NOT RUN、WIP、Human Gate 與時間線；重演所有需要驗證的命令，不能用示意冒充實測。 | 實際版本／commit、重跑結果、證據連結、跨頁不一致清單。 |
| **G3 Blind Beginner Review**（候選教材完成後） | 審查者**只從第一頁順序看完整成品，不先讀規格、PR 說明或作者解釋**；以不懂軟工／PM／Agent 的學員身分，記錄未教先用、故事跳步、混淆名詞、跟不上的位置。 | 「頁碼 → 看不懂什麼 → 缺的前提 → 可能誤解 → 建議示範」及學員可否提出下一步。 |
| **G4 簡報敘事／視覺**（成品截圖後） | 真正查看桌面、投影等本輪支援尺寸；手機版開發中，僅做載入 smoke test，包含改動頁及其前後頁；檢查**一頁一主張**、圖文一致、視線順序、箭頭碰字、對齊、留白、字級、對比與密度。幾何／無溢出測試不等於視覺通過。 | 最終版本截圖、具體頁面 findings、修正前後對照。 |
| **G5 Final Artifact／Human Gate**（每輪修正後） | 以**最新 PR HEAD** 重新執行相關測試與跨頁檢查；P0／本次範圍內 P1 解決後，重新看**修正後的完整成品**，不能沿用舊截圖或舊 reviewer PASS。最後由人判斷是否接受及合併。 | HEAD SHA、各 gate 狀態、已關閉 findings 與重驗證據、Human 放行紀錄。 |

### Review 報告與放行標準

- 每位審查者應記錄：**審查角色／是否真正獨立、版本 SHA、實際看到的範圍、finding 頁碼、嚴重度、原因、可執行的修法、證據連結、修正後重審結果**。若僅同一模型扮演不同角色，不得宣稱已由獨立審查者確認。
- **P0：阻擋放行**（如案例事實與證據相反、重大敘事順序倒置、主畫面無法辨讀）。**P1：本次必修**（影響教學理解、驗收或本 PR 目標）。**P2：可追蹤**（不影響本次目標者另開 Issue，註明原因）。不能因有自動測試 PASS 就略過 P0/P1。
- **工程品質、內容／證據、故事連貫性、視覺品質、真人學員成效分開驗收**；沒有實際執行的 gate 標記 NOT RUN，不得寫成全面 PASS。
- **學習成果要驗證三件事：**學員能描述從想法到交付的軟工流程；能說出要交辦哪種職能及其交付物；Agent 說完成時能根據工作票、版本和證據提出接受或退回的理由。真正的學習成效須由符合受眾的真人試教驗證。
- **修改範圍控制：**本 PR 的 P0/P1 在本 PR 內修正；與本次無關的擴充列 Issue，不藉 Review 任意改既定章節或增加功能。所有合併決定保留 Human Gate。

## 內容

| 頁碼 | 章節 |
|---|---|
| 1–8 | 人類如何合作：角色、成果、證據與關卡 |
| 9–30 | 從想法到 Ready：範例、Example Mapping、AC／AT／DoD |
| 31–38 | 版本與協作：commit／branch／PR／merge |
| 39–49 | 實作、Review、QA、黑箱驗收與證據 |
| 50–54 | 放行、單票完成與整體驗收 |
| 55–82 | Agent 演進：session、交接、分工、workflow 與原則 |
| 83–95 | Agent 交付與人的驗收；人定方向與放行 |
| 96–107 | 附錄：BDD、TDD、SBE、演練與架構 |

## 播放與部署

根目錄 `index.html` 保持導向 `/slides/`；`slides/index.html` 是本分支的 rev12 候選，頁面仍須完成審閱。舊 rev11 可由 `slides/rev11.html` 直接開啟。GitHub Pages沿用main分支的根目錄部署，無需伺服器端build。

左右鍵、PageUp／PageDown、Home／End或頁面按鈕翻頁。一頁完整顯示，每次前進一頁。O開目錄、N開講者筆記、Esc關閉。沿用／調整頁可連到rev10原頁。

rev10保留原內容與原fragment操作；`drafts/rev11-base.css` 固定它依賴的基礎樣式。工具試作、研究原文與截圖留在原工作目錄，不是正式版執行依賴。

## 版本切換與 PowerPoint 匯出

[版本總覽](versions/) 可選擇 v7（44 頁）、v10（55 頁）與 rev12（107 頁）；三個網頁版底部工具列也可切換版本或下載對應 PPTX。

歷史版本都有固定網址。v7 擷取自 Git commit e33e696 的 HTML、CSS、JS 與圖片；v10 使用 drafts/rev10.html，兩者不受 rev12 產生器改寫。

三份 PowerPoint 存在 downloads/。匯出使用 Playwright 擷取投影片畫面，透過 PptxGenJS 放入 16:9 PowerPoint。每張投影片以圖片呈現，保留字型、色彩與位置；文字和圖形不可直接編輯，按鈕與逐步揭露請使用網頁版。最新版的講者筆記及 Exit Check 參考答案保留在 PowerPoint 備忘稿。

匯出指令：

    npm ci
    npm run export:pptx             # 重建三個版本
    npm run export:pptx:current     # 只更新最新版
    npm run check:versions          # 檢查版本切換、連結及下載路徑
    npm run check:exports           # 檢查 PPTX 格式、頁數、圖片、備忘稿

更新網頁版後需要重建對應 PPTX，連同下載檔一起提交。若要讓文字與圖形在 PowerPoint 中可編輯，須另行建立原生元件的轉換流程。

## 修改與重建

先更新 `docs/issue48-execution-storyboard.md`，再修改 `scripts/build_rev11.py` 中對應頁的內容。產生器寫入 `slides/index.html`、`drafts/rev12.html` 與 `drafts/rev12-review/manifest.json`，並將原 82 頁存為 `slides/rev11.html`；不要直接修改生成的HTML。

```sh
python3 -m pip install -r requirements-dev.txt
python3 scripts/build_rev11.py
```

## 檢查

```sh
npm ci
npx playwright install chromium
python3 -m playwright install chromium
python3 -m http.server 4318 --bind 127.0.0.1
```

另開終端機執行：

```sh
npm run check:rev11
npm run check:rev12
python3 tests/deck_check.py
python3 tests/narrative_progression_test.py  # G1：檢查跨頁新增資訊與案例／證據時間線
```

`npm run check:rev11` 可回歸保留的舊版；`npm run check:rev12` 檢查 107 頁候選的載入、導覽、講者筆記連結與畫布邊界。`DECK_URL` 可指定入口；`BROWSER_CHANNEL=chrome` 可使用已安裝的Chrome。逐頁截圖與驗證結果輸出到 `drafts/rev12-review/`，由Git忽略；候選 manifest 保留頁序、來源、材料和 SSOT 雜湊。
