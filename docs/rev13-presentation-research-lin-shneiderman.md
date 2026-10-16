# Rev13 研究筆記：林大班／BFA × Shneiderman × Focus+Context

> Research interpretation / design rationale, 2026-10-13. **不是已做好的投影片、不是全面實證通過、也不是替講者捏造原話。** Rev13 的具體交付規則仍以 [全域分鏡契約](rev13-visual-narrative-contract.md) 為唯一 SSOT。
>
> 核心判斷：AgentDeck 的目的不是「每頁字少」或「一定要動畫／半透明遮罩」，而是讓零基礎學員**持續看得到結構、看懂本步重點、知道五個座標（階段／共同職能／工作票或 AC／狀態變化／GitHub 物件），並能驗收下一步**。

## 1. 林大班老師：先判斷內容與對象，再設計視覺

### 來源可以直接支持什麼？

- **結構企劃 → 視覺呈現 → 訊息傳遞**：先想簡報目標、受眾、先後順序與時間比例，再進畫面排版及講述，而不是先套模板。見 [PBS 寶渥商學院官方課綱](https://www.pbs.school/course/business-presentation)。
- **DIG：Data / Insight / Go**：具體數據／事實；對觀眾有意義、他未必知道的洞見；可以執行的下一步。來源：[PBS 官方課綱](https://www.pbs.school/course/business-presentation)、[BFA 2022 實際發言整理](https://www.bfa.com.tw/blog/bfaevent-1026)。這是判斷哪些資訊應該成為重點的方法，**不要求每張投影片用三個大盒子硬塞 DIG**。
- **FIG：Font / Ink / Grid**：用字體層級、色彩／對比、網格與位置使訊息突出。[2025 年林大班授課紀錄](https://chcm.csmu.edu.tw/p/16-1029-72818.php?Lang=zh-tw) 記錄了 DIG、FIG、Before-After 示範。
- **去色降噪 → 分類分段 → 閱聽人重點 → 一致性**：林大班於 [BFA 2021 活動紀錄](https://www.bfa.com.tw/blog/bfa-event-60-featured-speaker-ben) 示範先去色和雜訊、再分組／分段，問觀眾在乎什麼，最後固定字體、配色、位置等規則。文字多寡不是判斷好壞的主軸，**讓人一眼看懂重點才是**。
- **「引導思考的旅程」／內容模組／先後時間**：[2024 林大班課程整理](https://ctoacademy.org/pitchppt2/) 記錄了避免資訊傾倒、依輕重／屬性／人／對立分類、利用便利貼或畫布整理段落和順序。此處是活動報導／二手文字紀錄；不要冒充逐字講課錄影。
- **3T / Target、TA、Time** 在 [課程學員分享](https://www.linkedin.com/posts/amy-liao-113776167_%E6%9E%97%E5%A4%A7%E7%8F%AD%E8%80%81%E5%B8%AB%E5%95%86%E6%A5%AD%E7%B0%A1%E5%A0%B1%E8%AA%B2-%E5%B0%88%E6%A5%AD-%E7%B0%A1%E6%BD%94-activity-7089929907631259648-2Vk5) 有提及；**這是個別參與者整理，不作為官方原文**。可採其「先明確受眾／目標／可用時間」的實務想法。

### 特別釐清「分鏡溝通法」的出處

**不能直接把 BFA 網站所有方法寫成林大班本人提出。** BFA 的 [《簡報不是動畫的軍備大賽！》](https://www.bfa.com.tw/blog/the-myth-of-presentation-animation) 明確署名**魯蓓蓓**，她提出／介紹用「分鏡溝通法」：同一張完整架構圖複製為多頁、用半透明遮罩讓觀眾依講述節奏逐步聚焦；不必依賴有風險的複雜動畫。另見 [BFA 課程實況](https://www.bfa.com.tw/blog/bfaevent-live-streaming-4)。它與林大班的邏輯優先／視覺降噪非常契合，但資料不足以說是林大班獨創或 Shneiderman 親自命名。

**AgentDeck 轉譯**：
- 在製作每一張 Focus 頁之前，先寫：受眾此刻應回答什麼？有什麼已知事實？要發現哪個差異？接著能做什麼決策？
- 保留一張共用母圖（流程、職能、Ticket/GitHub 連結）；複製同位置布局後選擇性遮罩，Focus 當前相關項目。重點資訊可以有必要的字數，不為「一頁六行」犧牲上下文。
- 每頁唯一最強視覺焦點；非焦點可淡化，但不要淡到完全失去空間方向；主圖層級、狀態字樣、路線一致。

## 2. Shneiderman：不止 Overview → Zoom & Filter → Details

Shneiderman [*The Eyes Have It* (1996)](https://drum.lib.umd.edu/items/155a868e-fb83-4115-9899-9187ea8c0498) 明列 **七項資訊視覺化任務**：

| Original task | 本研究的 Rev13 轉譯 | 不是原作者直接講的 |
|---|---|---|
| Overview | 完整 Workflow + 全職能 + GitHub 工作鏈 | 放在簡報章節入口 |
| Zoom | 放大當下 Brainstorm / Refinement 或某個 QA case | 以連續投影片完成 zoom |
| Filter | 暗化無關角色、階段與分支，但保留位置 | 半透明遮罩為指定實作 |
| Details-on-demand | 必要時展開 Ticket 欄位、AC、PR Diff、Evidence；無需要的細節放 notes | 需互動才一定成立；投影片分頁只是類比 |
| **Relate** | 把階段 ↔ 人／Agent ↔ Ticket ↔ GitHub artifact 視覺連接，不只五塊並排 | 這是本課的關係圖設計 |
| **History** | A → B-pre → B-post、Ticket split/退回／復驗，以狀態 Delta 保留來龍去脈與可回查入口 | Updated Overview 是本課自己新增的教學節奏 |
| **Extract** | 簡報讓學員知道何處能拿到實際 Issue/PR/AC/Evidence、練習可帶走的材料 | 原文是擷取選定資料與查詢參數，不是指 GitHub Ticket |

**不要要求 7 個任務每一頁都各有一個大卡片。** 一個階段必須達到 Relate、History、Extract 的教學目的，但 Zoom/Filter/Details 可以視畫面任務安排，保持主次清晰。

### Shneiderman 另一條支線：Eight Golden Rules

他的[原始說明](https://www.cs.umd.edu/users/ben/goldenrules.html)是給**互動介面**設計，與 HTML 播放器／可跳轉的簡報直接相關；其中對這個專案尤其有用的是：

| Rule | 在 AgentDeck 的可操作設計 |
|---|---|
| Consistency | 同名狀態、職能、色彩與箭頭在所有場景保持一致 |
| Informative feedback | 每次切到 Updated Overview 顯示新建立 Issue、拆票、移欄、退回、PASS/NOT RUN |
| Closure | 章末呈現此階段是否完成、留下什麼、下一站是誰 |
| Easy reversal | HTML 允許返回上一張、回到母圖與當前所在位置 |
| Keep users in control | 不強制 autoplay/無法中止的動畫；保留講者／使用者翻頁主導權 |
| Reduce short-term memory load | 不要求觀眾憑記憶比對 10 頁前的 AC／人／版本；必要座標保持可見 |
| Universal usability / prevent errors | 投影與不同螢幕需能辨識；狀態標籤不只靠顏色；未執行清楚標 NOT RUN |

## 3. 旁支研究：Focus+Context 不只遮罩一種

Cockburn、Karlson、Bederson [*A Review of Overview+Detail, Zooming, and Focus+Context Interfaces*](https://www.microsoft.com/en-us/research/publication/a-review-of-overviewdetail-zooming-and-focuscontext-interfaces/) 梳理四種手段：

- **Overview + Detail**：概覽和細節分區；適合母圖縮圖 + 右側 Ticket 詳情。
- **Zooming**：跨時間切換大小；適合從完整流程切到當前階段。
- **Focus + Context**：同時在一個畫面保留局部與全貌。
- **Cue-based**：選擇性強調或壓低項目；**半透明遮罩**接近這類，不必全部歸類為 Shneiderman 的專有 Spotlight。

Heer、Robertson [*Animated Transitions in Statistical Data Graphics*](https://idl.uw.edu/papers/animated-transitions) 提供了轉場有助於追蹤視覺狀態變化的研究背景，但不能因此推導「每個投影片都必須動畫」。本課 **靜態同布局分鏡是可靠的基本方案**；可選 Morph/平順動畫，必須能停止或跳過且最終仍可做 native-editable PPTX。

## 4. 實作到 Rev13 的四個 Review 問題（在原契約上加強，不另創競爭 Gate）

1. **Audience + DIG**：這一頁對零基礎學員，最重要的「事實／差異／下一步」是什麼？不需要逐字堆滿所有背景。
2. **FIG + Focus**：遮罩或視覺強調是否真正在增加重點的辨識度？非重點仍可辨認原本位置，且明暗／字級／對齊都前後一致？
3. **Relate**：階段、co-workers、Ticket/AC、GitHub Issue/Branch/PR 的關係能否在視覺上跟起來？不是只把名詞各自放在卡片中。
4. **History + Extract / Feedback**：回到 Overview 前後的狀態 **真的有 Delta** 嗎？前一次的版本／未測項有沒有保留？本步交出何種 Ticket/PR/Evidence、去哪裡找？章節結尾是否有清楚 Closure？

**不改變原本的硬規則**：Overview → Spotlight → Work / Artifact → Updated Overview；以上是加入「為什麼、怎樣驗」的內在品質檢查，不是強制每個階段出現 7 張 Shneiderman 或 3 張 DIG 投影片。

## 5. 待驗證與限制

- 沒有拿到林大班本人的課堂錄影或使用者上課時的原始筆記；以上僅代表有公開來源支持的已記錄方法與本課推論。**他是否親自用 Shneiderman 這套理論、是否原創半透明遮罩分鏡，無法證明。**
- Shneiderman 主要研究互動資訊視覺化；搬到演講簡報是教學設計**類比與轉譯**，不是原論文已驗證 AgentDeck 學習成效。
- 這份文件是研究／規劃，沒有建立新投影片、完成真人試教，也沒有驗證相關動效在實際投影畫面的表現。
