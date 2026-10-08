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
