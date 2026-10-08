# Issue #48 交付與檢查紀錄

日期：2026-10-08。這份紀錄區分教材建置、技術檢查與真人學習驗證。

本次產出是 rev12 的 99 頁候選投影片、執行故事板、逐頁來源／材料 manifest，以及 Matching 規則層的可重跑示範。舊 rev11 仍可由 `slides/rev11.html` 開啟，SHA-256 為 `539f43b427dfeea7533639535763ab0517ad2e9581a76ecbc2f2e18387139fea`。示範記錄只支持程式規則層；UI／產品整合仍是 NOT RUN，合併與發布未獲授權。

已執行檢查：

| 命令 | 結果 |
|---|---|
| `rtk python3 -m py_compile scripts/build_rev11.py tests/issue48_storyboard_test.py tests/deck_check.py` | 通過 |
| `rtk node --check drafts/rev12.js` | 通過 |
| `rtk node --check scripts/check_rev12.cjs` | 通過 |
| `rtk python3 scripts/build_rev11.py` | 通過；產生 99 頁候選，保留 82 頁 rev11 舊版 |
| `rtk python3 tests/issue48_storyboard_test.py` | 通過；頁數、來源映射唯一性、排序、manifest、baseline、漸進流程圖、WIP 計數標籤與 README 頁碼檢查通過 |
| `rtk python3 tests/deck_check.py` | 通過；六項逐頁、fragment、鍵盤、hash 與列印檢查全部通過 |
| `rtk env BROWSER_CHANNEL=chrome npm run check:rev12` | 通過；99 頁載入、導覽、講者筆記、互動步驟及指定頁面版面檢查通過 |
| `rtk env BROWSER_CHANNEL=chrome npm run check:rev11` | 通過；82 頁舊版載入、導覽與講者筆記檢查通過 |
| `rtk git diff --check` | 通過；沒有 whitespace 錯誤 |

第一次 rev12 瀏覽器檢查發現檢查腳本中的區域變數 `process` 遮蔽 Node.js 全域值；改名後相同命令重跑通過。WIP 斷言也先確認修正前失敗，再於修正後通過。

Chrome 檢查的逐頁截圖與 JSON 結果位於 `drafts/rev12-review/`。已檢視角色、實際 Matching 驗證、WIP、桌面記憶、接續工作、分工比較與交接等頁面，並檢視 P06 三步流程的截圖。瀏覽器檢查器對舊版看板回顧頁（rev11 第 71 頁／候選第 87 頁）的七張緊湊卡片回報水平文字溢出；此項也存在於保留的 rev11。檢查未回報超出投影片畫布或垂直溢出，rev12 指定的標題間距、頁尾與 A14 字級均通過。

真人初學者形成性試教尚未執行，因此學習效果仍待驗證；技術檢查與教材審閱不代表真人試教通過。

## 獨立工程檢查

- Matching 示範包：GPT-6 Luna max verifier 判定 Ready；確認 A09 有獨立重演的交辦、執行前計畫與來源連結。
- 全 deck：GPT-6 Luna max verifier 最初指出 WIP 標籤與 README 頁碼兩項缺口；修正後重查無發現，認為可進技術審閱。
- 以上是工程材料檢查，不代表真人學習驗證完成。

## PR #49 內容審查修正候選｜2026-10-08

本節記錄本輪依兩份 PR review 更新的候選版本；修改前逐頁故事板與首次術語檢查留在 `docs/issue49-review-fixes.md`。目前順序仍是 99 頁：保留 rev11 的 82 頁及 A01–A17；原 rev11 檔案 SHA-256 未變。

### G1 故事與先備知識

- 將職能介紹後接成 Brainstorming、形成 Goal、拆票、看板、驗收與 Agent 接手；頁序、章跨度、導覽、README 範圍和逐頁來源已同步。
- 在首次出現處用白話說明 Goal／AC、Brainstorming、Backlog／Ready、工作票整理、Context／Session／Compact／Memory；早期看板標籤與狀態描述避免在定義前先用英文術語。
- 明確標出 QA 頁先快轉到 B-post；後續 Agent／練習頁倒回 B-pre，並回到 B-post 主線。

### G2 事實與證據

| 命令 | 實際結果 |
|---|---|
| `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/A/matching.py --candidate-id A --case one-way` | 預期 FAIL，exit 1；預期 0 筆、實際 1 筆 M01。 |
| `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case one-way` | PASS，預期／實際 0 筆。 |
| `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case two-way` | PASS，預期／實際 1 筆 M01。 |
| `rtk python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case duplicate` | PASS，同一 B artifact 補驗前後皆 1 筆 M01。 |
| `rtk python3 -m unittest discover -s workshop/matching-demo/tests -v` | 3 項通過。 |

A12 指定 B 程式、fixture 和 runner；A13 的可複製 `--artifact` 命令保留在 `workshop/matching-demo/exercise.md`，揭露畫面只顯示白話要求、實際 B-post 與證據連結。Matching 示範僅證明規則層；UI／產品串接、真人練習與產品接受仍是 **NOT RUN**。這個示範使用 Python 標準函式庫，本輪未執行依賴安裝；瀏覽器檢查使用當前已有的 Playwright 與 Chrome。

### G4 瀏覽器與視覺

- `rtk env BROWSER_CHANNEL=chrome npm run check:rev12`：通過。載入 99 頁，沒有瀏覽器錯誤；導覽、流程圖／WIP 互動、A13 提問揭露／返回、列印狀態與版面檢查通過。A13 正文在揭露時隱藏，桌機與手機寬度正文最小 19px，列印保留提問、不列出答案。
- `rtk env BROWSER_CHANNEL=chrome npm run check:rev11`：通過，保留版 82 頁。
- `rtk python3 tests/deck_check.py`：六項逐頁、fragment、鍵盤、hash 與列印檢查通過。
- 最新逐頁文字及截圖位於 [`verification.json`](../drafts/rev12-review/verification.json) 與 `drafts/rev12-review/pages/`：99 張桌面截圖，另有 51 張投影尺寸和 51 張手機尺寸截圖（頁 03–15、20–26、33–46、52–60、80–85、98–99）。A13 提問／揭露／返回，以及 P99 Human Gate 等待／放行狀態另有獨立截圖。
- 瀏覽器仍辨識到候選第 87 頁七張緊湊卡片的水平文字溢出；同一問題出現在不可修改的 rev11 第 71 頁。沒有投影片畫布外溢或垂直溢出。

凍結候選 `e5d55470cd7b955e5d213034ee2539754004d764` 的兩份 WebChatGPT 審查均已完成；初心者審查提出兩項 P1，內容／證據審查為 READY。原報告與呼叫紀錄保存在 [beginner review](reviews/issue49-web-e5d5547-beginner.md)、[content review](reviews/issue49-web-e5d5547-content.md) 與 [invocation record](reviews/issue49-web-e5d5547-invocation.md)。本輪只處理兩項 P1；最終候選的 Web 重審仍待執行，不能沿用凍結候選的 verdict。P2 與真人試教狀態見下方本輪記錄。修改尚未提交或推送。

### 凍結候選 Web findings 的範圍與處置

- P1（頁 99）：七個 Kanban 狀態欄不含 Human Gate；以 Product Check → Done 之間的決策標記呈現，動畫明示等待放行時仍停在 Product Check，放行後才移至 Done。
- P1（頁 34–36）：頁 34–35 標為概念預演 1/2、2/2；頁 36 明示回到主線，#3 此時才從 Ready 進 Dev。頁數與順序不變。
- 兩份初審都由 `codex exec --ephemeral -m chatgpt-web/gpt-5.6-sol -c model_reasoning_effort=xhigh -s read-only` 執行並 exit 0；它們是同一個指定模型的兩個 session，不是跨模型共識。beginner report 自稱 GPT-6 Astra，與呼叫端記錄的 GPT-5.6 Sol 不一致；未據此宣稱模型身分經獨立驗證。
- 延後的 P2：頁 16 BRIEF 全名只在講者筆記、頁 86 內部 ID／SSOT、頁 98 架構術語、手機直向可讀性。這些不納入本輪修正或新驗收條件。
- 初審只使用凍結候選 SHA；目前候選的最終 Web 重審與真人初學者試教仍待執行。

### 本輪實作驗證

| 命令 | 結果 |
|---|---|
| `rtk python3 scripts/build_rev11.py` | 通過；99 頁候選重建完成，82 頁 rev11 基線 SHA 維持 `539f43b427dfeea7533639535763ab0517ad2e9581a76ecbc2f2e18387139fea`。 |
| `rtk python3 tests/issue48_storyboard_test.py` | 通過；99 頁映射／排序、34–36 預演與回主線文字、P99 七個狀態欄及保留的 rev11 Human Gate 欄檢查通過。 |
| `rtk python3 tests/deck_check.py` | 通過；六項逐頁、片段、鍵盤、hash 與列印檢查通過。 |
| `rtk python3 -m py_compile scripts/build_rev11.py tests/issue48_storyboard_test.py tests/deck_check.py`、`rtk node --check scripts/check_rev12.cjs`、`rtk node --check drafts/rev12.js` | 全部通過。 |
| `rtk env BROWSER_CHANNEL=chrome npm run check:rev12` | 通過；99 頁、無 browser errors，導覽及互動檢查通過；投影與手機截圖各 51 張。Gate 等待時 ticket 留在 Product Check、Done 未亮；放行後 ticket 移到 Done、Product Check 退場。 |
| `rtk git diff --check` | 通過。 |

已檢視頁 25、33–36、99 的投影截圖及頁 25、34–36、99 的手機截圖，並檢視 P99 等待與放行兩張桌面狀態圖。頁 87 的七張緊湊卡片仍有既有水平文字溢出，原 rev11 同頁也有此情形；本輪未擴大修正。`check:rev11` 未重跑；保留版 SHA 已核對未變。最終候選的 Web 重審、手機版可讀性改善及真人試教仍待處理。


## 2026-10-09 八章 Exit Checks 增量紀錄（原 99 頁完整保留）

- Owner 最新確認：八個章節各新增一張自我檢核，共 A18–A25 八張，候選 107 頁；來源與驗收另見 [Issue #52](https://github.com/world4jason/Agent-101-deck/issues/52)。
- 新頁位於 8、30、38、49、54、82、95、107；每頁三題，共 24 題，HTML details/summary 預設隱藏答案，讓學員先回答再揭露。
- 產生器、storyboard、manifest、README、Chrome 測試與 rev11 基線同步；本次本機執行生成器、107 頁故事板契約、六項 deck regression、Chrome 檢查與八頁各一題的 reveal/rehide／界線檢查通過。
- G4／G5 最終人工畫面審閱、實體投影、手機真機、真人初學者試教仍 **NOT RUN**；不能將 Chrome／HTML tests PASS 當作真人學習效果。
- 未在此增量處理跨頁 Human Gate／Product Check 已知 P1；請追 [Issue #50](https://github.com/world4jason/Agent-101-deck/issues/50)。
