# 講師用刻意錯誤案例

四案都只在模板固定版本 `c1b81cb` 的**可丟棄本機副本**操作，不建立 GitHub repo，也不改模板參考檔。先取得固定版，再為每案建立乾淨副本：

```sh
TEMPLATE_DIR="$(mktemp -d)"
git clone https://github.com/world4jason/Travel-lite-Template "$TEMPLATE_DIR"
cd "$TEMPLATE_DIR"
git checkout c1b81cb

CASE_DIR="$(mktemp -d)"
cp -R "$TEMPLATE_DIR"/. "$CASE_DIR"/
cd "$CASE_DIR"
python3 -m http.server 8001 --bind 127.0.0.1
```

瀏覽 `http://127.0.0.1:<port>/`；結束伺服器按 `Ctrl+C`。每案重新建立副本，Case 1–4 分別使用 port `8001`–`8004`；若重用 port，請開無痕視窗或清除網站資料，避免 service worker 顯示舊資產。Case 1、2 以假行程取代 `trip.json` 的 `days`，並將 `trip.startDate`／`trip.endDate` 設為 `2026-10-12`／`2026-10-14`。以下的 `days`／`items` 是 `trip.json` 內的陣列。

## 1. TBD 被排成 00:00

**教學刻意製造，不是模板 bug。**

- **重現：**來源（`fake-itinerary.md`）的時間為 `TBD`；在副本的 `trip.json` 中將 `d1-paper-dinner` 的 `start` 改成 `"00:00"`。從此副本的 8001 port 啟動本機伺服器。
- **預期判斷：**時間是來源未提供的資訊，不可編造。指出來源的 `TBD` 與頁面的 `00:00`，要求保留 `TBD`／未知並修正。

## 2. 捏造經緯度

**教學刻意製造，不是模板 bug。**

- **重現：**在副本的 `trip.json` 中，為 `d2-moon-hut` 加上沒有來源支持的 `"lat": 35.7000`、`"lng": 139.8000`，並從此副本的 8002 port 啟動本機伺服器。地圖圖磚需要網路。
- **預期判斷：**座標看似精確也不代表有根據。指出來源未提供地址或座標，要求移除／標為未知，不把它當成真實地點。

## 3. 畫面完成，但服務的是舊版本

**教學刻意製造，不是模板 bug。**

- **重現：**從固定模板建立 `old`、`new` 兩份副本。在 `new` 副本的 `trip.json` 加入明顯可見的新版標記，例如活動標題「紙月版本標記：新版」；`old` 副本保持原樣。從 `old` 目錄執行 `python3 -m http.server 8003 --bind 127.0.0.1`，開啟 `http://127.0.0.1:8003/`。另向學員提供一段**模擬** Agent 回報：來源最新 commit 與 Pages deployment commit 相同、部署成功，改動清單包含新版標記。SHA、部署與回報都只是教學資料，沒有實際部署。
- **預期判斷：**本機畫面沒有回報所稱的新標記，畫面與版本說法不一致，不能判 PASS；要求核對實際 commit、deployment 與頁面內容。這是 I3 的本機示意，不代表完成 GitHub Pages 驗收。

## 4. 不必要地重寫 template shell

**教學刻意製造，不是模板 bug。**

- **重現：**保留一份乾淨模板副本作比較；在另一份副本只需把行程寫入 `trip.json`，再大幅改寫 `index.html`，例如改成只顯示行程標題的簡易頁面。用 `diff -ru` 比較乾淨副本與案例副本，並可從案例副本的 8004 port 啟動本機伺服器。
- **預期判斷：**需求只授權更新行程資料；改寫 shell 超出範圍，也可能破壞原有功能。依差異要求撤回未核准的 shell 變更；要改 shell，先另開卡取得批准。
