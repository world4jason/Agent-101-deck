# Rev13 Content Refinement v4 — 四大要素 → Agent 五大要素；保留五項 Agent 協作原則

> **狀態：Refinement / G1 Ready Review 待驗。這是新版內容與分鏡，不是完成的投影片或可合併實作。**
>
> **Parent GitHub issue：[AgentDeck #60](https://github.com/world4jason/Agent-101-deck/issues/60)**　｜　**Planning PR：[Draft #61](https://github.com/world4jason/Agent-101-deck/pull/61)**  
> **本版必須通過 [Rev13 Scene Manifest](rev13-scene-manifest.json) 的 [自動契約檢查](../tests/rev13_contract_check.py) 與 [G1–G5 Gate](rev13-gates.md)，且 [Rev12 五項 Agent 原則](rev13-agent-five-principles-preservation.md) 不能挪到附錄。當前是規劃與 Refinement，不宣稱實際投影片已完成。**
> 依據：[P1–P23 與全域分鏡契約](rev13-visual-narrative-contract.md)；舊 [Storyboard v1](rev13-reorg-storyboard-v1.md) 和 [107 頁遷移矩陣 v1](rev13-migration-matrix-v1.md) 是來源／歷史候選，不可直接當新版頁序執行。

## 0. Owner 決議：先建立四大要素，再加入 Agent，第 3 張才進案例

**最新版（v4）延伸 v3 的「三要素開場」**。開場按順序讓學員清楚看見：

1. **傳統軟體開發的四個教學要素**（不是產業唯一或完整分類）：
   - **人 People**：誰決策、誰執行、誰 co-work、誰驗收？（Owner / PM / PO / Dev / Reviewer / QA）
   - **流程 Process**：現在在哪個活動或狀態、如何交接與退回？（Brainstorming → Refinement → Ready → Dev → Review → QA → Human Gate → Done）
   - **文件 Documents / Artifacts**：目前是依照哪份共識、工作契約與證據工作？（Goal/Proposal、Epic/Story/Task Ticket、Scope、AC/AT、DoD、設計決議、Review 意見、測試結果）
   - **版本管理 Version Control**：正在基於哪個版本修改，如何追蹤差異、回溯與整合？（Git commit/branch/merge；GitHub 管協作）。
2. **Agent 時代是相同四個基礎 + Agent 的五要素**：同一畫面只新增 Agent（在授權範圍內執行／協調），不把原本四項替掉；人仍需負責 Goal、權責與最終 Gate。
3. **接著才展示 Matching App，正式開始 Workflow-first 的同一條故事**。每個工作階段把四項同時保留於母圖，再聚焦相關的人、當前流程、正在產出／使用的文件、對應 Git 版本／GitHub 工作物件。Agent 章是在同一母圖上額外疊入第 5 項，不另造一套流程。

**Documents ≠ Version Control**：文件／紀錄說明「要做什麼、為什麼、驗收憑據」；版本管理說明「是哪個版本、誰變更、如何整合／回復」。文件也可以用 Git 版控，GitHub Issues/Projects 可以承載工作記錄，PR 同時是版本變更送審與其說明／審查記錄的交會點。**不能把 Documents 簡化成 GitHub 或 Ticket，也不能把 GitHub 混同 Git**。

**v1（歷史）**：Process、Git、People 三個獨立長章 → 合流 → Agent。  
**v2（歷史）**：先看三要素，再隨 Workflow 逐站教工具與角色。  
**v3（歷史）**：**第一張四要素；第二張原畫面增加 Agent 變五要素；第三張同一母圖進案例**。之後沿 Workflow 往前；四要素作為四條橫貫所有階段的視覺線索，逐步展開當下必要細節。

**v4（現行）**：保留 v3 的四要素→Agent 第五要素與 workflow-first，**在 Agent 三模式之後完整保留 Rev12 的五項協作原則**（不是附錄也不是只留五個名詞）。新增 A05–A11：先把五項風險／原則放在同一張母圖，再用 #3 B-pre 的缺口逐項示範 External Task State、Bounded Execution、Role Separation、Independent Verification、Goal Re-anchoring，最後更新母圖與應用練習。原始頁 76–81 / source P42–P47 的對應和核對條件詳見 [五項原則保留契約](rev13-agent-five-principles-preservation.md)。

**三個不同的事實層仍須分清**：投影片內的 Matching #3 教學案例／實跑規則 fixture、真正 AgentDeck repo 的 Issue #60 與 Draft PR #61、一般 Git/GitHub 操作示意；不得互相冒充真實完成狀態。

**設計依據**：[SWEBOK Software Process](https://swebokwiki.org/Chapter_8%3A_Software_Engineering_Process)／[Documentation](https://swebokwiki.org/Chapter_11%3A_Software_Engineering_Professional_Practice)／[Configuration Management](https://swebokwiki.org/Chapter_6%3A_Software_Configuration_Management)；[GitHub Issues](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues)；[Anthropic Agent/Workflow](https://www.anthropic.com/engineering/building-effective-agents)。四＋一是本課教學心智模型，非宣稱 SWEBOK 提出同一分類。

## 1. 觀眾始終看見的母圖（只建立一次，後續相同座標）

```text
                    PEOPLE          PROCESS             DOCUMENTS                 VERSION CONTROL
傳統軟體開發        Owner / PO       Brainstorming         Goal / decision           尚未有開發分支
                    PM / Dev         Refinement            Parent / Child Tickets    可連到 Issue / Project
                    Reviewer / QA    Ready → Dev           Scope / AC / DoD          Git branch / commit
                                      Review → QA           PR review / evidence      PR / compare
                                      Human Gate → Done     Release / decision log    Merge / release

加入 Agent 後      上述全保留       上述流程不變          上述文件不變              上述版本管理不變
                    + Agent（受委派的執行／協調者，在授權與 Human Gate 邊界內工作）
```

**母圖的橫向四個座標永久保留：People／Process／Documents／Version Control。** 每站以半透明遮罩聚焦當前 co-workers、活動、正在更新的文件與相關版本；Agent 是**第五個可見層**，初始傳統段不偷放 AI 完成的工作。

**GitHub 是工作平台，橫跨 Document 與 Version Control**：Issues／Projects 記工作與狀態；Repo 內 Markdown/設計／測試材料可走 Git 版本；Branches／Commits／PRs／Merge 記版本與審查。避免畫成 GitHub = 版本管理的全部、或 GitHub Issue = 程式碼版本。



- **全貌頁**先展示所有角色與完整大方向，非焦點淡化；當前活動、Kanban 位置、共同職能、當前 Ticket／正在操作哪個欄位、GitHub 物件與**前後狀態變化**是最少五個座標。
- **每一階段語義循環**：Overview → Spotlight（遮罩聚焦人與流程）→ Work / Artifact（此刻正在做什麼）→ Updated Overview（前→後、成果進到哪、下一站）；可以合併或拆開，**不是每個階段硬塞 4 頁**。
- **前一站的 Updated Overview 可以同時是下一站的 Overview**：這是同一張母圖的連續狀態，不必在兩站中間複製一張毫無變化的全貌圖；但下一站 Spotlight 仍要有可見的人員／Ticket 焦點。若翻頁或跳章，locator 須能重新定位。
- **活動 ≠ Kanban 狀態**：Brainstorming 先形成 Goal；Refinement 在 Backlog 上完成票；Human Gate 是 Product Check 後**欄外**決策；真正的 Merge / Release / DoD 條件需完成才 Done。
- **角色 ≠ 人數**，Agent 是執行／協調的另一層而不重畫 Workflow。
- **本課 Matching #3（教學工作票）**不應在教材中顯示為 AgentDeck 這個 Repo 的真實 GitHub `#3` 連結。示意 GitHub 內容應清楚標「教學示意」；真實 evidence 連至現有 fixture / replay。

## 2. 全程只有一個案例、一條逐步更新的故事

**Goal：**讓使用者能正確表達喜好、雙向喜歡才形成配對。這次拆成三項：#1 Like/Pass、#3 雙向配對規則、#2 配對列表；主線實際追 #3 的規則層，不偷加聊天室或真實 UI 驗證。

**故事的唯一前進時間線：**

Problem（模糊需求） → Outcome Goal（記成 Goal Issue） → Refinement（拆 #1/#3/#2；#3 有 Scope、Out-of-scope、AC、Expected Evidence、DoD） → Ready（#3 可開工） → Dev（候選 A） → PR Review（展示範圍風險之教學示意） → QA（A 單向 FAIL） → 退回 Dev → 候選 B-pre（單／雙向 PASS、重複 NOT RUN） → 補驗同一 B 後 B-post（重複 PASS） → Product Check / Human Gate（依剩餘未驗項與風險決定下一步） → **未實跑的 Merge／Release／Done 僅能作條件示意，不能當事實**。

### Evidence / Story 健全性

- **實證範圍**：Version A 的單向 Like 預期 0、實際 1 = FAIL；Version B-pre 單向與雙向 PASS、duplicate NOT RUN；同一個 B 候選在 B-post 補測 duplicate PASS。
- **不可宣稱**：其他未跑的情境、真實 Matching UI、端到端整合、正式發布、整體 Goal 成效 PASS。不能把 Reviewer 的想像 PR 結果當真 PR。
- 在 Agent 章介紹三種配置時回到同一個 **已知、凍結的故事 snapshot**；比較的是責任與交接，不暗示重新執行過三種 Agent 架構。

## 3. 建議投影片分鏡序列（此為 42 個 Scene，不是最後固定張數）

| Scene | 畫面／標題應回答的問題 | Spotlight：人與流程 | **文件／當前工作契約** | 版本管理／GitHub／前後狀態 | 資料性質 |
|---|---|---|---|---|---|
| O01 | **傳統軟體開發的四大要素是什麼？** | **Overview：人／流程／文件／版本管理**；完整流程與主要角色同時可見 | Goal／Ticket／AC／設計決議／測試證據的文件示意 | 四要素首次建立，沒有任何已完成 Git/PR 的虛構狀態 | 教學模型 |
| O02 | **加入 Agent 後，哪四項不變？** | **與 O01 同位置**、保留四要素，只新增 **Agent 第五項** | 原文件與工作契約不變；Agent 可以受委派讀寫 | Before：四要素 → After：四要素 + Agent；沒有替代 Human Gate | 教學模型／Before-After |
| O03 | **我們這次要做什麼配對體驗？** | Goal 區域；Owner／PM／PO | 模糊「配對功能正常」的需求草案，尚待決定 | 進入 Brainstorming，沒有假裝 Goal Issue 已建立 | 案例示意 |
| B01 | 現在進入 Brainstorming：誰決定方向？ | Brainstorming；Owner／PM／PO | 問題清單、選項和不確定性 | 先討論成功體驗與待確認假設 | 示意 |
| B02 | 今天要解決什麼使用者問題？ | 原 Spotlight，放大需求決議 | Outcome Goal、成功訊號及決議 | 需求／候選方案 → Outcome Goal＋觀察指標 | 示意 |
| B03 | 這個決議會存到哪裡？ | Spotlight 連到 GitHub Issues | Goal／Proposal Issue（教學示意） | 建立 **Goal/Proposal Issue（教學示意）**，不能跳叫 Ready | 示意 |
| B04 | 看全圖：上一站留下什麼？ | 更新母圖，仍可見全員 | Goal Issue 已建立，待 Refinement | **無正式票 → Goal Issue 已建立；待 Refinement** | 示意／History |
| R01 | 下一步為何不是立刻寫程式？ | Refinement；Owner／PM／PO／Dev／QA，必要時 UI/UX | Goal Issue 的 feasibility / scope / risks 欄位 | 從同一 Goal Issue 開始 feasibility / scope / risks | 示意 |
| R02 | 一個 Goal 可以怎麼拆成能交付的工作？ | 相同人員，Ticket 分解區域 | Parent Goal 與 #1/#3/#2 子票草案、相依 | Goal → #1 Like/Pass、#3 規則、#2 列表；標示依賴及順序 | 示意 |
| R03 | #3 要怎麼寫才不會每個人猜不同？ | PO／Dev／QA；Ticket #3 的 AC | Ticket #3 的 Scope／Out-of-scope／AC／AT／DoD／Evidence | 壞票 → Scope / Out-of-scope / AC / Expected Evidence / AT / DoD | 示意 |
| R04 | GitHub 如何記住拆票結果？ | Issues／Project，其他淡化 | 已更新的 Parent/Child Issues | 更新 Parent，連結 child Issues、依賴及狀態；不是另建不相關 Goal | 示意 |
| R05 | 全圖更新後是否就已經 Ready？ | 更新母圖 | 三張子票與待補的 Ready 條件 | **Goal Issue → 3 張子票 + #3 待 Ready Check；仍 Backlog** | 示意 |
| RD01 | Ready 究竟代表什麼？ | Ready；PO／Dev／QA | #3 的 Scope／AC／依賴／可測性檢核 | #3 的 scope、依賴、AC / testability 確認 | 示意 |
| RD02 | Ready 是「可以開工」，不是「已通過測試」 | 更新母圖 | 確認可接手的 #3 工作契約 | #3 Backlog → Ready，WIP 仍 0/1；Project Status 更新 | 示意 |
| D01 | 實作時先碰到哪個版本管理問題？ | Dev；Dev | Ticket #3 的工作紀錄及已知限制 | #3 從 Ready → Dev，WIP 1/1，還不能宣稱有 PASS | 示意 |
| D02 | 為何需要 Git commit、branch？ | Dev＋Git lane | Ticket／規格與版本註記的連結 | 第一次**Just-in-time** 教 Git ≠ GitHub：branch、commit、push，連回 Ticket | 概念＋示意 |
| D03 | Dev 要留下什麼供別人接手？ | Dev；Ticket #3＋Git | 候選 A 的修改摘要、自測結果、未完成項 | 候選 A／修改內容／自測／已知缺口，PR 不等於 Issue | 示意（測試於 QA 引出） |
| D04 | 全圖：現在哪張票、哪個版本？ | 更新母圖 | 候選版本與交付摘要 | Ready → Dev；候選 A、Branch/Commit 教學示意可追 | 示意 |
| RV01 | PR Review 跟 Ticket Review 有何不同？ | Review；Dev／Reviewer | PR 描述／修改摘要／風險／測試摘要 | GitHub PR 關聯 Issue，審查改動與越界，不取代 AC 實測 | 示意 |
| RV02 | 如果 Reviewer 發現越界呢？ | Review → Dev 回退 | Review findings／退回理由／修正要求 | 例如新增聊天室屬 out-of-scope；退 Dev 修正再審 | **明示模擬** |
| RV03 | 全圖：PR 現在是什麼狀態？ | 更新母圖 | PR Review 意見與未處理事項 | Review request / changes requested / needs QA（非 merge）；顯示分支尚未合併 | 示意 |
| Q01 | QA 不看原作者說 PASS 就算數 | QA；QA／Dev | AC／測試案例／預期與實際的證據格式 | 測同一候選與 AC；引出預期／實際／NOT RUN | 概念 |
| Q02 | 第一個錯在哪裡？ | QA：Ticket #3，AC 單向 | Version A 單向 LIKE 的 FAIL 測試紀錄 | **Version A：預期 0，實際 1，FAIL**；QA → Dev | **規則層實測** |
| Q03 | 修正後 B-pre 真正證明了什麼？ | Dev → QA；同一張票 | Version B-pre 的 PASS 與 duplicate NOT RUN 紀錄 | **B-pre 單向／雙向 PASS；duplicate NOT RUN**；不能宣稱完成 | **規則層實測** |
| Q04 | NOT RUN 要怎麼退回補驗？ | QA／Dev；duplicate AC | Version B-post 的補驗結果與測試紀錄 | 先讓學員提補驗要求；**B-post 同一 B 候選 duplicate PASS** | **規則層實測** |
| Q05 | 全圖：這一步留下的證據與未測項？ | 更新母圖，保留 History | A → B-pre → B-post 證據歷史、仍未測清單 | A FAIL → B-pre partial → B-post duplicate PASS；UI/E2E 仍 NOT RUN | 實測／NOT RUN |
| PC01 | Ticket 做對，是否等於整個 Goal 達成？ | Product Check；PO／Owner／Dev | #3 Ticket 與整體 Goal 的符合度紀錄 | 核對 #3 的 Scope/AC、#1/#2 及整體 UI/E2E 缺口 | 示意＋實測界線 |
| PC02 | 全圖：可以接受哪部分？ | 更新母圖 | 可接受範圍／仍待驗證工作清單 | Ticket 規則層證據可審、Goal 全路徑尚待驗，列待決事項 | 條件性判斷 |
| HG01 | 誰可以決定放行／暫停？ | Human Gate（欄外）；Owner / authorized human | Go／No-go 決策清單、剩餘風險、Release Checklist | 展示 evidence、風險、尚未跑的 QA、release checklist | 示意 |
| HG02 | 全圖：要不要進 Done？ | 更新母圖 | Human Gate 記錄／未實行的 Release 項目 | 現有事實不能宣稱 Release/Done；若要示意成功路徑，必須清楚標 **假設 Gate 放行且後續 DoD 成立** | 實測界線／條件推演 |
| A01 | Agent 作為第五要素加入，原流程會改變嗎？ | Agent 全貌疊層（流程、人、Git 不動） | 沿用同一張 #3 Ticket／AC／Evidence | 回到明示的 Matching #3 snapshot；只替換 executor／coordinator | 模式比較 |
| A02 | 模式一：一人＋一個 Agent 如何完成一輪？ | Human／Single Agent | 單 Agent 交付報告／驗證紀錄 | 同票、同 AC、同 evidence 和 Human Gate；有既有單 Agent demo | 部分實測＋敘事回放 |
| A03 | 模式二：開多 Chat 後，誰搬 Ticket／版本？ | Human 協調 Dev／Reviewer／QA Chats | 跨 Chat 的 Ticket handoff 與證據摘要 | 人決定每站交接與證據來源 | **架構示意，非真實 multi-agent run** |
| A04 | 模式三：Orchestrator 能取代人類放行嗎？ | Orchestrator＋Sub-agents／Human Gate | Orchestrator／Sub-agent 工作分派及彙整記錄 | 主 Agent 在授權內分工、彙整；Human Gate 不變 | **架構示意，非真實 multi-agent run** |
| A05 | **多 Agent 協作遇到哪五種風險？** | Agent 母圖／Human、Orchestrator、Dev、Reviewer、QA 的責任邊界 | 同一張教學 #3 Ticket、原 AC、B-pre duplicate NOT RUN；五張問題→原則卡片 | 版本仍是 B-pre，未測事項仍未測；預告逐一處理，不能把五個原則當成已通過的實測 | 本課五原則歸納；Rev12 第 76 頁 P42 |
| A06 | **External Task State：換 Session 怎樣知道做到哪？** | Human＋接手 Agent；Handoff 不是新增看板欄位 | 共享 Issue/Ticket 的 Scope、AC、Owner、WIP、B-pre 與 duplicate NOT RUN、下一步補驗要求 | 共用工作紀錄連到版本與 Evidence，新 Session 先核對；示意，非已執行的跨 Agent QA | Rev12 第 77 頁 P43；交接示意 |
| A07 | **Bounded Execution：能順便新增聊天室嗎？** | PO／Owner＋Dev Agent；核准範圍與 Stop Rule | Ticket #3 的 Scope、Out-of-scope（聊天室）、AC、Stop Rule／WIP=1 | 超出核准範圍就停下，在 Issue 記變更請求並退回人類 Refinement；不自行加功能 | Rev12 第 78 頁 P44；風險示意 |
| A08 | **Role Separation：做完的人可以直接自己放行嗎？** | PO／Dev／Reviewer／QA／Owner；角色不等於 Agent 數量 | Ticket/PR 實作摘要、Reviewer 意見、QA 接受判準與 Owner 放行責任 | PR／Review／Test Evidence 分開記；Human Gate 保留真人授權，不能只靠 Dev 自評 | Rev12 第 79 頁 P45；責任示意 |
| A09 | **Independent Verification：B-pre 兩個 PASS 代表全部完成？** | QA（人或受委派 Agent）＋Owner；聚焦 AC 與證據 | #3 原 AC、B-pre 單向／雙向 PASS、duplicate NOT RUN；B-post 同一 B 補驗 duplicate PASS | Evidence 對上版本、輸入、預期、實際；獨立核對，不能把未知改寫 PASS | Rev12 第 80 頁 P46；僅規則層有實測 |
| A10 | **Goal Re-anchoring：AC 都綠燈但方向仍正確嗎？** | PO／Owner＋Dev／QA；Product Check／Goal decision | #3 子票對 Parent Goal、#1/#2 的整體依賴、風險與未驗證 UI/E2E | 目標問題退 Backlog／Refinement；實作問題退 Dev；Parent Goal 決定優先級，不能宣稱 Goal 完成 | Rev12 第 81 頁 P47；產品判斷示意 |
| A11 | **五項原則如何回到同一張母圖？** | Updated Overview：People／Process／Documents／Version Control + Agent | 五項分別對到 Issue、Scope/Stop Rule、Roles、QA Evidence、Parent Goal | 回看 B-pre → B-post 的真實證據界線；未跑 Multi-agent／Release 持續標『示意／NOT RUN』 | 五原則總回顧／History／Extract |
| X01 | 練習：交給 Agent 的第一張票，什麼時候才算完成？ | 全貌＋學員作答 | 學員自己寫的 Ticket／AC／補驗請求 | 寫 Ticket、選協作模式、決定是否補驗；**先答再揭露** | 練習 |

**Scene sequence 完整覆蓋原本七欄、欄外活動與人員角色**；每站最後的 Overview 顯示狀態 delta。上表是內容 Refinement 候選，精準頁數、Notes、圖形動畫與每個 AC 對應的 evidence URL 待下一輪分鏡 Review／實作決定。

## 4. 這次「我們真的怎麼開發 Rev13」也用同一套看板語言

> 不把投影片故事中的 Matching #3 假想 GitHub 操作寫成本 repo 真的做過。下表只記 AgentDeck Repo 的真實工作。

| 本 repo 工作階段 | 狀態 | GitHub／可查產物 | 前進條件 |
|---|---|---|---|
| **Brainstorming / Goal** | 已形成方向 | Issue [#60](https://github.com/world4jason/Agent-101-deck/issues/60)：四要素→Agent，P1–P22 principles | 已有可檢查 Goal |
| **Refinement / Planning** | **現在進行中** | Draft PR [#61](https://github.com/world4jason/Agent-101-deck/pull/61)：規範、歷史 107 頁矩陣、**本 v3「四要素 + Agent」工作流優先分鏡** | 將內容拆成可操作 Scenes、補 AC 與 G1 review |
| **Ready** | **未通過** | Storyboard 的 G1 先備／時間線獨立審查尚未有 PASS | 逐個 scene 通過 P18–P23 與 G1，Owner 接受新敘事 |
| **Dev** | 未開始 | Rev13 新版 Slides HTML／Generator 尚未建立 | Ready 與分支／依賴策略明確 |
| **PR Review / QA** | 尚未對新版投影片執行 | 當前 #61 只做 docs 規劃；不是實作完成的 PR | 真正版面、產出、內容與證據逐 Gate 驗證 |
| **Human Gate / Done** | 未放行 | 既有 Rev12 [tag](https://github.com/world4jason/Agent-101-deck/releases/tag/rev12-demo-107) 保持不變 | Owner 決定 Merge／Release；任何 NOT RUN 都明記 |

**前置風險**：Post-demo PR #57 和 native PPTX PR #59 仍需獨立整合決策；不要把兩者的未驗收成果當作 Rev13 已有功能，也不能在這輪規劃 PR 偷改既有正式 Slides。

## 5. Refinement 的 Acceptance Criteria / Definition of Ready

- [x] **R0 Opening P23**：第一個場景 People／Process／Documents／Version Control 四要素，第二個場景同圖添加 Agent 第五項；文件與版控界線明確。
- [x] **R1 One timeline**：只有一個持續前進的 Matching #3 故事；QA A/B-pre/B-post 的教學倒帶／重演都明示。
- [x] **R2 Four foundations, one journey**：People、Process、Documents、Version Control 保留為母圖四大要素，文件與版本管理不得混為一談，Agent 作為第五要素再出場；不拆成四個互不相干的長章。
- [x] **R3 Sequence & ownership**：上面逐 stage 有 Spotlight 角色、Document/AC 產物、當前 Ticket 項目、Version/GitHub 對應、before→after。
- [x] **R4 Four-beat semantics**：各階段有 Overview / Spotlight / Work / Updated Overview，可合併頁面，但不可漏掉狀態 delta。
- [x] **R5 Agent overlay**：第五個要素只增加執行與協調層，三種配置與 Human Gate 相容，不造假 run。
- [x] **R5b Rev12 Agent five preserved**：A05 五原則全貌＋A06–A10 五個獨立情境＋A11 回到母圖；每項可對回 Rev12 第 76–81 頁與 P42–P47、風險、文件、GitHub／版本與人的 Gate；五原則保留在核心課程。
- [x] **R6 Claims**：Rule-level PASS/FAIL/NOT RUN 與 UI/E2E/Release/Goal 的證據界線已寫在 Storyboard。
- [ ] **G1 independent review**：真正由未讀本文件的 reviewer 依順序看 scenes，逐一發現未教先用與敘事跳步；AI 自查不冒充獨立真人。
- [ ] **Owner narrative gate**：確認這一版工作流程優先的敘事與練習能進 Ready。
- [ ] **Implementation-ready assets**：下一輪完成視覺母圖（固定 SVG/HTML 原生元素方案）、精確 scene metadata、來源 asset / evidence mapping、HTML/PPTX 分工及測試。

**此輪最合理完成邊界**：修好 Ticket 與 storyboard，保留 #60 / Draft #61 作 review 入口；不因文字 AC 打勾而直接改 main 或宣稱新投影片完成。

## 6. 為什麼這樣做（研究引用）

- [GitHub Issues / Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/best-practices-for-projects)：以 Issue 表達要做的事、PR 表達修改，細分工作與依賴；不把 brainstorm 的想法立即當 Ready。
- [Shneiderman, The Eyes Have It](https://doi.org/10.1109/VL.1996.545307)：Overview、Zoom、Filter、Details-on-demand、Relate、History、Extract 用來理解視覺語意；本課的「Updated Overview」是對版本和工作狀態演進的專案延伸。
