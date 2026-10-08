# Agent 101 Deck

**rev12 候選：99頁（主線88頁、附錄11頁）；rev11 82頁基線保留。**

用同一個配對 App 的三張票，先看人類如何協作、版本管理與驗收，再看 Agent 接手後的分工、交接與人的決策。

- [正式投影片](https://world4jason.github.io/Agent-101-deck/slides/)
- [rev12 執行故事板與頁面對照](docs/issue48-execution-storyboard.md)
- [Issue #48 交付與檢查紀錄](docs/issue48-delivery.md)
- [rev11 基線 SSOT](docs/rev10-slide-by-slide-v1.md)（原檔名保留）
- [rev11 正式版存檔](slides/rev11.html)
- [rev10原稿](drafts/rev10.html)
- [三版本內容對照](docs/three-version-comparison.md)
- [rev11交付紀錄](docs/rev11-delivery.md)

## 內容

| 頁碼 | 章節 |
|---|---|
| 1–10 | 人類如何合作：角色、成果、證據與關卡 |
| 11–29 | 從想法到 Ready：範例、Example Mapping、AC／AT／DoD |
| 30–36 | 版本與協作：commit／branch／PR／merge |
| 37–45 | 實作、Review、QA、黑箱驗收與證據 |
| 46–49 | 放行、單票完成與整體驗收 |
| 50–76 | Agent 演進：session、交接、分工、workflow 與原則 |
| 77–88 | Agent 交付與人的驗收；人定方向與放行 |
| 89–99 | 附錄：BDD、TDD、SBE、演練與架構 |

## 播放與部署

根目錄 `index.html` 保持導向 `/slides/`；`slides/index.html` 是本分支的 rev12 候選，頁面仍須完成審閱。舊 rev11 可由 `slides/rev11.html` 直接開啟。GitHub Pages沿用main分支的根目錄部署，無需伺服器端build。

左右鍵、PageUp／PageDown、Home／End或頁面按鈕翻頁。一頁完整顯示，每次前進一頁。O開目錄、N開講者筆記、Esc關閉。沿用／調整頁可連到rev10原頁。

rev10保留原內容與原fragment操作；`drafts/rev11-base.css` 固定它依賴的基礎樣式。工具試作、研究原文與截圖留在原工作目錄，不是正式版執行依賴。

## 修改與重建

先更新 `docs/issue48-execution-storyboard.md`，再修改 `scripts/build_rev11.py` 中對應頁的內容。產生器寫入 `slides/index.html`、`drafts/rev12.html` 與 `drafts/rev12-review/manifest.json`，並將原 82 頁存為 `slides/rev11.html`；不要直接修改生成的HTML。

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
npm run check:rev12
python3 tests/deck_check.py
```

`npm run check:rev11` 可回歸保留的舊版；`npm run check:rev12` 檢查 99 頁候選的載入、導覽、講者筆記連結與畫布邊界。`DECK_URL` 可指定入口；`BROWSER_CHANNEL=chrome` 可使用已安裝的Chrome。逐頁截圖與驗證結果輸出到 `drafts/rev12-review/`，由Git忽略；候選 manifest 保留頁序、來源、材料和 SSOT 雜湊。
