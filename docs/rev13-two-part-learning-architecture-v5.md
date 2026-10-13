# Rev13 v5｜兩部分教學架構：先認識，再組合

> **REFINEMENT 規劃稿，不是已製作的投影片，也不是 G1／G4 PASS。**
> Parent Goal：[Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60)；規劃：[Draft PR #61](https://github.com/world4jason/Agent-101-deck/pull/61)。
> 本版結構性 SSOT：本文件＋[v5 manifest](rev13-two-part-manifest-v5.json)。Part 2 直接沿用 [v4 內容及證據時間線](rev13-workflow-first-content-refinement-v4.md) 的 O03–X01，不複製第二份真相。
> **GitHub Actions / Workflow 現在無法使用：本次不更動 `.github/workflows/`，不依賴遠端 CI 宣稱 PASS。**

## 0. 設計決議

**Part 1 — Recognize / Pre-training**：先建立「人／流程／文件／版本管理→再加 Agent」，介紹每個 Stage 的 Target、Input、Actions、Output、Exit Criteria、職能／參與時點，以及相關 GitHub 物件。這部分是學會辨認地圖，不要在此跑完 Matching 的 QA。

**Part 2 — Apply / Lead by Example**：回到同一套母圖，沿同一 Matching #3 Ticket 走過 Brainstorming → Refinement → Ready → Dev → PR Review → QA → Product Check → Human Gate，再用同一份工作契約比較 Agent 三模式及五項協作原則。這部分重點是狀態如何改變、誰做什麼、對應哪份文件與版本。

**嚴格避免兩次講同一套流程**：Part 1 Stage Cards 只放一行 Matching App 預告（例如「有人想做配對」），不展示 A FAIL、B-pre、B-post 結果；Part 2 再逐步揭露完整案例。Part 2 不重新講整頁名詞定義，必要時以 Stage Card 小定位器回看。

**同一母圖，兩種用途**：Part 1 對每個物件做 overview／zoom／details；Part 2 用相同位置完成 Overview → Spotlight → Work/Artifact → Updated Overview，顯示 Relate／History／Extract。Part 2 前一站 Updated Overview 可以兼下一站 Overview，避免機械重複頁。

這是本教材教學模型，不代表業界軟體開發只有四種元素。Part 1 與 Part 2 是同一份簡報，不另外發明第二條工作／Git 時間線。

## 1. Part 1｜認識系統（22 個候選 Scene）

第一張 O01：完整流程和所有主要職能＋**人、流程、文件、版本管理**四個固定位置。第二張 O02：**相同畫面**只新增 Agent 為第五層，Human Gate 不消失。接著 C01–C20 逐項學會辨認，不塞滿同一頁。

| 順序 | Scene | 當頁唯一主要學習任務 | 視覺聚焦與轉場 | Rev12 可用素材 |
|---:|---|---|---|---|
| 01 | O01 | 傳統軟體開發四大要素：人、流程、文件、版本管理 | Overview 全貌，所有主要角色和流程同時可見 | p.5、p.26、p.31 |
| 02 | O02 | 同一張母圖加入 Agent 第五要素，原四大要素不移位 | Before/After，Human Gate 保留 | p.56、p.84 |
| 03 | C01 | 完整工作流程和七個 Kanban 狀態的區分 | 活動、欄位、欄外 Human Gate 分層顯示 | p.26、p.93 |
| 04 | C02 | Stage Card 怎樣讀：Product Goal、Stage Target、Input、Action、Output、Exit Criteria、Roles、GitHub | 定義 Goal 與階段目的、產出、完成條件的差別 | p.25、p.26 |
| 05 | C03 | Brainstorming Stage Contract | 先介紹工作站，不提前展示 Matching 的決議結果 | p.10、p.11 |
| 06 | C04 | Refinement/Planning Stage Contract | 可以拆票且可行，不等於可直接進 Ready | p.12、p.14、p.18、p.19、p.21、p.23 |
| 07 | C05 | Ready Stage Contract | Ready 前確認清楚可開工，不代表已開始 | p.15、p.24 |
| 08 | C06 | Dev Stage Contract | 開發與自測不等於獨立 QA | p.39、p.40 |
| 09 | C07 | PR Review Stage Contract | Concept example only, no pretend real PR history | p.36、p.37、p.41 |
| 10 | C08 | QA/Verification Stage Contract | 只介紹預期/實際/PASS/FAIL/NOT RUN，A/B 實測留 Part2 | p.42、p.43、p.45、p.47 |
| 11 | C09 | Product Check Stage Contract | 本票符合需求與 Goal 方向，不等於已達成產品成效 | p.48 |
| 12 | C10 | Human Gate Stage Contract | 欄外決策，不是第八個 Kanban state | p.50、p.51、p.91 |
| 13 | C11 | Merge/Release/Done Stage Contract | 需核對 DoD 和 release evidence，不能用 QA PASS 自動替代 | p.52、p.53、p.93 |
| 14 | C12 | 職能總覽：Owner、PM、PO、UI/UX、Dev、Reviewer、QA | Role ≠ 人數 ≠ Agent 數；一人可多職能 | p.5、p.6、p.7、p.25、p.84 |
| 15 | C13 | Roles × Stages 主責、協作、決策矩陣 | 全流程一次看懂誰在哪段 co-work；不是固定組織編制 | p.6、p.7、p.18、p.91 |
| 16 | C14 | 文件種類：Goal／Proposal、Epic、Story、Task、Ticket、AC、AT、DoD | 一次認識文件層次；不做完整 Matching AC 示範 | p.14、p.16、p.21、p.22、p.23 |
| 17 | C15 | 文件生命週期：需求→拆票→交付→Review→Evidence→放行記錄 | 同一文件可以被更新，Issue/PR 不等於 Git commit | p.14、p.21、p.23、p.45、p.47、p.51 |
| 18 | C16 | Goal vs Stage Objective、AC vs AT vs DoD、Exit Criteria、Evidence | 幫學生辨認各類判準的適用層級 | p.11、p.21、p.23、p.24、p.47 |
| 19 | C17 | Git 與 GitHub：Issue、Project、Repo、Branch、Commit、PR、Merge | 版控和文件分兩軌，用連線表達交會 | p.14、p.31、p.32、p.33、p.34、p.35、p.36、p.37 |
| 20 | C18 | 版本歷史與工作票連結：Branch→Commit→PR→Merge／回復 | 抽象版本路徑示意，Part2 才揭露 Matching Version A/B | p.32、p.33、p.34、p.35、p.36、p.37 |
| 21 | C19 | Agent 能接什麼工作？Chat／Session／Agent／Workflow 與五項工作守則的預告 | 可執行／協調，不授權自己放行；五原則完整示範仍在 Part2 | p.56、p.57、p.61、p.65、p.66、p.73、p.76 |
| 22 | C20 | Part 1 Exit Check：看母圖辨認 Stage、Roles、Documents、GitHub、下一步 | 先作答再揭露；不提前暴露 Matching 的 QA 答案 | p.8、p.30、p.38、p.49、p.54 |

### Stage Card 的共同資料結構

每站都回答九個欄位，但不強制同頁展示九個同等大小的卡：**Product Goal reference／Stage Target／Input／Activities／Output／Exit Criteria／People／Current State／GitHub mapping**。

**Goal ≠ Stage Target ≠ Exit Criteria**：Goal 是產品想達到的 Outcome；Stage Target 是這個階段要完成的任務；Exit Criteria 才是允許下一站接手的條件。

**Activity ≠ Kanban State**：七欄 Backlog → Ready → Dev → Review → QA → Product Check → Done；Refinement 在 Backlog 進行；Human Gate 是 Product Check 後的欄外授權；Release/Done 需要本課 DoD 的實際證據。

| Stage | Target | Input | Output | Exit Criteria | 主責／協作 | GitHub 對應 |
|---|---|---|---|---|---|---|
| **Brainstorming** | 決定下一個要解決的使用者問題與方向 | 問題／觀察／機會／限制 | Goal／Proposal 與未決假設 | 人類需求方確認方向且 Goal 有共同可追溯紀錄；未通過不假設 Ready | **Owner／PM／PO**； 協作 | 建立／更新 Goal 或 Proposal Issue（可按組織類型配置） |
| **Refinement / Planning** | 確認可行性、Divide & Conquer，把需求變成可交辦工作 | Goal／Proposal、限制、依賴、未決疑問 | Parent／Child Tickets、Scope/Out-of-scope、AC／AT、預期證據與未決清單 | 票可被估算／驗證，阻礙已處理或有明確處置；不等於所有票自動 Ready | **PO／PM**；Owner／Dev／QA／UI/UX 協作 | 更新 Parent Issue／Sub-issues、依賴／Project 欄位 |
| **Ready Check** | 決定此票已具備開工條件 | 已 Refinement 的票、AC／AT、相依與責任 | Ready Ticket 和明確接手者；未開工 WIP 0/1 | 所有本課 Required Ready 條件滿足、允許拉進 Dev | **PO／Dev**；QA 協作 | Issue／Project: Backlog → Ready |
| **Dev** | 在已核准範圍內實作並留下候選版本 | Ready Ticket、設計／AC、共同 Repo、既定 Stop Rules | 候選版本／Commit、修改摘要、自測紀錄與未驗清單 | 候選變更與自測可供審查；自測不等於 QA 完成 | **Dev**；PO／UI/UX 協作 | Issue→Branch／Commit（連到 PR 草稿視需要） |
| **PR Review** | 檢查改動、風險與邊界 | PR 差異、Ticket／AC、程式版本、自測摘要 | Review findings／approved 或 changes requested | 重大問題修正／處置，符合交付 QA 的前置條件；PR 尚未必然 Merge | **Reviewer**；Dev／PO 協作 | Pull Request／Review comments／checks |
| **QA / Verification** | 用可重跑證據檢查候選版的行為 | 可識別候選版、AC／AT、測試資料與環境 | 測試紀錄、發現／缺漏、補驗請求 | 依本課驗證條件交付明確證據與剩餘未驗項；未執行不改 PASS | **QA**；Dev 協作 | Evidence／PR test results／Issue comments |
| **Product Check** | 判斷這張票是否符合需求及仍推進 Goal | Ticket／AC、Review／QA Evidence、Parent Goal／風險 | 接受範圍／退回理由／未完成產品路徑 | 產品責任方有明確接受或退回建議，保留未解風險 | **PO**；Owner／Dev／QA 協作 | 更新 Issue／Project 產品判斷紀錄 |
| **Human Gate** | 由授權的人決定可否整合／發布，或要求補驗 | 候選版、QA/Review Evidence、剩餘風險／發布計畫 | 可回查的授權／暫停／退回決策 | 有明確授權且後續 Release／DoD 條件可檢查；不自動 Done | **Owner**；PO／QA／Dev 協作 | PR／Issue decision log，尚未直接等於 Merge |
| **Merge / Release / Done** | 依已核准的變更完成整合、發布與 DoD 證據 | 已獲 Human Gate 授權的候選、Release/DoD Checklist | Merged Commit／Release 記錄／上線檢查／Ticket Done（僅有證據時） | 本課共同 DoD／上線檢查具備實證才可 Done；整體 Goal 成效後續另量 | **Dev**；Owner／PO／QA 協作 | PR Merge、Commit、Release、Issue/Project Done |

上表是**Stage 定義的文件**。真正的投影片要保持主畫面聚焦，例如先揭示 Stage Target、相關人員，再揭示 Input／Output，最後問「還缺什麼才可以移到下一站？」；細節留講者筆記／按需展開。

### People — Roles × Stages

| Role | 主要主責／決策站點 | 常見協作站點 | 需要理解的權責 |
|---|---|---|---|
| Owner | brainstorming、human_gate | refinement、product_check、release_done | 方向與正式授權，可兼任其他職能 |
| PM | brainstorming、refinement | ready | 促進協作、風險與節奏，不等於具體 Dev |
| PO | refinement、ready、product_check | brainstorming、review、human_gate | 需求、AC 和對 Goal 的判斷 |
| UI/UX | — | refinement、dev | 涉及介面與互動時參與，規則層 #3 不假定 UI 已做 |
| Dev | dev、release_done | refinement、ready、review、qa、product_check | 實作、自測、修正、交可查版本 |
| Reviewer | review | — | 審查修改／範圍／風險，與 QA 不同 |
| QA | qa | refinement、ready、product_check、human_gate、release_done | 依 AC／原證據驗證，NOT RUN 不等於 PASS |

此矩陣是本課示範，不是強制組織編制；**Role ≠ Person ≠ Agent**。同一人可承擔多職責，但不能由開發者自述取代可獨立核對的 QA 證據。

### Documents — 文件是怎麼形成及流動的？

| Document / Artifact | 用途 | 初次產生 | 典型存放／對應 |
|---|---|---|---|
| Problem/Goal/Proposal | 為什麼要做、想達成哪種 Outcome | brainstorming | Issue／decisions |
| Epic/Story/Task/Ticket | 如何將 Goal 拆成可交辦範圍及依賴 | refinement | Parent / Sub-issues / Project |
| Scope/AC/AT/DoD | 要做什麼、如何驗、共用完成條件 | refinement | Issue / repo specs / tests |
| Design & Dev Notes | 如何設計、決議與執行了哪些變更 | refinement | Repo docs / Issue / PR body |
| PR Review / Test Evidence | 改動審查、預期與實際結果及未驗證清單 | review | PR review / evidence files / Issue |
| Go/No-Go / Release / Post-Release | 授權、交付、風險、版本與後續 Goal 量測 | human_gate | PR / Release / Issue / external record |

文件解答「為什麼／做什麼／怎麼驗」，**版本管理**解答「哪一版／由誰改／如何對照合併」，兩者可以相連，但不是同一個軸。

### Git、GitHub 與版本管理

| Object | 職能 | 在哪裡遇見 |
|---|---|---|
| Git | 版本歷史工具；跟 GitHub 不是同一物件 | dev → release_done |
| Commit/Branch | 識別／隔離修改，可追溯、可比較 | dev |
| GitHub Issue/Sub-issue | 需求、決議、工作票、依賴及其狀態 | brainstorming → product_check |
| GitHub Project | 跨 Issue／PR 的狀態與看板視圖 | refinement → release_done |
| Pull Request | 版本差異送審、討論、Review、Checks；不是 Ticket | review → release_done |
| Merge/Release | 整合被批准的版本及留下正式交付記錄 | release_done |

GitHub Issue 可以追需求／決議／工作票，Project 看狀態，PR 是候選變更與 Review；Git 的 commit/branch 保留版本歷史。Epic／Story／Task 分類按專案設定介紹，不假設是 GitHub 的通用預設。

### Part 1 出口練習

給學員一張陌生的 Stage Card，請他指出 **在哪一站、Goal vs Target、有誰參與、拿到什麼 Input、交出什麼 Output、誰允許往下、產物在哪種 GitHub 物件**。先作答，再揭露；不能只考名詞縮寫。

## 2. Part 2｜組合成完整過程（沿用 v4 的 40 個 Scene）

**O03 才開始 Matching App。** Part 1 的 O01/O02 已出現，Part 2 不重複建立四要素／第五 Agent。全程追同一 Goal 和三張票 #1（Like/Pass）、#3（雙向配對規則）、#2（配對列表），主實證僅 #3 規則層。

| 工作階段 | v4 Scene IDs | 此段發生的變化 | 真實／示意界線 |
|---|---|---|---|
| brainstorming | B01、B02、B03、B04 | Goal 成形並建立 Proposal Issue | 尚無真實候選 |
| refinement | R01、R02、R03、R04、R05 | 拆 #1／#3／#2，明確 Scope／AC／依賴 | 仍 Backlog |
| ready | RD01、RD02 | 通過 Ready 條件才移欄 | WIP = 0/1 |
| dev | D01、D02、D03、D04 | Branch／Commit／候選 A，更新 Ticket | WIP = 1/1 |
| review | RV01、RV02、RV03 | PR／Review／越界退回 | 僅教學 PR 示意 |
| qa | Q01、Q02、Q03、Q04、Q05 | A FAIL → B-pre PASS+NOT RUN → B-post duplicate PASS | 僅規則層有真實證據 |
| product check | PC01、PC02 | Ticket 對回 Parent Goal | UI/E2E/Goal 未驗證 |
| human gate | HG01、HG02 | 授權／暫停／退回與 Release 條件 | 欄外決策，Done 未實跑 |
| agent collaboration | A01、A02、A03、A04、A05、A06、A07、A08、A09、A10、A11 | 同一票比較三種 Agent 控制模式＋五原則 | A05–A11 必保留 |
| exercise | X01 | 學員寫 Ticket、補驗要求和決策 | 先答後揭露 |

每一站用同一張母圖 **Overview → Spotlight（階段＋參與者）→ Work/Artifact（哪張票／哪條 AC／哪份文件）→ Updated Overview（前後狀態／版本／下一站）**。在只需局部知識的投影片使用小定位器，別讓整張灰色遮罩搶過核心內容。

**原 Rev12 五項 Agent 原則在 Part 2 CORE 完整保留**：External Task State（A06／舊77）、Bounded Execution（A07／舊78）、Role Separation（A08／舊79）、Independent Verification（A09／舊80）、Goal Re-anchoring（A10／舊81）。A05 是五項總覽，A11 是回到母圖，X01 先答再揭露。不可因 Part 1 C19 已介紹 Agent 就刪除。

## 3. 內容與實作的 Gate

- [x] v5 概念上定義兩部分及同一母圖、22 + 40 個 Scene、九份 Stage Contract、七種職能與文件／GitHub 對應。
- [x] Part 2 保留 v4 原 40 Scene ID 順序，原 A/B-pre/B-post 規則層實測不得被覆寫，Release／Goal／UI/E2E 仍 NOT RUN。
- [ ] **G1 Blind Beginner Review**：依 O01→O02→C01..C20→O03..X01 順序檢查先備知識、Part 1 的密度、Part 2 是否重複、每張頁的因果轉場。
- [ ] **Visual POC / G4**：實際 Stage Card、Roles × Stages、Documents Lifecycle、Git/GitHub Map 與 Part 2 Spotlights，在投影尺寸檢查可讀性；不是有表格就算完工。
- [ ] **Evidence/Note mapping & native editable PPTX strategy**：來源素材、同一條時間線、編輯物件、測試來源待實作。
- [ ] **Owner Ready Gate**：獨立 G1 finding 收斂、具體母圖 POC 後才進 Ready，不把計畫 PASS 當作品完成。

研究參考：[Mayer Pre-training](https://www.cambridge.org/core/books/abs/multimedia-learning/pretraining-principle/01791D57F5D4164251269E6DF56A8BF1) · [Shneiderman 7 Tasks](https://ieeexplore.ieee.org/abstract/document/545307) · [GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues)。

**Change scope**：這次只改內容規格和本機可運行的驗證材料；不動 `.github/workflows/`、main、Rev12 tag、正式 slides、PR #57/#59。
