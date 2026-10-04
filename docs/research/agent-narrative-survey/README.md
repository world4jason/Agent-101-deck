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

## ChatGPT web 路線（`web-manual/`）

- 由 owner 在 ChatGPT web 以 Extra High 加搜尋**手動**執行，日期 2026-10-04；提示詞見 `web-manual/1-4-*.md`。
  - 每個來源都跑了兩次：`web-r2-<來源>.md` 與 `web-r2-<來源>-run2.md`。
  - `stanford-workflow-vs-agent-single-vs-multi.md` 是 owner 額外追問的結果：Stanford 把「workflow vs agent」和「single vs multi-agent」當成兩個不同的問題來教。
- 改成手動的原因：bridge 自動執行時一直失敗，而且是兩種不同的失敗。
  - 不加 `--search` 時，ChatGPT 無法上網，產出幾乎全是「查不到」，已作廢。
  - 加上 `--search` 時，ChatGPT 會在已經寫完的段落中補插引用。bridge 偵測到已送出的內容被改動，就報錯中斷（"ChatGPT changed a completed text block that was already streamed to Codex"），此外也常遇到 "at capacity"。

## 兩條路線的統整

- `r3-cross-route.md`：Codex `gpt-6-sol` high 讀完兩條路線的所有檔案後，依修訂 10 的七段結構整理。內容包括：兩條路線的異同對照、第 4–7 段的逐頁草稿、SHIFT 的證據界線、各段標題候選、owner 六點的證據界線。
- 本資料夾的內容都是 AI 調查的結果，**引用前要自己點開來源確認**。每一點都附有網址和頁碼，或影片時間點。
