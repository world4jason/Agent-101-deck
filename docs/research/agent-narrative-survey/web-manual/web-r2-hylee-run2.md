# 李宏毅教授 AI Agent 課程／演講調查：第 2 輪修正版
## 來源與定位已逐項驗證

> 本文件是第 2 輪結果：在第 1 輪 survey 後，重新核對官方課程頁、官方投影片、官方 YouTube 連結，以及能取得的逐字稿索引。
>
> **標示規則**
> - **【來源內容】**：李宏毅教授課程／投影片明確講到的內容；若使用短引文會加引號。
> - **【我的歸納】**：我把來源映射到 Owner 的六個問題，或整理成適合 Agent 101 的敘事。
> - **「查不到」**：無法可靠驗證精確影片時間、特定用詞或特定主張時，不補猜。
> - 2024 兩支影片的時間點來自第三方逐字稿索引，**影片本體則以李宏毅教授官方 YouTube 為準**。
> - 2025／2026 多數影片無法從可靠索引逐秒驗證，因此使用 **官方課程章節 + 官方 PDF 頁碼** 定位；精確影片時間一律標「查不到」。

---

# 0. 先講結論

李宏毅教授的相關教材其實可以拆成三條很清楚、而且彼此補強的線：

1. **「平常怎麼用 AI」→「Agent 是什麼」**
   - 2024 第 9 講先從「現在多數人讓 AI 一次做一步」講起，再用約朋友吃飯說明真實任務需要多步驟、有先後順序、遇到狀況要改計畫。
   - 2025 Spring 更直接用投影片對比：一般使用方式是人給明確指令、AI「一個口令一個動作」；Agent 則是人給 **Goal**，AI 自己想辦法完成。
   - 這一條非常適合你的「先講大家都在用 chat」開場。

2. **「單一 context 越塞越多」→「Context Engineering」**
   - 2025 Fall 把 User prompt、System prompt、Dialogue history、Memory、Tool use、Reasoning 等全部畫進 context，接著直接指出 Agent 運行時的挑戰是輸入愈來愈長。
   - 然後才引出解法：**Select / Compress / Multi-Agent**。
   - 這是目前找到的李宏毅教材中，最接近你要的「chat 的限制 → workflow / multi-agent」完整橋接。

3. **「為什麼要多個 Agent」並不只有角色扮演**
   - 2024 第 5 講主要從「不同模型能力／價格不同」、「自我反省有侷限」、「討論／裁判」、「不同角色」切入，再講 PM、programmer、tester、MetaGPT、ChatDev。
   - 2025 Fall 則多了一個更適合你現在 deck 的理由：**Multi-Agent 可以切開 context**。餐廳 Agent 不必把訂餐廳網站的所有操作細節塞給訂飯店 Agent；Lead 只需要收到必要結果。
   - 2026 又把 subagent 明確解釋成一種「自主壓縮」：子 Agent 內部的長 trace 不必全部回流，父 Agent 只接結果。

4. Owner 的六個問題中：
   - **有強來源支持**：一人分飾多角色、context 過長／雜訊、模型路由與成本、session／跨 session 記憶、compaction 的資訊損失。
   - **部分支持**：「球員兼裁判」——李宏毅有講 self-reflection 比較難推翻自己、也講獨立討論者和 judge，但我**查不到他使用「球員兼裁判」這個詞**。
   - **只有部分支持**：「依問題選 model 和 effort」——**model routing／不同能力與成本有明確講；產品層級的 reasoning effort 參數查不到**。

5. 如果要照 Owner 希望的敘事重排 Agent 101，我會建議：
   **Chat（一個口令一個動作） → 真實工作是多步驟 → 一個 chat/context 開始膨脹 → Select / Compress 仍有資訊損失與 handoff 問題 → 用 workflow 固定工作階段 → 用 Multi-Agent 把角色與 context 邊界拆開。**

   這個最後的排列是 **【我的歸納】**，不是李宏毅教授原話；但它可以由下列教材逐步支撐。

---

# 1. 已驗證的主要來源

| 年份 | 課程／講次 | 驗證來源 | 可用定位 |
|---|---|---|---|
| 2024 Spring | 第 5 講：讓語言模型彼此合作，把一個人活成一個團隊 | 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php ；官方 YouTube：https://www.youtube.com/watch?v=inebiWdQW-4 ；逐字稿索引：https://lilys.ai/notes/795133 | 可取得第三方逐字稿時間點 |
| 2024 Spring | 第 9 講：以大型語言模型打造的 AI Agent | 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php ；官方 YouTube：https://www.youtube.com/watch?v=bJZTJ7MjYqg ；逐字稿索引：https://lilys.ai/notes/804218 | 可取得第三方逐字稿時間點 |
| 2025 Spring | 第二講：一堂課搞懂 AI Agent 的原理 | 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php ；官方 YouTube：https://www.youtube.com/watch?v=M2Yg1kwPpts ；官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf | 精確影片時間：**查不到**；以下使用官方 PDF 頁碼 |
| 2025 Fall | 從語言模型到 AI Agent／Context Engineering | 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php ；官方 YouTube：https://www.youtube.com/watch?v=lVdajtNpaGI ；官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf | 精確影片時間：**查不到**；以下使用官方 PDF 頁碼 |
| 2026 Spring | AI Agent-1：解剖小龍蝦——以 OpenClaw 為例介紹 AI Agent 的運作原理 | 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php ；官方 YouTube：https://www.youtube.com/watch?v=2rcJdFuNbZQ ；官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf | 精確影片時間：**查不到**；以下使用官方 PDF 頁碼 |
| 2026 Spring | AI Agent-2 (1/3)：Context Engineering 基本概念 | 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php ；官方 YouTube：https://www.youtube.com/watch?v=urwDLyNa9FU ；官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/agent_era.pdf | 精確影片時間：**查不到**；以下使用官方 PDF 頁碼 |
| 2026 Spring | AI Agent-2 (2/3)：AI Agent 之間可以有什麼樣的互動 | 官方課程頁：https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php ；官方 YouTube：https://www.youtube.com/watch?v=mmPmNezjCi0 ；官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/agent_era.pdf | 精確影片時間：**查不到**；以下使用官方 PDF 頁碼 |

### 來源可靠度說明

- **課程名稱、講次、PDF 頁面**：優先以李宏毅教授 NTU 官方網站驗證。
- **影片 URL**：以官方課程頁或官方教材中的 YouTube 連結交叉驗證。
- **2024 精確時間點**：YouTube 本身無法在目前索引中可靠取得完整 transcript，因此時間點來自 Lilys 第三方逐字稿；我只用它作為「定位」，不把第三方摘要當成官方說法。
- **2025／2026 精確時間點**：查不到可可靠交叉驗證的逐秒 transcript，因此不猜時間；改採官方 PDF 頁碼。

---

# 2. 他如何開場介紹 AI Agent？有沒有從一般人使用 ChatGPT 談起？

## 2.1 2024 第 9 講：答案是「有，而且非常直接」

**來源**
- 官方影片：https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 第三方逐字稿定位：https://lilys.ai/notes/804218
- 課程頁：https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php
- 定位：**00:00–02:47**

### 00:00–00:49：先講「今天大家怎麼用 AI」

**【來源內容】**
- 約 00:08，他先指出當時多數人使用 AI，是讓 AI **一次完成一個步驟**。
- 約 00:22，例子包括：
  - 丟文字給 GPT 翻譯；
  - 要 ChatGPT 呼叫 DALL·E 畫圖。
- 然後把它和人類日常要完成的「比較複雜的事情」對比。

### 00:49–02:47：用「約朋友吃飯」把 Agent 引出來

**【來源內容】**
- 約 00:49 開始用「跟朋友吃飯」當例子。
- 事情不是一句 prompt 就完成，而是：
  1. 找大家有空的時間；
  2. 找餐廳；
  3. 訂位；
  4. 安排後續。
- 約 01:51：強調任務有 **multiple steps**，而且步驟有順序。
- 約 02:10：不能連時間都沒確認就先訂餐廳。
- 約 02:19：如果餐廳 A 沒位子，原本計畫就需要改。
- 約 02:33–02:47：才問「AI 能不能自己做到這件事？」並把這種系統帶到 AI Agent。

**【我的歸納】**
這不是用「ChatGPT 很爛」開場，而是：

> 現在大家用 AI，大多是在下一步指令 →  
> 但真實世界工作是一串步驟，而且中間會變 →  
> 如果 AI 能自己規劃、執行、遇到狀況修改計畫，就是 Agent。

這個結構非常適合非工程師，而且跟你的第一段軟體流程可以直接接上。

---

## 2.2 2025 Spring：把對比濃縮成「一個口令一個動作」vs「給 Goal」

**來源**
- 官方影片：https://www.youtube.com/watch?v=M2Yg1kwPpts
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 定位：**PDF P1；影片精確時間點：查不到**

**【來源內容】**
官方 P1 直接把兩種模式並列：

- 「今天使用 AI 的方式」：Human 給 explicit instructions。
- AI 是「**一個口令一個動作**」。
- AI Agent：Human 給的是一個 **Goal**。
- Agent 自己想「要怎麼做才能完成」，過程可以是 multi-step，並且需要彈性調整。

**【我的歸納】**
如果 Agent 101 只想留一張很乾淨的開場圖，2025 P1 比 2024 的完整晚餐故事更容易直接借結構：

**Chat / instruction-driven**
> 我說一步，你做一步。

**Agent / goal-driven**
> 我告訴你終點，你自己決定中間怎麼走。

---

## 2.3 2026 又把它整理成「工具 → 協作 → 代理」

**來源**
- 官方影片：https://www.youtube.com/watch?v=mmPmNezjCi0
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/agent_era.pdf
- 定位：**PDF P47；影片精確時間點：查不到**

**【來源內容】**
P47 的標題是 AI 扮演的角色正在變化，大意分為：

- 工具：人下「一個口令／一個動作」；
- 協作：AI 和人一起完成事情；
- 代理：AI 自己完成工作。

**【我的歸納】**
這張很適合拿來收束「Chat → Agent」的歷史變化，但如果拿來當開場，2024 晚餐故事或 2025 P1 會更直覺。

---

# 3. Owner 六個問題逐一對照

## 總表

| Owner 的問題 | 李宏毅有沒有講？ | 最強來源與定位 | 結論 |
|---|---|---|---|
| 一人分飾多角色 | **有，直接講** | 2024 第 5 講 18:09–25:06；https://www.youtube.com/watch?v=inebiWdQW-4 | 不只 role-play，還談專用模型、PM/programmer/tester、MetaGPT、ChatDev |
| context 污染 | **概念有；這個用詞查不到** | 2025 Fall PDF P39–P54；https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf | 他用「context 太長／塞爆」、Select / Compress / Multi-Agent 來處理 |
| 球員兼裁判 | **概念部分有；這個比喻查不到** | 2024 第 5 講 12:35–15:32；https://www.youtube.com/watch?v=inebiWdQW-4 | self-reflection 較難推翻自己；多模型可獨立提供刺激，也可有獨立 judge |
| 不同問題用不同 model / effort；殺雞用牛刀 | **model 有；effort 查不到** | 2024 第 5 講約 01:10–05:17；https://www.youtube.com/watch?v=inebiWdQW-4 | 不同模型能力／成本不同，可 routing；有「殺雞焉用牛刀」比喻 |
| compact 之後遺忘 | **概念有；精確說法查不到** | 2025 Fall P66–P69；2026 Agent-1 P55–P57 | 壓縮會用摘要取代舊 context；細節需外部保存／必要時再取回 |
| 換 session 看不到之前內容／handoff | **有，尤其 2026 很直接** | 2026 Agent-1 P24–P25、P47–P50 | 每輪本質重新讀 context；新 session 要靠外部 memory/tool 接續 |

以下逐項展開。

---

## 3.1 一人分飾多角色：有，而且 2024 第 5 講是核心

**來源**
- 官方影片：https://www.youtube.com/watch?v=inebiWdQW-4
- 逐字稿定位：https://lilys.ai/notes/795133
- 定位：**18:09–25:06**

### 18:09–20:31：從「不同角色」開始

**【來源內容】**
- 約 18:09 開始轉向不同角色。
- 約 18:51 用 RPG 隊伍舉例：法師、補師、劍士、坦克，各自有不同功能。
- 約 20:16 強調一個團隊需要不同角色。
- 約 20:24：不同 model 可以扮演不同 role。
- 約 20:31：軟體開發例子直接出現 **Project Manager、programmer、tester**。

### 20:45–21:41：角色可以來自不同模型，也可以來自 prompt

**【來源內容】**
- 約 20:45：模型本身可以有專長，例如 coding model。
- 約 21:14：也可以用 prompt 指派角色。
- 約 21:31–21:41：出現一個 workflow：
  - PM 規劃；
  - programmer 實作；
  - tester 測試；
  - 再回 PM 決定下一步。

### 22:11–25:06：團隊化、MetaGPT、ChatDev

**【來源內容】**
- 約 22:11：「**把一個人活成一個團隊**」。
- 約 23:20：介紹 **MetaGPT、ChatDev**。
- 約 23:34：MetaGPT 類型的系統用 Product Manager、Architect、Project Manager、Engineer 等軟體角色。
- 約 24:04：談 ChatDev。
- 約 24:52–25:06：也提醒，真正複雜的大型軟體專案是否能靠這些系統完成，當時仍不能過度樂觀。

**【我的歸納】**
這一段其實很接近你目前的 Dev → PR Review → QA → Product Check，只是李宏毅 2024 的例子比較簡化。

但要注意：
- 李宏毅是在講「**讓模型合作、角色專業化**」；
- 你的 deck 若把角色直接對成 GitHub 看板 stage，是進一步的教學設計，**不是來源原話**。

---

## 3.2 Context 污染：概念非常強，但「context 污染」不是我查到的李宏毅用詞

### A. 2025 Spring：記憶不是越多越好

**來源**
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 定位：**P30–P40；影片精確時間點：查不到**

**【來源內容】**
- P30 用 **Hyperthymesia／超憶症** 類比：什麼都記住不一定是好事。
- P31：讀取真正相關的 experience，可以使用 RAG。
- P37：記憶可能被「**雞毛蒜皮的小事塞爆**」。
- P38–P40：因此 memory 不只是 read，還要決定 **Write** 什麼、並用 **Reflection** 整理。

**【我的歸納】**
這已經非常接近 Owner 說的「context 污染」：
不是「記得越多越好」，而是大量不相關資訊會稀釋真正重要的內容。

---

### B. 2025 Fall：把問題直接提升到 Context Engineering

**來源**
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 官方影片：https://www.youtube.com/watch?v=lVdajtNpaGI
- 定位：**P39–P54；影片精確時間點：查不到**

**【來源內容】**
- P39 把 context 內容列成：
  - User prompt
  - System prompt
  - Dialogue history
  - Memory
  - 其他相關資訊
  - Tool use
  - Reasoning
- 同一張明確標出：**Very long!!!**
- P40：進到為什麼 Agent 時代需要 Context Engineering。
- P45：AI Agent 運行的挑戰之一就是 **輸入過長**。
- P47：就算模型宣稱有很大的 context window，也不代表對整段內容都理解得好。
- P48–P51：示範塞更多資訊反而可能讓效能下降，包括 RAG 放太多資料與 Lost in the Middle 類問題。
- P53 的核心原則是：
  - 「**把需要的放進去**」
  - 「**不需要的清出來**」
- P54 把做法整理成：
  - **Select**
  - **Compress**
  - **Multi-Agent**

**【我的歸納】**
如果 Owner 想講「chat 為什麼最後會出問題」，這是目前最直接的一組教材。

但在 deck 上建議標成：
> 「單一對話／單一 Agent 的 context 會持續累積，雜訊與長度都會增加。」

而不是說：
> 「李宏毅稱它為 context pollution。」

因為**「context 污染」這個精確詞我查不到**。

---

## 3.3 球員兼裁判：精確比喻查不到，但背後問題有講

**來源**
- 官方影片：https://www.youtube.com/watch?v=inebiWdQW-4
- 逐字稿定位：https://lilys.ai/notes/795133
- 定位：**05:49、12:03–15:32**

### Self-reflection

**【來源內容】**
- 約 05:49 開始談 self-reflection：讓模型檢查自己的答案。
- 約 12:35：指出模型反省自己的回答時，**不太容易徹底推翻自己原本的答案**。

### 多模型帶來獨立的新資訊

**【來源內容】**
- 約 12:03：討論可能比單純 self-reflection 帶來更多刺激。
- 約 13:05：另一個 model 提供的是不同來源的新刺激，因此有更大的機會讓原本錯誤的答案被翻掉。

### 把討論者與裁判拆開

**【來源內容】**
- 約 14:07：介紹不同討論 topology，其中包含 B、C 討論，A 當 judge 的結構。
- 約 15:32：也談到用另一個 model 判斷是否達成共識／是否停止討論。

**【我的歸納】**
這可以對應 Owner 的「球員兼裁判」，但應寫成：

> **Owner 的比喻：球員兼裁判。**  
> 李宏毅實際講的是：self-reflection 有「不容易推翻自己」的問題；可以引入不同模型的獨立觀點，甚至把 judge 拆成另一個模型。

不要把「球員兼裁判」加引號說成是李宏毅原話，因為**查不到**。

---

## 3.4 不同問題選不同 model／effort：model routing 有；effort 參數查不到

### 2024 第 5 講：這一點其實講得很早

**來源**
- 官方影片：https://www.youtube.com/watch?v=inebiWdQW-4
- 逐字稿定位：https://lilys.ai/notes/795133
- 定位：**約 01:10–05:17**

**【來源內容】**
- 前段先談不同語言模型能力不同、成本也不同。
- 不是每一個問題都需要最強的模型。
- 這裡出現很直覺的比喻：**「殺雞焉用牛刀」**。
- 約 05:05：提到實際服務可能會根據題目使用不同模型。
- 約 05:17：介紹 **FrugalGPT** 類型的想法——如何組合／選擇模型兼顧能力與成本。

### 2025 Spring：其他 AI 也可以是 Agent 的 Tool

**來源**
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 定位：**P47；影片精確時間點：查不到**

**【來源內容】**
工具不只 Search Engine、Python，也可以是：
- **Other AI**
- Different capabilities
- stronger but costly

**【我的歸納】**
Owner 這一點建議拆成兩個層級：

1. **不同 task 用不同 model**：有來源，支援很強。
2. **不同 task 動態設定 reasoning effort**：在本次查到的李宏毅教材中，**查不到**。

所以投影片可以說「模型路由／能力與成本匹配」，不要把「effort」也掛在李宏毅名下。

---

## 3.5 Compact 之後遺忘：有高度對應，但來源的講法是 compression / summary / pruning

### 2025 Fall：Compress 是 Context Engineering 的正式手段

**來源**
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 定位：**P66–P69；影片精確時間點：查不到**

**【來源內容】**
- P66 起講 compression。
- P67：遠端的舊內容經過摘要後，細節會逐漸消失。
- P68：Computer Use 這類 Agent 會產生大量瑣碎操作紀錄。
- P69：完整細節可以移去外部的長期儲存，需要時再透過 RAG 找回。

**【我的歸納】**
這和 Owner 的「compact 後遺忘」非常接近，但更精確的說法是：

> **Compression 是有損的；如果只保留 summary，細節自然不再全部存在當前 context。重要內容需要外部化，之後按需取回。**

---

### 2026 Agent-1：直接出現 Context Compression / Pruning

**來源**
- 官方影片：https://www.youtube.com/watch?v=2rcJdFuNbZQ
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf
- 定位：**P55–P57；影片精確時間點：查不到**

**【來源內容】**
- P55：Context Compression。
- P56：以摘要替代原本很長的內容。
- P57：Pruning 可以 soft trim，也可以 hard clear。

**【我的歸納】**
這組投影片可以直接拿來支撐：
「你不可能無限保留完整聊天紀錄；壓縮是必要手段，但也會產生資訊損失。」

「compact 後遺忘」這個產品術語／講法本身，**查不到李宏毅使用**。

---

## 3.6 換 Session 看不到之前內容／handoff：2026 的教材非常直接

**來源**
- 官方影片：https://www.youtube.com/watch?v=2rcJdFuNbZQ
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf
- 定位：**P24–P25、P47–P52；影片精確時間點：查不到**

### P24–P25：每輪其實都是重新把歷史送進去

**【來源內容】**
- 多輪聊天不是模型腦中一直保有狀態，而是後續呼叫會把前面需要的對話歷史再次放進 context。
- P25 有一句非常好懂的概念：AI Agent 每次對話其實都像**重新開始**，只是重新閱讀之前的紀錄。

### P47–P50：Context 不夠時，就得清掉／開新對話，再靠工具延續

**【來源內容】**
- P47：長時間運行後 context 終究不夠，因此需要清理歷史、重新開始。
- P48–P49：以 Agent 的設定文字示範「新 session 醒來後」如何靠外部檔案持續工作。
- P50：明確整理成：**跨 session 的記憶靠工具取得**，例如 Memory Recall / RAG。

### P52：光說「我會記住」沒有用

**【來源內容】**
- 課程用很口語的方式提醒：如果模型沒有真的用工具把資訊寫到外部 memory，那口頭承諾記住，本身不會形成跨 session 的可靠記憶。

**【我的歸納】**
這正好可以用來講 handoff：

> 換 session 並不是「同一顆腦繼續想」。  
> 新 session 能不能接續，取決於前一個 session **留下了什麼可再讀取的外部狀態**。

對你的軟體開發教材來說，Ticket、PR、AC、測試結果、handoff note 就可以成為這種外部狀態。

最後這句是 **我的映射，不是李宏毅原話**。

---

# 4. 除了 Owner 六點，李宏毅還反覆強調哪些單 Agent／LLM 問題？

## 4.1 Planning 不是「先想一次就照表操課」

**來源**
- 2024 第 9 講官方影片：https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 逐字稿：https://lilys.ai/notes/804218
- 定位：**00:49–03:42**

**【來源內容】**
晚餐例子不是只證明任務有多步驟，也證明：
- 步驟有順序；
- 世界會回傳結果；
- 原計畫可能失敗；
- 因此 Agent 要會重新規劃。

約 02:19「餐廳 A 沒位子」就是最簡單的 re-plan 例子。

**【我的歸納】**
這其實比單講「AI 要會 planning」更適合小白：
**計畫不是 itinerary，而是能隨環境結果更新的行動序列。**

---

## 4.2 Tool 太多，本身也會變成 Context 問題

**來源**
- 2025 Spring 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 定位：**P54–P56；影片精確時間點：查不到**
- 2025 Fall 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 定位：**P58；影片精確時間點：查不到**
- 2026 Agent-2 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/agent_era.pdf
- 定位：**P21–P25；影片精確時間點：查不到**

**【來源內容】**
- Agent 有很多 tools 時，光是所有 tool description 就會佔 context。
- 因此需要 Tool Selection／按需載入。
- 2026 教材還用 GitHub tools 的大量描述作為具體例子。

**【我的歸納】**
這很適合你之後講 MCP / Plugins 時提醒：
> 「工具越多 ≠ Agent 自動越強；它也會增加選擇負擔與 context 成本。」

---

## 4.3 Tool 回傳結果不一定可靠

**來源**
- 2025 Spring 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 定位：**P57–P67；影片精確時間點：查不到**

**【來源內容】**
教材討論 Agent 使用 tool 後，不能把工具輸出無條件當真；Agent 還需要判斷工具結果是否可信。

**【我的歸納】**
這可以放到 QA / Verification 的理由裡：
Agent 能調 API 並不等於結果已經被驗收。

---

# 5. Multi-Agent：李宏毅到底怎麼介紹？

李宏毅教授其實至少用了三種不同理由來講 Multi-Agent。把它們混成「多 Agent 比一隻強」會失真。

---

## 5.1 理由一：不同模型有不同能力與成本

**來源**
- 2024 第 5 講官方影片：https://www.youtube.com/watch?v=inebiWdQW-4
- 逐字稿：https://lilys.ai/notes/795133
- 定位：**約 01:10–05:17**

**【來源內容】**
不需要每題都叫最強模型；可以依任務選擇不同模型，兼顧品質與成本。

**【我的歸納】**
這是 **routing / specialization**，不等於 role-play。

---

## 5.2 理由二：讓另一個模型提供獨立觀點，而不是只有 self-reflection

**來源**
- 同上
- 定位：**05:49、12:03–15:32**

**【來源內容】**
- 自己檢查自己有用；
- 但另一個模型能提供新的刺激；
- 還可以設計 debate、supervisor、pipeline 或 judge。

**【我的歸納】**
這條最適合對應 Owner 的「球員兼裁判」。

---

## 5.3 理由三：不同角色合作

**來源**
- 同上
- 定位：**18:09–25:06**

**【來源內容】**
RPG party → 軟體團隊 → PM / programmer / tester → MetaGPT / ChatDev。

**【我的歸納】**
這是最傳統的「Multi-Agent = team」敘事，也是最容易被非工程師理解的版本。

---

## 5.4 理由四：Multi-Agent 還是 Context Engineering

這是 2025 Fall 最值得補進你現在 deck 的地方。

**來源**
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 官方影片：https://www.youtube.com/watch?v=lVdajtNpaGI
- 定位：**P53–P54、P70–P73；影片精確時間點：查不到**

### P53–P54：先把 Multi-Agent 放在「怎麼管理 context」底下

**【來源內容】**
Context Engineering 的目標是：
- 需要的資訊放進來；
- 不需要的資訊清出去。

方法包括：
- Select
- Compress
- Multi-Agent

這裡 **Multi-Agent 並不是突然開一個新主題**，而是「避免所有資訊塞在同一個 context」的一種策略。

### P71：Single Agent 的旅行規劃

**【來源內容】**
一個 Agent 同時：
- 規劃；
- 找餐廳；
- 跟餐廳網站互動；
- 訂飯店；
- 跟飯店網站互動。

所有細節持續累積在同一條工作脈絡裡。

### P72：Multiple Agent

**【來源內容】**
改成不同 Agent：
- Agent 1 專心處理餐廳；
- Agent 2 專心處理飯店；
- Lead Agent 不需要知道各個網站互動的所有操作細節；
- 子 Agent 只需要把必要結果，例如「訂好了」，傳回去。

**【我的歸納】**
這是你要的最強轉場：

> 問題不是「一隻 Agent 智商不夠，所以多叫幾隻」。  
> 問題是「一個長任務會產生大量只對局部步驟有用的 context」。  
> 把工作切給不同 Agent，就等於同時把 context 的責任邊界切開。

---

# 6. 2026：Subagent = Context 隔離 + 自主壓縮

## 6.1 OpenClaw 課：父 Agent 不需要接收子 Agent 的完整過程

**來源**
- 官方影片：https://www.youtube.com/watch?v=2rcJdFuNbZQ
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf
- 定位：**P35–P37；影片精確時間點：查不到**

**【來源內容】**
例子是：
- 主 Agent 派 subagent 各自去讀 paper；
- 子 Agent 可以有自己較短、較專注的 context；
- 父 Agent 最後只接收整理後的結果；
- 不需要把每個 subagent 的 web interaction、paper 全文等細節全部吃進主 context。

---

## 6.2 Agent-2：直接稱 Subagent 是一種「自主壓縮」

**來源**
- 官方影片：https://www.youtube.com/watch?v=urwDLyNa9FU
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/agent_era.pdf
- 定位：**P17；影片精確時間點：查不到**

**【來源內容】**
P17 明確把 subagent 描述成一種 **自主壓縮**：
- subagent 內部做了很多事；
- 回到 parent context 時，可以只留下 Return；
- 詳細 trace 等於沒有全部往上堆。

**【我的歸納】**
這讓 Multi-Agent 的理由比「模擬公司組織」更紮實：

> Multi-Agent 不只是在角色扮演。  
> 它也可以是計算與 context 的隔離邊界。

這非常適合你的 Agent 101 第二段。

---

# 7. 「Chat 的限制 → Multi-Agent / Workflow」：最值得採用的來源過渡順序

這是第 2 輪特別補查的重點。

## 7.1 李宏毅 2025 Fall 的實際教材順序

**來源**
- 官方影片：https://www.youtube.com/watch?v=lVdajtNpaGI
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 精確影片時間點：**查不到**

教材順序大致是：

### Step 1 — P39：先攤開「現在模型到底看了多少東西」

**【來源內容】**
User prompt、System prompt、Dialogue history、Memory、其他資訊、Tool use、Reasoning 全部都是 context，最後變得 **Very long!!!**

### Step 2 — P40–P45：Agent 時代，這件事變得更嚴重

**【來源內容】**
- P41 先區分：
  - 一般使用 AI：one-question-one-answer；
  - Agentic Workflow：照固定 SOP；
  - AI Agent：自己決定步驟，並彈性調整。
- P45 接著點出 Agent 運作的挑戰：**輸入過長**。

### Step 3 — P47–P51：Context window 大，不代表塞得越多越好

**【來源內容】**
即使長度裝得下，模型也可能無法同樣有效利用所有資訊；太多 RAG 文件、資訊埋在中間等都可能傷害表現。

### Step 4 — P53：定義 Context Engineering 的核心

**【來源內容】**
核心變成：
- 把需要的資訊放進去；
- 把不需要的清出去。

### Step 5 — P54：才出現三種方法

**【來源內容】**
- Select
- Compress
- Multi-Agent

### Step 6 — P58–P69：先講 Select / Compress

**【來源內容】**
- Tool description 不要全部一直塞。
- Memory 按需取回。
- 舊 context 可以 summary。
- 重要細節外部化，需要時 RAG。

### Step 7 — P70–P72：最後 Multi-Agent 登場

**【來源內容】**
用旅行預訂比較：
- Single Agent：一路帶著餐廳、飯店、網站操作等所有局部細節。
- Multiple Agent：餐廳和飯店各有自己的工作 context；Lead 收必要結果即可。

---

## 7.2 這個過渡的重要性

**【我的歸納】**

這組順序比：

> Single Agent 不夠強 → 所以找 Multi-Agent

更完整。

李宏毅這組教材實際給你的是：

> Agent 做的事變長、變多步驟  
> → 產生越來越多 context  
> → 不是所有資訊都值得一直留在當前 context  
> → 要 Select / Compress  
> → 還可以直接把工作和 context 拆到不同 Agent  
> → Multi-Agent 因此成為 Context Engineering 的方法之一。

這非常接近 Owner 要求的敘事，而且能避免「single agent / multi-agent / chat-driven / work-driven 全混在一起」。

---

# 8. 有沒有「Workflow」這一層？有，而且 2025 Fall 明確分開

**來源**
- 官方 PDF：https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 定位：**P41；影片精確時間點：查不到**

**【來源內容】**
P41 把三種模式分開：

1. 一般使用 AI：一問一答；
2. **Agentic Workflow**：流程／SOP 事先固定；
3. **AI Agent**：AI 自己決定下一步，可以依狀況修改。

**【我的歸納】**
這一張其實可以替你的 deck 解掉一個概念混亂：

- **Chat-driven**：人持續下下一步。
- **Workflow-driven**：步驟的 orchestration 已經外部化成固定流程。
- **Agent-driven**：Agent 可以自行決定下一步。
- **Multi-Agent**：是工作／context／角色如何切分；它和前三者不是同一條單選軸。

最後四句是我的術語整理，不是李宏毅教授在 P41 上使用的完整分類名稱。

---

# 9. 非工程師最有效的比喻／例子

## 9.1 約朋友吃飯：最適合解釋「為什麼 Agent 不只是 Chat」

**來源**
- https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 定位：**00:49–02:47**

**有效原因【我的歸納】**
每個人都知道：
- 要先約時間；
- 再找店；
- 沒位子要換；
- 下一步取決於上一步結果。

幾乎不用任何技術名詞就能講 planning、tool use、environment feedback、re-planning。

---

## 9.2 「一個口令一個動作」：最適合定義 Chat → Agent

**來源**
- https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 定位：**P1**

**有效原因【我的歸納】**
一句話就把 instruction-driven 和 goal-driven 分開。

---

## 9.3 「殺雞焉用牛刀」：最適合講 Model Routing / Cost

**來源**
- https://www.youtube.com/watch?v=inebiWdQW-4
- 逐字稿：https://lilys.ai/notes/795133
- 定位：**約 01:10–05:05**

**有效原因【我的歸納】**
不用先懂 token、latency、reasoning budget，就能理解「不是每一步都值得用最貴的模型」。

---

## 9.4 RPG 隊伍：最適合講 Role Specialization

**來源**
- https://www.youtube.com/watch?v=inebiWdQW-4
- 定位：**約 18:51–20:24**

**來源內容**
法師、補師、劍士、坦克各有不同功能。

**有效原因【我的歸納】**
「多人」的價值不是人數，而是**能力互補**。

---

## 9.5 超憶症：最適合反駁「記得越多越好」

**來源**
- https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 定位：**P30**

**有效原因【我的歸納】**
直接把 memory 問題從「容量不夠」翻成「選擇什麼值得記」。

---

## 9.6 「被雞毛蒜皮的小事塞爆」：最適合講 Context Noise

**來源**
- https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf
- 定位：**P37**

**有效原因【我的歸納】**
非常接近一般人使用長 chat 的實際感受，比 Lost in the Middle 更容易懂。

---

## 9.7 Single Agent 訂整趟旅行 vs 多 Agent 分開訂餐廳／飯店：最適合講 Context Isolation

**來源**
- https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 定位：**P71–P72**

**有效原因【我的歸納】**
這不是抽象說「context 很長」，而是直接看出：
訂餐廳時點過哪些頁面，根本沒必要讓訂飯店的人全部知道。

---

## 9.8 「每次對話其實重新開始」：最適合講 Session

**來源**
- https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf
- 定位：**P24–P25**

**有效原因【我的歸納】**
把「LLM 沒有一顆持續運作的腦」這件事講得很直覺：
continuity 是系統把紀錄重新放進去的結果，不是模型天然擁有永久記憶。

---

# 10. 對 Agent 101 最有用的重排方式
## 這一節全部是【我的歸納】，不是李宏毅教授原始投影片順序

你已經在第一段教完：

**Goal → Refinement → Ready → Dev → PR Review → QA → Product/Goal Check → Done**

後面我建議不要立刻說「一隻 Agent 不夠」。

應該先讓觀眾經過下面這條因果鏈。

---

## Slide A — 大家其實已經會用 AI：Chat

一句核心：

> **你說一步，AI 做一步。**

來源依據：
- 2024 第 9 講 00:08–00:49  
  https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 2025 Spring P1  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf

---

## Slide B — 但「工作」不是一個回答

用晚餐故事：

> 約時間 → 找店 → 訂位 → 失敗就改。

來源：
- 2024 第 9 講 00:49–02:47  
  https://www.youtube.com/watch?v=bJZTJ7MjYqg

接回上一段 workshop：
軟體開發也是同樣的多步驟工作，只是你的步驟已經被顯式化成看板。

---

## Slide C — 如果全部都塞在同一個 Chat，會發生什麼？

可以列 Owner 的問題，但要分「來源支持」與「你的產品觀察」：

- Dialogue history 越來越長；
- Memory、tools、reasoning 都一起佔 context；
- 不相關細節會累積；
- 自己檢查自己不一定能推翻原答案；
- 所有步驟都用同一個模型，不一定划算；
- session / compact 需要做交接。

來源：
- 2025 Fall P39–P54  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 2024 第 5 講 12:35–15:32  
  https://www.youtube.com/watch?v=inebiWdQW-4
- 2026 Agent-1 P24–P25、P47–P57  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf

---

## Slide D — 第一個答案不是 Multi-Agent，而是 Context Engineering

一句：

> **需要的放進來，不需要的清出去。**

然後只放三個詞：

**Select · Compress · Multi-Agent**

來源：
- 2025 Fall P53–P54  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf

這一張會讓 Multi-Agent 不再像突然跳出來的新 buzzword。

---

## Slide E — Select / Compress 有用，但不是免費午餐

- Select：你必須知道什麼現在重要。
- Compress：摘要一定比完整原文少資訊。
- 新 session：需要靠外部記憶／artifact 接續。

來源：
- 2025 Fall P58–P69  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 2026 Agent-1 P47–P57  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf

---

## Slide F — 所以把「工作」和「Context」一起切開

先不要講「公司裡有很多 AI 員工」。

先放旅行例子：

**Single Agent**
> 規劃、餐廳、飯店、網站操作，全塞一起。

**Multiple Agents**
> 餐廳 Agent 處理餐廳；飯店 Agent 處理飯店；Lead 只收必要結果。

來源：
- 2025 Fall P71–P72  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf

---

## Slide G — 再補「不同 Agent 可以真的不一樣」

這時候再帶：

- 不同模型：不同能力／成本；
- 不同角色：PM / programmer / tester；
- 不同觀點：debate；
- 不同 judge；
- 專用 model；
- MetaGPT / ChatDev。

來源：
- 2024 第 5 講 01:10–05:17、12:03–15:32、18:09–25:06  
  https://www.youtube.com/watch?v=inebiWdQW-4

這樣才不會把「multi-agent」只教成「同一顆模型 prompt 成三個角色」。

---

## Slide H — 最後才映射回你的軟體工作流

**【我的歸納】**

你可以說：

> 我們前面已經把工作拆成 ticket 和 stage。  
> 現在只是把每個 stage 的責任，交給不同 Agent／workflow。  
> 真正的交接不是「相信下一個 Agent 看得懂上一個 chat」，而是靠 Ticket、AC、PR、test evidence、review result 這些 durable artifacts。

例如：

- Refinement / PM Agent
- Dev Agent
- Review Agent
- QA Agent
- Product / Goal Check Agent

看板負責 **external task state**；  
Ticket / PR / evidence 負責 **handoff**；  
每個 Agent 只需要自己的 **bounded context**。

注意：這個完整映射是你的 Agent 101 教學設計，**不是李宏毅教授原話**。

---

# 11. 對 Owner 六點的最終建議用詞

為避免把你的觀察誤植成教授原話，我建議投影片這樣寫：

### 1. 一人分飾多角色
**可直接引用李宏毅的概念。**

> 同一個模型可以靠 prompt 扮演 PM、programmer、tester；也可以用真正不同、各有專長的模型組隊。

來源：
- 2024 第 5 講 20:24–21:41  
  https://www.youtube.com/watch?v=inebiWdQW-4

---

### 2. Context 污染
**建議標成你的術語。**

> Owner 稱為「context 污染」：對話、memory、tool output、reasoning 不斷堆積，長到裝得下也不代表模型用得好。

來源：
- 2025 Fall P39–P54  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf

精確詞「context 污染」：**查不到李宏毅使用。**

---

### 3. 球員兼裁判
**建議標成你的比喻。**

> Self-reflection 不一定容易推翻自己；可以加入獨立模型提供新刺激，甚至另外設 judge。

來源：
- 2024 第 5 講 12:35–15:32  
  https://www.youtube.com/watch?v=inebiWdQW-4

精確詞「球員兼裁判」：**查不到李宏毅使用。**

---

### 4. 殺雞用牛刀
**這個比喻來源有講。**

> 不同問題不一定都要用最強、最貴的模型。

來源：
- 2024 第 5 講約 01:10–05:17  
  https://www.youtube.com/watch?v=inebiWdQW-4

「按 task 選不同 reasoning effort」：**查不到**。

---

### 5. Compact 後遺忘
**建議改成比較精確的：Compression 是有損的。**

> 舊 context 被摘要後，完整細節不再都留在當前 context；重要細節應外部化，必要時再找回。

來源：
- 2025 Fall P66–P69  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf
- 2026 Agent-1 P55–P57  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf

精確詞「compact 後遺忘」：**查不到李宏毅這樣說。**

---

### 6. 換 Session / Handoff
**有強來源。**

> 新 session 的 continuity 不是憑空存在；要靠重新提供對話紀錄，或從外部 memory / artifact 取回。

來源：
- 2026 Agent-1 P24–P25、P47–P52  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf

---

# 12. 第 2 輪修正紀錄

以下是這輪特別做的來源校正。

## 保留並確認

1. **2024 第 5 講**
   - 官方課程頁存在。
   - 官方影片 `inebiWdQW-4` 存在。
   - MetaGPT、ChatDev、角色分工、多模型討論、judge、自我反省等段落都有逐字稿定位。
   - 精確時間點來源不是官方 chapter，而是 Lilys transcript，因此已全部明示。

2. **2024 第 9 講**
   - 官方影片 `bJZTJ7MjYqg` 存在。
   - 「一般一次做一步 → 晚餐多步驟 → AI Agent」的開場可由逐字稿定位到 00:00–02:47。

3. **2025 Spring AI Agent**
   - 官方課程頁、YouTube `M2Yg1kwPpts`、官方 `ai_agent.pdf` 都存在。
   - 因精確影片時間無可靠索引，本版不再猜 timestamp，只採 PDF page。

4. **2025 Fall Context Engineering**
   - 官方課程頁與 `Agent.pdf` 存在。
   - 官方 YouTube `lVdajtNpaGI` 已由官方課程脈絡／教材交叉確認。
   - 這輪新增並確認 P39 → P54 → P71 → P72 是最完整的「context 問題 → Multi-Agent」過渡。

5. **2026 Spring OpenClaw / Agent-2**
   - 官方課程頁存在。
   - `2rcJdFuNbZQ`、`urwDLyNa9FU`、`mmPmNezjCi0` 三支影片與兩份官方 PDF 均可對應。
   - 本版用 PDF 頁碼定位 session、compression、subagent 等內容，沒有捏造精確影片秒數。

---

## 本版特別刪除／降級成「查不到」的說法

1. **李宏毅有沒有直接說「context 污染」？**
   - 查不到。
   - 只能說他的 context-too-long / noise / selection 問題高度對應這個 Owner 用語。

2. **李宏毅有沒有直接說「球員兼裁判」？**
   - 查不到。
   - 有 self-reflection 不易推翻自己、獨立模型與 judge 的概念支援。

3. **李宏毅有沒有講 reasoning effort routing？**
   - 查不到。
   - 有明確 model routing、capability / cost trade-off。

4. **李宏毅有沒有直接說「compact 後會遺忘」？**
   - 查不到這個產品化措辭。
   - 有 compression、summary、pruning、hard clear，以及外部 memory / RAG 的完整概念。

5. **2025／2026 精確影片 timestamp**
   - 查不到足夠可靠的逐秒索引。
   - 本文件一律改用官方 PDF page，不製造假的 timestamp。

---

# 13. 最終判斷：如果只取李宏毅的教材，你的兩段應該怎麼分？

## 第一段：為什麼「一直 Chat」會出問題

最適合的來源主幹：

1. **2024 第 9 講 00:08–02:47**  
   一次一個動作 vs 真實工作是多步驟、會變動。  
   https://www.youtube.com/watch?v=bJZTJ7MjYqg

2. **2025 Spring P1**  
   「一個口令一個動作」vs 給 Goal。  
   https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf

3. **2025 Fall P39–P54**  
   Agent 的 context 由 history、memory、tools、reasoning 等快速膨脹；解法是 Select / Compress / Multi-Agent。  
   https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf

4. **2026 P24–P25、P47–P57**  
   session continuity、external memory、compression / pruning。  
   https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf

---

## 第二段：怎麼把工作交給多個 Agent

最適合的來源主幹：

1. **2025 Fall P71–P72**  
   先從 Single Agent vs Multiple Agent 的旅行例子，講 **context isolation**。  
   https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf

2. **2026 Agent-2 P17**  
   subagent 是一種自主壓縮；父 Agent 只收 Return。  
   https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/agent_era.pdf

3. **2024 第 5 講 12:03–25:06**  
   再補不同觀點、judge、角色、PM/programmer/tester、MetaGPT、ChatDev。  
   https://www.youtube.com/watch?v=inebiWdQW-4

**【我的歸納】**

這樣的敘事比：

> 「Single Agent 有缺點 → Multi-Agent 比較厲害」

更準確，也更能接你的前一段看板課程：

> **Chat 是互動介面；Workflow 是工作流程；Agent 是能自主推進的執行者；Multi-Agent 是把責任、角色與 context 邊界分開。**

---

# 14. 完整來源 URL

## 2024
- 課程首頁：  
  https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring.php
- 第 5 講官方影片：  
  https://www.youtube.com/watch?v=inebiWdQW-4
- 第 5 講第三方逐字稿索引：  
  https://lilys.ai/notes/795133
- 第 9 講官方影片：  
  https://www.youtube.com/watch?v=bJZTJ7MjYqg
- 第 9 講第三方逐字稿索引：  
  https://lilys.ai/notes/804218

## 2025 Spring
- 課程首頁：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php
- 官方影片：  
  https://www.youtube.com/watch?v=M2Yg1kwPpts
- 官方投影片：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2025-course-data/ai_agent.pdf

## 2025 Fall
- 課程首頁：  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall.php
- 官方影片：  
  https://www.youtube.com/watch?v=lVdajtNpaGI
- 官方投影片：  
  https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf

## 2026 Spring
- 課程首頁：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/2026-spring.php
- Agent-1 / OpenClaw 官方影片：  
  https://www.youtube.com/watch?v=2rcJdFuNbZQ
- Agent-1 官方投影片：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf
- Agent-2 (1/3) Context Engineering 官方影片：  
  https://www.youtube.com/watch?v=urwDLyNa9FU
- Agent-2 (2/3) Agent Interaction 官方影片：  
  https://www.youtube.com/watch?v=mmPmNezjCi0
- Agent-2 官方投影片：  
  https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/agent_era.pdf

---

# 一句話版本

**【我的歸納】**

李宏毅這幾年教材最值得借用的主線，不是「一隻 Agent 不夠聰明，所以改成很多隻」，而是：

> **我們從一問一答的 Chat，走向多步驟 Agent；Agent 越做越久，context 就越難管理；Context Engineering 先做 Select / Compress，而 Multi-Agent 進一步把工作、角色和 context 邊界一起拆開。**

這條線最符合 Owner 想要的敘事。
