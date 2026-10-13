# Rev13 — Rev12 107 頁逐頁遷移矩陣 v1

> **v2 演進註記**：本 107/107 原頁對照只用於**來源追蹤與沒有漏掉教材證據**，它的 S0–S6 目的章仍來自 v1 提案，**不是最後 Rev13 的頁序或場景數**。請優先使用 [Workflow-first Content Refinement v2](rev13-workflow-first-content-refinement-v2.md)（按真實階段前進）決定每個 scene 的內容與位置，再從此表移入所需來源和 evidence。

> **這是 G1 Review 前的編輯規劃稿，並未搬動任何投影片。**
> 來源：[rev12-demo-107](https://github.com/world4jason/Agent-101-deck/releases/tag/rev12-demo-107) frozen commit 5eb43fe9efb031ad7fb0582270a75df1c312a6ae、[原 107 頁 Storyboard](issue48-execution-storyboard.md)。新說明見 [Rev13 Storyboard v1](rev13-reorg-storyboard-v1.md)，父 Issue [#60](https://github.com/world4jason/Agent-101-deck/issues/60)。
>
> **覆蓋 107 / 107 頁；Retire = 0（沒有任何原頁獲批准刪除）。** 新版頁數並非 107 頁固定；Keep/Move、Condense、Rebuild 等皆為待審建議。不能因濃縮而失去真實證據和學員的先備知識。

## Rev13 全域分鏡落地要求

**P18–P22 Principles 全面適用**：以下舊頁即使標示 Keep/Move、Condense 或 Appendix，實作成新 Rev13 scene 時也須符合 Audience/DIG/FIG、同一 Overview 母圖、Focus+Context、工作與 GitHub 關係、State Delta/History/Extract。這些是設計原則，不是原有 107 頁重新排順序就算合格。詳細規範見 [全域分鏡契約](rev13-visual-narrative-contract.md)。

**此 107/107 表僅盤點 Rev12 內容的去向，不能直接拿去逐頁換序當新投影片。** 每一張未來 Rev13 教學 scene 都須先遵守 [全域投影片分鏡契約](rev13-visual-narrative-contract.md) 的母圖與四個敘事步驟：**Overview → Spotlight（只凸顯工作階段＋co-work 人員）→ Work/Artifact（Ticket、GitHub 動作／產出）→ Updated Overview（可見狀態變化）**。

**下一輪逐頁設計才會決定新 scene_id、四步驟對應、當前階段、focus 角色、Ticket 欄位／AC、GitHub Issue/Project/Branch/PR 對應、輸出與 state delta、Evidence 的真實或示意範圍。** 原頁內容的 Keep/Move/Condense/Appendix 分類不能豁免這些欄位；不允許保留成孤立的知識頁。封面／附錄／練習仍須能回到同一母圖定位。

## 處置標籤

- **Keep/Move**：保留原教學重點／例子／evidence，可搬章、修改轉場。
- **Move**：明確為修正先備概念而跨章；例：GitHub Issue 在 Git/GitHub 後，PO/QA 概念在 People 章。
- **Condense**：核心意思仍在主線，跟相鄰頁合併或漸進揭露；細節入 Notes。
- **Rebuild**：封面、教學總覽、流程定位或 Exit Check 須依新章節重寫。
- **Appendix**：延伸／非當下必要內容，保留於選修／查詢資料。
- **Retire**：目前沒有；正式 G1 才能經證據決定是否確實冗餘。

## Coverage

| 初步處置 | Rev12 頁數 |
|---|---:|
| Rebuild | 21 |
| Keep/Move | 46 |
| Move | 4 |
| Condense | 17 |
| Appendix | 19 |
| **合計** | **107** |

| Rev13 目標章 | 原頁歸屬數（不是預定新頁數） |
|---|---:|
| S0 | 4 |
| S3 | 7 |
| S1 | 17 |
| S2 | 9 |
| APP | 20 |
| S4 | 16 |
| S5 | 24 |
| S6 | 10 |
| **合計** | **107** |

**新章代碼**：S0 全貌；S1 Process/Refinement；S2 Git+GitHub；S3 People/Roles；S4 三要素 Human-only 實戰；S5 Agent 三模式；S6 Human Gate/轉移練習；APP 延伸。

## 107 頁逐頁建議

| Rev12 頁 | 來源 ID | 原頁主題 | Rev13 章 | 處置 | 理由與修改要點 |
|---:|---|---|---|---|---|
| 001 | P01 | 本課的例子：打造一個配對交友 App | S0 | Rebuild | 原封面是案例導入；需改成三要素→Agent 的明確教學承諾。 |
| 002 | A01 | 先看整門課：從人類合作到 Agent 交付與驗收 | S0 | Rebuild | 原八章 Overview 不適用 Rev13；重畫有先備順序的主路線圖。 |
| 003 | P02 | 要做一個類似 Tinder 的配對交友 App | S0 | Keep/Move | 保留 Matching 使用者視角，避免直接跳軟工名詞。 |
| 004 | P03 | 這輪只做三件事：Like／Pass、雙向喜歡才配對、配對列表 | S0 | Keep/Move | 唯一案例的 #1／#3／#2 範圍必須保持不變。 |
| 005 | P04 | 人類合作：誰做什麼、工作如何接力？ | S3 | Rebuild | 原第 1 章在教職能，Rev13 改在流程與 Git 之後正式介紹。 |
| 006 | P05 | 人類怎麼分工？從問題到接受看四步 | S3 | Keep/Move | 職責與交付物對應 People 章，可重用人類四步交接圖。 |
| 007 | A02 | Dev 交付後，還要審查、驗證與人類接受 | S3 | Keep/Move | Reviewer、QA、需求方要核對的不同內容，是人的教學成果。 |
| 008 | A18 | 人類合作｜Exit Check：你能回答這三題嗎？ | S3 | Rebuild | 八章結構改動後原出口題失效；改用能解釋人類責任的題目。 |
| 009 | P14 | 從一個想法到上線：需求如何變成票與關卡 | S1 | Rebuild | 新版 S1 應先給七欄工作流，不能先只展示需求片段。 |
| 010 | P15 | Brainstorming：從問題形成 Goal | S1 | Keep/Move | Goal 從問題形成，不能先把雙向 Like 當已確認的唯一解。 |
| 011 | P16 | Goal 要能描述使用者結果與可觀察的成功訊號 | S1 | Keep/Move | 保留 Outcome / 衡量指標，避免把未量測的成效當作實測。 |
| 012 | P17, N08 | 三張票怎麼拆、怎麼接、先做哪張？ | S1 | Keep/Move | 三張票的資料依賴與推進順序必須說明差別。 |
| 013 | A04 | 按鈕還沒做好，為什麼能先測配對規則？ | S1 | Keep/Move | 規則層可用固定假資料獨立驗證，提前建立 Expected Evidence。 |
| 014 | P09 | 本課用 parent issue 記共同目標，再拆成三張子票 | S2 | Move | 原頁正式使用 GitHub parent/sub-issue，應在 GitHub 被介紹後教。 |
| 015 | P19 | 三張工作票先列入待辦，再選一張開始做 | S1 | Keep/Move | Backlog 未開工時 WIP=0/1，不能因有三張票就變成進行中。 |
| 016 | N09 | 同一句「支援配對」，為什麼三種解讀？ | S1 | Keep/Move | 壞票的三種解讀是引出 Refinement 的問題場景。 |
| 017 | E10, N10 | 從「配對正常」到可以核對的範例 | S1 | Keep/Move | 同一句話的具體輸入／條件／結果，直接構成好的驗收例子。 |
| 018 | N11 | PO 寫了範例，為什麼還要找 Dev、QA？ | S3 | Move | 原頁假設 PO、Dev、QA 已知道；改到 People 章介紹三種觀點。 |
| 019 | N12 | 把 #3 攤開：規則、範例、疑問一起看 | S1 | Keep/Move | 保留 Example Mapping 如何解決歧義，不要變成要背框架。 |
| 020 | E06 | 範例寫到什麼時候才夠？ | S1 | Condense | 這張細談範例覆蓋；與精確例子 / AC 頁合併降低負擔。 |
| 021 | N13 | AC 決定接受條件，AT 說明怎麼驗，DoD 界定共同完成要求 | S1 | Keep/Move | 保留 AC 是接受條件、AT 是如何驗、DoD 是共同完成標準的差異。 |
| 022 | P20 | 工作票整理／待辦清單 | S1 | Condense | 三條 AC 和好票結構可合併，減少連續展示同張票。 |
| 023 | P18 | 一張好票長怎樣 | S1 | Keep/Move | 加入 Out-of-scope、Expected Evidence，保留可交辦票面。 |
| 024 | P21 | Ready 已可開工，但尚未計入進行中的 WIP | S1 | Keep/Move | Ready 是可以開始，並非已進 Dev 或已通過 QA。 |
| 025 | A03 | 角色、工作票、狀態、交付物，分別是什麼？ | S3 | Move | 分類 Role／Work item／State／Artifact 應在 People 正式定義角色時用。 |
| 026 | P06 | 本課示範流程：從 Backlog 到 Done | S1 | Rebuild | 七欄及活動/Gate 的區分應在 S1 前面先建立，不在中間才補。 |
| 027 | P28 | Sprint 與 Kanban：固定節奏與持續拉票 | APP | Appendix | Sprint/Kanban 的節奏比較不是本課單票交付的必要先備。 |
| 028 | A05 | WIP 在數什麼？目前數量與上限的差別 | S1 | Condense | 只在主線教 WIP=1 與 0/1；退回仍算的規則可以簡短示意。 |
| 029 | A06 | WIP 上限 1 與大於 1，各有什麼取捨？ | APP | Appendix | WIP>1 多票並行討論保留進階，避免讓初學者以為等於 Agent 數量。 |
| 030 | A19 | 想法到 Ready｜Exit Check：你能回答這三題嗎？ | S1 | Rebuild | 重編流程章出口，要求學員自己從壞票寫成可驗收票。 |
| 031 | P07 | 版本控制：存檔點、分支、送審、合併 | S2 | Rebuild | 改以 final_final 痛點導入 Git 和 GitHub 的區別。 |
| 032 | N02 | 三個人都交了 final，哪一份才是共同版本？ | S2 | Keep/Move | 三份 final 的衝突是 Git 教學先遇問題、再介紹工具的關鍵例子。 |
| 033 | P08, N03 | Git 留下歷史，GitHub 讓大家共享與審查 | S2 | Keep/Move | Git vs GitHub 必須清楚，避免講成同一個工具。 |
| 034 | P11, N05 | Commit 留下一版，push 分享這些版本 | S2 | Keep/Move | commit 留本地歷史與 push 分享的概念要保留。 |
| 035 | P10, N04 | 三張票各有工作分支，從共同版本開始 | S2 | Keep/Move | branch 對應票的工作線，連到共同版本並可比對差異。 |
| 036 | P12, N06 | 概念預演 1/2｜送 PR 核對需求、差異與證據 | S2 | Rebuild | 原 PR 是預演，不是 #3 當下真實已完成的 PR；須明示倒帶／假設。 |
| 037 | P13, N07 | 概念預演 2/2｜通過檢查後 Merge 回共同版本 | S2 | Rebuild | merge 預演要先介紹人類放行規則，不能暗示隨時自動 merge。 |
| 038 | A20 | 版本協作｜Exit Check：你能回答這三題嗎？ | S2 | Rebuild | 版控章出口問是否能辨認 Issue / Branch / Commit / PR / Merge。 |
| 039 | P22 | 回到主線｜#3 現在從 Ready 進 Dev 實作 | S4 | Rebuild | 從 S3 People 接回 S4 實戰；要明示現在才從 Ready 正式進 Dev。 |
| 040 | X03 | 送 PR 前測過，為什麼還需要 CI、Review、QA？ | S4 | Keep/Move | 自測／CI／Review／QA 的責任不能合併成一個『測試通過』。 |
| 041 | P23 | PR Review 示意：超出 #3 範圍的修改要退回 Dev | S4 | Keep/Move | 聊天室越界屬教學示意；不能假裝是同一次 fixture 觀測。 |
| 042 | N01 | QA 依約定退回，Dev 修正後重驗 | S4 | Keep/Move | 保留 Version A 單向 FAIL → Version B 修正之同案例結果。 |
| 043 | N14 | 不逐行讀程式，也要能驗收這個功能 | S4 | Keep/Move | 讓不懂程式的人以黑箱輸入輸出理解驗收。 |
| 044 | N15 | 雙向測過了，單向也可能錯：把條件攤成表 | S4 | Condense | 決策表是預期／設計，不是四格都實測通過。 |
| 045 | A07 | 實際驗收一次：從哪裡操作、在哪裡看結果？ | S4 | Keep/Move | B-pre 的真實 PASS / NOT RUN 邊界需要完整保留。 |
| 046 | P24 | B-post 補驗重複 Like 通過；UI 整合仍未驗 | S4 | Keep/Move | B-post duplicate 補驗屬同候選版本，不能虛構新候選或 UI PASS。 |
| 047 | N16 | 這個 PASS，要能追到哪一版、怎麼驗 | S4 | Keep/Move | PASS 必須對應實際候選、測試條件和結果；hash 不等於 Git commit。 |
| 048 | P25 | Product Check 問票是否推進 Goal，不等於 Goal 成效已達成 | S4 | Keep/Move | Product Check 是此票對 Goal 的符合度，不等於上線後成效已達標。 |
| 049 | A21 | 實作與驗收｜Exit Check：你能回答這三題嗎？ | S4 | Rebuild | 實戰出口要求按 A/B-pre/B-post 及 NOT RUN 做決定。 |
| 050 | N19 | 同樣驗收通過，放到不同環境，風險一樣嗎？ | S4 | Keep/Move | 同樣程式在測試與正式環境的風險不同，接 Human Gate。 |
| 051 | N20 | 放行前，確認證據，也確認出錯如何處理 | S4 | Keep/Move | 放行前需核對風險、回復方式、版本與 evidence。 |
| 052 | P26 | 假設 #3 已 Done：整個 Goal 仍未達成 | S4 | Keep/Move | 教學上假設 Ticket #3 Done，也不能推論 #1/#2 與 Goal 全部達成。 |
| 053 | N17 | 三張票都完成，還要走完使用者的整條路徑 | S4 | Condense | 整體路徑可濃縮成單票 Done ≠ Goal 成效的對照；E2E 未執行。 |
| 054 | A22 | 放行與完成｜Exit Check：你能回答這三題嗎？ | S4 | Rebuild | 重新設計人類完整交付章的出口題，而非舊八章格式。 |
| 055 | P29 | 從一問一答到長任務：角色、資訊與交接開始混在一起 | S5 | Rebuild | 重新引入第四鏡頭 Agent，明示前三要素並未消失。 |
| 056 | A08 | Agent 是什麼？它如何把一項工作往前推？ | S5 | Keep/Move | Agent loop 必須包括工具行動與回傳，不能僅以聊天介面定義。 |
| 057 | P30 | 從人逐步提問，到 Agent 持續朝目標工作 | S5 | Keep/Move | 逐輪問答和受託持續執行，是協作方式而非純 Chat 數量差別。 |
| 058 | A09 | 一個 Agent 的工作示範①：讀需求、改檔、執行測試 | S5 | Keep/Move | 原始單 Agent 重演是唯一可引用的真實執行材料之一。 |
| 059 | A10 | 一個 Agent 的工作示範②：發現失敗、修正、重測、交付 | S5 | Keep/Move | Version B-pre 仍有 duplicate NOT RUN；不得跳到已補驗的 B-post。 |
| 060 | A11 | AI 這一輪用到哪些資料？ | S5 | Condense | Context 只教『這輪實際取得材料』；細節轉附錄或 notes。 |
| 061 | P33 | 新 session 不會自動帶齊前文，接手需要共同紀錄 | S5 | Keep/Move | Session 不等同視窗；跨 session 要再核對共同紀錄。 |
| 062 | P32 | 對話壓縮後，關鍵規則可能被漏掉 | APP | Appendix | Compact 摘要細節易分散主線焦點，作為按需查詢的風險補充。 |
| 063 | A16 | 記得你的背景，不等於確認了最新進度 | APP | Appendix | Memory 背景不等於最新進度，進階說明避免推銷式產品假設。 |
| 064 | A17 | 電腦上的 Agent，要怎麼接續？ | S5 | Keep/Move | 單 Agent 的 B-pre → 補驗 → 人核對是人控接續的教學範例。 |
| 065 | P31 | 同一段對話包辦規劃、實作和自評，責任邊界會看不清 | S5 | Keep/Move | 一個 Agent 承擔多種 Role 不代表自己宣布 QA 與放行通過。 |
| 066 | X01 | 拆成三個 chat 後，人還在搬什麼？ | S5 | Keep/Move | 多個 Chat 由人搬運 scope／版本／證據，是第二模式的核心成本。 |
| 067 | P35 | 多Agent開發：優勢與新問題 | S5 | Condense | 不用另外一個『多 Agent 優勢』章封面，直接比較三種控制模式。 |
| 068 | P37 | 把工作拆開，也把各站只需要的資訊拆開 | S5 | Condense | 交接卡保留角色責任與狀態摘要，整合進第二、第三模式。 |
| 069 | P38 | 多 Agent 會遇到交接失真與衝突 | S5 | Condense | 交接失真留一個具體案例，不連續抽象論述。 |
| 070 | P39 | 重工與資訊孤島，讓協作成本上升 | APP | Appendix | 重工與資訊孤島詳細風險保留附錄，核心章只需能辨認。 |
| 071 | P40 | 目標漂移：小偏差可能在反覆交接中擴大 | S5 | Condense | Goal 漂移要連結 Ticket / Goal 的再錨定，不另設長篇。 |
| 072 | E08 | 從自己煮，到帶一個廚房 | APP | Appendix | 廚房類比可以幫部分受眾，但不能讓第二案例蓋過 Matching。 |
| 073 | P36, X02 | 分工之後，誰決定下一步？Workflow 與 Agent 數量分開看 | S5 | Rebuild | 改成三模式比較：單 Chat、多人控多 Chat、Orchestrator+Sub-agent。 |
| 074 | P34 | 不同工作，是否需要不同的模型與思考設定？ | APP | Appendix | Model 與推理 effort 不等於 Agent 數，是可選設定。 |
| 075 | P41 | 為什麼要建立多 Agent 協作的共同規範？ | APP | Appendix | 五原則封面不是主線必需，原分項可留附錄可查。 |
| 076 | P42 | 本課整理的五個協作原則，回應五種常見風險 | S5 | Condense | 五個原則濃縮為『如何防工作偏離』可操作核對表。 |
| 077 | P43 | External task state：工作狀態留在可查的紀錄 | APP | Appendix | External task state 詳解放進階；核心先教外部版本/票的 SSOT。 |
| 078 | P44 | Bounded execution：超出核准範圍就先停下 | S5 | Condense | Bounded execution 應融入三模式的授權和例外停手，不獨立講一頁。 |
| 079 | P45 | Role separation：職能是責任，不等於 Agent 數 | S5 | Condense | Role ≠ Agent count 在 People 章已有基礎，此處只看 Agent 映射。 |
| 080 | P46 | Independent verification：依 AC 和原始證據驗收 | S5 | Keep/Move | 獨立驗證由原始 AC 和證據決定，不等於換個 Agent 就一定獨立。 |
| 081 | P47 | Goal re-anchoring：回到 parent Goal | S5 | Condense | Goal re-anchoring 在比較三模式結尾簡短重述即可。 |
| 082 | A23 | Agent 演進｜Exit Check：你能回答這三題嗎？ | S5 | Rebuild | 需改以學員能分辨三模式和 Gate 的出口練習。 |
| 083 | P48 | Agent 接手後，人如何驗收與放行？ | S6 | Rebuild | 由 Agent 模式接人類驗收，不能像新教另一套流程。 |
| 084 | P49 | Agent 可接手職能，接受與放行仍由人決定 | S5 | Keep/Move | Agent 可以協助多種職能，但最後 Owner 決策仍是人的。 |
| 085 | P50 | Brainstorming：從 PM／PO 討論到 Agent 整理決議 | S5 | Condense | Agent Brainstorm 例子與原人類流程照映即可，避免複述 S1。 |
| 086 | E02 | 同一場 Example Mapping，AI 可以幫在哪裡？ | S5 | Condense | Example Mapping 用 Agent 的附加價值，不要再重教一輪 Refinement。 |
| 087 | A12 | 實際交辦：第一段話要怎麼交代？ | S6 | Keep/Move | 保留學員可複製的首次交辦及 scope、AC、evidence。 |
| 088 | N18 | Agent 說做完，人拿什麼決定？ | S6 | Keep/Move | B-pre 的自述 PASS 缺 duplicate，最適合做人工驗收題。 |
| 089 | A13 | 退回一次：證據不足時，要怎麼要求補驗？ | S6 | Keep/Move | 要求學員先寫退回補驗，再展示 B-post；不能提前揭答。 |
| 090 | A14 | 換一個 session，如何接續同一張未完成的票？ | S6 | Keep/Move | 切 Session 不等於完成所有 NOT RUN，清楚交接版本與缺口。 |
| 091 | P51 | 本課的 Human Gate：依風險選擇 PR／QA 審查配置 | S6 | Keep/Move | QA/Review 可由人或 Agent 協助，但 Human Gate 仍屬人。 |
| 092 | P52 | 沒有人放行就發布：問題到上線後才被看見 | S6 | Condense | 未經放行即發布的示例留成風險判斷，不假裝真實事故已發生。 |
| 093 | P27 | 總回顧：票沿看板前進，動作留下在 GitHub | S6 | Rebuild | 改成雙軌 Kanban + Git 進度回顧，標出 Human Gate 欄外位置。 |
| 094 | A15 | 換成你的工作：寫出第一張可以交辦的票 | S6 | Keep/Move | 保留轉用日常工作寫 Ticket 的練習，幫助遷移學習。 |
| 095 | A24 | Agent 交付｜Exit Check：你能回答這三題嗎？ | S6 | Rebuild | Agent 驗收章出口要測寫票、退回、版本核對三種能力。 |
| 096 | P53 | 附錄：方法、演練與技術補充 | APP | Appendix | 附錄需重新分組為方法／複雜協作／技術延伸。 |
| 097 | E01 | 同一條規則：條列、GWT、表格怎麼選？ | APP | Appendix | 條列、GWT、決策表是可選表達形式，非每人必背。 |
| 098 | E03 | 測試全綠，也可能什麼都沒驗到 | APP | Appendix | 綠燈未必驗到需求的細節，作為測試品質延伸。 |
| 099 | E04 | 先看測試紅，再讓它綠：TDD 的一次循環 | APP | Appendix | TDD 是工作方法深水區，非新手先備。 |
| 100 | E05 | BDD：共同探索、精確描述、接上驗證 | APP | Appendix | BDD 的 Discovery 可供對照，主線先只教具體範例。 |
| 101 | E07 | 演練：先各自理解，再一起用範例釐清 | APP | Appendix | 工作坊加分活動，主線先確保一張票能完成。 |
| 102 | E09 | 票面完整，為什麼還是推不動？ | S3 | Move | 任務無 Owner 會卡住，適合放 People 解釋責任缺口。 |
| 103 | E11 | Specification by Example：讓共同理解留得下來 | APP | Appendix | Specification by Example 是深入方法，不另阻擋 Agent 章。 |
| 104 | N21 | 上線後才發現錯配，怎樣停止與處理？ | APP | Appendix | 事故應變與回滾深度補充，與人類風險放行呼應。 |
| 105 | P54 | 本課用六層視角整理同一張票的交接 | APP | Appendix | 六層模型是講師查詢框架，不是所有學員必背。 |
| 106 | P55 | Kanban 回顧：Agent 依序拉取同一張票 | APP | Appendix | 進階 Kanban 票級 WIP 與 Release 邊界供需要時查找。 |
| 107 | A25 | 附錄｜Exit Check：你能回答這三題嗎？ | APP | Rebuild | 附錄 Check 應要求找資料／判斷證據，不再沿用舊章出口。 |

## 下一輪 G1 reviewer 需確認

1. **概念不能未教先用**：#14 移至 S2；#18/#25 移 S3；S1 必要時用白話描述分工，但不先假設學生懂 PO/QA。
2. **完整工作流仍是既有七個 Kanban 欄位**：Backlog / Ready / Dev / Review / QA / Product Check / Done；Refinement 為活動、Human Gate 為 Product Check 之後欄外決策。
3. **先教人類完整的交付循環再談 Agent**：原 #39–54 的版本／實際測試／接受與發布限制不得因 Reorg 消失。
4. **同一示例唯一時間線**：#3 Version A 單向 FAIL → B-pre 單／雙向 PASS + duplicate NOT RUN → B-post 同候選補驗 duplicate PASS；UI / 全流程 / 真正發布 / Goal 成效仍不得憑空標 PASS。
5. **Git 概念預演 ≠ 真實 Dev 歷史**：原 #36–37 只是 ahead-of-time 教學預演；原 #39 才開始真實 Dev。每次倒帶／快轉都要明示。
6. **Agent 3 種控制模式**：一個 Chat + 單 Agent、人工控制多 Chat、主 Agent 協調 Sub-agents。Chat、Agent、Session、Role、WIP、Workflow 是不同維度。
7. **每頁固定最小必要「Kanban + Git」導覽**：只有此頁必要的狀態／候選版本／責任／evidence；不要把全看板、全 log 擠上主畫面。
8. **重新定 Exit Checks 與頁數**：原 8 張出口頁不用機械保留張數；每章至少有一項可觀察能力、先做後揭露。
9. **PR #57/#59 需獨立 reconcile**：它們不是 frozen tag 的一部分，也不能因為 G1 規劃就宣稱 PPTX 原生可編輯成果已驗收。
10. **正式 QA**：G1/G2/G3/G4/G5 狀態分開；目前矩陣檢查是 planning coverage，不是人類盲審完成。

**保留原始檔且暫不實作**：本 PR / branch 階段不改 slides/index.html、HTML 產生器、PPTX、正式 Pages、範例測試或既有 QA 結論。
