# v6 Core 故事板與舊 31 頁去向

本文件只定義各頁要傳達的判斷、必須出現的內容或證據、取捨及呈現方式；**最終文案由 I4 #30 撰寫**。分類標在內容單元，不綁頁碼；Optional 可略過而不影響 Core，Appendix 是查閱材料。S0–S7 依 D5 固定排序。

舊頁標題與內容依 repo 的 [`slides/index.html`](../slides/index.html)（題目指定的 `d88eead` 舊版、共 31 頁）盤點。來源引用：issue body 連至 issue；留言一律標註匯出檔所示 GitHub 建立日（UTC）與留言標題，已知留言 URL 時直接連結，否則連到 issue。

## 1. 逐頁故事板

| 新頁 ID／順序 | 段落 | 主要判斷 | 必須出現的內容或證據 | 內容取捨與來源 | 預期呈現 | 分類（逐內容單元） | 待決問題 |
|---|---|---|---|---|---|---|---|
| S0-01 | S0 定位 | Agent 參與軟體工程流程，不能代替需求、責任與驗收。 | Core 單元：先理解產品工作如何流動，再看哪些可驗收工作能交給 Agent；不要求學員手寫程式，也不承諾本課能把學員變成後端工程師或半年後產品一定成功。 | [#3｜2026-09-29 UTC｜v5-review.6 Owner clarification: preserve software-engineering-first pedagogy](https://github.com/world4jason/Agent-101-deck/issues/3#issuecomment-5883625776)；[#16 §0](https://github.com/world4jason/Agent-101-deck/issues/16)；[#1｜2026-09-29 UTC｜總表｜v6 決議與 v5 舊票收斂](https://github.com/world4jason/Agent-101-deck/issues/1) | 主張卡＋簡短對照：軟工流程在前，Agent 在流程中承接工作。 | Core：課程定位。 | 無 |
| S0-02 | S0 定位 | 完成是有條件的交付狀態，流程遇到失敗或新資訊時有可追溯的返回路徑。 | Core 單元：需求／目標 → Issue／AC → 實作 → QA → Review → PO 在對應候選版本的驗收環境依 AC 接受 → 授權發布 → 上線後檢查 → Done；QA／Review 不通過回到修正；Blocked 記原因及下一位處理者；新需求交 PO 判斷是否另立 Issue。不得把 merge、Issue 自動關閉、部署或 Agent 自述直接當作 Done；可操作不代表產品目標已達成。 | [#16 §2](https://github.com/world4jason/Agent-101-deck/issues/16)；[#22｜2026-09-29 UTC｜修正 2｜PO 接受與 DoD 的時序](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5894079379)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5) | 一張主流程圖，標示退回、阻塞與另開需求的分支。 | Core：全貌與返回路徑。 | 無 |
| S1-01 | S1 軟工與角色 | 一個有前後端責任的 App 可讓學員看見軟體如何由多種責任共同交付。 | Core 單元：以簡化 Matching App 作概念 running example；使用「A 喜歡 B、B 也喜歡 A 才成立配對」呈現產品行為、介面、後端規則與資料；此處不實作完整會員／資料庫系統。Travel Lite 留到 S7；報名頁不作第三條主線。 | [#3｜2026-09-29 UTC｜v5-review.6 Owner clarification: preserve software-engineering-first pedagogy](https://github.com/world4jason/Agent-101-deck/issues/3#issuecomment-5883625776)；[#16 §1](https://github.com/world4jason/Agent-101-deck/issues/16) | 一個 Matching 情境＋簡化的前端／後端關係圖。 | Core：概念案例與範圍界線。 | 無 |
| S1-02 | S1 軟工與角色 | 角色代表不同責任視角，不代表必須有同名職位或一人一職。 | Core 單元：PO 判斷價值、目標與接受條件；Frontend 負責操作與呈現；Backend 負責身分、資料、API 與規則；QA 核對行為與失敗路徑；Reviewer 查變更、範圍與風險；Ops 關注發布、環境、運行與恢復。用同一 Matching 需求逐角色提問。PO、PM 與 Scrum Master 不當同義；本課不展開組織職稱安排。 | [#16 §1](https://github.com/world4jason/Agent-101-deck/issues/16)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5) | 六列責任表；逐列問「這是誰要回答的問題？」 | Core：六種責任與角色界線。 | 無 |
| S1-03 | S1 軟工與角色 | 可驗收工作採 Epic → Issue 兩層即可；Kanban 不規定工作項目格式。 | Core 單元：Matching Epic 下有可獨立驗收的 Issue；Goal 用一句情境說明為誰、為什麼；AC 寫可觀察情境（A/B/C）。GitHub Project 是整理／追蹤工件的地方，Epic 是本課選用的大工作分組，兩者不同。投影片須明講：「Kanban 本身不規定工作項目要長什麼樣子；User Story 起源於 XP，Scrum 與 Kanban 都不要求一定寫成 User Story。」主線不教額外工作項目層級或格式；User Story 詞條見 A1。 | [#21｜2026-09-29 UTC｜Owner 決議｜回應 Reviewer 補充](https://github.com/world4jason/Agent-101-deck/issues/21)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5) | Epic／Issue 樹＋一張含 Goal 和情境 AC 的示例卡；Project 與 Epic 並排對照。 | Core：工作拆解、Goal、AC、Project／Epic 界線及 User Story 界線句。Appendix：僅保留 User Story 詞條於 A1。 | 無 |
| S1-04 | S1 軟工與角色 | 本課選用 Kanban；Sprint 僅作方法對照，不是本課流程前置。 | Core 單元：一頁對照節奏、拉取方式與回饋機制；說清楚本課採持續流動的 Kanban，不教 Scrum 儀式。 | [#21｜2026-09-29 UTC｜Owner 決議｜回應 Reviewer 補充](https://github.com/world4jason/Agent-101-deck/issues/21)；[#25｜2026-09-29 UTC｜共識決議｜內容分 Core／Optional／Appendix](https://github.com/world4jason/Agent-101-deck/issues/25) | 單頁兩欄比較；不擴成方法論清單。 | Core：Sprint／Kanban 對照。 | 無 |
| S2-01 | S2 工作怎麼流動 | 一張 Issue 的目標、範圍、AC 與停止條件共同界定委派邊界。 | Core 單元：先由人與 Agent 釐清模糊要求，明確決定不做什麼，再整理成含 Goal、AC、Out-of-scope、Stop rule 的工作卡；AC 用情境描述，沒有核准的額外功能不能由執行者自行加入。教學約定可採一張可驗收卡配一個小 PR，但這不是 GitHub 限制。講師備註／不上主頁（由 I5 #31 承接）：調查卡以事先約定的問題、結論與依據判定完成，不必硬做產品 PR／Release。 | [#1](https://github.com/world4jason/Agent-101-deck/issues/1)；[#21｜2026-09-29 UTC｜Owner 決議｜回應 Reviewer 補充](https://github.com/world4jason/Agent-101-deck/issues/21)；[#23｜2026-09-29 UTC｜Owner 決議｜D3 三個用詞](https://github.com/world4jason/Agent-101-deck/issues/23)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5)；[#22｜2026-09-29 UTC｜修正｜D2 兩個邏輯矛盾](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5889373391) | Matching Issue 示例；圈出可執行範圍及必須停下詢問的情境。 | Core：工作卡與授權邊界。講師備註／不上主頁：調查卡例外由 I5 #31 承接。 | 無 |
| S2-02 | S2 工作怎麼流動 | AC 判斷單卡行為是否正確；DoD 判斷共通收尾條件是否全部完成。 | Core 單元：主頁兩問「做對了嗎？」（AC）／「收尾了嗎？」（DoD）；Done = AC 獲 PO 接受 ＋ DoD 四條全過。DoD 是團隊共用、需有證據的完成門檻：PR 審查通過且阻擋已處理；上線後基本操作檢查通過並附版本／操作證據；沒有超出核准範圍；受影響既有功能檢查通過並附證據。PO 接受前確認上線前 DoD 1、3、4；上線後補 DoD 2。三個反例：配對在 Agent 環境跑起來但 PR 沒審、沒上線；審查、發布與既有功能檢查都過，但 B 未 Like 就成立 Match；Agent 順手加聊天室等未核准功能，應 Request Changes，多做部分拆成新卡由 PO 決定是否做。Agent 特別容易順手；是否符合需求、scope 是否超出授權不能只靠自動檢查，須由 PO 與團隊共同核對。 | [#22｜2026-09-29 UTC｜修正｜D2 兩個邏輯矛盾](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5889373391)；[#22｜2026-09-29 UTC｜修正 2｜PO 接受與 DoD 的時序](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5894079379)；[#23｜2026-09-29 UTC｜同步修正｜依 #22 D2 修正](https://github.com/world4jason/Agent-101-deck/issues/23)；[#8｜2026-09-29 UTC｜v6-decision 對照｜本票原則保留、流程整合進 D2／D3；範圍分 Core／Advanced](https://github.com/world4jason/Agent-101-deck/issues/8) | AC／DoD 對照表＋三個反例卡；以兩問和 Done 算式收束。 | Core：AC／DoD 定義、四條 DoD、Done 算式、兩問與三個反例。 | 無 |
| S2-03 | S2 工作怎麼流動 | 驗收、接受、發布與上線後檢查是不同關卡，失敗須回到可修正的位置。 | Core 單元：用 Matching 例說明「先依 AC 驗收候選版本，再按授權發布」；AC 約定 → 實作 → QA（行為與失敗路徑；CI 只作一種證據）→ Review（diff、scope、風險）→ PO 在能對應候選版本的驗收環境依 AC 接受，並確認上線前 DoD 1、3、4 → 按授權發布 → 上線後完成 DoD 2 → Done。QA／Review 可依 AC／DoD 退回；PR 上 Comment 是意見／提問，Approve 是 Review 結論，Request Changes 要求修正；Review 核准不等於取得 merge 或上線授權。Merge／Issue 關閉不等於已交付；部署、對使用者開放與 GitHub Release 不畫成同義。基本操作可用不代表 AC 全過；可操作也不代表產品目標已達成，成果需另由目標訊號判斷（S4-04）。講師備註／不上主頁（由 I5 #31 承接）：一般概念是在發布前於能對應候選版本的驗收環境依 AC 接受；Travel Lite 使用學員自己的 GitHub Pages 練習站（只有學員自己看，沒有其他使用者需要保護；第一版從零做出，也沒有上線前後之分）作驗收環境，不用 PR preview；PR preview 於 Advanced #18 示範（Vercel 內建）。 | [#22｜2026-09-29 UTC｜修正 2｜PO 接受與 DoD 的時序](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5894079379)；[#22｜2026-09-29 UTC｜Owner 決議｜驗收環境：概念與做法分層](https://github.com/world4jason/Agent-101-deck/issues/22)；[#22｜2026-09-30 UTC｜Owner 決議](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5906900833)；[#18](https://github.com/world4jason/Agent-101-deck/issues/18)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5) | 階梯流程＋Comment、Approve、Request Changes 狀態區別及返回箭頭；以不同標籤標出驗收、核准、發布及上線檢查。 | Core：驗收階梯、Comment／Approve／Request Changes、QA／Review 界線與失敗返回。講師備註／不上主頁：Travel Lite Pages／Advanced PR preview 分流由 I5 #31 承接。 | 無 |
| S2-04 | S2 工作怎麼流動 | 證據只能證明其實際覆蓋的行為與版本，未執行或受阻不能算通過。 | Core 單元：每條 AC 附怎麼驗、預期與實際結果、PASS／FAIL／NOT RUN／BLOCKED、驗的是哪個版本與環境、可核對來源；Blocked 寫原因。驗收環境網址本身不等於版本證據，版本由 Agent 提供，學員能核對證據是否對應候選版本即可。互動問「這份證據證明什麼、不能證明什麼、還缺什麼？」並呈現測試沒跑卻報成功、驗收環境尚未反映修改、Review 發現測試被刪除／跳過／改弱。高風險資料、授權、付費或不可逆變更須具能力的技術審查；技術審查與風險接受是不同決定。 | [#8｜2026-09-29 UTC｜v6-decision 對照｜本票原則保留、流程整合進 D2／D3；範圍分 Core／Advanced](https://github.com/world4jason/Agent-101-deck/issues/8)；[#22｜2026-09-29 UTC｜修正 2｜PO 接受與 DoD 的時序](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5894079379)；[#16 §11](https://github.com/world4jason/Agent-101-deck/issues/16) | PR 證據卡片＋學員判斷題；反例必須可由連結／版本狀態查證。 | Core：證據狀態、版本對應、證據互動、測試完整性與求援門檻。Advanced：完整追溯表由 O1／進階教材承接；Matching 資料庫持久性反例見 S7-05。 | 無 |
| S2-05 | S2 工作怎麼流動 | 學員能詢問並核對版本狀態，不必背 Git 指令。 | Core 單元：共享檔案比喻含八個問句：「你改的是不是最新的正本？」「這次改了哪些地方？給我看差異。」「存版了嗎？有沒有還沒存的修改？」「上傳了嗎？」「審核連結給我。」「合併了嗎？」「上線的是哪一版？」「你實際操作過了嗎？」補充 Git 不會像 Google Docs 自動存版本、merge 後舊版仍留存；Git 是版本紀錄，GitHub 是本課共享／審查平台；上傳只含已存版修改。保留 changed ≠ committed ≠ pushed ≠ merged ≠ deployed ≠ verified；不教 staging 或 CLI。 | [#24｜2026-09-29 UTC｜Owner 決議｜回應 Reviewer Request Changes：加兩題、staging 不加](https://github.com/world4jason/Agent-101-deck/issues/24)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5) | 八列「比喻／狀態／問 Agent」表；學員須打開 Agent 提供的連結核對。 | Core：共享檔案比喻、八個核對問句、版本狀態界線。Optional／Advanced：`revert`／`rollback` 差異見 O1。 | 無 |
| S3-01 | S3 Kanban 共用協作面 | 看板讓人共享工作狀態，但需求、變更、證據與現行知識仍由相應工件承載。 | Core 單元：board 顯示工作、狀態、責任、阻礙及進入／拉取政策；看板＝狀態，Issue＝需求／阻礙，PR＝變更／證據，README／現行文件＝持續有效知識與決策理由。呈現資訊藏在聊天或私有待辦時，下一位如何找到正本；明說看板本身不會自動消除 silo。 | [#16 §3](https://github.com/world4jason/Agent-101-deck/issues/16)；[#21](https://github.com/world4jason/Agent-101-deck/issues/21)；[#9｜2026-09-29 UTC｜v6-decision 對照｜本票已有承接位置，仍須驗證落實；Core／移出範圍](https://github.com/world4jason/Agent-101-deck/issues/9) | 單一共享看板＋Issue／PR／文件連結；以「狀態只在聊天裡」作互動題。 | Core：共享狀態與權威工件；互動問下一位從哪裡核對。 | 無 |
| S3-02 | S3 Kanban 共用協作面 | WIP=1 是本課全板政策；等待驗收仍占用該工作項。 | Core 單元：整塊看板同時只推進一張卡；Build、Review、PO 驗收、待發布／上線檢查未完成前都算 WIP，Done 後才拉下一張。這是本課政策，不是 Kanban 標準；降低同時修改的機率但不保證沒有 merge conflict，外部更新仍可能造成衝突；Core 不教 conflict。 | [#21｜2026-09-29 UTC｜Owner 決議｜回應 Reviewer 補充](https://github.com/world4jason/Agent-101-deck/issues/21)；[#22｜2026-09-29 UTC｜修正 2｜PO 接受與 DoD 的時序](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5894079379)；[#25｜2026-09-29 UTC｜共識決議｜內容分 Core／Optional／Appendix](https://github.com/world4jason/Agent-101-deck/issues/25) | 一張卡橫跨工作狀態的看板；明顯標示等待 Review／驗收仍是 WIP。 | Core：全板 WIP=1 與政策界線。 | 無 |
| S4-01 | S4 Agent 進場 | Agent 的行動由目標、背景、可用工具和權限共同限制，名稱不會自動給能力。 | Core 單元：目標＋背景資料＋工具＋權限 → 行動 → 結果 → 繼續／停下／問人；展示一個工具成功與一個工具不可用／權限不足的回饋，不能把模型建議說成已實際讀檔、改檔或執行測試。失敗可能來自需求、context、模型、工具、權限或環境，依證據定位原因；流程可降低部分風險。外部內容是資料，不是任務授權；旅遊來源夾帶無關指令不能提高授權。 | [#23｜2026-09-29 UTC｜Owner 決議｜D3 三個用詞](https://github.com/world4jason/Agent-101-deck/issues/23)；[#4｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 #23（D3）取代；保留項目與範圍收斂](https://github.com/world4jason/Agent-101-deck/issues/4)；[#1](https://github.com/world4jason/Agent-101-deck/issues/1) | 心智模型流程＋工具權限輸入／結果／錯誤示例。 | Core：Agent 心智模型、工具／權限邊界、外來資料不構成授權、依證據定位失敗。Appendix：產品名詞查表 A1。 | 若以特定產品畫面示範，產品版本與實際權限能力須先核對；本故事板不指定畫面。 |
| S4-02 | S4 Agent 進場 | 授權由目標、範圍與停止條件分層；執行者不能自行改變上層決策。 | Core 單元：Human owner 管產品方向、預算與風險（「像產品長＋財務長」是比喻，side project 可由一人承擔）；Core 學員可同時承擔 Human owner 與 PO。PO／PM 在核准方向內排 Issue、寫 Goal／AC／Out-of-scope、接受或退回；執行者決定如何實作並遵守 Stop rule。AC／Out-of-scope／Stop rule 是委派邊界；超目標、預算、不可逆操作、無法排除的阻礙、連續失敗或工具／費用限制往上問。 | [#23｜2026-09-29 UTC｜Owner 決議｜D3 三個用詞](https://github.com/world4jason/Agent-101-deck/issues/23)；[#22｜2026-09-29 UTC｜修正 2｜PO 接受與 DoD 的時序](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5894079379) | 三層授權圖＋何時往上問的情境卡。 | Core：Human owner／PO-PM 授權層／執行者及停止邊界。 | 無 |
| S4-03 | S4 Agent 進場 | 可以更換工作執行者，不能把責任與產品決定隨職稱一起交走。 | Core 單元：先以「Agent 取代了誰？」提問，回答取代的是工作，不是責任；表格標題為「哪些工作可以交給 Agent？」、副標示原本責任角色。沿 S2 驗收階梯標出 Agent 可草擬 AC、實作、執行 QA、檢視 diff、整理證據、部署及執行上線後基本操作檢查；人依授權決定 AC、剩餘風險、產品接受、合併／發布，並決定是否上線、是否退回上一版。 | [#23｜2026-09-29 UTC｜Owner 決議｜D3 三個用詞](https://github.com/world4jason/Agent-101-deck/issues/23)；[#22｜2026-09-29 UTC｜修正 2｜PO 接受與 DoD 的時序](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5894079379)；[#1｜2026-09-29 UTC｜總表｜v6 決議與 v5 舊票收斂](https://github.com/world4jason/Agent-101-deck/issues/1) | 對齊 S2 驗收階梯的「Agent 可做／人必須決定」表。 | Core：工作承接對照與責任界線。 | 無 |
| S4-04 | S4 Agent 進場 | 重排要由新資訊觸發，並且仍服務已核准目標。 | Core 單元：目標要可量化；當下不易量化時至少有可觀察成功訊號。挑下一張卡前先說明它服務哪個已同意成果；不服務目標的候選工作留待排序或拒絕。AC 可過、但不服務已同意成果的候選工作，也要先判斷值不值得做。驗收結果、使用者回饋、阻礙或實際花費等新資訊可觸發重排；PO／PM 可在核准 Epic 範圍內重排、新增、拆分或移除未開始 Issue，留下理由；新增／移除 Epic、改產品目標或超預算須由 Human owner 重新批准並記錄理由。流程圖表明只調整尚未開始的卡，不藉重排繞過 WIP 政策。Advanced 的 PO／PM Agent 重排及上報示範由 #19 承接，見 O1。 | [#23 §4](https://github.com/world4jason/Agent-101-deck/issues/23)；[#9｜2026-09-29 UTC｜v6-decision 對照｜本票已有承接位置，仍須驗證落實；Core／移出範圍](https://github.com/world4jason/Agent-101-deck/issues/9) | 目標 → 新證據 → 排序理由 → 下一張 Ready 卡的循環圖。 | Core：可觀察成功訊號、先連回已同意成果、依證據重排與上報界線。Optional：Advanced PO／PM Agent 示範由 #19 承接；其他情境庫見 O1。 | 無 |
| S5-01 | S5 協作接手 | 人與 Agent 之間的交接都能從共享工件恢復，不依賴前一人的私有聊天。 | Core 單元：並列 Human↔Human、Human↔Agent、Agent↔Agent；三者共用 board、Issue／AC、PR／diff、測試證據及現行文件。下一站依當前 workflow policy，不規定 Dev→QA→Review 固定流水線；fresh session 可降低對作者摘要的依賴，但不保證獨立、無偏或找出所有錯誤。 | [#3](https://github.com/world4jason/Agent-101-deck/issues/3)；[#16 §5](https://github.com/world4jason/Agent-101-deck/issues/16)；[#4｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 #23（D3）取代；保留項目與範圍收斂](https://github.com/world4jason/Agent-101-deck/issues/4)；[#9｜2026-09-29 UTC｜v6-decision 對照｜本票已有承接位置，仍須驗證落實；Core／移出範圍](https://github.com/world4jason/Agent-101-deck/issues/9) | 同一張卡在三種協作關係間移交；標出共享輸入與證據。 | Core：三種協作關係與共用工件。 | 無 |
| S5-02 | S5 協作接手 | 流程 manager Agent 可依規則推動工作，但不能替人做產品決定。 | Core 單元：以前由人與既有流程角色透過分工、看板、會議和規範協調；現在可把推動流程、守 WIP、依 workflow policy 交接、核對 DoD 證據交給流程 manager Agent。用一張卡由 Ready 到 Done 示範；投影片三句界線逐句寫明：依外部證據推進（看板、Issue、PR、證據，不靠聊天記憶）；越權就問人（改目標、改優先序、產品接受、上線核准屬 PO／Human owner，品質不合格可由 QA／Reviewer 依 AC／DoD 退回）；完成要有證據。講師備註／不上主頁（由 I5 #31 承接）：流程 manager Agent 是協作安排，不是敏捷必要角色。 | [#26](https://github.com/world4jason/Agent-101-deck/issues/26)；[#1｜2026-09-29 UTC｜總表｜v6 決議與 v5 舊票收斂](https://github.com/world4jason/Agent-101-deck/issues/1)；[I5 #31 講師手冊](https://github.com/world4jason/Agent-101-deck/issues/31) | S5 收尾一頁：單卡流動＋三句界線（外部證據、越權問人、完成需證據）。 | Core：流程 manager Agent 概念與三句界線。講師備註／不上主頁：不是敏捷必要角色，由 I5 #31 承接。 | Optional／Advanced 示範位置待決；本頁只列已定的 Core 概念。 |
| S6-01 | S6 Context 與交接 | Context、session、compact、handoff 各自解決不同問題，沒有任何一項等於永久記憶。 | Core 單元：context 是本次可用背景；session 是一次互動／工作狀態；compact 可能遺失細節、不擴大 context，也不替代持久紀錄；handoff 是可核對的狀態快照。檔案存在不代表本次已讀，新視窗不會自動知道全部。可沿用同一 session 修正，不規定一張卡一個 session；fresh session 不是天然獨立。需要框架參照時，只指向 Appendix A2 的 BMAD／LongHorizon 對照，不作 Core 前置。 | [#16 §6](https://github.com/world4jason/Agent-101-deck/issues/16)；[#9｜2026-09-29 UTC｜v6-decision 對照｜本票已有承接位置，仍須驗證落實；Core／移出範圍](https://github.com/world4jason/Agent-101-deck/issues/9)；[#4｜2026-09-29 UTC｜共識決議｜BMAD／LongHorizon 放 Appendix](https://github.com/world4jason/Agent-101-deck/issues/4) | 四概念對照＋compact 遺漏細節後回查外部證據的反例；框架只留非必要查閱提示。 | Core：context／session／compact／handoff 界線及「檔案存在不代表本次已讀」提醒。Appendix：產品特定載入規則見 A1；A2 非前置。 | 無 |
| S6-02 | S6 Context 與交接 | 狀態資訊各有正本與更新責任；handoff 只摘要並連回正本。 | Core 單元：看板存狀態；Issue 存需求／阻礙；PR 存這次改動、理由與證據；README／現行文件存持續有效知識與決策理由。標出誰更新哪個正本。handoff 只保留目標／Issue、目前版本與未存修改、已做／未做／失敗／未測／阻擋、證據、下一個安全步驟及來源連結，不另造互相矛盾的權威文件。開工先核對並接續未完成卡；沒有進行中卡才拉 Ready 卡。保存進度 ≠ Done，仍須走完適用的驗收、授權上線及上線後檢查。 | [#9｜2026-09-29 UTC｜v6-decision 對照｜本票已有承接位置，仍須驗證落實；Core／移出範圍](https://github.com/world4jason/Agent-101-deck/issues/9)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5) | 「狀態正本」對照表＋短 handoff 範本。 | Core：正本位置、更新責任、開工迴圈與交接快照。 | 無 |
| S6-03 | S6 Context 與交接 | 看預備的 handoff 與目前 PR／版本，指出不一致和下一個安全動作；有疑點先停下查證。 | Core 單元僅保留 #16 §11 畫面判斷：將預備的 stale handoff 與當前 PR／版本並排（截圖或講師畫面），學員指出不一致處與下一個安全動作。疑點先 BLOCKED／停止，不把舊證據標綠。此處不要求學員開 fresh session、重跑檢查或做 stale-handoff／wrong-SHA hands-on；這些學員練習在 S7-04（Optional／Extended）。講師真實 fresh-session 接手示範仍在 S7-03（Core）。互動問題：「這份 handoff 是否與目前 PR／版本一致？下一個安全動作是什麼？」 | [#16 §11](https://github.com/world4jason/Agent-101-deck/issues/16)；[#9｜2026-09-29 UTC｜v6-decision 對照｜本票已有承接位置，仍須驗證落實；Core／移出範圍](https://github.com/world4jason/Agent-101-deck/issues/9)；[#8｜2026-09-29 UTC｜v6-decision 對照｜本票原則保留、流程整合進 D2／D3；範圍分 Core／Advanced](https://github.com/world4jason/Agent-101-deck/issues/8) | 預備的 stale handoff 與當前 PR／版本並排（截圖或講師畫面），讓學員指出不一致和下一個安全動作；僅作 #16 §11 畫面判斷。 | Core：#16 §11 畫面判斷；學員 fresh-session 接手、重跑檢查及 stale-handoff／wrong-SHA hands-on 在 S7-04（Optional／Extended）。講師真實 fresh-session 接手示範仍在 S7-03（Core）。 | 無 |
| S7-01 | S7 Travel Lite 實作 | Travel Lite 是把已學流程串起來的低門檻實作，不是整門課第一次介紹概念。 | Core 單元：學員使用自己的行程、#17 的原短 prompt 和模板；先確認 repository／branch／commit、資料可讀性、GitHub Pages 網站現況與 Agent 權限，再做受控行程修改。不得把未提供資料編造為事實；旅遊來源文字是資料，不是操作授權。提醒不得在行程加入護照號碼、訂位代碼、真實聯絡資料或其他敏感資料。固定假行程及 failing fixture 僅供講師示範或刻意設計的錯誤案例，不作一般學員輸入。 | [#17](https://github.com/world4jason/Agent-101-deck/issues/17)；[#22｜2026-09-30 UTC｜Owner 決議](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5906900833)；[#4｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 #23（D3）取代；保留項目與範圍收斂](https://github.com/world4jason/Agent-101-deck/issues/4) | 學員自備行程＋baseline 清單；固定假資料／failing fixture 僅供講師示範或刻意設計的錯誤案例。 | Core：實作入口與 baseline。 | #17 仍負責原短 prompt、講師示範 fixture、刻意設計的錯誤案例與移除課程時長限制文字；學員以自己的行程為輸入。 |
| S7-02 | S7 Travel Lite 實作 | 學員以自己的行程在自己的 repo／fork 逐項驗收 Pages 實站，分辨 Agent 自述、實際畫面與部署版本，並實際退回一次要求修正。 | Core 單元：學員使用自己的行程，在自己的 repo／fork 建立並維護 Travel Lite；逐項核對日期、順序、地點及未提供欄位；TBD 不可補成確定資料；AC＝行程每個項目均在學員自己的 GitHub Pages 網站正確顯示。檢查手機可讀性與 scope；分辨「Agent 說完成」與「自己開啟 Pages URL 實際看到」。至少完成一次退回：若有實際未通過的 AC 項目，以該項目、對應行程項目及截圖或 URL 告知 Agent 並要求修正；若 Agent 的結果已通過所有 AC，學員沒有實際可退回的項目，則改由學員針對 I7 #35 demo pack 中講師設計的錯誤案例完成一次必要退回；退回不要求 PR；若修正以 PR 提交，則在該 PR 使用 Request Changes。首版存在後的修正回合，實際回歸檢查至少一項受影響的既有功能仍可用，並附操作證據（DoD 4）。核對 diff 與變更檔案清單，確認不含 token、憑證或敏感資料，且沒有超出核准範圍的檔案。修正後重查。Pages 部署可能延遲；沿用 D4 問句「上線的是哪一版？」：請 Agent 提供 publishing source branch、該 branch 最新 commit、`github-pages` deployment commit 與狀態（附 commit 頁及 deployment 頁連結）、Pages URL，以及此版畫面變更的白話清單（或明確表示沒有）。學員開啟連結確認 commit 相符且 deployment 成功，再強制重新載入（或用無痕視窗）實際網站並核對畫面變更；commit 相符本身不證明瀏覽器已顯示該版本。 | [#17](https://github.com/world4jason/Agent-101-deck/issues/17)；[#22｜2026-09-30 UTC｜Owner 決議](https://github.com/world4jason/Agent-101-deck/issues/22#issuecomment-5906900833)；[#29｜2026-09-30 UTC｜I3 結果](https://github.com/world4jason/Agent-101-deck/issues/29#issuecomment-5907265647)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5)；[#8｜2026-09-29 UTC｜v6-decision 對照｜本票原則保留、流程整合進 D2／D3；範圍分 Core／Advanced](https://github.com/world4jason/Agent-101-deck/issues/8)；[#16 §11](https://github.com/world4jason/Agent-101-deck/issues/16) | 學員逐項對照個人行程與實際 Pages 網站，核對 I3 版本證據；至少完成一次退回：以失敗 AC 項目、行程項目與截圖或 URL 告知 Agent 並要求修正；若 Agent 結果已通過所有 AC、學員沒有實際可退回的項目，則改由學員針對 I7 #35 demo pack 中講師設計的錯誤案例完成一次必要退回；有 PR 才於該 PR 按 Request Changes，修正後重查。 | Core：行程逐項驗收、Agent 自述與實際畫面區分、I3 版本核對、實際退回與錯誤修正、DoD 4 回歸檢查及變更範圍／敏感資料檢查。 | 學員以自己的行程及 repo／fork 為輸入；固定假行程／failing fixture 僅供講師示範或刻意設計的錯誤案例；Pages 版本核對依 #29 I3 結果。 |
| S7-03 | S7 Travel Lite 實作 | 工具／權限不足時，學員實際停止並填 handoff；講師示範真實 fresh-session 接手。 | Core 單元：學員遇到權限不足或必要工具不可用時，實際停止、標記 BLOCKED，不放寬權限、不假稱完成，並填寫 handoff：未完成項、原因、目前正本／版本與證據連結、下一個安全步驟。阻礙解除且工具／權限可用後，接續與驗證由講師在示範中依核准範圍執行；學員自行接手見 S7-04。講師另實際開啟一個全新的 session 示範接手一次，至少包含：核對當前狀態；找出一項已過期或需重新確認的 handoff 項目；安全接續；完成後驗證。 | [#9｜2026-09-29 UTC｜v6-decision 對照｜本票已有承接位置，仍須驗證落實；Core／移出範圍](https://github.com/world4jason/Agent-101-deck/issues/9)；[#17｜2026-09-29 UTC｜共識決議同步](https://github.com/world4jason/Agent-101-deck/issues/17)；[三方共識｜2026-09-30 UTC](https://github.com/world4jason/Agent-101-deck/issues/28#issuecomment-5904831574) | 學員遇真實阻擋 → 停止並填 handoff；講師用真實 fresh session 示範核對狀態 → 找出過期／需確認項 → 接續 → 驗證。 | Core：學員實際阻擋、停止與 handoff；講師真實 fresh-session 接手示範。 | #17 負責講師示範 fixture 與刻意設計的錯誤案例；真實阻擋依本頁停止與 handoff 流程處理。 |
| S7-04 | S7 Travel Lite 延伸練習 | 學員可自行練習 fresh-session 接手與狀態轉移，但這些練習不是 Core 前置。 | Optional／Extended 單元，可在課內略過：學員自行以 fresh session 接手；stale handoff／wrong-SHA 練習；Round 4 transfer task。跳過本頁不影響任何 Core 頁。 | [三方共識｜2026-09-30 UTC](https://github.com/world4jason/Agent-101-deck/issues/28#issuecomment-5904831574) | Extended 練習卡；標示可略過，且不作任何 Core 頁的前置。 | Optional／Extended：學員自行 fresh-session 接手、stale handoff／wrong-SHA 練習與 Round 4 transfer task；不作 Core 前置。 | 無 |
| S7-05 | S7 進階預告 | Travel Lite 的靜態案例不涵蓋共用資料與跨使用者授權；進階延續同一協作流程而增加後端證據。 | Optional 單元：Matching 進階預告含 Frontend、Backend、Auth、shared DB、後端規則與 A/B/C 權限情境；可用「介面顯示成功但 DB 未保存」作進階驗收反例。PR preview 於 Advanced #18 以 Vercel 內建功能示範，Travel Lite 不使用。說明它是另一學習路徑，不是 Core hands-on 的前置，也不宣稱已有可公開服務。 | [#3](https://github.com/world4jason/Agent-101-deck/issues/3)；[#8｜2026-09-29 UTC｜v6-decision 對照｜本票原則保留、流程整合進 D2／D3；範圍分 Core／Advanced](https://github.com/world4jason/Agent-101-deck/issues/8)；[#10｜2026-09-29 UTC｜v5-review.3｜進階案例候選：從旅遊靜態網站，走到會員＋共用 DB＋雙向配對的全端 App](https://github.com/world4jason/Agent-101-deck/issues/10#issuecomment-5883216181)；[#18](https://github.com/world4jason/Agent-101-deck/issues/18) | 一頁「今日 Travel Lite／進階 Matching」範圍對照；只預告能力，不講實作細節。 | Optional：Advanced Matching 預告；跳過不影響任何 Core 頁。 | 無 |
| O1 | 補充：產品維護能力路徑 | 產品能力以可觀察 gate 和實際證據呈現，不用一條路線或一個案例冒充營運成果。 | Optional 單元：區分 POC、MVP、可持續產品；「用 Agent 開發」不等於「產品內含 Agent」；六個月不是 MVP 定義，能力 gate 可交錯達成而非六個月進度表。列 L1–L6 能力及證據：交付單卡；有既有資料下相容改版與回歸；分開驗部署回復和資料還原；故障注入、可操作警報、恢復與回歸；依使用者回饋／成本／風險重排並記理由；陌生 session 依現行文件接手。現行文件從第一級持續維護。半年維運只作 evidence claim：須有實際時間跨度、版本、事件與使用者結果；加速演練不能冒充。保留假／正式資料分離、secret 不進聊天／repo／log／截圖、開發權限最小化。區分程式 revert、部署 rollback、資料 restore 或 roll-forward，彼此不可互相替代。情境庫列 schema、Auth／設定、壞部署、依賴、額度／成本、回饋回到 backlog；D3 的 Advanced PO／PM Agent 重排與上報示範由 #19 承接，其他情境由 Advanced 視需要挑選；均非 Core 要求。 | [#10｜2026-09-29 UTC｜共識決議｜#10 重新定位為「長期產品能力 roadmap＋情境庫」](https://github.com/world4jason/Agent-101-deck/issues/10)；[#23 §4](https://github.com/world4jason/Agent-101-deck/issues/23)；[#24｜2026-09-29 UTC｜Owner 決議｜回應 Reviewer Request Changes：加兩題、staging 不加](https://github.com/world4jason/Agent-101-deck/issues/24) | Optional 能力階梯＋情境索引；各 gate 附可觀察工件例。 | Optional：產品維護能力與情境庫。Advanced：PR preview 於 #18 以 Vercel 內建功能示範；PO／PM Agent 重排由 #19 承接，其他實際情境由 #18／#19 按範圍選取。 | #19 或後續課程要選用哪些其他情境尚未決定；本頁只保留已核准的候選庫與 gate。 |
| A1 | Appendix 詞彙查表 | 工具名詞需按實際能力、授權與產品版本區分，不能把名稱當能力或必備元件。 | Appendix 單元：LLM／Agent／workflow、Tool／執行環境、Connector、MCP、Plugin、Skill、RAG、context／session／專案指令載入；區分 Tool 是動作、Connector 是產品服務連接、MCP 是互通協定、Plugin 是產品擴充封裝、Skill 是程序／指引資源、RAG 是檢索方式。工作項目詞條含 Ticket（泛稱工作項目）、Issue（需求／阻礙工件）、PR（待審查的變更與證據）、Release（對使用者交付；與部署、對使用者開放及 GitHub Release 區分）；另列 Comment、Approve、Request Changes 的 review 意義。User Story 只留一個詞條：「一種需求描述方式」。另補 PM、Scrum Master 與 PO 的責任界線，以及 PM 在不同組織語境可能指涉不同職能。本表非 Core 前置；示範產品的支援與版本需另核對。 | [#4｜2026-09-29 UTC｜共識決議｜BMAD／LongHorizon 放 Appendix](https://github.com/world4jason/Agent-101-deck/issues/4)；[#21｜2026-09-29 UTC｜Owner 決議｜回應 Reviewer 補充](https://github.com/world4jason/Agent-101-deck/issues/21)；[#5｜2026-09-29 UTC｜v6-decision 對照｜本票部分被 D1／D2／D4 取代；保留項目改寫](https://github.com/world4jason/Agent-101-deck/issues/5) | 單頁查表；只作參照，不把所有名詞塞回 Core 主線。 | Appendix：工具／Agent 與 Ticket／Issue／PR／Release／User Story 等詞條。 | 若 I4 要放產品特定載入／權限畫面，須選定示範版本並核對；本稿不替其選型。 |
| A2 | Appendix 框架對照 | 框架是特定做法的參照，不能當成 Core 必備前提或互相等價的產品。 | Appendix 單元：分別列 BMAD 與 LongHorizon 的原始來源、查閱版本及各自處理問題；比較由作者明確標示為分析，不冒充共同標準。Core 只在 S6 提供非必要的查閱指引；跨 session 協作不需先採用其中任一框架。 | [#4｜2026-09-29 UTC｜共識決議｜BMAD／LongHorizon 放 Appendix](https://github.com/world4jason/Agent-101-deck/issues/4)；[#9｜2026-09-29 UTC｜共識決議同步](https://github.com/world4jason/Agent-101-deck/issues/9) | 兩欄比較＋來源／版本欄；附「非必讀」標籤。 | Appendix：BMAD／LongHorizon 對照。 | 使用的實際來源版本在 I4 編寫附錄時核對；內容位置已決議。 |

## 2. 決議 → 頁 ID 覆蓋

| 決議 | 已決定的項目 | 對應頁 ID |
|---|---|---|
| D1／#21 | Epic → Issue 兩層；Goal 情境與情境 AC；Core 明講 Kanban／User Story 界線句；A1 只留 User Story 詞條；Project ≠ Epic | S1-03、A1 |
| D1／#21 | Sprint／Kanban 對照；本課採 Kanban；全板 WIP=1，等待 Review／驗收也計入；WIP=1 不保證技術上沒有衝突 | S1-04、S3-02 |
| D2／#22 | AC 與 DoD 定義、主頁兩問、Done 算式；本課 DoD 四條；三反例含 scope creep | S2-02 |
| D2／#22 | 驗收階梯、候選版本驗收環境、PO 接受與發布次序、QA／CI／Review 分工；基本操作可用不代表 AC 全過；上線後 DoD、返回修正 | S0-02、S2-03 |
| D2／#22 | 逐 AC 證據、未執行與受阻狀態；Review 檢查測試是否被刪除／弱化 | S2-04 |
| D2／#22 | 版本／環境對照 | S2-04、S7-02 |
| D3／#23 | Agent 心智模型；工具／權限與角色名稱的差別 | S4-01 |
| D3／#23 | Human owner → PO／PM → 執行者；授權邊界、越權上報 | S4-02 |
| D3／#23 | 「Agent 取代了誰？」作開場，回答取代工作而非責任；依驗收階梯列出哪些工作可交給 Agent | S4-03 |
| D3／#23 | 可量化目標或可觀察成功訊號；先連回已同意成果；新資訊觸發重排並留下理由；目標／預算／Epic 變更往上問 | S4-04、O1／#19（Advanced 示範） |
| D3／#23 | Advanced PO／PM Agent 重排與上報示範 | O1／#19（Advanced；非 Core 前置） |
| D4／#24 | 共享檔案比喻與八個核對問句；區分 changed／committed／pushed／merged／deployed／verified | S2-05 |
| D4／#24 | 不教 CLI／staging；覆蓋前確認正本最新；給可核對差異；revert／rollback 與資料恢復移至進階路徑 | S2-05、O1 |
| D5／#25 | 固定 S0–S7 順序；各內容單元分 Core／Optional／Appendix；Optional 不作 Core 前置 | S0-01–S7-05、O1、A1–A2 |
| D6／#26 | 流程 manager Agent 位於 S5 收尾；單卡依 workflow policy 推進；看 DoD 證據、守 WIP、越權問人；「不是敏捷必要角色」為講師備註／不上主頁，由 I5 #31 承接 | S5-02 |
| #28 三方共識 | Travel Lite 阻擋時學員實際停止並填 handoff；S6-03 Core 僅作 #16 §11 預備 stale handoff 與當前 PR／版本的畫面判斷；講師於 S7-03 示範真實 fresh-session 接手與驗證；學員 fresh-session 接手、stale handoff／wrong-SHA hands-on 與 Round 4 transfer task 為 Optional／Extended | S6-03、S7-03、S7-04 |

## 3. #16 §11 互動點與 #4／#5／#8／#9 Core 項目落點

### #16 §11 五個互動點

| 互動點 | 落點 | 學員要做的判斷 |
|---|---|---|
| Human workflow：這是 PO、FE、BE 或 QA 的哪種問題？ | S1-02 | 依責任而非職稱猜下一步。 |
| PR 證據能證明與不能證明什麼？ | S2-04 | 指出缺少的版本、操作或檢查證據。 |
| 狀態只在 Slack／Chat 時下一位從哪裡知道？ | S3-01 | 找出看板及權威工件位置。 |
| Stale handoff 與 repo／PR 不一致時怎麼辦？ | S6-03 | 看預備的 stale handoff 與當前 PR／版本並排（截圖或講師畫面），指出不一致與下一個安全動作；僅作畫面判斷，不要求學員開 fresh session 或重跑檢查。學員 fresh-session 接手及 stale-handoff／wrong-SHA hands-on 在 S7-04（Optional／Extended）；講師真實 fresh-session 示範在 S7-03（Core）。 |
| Hands-on 實際退回一次；有 PR 才使用 Request Changes；阻擋時停止並填 handoff | S7-02、S7-03 | S7-02：以未通過的 AC 項目、對應行程項目及截圖或 URL 告知 Agent 並要求修正一次；若 Agent 的結果已通過所有 AC、學員沒有實際可退回的項目，則改由學員針對 I7 #35 demo pack 中講師設計的錯誤案例完成一次必要退回；退回不要求 PR，若修正以 PR 提交才在該 PR 按 Request Changes。S7-03：權限不足或必要工具不可用時停止並填 handoff。 |

### #4 closure Core

- 回答 code ≠ 實際改檔 ≠ 實際跑測試：S4-01。
- 工具／權限不足要停止並回報；工具取得的來源文字是資料，不是授權：S4-01、S7-03。
- 多角色或 fresh session 不保證統計獨立或抓出錯誤：S5-01、S6-01。
- BMAD／LongHorizon 不進 Core；對照在 A2，S6-01 Core 只留非必要查閱指引。

### #5 closure Core

- PO、PM、Scrum Master 的責任不混用：S1-02、S4-02；Project 與 Epic 不等同：S1-03。
- 一卡一小 PR 是教學約定，不是平台限制；調查卡可用結論與依據完成：S2-01。
- Comment 留言、Approve 審查結論、Request Changes 要求修正各有不同意義；Review 核准不等於可 merge／發布；Issue 關閉或 merge 不等於已交付；QA 不只是執行測試：S0-02、S2-03。
- Git 與 GitHub、已存版與未存版、發布與部署的必要界線：S2-03、S2-05。
- 驗證失敗回修、Blocked 記原因與處理者、核准的新需求另開卡：S0-02、S2-03、S3-01。

### #8 closure Core

- PASS／FAIL／NOT RUN／BLOCKED，逐 AC 的方法、預期／實際、版本／環境及證據：S2-04。
- 測試沒跑卻稱成功、驗收環境尚未反映修改、測試遭刪除／弱化：S2-04。
- 受影響既有功能實際回歸一次：S2-02；Travel Lite 首版存在後的修正回合（DoD 4）：S7-02。
- 高風險技術審查與剩餘風險接受分開；尋求具能力的人及授權者：S2-04、S4-02。
- Fresh context 不等於獨立：S5-01、S6-01。畫面成功但資料未保存移進階 Matching：S7-05、O1，不作 Core 前置。

### #9 closure Core

- 目標判斷與停止條件：S2-01、S4-02、S4-04。
- 正本位置、更新責任、短 handoff、開工迴圈（先接續未完成卡；沒有進行中卡才拉 Ready）與核對後續動作：S6-01–S6-03。
- 同一張卡可在同一 session 修正，不強制一卡一 session；fresh session 仍須回到正本核對版本和未存修改。S6-03 以預備畫面判斷差異與下一個安全動作，不要求學員實際開新 session 或重跑檢查：S6-01、S6-03。
- 工具／權限不足時，學員在 Travel Lite 實際停止並填 handoff；講師以真實 fresh session 示範核對當前狀態、找出過期或需重新確認項、接續及驗證：S7-03。學員自行 fresh-session 接手、stale handoff／wrong-SHA 練習及 Round 4 transfer task 為 Optional／Extended：S7-04；依三方共識決議，不作 Core 前置。
- 轉移練習的學習 gate 由 #12 負責，#17／#19 僅提供題目素材；不列為 Core 前置：[#9｜2026-09-29 UTC｜共識決議同步](https://github.com/world4jason/Agent-101-deck/issues/9)；[#12](https://github.com/world4jason/Agent-101-deck/issues/12)。

## 4. 舊 31 頁去向

`合併` 表示原頁目的改由新版一頁或多頁承接；`刪` 表示原例子／主張不再保留，理由列明概念的承接位置。頁名依 [`slides/index.html`](../slides/index.html) 的 h1／h2 標題。

| 舊頁 | 舊頁標題 | 去向 | 新頁 ID | 理由（刪除項說明概念保存位置） |
|---:|---|---|---|---|
| 1 | Agent 教學，其實是軟工流程教學 | 合併 | S0-01 | 保留軟工流程為主軸，重寫為 Agent 是其中的執行者／協作者。 |
| 2 | 不要先問「Agent 怎麼變強」；先問流程怎麼不失控 | 合併 | S0-01、S4-01 | 保留流程優先及工具／權限邊界；移除舊版把問題歸因為流程缺口的暗示。 |
| 3 | 4 個問題，串成一條完整工作流 | 合併 | S0-02 | 以核准的 S0–S7 敘事及 D2 返回路徑取代舊四段地圖。 |
| 4 | 一個需求，怎麼變成軟體？ | 合併 | S1-01 | 作為進入人類軟工內容的轉場；不另留重複章節頁。 |
| 5 | 把軟體專案想成「辦一場讀書會」 | 刪 | S0-02、S2-02、S2-04 | 讀書會生活比喻不再作 running example；需求→工件→證據→交付檢查概念由全貌、AC／DoD 與證據頁承接。 |
| 6 | 一個需求到上線，會走同一條線 | 合併 | S0-02、S2-03 | 保留流程圖，補上接受、授權發布、上線後檢查及退回／阻塞分支。 |
| 7 | 同一個需求，會被不同角色用不同角度看 | 合併 | S1-01、S1-02 | 以 Matching 例重編 PO／Frontend／Backend／QA／Reviewer／Ops 責任。 |
| 8 | Ticket、Issue、PR、Release 到底是什麼？ | 合併 | S1-03、S2-03、S2-05、A1 | 工作卡及 Release 界線留在主線；Ticket、Issue、PR、Release 詞條列於 A1。 |
| 9 | 怎麼把需求寫成可以開工的工作？ | 合併 | S2-01 | 轉場與內容由 Goal／AC／Out-of-scope／Stop rule 頁承接。 |
| 10 | 從一個模糊需求開始：活動報名頁 | 刪 | S1-01、S2-01 | 報名頁不作第三主案例；人與 Agent 先釐清需求、決定不做什麼，再把 Goal／AC／Out-of-scope／Stop rule 整理成 Matching 工作卡。 |
| 11 | 大到一張卡講不清楚，再往上分組 | 合併 | S1-03 | 改成 Epic → Issue；移除 Project/Epic 混用、Checklist/Story 階層及一卡一 branch 的普遍化。 |
| 12 | 活動報名頁要不要拆 Project / Issue？ | 合併 | S1-03 | 以 Matching Epic 與情境 AC Issue 取代報名頁分組案例；保留 Project 與 Epic 不同的界線。 |
| 13 | Story 不是階級，是一種寫需求的方法 | 移 Appendix | A1 | Story 格式與階層不進主線；S1-03 依 #21 明講 Kanban／User Story 界線句，A1 只留 User Story 詞條。 |
| 14 | 一張好 Issue，比一段聰明 prompt 更重要 | 合併 | S2-01 | 保留 Goal、範圍、AC、證據及 Stop rule，收斂成授權邊界。 |
| 15 | Issue #12：手機版報名表單送出與驗證 | 刪 | S1-01、S2-01、S2-04、S7-02 | 報名欄位、email 規則與畫面不再保留；單卡目標／非目標由 Matching Issue 承接，情境驗收與失敗修正由 Travel Lite 承接。 |
| 16 | 一張 Issue，怎麼安全走到上線？ | 合併 | S2-03 | 轉場併入 D2 驗收階梯。 |
| 17 | 一張 Issue 從左走到右；初學先 WIP = 1 | 合併 | S3-01、S3-02 | 改為共享協作面、全板 WIP=1；明示等待驗收仍占 WIP，且不保證技術上不會衝突。 |
| 18 | Git 只先懂 4 個字：Repo、Branch、Commit、Push | 合併 | S2-05 | 以八個狀態核對問句取代背術語／指令。 |
| 19 | Issue #12 對一個 branch，最後變成一個 PR | 刪 | S2-01、S2-05 | 不把一卡一卡 branch／PR 說成工具規則；一個小 PR 可作課程約定，狀態關係由問句表保存。 |
| 20 | PR #34：完成手機版報名表單 | 合併 | S2-04、S7-02 | 移植「AC 有一項失敗就退回」教學效果；S7-02 由學員以失敗 AC 項目、行程項目及截圖或 URL 告知 Agent 並要求修正一次承接；若 Agent 的結果已通過所有 AC、學員沒有實際可退回的項目，則改由學員針對 I7 #35 demo pack 中講師設計的錯誤案例完成一次必要退回；修正以 PR 提交時才在該 PR 使用 Request Changes。改用可核對的 Travel Lite 證據。 |
| 21 | Comment、Approve、Request Changes：意思完全不同 | 合併 | S2-03、S2-04 | 保留意見、審查、退回的差別；修正為 Review 核准不自動授權 merge／發布。 |
| 22 | QA、Review、Merge、Release 是不同關卡 | 合併 | S2-02、S2-03 | 由 AC／DoD 與修正版驗收階梯承接；QA 兼含行為及失敗路徑。 |
| 23 | Release 後不是結束：要確認真的在真實環境可用 | 合併 | S2-02、S2-03、O1 | 上線後基本操作與既有功能檢查留 Core；監控、警報、恢復及情境庫移 Optional。 |
| 24 | 哪些工作，可以交給 Agent？ | 合併 | S4-01、S4-03 | 轉場放在已教完人類責任後；補心智模型與能力限制。 |
| 25 | BMAD / LongHorizon 這類方法，本質都在補「流程缺口」 | 移 Appendix | A2 | 不保留未經證實的共同本質判斷；框架對照移 Appendix，各自標來源並區分用途。 |
| 26 | Agent 能取代的是「可驗收任務」，不是責任本身 | 合併 | S4-02、S4-03 | 以 D3 授權層與沿驗收階梯的「哪些工作可交給 Agent」取代表格；保留工作可換、責任仍在的判斷。 |
| 27 | 同一張 Kanban，只是角色換成 Agent | 合併 | S3-01、S5-01、S5-02 | 共用狀態與人／Agent 接手均保留；不畫成固定 Agent 流水線，並補流程 manager Agent 界線。 |
| 28 | 同一個需求，分三輪交給 Agent | 刪 | S4-03、S4-04、S5-01 | PO／Dev／QA 三輪職稱式委派不再當固定做法；可委派工作、依新資訊重排及共享工件接手概念分別保存在對應頁。 |
| 29 | Agent 失控通常不是模型爛，是流程缺洞 | 刪 | S2-04、S4-01、S6-01 | 不保留單一因果或頻率主張；失敗可能來自需求、context、模型、工具、權限或環境，依證據定位，流程可降低部分風險。 |
| 30 | 先建立共通語言，再帶大家跑一次 | 刪 | S0-02、S1-01–S7-03 | 原固定議程不保留；其人類流程、Issue、Git／PR、驗收、Agent、handoff 與實作內容依 S0–S7 重排。 |
| 31 | 人類定義目的 Agent 承接流程 證據決定完成 | 合併 | S0-01、S2-02、S4-02、S7-03 | 目的、授權、證據與停止恢復拆入各自決策頁；Travel Lite 實際停止／handoff 與 fresh-session 接手示範見 S7-03，不以口號頁代替判斷。 |

### 舊頁去向計數

| 去向 | 舊頁數 |
|---|---:|
| 保留 | 0 |
| 合併 | 22 |
| 移 Optional | 0 |
| 移 Appendix | 2 |
| 刪 | 7 |
| 合計 | 31 |

## 5. 新頁數摘要

| 段落／補充 | 頁數 | Core 頁數 | Optional 頁數 | Appendix 頁數 |
|---|---:|---:|---:|---:|
| S0 | 2 | 2 | 0 | 0 |
| S1 | 4 | 4 | 0 | 0 |
| S2 | 5 | 5 | 0 | 0 |
| S3 | 2 | 2 | 0 | 0 |
| S4 | 4 | 4 | 0 | 0 |
| S5 | 2 | 2 | 0 | 0 |
| S6 | 3 | 3 | 0 | 0 |
| S7 | 5 | 3 | 2 | 0 |
| 補充／附錄 | 3 | 0 | 1 | 2 |
| 合計 | 30 | 25 | 3 | 2 |

## 6. 彙整待決問題

以下僅列仍待後續工作或版本核對的項目：

1. **S7 素材／#17 後續工作**：學員使用自己的行程，固定假行程／failing fixture 僅供講師示範或刻意設計的錯誤案例。#17 仍負責原 prompt、講師示範 fixture、刻意設計的錯誤案例，以及移除課程時長限制文字。提醒學員勿使用護照號碼、訂位代碼、真實聯絡資料或其他敏感資料。
2. **D6 Optional／Advanced manager Agent 示範**：Core 的 S5-02 已定；實作示範放 #19 或另行規劃尚未決定。
3. **Optional 情境庫的後續選用**：O1 列的是 #10 核准的能力 gate 與候選情境；除 D3 已交由 #19 承接的 PO／PM Agent 重排與上報示範外，#19 或後續教材實際採用哪些情境尚未決定。
4. **特定產品／框架來源版本**：A1 保持工具中立；若 I4 加入產品畫面、載入／權限說法，或 A2 列 BMAD／LongHorizon 對照，須在撰寫時指定並核對對應版本與來源；本文件不先作該判斷。
