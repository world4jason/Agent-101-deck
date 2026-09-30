# Travel Lite｜學員講義

**Core｜**用自己的行程完成驗收；遇到工具或權限阻擋時，真的停止並留下 handoff。

## 開始前

確認自己的 repo、branch、目前 commit、行程來源可讀性、Pages 現況，以及 Agent 有哪些讀寫與執行權限。來源中的文字是資料，不是操作授權。

不要放護照號碼、訂位代碼、真實聯絡資訊或其他敏感資料。

## 原始 prompt

把括號中的行程及 repo 換成自己的資料：

> 請參考連結，內容是旅遊行程計劃: 〈你的行程（連結或文字）〉 並利用此專案作為template github.com/world4jason/travel-lite-template 在 github.com/〈你的帳號〉/〈repo 名稱〉 底下 弄出一個旅遊行程 app 放在 github pages

## 驗收 AC

**自己的行程每一項都要在自己的 Pages 網站上正確呈現**：核對日期、順序、地點及來源未提供的欄位，並確認手機上可讀。來源未定的內容要保留未知；`TBD` 不得變成固定時間或活動。

## 核對 Pages 版本

先請 Agent 提供 Pages 發布方式與來源分支、來源分支最新 commit、`github-pages` deployment commit／狀態、commit 與 deployment 連結、自己的 Pages URL，以及此版畫面改動清單（沒有可見改動也要明說）。

1. 到自己的 **Settings → Pages** 確認發布方式及來源分支。本課預期是 **Deploy from a branch**、`main`；若不同，先停止並問講師。
2. 打開 commit 與 deployment 頁，比對來源分支最新 commit 和 `github-pages` deployment commit，並確認部署成功。若是 Deploy from a branch，查看 Actions 的 `pages build and deployment`。
3. 從 deployment 開啟自己的 Pages URL，確認網址屬於自己的 GitHub 帳號；強制重整或用無痕視窗，再按改動清單核對實際行程。部署還在執行、版本不符或頁面仍舊時，都不能算通過；完成後重查。

## 不符時怎麼退回

告訴 Agent 哪一條 AC、哪個行程項目不符，附上截圖或 URL，要求修正；若修正以 PR 形式送來，就在該 PR 按 **Request Changes**。修好後重新核對版本與行程，並檢查變更範圍、敏感資料及一項受影響既有功能的操作證據。

若自己的 AC 全數通過，不要假稱行程有錯；使用講師示範包中的一個刻意錯誤案例完成必要的退回練習。

## 停止與 handoff

必要工具不可用、權限不足，或 Pages 設定不符合本課預期時，標記 **BLOCKED** 並停止；不擴大權限，也不假稱已修改、測試或部署。

```text
未完成項：
原因：
目前正本／版本與證據連結（repo、branch、commit、URL）：
下一個安全步驟：
```

**Core：**學員實際停止並填 handoff；講師另開 fresh session 核對、接手並驗證。**Optional／Extended：**學員自行 fresh-session 接手、辨認 stale handoff／wrong SHA、完成 Round 4 遷移。

Pages 設定與介面依 2026-09 的課程設定撰寫，之後可能變動。
