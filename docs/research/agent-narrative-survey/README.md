# Agent 敘事 survey（第二、三段重組用）

目的：owner 認為舊版第二段「交給 Agent」和第三段「為什麼一隻 Agent 不夠」都在講 single／multi／chat-driven／work-driven，內容混在一起。所以先調查公開課程怎麼講這一段，再決定這兩段怎麼重組。討論紀錄：[Issue #41](https://github.com/world4jason/Agent-101-deck/issues/41)。

## 執行方式

- 模型：Codex CLI `gpt-6-sol`，effort `high`，開啟即時網路搜尋（`codex --search`）。執行日期：2026-10-03。
- 四個來源各自獨立調查，共三輪：
  1. 第 1 輪：初次調查（`r1-*.md`）
  2. 第 2 輪：驗證網址與時間點，補上漏掉的內容，並整理每個來源如何從「chat 的限制」過渡到「多 Agent／workflow」（`r2-*.md`）
  3. 第 3 輪：統整四份第 2 輪結果，提出講法（`r3-synthesis.md`）
- 四個來源：`stanford`（Stanford 課程）、`hylee`（李宏毅）、`github`（GitHub 公開 agent 課程）、`free`（不限來源自由探索）。
- 各輪使用的提示詞放在 `prompts/`。共用背景在 `common.md`，裡面有 owner 列出的六個 chat 問題。

## 尚未完成

- **ChatGPT web 路線（`chatgpt-web/gpt-5.6-sol` xhigh）還沒有結果。**
  - 第一次執行時，bridge 沒有開網路，產出幾乎都是「查不到」，因此作廢。
  - 加上 `--search` 重跑後，從 2026-10-03 02:10 到 07:16 連續 30 次回報 "Selected model is at capacity"，最後放棄。
  - 等這條路線補跑完成，owner 要求兩條路線對照之後，再決定第二、三段怎麼講。
- 本資料夾的內容都是 AI 的調查結果，**引用前要自行點開來源確認**。每一點都附了網址，以及頁碼或影片時間點。
