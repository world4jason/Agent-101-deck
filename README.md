# Agent 101 Deck

**rev12 候選：107頁（主線95頁、附錄12頁）；原99頁全數保留、各章新增一張 Exit Check（A18–A25），rev11 82頁基線保留。**

**閱讀提醒：請用電腦版閱讀；手機版開發中。** 本版以電腦／投影為正式閱讀環境，手機截圖只用於技術回歸，不視為手機直向閱讀可用性驗收。

用同一個配對 App 的三張票，先看人類如何協作、版本管理與驗收，再看 Agent 接手後的分工、交接與人的決策。

頂端導覽只列八個大章節；章封面小標與導覽章名一致，內頁主題封面不再顯示舊版編號。

- [正式投影片](https://world4jason.github.io/Agent-101-deck/slides/)
- [rev12 執行故事板與頁面對照](docs/issue48-execution-storyboard.md)
- [Issue #49 review 修正的 G1 頁序與先備檢查](docs/issue49-review-fixes.md)
- [Issue #48 交付與檢查紀錄](docs/issue48-delivery.md)
- [rev11 基線 SSOT](docs/rev10-slide-by-slide-v1.md)（原檔名保留）
- [rev11 正式版存檔](slides/rev11.html)
- [rev10原稿](drafts/rev10.html)
- [三版本內容對照](docs/three-version-comparison.md)
- [rev11交付紀錄](docs/rev11-delivery.md)

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

### 本課的唯一看板模型（Canonical Workflow）

- **七個看板狀態欄**：Backlog → Ready → Dev → Review → QA → Product Check → Done。
- **Refinement** 是在 Backlog 梳理工作票、形成共識的活動，不新增看板欄。
- **Product Check** 問「這張票是否符合需求、仍推進 Goal？」；真正的整體 Goal 成效要上線後衡量。
- **Human Gate** 是 Product Check → Done 間的人類放行／暫停決策註記，不是第八欄。放行之前仍停在 Product Check。
- **Merge／Release／上線檢查** 是人放行後、達成此課 DoD 才能 Done 的工作，不因規則層測試通過就自動發生。
- **WIP 計數**採本課自訂示範政策：Dev ～ Product Check 已開始尚未完成的票計入；Blocked／退回／等待仍計入；Ready 尚未開始不計。此非所有團隊的唯一 Kanban／Done 定義。
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


### 教學簡報 Editorial QA｜每輪 PR 必做自我檢查

> **107 頁都沒有溢出，也不等於學員學會了。** 本節是原 P1–P17 與 G1–G5 的延伸檢查，不另創互相競爭的 Gate；遇到與事實／流程一致性衝突時，仍先處理 P0/P1。

| 自檢項目 | 實際判準 | 失敗時要做什麼 |
|---|---|---|
| **Title–Content Alignment**（標題／證據一致） | 教學敘述頁的標題用一個能理解的觀點或結論，主圖／例子真正支持它；章節頁、問題導入、練習頁可使用提問或任務式標題 | 將「Ready」「QA / Verification」等單純主題名改成對學員有用的訊息；避免提前揭露練習答案 |
| **One Teaching Takeaway**（一頁一個學習任務） | 一頁主要教一件事或要求完成一項判斷；一張圖與三個例子可以共同支持同一件事 | 把不相關的第二個教學目標拆到原有頁或移至 Notes，不盲目增加頁數 |
| **Prerequisite Check**（先備知識） | 首次使用 AC／PR／QA／Session 等術語前，已用白話解釋並有具體例子 | 先補先備觀念，不能只在筆記或附錄藏定義 |
| **Chapter Outcome**（章節出口） | 每章具體指定學完「能做什麼」，至少有一項可觀察／可回答的檢核題；要能回扣 Goal → Ticket → Delivery → Evidence | 在 Exit Check 用清楚的問題、參考答案與學員自評補足 |
| **Cognitive Load**（認知負荷） | 主畫面只放當下必要的概念、圖或紀錄；原始 JSON、SHA、完整 CLI、diff 留在 Evidence/Notes；不硬套固定字數 | 分清主畫面／講者筆記／可追溯材料，逐步揭露複雜流程 |
| **Practice Before Reveal**（先作答再揭露） | 練習題真正讓學員先嘗試，答案以可操作的 reveal 展開；不以「問號句」假裝練習，卻同畫面提前給答案 | 增加提問—作答—揭露—回饋的停頓；不能把測試 PASS 當學習成效 PASS |
| **Cross-slide Consistency**（跨頁心智模型一致） | 同一套狀態名稱、狀態欄數、Human Gate 決策點、版本 A/B、時間線與 NOT RUN，前後完全一致 | 全 deck 搜尋並修正全部下游引用，尤其回顧頁 |
| **Visual Accessibility**（真實可讀） | 在 1440×900、投影與目標行動裝置實際看 final screenshot，能辨讀標題、箭頭、卡片、對比與留白；不靠「沒有 overflow」下結論 | 調整密度、層次與對比並重看最終圖，不把驗收 log 當投影片 |
| **Learning Transfer**（可遷移） | 學員離開 Matching App，至少能自己寫一張 Ticket、指定驗收證據，並能接受或退回 Agent 交付 | 在章節出口先自測，最後用自己的工作轉用；必要時真人試教 |
| **Evidence ≠ Teaching**（技術與學習證據分離） | 工程 PASS、模型模擬初學者 READY、真人學員實測各自陳述；不能替代 | G2/G3/G4/G5 分別留明確 evidence 和 NOT RUN |

**標題形式選擇：**概念教學採 Message Title／Assertion–Evidence；問題導入採 Question Title；操作練習採 Task Title；章封面採 Chapter＋Learning Task；出口檢核採學員能回答的 Q&A。不是每頁硬改成結論句，也不是一頁只允許一行字。

**建議 Pattern（不是硬性的科學比例）：**Backward Design／Constructive Alignment（先學習成果與證據）、Merrill's First Principles（問題→示範→練習→遷移）、Multimedia Learning（Coherence／Signaling／Spatial Contiguity／Segmenting／Pre-training）、Worked Example → Guided Practice → Independent Practice、Progressive Disclosure、SCQA／MECE。不要將 6×6、10/20/30 等字數規則當萬用學術標準。

**八章 Exit Checks：**每章末一張，共八張；每張三題 Q&A，先讓學員思考或口頭作答，按鈕才揭露參考答案；每張對應「章節學完能做什麼」，而非名詞背誦。附錄的檢核強調「能查找／辨認」，不要求背誦全部方法。

**合併前 Review 追問：**
- 學員不看講者筆記，能否用自己的話說出這頁標題？
- 主圖、內文與證據是否支持標題，還是只是工程紀錄？
- 走到這頁時，學員是否已經理解所需術語和情境？
- 學員能否在揭露答案前自行判斷？講者的回饋在哪裡？
- 這次修改是否改變所有後續流程、Q&A、筆記和測試？
- 改完最新 HEAD 是否真正重看，而非沿用前一版 PASS？

**參考研究與實務來源：**
- Michael Alley, Assertion–Evidence：https://www.engr.psu.edu/speaking/VISUAL-AIDS.html
- Garner & Alley, *How the design of presentation slides affects audience comprehension*：https://pure.psu.edu/en/publications/how-the-design-of-presentation-slides-affects-audience-comprehens/
- M. David Merrill, *First Principles of Instruction* (2002)：https://doi.org/10.1007/BF02505024
- CAST UDL Guidelines v3.0：https://udlguidelines.cast.org/

### 教材 PR 的五道必要 Quality Gates

> 以下是 P1–P17 的**執行流程**，不是另一套彼此競爭的原則。每道關卡都要記錄審查版本、涵蓋範圍、結果與證據；未執行寫 **NOT RUN**，不能用其他關卡的 PASS 代替。

| Gate | 必須實際檢查什麼 | 最低可核對產出 |
|---|---|---|
| **G1 故事板／先備知識**（製作前） | 按學員視角從開場到結尾推演完整故事，確認 Brainstorming、Goal、需求／票、版本、驗證到 Agent 接手的因果順序；不能只看 SSOT 合規，因為規格也可能錯。 | 逐頁主張、首次名詞、前後轉場、先備概念與待修頁面。 |
| **G2 事實／證據一致性**（示範材料完成後） | 沿同一 Matching 案例逐頁比對票、AC、版本、fixture、PASS／FAIL／NOT RUN、WIP、Human Gate 與時間線；重演所有需要驗證的命令，不能用示意冒充實測。 | 實際版本／commit、重跑結果、證據連結、跨頁不一致清單。 |
| **G3 Blind Beginner Review**（候選教材完成後） | 審查者**只從第一頁順序看完整成品，不先讀規格、PR 說明或作者解釋**；以不懂軟工／PM／Agent 的學員身分，記錄未教先用、故事跳步、混淆名詞、跟不上的位置。 | 「頁碼 → 看不懂什麼 → 缺的前提 → 可能誤解 → 建議示範」及學員可否提出下一步。 |
| **G4 簡報敘事／視覺**（成品截圖後） | 真正查看桌面、投影尺寸與手機等目標畫面，包含改動頁及其前後頁；檢查**一頁一主張**、圖文一致、視線順序、箭頭碰字、對齊、留白、字級、對比與密度。幾何／無溢出測試不等於視覺通過。 | 最終版本截圖、具體頁面 findings、修正前後對照。 |
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
```

`npm run check:rev11` 可回歸保留的舊版；`npm run check:rev12` 檢查 107 頁候選的載入、導覽、講者筆記連結與畫布邊界。`DECK_URL` 可指定入口；`BROWSER_CHANNEL=chrome` 可使用已安裝的Chrome。逐頁截圖與驗證結果輸出到 `drafts/rev12-review/`，由Git忽略；候選 manifest 保留頁序、來源、材料和 SSOT 雜湊。
