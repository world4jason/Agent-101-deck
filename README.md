# Agent 101 Deck

**rev11 正式版：82頁（主線71頁、附錄11頁）。**

用同一個配對 App 的三張票，先看人類如何協作、版本管理與驗收，再看 Agent 接手後的分工、交接與人的決策。

- [正式投影片](https://world4jason.github.io/Agent-101-deck/slides/)
- [82頁內容SSOT](docs/rev10-slide-by-slide-v1.md)（原檔名保留）
- [rev10原稿](drafts/rev10.html)
- [三版本內容對照](docs/three-version-comparison.md)
- [rev11交付紀錄](docs/rev11-delivery.md)

## 內容

| 頁碼 | 章節 |
|---|---|
| 1–7 | 人類如何合作：角色、成果、證據與關卡 |
| 8–15 | 版本與協作：沒有版控的問題 → commit／branch／PR／merge |
| 16–30 | 從想法到Ready：範例、Example Mapping、AC／AT／DoD |
| 31–38 | 實作、Review、QA、黑箱驗收與證據 |
| 39–42 | 風險、人工放行、單票完成與整體驗收 |
| 43–63 | Chat、session、交接、多Agent、workflow與五個原則 |
| 64–71 | Agent交付與人的驗收；人定方向與放行 |
| 72–82 | 格式、TDD、BDD、SBE、演練與架構附錄 |

## 播放與部署

根目錄 `index.html` 保持導向 `/slides/`；`slides/index.html` 是rev11完整版本。GitHub Pages沿用main分支的根目錄部署，無需伺服器端build。

左右鍵、PageUp／PageDown、Home／End或頁面按鈕翻頁。一頁完整顯示，每次前進一頁。O開目錄、N開講者筆記、Esc關閉。沿用／調整頁可連到rev10原頁。

rev10保留原內容與原fragment操作；`drafts/rev11-base.css` 固定它依賴的基礎樣式。工具試作、研究原文與截圖留在原工作目錄，不是正式版執行依賴。

## 修改與重建

先更新SSOT，再修改 `scripts/build_rev11.py` 中對應頁的內容。產生器同時寫入正式入口及保留的 `drafts/rev11.html`；不要直接修改生成的HTML。

```sh
python3 -m pip install -r requirements-dev.txt
python3 scripts/build_rev11.py
```

## 檢查

```sh
npm ci
npx playwright install chromium
python3 -m playwright install chromium
python3 -m http.server 4318 --bind 127.0.0.1
```

另開終端機執行：

```sh
npm run check:rev11
python3 tests/deck_check.py
```

`DECK_URL` 可指定待驗收的正式入口；`BROWSER_CHANNEL=chrome` 可使用已安裝的Chrome。逐頁截圖與驗證結果輸出到 `drafts/rev11-review/`，由Git忽略；manifest則保留頁序、來源與SSOT雜湊。
