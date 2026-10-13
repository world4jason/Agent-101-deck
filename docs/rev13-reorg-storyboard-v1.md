# Rev13 Reorg Storyboard v1 — 流程 × 版控 × 人 → Agent

> **狀態：規劃稿 / G1 待審（非實作完成）**。2026-10-13 建立。這份文件定義教學故事與依賴順序，不代表新投影片已製作或已通過 QA。
>
> 父追蹤：[Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60)；工作分支：**rev13/reorg**。凍結來源：[rev12-demo-107 pre-release](https://github.com/world4jason/Agent-101-deck/releases/tag/rev12-demo-107)（commit **5eb43fe9efb031ad7fb0582270a75df1c312a6ae**）。
>
> **目前 HTML /slides/ 跟 main 走，不是 tag 的永久回放網址；不要改目前展示入口。** PR #57、#59 尚未合併，內容與可編輯 PPTX 後續應獨立 review/reconcile。

## 0. Rev13 全域分鏡契約（Mandatory / Blocking P1）

**所有章節與所有教學分鏡，都必須依照唯一 SSOT：[全域投影片分鏡契約](rev13-visual-narrative-contract.md)**。這是講述與畫面的共通文法，比本 Storyboard 原先按 S0–S6 切的章節更優先：

**固定母圖（完整 Workflow＋全部主要職能＋相關 GitHub 工作鏈） → Spotlight（半透明遮罩只凸顯當前階段／co-work 人員） → Work/Artifact（Goal、Ticket 哪個欄位／項目、產物和 GitHub Issue/Project/Branch/PR） → Updated Overview（真的顯示狀態差異並指向下一站）。**

這是四個**語義步驟**，可以用多頁細講或同頁組合，不強制四頁；每次畫面必須讓學員辨認 **目前階段、參與職能、正在操作哪張票／哪項需求、最新狀態／產出、GitHub 哪個物件**。章封面、練習與附錄至少保留定位器或明確回到母圖入口。不要把每個工作階段變成獨立的文字章節。

**第一段具體分鏡：** Overview（完整流程／職能）→ Brainstorming Spotlight（Owner、PM、PO）→ 確認 Outcome Goal 並開／更新 GitHub Goal Issue → Updated Overview（顯示 Issue created）；再 Overview → Refinement Spotlight（Owner、PM、PO、Dev、QA／必要時 UIUX）→ 檢查可行性／將 Epic・Story 分解成可交辦子票，補 Scope/AC/AT/DoD → Updated Overview（Parent/Child Issues、依賴、尚待 Ready 的狀態）。GitHub Issue Type 依專案設定，不預設 Epic/Story/Task 一定是 GitHub 原生可用選項。

Reviewer 在 G1 檢查每個 scene 的角色／票／狀態／GitHub mapping 與 Overview delta；G3 用五秒掃讀確認方向感；G4 看真實畫面而非只看文字；G5 對最新 HEAD 重查。少任何關鍵資訊視為 P1，不得合併。

## 1. 一句話目標與教學模型

完全沒寫過軟體的學員，能用 **流程（怎麼推進）／版控（怎麼追蹤變更）／人（誰負責）** 理解一張軟體工作票的生命週期，接著比較 Agent 的三種協作方式，知道 **要交給誰、交付哪個版本、證據夠不夠、何時要由人介入**。

**三要素 → 四要素** 是課程的心智模型，不是聲稱軟體工程只有三項元素。

- **流程 Process**：一項工作從想法變成可以驗收的成果。
- **版控 Version Control**：Git 管版本；GitHub 支援共同記錄、送審與協作。GitHub Issue、Project、PR 功能不同。
- **人 People**：定義責任、交接物與授權，Role ≠ 人數。
- **Agent**：新增受託執行者及協作方式；不取代前三者，更不自動取得 Human Gate 權限。
- **Ticket** 是串起四個鏡頭的共同契約；先在 Refinement 裡深入教，**暫不列為第五要素**。後續由真人教學證據判定是否需要額外獨立章。

## 2. 先備順序（不得未教先用）

1. 先看見一個使用者問題、Goal、三個基本視角與唯一案例，不先介紹 Agent、PR、QA 的縮寫。
2. **Process** 先以「想法 → 待辦 → 可開工 → 實作 → 審查 → 驗證 → 接受」描述工作；名詞第一次用時白話解釋。介紹工作票的需求、scope、AC、AT、DoD、expected evidence。
3. **Git / GitHub**：先用多人交付「final_final」痛點引出 commit、branch、PR、merge，再教 GitHub Issue 對應 Ticket、GitHub Project 對應看板。前一章不要假設已認識 GitHub sub-issue。
4. **People**：正式命名 PO、UI/UX、Dev、Reviewer、QA、Owner，將責任對到上一章的工作與 Git 協作；一人可有多個角色。
5. **三者合流**：才展示同一 Ticket #3 在 Kanban、Git、Roles、Evidence 上的完整交付；未實作的狀態清楚標記「示意」。
6. **Agent**：先分清 Chat / Agent / Session / Role / Workflow，再先做單 Agent 完整循環，最後才解多 Chat 與 Sub-agents。Context / Memory / WIP 是不同軸。
7. **Human Gate 與練習**：同一張票由人決定接受、退回、暫停、Merge／Release；學員自己練寫票、看版本與證據，再 reveal 參考判準。

## 3. 建議章節（教學拍點，不是固定頁數）

| 章 | 本章必須回答的問題 | 最主要的學習成果 | 本章出口／往下一章 |
|---|---|---|---|
| S0 Whole Picture | 我們要做什麼？為何需要三要素？ | 能說出 Process/Git/People 各管什麼；知道 Agent 之後加入 | 我們要怎麼把想法做完？ |
| S1 流程 | 想法如何變成 Ready，再走到 Done？如何開票？ | 能畫出課程七欄、寫出一張可驗收的 #3 Ticket | 票與修改怎麼不混亂？ |
| S2 版控 | 三人都改了同一件事，如何知道哪個版本可查？ | 能用白話分辨 commit/branch/PR/merge 與 Issue/Project | 這些交接和決策由誰做？ |
| S3 人 | 工作、角色、人數與交付物有何差別？ | 能依 Goal/AC 指派責任，知道 PR、QA、Owner 各審什麼 | 真正跑一次三要素的合流 |
| S4 三要素實戰 | 同一 #3 Ticket 怎樣從 Ready 到放行？ | 能以 Ticket+版本+證據判斷接受／退回，不冒用沒跑的驗證 | 若把執行工作改交給 AI？ |
| S5 Agent | 單 Chat、多 Chat、Orchestrator 各改變了誰控制流程？ | 能辨認 3 個 orchestration 模式的角色／成本／人類責任 | Agent 說完成，該如何驗收？ |
| S6 Human Gate + Transfer | 哪些事必須由人決策？如何驗收一個 Agent？ | 能寫 Ticket、提出補驗要求、檢查版本與 evidence | 自己帶一項工作練習 |
| APP 進階補充 | 進階工具與技術為何存在？ | 能按需要查閱 BDD、TDD、SBE、Context、WIP、模型設定等 | 不要求背誦 |

### S0 — Whole Picture

**場景**：Matching App 只有一個 Outcome Goal，拆成 #1 Like/Pass、#3 配對判斷、#2 配對列表。主範例始終是 **#3**。

- 從「我要一個配對 App」開始，先看問題、這次的三個功能；不預先宣稱 UI 已實作。
- 用一張圖介紹三要素：流程問「到哪一步？」；版控問「哪個版本？」；人問「誰負責？」；後半再加 Agent 問「交給哪一種執行配置？」。
- 第一次展示完整路線總覽，且任何後續章都可以回到此全貌。
- **Exit Check**：學員能分辨工作流程、版本與責任三件事，才進細節。

### S1 — Process + Ticket（先定義行為）

**兩種層次要分清：**

- 活動／大流程：Brainstorming → Goal → Backlog（Refinement 活動形成可交辦的票）→ Ready → Dev → Review → QA → Product Check → Human Gate → Merge／Release／DoD → Done。
- **本課七個 Kanban 狀態欄**：Backlog → Ready → Dev → Review → QA → Product Check → Done。
- Refinement 不是獨立看板狀態；Human Gate 是 Product Check 後的欄外人類決策。被退回是回某個既有欄位；Human 放行後仍須完成本課的 Merge／Release／檢查／DoD 才能 Done。這是**本課示範政策**，不是唯一業界實作。
- WIP：本課票首次進 Dev 後直到 Done 前仍算 active；Ready/Backlog 未開工是 0。主線只先教 WIP=1；WIP>1 的權衡可移選修。

**Ticket Refinement：**
1. Bad ticket：「配對功能正常」，展示三人各自解讀不同。
2. Goal：避免單向 Like 誤判成配對。
3. Scope：只判斷配對規則；**Out of scope**：UI、聊天室、整體發布。
4. AC：單向 Like 不配對；雙向 Like 建立一筆；重複 Like 不新增筆數。
5. AT / Expected evidence：固定假資料、預期與實際筆數、所測版本、可追溯紀錄。
6. DoD：共同的交付完成約定；與每張票的 AC 有別。Ready：需求已釐清並能開始，不代表完成或測試 PASS。
7. Exit Check：同一句壞票，學員先自己寫 scope、AC、expected evidence，然後揭露。

**避免未教先用**：在 S1 的票只以紙卡／簡單 Kanban 呈現，不在 GitHub 基礎教完前要求理解 issue/sub-issue、PR、commit 或完整 hash。

### S2 — Git + GitHub（工具回答碰到的問題）

- Problem：A、B、final、final_final 到底哪份？三人改動為何不能互相覆蓋？
- Git：commit 是歷史存檔點；branch 是分開工作的修改線；合併才整合回共同版本；不要把 commit 等同正式發布。
- GitHub：共享 repo、連結 work item（Issue）、安排看板（Project）、送修訂（PR）、審查與 merge。
- 只用同一 #3 的概念預演講一輪 branch → commit → PR → review → merge；**主線時間未開始 Dev，這兩頁必須標明「流程預演」**。
- GitHub Issue = 追蹤要做什麼；PR = 審查要合併的改動；Project = 觀看工作狀態。不要教成 GitHub = Git 或 PR = Ticket。
- Exit Check：學員能說「我要查版本看 commit，改東西開 branch，交 review 用 PR，追任務看 Issue」。

### S3 — People（角色責任，不等於人數）

- 需求／PO：描述 Goal、優先順序、範圍、AC。
- UI／UX：必要時把使用者操作與互動交給 Dev；#3 規則層不等於 UI 已存在。
- Dev：依票實作、自測並交候選版本與差異。
- Reviewer：根據 Ticket 與變更查風險和越界；不能以過了 review 代替行為驗證。
- QA：對照 AC、版本、預期／實際驗證；NOT RUN 不能當 PASS。
- Product Owner / Owner：確認仍推進 Goal，並在 Human Gate 承擔放行／不放行決策。
- 同一人可持多種職責；獨立驗證的重點是**判準和證據可獨立核對**，不等於必須每個角色對應一人。
- Exit Check：同一 #3 的需求不明、程式越界、測試失敗，分別該請誰處理？何時由人決定？

### S4 — 全部接起來：Human-only 的一張票

**這是 Agent 章的對照組**，必須學到這裡才說「將 Dev 工作交給 Agent」。

- 一張 #3 Ticket；一條 Kanban timeline；一條修改／版本 timeline；同一組 fixture 與 evidence。
- Ready → Dev：開始有 work-in-progress；Dev 回報候選與自測。
- Review：示意 reviewer 發現聊天室越界並退 Dev；明示該越界例子是教學示意，不當實測。
- QA：
  - **Version A**：單向 Like 預期 0、實際 1，FAIL。
  - **Version B-pre**：單向／雙向 PASS，重複 Like NOT RUN。
  - **Version B-post**：同一 B 候選補測重複 Like PASS；其他未測情境不因一次補驗而變 PASS。
- Product Check：票是否符合範圍／有助 Goal？此時不等於上線後的真實 Goal 成效。
- Human Gate：明確決策與條件，之後按本課工作約定才進 Merge／Release／Done；現有教材的 UI、整合、部署、完整 Goal 路徑缺實測，要在畫面說「教學推演／NOT RUN」。
- **Exit Check**：給 A、B-pre、B-post、PR、QA 狀態，問學員能否接受以及哪個證據還缺。

### S5 — Agent：第四要素，僅替換執行／協調方式

**概念順序**：Model ≠ Chat ≠ Session ≠ Agent ≠ Role ≠ Workflow ≠ WIP。Agent 是使用模型與工具、觀察結果後繼續採取步驟的工作方式；同一個 Chat 可以包含沒有工具的純問答，開多個 Chat 不等於系統自動有多 Agent 編排。

| 模式 | 誰控制下一步／交接 | Agent 典型責任 | 人類的工作 | 需避免的誤解 |
|---|---|---|---|---|
| A 單一 Chat + 單 Agent | 人委派一張票／一個 Agent 依授權內循環工作 | 讀 #3、改程式、跑測試、交證據 | 給 scope/AC、檢查 FAIL、退回補驗、接受 | 一次回答不等於完整 Agent loop |
| B 多個 Chat、人工控流程 | **人** 決定 Dev → Reviewer → QA 的順序，搬運共用資訊 | 各 Chat 執行指派的職責 | 提供版本、票、證據、交接、處理分歧 | 多 Chat 數量不等於 Agent 數；跨 session 不會自動保有最新進度 |
| C 主 Agent + Sub-agents | **Orchestrator** 在核准範圍內分工和彙整 | Worker 按職責產出可核對結果 | 給 Goal/政策/邊界、審查例外、Human Gate 授權 | Orchestrator 不會自動取得最終產品接受權 |

**核心 demo**：保留 #3 的真實單 Agent A FAIL → B-pre 修正 → B-post 補驗與人驗收；切到模式 B/C 時可用圖示展示「相同票／相同 gate，不同交接者」，**沒有真實 multi-agent run 就只能稱流程示意，不得冒充已執行過的 QA**。

**避免高認知負擔**：Agent 的風險五原則（外部狀態、邊界、角色、獨立驗證、Goal 再錨定）先濃縮到一個「如何防止工作偏離？」問題，再保留深度細節於附錄／講者備註。Session、Context、Memory、Compact 僅先教「進度不要只靠聊天記錄」，技術深入按必要性再揭露。

### S6 — 人應該何時介入？

| 時點 | Agent 可做的事 | 人類須決定／核對 |
|---|---|---|
| Brainstorm / Goal | 提問、整理選項、指出不確定性 | 真正的需求與目標、成功訊號 |
| Refinement / Ready | 草擬 ticket、scope、AC、AT | 需求邊界、允許開工的條件 |
| Dev | 實作、測試、記錄版本／差異 | 若偏離 scope 或涉及重大選擇，退回或重新授權 |
| PR Review / QA | 輔助審查與驗證，可由另一 Agent 或人核對 | 使用可重跑 evidence；agent 的自述 PASS 不足以替代 |
| Product Check | 對照 Ticket、彙整風險與未驗項目 | 是否仍推進 Goal；需退回哪個既有狀態 |
| Human Gate | 提交候選、證據、風險、釋出檢查清單 | **接受／退回／暫停／放行**；不得由 orchestrator 自行越權 |
| Merge / Release / Done | 執行已核准的操作、蒐集發布證據 | 核對 DoD 與最終結果；上線後 Goal 成效另行衡量 |

**終點練習**：學員先自己把壞 Ticket 變成好 Ticket，選 A/B/C 協作配置，看到 B-pre 的 NOT RUN 後寫退回要求，再查 B-post 與其他未驗項，判斷是否可進下一 Gate；揭露參考答案前不可顯示正解。

## 4. 全頁共用導航：「我在哪裡？」

> 本節是[全域分鏡契約](rev13-visual-narrative-contract.md)在資訊精簡上的**補充**，不是以一個小型 locator 取代完整的 Overview → Spotlight → Work/Artifact → Updated Overview 流程。

在案例與 Dev／Agent Demo 頁只顯示一組**輕量雙軌資訊**，不是每頁放完整看板和完整 commit history：

- **Kanban 軌**：七個狀態、目前位置、必要的退回箭頭；Human Gate 放在狀態列旁的決策點。
- **Git 軌**：Ticket #3 → branch／candidate A or B → PR → merge（僅顯示此頁必要一格）；另標 Tested Candidate／Evidence status。
- **責任標籤**：Human、Dev、Reviewer、QA、Agent／Orchestrator，避免靠小字猜現在誰操作。
- **Evidence 標籤**：PASS / FAIL / NOT RUN 與是 rule-level 還是 UI/E2E/Goal；版本測試指紋不當然是 Git SHA。
- 每頁用高亮局部位置與「這一頁發生了什麼」，不讓導航與主圖搶資訊焦點。
- 倒帶到 Version A 或 B-pre 時，**同頁大字說明是倒帶／示範重演**，回到 B-post 亦需明示。

## 5. 舊頁搬遷原則

逐頁建議與理由見 [rev13-migration-matrix-v1.md](rev13-migration-matrix-v1.md)，該表 **107/107 有對應，但全部僅是待 G1 Review 的建議，不等於要照表刪頁**。

- **Keep/Move**：必要先備、範例、真實測試證據與關鍵交接素材。
- **Condense**：相鄰多張講同一教學重點的頁，合併或用 progressive disclosure。
- **Rebuild**：跑到新的位置後敘事、命名、前置知識已變，需要重新寫畫面。
- **Appendix**：方法延伸、模型參數、非必要風險詳解、過深技術識別。
- **Retire**：只在有明確教學冗餘和替代位置並經 Review 同意時淘汰；v1 先不把任何舊頁標成已批准刪除。
- 原 8 張 Exit Checks 可重寫為新章出口，**不維持舊頁數或題目一對一**。搬遷後須同步 source IDs / Notes / Exercise / Manifest / README / build generator。

## 6. Phase gates 與可接受範圍

| Gate | 本次 planning 的狀態 | Rev13 實作階段必須提供 |
|---|---|---|
| G1 故事板與先備知識 | **DRAFT；等待 reviewer 審核** | 逐頁 claim、順序、轉場及完整初心者朗讀 |
| G2 事實與證據 | **沿用 frozen 來源，尚未對新版執行** | #3 單一 timeline、fixture 及版本可回放；NOT RUN 正確 |
| G3 Blind beginner | **NOT RUN** | 未閱讀 README 的人從首頁順序試讀 |
| G4 視覺／可讀性 | **NOT RUN** | 真實桌面／投影檢查；不以無 overflow 代替 |
| G5 Latest HEAD / Human | **NOT RUN** | 正式 artifact、rebuild、測試、人工放行 |
| Native editable PPTX | **另有 PR #59 / Issue #58 尚待驗收** | 不以整頁 screenshot 匯出冒充可編輯；與教材 gate 分開 |
| 真人零基礎試教 | **NOT RUN** | 紀錄疑問、實際答題與可遷移的技能 |

### 立即下一步（仍在此 Issue 的後續）

1. 確認 Migration Matrix 的舊 107 頁均有去向與來源 ID。
2. 讓一位未讀文件的 reviewer 做 G1，特別檢查「先流程再 Git 再人」是否出現前置詞彙問題。
3. 修正新章出口題、拿 1 張 Ticket 運行示範，再定每一張新投影片的主張及數量。
4. Storyboard 由 Owner 放行後，**另開實作 Issue / PR** 更新 HTML、產生器、notes、exercise、QA、可編輯 PPTX。不要將 v13 的故事規劃文件誤當完成簡報。

## 7. 研究參考（原則，不取代本課事實證據）

- [GitHub — Planning and tracking work](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/planning-and-tracking-work-for-your-team-or-project)（Issue / Project 的邊界）
- [Anthropic — Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)（workflow / orchestrator-workers 與先簡後複雜）
- [Atlassian — Definition of Done](https://www.atlassian.com/agile/project-management/definition-of-done)（單票 AC vs shared DoD）
- 本 repo 的 [README](../README.md) P1–P17、G1–G5 是實作時的既有品質約束。
