# Agent 101｜三輪獨立審查與修復紀錄（2026-10-11）

工作分支 PR #57（codex/postdemo-luna-ac-20261010），起始版本 2546aca。這份報告依 README 十項教學 Guideline、Issue #55 G1–G5，追蹤真實 P0／P1 到獨立重新驗收。所有 Agent 都是唯讀審查，每一輪互不預讀其他審查報告。頁數目前 107；原 rev11 的 82 頁和 A01–A25 25 張均完整保留。

## Run 1 → Run 2 → Run 3

| 輪次 | 獨立唯讀報告 | 結果 |
|---|---|---|
| Run 1 初學者（P1–36） | [報告](run1-beginner.md) | 無 P0／P1；提出 P2 Outline 縮寫、Backlog/Ready、WIP、旁支術語 |
| Run 1 教學／QA（P37–72） | [報告](run1-qa.md) | 無 P0／P1；提出 P2 CI 時序、短 SHA、Version B 重複說法 |
| Run 1 Agent／驗收（P73–107） | [報告](run1-agent.md) | **四組 P1**：P74 model/effort、P76 五原則銜接、P89–90 局部 PASS、P93/106 Human Gate；不能接受第一段摘要的有條件 PASS，必須按報告的 P1 修 |
| Run 2 前段複查 | [報告](run2-beginner.md) | 上述 WIP、CI、短 hash 修改有效；**P2 Dev/Review/QA 在入門地圖過早出現，仍判 P1**。P14/P25 缺原尺寸畫面，不能計入已驗收 |
| Run 2 Agent 再審 | [報告](run2-agent.md) | P74／76／89–90／93／97／106 指定內容 **無 P0/P1**，局部 PASS；真人作答與投影仍 NOT RUN |
| Run 3 初學者重驗 | [報告](run3-beginner.md) | P2 縮寫修正，P14/P25 最新原尺寸畫面已補、P15/27–29、P40/47/59 重新看；**P0：0、P1：0**，此靜態文字／截圖審查範圍 PASS |

## 已落實的修正

- **P2**：先用中文動作說課程路線，Dev、Review、QA、Git 工具縮寫留到章節內講。
- **P15、P27–29**：先整理 #3 的 AC/AT，進 Ready 後才開工；User Story 歷史移入 Notes。P28 從密集 WIP 表格改為 0/1、1/1、2/2 三個具體情境；P29 標題明確比較上限 1 與 2。
- **P40／47／59**：自測、CI、審查可依團隊交錯；短 hash 僅作辨識，要回 Evidence 查完整 SHA；Version B 補驗前的重複字樣與時間解釋修正。
- **P74**：model 是選 AI 模型、effort 是可用推理強度；「同一設定」是比較假設，選擇依時間、成本和實測結果，不按難度套固定規則。
- **P76 → P77–81**：摘要每項做法標明後續對應頁：票面狀態、停點、職責、證據、共同 Goal。
- **P89／90**：仍先讓學員作答再揭露。補驗結果只標「重複 Like 規則層 PASS」；「UI／整合：NOT RUN」並列，沒有冒充整個 App 完成。
- **P93／106**：Human Gate 明寫為 Product Check／Done 間的欄外決策，並非第八個 Kanban 欄；人核准後還需 Release／上線檢查及 DoD 才可能 Done。
- **P97**：GWT 明示 Given–When–Then 代表前提／操作／預期。

原始 Matching App #1→#3→#2、Version A/B 的 hash、Evidence／JSON、PASS／FAIL／NOT RUN 範圍與八張 Exit Check 保留。

## 全 107 頁最新 Chrome 畫面

從最後重建的正式 HTML 按播放順序輸出九張縮圖，供下一位審查者追查每張頁面、相鄰資訊增益與密度；縮圖不能代替原尺寸投影驗收。

| 頁面 | 圖 | 頁面 | 圖 | 頁面 | 圖 |
|---|---|---|---|---|---|
| P1–12 | [圖](full-deck-1.jpg) | P13–24 | [圖](full-deck-2.jpg) | P25–36 | [圖](full-deck-3.jpg) |
| P37–48 | [圖](full-deck-4.jpg) | P49–60 | [圖](full-deck-5.jpg) | P61–72 | [圖](full-deck-6.jpg) |
| P73–84 | [圖](full-deck-7.jpg) | P85–96 | [圖](full-deck-8.jpg) | P97–107 | [圖](full-deck-9.jpg) |

P14/P25/P59 和 P2 均提供原尺寸截圖供 Run 3 使用。另一組 P64–P88 的 Before／After 在 [先前 G4 報告](../issue57-fullvisual-20261011/README.md)。

## 可重跑的 G1–G5 自動化證據

- 新增 tests/audit_loop_acceptance_test.py，11 項頁面／證據／Human Gate 契約；既有教材 19 項、敘事 7 項、視覺 6 項、Agent 圖解 7 項和 Storyboard SSOT 驗證均持續。
- Chrome check:rev12 檢查全 107 頁、0 JS errors、0 geometry overflow，八章 Exit Check 必須先作答再展開。播放器回歸六項、Matching 規則單元三項。
- 最新 PPTX 必須在最後 HTML 修正後重新匯出，執行 check:exports 確認 v7 44、v10 55、最新版 107 頁的各張圖片與備忘稿；check:versions 驗證三版本下載導覽。
- 不能把上列工程 PASS 當成投影片可讀、真人理解或 Owner 允許發布的證據。

## 尚餘 P2 與未執行範圍

Run 3 建議 P59 補驗時間說法可再精簡；P2 的「版本協作、放行」可能仍需要授課時白話解釋。這些是目前 **P2**，保留供真人試教確認；P14、P25 的原尺寸審查沒有發現判退問題。

**NOT RUN**：非工程背景真人學員的現場作答、教室後排實體投影、Matching App 真實 UI／整合／部署。第三輪結果是模型文字／圖片審查 P0/P1 收斂；Owner Human Gate 保留。PR #57 仍是 Draft，不自行 Merge main。

研究基準：[Mayer／Fiorella 多媒體學習](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-managing-essential-processing-in-multimedia-learning/A9E77D0172F905AC957689D1771E2888)、[CMU 課程順序](https://www.cmu.edu/teaching/designteach/design/contentschedule.html)、[Waterloo 投影片可讀性](https://uwaterloo.ca/centre-for-teaching-excellence/catalogs/tip-sheets/designing-visual-aids)。
