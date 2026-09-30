# v6 Core 整合驗收

本次可核對的整合基準為分支 HEAD `b31d6f2`（2026-10-01）。導覽檢查已在 brand 變更後重跑。狀態依 #12 的 2026-09-30 gate 表記錄；外部連結檢查日期為 2026-10-01。未執行項目列為 NOT RUN。

## 試教準備度

| 條件 | 狀態 | 證據與結果 | 版本 |
|---|---|---|---|
| Core 故事板依決議整併，無已知衝突 | PASS | I2 #28：故事板 PR #34（[三方驗收意見](https://github.com/world4jason/Agent-101-deck/pull/34#issuecomment-5905710766)）及 Travel Lite 決策後續 PR #36（[三方驗收意見](https://github.com/world4jason/Agent-101-deck/pull/36#issuecomment-5907930773)）；storyboard IDs vs deck：missing `[]`、extra `[]`。 | PR #34、#36；ID 比對為 `main` @ `0f5e703f54a30ef5c5ec1d1444db447ca3fff627` |
| 導覽殼層無已知阻擋 | PASS | I1 #27：導覽修正與回歸檢查 PR #33（[三方驗收意見](https://github.com/world4jason/Agent-101-deck/pull/33#issuecomment-5904348162)）。branch HEAD 重跑 `check_every_slide`、`check_fragments_walk`、`check_fragment_opacity`、`check_keyboard_after_buttons`、`check_hash`、`check_print` 全部 PASS；overflow probe `issues: 0`。 | 分支 HEAD @ `b31d6f2`（2026-10-01，brand 變更後）；PR #33 |
| 驗收環境可用（Travel Lite 學員 Pages） | NOT RUN | v6 deck 的 GitHub Pages 可用：source=`main`、type=`legacy`；最新 build 為 `0f5e703f54a30ef5c5ec1d1444db447ca3fff627`；live title 為 `Agent 101 — v6 Core pilot`，共 30 張。但 I3 #29 指定的學員自建 Pages 端到端流程未執行；#29 無 PR，依 [issue comment 的 owner decision](https://github.com/world4jason/Agent-101-deck/issues/29#issuecomment-5907265647) 結案。 | `main` @ `0f5e703f54a30ef5c5ec1d1444db447ca3fff627`；I3 #29（無 PR） |
| 實作包可由講師完整走通 | NOT RUN | 講師尚未完整演練 deck 與手冊。靜態一致性檢查：講師手冊 30 個 page-ID refs 在 deck 均存在。I4 #30 的 deck PR #37（[三方驗收意見](https://github.com/world4jason/Agent-101-deck/pull/37#issuecomment-5910776784)）；I5 #31 的講師手冊 PR #38（[三方驗收意見](https://github.com/world4jason/Agent-101-deck/pull/38#issuecomment-5914160737)）。 | PR #37、#38；靜態比對為 `main` @ `0f5e703f54a30ef5c5ec1d1444db447ca3fff627` |
| 核心能力素材存在：反例、handoff 範本與停止案例 | PASS | 素材已隨合併 PR 提供：I4 #30／PR #37（[三方驗收意見](https://github.com/world4jason/Agent-101-deck/pull/37#issuecomment-5910776784)）、I5 #31／PR #38（[三方驗收意見](https://github.com/world4jason/Agent-101-deck/pull/38#issuecomment-5914160737)）、I7 #35／PR #39（[三方驗收意見](https://github.com/world4jason/Agent-101-deck/pull/39#issuecomment-5914867790)）。 | PR #37、#38、#39 |
| 反例可由第二人重現 | NOT RUN | 尚無第二人重現反例的證據；I7 作者的自我檢查不計為此 gate 通過。 | I7 #35；PR #39 |
| Gate A：外部來源連結可用 | PASS | 2026-10-01 重查 18 個外部 URL，HTTP 200 共 18/18。 | 2026-10-01 |
| Gate A：外部來源內容重驗 | NOT RUN | 外部來源內容尚未重驗。 | 未執行 |
| Gate D：README、頁面版號、變更紀錄與示範套件對應同一 main commit | NOT RUN | README、頁面 chrome 與本紀錄使用 `v6 Core pilot`；I6 尚未合併，最終 `main` merge commit 尚未產生。CHANGELOG 將該 merge commit 設為本版錨點。 | 本 I6 PR；合併後 `main` commit 待定；示範套件 PR #39 |

依 2026-09-30 owner 決議「大概就好」，本次刻意輕量處理：不要求 PR preview；不建立 repo 來重跑 Travel Lite 的 GitHub Pages 端到端流程；不要求第二位講師試讀；不以未執行的完整演練或來源內容重驗阻擋「可試教」標示。可查核項目照常記錄，其餘維持 NOT RUN。

## 學習成效狀態

| 項目 | 狀態 | 證據與結果 | 結果版本 |
|---|---|---|---|
| 學員 pilot | NOT RUN／未驗證 | 未執行學員 pilot，沒有學習成效資料。 | 未施測，無結果版本 |
| 獨立遷移任務 | NOT RUN／未驗證 | 未執行獨立遷移任務，沒有學習成效資料。 | 未施測，無結果版本 |
| 延遲測試 | NOT RUN／未驗證 | 未執行；#12 owns gate，#17／#19 提供練習素材。 | 未施測，無結果版本 |

v6 Core pilot 可試教；學習成效未驗證
