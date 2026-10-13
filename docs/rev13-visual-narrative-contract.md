# Rev13 全域投影片分鏡契約（Mandatory Slide Grammar）

> **Status: REQUIRED for every Rev13 teaching scene; planning contract, not an assertion that Rev13 slides exist.**
> Canonical design source for Rev13 Storyboard, slide authoring, speaker notes, HTML, native-editable PPTX and PR reviews. Parent: [Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60); initial Draft PR: [#61](https://github.com/world4jason/Agent-101-deck/pull/61).
>
> **One sentence:** 學員從畫面就能辨認「現在流程哪裡、哪些人 co-work、正對哪張 Ticket 做什麼、最新狀態／產出是什麼、與 GitHub 的關係」。

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

母圖至少有五個明確區域；**元素位置、箭頭方向、色彩語義、角色與工作標籤跨頁固定**：

| 區域 | 學員要一眼看到 | 固定規則 |
|---|---|---|
| **Workflow** | 當前活動與狀態在哪裡、下一步往哪裡走 | 全貌保留完整流程；Spotlight 壓暗其餘。活動不等於 Kanban 欄 |
| **People / Roles** | 哪些職能 co-work、目前誰決策／誰執行 | 全貌顯示所有主要人類職能；Spotlight 高亮本階段。Role ≠ person ≠ agent |
| **Current Work** | 正在處理哪個 Goal、Epic / Story / Task、Ticket 哪個欄位／哪條 AC | 只放當前要操作的票與具體動作，不塞完整規格書 |
| **Output / State Delta** | 這一步新產出什麼、完成了什麼、未完成什麼 | 前後狀態必須區分；資料未知用 Unknown / NOT RUN，不自動標 PASS |
| **GitHub** | Issue / Project / Branch / Commit / PR 的哪個物件受到影響 | 沒發生的動作標「尚未」或 N/A；Issue ≠ PR；Git ≠ GitHub |

**投影片畫面優先級**：當前 Spotlight > 人物＋工作關係 > 具體產物 > 其他背景。使用可辨認的半透明遮罩、局部亮度／對比或描邊；非焦點仍看得出原位置。不可只靠顏色區分；重要狀態需有文字。

**出場與回場**：
- Opening Overview 必須同時看得到整體流程與所有主要職能；GitHub 物件可先以白話「待辦／修改紀錄／送審」標示，首次介紹 GitHub 再展開術語。
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
| \`goal_and_work_ref\` | Goal、哪張 Ticket、Story / Task / Epic 分解關係；哪個欄位／哪條 AC 正在處理 |
| \`inputs_and_action\` | 從哪個決定／票／證據開始？現在做什麼？ |
| \`outputs_and_delta\` | 本步新增／更新什麼？與上一張 Overview 的狀態差在哪裡？ |
| \`github_mapping\` | GitHub Issue / Project / Branch / Commit / PR 中哪個物件？新建／更新／送審／無變更？ |
| \`evidence_scope\` | 真實實測、純教學示意、條件推演、PASS / FAIL / NOT RUN 及證據來源 |
| \`next_focus\` | 下一個階段與下一張應聚焦的人／工作 |

**最低畫面驗收：五秒掃讀後**，學員應能說：現在在哪裡、誰在做、針對哪張票做什麼、剛變了什麼、GitHub 哪裡記錄。若資訊不適合全放主畫面，保留最小可讀 locator，細節放 Notes / Evidence。

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

- [ ] **Global context**：第一個 Overview 有完整流程＋全部職能；之後每個場景都維持相同母圖／定位器。
- [ ] **Scene grammar**：每個工作階段有 Overview → Spotlight → Work / Artifact → Updated Overview 四個**語義步驟**；合併／拆分實體投影片可以，但不得缺。
- [ ] **Mask/focus**：只突出當前活動、真正 co-work 的人及相關 Ticket；其餘淡化且保留上下文，不造成焦點競爭。
- [ ] **State delta**：每次回 Overview 都要反映剛剛產生的變更，不得回到相同無進展的畫面。
- [ ] **Ticket progress**：能看到當前是**開 Ticket、修改哪個欄位／AC、拆票、執行或驗收哪個項目**；不能只有抽象流程箭頭。
- [ ] **GitHub truth**：Issue / Project / Branch / Commit / PR 用法正確，未建立與未執行不可寫成已完成；不得把 Epic / Story / Task 誤稱 GitHub 所有 repo 的預設類型。
- [ ] **Role / decision**：現在誰參與、誰做事、誰有最後放行權都看得出；Agent 加入不消除人類決策。
- [ ] **Evidence truth**：Matching #3 Version A、B-pre、B-post 的 PASS / FAIL / NOT RUN 必須與現有 SSOT 完全對應；示意不可冒充實測。
- [ ] **Cross-format**：HTML／PPTX／講者筆記沿同一狀態與畫面語法；PPTX 可編輯元素，不能用整頁圖片當交付。
- [ ] **G1 / G3 / G4 / G5**：Storyboard review 要檢查場景欄位與先備，盲看學員能指認五要素，最後版實際截圖驗視覺，最新 HEAD 重驗並留 Human Gate；未測維持 NOT RUN。

**Blocking rule:** 若任一核心工作階段沒辦法指出現在活動、co-work 角色、Ticket 狀態變更、GitHub 物件、Updated Overview 的差異，應視為 **P1 未達標**，不能因為單頁好看或測試無 overflow 就 merge。Storyboard、generator、Notes、QA／issue 全部要用本契約 Review；例外必須在該頁註明為何、如何保持導航／再錨定。

## 8. 研究出處（設計參考，非此教材已驗收之證據）

- [BFA 分鏡溝通法與半透明遮罩](https://www.bfa.com.tw/blog/bfaevent-live-streaming-4) — 局部逐頁聚焦的演示案例。
- [Shneiderman, The Eyes Have It (1996)](https://doi.org/10.1109/VL.1996.545307) — overview first / zoom and filter / details-on-demand；本課加上 **updated overview** 的工作狀態回報，是專案自己的敘事規則。
- [Microsoft PowerPoint Morph 說明](https://support.microsoft.com/en-us/powerpoint/morph-transition-tips-and-tricks) — 相同元素跨頁的可選視覺轉場；不能依賴 Morph 才看得懂。
