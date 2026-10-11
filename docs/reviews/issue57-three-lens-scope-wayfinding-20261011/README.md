# PR #57｜三個獨立視角審核：內容必要性與 Kanban／Git 定位

**審查基準**：e1669737b9cbbbaebcb1478afa241a9e02b68fac；107 頁（95 頁主線、12 頁附錄）；2026-10-11。

**身份與範圍**：三個彼此隔離的唯讀 AI 工作階段，依據已發表的簡報、教學、Kanban 與 Git 原則進行檢查。沒有直接聯絡或聘請 Garner、Alley、Mayer、Fiorella、CMU／Waterloo 等研究者；不得把本審查寫成那些學者親自背書。它們各自閱讀最新 HTML、107 頁盤點及九張最新縮圖，沒有先讀別人的 Review。**未修改教材，真人學員及現場投影測試 NOT RUN。**

## 三份獨立報告

| 視角 | 研究參考 | 審查結果 |
|---|---|---|
| [A：Assertion–Evidence／視覺敘事](independent-assertion-evidence.md) | Garner／Alley、Waterloo | 107 頁逐頁分 KEEP／MERGE／APPENDIX／REWRITE／NOTES／CUT，給出具體合併對象 |
| [B：Kanban＋Git 流程定位](independent-kanban-git.md) | Kanban University、GitHub Flow | 追查 JS／DOM、整份流程跳點，設計工作票／Git 雙軌定位 |
| [C：非工程初學者課程](independent-novice-curriculum.md) | CMU、Mayer／Fiorella | 逐章內容必要性、可合併頁、練習、Exit Check 與縮短版主線 |

## 判斷一：內容有現場講授過量的高度風險

「想法到 Ready」22 頁、「Agent 演進」28 頁，共 50／107 頁。問題在於**工具概念、核心操作、相近例子、五項風險、五項原則與完整技術背景同時放進現場主線**。95 頁若全部照頁講，極易排擠實際練習。頁數本身沒有科學及格線。

A 的逐頁分類如下（這是其獨立主張，尚未執行任何刪除）：

| 編輯建議 | 頁數 |
|---|---:|
| KEEP 保留現有功能 | 72 |
| MERGE 可合併 | 13 |
| APPENDIX 附錄／選讀（含原本附錄） | 18 |
| REWRITE 重設主畫面／結構 | 3 |
| NOTES 講者補充 | 1 |
| CUT 可直接刪 | 0 |

C 建議在**假設三小時、有練習的入門工作坊**，試排約 44–55 張主線；A 對較短時段提出約 30–45 張。這些是編輯試排範圍，**不是必須縮到某張數，也不是研究證實的數字**。素材可以保留在選讀、Notes 與 Evidence，而不必每張都現場講。

## 判斷二：目前的全課導航缺少逐頁工作流定位

已查核 drafts/rev12.js：sync() 依頁面更新**章節高亮、頁碼與簡報百分比**；目前沒有每張都能看見的 #3 Ticket Kanban 狀態，亦沒有 Git 操作位置。P15／24／26／39／93／106 只有局部看板或階段示意；P33–37 說 Git 概念，但未形成持續定位。

### 應分開顯示的三種資訊

1. **Kanban／工作票**：Backlog → Ready → Dev → Review → QA → Product Check → Done，Human Gate 是 Product Check 到 Done 間的**欄外人工決策**，不新加第八欄。
2. **Git**：工作目錄 → branch → commit → push → PR → review／修正 → merge。Merge 不等於部署／發布。
3. **這頁資料的性質**：概念、教學重演、規則層實測、假設、附錄。單一 Version B 從補驗前到補驗後只增加測試證據，沒有換程式；不能把 PASS 外推到 UI／整合或 Human Gate。

**建議最小 UI**：章節導覽維持；在固定區域顯示一行「本頁教學位置」，例如「#3 工作票｜QA 規則驗證｜Git：尚未 Merge｜實測」。教 Git 時反過來顯示 Git 重點，Kanban 停在有證據的階段。若這頁只是概念／假設，用明確狀態籤，不臆測工作票已移欄。點定位列才展開完整兩條線，一般頁面不要每次塞入七欄大看板。

此設計需對鍵盤、列印和 PPTX 的靜態輸出都有等價資訊，不依賴色彩或 hover 才能理解。**本輪提出方案，尚未實作。**

## 判斷三：可精簡的高優先頁段

| 頁段 | 具體混淆／重複 | 修訂方向 |
|---|---|---|
| **P14–24** | P14/15 已見 Issue／Backlog，P16–23 又回需求釐清；P21–23 同一 AC/AT 三次講 | 顯示「仍在 Backlog」；P22＋23 合併；P14 的工具細節選讀 |
| **P24–29** | Ready 後跳入 Sprint、WIP 上限選擇 | 必需的 WIP 計數保留；P27、29 移選讀 |
| **P31–39** | P36/37 已概念 PR／Merge，P39 卻剛進 Dev | P36＋37 合成 Git Flow 概念圖，顯示「尚未實際 Merge」；P39 高亮 Dev |
| **P42–48** | 預期→實測→三頁補驗前後→Product Check 混在一起 | 保留 P42–45；P46＋47 合成「同版增加證據」，P48 明示 Product Check 為教學推演 |
| **P50–64** | Done 假設後，P58 又倒回 Version A 重演 | 明確表示「時間倒回／重演」，可合併 P52＋53，Agent demo 不偷偷改寫已發生狀態 |
| **P65–82** | Agent 數量、聊天分工、三種風險、Workflow、model/effort、Grill Me、五項原則重複展開 | 保留交接卡、共同票、停止範圍、獨立驗證與回對 Goal；P67／73–75 等選配移附錄 |
| **P83–93** | 已教人的放行，P88–90 再補驗，P91–93 又重走放行與看板 | 保留交辦→根據證據退回→人接受練習；P91／92 選講，至少保留一個全流程回看入口 |

### 三位審查者有分歧，不能直接照刪

- **P5 等章節 Overview**：A、C 覺得可與下一頁合併；B 認為缺乏逐頁定位時需保留足夠的章節路標。**先補導航再決定是否合併**。
- **P26／P93／P106 全看板**：A、C 建議去重，B 認為至少保留一張可隨時查看的七欄流程圖。保留一個錨點，其他可移附錄或互動展開。
- **P41 Review 退回**：A 建議可能移 Notes，但學員需要一次真正看懂誰提出修改、交給誰改。保留其教學功能，可刪冗詞，不宜直接移除。
- **八張 Exit Check**：核心章節保留驗收；精簡 C5 後要同步調整 P82 題目。附錄 P107 若不教附錄內容，可改成自學找資料測驗。

## 修正優先序與驗收 AC（尚未開工）

- **P1／流程位置**：在最新 storyboard／manifest 對每頁標明目前「教什麼階段」、Kanban 焦點、Git 焦點、證據模式、是否重播；無證據時標 N/A，不從章名猜測票實際狀態。
- **P1／固定定位**：在主要頁面有一致、低負擔的工作票／Git 現在位置。P36/37 及 P39、P42–48、P50–54、P58–64、P88–93 要能區分概念、實測與假設。
- **P1／內容精簡**：先合併 P22＋23、P36＋37、P46＋47；將 P27／29、P74／75 改選講，沿同一 #3 案例重排 Agent 演進，**頁數不用一換一**。
- **G3 實際學習**：不先看 Notes，抽十個跨章／跨狀態頁面，請非工程學員回答「目前在 Kanban 哪裡？Git 哪一步？這是實測、預期或假設？下一步由誰做什麼？」。抽測頁與通過標準是**本專案的測試建議**；真人、投影若未執行就寫 NOT RUN。
- **G4/G5**：最新 HEAD 逐頁 Before／After、截圖位置、鍵盤操作、列印／PPTX、Exit Check、A/B 版本與原始 Evidence 同步檢查。**PR #57 保持 Draft；不自動 Merge main。**

## 本輪研究依據

- [Garner／Alley 2013：Assertion–Evidence](https://pure.psu.edu/en/publications/how-the-design-of-presentation-slides-affects-audience-comprehens/)
- [Mayer／Fiorella：Coherence／Signaling](https://www.cambridge.org/core/books/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning/F29A19FCD34C542806F736E0661C05F5)
- [Mayer／Fiorella：Segmenting／Pre-training](https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-managing-essential-processing-in-multimedia-learning/A9E77D0172F905AC957689D1771E2888)
- [Carnegie Mellon：Plan Your Course Content](https://www.cmu.edu/teaching/designteach/design/contentschedule.html)
- [Waterloo：Designing Visual Aids](https://uwaterloo.ca/centre-for-teaching-excellence/catalogs/tip-sheets/designing-visual-aids)
- [Kanban University：The Kanban Method](https://kanban.university/kanban-guide/)
- [GitHub：GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow)

**本資料夾另附九張最新 107 頁 Contact Sheets，標明基準 HEAD，作為後續審查的實際畫面。**
