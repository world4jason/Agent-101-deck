# Rev13 v5｜兩部分教學架構：先認識，再組合

> **REFINEMENT 規劃稿，不是已製作的投影片，也不是 G1／G4 PASS。**
> Parent Goal：[Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60)；規劃：[Draft PR #61](https://github.com/world4jason/Agent-101-deck/pull/61)。
> 本版結構性 SSOT：本文件＋[v5 manifest](rev13-two-part-manifest-v5.json)。Part 2 直接沿用 [v4 內容及證據時間線](rev13-workflow-first-content-refinement-v4.md) 的 O03–X01，不複製第二份真相。
> **GitHub Actions / Workflow 現在無法使用：本次不更動 `.github/workflows/`，不依賴遠端 CI 宣稱 PASS。**

## 0. 設計決議

**Part 1 — Recognize / Pre-training**：先用人、流程、文件、版本管理四個問題帶入。第 1 頁交代兩段安排；第 2 頁列四段大綱並標示目前進度。接著用第二段會沿用的配對規則票，逐步看 Goal、範圍、AC／AT、DoD、負責人與目前站點；再逐站介紹九個階段、介紹角色、合看角色×階段圖，最後練習辨認工作票還缺什麼。這一段不顯示 Agent 工作列，也不先教 Agent 概念。版本管理在此只用一句話定位：「Git 記錄程式的每次修改；GitHub 讓團隊共用並互相檢查」，並舉多人同時修改時如何查明改動與退回的情境。第 1 頁同時說明：「上半場：一個純人類團隊把一張工作票從想法走到可以合併；下半場：Agent 加入後，看哪些工作能交給它。」

**Part 2 — Apply / Lead by Example**：先以純人類團隊沿同一張配對規則工作票走過 Brainstorming → Refinement → Ready → Dev → PR Review → QA → Product Check → Human Gate。人類流程結束後才開始 Agent 段：同一張圖新增 Agent 工作列，接著說明 Agent、角色可委派的工作與人類責任，再把同一張票交給 Agent 從交辦往前走；之後保留三種協作方式、五項原則及練習。Owner 決定（2026-10-15）：Agent 版在測試站遇到重複按讚未測，引用修正版第一次測與修正版補測的真實紀錄；Agent 版的交辦與執行都是教學示意，不是真實 Agent 執行紀錄。

**嚴格避免兩次講同一套流程**：Part 1 Stage Cards 只放一行 Matching App 預告（例如「有人想做配對」），不展示測試結果；Matching 案例先呈現純人類團隊的完整流程，直到 Human Gate 後才加入 Agent。Agent 段不倒帶，沿同一張票從交辦往前走。

**同一張工作圖，兩種用途**：Part 1 逐步揭露四要素；Matching 人類流程不顯示 Agent 工作列。人類流程完成後，Agent 段在相同位置新增 Agent 工作列，其餘區域保持不動。各階段用相同位置呈現全貌、當前工作與結果變化。

這是本教材教學模型，不代表業界軟體開發只有四種元素。Part 1 與 Part 2 是同一份簡報，不另外發明第二條工作／Git 時間線。

## 1. Part 1｜一個想法怎麼落實（27 個 Scene ID，29 頁）

第 1 頁先呈現純人類團隊與 Agent 兩段安排，並在四個框內保留問題：流程「做到哪？」、人「誰做？」、文件「根據什麼、怎麼驗？」、版本管理「改的是哪一版？」。第 2 頁呈現四段課程大綱，第一段補上「一個想法怎麼落實」。第 3–11 頁先用配對功能走一次想法到驗收：總覽路線；發想方法只列名稱，從目標已選定後開始；列出目標、受影響的人與要做的工作；以 Epic 排完整使用者旅程與第一版範圍；列出按讚、配對規則、配對清單三個 Story；檢查 Story 並說明依賴；整理規則、例子與未決問題；列出四種配對組合；最後把 Task／Spec 接到工作票。這九頁之後固定在頁頂標示目前所在步驟。

第 12–16 頁逐步揭露同一張配對規則票：目標、範圍／排除、AC 對 AT、DoD、負責人與目前站點；不揭露測試結果。接著第 17–25 頁逐站介紹九個階段，第 26 頁展示七個看板狀態與三條分開的退回方向，第 27 頁介紹角色，第 28 頁合看角色×階段分工，第 29 頁用三題練習辨認站點、下一位接手者及尚缺條件。

O01 連到第 1 頁四要素畫面及第 2 頁大綱。新加入的九頁依序以 I2T01、I2T02、I2T03、I2T04、I2T05、I2T06、I2T07、I2T08、I2T09 追溯本次 Owner 決定及設計原則第 2b 條；工作票依序由 C05、C02、C07、C06 保留追溯，第二張 C02 頁補充負責人與目前站點。九站為 C11、C12、C13、C14、C15、C16、C17、C18、C19，其後依序是 C01（流程）、C03（角色）、C04（角色×階段）及 C20（練習）。共 27 個唯一 Scene ID，實作為 29 頁。所有 Part 1 頁面都不顯示 Agent 工作列。

| 頁碼 | 主要內容 | Scene ID |
|---:|---|---|
| 1–2 | 四要素與四段課程大綱；第 2 頁標示第一段 | O01 |
| 3–11 | 從想法與目標走到 Epic、Story、規則與例子、Task／Spec 和工作票 | I2T01、I2T02、I2T03、I2T04、I2T05、I2T06、I2T07、I2T08、I2T09 |
| 12–16 | 同一張票逐步揭露目標、範圍、AC／AT、DoD、主責與站點 | C05、C02、C07、C06（C02 第二頁） |
| 17–25 | 由整理問題、拆分工作到本票完成，逐站介紹九階段 | C11–C19 |
| 26 | 七個看板狀態、欄外授權與退回方向 | C01 |
| 27 | 角色職責與配對 App 例子 | C03 |
| 28 | 主責、協作、決策的角色×階段總覽 | C04 |
| 29 | 配對案例三題練習 | C20 |

**版本管理的說明時機**：Part 1 在開場只說「每次修改都留下紀錄（細節在開發站）」，不出現 Branch、Commit、PR、Merge。這些名稱與具體回復方式移至 Part 2 的 Dev 接手處，對著同一張配對規則票說明。

**先備順序（P2）**：想法到驗收路線 → 目標／Epic／Story／規則與例子／Task 與 Spec → 工作票 → 九個階段 → 流程總覽 → 人類角色 → 角色×階段 → 練習。Agent 定義不列入 Part 1。


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

## 2. Part 2｜組合成完整過程（44 個 Scene ID）

**第 30 頁 O03 才開始 Matching App 的走流程案例。** Part 2 先用純人類團隊走完整個流程：全程追同一 Goal 和三個已拆好的 Story／票 #1（Like/Pass）、#3（雙向配對規則）、#2（配對列表），只回顧 Epic、Story 和先後依賴，不再教如何拆分；主實證僅 #3 規則層。Dev 接手時先介紹 Git、GitHub 與程式版本路徑（D02+C08，接著 C09），再進入修改、審查與測試。到第 58 頁 HG02 人類流程結束後，才在第 59 頁顯示 O02，再接 C10 Agent 概念與角色分工；Part 2 共 44 個 Scene ID：原有 40 個加上 O02/C10 與移到 Dev 的 C08/C09。

| 工作階段 | v4 Scene IDs | 此段發生的變化 | 真實／示意界線 |
|---|---|---|---|
| brainstorming | B01、B02、B03、B04 | Goal 成形並建立 Proposal Issue | 尚無真實候選 |
| refinement | R01、R02、R03、R04、R05 | 拆 #1／#3／#2，明確 Scope／AC／依賴 | 仍 Backlog |
| ready | RD01、RD02 | 通過 Ready 條件才移欄 | WIP = 0/1 |
| dev | D01、D02＋C08、C09、D03、D04 | 對著 #3 介紹 Git／GitHub、Branch→Commit→PR→Merge 與回復，再更新工作票 | WIP = 1/1 |
| review | RV01、RV02、RV03 | PR／Review／越界退回 | 僅教學 PR 示意 |
| qa | Q01、Q02、Q03、Q04、Q05 | A FAIL → B-pre PASS+NOT RUN → B-post duplicate PASS | 僅規則層有真實證據 |
| product check | PC01、PC02 | Ticket 對回 Parent Goal | UI/E2E/Goal 未驗證 |
| human gate | HG01、HG02 | 授權／暫停／退回與 Release 條件 | 欄外決策，Done 未實跑 |
| agent collaboration | A01、A02、A03、A04、A05、A06、A07、A08、A09、A10、A11 | 完整交辦範例後比較三種協作方式；同一張票由交辦往前走，五項原則依序落在工作站 | 測試站說明重複按讚未測並要求補測；Agent 版為教學示意，實測只引用規則測試紀錄 |
| exercise | X01 | 學員寫 Ticket、補驗要求和決策 | 先答後揭露 |

**HG02 後的 Agent 段頁序**：第 59 頁以同一份課程大綱標出第二段，並在同一張工作圖新增 Agent；第 60 頁說明「Agent 是能接一張工作票、自己動手做的 AI 助手」；第 61–63 頁分別標出可交給 Agent、Agent 協助而由人核對、仍由人負責的工作，延伸 C10。第 64 頁以同一份大綱標出第三段，將同一張配對規則票交給 Agent 往前走；第 65–67 頁說明一人＋一個 Agent、多個對話及協調 Agent。第 68 頁以同一份大綱標出第四段，開始五項原則。五項原則的真實測試證據只引用規則層三次實測，Agent 工作仍標示為示意。

每一站用同一張母圖 **Overview → Spotlight（階段＋參與者）→ Work/Artifact（哪張票／哪條 AC／哪份文件）→ Updated Overview（前後狀態／版本／下一站）**。在只需局部知識的投影片使用小定位器，別讓整張灰色遮罩搶過核心內容。

**原 Rev12 五項 Agent 原則在 Part 2 CORE 完整保留**：External Task State（A06／舊77）、Bounded Execution（A07／舊78）、Role Separation（A08／舊79）、Independent Verification（A09／舊80）、Goal Re-anchoring（A10／舊81）。A05 對照五項原則所在工作站，A11 回到母圖，X01 先答再揭露。依 Owner 決定（2026-10-15），人類流程走完後，Agent 章沿同一張票從交辦往前重走；在測試站遇到重複按讚未測，並引用修正版第一次測與補測的真實紀錄。Agent 版仍是教學示意。

## 3. 內容與實作的 Gate

- [x] v5 概念上定義兩部分及同一張工作圖、27 + 44 個 Scene ID、九份 Stage Contract、七種職能與文件／GitHub 對應。
- [x] Part 2 保留 v4 原 40 Scene ID 的相對順序，將 C08/C09 移至 Dev、O02/C10 移至 HG02 後；規則層實測界線不變，上線／產品目標／UI/E2E 仍 NOT RUN。
- [ ] **G1 Blind Beginner Review**：依 O01→I2T01..I2T09→票面 C05/C02/C07/C06→C11..C19→C01→C03→C04→C20→O03..HG02→O02/C10→A01..X01 檢查先備知識、密度與轉場。
- [ ] **Visual POC / G4**：實際 Stage Card、Roles × Stages、Documents Lifecycle、Git/GitHub Map 與 Part 2 Spotlights，在投影尺寸檢查可讀性；不是有表格就算完工。
- [ ] **Evidence/Note mapping & native editable PPTX strategy**：來源素材、同一條時間線、編輯物件、測試來源待實作。
- [ ] **Owner Ready Gate**：獨立 G1 finding 收斂、具體母圖 POC 後才進 Ready，不把計畫 PASS 當作品完成。

研究參考：[Mayer Pre-training](https://www.cambridge.org/core/books/abs/multimedia-learning/pretraining-principle/01791D57F5D4164251269E6DF56A8BF1) · [Shneiderman 7 Tasks](https://ieeexplore.ieee.org/abstract/document/545307) · [GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues)。

**Change scope**：這次只改內容規格和本機可運行的驗證材料；不動 `.github/workflows/`、main、Rev12 tag、正式 slides、PR #57/#59。
