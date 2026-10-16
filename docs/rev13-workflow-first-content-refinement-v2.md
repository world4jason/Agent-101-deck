# Rev13 Content Refinement v2 — 讓學員沿著工作流程前進

> **SUPERSEDED BY v3 — HISTORICAL PLAN ONLY**：Owner 已改為 **第一張人／流程／文件／版本管理四要素，第二張同圖加入 Agent 第五要素**。請依 [現行 v3 Storyboard（35 Scenes）](rev13-workflow-first-content-refinement-v3.md) 製作；以下三要素／34 Scenes 僅用於追溯 v2 討論，**禁止當成 Rev13 現行頁序**。

> **狀態：Refinement / G1 Ready Review 待驗。這是新版內容與分鏡，不是完成的投影片或可合併實作。**
>
> **Parent GitHub issue：[AgentDeck #60](https://github.com/world4jason/Agent-101-deck/issues/60)**　｜　**Planning PR：[Draft #61](https://github.com/world4jason/Agent-101-deck/pull/61)**  
> 依據：[P1–P22 與全域分鏡契約](rev13-visual-narrative-contract.md)；舊 [Storyboard v1](rev13-reorg-storyboard-v1.md) 和 [107 頁遷移矩陣 v1](rev13-migration-matrix-v1.md) 是來源／歷史候選，不可直接當新版頁序執行。

## 0. 本輪真正的變更決議（改進 v1）

**v1：**「先用大章節講 Process → Git/GitHub → People → 三者合流 → Agent」。  
**v2：**開場先建立三要素（Process / Git & GitHub / People）的基本地圖，**之後只沿著同一條真實開發工作流程的時間順序往前推**。每走到一站，才展開這一站真正需要的職能、Ticket 欄位、GitHub 動作與少量技術概念。**Agent 是同一張母圖上的第二輪協作模式對照，而不是另一套開發流程。**

理由：長篇的 Git 與 People 抽象章會打斷需求→交付的單一時間線，也讓學員在不知道「為什麼現在要用 Git／這個角色」時先背名詞。GitHub Issue 在 Brainstorming 第一次出現時，先用白話「共同待辦／決議紀錄」並逐步命名；第一次真的需要 commit、branch、PR 時再講 Git。**三要素仍被完整教到，但不變成三個與流程分離的長課程。**

三層清楚區分：
1. **教學中的軟體開發工作流**：Matching App 專案的虛構／推演工作物件，部分 #3 規則層測試有真實證據；**不等於本 Repository 的 GitHub issue/PR 真實歷史**。
2. **製作本投影片的工作流**：#60 是真正的 Planning/Refinement Issue；#61 是真正的 docs-only Draft PR；尚未有 Rev13 投影片 Dev/QA。
3. **工具／方法論**：GitHub 是版本／工作協作工具；Git、Issue、Project、PR 是不同用途；Kanban seven columns 是**本課的示範政策**，不是唯一軟工流程標準。

## 1. 觀眾始終看見的母圖（只建立一次，後續相同座標）

\`\`\`text
WORKFLOW（活動）  Brainstorm → Refinement → Ready → Dev → PR Review → QA → Product Check → Human Gate → Release → Done
KANBAN（七欄）    Backlog ────────→ Ready ────────→ Dev → Review → QA → Product Check ───────────────→ Done
PEOPLE           Owner   PM   PO   UI/UX   Dev   Reviewer   QA          （各階段僅高亮 co-workers）
CURRENT WORK     Goal/Proposal Issue → Parent + Stories/Tasks → 正在做的 Ticket / AC → Result / Evidence
GIT/GITHUB       Issues / Project            → Branch / Commit → PR      → PR + Evidence      → Merge / Release
\`\`\`

- **全貌頁**先展示所有角色與完整大方向，非焦點淡化；當前活動、Kanban 位置、共同職能、當前 Ticket／正在操作哪個欄位、GitHub 物件與**前後狀態變化**是最少五個座標。
- **每一階段語義循環**：Overview → Spotlight（遮罩聚焦人與流程）→ Work / Artifact（此刻正在做什麼）→ Updated Overview（前→後、成果進到哪、下一站）；可以合併或拆開，**不是每個階段硬塞 4 頁**。
- **前一站的 Updated Overview 可以同時是下一站的 Overview**：這是同一張母圖的連續狀態，不必在兩站中間複製一張毫無變化的全貌圖；但下一站 Spotlight 仍要有可見的人員／Ticket 焦點。若翻頁或跳章，locator 須能重新定位。
- **活動 ≠ Kanban 狀態**：Brainstorming 先形成 Goal；Refinement 在 Backlog 上完成票；Human Gate 是 Product Check 後**欄外**決策；真正的 Merge / Release / DoD 條件需完成才 Done。
- **角色 ≠ 人數**，Agent 是執行／協調的另一層而不重畫 Workflow。
- **本課 Matching #3（教學工作票）**不應在教材中顯示為 AgentDeck 這個 Repo 的真實 GitHub \`#3\` 連結。示意 GitHub 內容應清楚標「教學示意」；真實 evidence 連至現有 fixture / replay。

## 2. 全程只有一個案例、一條逐步更新的故事

**Goal：**讓使用者能正確表達喜好、雙向喜歡才形成配對。這次拆成三項：#1 Like/Pass、#3 雙向配對規則、#2 配對列表；主線實際追 #3 的規則層，不偷加聊天室或真實 UI 驗證。

**故事的唯一前進時間線：**

Problem（模糊需求） → Outcome Goal（記成 Goal Issue） → Refinement（拆 #1/#3/#2；#3 有 Scope、Out-of-scope、AC、Expected Evidence、DoD） → Ready（#3 可開工） → Dev（候選 A） → PR Review（展示範圍風險之教學示意） → QA（A 單向 FAIL） → 退回 Dev → 候選 B-pre（單／雙向 PASS、重複 NOT RUN） → 補驗同一 B 後 B-post（重複 PASS） → Product Check / Human Gate（依剩餘未驗項與風險決定下一步） → **未實跑的 Merge／Release／Done 僅能作條件示意，不能當事實**。

### Evidence / Story 健全性

- **實證範圍**：Version A 的單向 Like 預期 0、實際 1 = FAIL；Version B-pre 單向與雙向 PASS、duplicate NOT RUN；同一個 B 候選在 B-post 補測 duplicate PASS。
- **不可宣稱**：其他未跑的情境、真實 Matching UI、端到端整合、正式發布、整體 Goal 成效 PASS。不能把 Reviewer 的想像 PR 結果當真 PR。
- 在 Agent 章介紹三種配置時回到同一個 **已知、凍結的故事 snapshot**；比較的是責任與交接，不暗示重新執行過三種 Agent 架構。

## 3. 建議投影片分鏡序列（此為 34 個 Scene，不是最後固定張數）

| Scene | 畫面／標題應回答的問題 | Spotlight：現在誰、哪一步 | Ticket／GitHub 此刻的工作與 State Delta | 資料性質 |
|---|---|---|---|---|
| O01 | 為什麼需要「流程／版控／人」？ | 全 Workflow、全部主要職能 | Goal 未定；GitHub 尚無這次案例的工作票；預告後面會加入 Agent | 教學圖 |
| O02 | 我們想完成怎樣的配對體驗？ | Goal 區域；Owner／PM／PO | 模糊「配對功能正常」→ 待討論 Problem | 案例示意 |
| B01 | 現在進入 Brainstorming：誰決定方向？ | Brainstorming；Owner／PM／PO | 先討論成功體驗與待確認假設 | 示意 |
| B02 | 今天要解決什麼使用者問題？ | 原 Spotlight，放大需求決議 | 需求／候選方案 → Outcome Goal＋觀察指標 | 示意 |
| B03 | 這個決議會存到哪裡？ | Spotlight 連到 GitHub Issues | 建立 **Goal/Proposal Issue（教學示意）**，不能跳叫 Ready | 示意 |
| B04 | 看全圖：上一站留下什麼？ | 更新母圖，仍可見全員 | **無正式票 → Goal Issue 已建立；待 Refinement** | 示意／History |
| R01 | 下一步為何不是立刻寫程式？ | Refinement；Owner／PM／PO／Dev／QA，必要時 UI/UX | 從同一 Goal Issue 開始 feasibility / scope / risks | 示意 |
| R02 | 一個 Goal 可以怎麼拆成能交付的工作？ | 相同人員，Ticket 分解區域 | Goal → #1 Like/Pass、#3 規則、#2 列表；標示依賴及順序 | 示意 |
| R03 | #3 要怎麼寫才不會每個人猜不同？ | PO／Dev／QA；Ticket #3 的 AC | 壞票 → Scope / Out-of-scope / AC / Expected Evidence / AT / DoD | 示意 |
| R04 | GitHub 如何記住拆票結果？ | Issues／Project，其他淡化 | 更新 Parent，連結 child Issues、依賴及狀態；不是另建不相關 Goal | 示意 |
| R05 | 全圖更新後是否就已經 Ready？ | 更新母圖 | **Goal Issue → 3 張子票 + #3 待 Ready Check；仍 Backlog** | 示意 |
| RD01 | Ready 究竟代表什麼？ | Ready；PO／Dev／QA | #3 的 scope、依賴、AC / testability 確認 | 示意 |
| RD02 | Ready 是「可以開工」，不是「已通過測試」 | 更新母圖 | #3 Backlog → Ready，WIP 仍 0/1；Project Status 更新 | 示意 |
| D01 | 實作時先碰到哪個版本管理問題？ | Dev；Dev | #3 從 Ready → Dev，WIP 1/1，還不能宣稱有 PASS | 示意 |
| D02 | 為何需要 Git commit、branch？ | Dev＋Git lane | 第一次**Just-in-time** 教 Git ≠ GitHub：branch、commit、push，連回 Ticket | 概念＋示意 |
| D03 | Dev 要留下什麼供別人接手？ | Dev；Ticket #3＋Git | 候選 A／修改內容／自測／已知缺口，PR 不等於 Issue | 示意（測試於 QA 引出） |
| D04 | 全圖：現在哪張票、哪個版本？ | 更新母圖 | Ready → Dev；候選 A、Branch/Commit 教學示意可追 | 示意 |
| RV01 | PR Review 跟 Ticket Review 有何不同？ | Review；Dev／Reviewer | GitHub PR 關聯 Issue，審查改動與越界，不取代 AC 實測 | 示意 |
| RV02 | 如果 Reviewer 發現越界呢？ | Review → Dev 回退 | 例如新增聊天室屬 out-of-scope；退 Dev 修正再審 | **明示模擬** |
| RV03 | 全圖：PR 現在是什麼狀態？ | 更新母圖 | Review request / changes requested / needs QA（非 merge）；顯示分支尚未合併 | 示意 |
| Q01 | QA 不看原作者說 PASS 就算數 | QA；QA／Dev | 測同一候選與 AC；引出預期／實際／NOT RUN | 概念 |
| Q02 | 第一個錯在哪裡？ | QA：Ticket #3，AC 單向 | **Version A：預期 0，實際 1，FAIL**；QA → Dev | **規則層實測** |
| Q03 | 修正後 B-pre 真正證明了什麼？ | Dev → QA；同一張票 | **B-pre 單向／雙向 PASS；duplicate NOT RUN**；不能宣稱完成 | **規則層實測** |
| Q04 | NOT RUN 要怎麼退回補驗？ | QA／Dev；duplicate AC | 先讓學員提補驗要求；**B-post 同一 B 候選 duplicate PASS** | **規則層實測** |
| Q05 | 全圖：這一步留下的證據與未測項？ | 更新母圖，保留 History | A FAIL → B-pre partial → B-post duplicate PASS；UI/E2E 仍 NOT RUN | 實測／NOT RUN |
| PC01 | Ticket 做對，是否等於整個 Goal 達成？ | Product Check；PO／Owner／Dev | 核對 #3 的 Scope/AC、#1/#2 及整體 UI/E2E 缺口 | 示意＋實測界線 |
| PC02 | 全圖：可以接受哪部分？ | 更新母圖 | Ticket 規則層證據可審、Goal 全路徑尚待驗，列待決事項 | 條件性判斷 |
| HG01 | 誰可以決定放行／暫停？ | Human Gate（欄外）；Owner / authorized human | 展示 evidence、風險、尚未跑的 QA、release checklist | 示意 |
| HG02 | 全圖：要不要進 Done？ | 更新母圖 | 現有事實不能宣稱 Release/Done；若要示意成功路徑，必須清楚標 **假設 Gate 放行且後續 DoD 成立** | 實測界線／條件推演 |
| A01 | 第四要素加入，原流程會改變嗎？ | Agent 全貌疊層（流程、人、Git 不動） | 回到明示的 Matching #3 snapshot；只替換 executor／coordinator | 模式比較 |
| A02 | 模式一：一人＋一個 Agent 如何完成一輪？ | Human／Single Agent | 同票、同 AC、同 evidence 和 Human Gate；有既有單 Agent demo | 部分實測＋敘事回放 |
| A03 | 模式二：開多 Chat 後，誰搬 Ticket／版本？ | Human 協調 Dev／Reviewer／QA Chats | 人決定每站交接與證據來源 | **架構示意，非真實 multi-agent run** |
| A04 | 模式三：Orchestrator 能取代人類放行嗎？ | Orchestrator＋Sub-agents／Human Gate | 主 Agent 在授權內分工、彙整；Human Gate 不變 | **架構示意，非真實 multi-agent run** |
| X01 | 練習：交給 Agent 的第一張票，什麼時候才算完成？ | 全貌＋學員作答 | 寫 Ticket、選協作模式、決定是否補驗；**先答再揭露** | 練習 |

**Scene sequence 完整覆蓋原本七欄、欄外活動與人員角色**；每站最後的 Overview 顯示狀態 delta。上表是內容 Refinement 候選，精準頁數、Notes、圖形動畫與每個 AC 對應的 evidence URL 待下一輪分鏡 Review／實作決定。

## 4. 這次「我們真的怎麼開發 Rev13」也用同一套看板語言

> 不把投影片故事中的 Matching #3 假想 GitHub 操作寫成本 repo 真的做過。下表只記 AgentDeck Repo 的真實工作。

| 本 repo 工作階段 | 狀態 | GitHub／可查產物 | 前進條件 |
|---|---|---|---|
| **Brainstorming / Goal** | 已形成方向 | Issue [#60](https://github.com/world4jason/Agent-101-deck/issues/60)：三要素→Agent，P1–P22 principles | 已有可檢查 Goal |
| **Refinement / Planning** | **現在進行中** | Draft PR [#61](https://github.com/world4jason/Agent-101-deck/pull/61)：規範、歷史 107 頁矩陣、**本 v2 工作流優先分鏡** | 將內容拆成可操作 Scenes、補 AC 與 G1 review |
| **Ready** | **未通過** | Storyboard 的 G1 先備／時間線獨立審查尚未有 PASS | 逐個 scene 通過 P18–P22 與 G1，Owner 接受新敘事 |
| **Dev** | 未開始 | Rev13 新版 Slides HTML／Generator 尚未建立 | Ready 與分支／依賴策略明確 |
| **PR Review / QA** | 尚未對新版投影片執行 | 當前 #61 只做 docs 規劃；不是實作完成的 PR | 真正版面、產出、內容與證據逐 Gate 驗證 |
| **Human Gate / Done** | 未放行 | 既有 Rev12 [tag](https://github.com/world4jason/Agent-101-deck/releases/tag/rev12-demo-107) 保持不變 | Owner 決定 Merge／Release；任何 NOT RUN 都明記 |

**前置風險**：Post-demo PR #57 和 native PPTX PR #59 仍需獨立整合決策；不要把兩者的未驗收成果當作 Rev13 已有功能，也不能在這輪規劃 PR 偷改既有正式 Slides。

## 5. Refinement 的 Acceptance Criteria / Definition of Ready

- [x] **R1 One timeline**：只有一個持續前進的 Matching #3 故事；QA A/B-pre/B-post 的教學倒帶／重演都明示。
- [x] **R2 Three lenses, one journey**：Process、Git/GitHub、People 保留作母圖三軸，不再切割成三大互不相干段落。
- [x] **R3 Sequence & ownership**：上面逐 stage 有 Spotlight 角色、當前 Ticket 項目、GitHub 對應、before→after。
- [x] **R4 Four-beat semantics**：各階段有 Overview / Spotlight / Work / Updated Overview，可合併頁面，但不可漏掉狀態 delta。
- [x] **R5 Agent overlay**：第二輪只替換執行與協調層，三種配置與 Human Gate 相容，不造假 run。
- [x] **R6 Claims**：Rule-level PASS/FAIL/NOT RUN 與 UI/E2E/Release/Goal 的證據界線已寫在 Storyboard。
- [ ] **G1 independent review**：真正由未讀本文件的 reviewer 依順序看 scenes，逐一發現未教先用與敘事跳步；AI 自查不冒充獨立真人。
- [ ] **Owner narrative gate**：確認這一版工作流程優先的敘事與練習能進 Ready。
- [ ] **Implementation-ready assets**：下一輪完成視覺母圖（固定 SVG/HTML 原生元素方案）、精確 scene metadata、來源 asset / evidence mapping、HTML/PPTX 分工及測試。

**此輪最合理完成邊界**：修好 Ticket 與 storyboard，保留 #60 / Draft #61 作 review 入口；不因文字 AC 打勾而直接改 main 或宣稱新投影片完成。

## 6. 為什麼這樣做（研究引用）

- [GitHub Issues / Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects)：以 Issue 表達要做的事、PR 表達修改，細分工作與依賴；不把 brainstorm 的想法立即當 Ready。
- [Shneiderman, The Eyes Have It](https://doi.org/10.1109/VL.1996.545307)：Overview、Zoom、Filter、Details-on-demand、Relate、History、Extract 用來理解視覺語意；本課的「Updated Overview」是對版本和工作狀態演進的專案延伸。
