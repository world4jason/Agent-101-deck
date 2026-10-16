# Rev13 — Rev12 五項 Agent 協作原則保留契約

> **Current v5 Part 2**：[兩部分架構](rev13-two-part-learning-architecture-v5.md) 先讓純人類團隊走完同一張工作票，再於人類流程後加入 Agent（O02、C10）；**五項真正的工作原則仍在 Part 2 主線 A05–A11**，不得因 Agent 概念頁移動而刪除或轉附錄。

> **Must-keep learning content in Rev13 CORE, not an appendix.** 依據 [rev12-demo-107](https://github.com/world4jason/Agent-101-deck/releases/tag/rev12-demo-107) 的第 76–81 頁與 [原始逐頁 Storyboard](issue48-execution-storyboard.md)。追蹤 [Issue #60](https://github.com/world4jason/Agent-101-deck/issues/60)、[Draft PR #61](https://github.com/world4jason/Agent-101-deck/pull/61)，新版主線 [v4 Storyboard](rev13-workflow-first-content-refinement-v4.md) 的 **A05–A11**。
>
> **與 P1–P23 不同層次**：這裡的五項是「教學內容／Agent 工作守則」；P18–P23 是簡報如何設計與驗收的全域製作原則。不能用其中一套取代另一套。

> **Owner 決定（2026-10-15）**：人類流程完整走完後，另開 Agent 章，沿同一張工作票從交辦開始往前重走；測試站遇到重複按讚未測，引用修正版第一次測與修正版補測的真實紀錄。Agent 交辦與執行都是教學示意，沒有真實 Agent 執行紀錄。

## 唯一五項內容錨點（不可只留標題）

| Rev12 頁／source | 名稱（原樣保留） | 原版解的問題 | Rev13 主線 scene | Matching #3 具體可觀察的例子／產物 |
|---|---|---|---|---|
| **76／P42** | 五項協作原則總覽 | 五種風險與解法如何對應 | **A05** | 以同一張 #3 工作票對照五個原則所在工作站；Agent 協作本身是教學示意 |
| **77／P43** | **External Task State** | 工作進度不應只存在單一 Chat / Session | **A06** | 新 Agent 接手前讀取 Issue／Ticket：Goal、Scope、AC、工作狀態、修正版第一次測結果（單向／雙向 PASS、重複按讚未測）與下一步補測要求；接手情境為教學示意 |
| **78／P44** | **Bounded Execution** | 不應順手做未授權功能 | **A07** | 本張票僅 #3 配對規則、Out-of-scope 聊天室；越界停手，記錄變更請求並交回 Refinement，WIP 使用本課政策 |
| **79／P45** | **Role Separation** | 執行、審查、驗證與決策不能混成同一種責任 | **A08** | Dev 交修改、Reviewer 看變更、QA 對 AC／Evidence 核對、Owner 人類決策；Role ≠ 人數 ≠ Agent 數 |
| **80／P46** | **Independent Verification** | 執行者自述 PASS 不等於驗證 | **A09** | 修正版第一次測單向／雙向 PASS、重複按讚未測 → 要求補測；修正版補測以同一份程式證明重複按讚 PASS。核對輸入、預期、實際；介面與完整流程仍未測 |
| **81／P47** | **Goal Re-anchoring** | AC 局部通過仍可能偏離 Parent Goal | **A10** | 對回配對功能的產品目標與按讚／配對清單依賴；規則實作問題回 Dev，目標或優先序變更回 Backlog／Refinement；規則層 PASS 不等於產品目標 PASS |
| — | 五項原則執行結果與狀態回顧 | 是否真的被看懂、不是背誦 | **A11 + X01** | 更新同一 Overview，呈現外部狀態、界線、責任、證據、Goal 與下一步；練習先作答再揭露 |

**重要歸屬**：這五項是 Rev12 本課對多 Agent 協作風險的**綜合歸納**，不要宣稱某一篇來源文獻以完全相同的五項命名提出。內容與例子來自本教材，不可因此偽造已執行的多 Agent 實驗。

## 五項與四大軸／第五 Agent 的關係

- **人 People**：Bounded Execution 的授權、Role Separation 的職責、Independent Verification 的責任、Goal Re-anchoring 的放行，由人類決定相應邊界。
- **流程 Process**：External Task State 記錄目前在哪一站；超出範圍轉 Refinement；QA 退 Dev；Goal 漂移回 Backlog；Human Gate 欄外決策。
- **文件 Documents**：Goal／Parent Issue、Ticket/Scope/Out-of-scope、AC/AT/DoD、交接紀錄、Review Findings、原始 Evidence，是五原則的持久工作依據。
- **版本管理 Version Control**：Branch／Commit／PR 與各份證據相連；修正版第一次測與修正版補測沿用同一份程式，不代表另建程式版本。
- **Agent 第五層**：可以受委託執行或協調，但不能因有 Orchestrator 就跳過其中任何一項。

## 內容 Gate（會交由 Rev13 自動檢查與獨立 G1/G4 審查）

- [ ] **A05–A11 + X01 在核心場景中出現**；不允許只放在 appendix 或 notes。
- [ ] **五項名稱一字不缺且有可見的解釋／案例**；不能用一句話「做好協作原則」敷衍。
- [ ] **跨 Session 接續要從共同工作紀錄核對工作狀態**；不是命令 Agent 永遠不讀 Chat。
- [ ] **越界要有停止／請人決策的可見路徑**，不能把 out-of-scope 偷變 AC。
- [ ] **Role ≠ 人數 ≠ Agent 數**；不能因為增加 3 Agent 就宣稱 WIP = 3。
- [ ] **獨立驗證有來自 AC／原始證據的判準**，不是單純換個 Agent 就算獨立。
- [ ] **Goal Re-anchoring 必須指向 Parent Goal 與重新 Refinement／回 Backlog 的路徑**，不能只畫 QA 的 PASS。
- [ ] **同一張 #3 工作票上的真實測試時間線（第一版 FAIL → 修正版第一次測 → 修正版補測）及真實 vs 示意／未測的界線**，不能混淆。
- [ ] **每項仍服從 P18–P23 的母圖、Spotlight、工作產物、Updated Overview、Relate／History／Extract**。

**阻擋條件**：欠任一五項、欠具體案例、沒有狀態／Evidence／Goal 的映射 = **Content P1，不可認定 Rev13 Ready**。自動規格測試可以驗「有無／格式／引用」；內容是否正確、是否真正易懂，仍需 G1/G3/G4 與真人學員核對。

## Reviewer 的五題應用題（先答再揭露）

1. 修正版第一次測後交給新工作對話，除了聊天摘要，接手者應先核對哪三種共同紀錄？
2. Agent 發現聊天室很好做，但 #3 的 Out-of-scope 已排除它；應做什麼？
3. Dev Agent 交 PR 並自測通過，誰對 Review、QA、放行負什麼責任？
4. 修正版第一次測時重複按讚未測，若 Agent 說「都 PASS」，你接受嗎？要補測什麼，並如何對回版本？
5. #3 規則都通過但 Matching App 整體流程仍沒驗，你會在 Parent Goal／Product Check 上留下什麼判斷？

## 原始來源與 SSOT

- [Rev12 Storyboard 原第 76–81 頁](issue48-execution-storyboard.md)，Source P42–P47。
- [現行 Rev13 v4 分鏡表](rev13-workflow-first-content-refinement-v4.md)：A05–A11 必需。
- [Rev13 全域分鏡契約 P18–P23](rev13-visual-narrative-contract.md)：所有場景共用。
