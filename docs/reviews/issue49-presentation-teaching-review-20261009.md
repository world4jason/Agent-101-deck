# Agent 101 Deck：PR #49 審查與教學簡報設計研究（完整 Review 原文＋執行追蹤）

> 審查基準：PR #49 原 99 頁 HEAD 4e04a1bfec1e6f85bd7ad4d8fb6adf1bff7e04d2；研究結論與先前回覆的完整內容整理於下，不以此文代表 Approve。2026-10-09 Owner 另確認 **每章一張 Exit Check、合計八張**，因此增量候選變為 **107 頁**；歷史頁碼與最新頁碼需依 storyboard／manifest 換算。
> 這是教學內容／簡報設計 Review。AI 模擬初學者審查、程式測試、真實投影、真人學習成效是不同的證據層級，不能互相代替。

## 一、先釐清這次審查的範圍

目前 GitHub 上的版本關係如下：

| 項目 | 內容 | 狀態 |
|---|---|---|
| [PR #47](https://github.com/world4jason/Agent-101-deck/pull/47) | rev11，82 頁正式版，主要修正原有教材的內部一致性 | 已合併 |
| [Issue #48](https://github.com/world4jason/Agent-101-deck/issues/48) | 新版教材需求與教學流程擴充 | 後續開發依據 |
| [PR #49](https://github.com/world4jason/Agent-101-deck/pull/49) | rev12，原保留 82 頁並新增 17 頁，共 99 頁；本輪再新增 8 張出口檢核至 107 頁 | 尚未合併 |

你提到的 **#47 在這個 Repository 實際上是 PR #47**，不是獨立的 Issue。它的 Review 特別重視時間線、角色與 Agent 數量的區別，以及獨立驗證的責任。

PR #49 已經補了 Brainstorming、Goal、Matching 實測、Context／Session／Memory、練習及 Human Gate 等內容。

但這次我會採取比「內容有沒有補齊」更高一層的審查標準：

**一份投影片即使內容正確、沒有跑版、測試全過，也不代表它是一份能讓初學者有效學會東西的教學簡報。**

接下來需要同時檢查三件事：

1. **Instructional Design（教學設計）：** 學員是否循序建立理解？
2. **Presentation Design（簡報設計）：** 標題、內文、圖解與章節是否清楚傳達重點？
3. **Learning Assessment（學習成效評估）：** 學員看完是否真的能應用，而不只是覺得自己懂了？

## 二、PR #49 實際審查：目前還不建議直接 Merge

我讀取了 PR HEAD 4e04a1b 的 99 頁 HTML 成品、故事板、manifest、README 與既有 Review。

### 目前確認的問題

| 優先級 | 原 99 頁頁碼 | 問題 | 判斷 |
|---|---|---|---|
| P1 | P87、P25、P99 | Human Gate 有時是看板欄位，有時是欄位間的決策點 | 尚未修正 |
| P1 | P25、P36、P45、P85、P87、P99 | 同一個流程關卡混用 Goal Check、Product Check、Product / Goal Check | 需統一 |
| P1 建議 | P85 | 同一張同時教 PR 審查節奏與 Human Gate，主旨分散 | 建議在本輪調整 |
| P2 | P23、P38、P43、P45、P73–75 | 部分主標仍是術語或主題名稱，不是學員應記住的結論 | 系統性修正 |
| P2 | P86、P98 | 內部專案資訊及架構術語仍偏多 | 適合優化 |

### 最明確的矛盾：P87

**P87：目前總回顧畫出的看板**

Backlog → Ready → Dev → Review → QA → Goal Check → **Human Gate** → Done

Human Gate 被放進 CSS selector「.recap-columns」，成為第八個欄位。

**P25／P99：教材自己定義的模型**

Product / Goal Check → **Human Gate（決策點）** → Done

Human Gate 不另設狀態欄；等待放行時仍留在 Check。

這不是單純的用字不一致，而是**同一概念用了兩套視覺模型**。總回顧頁很容易成為學員最後記住的版本，所以優先級高。

來源：[P87 成品 HTML](https://github.com/world4jason/Agent-101-deck/blob/4e04a1bfec1e6f85bd7ad4d8fb6adf1bff7e04d2/slides/index.html#L647) · [P99](https://github.com/world4jason/Agent-101-deck/blob/4e04a1bfec1e6f85bd7ad4d8fb6adf1bff7e04d2/slides/index.html#L735)

### 已有明顯改善的地方

PR #47 與 Issue #48 原來要求的幾件重要事情，現在已經有對應內容：

- P8–28 先讓需求形成、拆票與驗收條件完整展開。
- P27–28 正式教 WIP 數量、上限 1 與上限 2 的取捨。
- P39–44 用同一個 Matching 案例展示 FAIL、修正、PASS 與實際證據。
- P53–54 補上單一 Agent 的實作與重測示範。
- P55–59 把 Context、Session、Compact、Memory 分開說明。
- P81–84 提供委託、驗收、退回與交接練習。

**整體結構方向可以保留。** 現階段不需要推翻課程重做，而是要處理最後的跨頁一致性，以及教學表達方式。

## 三、研究結果：一份好的投影片，標題、內文與章節應該怎麼設計？

我認為最值得引入 Agent 101 的是 **Assertion–Evidence（主張－證據式簡報）**，再結合教育心理學的 Multimedia Learning。

### 3.1 標題：從 Topic Title 變成 Message Title

一般簡報很常用主題式標題：

**Topic Title｜只有主題**

PR Review

定義・用途・流程・注意事項

觀眾知道你要講什麼，但不一定知道應該記住什麼。

**Message Title｜先傳達重點**

Reviewer 發現超出範圍的修改，要求 Dev 修正

新增聊天室（超出 #3） → Request changes（退回 Dev）

即使沒聽到講者補充，也能抓到這一頁的核心結論。

這對應 Michael Alley 提倡的 **Assertion–Evidence**：

- 標題用一句可以判斷真假的主張。
- 主體用圖、例子、比較或資料支持標題。
- 不把講稿全文塞進投影片。

研究曾在工程教育情境發現，這種設計相較傳統標題加條列，能改善複雜概念的理解，並減少部分誤解。但不能直接推論成所有課程使用後都會有相同效果。

參考：[Penn State Assertion–Evidence](https://www.engr.psu.edu/speaking/VISUAL-AIDS.html)；[Garner et al. 2011](https://pure.psu.edu/en/publications/assertion-evidence-slides-appear-to-lead-to-better-comprehension--2/)。

**我建議的標題標準不是「每張都要是一句結論」，而是根據投影片用途選擇：**

| 投影片類型 | 推薦標題形式 | Agent 101 範例 |
|---|---|---|
| 觀念解說 | 陳述句／結論句 | 職能是責任分工，不代表每個職能都需要一個 Agent |
| 問題導入 | 問句 | 只有一方 Like，為什麼不應建立配對？ |
| 對比分析 | 呈現差異或取捨 | WIP 上限 2 可以並行，但也增加交接與驗收負擔 |
| 操作練習 | 明確任務指令 | 找出這份交付缺少哪一條驗收證據 |
| 章節封面 | 章名＋學習任務 | 需求形成｜把想法變成可交辦、可驗收的票 |
| 回顧總結 | 學員應帶走的結論 | Agent 說完成，不代表人已經接受交付 |

### 3.2 內文：不是越少字越好，而是資訊的呈現方式要正確

認知負荷與多媒體學習理論，最重要的不是「一頁最多六行字」，而是減少學習者不必要的資訊處理工作。

| 學術原則 | 意義 | 在 Agent 101 的用法 |
|---|---|---|
| **Coherence** 連貫／排除無關資訊 | 刪除與當下教學無關的細節 | raw JSON、SHA、完整路徑移到 Evidence／Notes |
| **Signaling** 注意力提示 | 清楚指出此刻要看的部分 | A 版的 FAIL、B 版的 PASS 用一致標記強調 |
| **Spatial Contiguity** 空間鄰近 | 解釋放在對應圖形旁邊 | Human Gate 的文字貼近決策點，不放在另一張圖下方 |
| **Segmenting** 分段 | 複雜流程分步揭露 | 先顯示 Version A → 再揭露失敗原因 → 再顯示 B |
| **Pre-training** 預先建立概念 | 在複雜任務前教必要名詞 | 先教 AC、Ticket、版本，再講 QA 實際重測 |

這些是 Richard Mayer 相關研究體系中的正式概念。

因此我會設定三層資訊：

**第一層：學員眼前的教學畫面**

一個重點、支持它的圖或例子、當下必要的標註。

**第二層：講者筆記與操作說明**

細部定義、轉場語、提問方式、教學時間、補充說明。

**第三層：技術證據與附錄**

完整原始結果、版本指紋、命令、來源文獻、可重跑材料。

這樣不會犧牲嚴謹度，只是讓學員不必在第一次理解觀念時，同時閱讀完整工程稽核紀錄。

至於常見的「6×6 法則」「10/20/30 法則」，可以當排版經驗法則，但**不是適用所有教學投影片的科學標準**。與其硬限制字數，更應檢查真實投影距離、閱讀順序、對比與理解程度。HTML 版可參考 [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/)，普通文字對比至少 4.5:1，大型文字至少 3:1。

### 3.3 章節：不要只按照知識分類，而要按照學員的學習進展

教學章節最好同時回答三個問題：

1. **這章為什麼存在？** 學員遇到什麼問題？
2. **這章結束要會什麼？** 有什麼可以觀察的能力？
3. **下一章為什麼需要它？** 已經建立了哪些先備知識？

這很接近 **Backward Design（逆向設計）**：先決定學習成果，再決定如何驗證，最後規劃教學活動。

PR #49 的八個章節可以維持，但我會在故事板裡再加一欄「章節結束時學員應能做什麼」：

| 原 99 頁 | 章節 | 建議 Exit Outcome |
|---|---|---|
| 1–7 | 人類合作 | 能指出誰負責什麼，以及交回什麼 |
| 8–28 | 想法到 Ready | 能寫出一張有範圍、AC 與證據要求的 Ticket |
| 29–35 | 版本協作 | 能分辨工作版本、PR 與合併後版本 |
| 36–45 | 實作與驗收 | 能根據預期／實際結果指出失敗或未測情境 |
| 46–49 | 放行與完成 | 能區分單票完成與整體 Goal 達成 |
| 50–76 | Agent 演進 | 能判斷一個 Agent 何時足夠，何時需要分工 |
| 77–88 | Agent 交付 | 能完成交辦、退回補驗及最終判斷 |
| 89–99 | 附錄 | 能按需查找方法，不需要一次全部記住 |

這不需要另外增加八張投影片。章節封面、轉場、已有練習或講者筆記，就可以承擔這個功能。

**Owner 後續已決議修改上述原始提案：每章確實增加一張互動 Exit Check（A18–A25），合計八張。** 原提案文字保留供追溯。

## 四、值得認識的學術理論、專有名詞與設計 Pattern

這裡要區分 **有研究基礎的教學設計理論**，以及 **實務常用的簡報敘事方法**。兩者都值得借鏡，但證據強度不同。

### 教學設計與學習科學

| 名稱 | 核心思想 | 對 Agent 101 的價值 |
|---|---|---|
| **Assertion–Evidence** | 主張式標題＋支持主張的視覺證據 | 改善 Title 與正文的關係 |
| **Cognitive Load Theory（CLT）** | 控制學習過程中不必要的認知負荷 | 避免初學者同時承受太多術語、圖表與版本細節 |
| **Cognitive Theory of Multimedia Learning（CTML）** | 依文字、圖像與注意力的處理方式設計教材 | 指導資訊分層、標示、動畫與分段 |
| **Backward Design／UbD** | 先定學習成果，再定評量，最後安排教材 | 避免為了補齊知識清單而不斷增加頁數 |
| **Constructive Alignment** | 學習目標、活動與評量必須相互對應 | 確保教的就是最後要求學員會做的事 |
| **Merrill's First Principles** | 問題導向、喚起經驗、示範、應用、整合 | 特別適合 Matching App 的案例式課程 |
| **Gagné's Nine Events** | 從引起注意、說明目標到練習、回饋與遷移 | 檢查每章是否不只有講解 |
| **Retrieval Practice** | 讓學員主動回想，比一直重讀更有利於後續記憶 | 在重要章節之後安排短暫判斷練習 |
| **Universal Design for Learning（UDL）** | 提供多種理解與表達學習成果的方法 | 非工程師可用口頭、表格或操作任務證明理解 |

其中 [Merrill 的五項原則](https://doi.org/10.1007/BF02505024)出自 2002 年的教學設計研究；Biggs 的 Constructive Alignment 也有正式學術基礎。Gagné 的教學事件框架涵蓋回顧先備知識、實作、回饋與學習遷移。Retrieval Practice 的研究則說明，讓學員主動提取已學資訊有助於長期保留。

參考：[CAST UDL 3.0](https://udlguidelines.cast.org/)。

### 敘事、溝通與資訊組織 Pattern

這些比較接近製作方法，不應當成已證明適合所有教學情境的定律：

| Pattern | 核心結構 | 適合用在 |
|---|---|---|
| **SCQA** | Situation → Complication → Question → Answer | 整份簡報的開場與故事主線 |
| **Pyramid Principle** | 先結論，再支持理由與證據 | 總結頁、觀念說明、決策比較 |
| **MECE** | 分類盡可能不重疊、不遺漏 | 職能、狀態、Agent 數量等概念分類 |
| **Progressive Disclosure** | 逐步揭露資訊 | 交付流程、版本 A/B、WIP 與動畫 |
| **Story Spine／Running Example** | 一個案例持續推進 | #1／#2／#3 Matching App |
| **Problem → Solution → Evidence** | 先展示問題，再提供做法與驗證 | Dev、Review、QA、Human Gate |
| **Worked Example → Guided Practice → Independent Practice** | 示範、帶著做、自己做 | P39–44 → P83–84 → P88 |

以這門課而言，我最看重的組合是：

**Agent 101 建議教學循環（Merrill ＋ 漸進練習）**

1. **Problem｜遇到問題**：只說「支援配對」，每個人理解不一樣。
2. **Concept｜建立觀念**：Goal、Ticket、AC、版本與驗收責任。
3. **Demonstration｜看完整示範**：Version A 錯配 → 修正 → B 重測。
4. **Practice ＋ Feedback｜自己判斷**：重複 Like 尚未測，學員要求補驗。
5. **Transfer｜遷移到自己的工作**：寫出第一張真正能委託 Agent 的票。

這和 Merrill 的真實問題、示範、應用及整合原則相符。

## 五、教學類型投影片適用嗎？有什麼不同？

**適用，而且認知負荷、概念順序與視覺證據對初學者教材尤其重要。** 但我不會把商業簡報的所有規則直接套到 Workshop。

最大的差別是：商業簡報通常要求觀眾理解或接受一個主張；教學簡報還要讓學員**形成可以操作的能力**。

### 教學投影片要保留的四個特殊設計

**1. 不必每頁都先揭露答案。**

概念說明頁適合 Message Title，但問題導入頁可以用問句，練習頁則應先讓學員作答。

例如 P83「退回一次：證據不足時，要怎麼要求補驗？」本身就是合適的練習標題。如果改成「重複 Like 沒測，所以要退回補驗」，反而提前告訴學員答案。

**2. 同一概念可能需要不同頁面反覆出現。**

不是所有重複都是多餘。第一次介紹 AC、在 Matching 實例使用 AC、最後讓學員自己按 AC 驗收，這三次有不同的教學功能。

需要刪除的是無目的的重複，而不是有意義的練習與回顧。

**3. 對非工程師，要提供不依賴程式碼的理解路徑。**

P42、P81 的 runner、fixture 與檔案路徑是重要的真實材料，但學員必須先能回答：

「原本預期什麼？實際發生什麼？哪個條件沒有證據？」

這個問題應該不需要會 Python 才能回答。技術操作可作進階練習，基礎驗收則可以從可視化紀錄、對照表及明確的測試結果入手。[UDL](https://udlguidelines.cast.org/) 也鼓勵讓學員用不同方式參與與呈現能力。

**4. 每章都要有學習檢查與回饋，而不只是 Summary。**

建議利用現有頁面或講者停頓，讓學員回答一個跟該章能力有關的問題。例如學完多 Agent 之後，不是問「什麼是 Multi-Agent」，而是提供一張小票，請學員判斷是否真的需要兩個 Agent，並說明理由。

### 99 頁是不是太多？

不能只看頁數。這是完整課程、帶演練的教材，不是五分鐘產品發表。

但目前 **P50–76 的 Agent 演進段落就有 27 頁**。需要實際測量講授時間與學員是否跟得上，尤其是在 Session、Memory、Multi-Agent、Workflow、WIP 等概念連續出現的時候。

我的建議是先設計每章預期時間、提問與練習位置，再決定是否合併部分重複頁，而不是先要求強制縮成某個頁數。

## 六、我會怎麼處理 PR #49，以及建立長期標準？

目前 [README 的教材製作與 Review Principles](https://github.com/world4jason/Agent-101-deck/blob/4e04a1bfec1e6f85bd7ad4d8fb6adf1bff7e04d2/README.md) 已有 P1–P17 和 G1–G5，涵蓋故事板、證據、初學者審查、視覺及最終版本驗證。

我建議 **保留這套架構，不再發明第二套互相競爭的品質流程**，只增加教學簡報的 Editorial Rubric。

### 現在值得實際修改的標題

| 原 99 頁 | 現在 | 我建議 |
|---|---|---|
| P23 | Ready | Ready 代表需求已釐清，但還沒有開始實作 |
| P38 | PR Review | Reviewer 發現修改超出工作票範圍，要求退回 |
| P43 | QA / Verification | B 版補驗重複 Like 通過，但 UI 整合仍未驗 |
| P45 | Product / Goal Check | 單票通過驗收，不等於整體 Goal 已達成 |
| P73 | Bounded execution | Agent 只能處理已核准的範圍，超出就應停下 |
| P74 | Role separation | 一個 Agent 可以承擔多種職能，驗收責任仍要分清 |
| P75 | Independent verification | 驗收要依原需求與證據，不只相信產出者自述 |

這是示範性的 Editorial 改寫，不代表要在這個 PR 一次重寫全部 99 個標題。**P1 內容一致性先處理；整套 Title 改寫可以獨立排程，避免讓 PR #49 無限擴張。**

### 可以直接放進 README 的審查標準

| 檢查項 | 可操作的通過標準 |
|---|---|
| **Title–Content Alignment** | 標題主張與畫面證據一致，不能只靠講者額外解釋才成立 |
| **One Teaching Takeaway** | 能說出這頁主要想讓學員理解或完成哪件事 |
| **Prerequisite Check** | 沒有預設學員已理解未教過的術語或流程 |
| **Chapter Outcome** | 每章有可觀察的學習成果，而不只是主題名稱 |
| **Cognitive Load** | 工程追溯細節不干擾主要教學訊息 |
| **Practice Before Reveal** | 練習頁先讓學員思考、回答，再揭露解法與回饋 |
| **Cross-slide Consistency** | 流程名稱、狀態數量、案例版本、時間線與證據跨頁一致 |
| **Visual Accessibility** | 投影、桌面及目標裝置的文字、圖表、箭頭、對比能實際辨讀 |
| **Learning Transfer** | 學員能把 Matching 的方法用在自己的第一張 Ticket |

對現有 Quality Gates，可以這樣分工：

- **G1：** 增加 Chapter Outcome、Title–Content Alignment、先備知識檢查。
- **G3：** 盲審時除了指出不理解的頁面，也讓審查者嘗試完成指定任務。
- **G4：** 檢查標題／視覺證據、資訊層次及真實投影可讀性。
- **G5：** 分別記錄程式驗證、教材 Review、真人試教，不能互相代替。

### PR #49 的優先處理建議

**P1｜修正流程一致性後才能 Merge**

統一 Product／Goal Check 的正式名稱；把 P87 Human Gate 改成決策註記；同步所有流程圖、講者筆記、測試與故事板。P85 則聚焦「審查可以分工，但放行權仍在人」。

**P1｜在最新 HEAD 完成 G4／G5 複查**

PR 描述明確記錄：最新 HEAD 的 Web 視覺審查沒有完成最終判定，不能沿用前一版 READY。先完成受影響的 P25、P45、P85、P87、P99 桌面／投影／手機檢查，並覆核完整流程。

**P2｜建立教學簡報 Editorial 改版任務**

將 Assertion–Evidence、章節學習成果、漸進練習及 Title Rubric 納入後續改版；不要藉此推翻已完成的 99 頁結構。

我的這次審閱以最新 GitHub HTML 原始碼、故事板與現存驗證紀錄為依據；**沒有另外完成最新 HEAD 的實體投影、手機真機或真人初學者試教**。因此可以指出已確認的內容和流程問題，但不能宣稱最終視覺品質與學習成效已通過。

### 最終結論

目前 Agent 101 Deck 的問題，已經不主要是「知識點還缺什麼」。

接下來更重要的是從 **Content Complete** 進入 **Instructionally Effective**：

- 標題能不能說清楚這頁的重點？
- 圖與內文是否真的支持標題？
- 前後章節是否循序建立理解？
- 學員有沒有機會練習，而非只是看完？
- 最後能否獨立完成一張 Ticket 的交辦與驗收？

**PR #49 的主線我建議保留，先關閉現有 P1；長期則把 Assertion–Evidence、Backward Design、Merrill 和 Multimedia Learning 納入 README 的品質規範。** 這會比單純要求「更漂亮、更少字、更短」更有明確的研究依據與可驗收標準。

---

## 七、Owner 最新增量要求與實作對照（2026-10-09）

**新增規格：總共 8 張新的章節 Exit Check，非一張容納全部八個目標。** 每章一張、三個開放問題，各題先由學員口頭或書面作答，透過按鈕／展開元件顯示參考答案。

| 新頁 | 新 ID | 章節 | Exit Outcome |
|---:|---|---|---|
| 8 | A18 | 人類合作 | 能辨認職能、交付物與最後的接受責任 |
| 30 | A19 | 想法到 Ready | 能把模糊要求寫成有邊界、有 AC、有證據的可交辦 Ticket |
| 38 | A20 | 版本協作 | 能找到指定版本，分清 branch、commit、PR、merge 的用途 |
| 49 | A21 | 實作與驗收 | 能用 AC、候選版本和預期／實際結果判斷 PASS、FAIL、NOT RUN |
| 54 | A22 | 放行與完成 | 能區分單票驗收、人的放行、整體 Goal 成效 |
| 82 | A23 | Agent 演進 | 能分辨 Agent、Workflow、Session、WIP，判斷何時需要多 Agent |
| 95 | A24 | Agent 交付 | 能交辦一張票、辨認缺證據並要求補驗與接續 |
| 107 | A25 | 附錄 | 能按需要查找方法，分辨教學示意與真正驗證過的結果 |

新的 Q&A 原文、逐頁答案與講者筆記都在 [storyboard](https://github.com/world4jason/Agent-101-deck/blob/codex/issue-48/docs/issue48-execution-storyboard.md)，追蹤 Issue [#52](https://github.com/world4jason/Agent-101-deck/issues/52)。原 82 頁 rev11 SHA 保留、原 99 頁全部保留、新候選為 107 頁。**已執行的 Chrome／故事板／程式回歸僅能支持功能正確，不等於已完成真人初學者試教。**

### 工作拆票與待決／驗收

- [#50 P1：Human Gate 與 Check 狀態模型](https://github.com/world4jason/Agent-101-deck/issues/50)
- [#51 Editorial：標題與 Assertion–Evidence](https://github.com/world4jason/Agent-101-deck/issues/51)
- [#52 八張 Exit Checks＋24 題 Q&A](https://github.com/world4jason/Agent-101-deck/issues/52)
- [#53 P2：證據／術語分層](https://github.com/world4jason/Agent-101-deck/issues/53)
- [#54 教學示範 → 練習 → 遷移](https://github.com/world4jason/Agent-101-deck/issues/54)
- [#55 G4/G5＋真人試教](https://github.com/world4jason/Agent-101-deck/issues/55)

**Review 結論：COMMENT／NOT READY for merge，保留 P1。** 在 #50 問題修復並以最新 HEAD 進行 G4/G5 檢查前不建議直接合併。若 #52 相關新頁已完成工程測試，亦不得推論 P1 已關閉。
