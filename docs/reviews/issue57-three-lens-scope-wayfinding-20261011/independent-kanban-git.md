# 獨立 Reviewer 報告：Kanban＋Git 教學流程定位

## 現況：頁頂是章節導覽，不是工作流程地圖

最新 HEAD 是 `e1669737b9cbbbaebcb1478afa241a9e02b68fac`。`slides/index.html` 頁頂的導覽列列出八個章節名稱與跳轉頁：人類合作、想法到 Ready、版本協作、實作與驗收、放行與完成、Agent 演進、Agent 交付、附錄。右側另有目前頁碼計數。`drafts/rev12.js` 會依目前頁更新章節高亮、頁碼及整份投影片的閱讀進度條；它沒有顯示 #3 當前在哪個 Kanban 欄，也沒有 Git 當前走到哪一步。見 [slides/index.html](/private/tmp/agent101-postdemo-integrated-20261010/slides/index.html:1)、[drafts/rev12.js](/private/tmp/agent101-postdemo-integrated-20261010/drafts/rev12.js:1)。

P2 有八章 Whole Picture，章封面也有返回全課地圖的連結；這是課程大綱定位，不是逐頁更新的工作流程地圖。**沒有永久、隨頁切換而呈現 #3 Ticket 狀態與 Git 階段的 map。**現有定位多為單頁圖或局部提示：

- **Kanban／Ticket 局部定位：**P15 有待辦清單；P24 有 Backlog → Ready；P26 展示 Backlog 到 Done 的流程；P39 標示 #3 Ready → Dev、WIP 1/1；P106 回顧七欄看板與 Human Gate。這些頁各自有局部定位，但不能在後續頁持續回答「現在在哪一欄、Gate 過了沒有」。
- **Git 局部定位：**P33–37 依序講 GitHub、commit／push、branch、PR／review、merge／release 概念；P47 核對補驗前後為同一 Version B。教材沒有全程持續更新的 Git 進度指示。P37 明示「概念預演」，P45 才是有實測紀錄的頁面。

教材本身有足夠的狀態證據：manifest 指出 107 頁、P96 起附錄、規則層 demo 有證據，但 UI／產品整合為 `NOT RUN`。因此問題不是缺少一張總覽，而是**總覽沒有成為每頁可讀的目前位置與證據狀態**。頁面盤點以本次 `drafts/rev12-review/manifest.json` 的 107 頁 inventory 為準。

## 會讓人失去位置的斷點

以下是依頁面畫面與 DOM 所作的 AI 審查，不是真人試教結果。

| 頁碼斷點 | 學員可能誤判 |
|---|---|
| **P9–12 → P13** | 前頁建立 Ticket、依賴及 Ready 條件，P13 轉入 #3 規則測試，但沒有把「票仍在哪欄」帶過來。可能把「現在能測規則」誤當 Ticket 已進 Dev，或把規則層 PASS 當產品已驗收。P13 有限定 PASS 只證明規則層，但沒有 Board 狀態。 |
| **P13 → P14–15** | 從測試輸入直接跳到共同目標／子票與 Backlog 清單。P15 說三張票都在 Backlog，卻沒有標出前頁的測試是概念、演示還是一次已執行流程；容易以為前面已推動 Ticket 狀態。 |
| **P15 → P16–23** | Backlog 票目轉為規則、例子與 AC 教學。學生可能把「定義可驗收條件」誤認為票已 Ready。 |
| **P23 → P24–30** | P24 才明確由 #3 Backlog 指向 Ready；後續 P25–29 解釋角色、工作狀態與 WIP。若無持續標籤，可能以為討論 QA、WIP 或示例卡本身就代表狀態已改變。 |
| **P30 → P31–32** | 從 Ready 教學直接切到版本協作與多人交 `final` 的問題。P31–32 沒有持續說明這是轉入 Git 概念，還是 #3 已開始；可能把開 branch／找共同版本誤認為 Ticket 已進 Dev。 |
| **P32 → P33–38** | P33–37 講 Git；只有 P37 頁面註明概念預演。缺少每頁的演示／概念標籤，commit、push、PR、merge 容易被當成已實際發生。P38 又提出假想 PR commit，可能讓學員把示例 PR 誤認為本次 Ticket 的真實 PR。 |
| **P38 → P39–41** | P39 清楚標示 #3 Ready → Dev、WIP 1/1，是重要狀態錨點；P40–41 展開自測、PR／CI、Review。但錨點未延續，學員可能不知道後兩頁仍在 Dev/Review 範圍，且頁面明示 CI 是流程示意，不是真實搭建。 |
| **P41 → P42–49** | 黑箱驗收設計、四種 Like 組合、QA 退回、實測表、B-pre/B-post 都混在同一段。P44–45 有實際規則層執行證據；P42–43 是設計／預期，P46–47 是同一 B 版補驗前後。若不標證據類型，會把預期表當測試紀錄，或把 B-post 當新程式版本。也可能把 QA PASS 當 Product Check／Human Gate 已通過。 |
| **P49 → P50–54** | 從章節 Exit Check 轉到「能否發布」、風險、Done／Goal。P50–52 是放行概念及教學條件，P53 明示教學假設；若缺少狀態定位，可能以為 #3 已進 Product Check、已 Gate 或可 Release。 |
| **P54 → P55–64** | 由放行章切到 Agent 演進。P58–60 的交辦、B-pre 證據與材料狀態屬示範／實測脈絡；P63 明示尚未同意 Merge／發布，P64 講人要求補驗。若不持續顯示 Ticket 與 Git 狀態，容易把新 session、摘要或 Agent 交接當成 Kanban 狀態變更或 Git 新提交。 |
| **P64 → P65–76** | 從單 Agent 補驗切到責任、聊天、工作分配、WIP、Workflow 與工具方法。這些多為概念模型；特別 P68–76 可能讓人以為 Agent 數量、session 或交接已讓 Ticket 前進。P73 另比較 WIP 1/2，不能因此誤讀為本案例政策已改成 WIP 2。 |
| **P76 → P77–82** | 原則教學轉到共同票、範圍、職能責任、DoD、Kanban 回顧。P82 是 Exit Check；P106 才有完整七欄回顧。缺少局部 re-anchor 時，角色責任與 Ticket 狀態會被混為一談。 |
| **P82 → P83–95** | 從 Agent 演進 Exit Check 進入 Agent 交付。P87 有指定材料、命令與結果的實際交辦脈絡；P88–90 核對已有證據與補驗，P92 是「若略過放行就發布」的假設。學生可能把 Agent 執行等同 Dev/QA 看板移欄，或把假設發布當成真的 Merge／Release。 |
| **P95 → P96–107** | 主線結束後進附錄。P97–105 多為方法／架構參考，P106 回看看板，P107 Exit Check。若沒有「附錄／概念／回顧」標示，P106 的 #3 Done 可能被誤讀為本次實際 Kanban 已完成；manifest 對該頁的說明反而是 #3 停在 Product Check、尚未獲人放行。 |

## 雙軌 Wayfinding：每頁回答「工作在哪裡」與「Git 到哪一步」

建議把定位分成兩條相連但不互相代替的軌道：

1. **Work Item 軌：**`Backlog → Ready → Dev → Review → QA → Product Check → Done`，另以欄外標記顯示 Human Gate；Gate 是決策點，不是第八欄。
2. **Git 軌：**`working tree → branch → commit → push → PR → review／修正 → merge`。部署／release 需要另行標示，不能把 merge 畫成 deploy。

各章應高亮的焦點：

| 頁碼 | Work Item 軌 | Git 軌 |
|---|---|---|
| P1–23 | #3 建立／Backlog；P24 才教 Ready | N/A 或「尚未進 Git」 |
| P24–30 | Ready；WIP 尚未開始，0/1 | N/A |
| P31–38 | Ticket 狀態仍須明標為 Ready／教學案例狀態，不能由 Git 概念推斷移欄 | GitHub Flow 概念講解；P37 標「概念預演」 |
| P39–41 | #3 Dev → Review 教學路徑；真實狀態需依證據，不可臆測 | branch／PR／CI 為流程解說，不宣稱已建立真實 PR 或 CI |
| P42–49 | QA／補驗內容；標示規則層結果及目前未測範圍 | 實測使用 Version A/B artifact；P46–47 是同一 B 版補驗，非新程式版 |
| P50–54 | Product Check → 欄外 Human Gate（假設／概念）；不可標 Done | Gate 後的 merge/release 是條件或概念，未有證據不得標已執行 |
| P55–82 | 用同一 Ticket 位置講 Agent 接手、角色與 WIP；Session 改變不移欄 | 證據／版本上下文延續；Agent session 不等於 branch、commit 或 push |
| P83–95 | Agent 交辦／補驗／人類判斷；狀態只在明確證據支持時變更 | P87–90 有實際規則層材料與補驗；Merge／Release 未授權／未證實時明標未執行 |
| P96–107 | 附錄狀態回顧；P106 清楚表明 #3 尚停 Product Check、未過 Gate | N/A 或依引用證據標記，不要把回顧圖當新操作 |

每頁狀態最好固定顯示「**教學情境位置**」及「**證據狀態**」：例如 `教學推演：QA`、`規則層實測：B / PASS`、`UI 整合：NOT RUN`。這能避免把實際測試結果外推成整張 Ticket 的工作流狀態。

Git 教學應採官方 GitHub Flow 的順序語義：建立 branch、修改、commit/push、建立 PR、review、merge；官方文件將 PR 描述為徵求回饋，merge 是整合到目標分支。這些術語要和教學案例是否實際執行分開標示。[GitHub Flow 官方文件](https://docs.github.com/en/get-started/using-github/github-flow?ref=cloud-tech-simplified) Kanban University 強調把實際工作流與工作項目可視化；因此展示的欄位和卡片狀態應表達本課案例當下的證據，而非願望狀態。[The Official Kanban Guide](https://kanban.university/kanban-guide/)

## P1–107 頁碼區間定位表

下表整理教學內容及可從頁面／manifest 支持的狀態。**「教學位置」不是宣稱 Ticket 實際移欄。**沒有證據的欄位標 N/A；只描述概念／假設的頁面，不推定 Git 操作已發生。實際 Git 狀態應以可見的 repo、branch、commit、remote、PR 證據核對，不能從流程圖推測。

| 頁碼 | 教學位置／主題 | Work Item／Kanban | Git 操作與證據性質 |
|---|---|---|---|
| P1 | 開場案例 | N/A | N/A |
| P2–8 | Whole Picture、人類職能與交付 | 概念；未定位單票狀態 | 概念 |
| P9–12 | Goal、工作票、準備 Ready 的條件 | #3 尚在規劃；非已開始證據 | N/A／未進 Git 操作 |
| **P13** | 規則層輸入、預期、檢查記錄 | N/A；不能據此認定移入 Dev | 講解／測試設計；實際結果依版本與工具輸出 |
| P14 | 共用版本／Git 入門 | N/A | 概念 |
| **P15** | 三張工作票 Backlog | 明示三票在 Backlog | N/A |
| P16–23 | 規則、範例、AC 與驗收條件 | Ready 前的票面準備 | 概念 |
| **P24** | Ready、WIP、開始條件 | #3 Backlog → Ready 的教學定位；不得與已開工混淆 | N/A |
| P25 | 角色、工作票、狀態、交付物名詞 | 概念 | N/A |
| P26–29 | Backlog 到 Done、WIP 流程／政策比較 | Kanban 教學流程；示例不等於本次實際移欄 | N/A |
| P30 | Exit Check | 問答回顧 | N/A |
| **P31–32** | 多人版本衝突引入 | 無 Ticket 移欄證據 | 問題情境／概念 |
| **P33–38** | Git、push、branch、PR、merge、Exit Check | Kanban N/A；Git 動作不自動改 Ticket 狀態 | Git Flow 概念；P37 明示概念預演 |
| P39 | #3 Ready → Dev | 教學定位為 Dev、WIP 1/1 | 未以此頁證明 Git 操作 |
| P40–41 | 自測、PR／CI、Review 流程 | Dev／Review 教學範圍 | 示意；CI 未宣稱已搭建 |
| **P42–43** | 黑箱驗收、決策表 | N/A；定義預期不等於 QA 已執行 | 驗證設計／預期 |
| **P44** | A FAIL、B 同案 PASS 與退回修正 | 教學中的 QA 退回／重驗；不代表 Product Check 完成 | 規則層實際執行證據 |
| **P45** | Version A/B 預期實際表 | QA 結果；重複 Like NOT RUN | 實測紀錄（B-pre）；其餘缺口明示 NOT RUN |
| P46–47 | B 補驗前後 | 同一票的證據補充，不是新看板狀態證據 | 同一 Version B；補驗增加證據，非新程式版本 |
| P48 | PASS／FAIL／NOT RUN 判讀 | QA 教學 | 依情境判讀 |
| **P49** | Exit Check | 回顧，不作狀態更新證據 | 回顧已呈現證據 |
| **P50–54** | 放行、風險、Goal、整體路徑 | 概念／教學假設；不能認定已 Done 或過 Human Gate | 放行／release 條件解說；未證明已 Merge／Release |
| P55–57 | Agent 接手與工作資訊 | Agent 接手不代表票移欄 | 概念／交接教學 |
| P58 | Agent 交辦、規則層證據 | N/A；不推定 Board 已移欄 | 基於 Version A/B 證據的示例 |
| P59 | 修正、重測及證據 | N/A；同一 Ticket 的驗證情境 | Version B 補驗情境；操作需依實際證據辨認 |
| **P60** | 可取得資料與未讀材料邊界 | N/A | 證據來源說明；不能把存在的檔案說成已讀／已執行 |
| P61–64 | Session、摘要、背景、單 Agent 補驗 | Session／摘要變化不等於 Kanban 移欄 | 交接與規則層補驗情境；人類接受仍待判斷 |
| P65–67 | 多人／多 Agent 工作與責任 | 概念；Agent 數不是狀態 | 概念 |
| **P68–76** | 交接、流程、WIP、協作原則 | 流程模型／WIP 比較；不代表本案例 WIP 政策或 Ticket 已改欄 | 概念；非 Git 實際操作證據 |
| P77–82 | 共用票、責任、看板與 Exit Check | 狀態與流程回顧 | N/A；非 Git 實作 |
| P83–86 | Agent 交付、分工、AI 協助 | 概念／示例；不能推定移欄 | 概念 |
| **P87** | 指定材料與執行命令 | #3 驗證工作；不表示 Board 已前進 | 實際交辦／規則層驗證入口；命令與結果應和證據檔核對 |
| **P88** | Agent 完成宣稱與人的核對 | 人類接受仍是決策，不因 Agent 宣稱完成而 Done | 證據核對；缺口仍有 NOT RUN |
| **P89–90** | 要求補驗、切換 session 接續同票 | 同一 Ticket；session 不改 Kanban 狀態 | B-pre→B-post 補驗；同一 B artifact，不是新程式版 |
| **P91–92** | 放行前風險、假設略過 Human Gate 發布 | P92 明示假設；不得標已 Done／放行 | 假設，沒有宣稱已 Merge／Release |
| P93–95 | 看板全流程／Agent 交付檢核 | 教學回顧；不可替代真實狀態證據 | Exit Check／回顧 |
| P96 | 附錄入口 | N/A | N/A |
| **P97–105** | 規則表示、測試、BDD、範例、阻塞與事故等參考 | 各頁按其情境；事故／上線前提不得當本案例事實 | 附錄概念、方法或假設，依頁面標示 |
| **P106** | Kanban 回顧 | 七欄；manifest 說 #3 停 Product Check、尚未獲人放行；Done 非 Goal | N/A；不是 Merge／Release 證據 |
| P107 | Exit Check | 回顧 | 回顧；N/A |

## 最小 UI 建議

**不需要再增加幾十張定位投影片。**必要的是讓既有頁面能自我定位；額外投影片只保留能教清課程全貌或讓學員查回全貌的頁面。

- **必需：**P2 Whole Picture 保留；P9–30、31–49、50–54、55–82、83–95 的既有章節轉場頁保留並標清本段軌道／證據類型；P106 七欄總覽保留作完整看板回顧。
- **非必要：**再複製一張全課大綱、每章再加一張七欄大圖，或為 Git 每一步新增一張定位頁。這些會重覆內容，仍無法告訴學生「此頁的教學案例狀態」或「此操作有沒有實際執行」。

建議在每張投影片同一固定區域放小型定位列：

- **第一行 Work Item：**7 個等寬短標籤／節點，僅高亮本頁教學重點；Human Gate 標於 Product Check 與 Done 間並明示「欄外決策」。
- **第二行 Git：**用 `Working tree → Branch → Commit → Push → PR → Review → Merge` 的迷你步驟線；不相關頁可折疊為一個簡短階段籤，例如「Git：概念解說」或「N/A」。
- **狀態／證據籤：**每頁明示 `概念解說`、`教學重演`、`實測` 或 `假設`；實測再標測試層級與版本，例如 `規則層｜B｜PASS`、`UI 整合｜NOT RUN`。不要用綠色 PASS 取代 Ticket 狀態，也不要讓 session 名稱佔據狀態欄。
- **回看 Whole Picture：**P2 是總覽入口；各章封面或跨章轉場提供明確回看連結。頁內定位列只顯示當前附近資訊，不重畫完整流程大圖。P106 留作需要看整張看板時的參照。

**1440×900 高度預算建議：**頁頂章節導覽約 44 px；Work Item 列約 30 px；Git／證據列約 26 px；底部導覽控制約 38 px。定位合計約 56 px，不含現有章節列與頁面控制，內容區仍約 760 px。這是 UI 建議，不是已量測現行 viewport 的結果。

**無障礙與輸出同步：**

- 不只靠顏色表示目前欄位／Git 階段；配合文字、形狀或 `aria-current`，確保鍵盤與螢幕閱讀器可辨識。
- 定位列在網頁切頁、投影片匯出、列印版都要出現；收合／動畫狀態要有靜態等價資訊，避免 PPTX 或列印漏掉當頁位置。
- Print/PPTX 每頁顯示當頁高亮與狀態文字；不要依賴互動 hover 或動畫才看得見的證據標籤。
- 需要讀整張流程時連回 P2／P106；一般頁維持 mini strip，避免每頁塞入七欄大圖。

## P0／P1 誤導風險

- **P0：把 QA PASS 說成可 Merge／Release。**P44–47 是有限範圍的規則層結果；其餘情境及 UI／整合仍有 NOT RUN。不能將 PASS 外推為 Product Check、Human Gate、release 或 Goal 達成。
- **P0：把教學假設講成實際上線／Merge。**P50–54、P92 的放行與發布是概念或假設；不得讓學生以為 Matching App 已實際 Merge、deploy 或 Release。Merge 與 deploy/release 是不同事件。
- **P1：P37 的 merge 概念預演未在後續頁維持標籤。**學生可能把 branch/PR/merge 圖當成本案例已執行 GitHub Flow。
- **P1：把 P46–47 的 B-pre→B-post 說成新程式版。**來源內容明確說是同一 Version B 增加重複 Like 補驗證據；這是證據時間點改變，不是 artifact 換版。
- **P1：把 Agent session、摘要、接手或協作人數當作 Kanban 狀態改變。**它們是工作上下文／責任變化；只有明確 Ticket 事件才可更新看板欄位。
- **P1：把 P106 的示意 Done 與真正 Gate 結果混淆。**manifest 說明該回顧中的 #3 仍在 Product Check、未獲人放行；單票 Done 也不代表整體 Goal 達成。

建議以短標籤和明確文字固定三種證據層級：**實測**只涵蓋有版本與原始紀錄支持的規則層案例；**教學重演／概念解說**用於流程圖與情境演示；**假設**用於「若發布」「三票完成」等條件推演。這些標籤應與 Work Item 軌及 Git 軌各自對應，不能互相代替。
