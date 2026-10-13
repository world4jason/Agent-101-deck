# Rev13 全域投影片分鏡契約（Mandatory Slide Grammar）

> **Status: REQUIRED for every Rev13 teaching scene; planning contract, not an assertion that Rev13 slides exist.**
> Canonical design source for Rev13 Storyboard, slide authoring, speaker notes, HTML, native-editable PPTX and PR reviews. Parent: [Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60); initial Draft PR: [#61](https://github.com/world4jason/Agent-101-deck/pull/61).
>
> **One sentence:** 前兩個畫面先建立「人／流程／文件／版本管理 → 再加 Agent」的 **四＋一教學模型**；往後每個工作階段看得出誰做、流程哪裡、依哪份文件／Ticket／AC 工作、對應哪個版本與 GitHub 物件，以及狀態如何改變。

## Global Principles P18–P23（Rev13 起強制遵守）

**這些是正式 Principles，不是可選的視覺技巧、研究附件或某一張 Ticket 的需求。** 對 Rev13 及後續所有 AgentDeck 新版內容皆有效：Outline、Storyboard、每個主線 Scene、Demo、練習、Speaker Notes、HTML、PPTX、Review。已封存的 Rev12 不追溯改動。既有 P1–P17 與 G1–G5 仍有效；沒有證據不能宣稱 PASS／Done。完整來源及作者歸屬在 [研究筆記](rev13-presentation-research-lin-shneiderman.md)。

| ID | Principle | Mandatory interpretation / reviewer check |
|---|---|---|
| **P18** | **Audience-led Structure / DIG / FIG** | 先決定每張分鏡的受眾學習任務與 Data → Insight → Go，再用 Font／Ink／Grid 安排視覺主次；避免為了炫技、減字或裝飾而失去訊息。 | 
| **P19** | **One Mother Map / Overview First** | 母圖以 **人 People／流程 Process／文件 Documents／版本管理 Version Control** 四個穩定視覺座標構成；GitHub 橫跨文件協作與版本變更，後半 Agent 為第五層；任何細節頁能回到相同座標。 |
| **P20** | **Focus + Context / Progressive Disclosure** | 聚焦當前階段、真正 co-work 的角色、Ticket 工作；不相關資訊以遮罩／弱化／局部定位器退到背景但不抹除脈絡。Overview → Spotlight → Work/Artifact → Updated Overview 為每個工作階段必有的敘事步驟，不強制四張實體投影片。 |
| **P21** | **Make Work & Relationships Visible / Relate** | 觀眾能看到 **人 ↔ 流程 ↔ 文件／Ticket／AC／Evidence ↔ 版本管理／GitHub** 的關係；知道當前誰 co-work、目前修改哪份工作契約、哪個 Branch／Commit／PR 與本次結果相連，不是互不相干的卡片。 |
| **P22** | **State Delta / History / Extract / Closure** | 每次回 Overview 可辨認文件、Ticket、看板、版本、已完成與 NOT RUN 的 before → after；留下可追溯的 Ticket／決議／PR／Evidence 與下一步。只重貼無變化全貌不合格。 |
| **P23** | **Four Foundations First, Agent Fifth** | 最前面兩個主要畫面，先建立傳統四要素「人、流程、文件、版本管理」，再於**同一母圖**加上 Agent 作第五項。後續沿同一流程逐站教四要素如何合作，Agent 只改變執行與協調者；不取代既有文件、版本或 Human Gate。Documents 與 Version Control 的職責不同，兩者可以透過 Git/GitHub 相連。 |

**審查強制問題**：
1. **P18**：能說出這張 Scene 的學習任務，以及何者是 Data、Insight、Go？（可以隱含在敘事設計，不必畫三張 DIG 卡片。）
2. **P19–P20／P23**：開場是否先正確建立四項→五項的共同母圖？後面能否辨認同一四大要素的方位、當前焦點與背景？
3. **P21**：People、Process、Documents（Ticket／AC／Evidence）及 Version Control（Commit／Branch／PR），有沒有看得出的關係與交接？
4. **P22**：回到全貌後哪份文件／哪個版本／哪個狀態**真的改變**了？能追溯舊狀態、證據、產物及下一步嗎？

**Blocking P1**：核心工作階段若缺必要的 Overview/Focus、可辨認的當前 Role/Ticket/GitHub 關係，或完成階段卻沒有更新狀態，就不符合本設計契約。非工作型教學頁（封面、附錄、練習）可用小型 locator／回到母圖入口，不強迫每頁都有五張卡。P18–P23 不要求每張都硬塞七種 Shneiderman 任務或所有交付細節；以學員實際能辨認並追查為準。

---

**內容組織方式：先四要素 → 加 Agent 變五要素，再 Workflow-first。** 現行 [v4 Content Refinement](rev13-workflow-first-content-refinement-v4.md) 強制開場 **O01 四個基礎／O02 原圖加 Agent／O03 引入 Matching App**；之後沿 Brainstorming → Refinement → Ready → Dev → PR Review → QA → Product Check → Human Gate 的時間線，讓 People、Process、Documents、Version Control 四個固定座標一起往前推。文件包含 Goal／Ticket／AC／DoD／Review／Evidence，版本管理包含 Git commit／branch／PR／merge；GitHub 是連接兩者的平台，不能把文件直接當成版控。Agent 不重畫原本流程，只疊加第五要素的執行／協調。這是 P19–P23 的實作，不另創第六個要素。

## Five Rev12 Agent Principles — CORE Content Invariant（非附錄）

**Rev12 第 76–81 頁 P42–P47** 是必保留的教學知識：**External Task State、Bounded Execution、Role Separation、Independent Verification、Goal Re-anchoring**。新版 **[v4 42-scene storyboard](rev13-workflow-first-content-refinement-v4.md) 的 A05–A11** 分別示範五項問題、處理決策、文件／版本／GitHub 產物，以及合回 Overview 的狀態。具體原版頁／source mapping 和情境見 [五項保留契約](rev13-agent-five-principles-preservation.md)。

這五項是「Agent 協作的教學內容」，**不同於 P18–P23 簡報製作 Principles**。缺一項或只剩五個詞、沒有案例與下一步，是 **Content P1**，不可過 G1。為避免又在重排時遺失，`tests/rev13_contract_check.py` 與 `docs/rev13-scene-manifest.json` 明確核對五項 source、核心 Scene、角色、文件、證據與狀態。自動 PASS 不等於視覺、真人或 release PASS；詳見 [Rev13 Gates](rev13-gates.md)。

## v5 內容結構（P18／P19／P20／P23 的強制執行口徑）

**目前唯一課程組織方式：[v5 Two-Part Architecture](rev13-two-part-learning-architecture-v5.md)**（Stage / Role / Document / GitHub 對照：[v5 manifest](rev13-two-part-manifest-v5.json)）。

- **Part 1 — 認識**：開場 O01 人／流程／文件／版本管理、O02 原母圖新增 Agent。接著學 Stage Card（產品 Goal vs Stage Target、Input、Activities、Output、Exit Criteria、People、GitHub）、Roles×Stages、Documents Lifecycle、Git/GitHub 物件與 Agent。概念頁是**定義／預訓練**，不應虛構 Ticket 已開、PR 已合併或 A/B 已測的狀態差異；以同一張母圖作定位、Zoom 與按需展開。
- **Part 2 — 應用**：依原 [v4 Storyboard](rev13-workflow-first-content-refinement-v4.md) 的 O03–X01 40 Scene 走完整 Matching App。真正發生教學事件的階段才要求完整 **Overview → Spotlight → Work/Artifact → Updated Overview** 四個語義步驟。Part 1 學過的名詞只用 locator 提醒，不原封重講一輪。
- **全程保留**：四大要素母圖、欄外 Human Gate、A FAIL/B-pre partial PASS + duplicate NOT RUN/B-post same-B supplemental PASS 的真實範圍，Rev12 五項 Agent 工作原則在 Part 2 主線。
- **禁止重複母圖敘事**：Part 2 不重複 O01/O02；上一站 Updated Overview 可直接兼下一站 Overview。Concept Slides 不必假裝有 before/after；真實教學事件有進度變更時才顯示 delta。
- **Actions freeze**：Owner 明確要求暫不觸碰 `.github/workflows/`，即使現有 CI 失敗也不在教材改版 PR 中處理。結構檢查可本機執行，但 G1／G4 必須另做。

## 1. 核心敘事法：Overview → Spotlight → Work / Artifact → Updated Overview

每一個主要工作階段必須遵守同一個循環：

1. **Overview（全貌）**：用同一張母圖呈現**完整流程＋所有職能＋必要的 GitHub 工作鏈**；亮出現在位置、現有票／最新已知狀態。第一次出現時先建立心智地圖。
2. **Spotlight（遮罩聚焦）**：基於**相同母圖／相同元素位置**，用半透明遮罩壓低不相關的階段、人員及連線，只高亮**本階段、共同參與的人、相關票及 GitHub 物件**。不可把非焦點元素直接刪掉，讓學員喪失空間脈絡。
3. **Work / Artifact（工作與產物）**：展開當前目標、行動、操作的 Ticket 欄位、需要的 Inputs / Outputs、證據或決策、GitHub 寫入／更新的位置。一次只教一個可回答的問題；若太多，拆成連續分鏡，延續定位器，不另開一條世界線。
4. **Updated Overview（更新全貌）**：回到**同一張母圖**，可見地呈現剛才產生的變化：某張 Issue 建立／修改、票被拆分、AC 完成、看板移欄、PR 被退回、QA 顯示 FAIL / NOT RUN、Human Gate 放行或暫停。標明**前後狀態**，指向下一個焦點。絕不可只重貼一張沒有改變的 Overview。

**反覆循環**：Overview → Brainstorming Spotlight → Goal Issue 建立 → Updated Overview → Refinement Spotlight → Story/Task 拆票／AC 更新 → Updated Overview → Ready ... → Agent 協作／Human Gate。

可在一張投影片完成 Spotlight + Work，或用多張 Detail 承接；不強制每組必須四張實體投影片。**每個階段的四個語義步驟不能消失。** 沒有新的狀態變化時避免多餘的 Overview 重複頁。

本專案內部稱為 **「共用母圖／遮罩分鏡法」**。受 Overview-first / focus+context、分鏡與視覺聚焦啟發；不是引用某位老師的專有正式名稱。

## 2. 固定母圖與視覺規則（跨章不漂移）

母圖以**四個永久位置的要素**及**第五個 Agent 疊層**構成；跨頁保持元素位置、箭頭、色彩、狀態標籤穩定。所有內容出現在需要時才展開，不在第一張塞完整命令或 Ticket 全文：

| 視覺位置 | 學員現在要看到 | 概念／GitHub 正確對應 |
|---|---|---|
| **People 人** | 全角色位置；此站真正 co-work／決策的人 | 職能 ≠ 人數，Owner、PM、PO、Dev、Reviewer、QA |
| **Process 流程** | 當前活動、七欄 Kanban State、Gate／退回路線 | Brainstorming／Refinement 是活動，Human Gate 是欄外決策 |
| **Documents 文件** | 正在建立、修改、審查哪份共識或證據 | Goal／Proposal、Epic/Story/Task Ticket、AC/AT、DoD、設計決議、Review 意見、QA Evidence；Issues/Projects 可承載工作記錄 |
| **Version Control 版本管理** | 當前工作分支／候選版本／Commit／PR／Merge | Git 管版本歷史；GitHub 承載 Repo、PR 與協作審查，PR 可同時引用文件和版本 |
| **Agent 第五層** | 到 Agent 章才顯示受委派的執行者或 Orchestrator | 不自動取代人類決策、不宣稱另一條 Workflow |
| **當前工作／State Delta（跨區圖層）** | 正在操作哪張 Ticket 哪條 AC、前後變化與下一步 | 不屬於第六要素；是以上四／五要素的當前切片 |

**Documents 與 Version Control 的明確界線**：文件回答「依據什麼需求、決策、驗收規格和證據」，版本管理回答「哪個版本、由誰修改、怎麼對照、合併或回復」。文件可以被 Git 版控；GitHub Issue/Project 不是 Git Commit，PR 連接版本審查與文字討論。

**投影片畫面優先級**：當前 Spotlight > 人物＋工作關係 > 具體產物 > 其他背景。使用可辨認的半透明遮罩、局部亮度／對比或描邊；非焦點仍看得出原位置。不可只靠顏色區分；重要狀態需有文字。

**出場與回場**：
- **開場至少兩個連續場景：O01 四要素 → O02 同圖新增 Agent 第五層**。二者共用相同位置與符號；O03 才聚焦 Matching App。全貌必須看得到 People、Process、Documents、Version Control 及完整流程／主要職能，Agent 新增時不得替換它們。GitHub 初見可先以「共同工作紀錄／修改歷史／送審」白話標示，再展開術語。
- 各工作階段 Focus 頁維持全貌作為背景（可為縮圖或簡化定位器），但不得替換成互不一致的新流程圖。
- 工作細節／練習／附錄／章封面可使用母圖的**小型定位器或明確回到母圖的入口**；仍要能回答現在屬於哪個階段，不能成為沒有時空座標的孤立知識頁。
- Agent 出場時**不重畫流程**：原本的流程、GitHub 物件、責任及 Human Gate 不變，只在母圖上新增 Agent / Orchestrator / Sub-agent 的執行者／協調者層。
- 翻頁效果不強制動畫。HTML 可以穩定切換顯示；PPTX 優先沿用可編輯文字與圖形元件，不把整張頁面烘焙為圖片。若使用 Morph / fade，是增益而非依賴；靜態翻頁也必須完整可讀。

## 3. 每個分鏡必填的 Storyboard 欄位

在**製作投影片前**，每個 Rev13 主線 scene 至少有以下 metadata（可放 Storyboard 表格或結構化檔，不必把全部欄位塞在畫面）：

| 欄位 | 必須回答 |
|---|---|
| \`scene_id\`, \`scene_type\` | Overview / Spotlight / Work / Updated Overview / Detail / Exercise |
| \`phase_activity\` | Brainstorming、Refinement、Dev、PR Review、QA、Product Check、Human Gate…目前做什麼？ |
| \`kanban_state\` | 目前七欄哪一欄？或 \`pre-backlog\`／\`not-applicable\`；活動／人類關卡不得冒充看板狀態 |
| \`focus_roles\` | Owner、PM、PO、Dev、QA、Reviewer 或 Agent 等哪些參與者在 co-work；此步誰負責 |
| `goal_and_work_ref` | Goal、哪張 Ticket、Story / Task / Epic 分解關係；哪個欄位／哪條 AC 正在處理 |
| `document_artifact` | 目前正在建立／讀取／修正哪份 Goal、Ticket、AC、DoD、PR 描述、Review 或 Evidence；存放何處？ |
| `version_control_ref` | Branch／Commit／候選版／PR／Merge 是否存在，是否與當前測試或文件版本相符？ |
| \`inputs_and_action\` | 從哪個決定／票／證據開始？現在做什麼？ |
| \`outputs_and_delta\` | 本步新增／更新什麼？與上一張 Overview 的狀態差在哪裡？ |
| \`github_mapping\` | GitHub Issue / Project / Branch / Commit / PR 中哪個物件？新建／更新／送審／無變更？ |
| \`evidence_scope\` | 真實實測、純教學示意、條件推演、PASS / FAIL / NOT RUN 及證據來源 |
| \`next_focus\` | 下一個階段與下一張應聚焦的人／工作 |

**最低畫面驗收：五秒掃讀後**，開場學員能辨認四要素與新增 Agent 的第五項；進到工作階段後能說：現在在哪裡、誰在做、目前用／改哪份文件或票、對應哪個版本與 GitHub 物件、剛變了什麼。若資訊不適合全放主畫面，保留最小可讀 locator，細節放 Notes / Evidence。

## 4. 第一個循環：Brainstorming（示範契約）

- **Overview**：完整工作路線＋全職能；尚在選方向、尚無實作分支／PR。
- **Spotlight**：只高亮 Brainstorming 與 **Owner / PM / PO**（可依組織調整，職能不硬等於三個人）；其它人與階段保留淡化輪廓。
- **Goal**：**決定下一個要解決的問題與方向**；從問題／選項聚焦到 Outcome Goal，不提前宣稱方案已可開工。
- **Current Work**：正在形成 Goal / Proposal，不是假設已有 Ready Story。
- **Output**：記錄 Goal、初步成功訊號、尚待確認的假設；建立或更新 **GitHub Goal / Proposal Issue**。可以稍後依團隊分類為 Epic/Story/Task；**不可宣稱 GitHub 每個 repo 內建固定 Epic/Story/Task 類型**。
- **Updated Overview**：Brainstorming 已有結論，顯示 \`Issue created\` 與 Goal 待 Refinement；下一個焦點轉向 Refinement，尚未開始開發。

## 5. 第二個循環：Refinement / Planning（示範契約）

- **Overview**：顯示前階段產生的 Goal Issue 及 \`Needs refinement\`；大流程／職能位置維持不變。
- **Spotlight**：高亮 Refinement；參與者 **Owner / PM / PO / Dev / QA（以及必要時 UI/UX）**。這些代表責任，不強制人頭數。
- **Goal**：確認目標／範圍是否可實作；**Divide and conquer**：Epic → Story → Task／子票及相依、風險、優先級，保證能交付與驗收。
- **Current Work**：針對剛建立的 Goal / Proposal Issue 做 Refinement（不是再造一個無關的 Goal）；逐項釐清 scope、out-of-scope、AC、AT / expected evidence、依賴、估算與 owner、DoD 適用情況。
- **Output**：**更新 Parent Issue 與建立／連結必要的子 Issues**，明示各票是 Epic / Story / Task 等哪種課程使用的分類；必要時更新 GitHub Project 欄位、關聯及優先順序。未滿足 Ready 條件就停在 Backlog，**不能因拆票完成自動跳 Ready**。
- **Updated Overview**：顯示 \`Parent → Child Issues\` 和各票狀態、已完成哪些 Refinement 事項／哪些尚待釐清；下一個聚焦 Ready。
- **教學語義**：Refinement 是在 Backlog 期間進行的活動，**不是第八個 Kanban 狀態欄**；同樣 Human Gate 是 Product Check 之後的欄外授權，而非看板新欄位。

## 6. 後續階段也用同一文法（至少要有這些可見狀態變化）

| Activity / Focus | Co-work 重點 | 更新的產物 / GitHub 關聯 | Updated Overview 應顯示 |
|---|---|---|---|
| Ready | PO / Dev / QA 視情況 | Ticket 的 AC / scope / dependency 已可交辦；Project Ready 欄 | \`Backlog → Ready\`，WIP 仍 0/1（此課示範政策） |
| Dev | Dev，必要時 PM / Agent | Branch + commits + self-test，對應 Issue | Ticket 開始進 Dev、WIP 1/1、候選版本與剩餘事項 |
| Review | Dev / Reviewer | PR 及 Review findings，連到 Issue / commit | 送審／通過／退回 Dev，未 merge 不可當已合併 |
| QA | QA / Dev | AC 執行證據、測試對應的 candidate | PASS / FAIL / NOT RUN；若退回顯示 QA → Dev |
| Product Check | PO / Owner / Dev | Ticket 對 Goal 的核對、未解問題 | 接受／退回既有欄位、尚非整體 Goal 達成 |
| Human Gate | Owner / 有權決策者 | 放行、暫停、退回的明確紀錄 | 欄外 Gate 決策；放行後仍待 Merge／Release／DoD |
| Merge / Release / Done | 經授權執行者 | PR merge、版本／發布證據及 Issue/Project 更新 | 只有符合實際證據與 DoD 才呈現 Done |
| Agent collaboration | 原責任人 + Agent / orchestrator | **沿用同一張票和相同 GitHub 工作鏈** | 只變更 executor/coordinator，不自行變更已核准 Goal 或 Human Gate |

## 7. 所有章節、Slide、PR 都必須通過的 Review Gate

- [ ] **Global context / P23**：開場 O01 四要素、O02 同圖加 Agent 的第五項，後續母圖四軸與附加 Agent 層固定、可回到全貌定位。
- [ ] **Scene grammar**：每個工作階段有 Overview → Spotlight → Work / Artifact → Updated Overview 四個**語義步驟**；合併／拆分實體投影片可以，但不得缺。
- [ ] **Mask/focus**：只突出當前活動、真正 co-work 的人及相關 Ticket；其餘淡化且保留上下文，不造成焦點競爭。
- [ ] **State delta**：每次回 Overview 都要反映剛剛產生的變更，不得回到相同無進展的畫面。
- [ ] **Documents + Ticket progress**：能看到目前**讀／寫哪份文件、開 Ticket、修改哪條 AC、拆票、執行或驗收哪個項目**；不是把所有文件默認成 GitHub 或版本管理。
- [ ] **Version / GitHub truth**：Documents（Goal／AC／DoD／Evidence）和 Version Control（Git branch／commit／PR／merge）分得清，並正確映射 GitHub Issues／Project／PR；未建立／未執行不可寫成完成，Epic/Story/Task 不當作每個 repo 預設分類。
- [ ] **Rev12 五項核心原則**：A05–A11 是否包含五項可見的風險、行動、產物與決策？每項是否能對回原頁 76–81 和 Rev13 [Preservation Contract](rev13-agent-five-principles-preservation.md)？
- [ ] **Role / decision**：現在誰參與、誰做事、誰有最後放行權都看得出；Agent 加入不消除人類決策。
- [ ] **Evidence truth**：Matching #3 Version A、B-pre、B-post 的 PASS / FAIL / NOT RUN 必須與現有 SSOT 完全對應；示意不可冒充實測。
- [ ] **Cross-format**：HTML／PPTX／講者筆記沿同一狀態與畫面語法；PPTX 可編輯元素，不能用整頁圖片當交付。
- [ ] **G1 / G3 / G4 / G5**：Storyboard review 要檢查場景欄位與先備，盲看學員能指認五要素，最後版實際截圖驗視覺，最新 HEAD 重驗並留 Human Gate；未測維持 NOT RUN。

**Blocking rule:** 若任一核心工作階段沒辦法指出現在活動、co-work 角色、Ticket 狀態變更、GitHub 物件、Updated Overview 的差異，應視為 **P1 未達標**，不能因為單頁好看或測試無 overflow 就 merge。Storyboard、generator、Notes、QA／issue 全部要用本契約 Review；例外必須在該頁註明為何、如何保持導航／再錨定。

## 8. 研究補充：林大班／BFA × Shneiderman（對既有規則的解釋）

完整有來源的研究、作者歸屬與非原作者原意之專案轉譯見 [林大班 × Shneiderman 設計研究筆記](rev13-presentation-research-lin-shneiderman.md)。

**(A) 結構／重點先於遮罩（林大班）**

- 先確定當下對零基礎受眾的**學習任務、事實／輸入、關鍵差異、下一步能做什麼**，再挑選畫面焦點；不要把 FIG 做成純美化或把 DIG 做成每頁三張裝飾卡。
- 用 **DIG（Data／Insight／Go）** 判斷要呈現什麼；再用 **FIG（Font／Ink／Grid）** 排定主次、降低雜訊、固定視覺位置。**文字多寡不是品質標準，重點有沒有被看懂才是。**
- **分鏡溝通法**在 BFA 公開文章中由**魯蓓蓓**介紹／撰寫；與林大班的目標／閱聽人／一致性原則相容，但不得標成林大班本人獨創。

**(B) Shneiderman 不止三步：七項任務與本專案轉譯**

- **Overview／Zoom／Filter／Details-on-demand**：已對應此契約母圖、聚焦、逐段揭露與必要時的證據細節。
- **Relate（關聯）**：**除了五個資訊區塊，還須讓人看得出階段 ↔ 共同職能 ↔ 工作票／AC ↔ GitHub Issue／PR 是如何互相連接**。同色／箭頭／連線／同位映射可用，不得要求學員自行腦補五張卡的關係。
- **History（歷史）**：Updated Overview 不只有「現在」；須顯示**由什麼變成什麼**、何時從 A → B-pre → B-post、哪個未測項尚在、退回後去哪裡；必要時可回查舊版本。
- **Extract（擷取）**：原論文指可擷取資料與查詢參數；本課**借用**成「觀眾能找到這一步真正產出的 Ticket、PR、決議或 Evidence」。不代表每張投影片要有下載按鈕／實際 GitHub 自動化。
- **不要機械地把七項任務變成七張幻燈片或每張七個框。** 整個階段能完成相應信息任務即可。此研究原是互動介面，不保證投影片教學效果。

**(C) Shneiderman Eight Golden Rules 對 HTML 播放器的延伸**

同一視覺與語義 **Consistency**；每次操作、票的狀態變化有 **Informative feedback**；章節完成有 **Closure**；能返回、回查版本（**Reversal / History**）；不強制動畫、講者能控制進度（**User control**）；跨頁不靠人腦記住此前所有版本／AC（**Reduce memory load**）。這些用於設計與 QA；不用在主線硬教完整 HCI 術語。

**(D) Focus+Context 的手段可選擇**

研究另外區分 **Overview+Detail、Zooming、Focus+Context、Cue-based highlighting**；半透明遮罩屬於可行的選擇性聚焦方式，而非唯一形式。對於需要詳細閱讀的 Ticket / GitHub 圖，可用「小母圖 locator + 大細節 + 高亮連線」，比整張畫面重複灰霧遮罩更易讀；無論何種手段都需保留空間方向。

**加進原 G1/G3/G4 檢查**：這頁觀眾應看到的 Data／Insight／Go 是什麼？焦點層級清楚嗎？人／流程／票／GitHub 有視覺關係嗎？狀態歷史、能否回查與本步產物都看得到嗎？違反已定可定位／關係／證據契約時仍是 Blocking P1；但**不能把 DIG、FIG、七項任務本身機械計數當獨立 Gate**。

## 9. 研究出處（設計參考，非此教材已驗收之證據）

- [BFA／魯蓓蓓：分鏡溝通法與半透明遮罩](https://www.bfa.com.tw/blog/the-myth-of-presentation-animation) — 局部逐頁聚焦的演示案例（勿誤認林大班獨創）。
- [林大班：BFA 視覺降噪／分類／重點／一致性](https://www.bfa.com.tw/blog/bfa-event-60-featured-speaker-ben)；[PBS 官方課綱](https://www.pbs.school/course/business-presentation) — 先有目標與受眾，再用 DIG／視覺設計呈現重點。
- [Shneiderman, The Eyes Have It (1996)](https://drum.lib.umd.edu/items/155a868e-fb83-4115-9899-9187ea8c0498) — **七項任務**：overview、zoom、filter、details-on-demand、relate、history、extract；本課加上 **Updated Overview** 是專案自己的教學節奏。
- [Shneiderman：Eight Golden Rules](https://www.cs.umd.edu/users/ben/goldenrules.html) — 一致性、回饋、完成感、可回頭、控制感、降低跨頁記憶負荷。
- [Cockburn et al.：Overview+Detail／Focus+Context／Cue-based](https://www.microsoft.com/en-us/research/publication/a-review-of-overviewdetail-zooming-and-focuscontext-interfaces/) — 遮罩是眾多焦點手段之一。
- [Microsoft PowerPoint Morph 說明](https://support.microsoft.com/en-us/powerpoint/morph-transition-tips-and-tricks) — 相同元素跨頁的可選視覺轉場；不能依賴 Morph 才看得懂。
