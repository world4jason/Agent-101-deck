以下只統整指定檔案；沒有修改檔案。標記方式：**【來源明示】**表示檔案引述的公開教材有該內容；**【歸納】**表示本 workshop 的編排、比喻或做法。網頁文章以小節定位；投影片和影片盡量使用檔案中可定位的 PDF 頁碼或時間點。

**資料缺口：**指定檔案反覆提到「同一張 #3」，但沒有 #3 的票面、需求或驗收條件。因此下文只以 **#3** 作為貫穿全場的工作項目，不替它編造功能內容。

## 1. 兩條路線對照

| 判斷 | 對照結果 |
|---|---|
| **兩邊一致，可信度高** | **【來源明示】**一般問答與持續完成任務不同；長任務需要管理 context、狀態與交接；角色、模型和檢查步驟可以按工作拆分；多 Agent 也有協調成本。[Stanford CS329A，40:54–43:00](https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2454s)、[李宏毅 2025 秋季講義，第 42、46–55、72–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=42)、[Microsoft 第 08 課〈Advantages of Using Multi-Agents〉](https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md)。**【歸納】**兩路都支持「先看工作需要，再決定如何分工」，不支持「Agent 越多越好」。 |
| **Codex 路線較獨有** | **【來源明示】**Stanford CS329T 第 4 講直接把 AI 安排進軟體開發的人類工作流程；Notion 範例則讓 Ready 卡片啟動工作、把進度留在卡片、由隊友審 PR。[CS329T，第 8、11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=8)、[Notion 看板指南，步驟 2–5](https://www.notion.com/en-gb/help/guides/how-to-set-up-claude-agents-on-your-teams-notion-task-board)。**【歸納】**這組材料最適合接第一幕的 #3 看板。 |
| **Web 路線較獨有** | **【來源明示】**Stanford CS224G 明列 workflow／agent 與 single／multi-agent 兩種比較；OpenAI Symphony 描述從管理多個互動 session，轉向讓 Agent 從 issue tracker 取得工作；Cognition 和 Stanford HAI 提供多 Agent 協調失敗的反例。[CS224G，PDF 第 5、10、12–13、61 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=5)、[Symphony〈A shift in perspective〉](https://openai.com/index/open-source-codex-orchestration-symphony/)、[Stanford HAI〈Talk Is Cheap〉](https://hai.stanford.edu/news/ai-coding-agents-fail-at-teamwork)。 |

**需要裁決的差異：**

| 差異與兩邊來源 | 判斷 |
|---|---|
| Codex 將李宏毅 2025 秋季「一問一答／固定 SOP／Agent」標為 **PDF 第 42 頁**；web 重跑版標為 **P41**。[Codex `r2-hylee.md` 所引 PDF 第 42 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=42)；web `web-r2-hylee-run2.md` 所引同一 PDF 的 P41。 | **【歸納】**這是投影片內部編號與 PDF 閱讀器頁碼相差一頁，並非內容矛盾。對外一律用可點開的 **PDF 第 42 頁**。CS224G 的 web 文件也有同類差一頁情況，本文同樣採 PDF 閱讀器頁碼。 |
| Codex 認為「一人分飾多角色」只獲**部分支持**；web GitHub 路線稱角色分工有**強直接證據**。[Codex `r2-github.md` 所引 Microsoft 第 08 課](https://github.com/microsoft/ai-agents-for-beginners/blob/main/08-multi-agent/README.md)；[web `web-r2-github.md` 所引 Datawhale 第 13 章 §13.3.1](https://github.com/datawhalechina/hello-agents/blob/main/docs/chapter13/%E7%AC%AC%E5%8D%81%E4%B8%89%E7%AB%A0%20%E6%99%BA%E8%83%BD%E6%97%85%E8%A1%8C%E5%8A%A9%E6%89%8B.md)。 | **【歸納】**兩邊談的是不同強度的主張。**「複雜工作可按角色拆分」有直接證據；「同一個 chat 一人分飾多角必然失敗」查不到。**採 Codex 的較窄界線。 |
| 有些 web 整理借 Hugging Face 的 *agency level* 把 multi-agent 放在較後的位置；Stanford 追加追問則說 workflow／agent 與 single／multi 是兩個不同問題。[Hugging Face〈Agency Level〉](https://huggingface.co/learn/agents-course/en/unit1/what-are-agents)、[Stanford CS224G，PDF 第 5、13、61 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=5)。 | **【歸納】**本 workshop 採 Stanford 的概念分界：**誰決定路徑**與**誰承擔責任**分開教。Hugging Face 的表可作其教材的能力分級，不能推成「workflow 必然升級為 multi-agent」。 |
| Codex 的課程調查說逐任務 **reasoning effort 查不到**；web 自由探索找到 OpenAI SDK 的設定文件。[Codex `r2-hylee.md` 所引 FrugalGPT 第 9 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/FrugalGPT-v2.pdf#page=9)；[web `web-r2-free.md` 所引 OpenAI Agents SDK〈GPT-5 models〉、〈Mixing models in one workflow〉](https://openai.github.io/openai-agents-python/models/)。 | **【歸納】**兩者可同時成立：**模型路由**有課程證據，**effort 可設定**有產品文件證據；「一般 chat 無法選 model／effort」仍查不到。 |
| web Stanford 初版把 CS25 的 Jim Fan 演講與 11/28 影片混用；web 重跑版改列 Jim Fan **10/24**，Codex 也把 10/24 與 11/28 分開。[Stanford CS25 課表，10/24、11/28](https://web.stanford.edu/class/cs25/past/cs25-v3/index.html)；[Jim Fan 影片](https://www.youtube.com/watch?v=wwQ1LQA3RCU)、[11/28 影片](https://www.youtube.com/watch?v=ylEk1TE1uBo)。 | **【歸納】**採重跑版與 Codex 的區分；不拿兩支影片混用的時間碼作主證據。 |

## 2. 第 4、5、6 段逐頁草稿

**編排規則：【歸納】**下列頁名、重點和主圖都是本 workshop 草稿。每頁所引的教材只支持標出的機制，不代表原作者提出這套頁序。三段各有 4、4、5 頁。

### 第 4 段｜從 chat 開始，以及 chat 的問題

| 頁 | 標題就是內容；一句話重點【歸納】 | 主圖【歸納】 | 來源 |
|---|---|---|---|
| 4-1 | **Chat 讓我們一步一步叫 AI 做事；Agent 則能朝目標持續行動。** 一次回答和完成一串會隨結果調整的工作，單位不同。 | 左邊「問→答→人再問」；右邊「目標→行動→觀察→調整」。 | **【來源明示】**[李宏毅 2024 第 9 講，00:08–02:47](https://www.youtube.com/watch?v=bJZTJ7MjYqg&t=8s)；[Stanford CS329A，40:54–42:45](https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2454s)。 |
| 4-2 | **同一段對話包辦規劃、實作與自評，責任邊界會看不清。** 這頁放「一人分飾多角色」與「球員兼裁判」，但不宣稱自評一定無效。 | #3 從 PM、Dev 到 Review 都塞進同一個聊天框；審查結果旁放問號。 | **【來源明示】**[李宏毅 2024 第 5 講，20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s)有軟體角色交接；[Stanford CS224G，PDF 第 25 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=25)拆生成與評估。 |
| 4-3 | **對話越長，舊資料越難挑；摘要和換 session 又可能漏掉交接。** 說清 context 混雜、壓縮取捨與 session 邊界。 | 一條增長的 #3 對話，分別標出舊要求、工具雜訊、摘要後缺的決定。 | **【來源明示】**[李宏毅 2025 秋季講義，PDF 第 40、46–52、67–70 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=40)；[2026 講義，PDF 第 24–25、47–52 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf#page=24)。 |
| 4-4 | **若每一步沿用同一套配置，簡單工作也可能用上昂貴模型。** 收尾問：「#3 的下一位接手者，要去哪裡看現況？」 | #3 的多個工作站共用一個模型設定；旁邊是空白的交接欄。 | **【來源明示】**[李宏毅 FrugalGPT，第 9 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/FrugalGPT-v2.pdf#page=9)與[Stanford CS329T 第 3 講，第 9 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=9)支持按難度選模型；「chat 不能選」**查不到**。 |

### 第 5 段｜交給多個 Agent，並帶出 SHIFT

| 頁 | 標題就是內容；一句話重點【歸納】 | 主圖【歸納】 | 來源 |
|---|---|---|---|
| 5-1 | **Workflow 問誰決定下一步；single／multi-agent 問責任由幾位工作者承擔。** 在此頁一次講清兩組概念：預定路徑或模型動態決策；一位或多位專責 Agent。 | 兩個並排的問題與箭頭，避免畫成一條升級階梯。 | **【來源明示】**[Stanford CS224G，PDF 第 5、10、12–13、61 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=5)分別處理兩組比較。**【歸納】**「兩個概念上不同的問題」是教學整理，並非 Stanford 原有的 2×2 圖。 |
| 5-2 | **把工作拆開，也把各站只需要的資訊拆開。** 多 Agent 的具體收益是專責角色與較乾淨的局部 context；只有需求真的不同時才值得拆。 | 同一個 #3：統籌者把局部任務交給兩位專責者，各自只回報必要結果。 | **【來源明示】**[李宏毅 2025 秋季講義，PDF 第 72–73 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=72)的餐廳／旅館例子；[CS224G，PDF 第 13 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=13)列出分工與協調取捨。 |
| 5-3 | **多一位 Agent，就多一道必須說清楚的交接。** 下一站要收到目標、必要資訊、產物與待決事項；不能只收到「我做完了」。 | 兩位 Agent 中間的一張交接卡：目標、產物連結、檢查證據、未決事項。 | **【來源明示】**[李宏毅 2024 第 5 講，20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s)有 PM→程式→測試的循環；[CS224G，PDF 第 25 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=25)有產出、評估、回饋迴圈。交接卡欄位是**【歸納】**。 |
| 5-4 | **SHIFT：錯誤可能沿交接與迭代累積；目標是否偏離，必須回到原目標檢查。** 把它明說成待防範的風險，而非已證實的通則。 | #3 的「原目標」在頂端；每輪產物經交接往前走，一條虛線顯示可能的偏離。 | **【來源明示】**[CS224G，PDF 第 13 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=13)列多 Agent 協調代價；[Anthropic〈Production reliability and engineering challenges〉](https://www.anthropic.com/engineering/multi-agent-research-system)是檔案所引「長時間運作時錯誤會累積」的來源。**「小偏誤逐輪放大成目標漂移」屬【歸納】；直接證據查不到。** |

### 第 6 段｜多 Agent 為什麼需要軟工與版控

| 頁 | 原則、標題與一句話重點【歸納】 | 解決第 4、5 段哪個問題；主圖【歸納】 | 來源 |
|---|---|---|---|
| 6-1 | **External task state：#3 的現況要留在工作項目，而非某段對話。** 此頁一次說清課程用語：*chat-driven* 是人持續在對話中派工；*work-driven* 是工作項目及其狀態帶動接手與回報。 | 解決 4-3 的 session／compact 交接，及 5-3 的多 Agent 交接。圖為 chat 視窗旁的一張持續更新的 #3 票。 | **【來源明示】**[李宏毅 2026 講義，PDF 第 47–52 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf#page=47)談跨 session 靠外部資訊；[OpenAI Symphony〈A shift in perspective〉、〈Turning our issue tracker into an agent orchestrator〉](https://openai.com/index/open-source-codex-orchestration-symphony/)談 issue tracker。**「work-driven」作為成對術語是【歸納】，不是通用分類。** |
| 6-2 | **Bounded execution：每次接手只完成 #3 下一個有邊界的工作。** 寫明輸入、交付物與停止點。 | 解決 4-1 的「一直追問才往前」、4-3 的長 context，以及 5-3 的模糊交接。圖為大目標拆成可逐一完成的小格。 | **【來源明示】**[Stanford CS329A，42:21–42:45](https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2541s)有目標、回饋與停止條件；[Anthropic〈Incremental progress〉](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)有長任務分段進行。把它命名為本段原則是**【歸納】**。 |
| 6-3 | **Role separation：不同站有不同責任，也可選不同模型與資訊。** | 解決 4-2 的角色混雜、4-4 的配置一律相同，以及 5-2 的局部工作界線。圖為 #3 流程上的 PM、Dev、Reviewer、QA 泳道。 | **【來源明示】**[李宏毅 2024 第 5 講，20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s)有軟體角色分工；[CS329T 第 3 講，第 9 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=9)有模型路由。 |
| 6-4 | **Independent verification：完成回報要經另一個明確的檢查步驟。** 檢查須對照 #3 的既有驗收條件與實際產物。 | 解決 4-2 的「球員兼裁判」與 5-3 的交接失真。圖為產物→Reviewer／QA→通過或退回。 | **【來源明示】**[CS224G，PDF 第 25 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=25)的 evaluator loop；[Stanford CS329A，47:03–47:24](https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2823s)談 verifier／測試。**不同呼叫或角色不自動等於驗證完成**，這是【歸納】的檢查界線。 |
| 6-5 | **Goal re-anchoring：每次要判定 #3 過關，都重新對照原目標與既有 AC。** | 針對 5-4 的 SHIFT 風險，也補 4-3 摘要漏掉早期決定的問題。圖為每個檢查關卡各拉一條線回 #3 的目標與 AC。 | **【來源明示】**[Stanford CS329A，42:21–42:45](https://www.youtube.com/watch?v=6YnLB0XbTnI&t=2541s)把 goal 和停止條件放在 Agent 循環中；[李宏毅 2024 Agent 講義，PDF 第 10 頁](https://speech.ee.ntu.edu.tw/~hylee/genai/2024-spring-course-data/0412/0412_agent.pdf#page=10)有目標、計畫、狀態、行動。**「每關回查 #3 原目標／AC」是本 workshop 的【歸納】，直接原則查不到。** |

## 3. SHIFT 的公開證據界線

- **【來源明示】長任務的錯誤可能累積。** Web 自由探索檔引用 [Anthropic〈How we built our multi-agent research system〉之〈Production reliability and engineering challenges〉](https://www.anthropic.com/engineering/multi-agent-research-system)，指出長時間保有狀態時錯誤會 *compound*，因此需要恢復、重試與 checkpoint。這支持「錯誤累積」的機制，沒有量化「一點偏誤每輪放大多少」。
- **【來源明示】多 Agent 有傳遞與協調失敗。** [LangChain〈Results & Analysis〉、〈Improvements to supervisor〉](https://www.langchain.com/blog/benchmarking-multi-agent-architectures)記錄其特定架構中，主管轉述子 Agent 結果會出錯；[Stanford HAI〈Critical Skills〉、〈Talk Is Cheap〉](https://hai.stanford.edu/news/ai-coding-agents-fail-at-teamwork)描述雙 Agent 軟體協作中訊息未化為一致行動。這支持交接失真與衝突，不能推成所有多 Agent 都會逐輪漂移。
- **【來源明示，但證據強度較低】** Stanford CS329Z 的[課綱](https://cs329z.stanford.edu/)把 *coordination and error propagation* 列為 **2026-10-19 尚未授課**的主題。它只能證明課程計畫要討論該問題，不能當作實驗結果。
- **【查不到】**在指定檔案引用的公開來源中，找不到直接證明「**沒有 re-anchor 時，多 Agent 的小目標偏誤會隨每次迭代持續放大**」的一般性研究結論。**【歸納】**SHIFT 可作課堂上的風險示意：交接錯誤、累積錯誤與缺少目標回查可能共同造成偏離；請勿把示意曲線標成實測數據。

## 4. 第 7 段逐頁草稿：同一張 #3 再走一次

**【歸納】**下表是把第一幕的人類流程換成 Agent 責任的教學映射。公開來源支持「角色分工、外部狀態、檢查與交接」等機制，**沒有提供 #3 的實際內容，也沒有規定本 workshop 的 Agent 名稱或 Human Gate**。[李宏毅 2024 第 5 講，20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s)、[Stanford CS329T 第 4 講，第 11–12 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%204%20--%20CS%20329T%20Fall%202025.pdf#page=11)。

| 頁與流程站 | 負責者【歸納】 | 交出什麼；存在哪裡【歸納】 | Human Gate |
|---|---|---|---|
| **7-1｜想法 → Brainstorming → #3 票** | PM Agent 與 PO Agent 討論；PO Agent 整理票面。 | 目標、使用者結果、範圍與**#3 已有**的驗收條件，寫回 #3 issue；討論決定留在票上。**#3 的具體文字查不到。** | 這一站是否須人批准，指定資料**查不到**；草稿不新增 gate。 |
| **7-2｜Refinement → Ready → Dev** | PM／PO Agent 釐清 #3；負責排程的 Agent 確認可接手；Dev Agent 依票執行。 | 澄清決定與狀態留在 #3；程式與測試產物留在 Git 版本紀錄；變更說明與證據連到 PR，再由 #3 指向 PR。 | 未新增 gate；Ready 與 Dev 的交接依 #3 的既有條件。 |
| **7-3｜PR Review → QA** | Reviewer Agent 檢查變更；QA Agent 按 #3 **既有 AC** 驗證並回報。 | Review 意見、修正回合留在 PR；QA 結果及證據留在 PR 或 #3，讓下一站可追查。未通過則回 Dev。 | **PR 審查的人類判定**：沿用 `r3-synthesis.md` 已提出的 gate 位置；Agent 可準備證據，人決定是否放行。 |
| **7-4｜Product／Goal Check → 上線 → Done** | PO／Product Agent 將結果對回 #3 的原目標與 AC；上線執行者依第一幕既有安排接手。 | 產品判定留在 #3；上線版本及結果連回 #3／PR，最後更新 Done。指定檔案沒有 #3 的部署方式、上線環境或操作者，**查不到**。 | **產品／目標確認的人類判定**：沿用 `r3-synthesis.md` 的 gate。上線是否另有核准 gate，指定資料**查不到**，不在草稿中代訂。 |

**7-4 收尾圖【歸納】：**同一條第一幕流程、同一張 #3；上排畫原本人類角色，下排換成 Agent，兩個已知 Human Gate 仍清楚標在人類審 PR 與產品／目標確認處。卡片、Git 變更、PR 與驗證結果形成可回查的交接線。

## 5. 七段段落標題候選

以下均為**【歸納】**，每段選一個即可。

| 段 | 候選 A | 候選 B |
|---|---|---|
| 1 | **Matching 從一個想法，走過哪些人才變成產品** | **做出 Matching：需求、設計、開發、測試與上線各由誰負責** |
| 2 | **Git 記下每次修改，GitHub 讓團隊看見並審查修改** | **一份程式怎麼留下版本、開 PR、合回主線** |
| 3 | **同一張 #3：從想法寫成好票，再走到上線** | **#3 怎麼經過釐清、開發、審查與驗收** |
| 4 | **一段 Chat 要做完整張 #3，會在哪些地方卡住** | **從一問一答到長任務：角色、資訊與交接開始混在一起** |
| 5 | **把 #3 交給多個 Agent，分工之後還要防止偏離目標** | **多 Agent 能分開工作，也會帶來交接失真與 SHIFT 風險** |
| 6 | **用五個軟工原則，讓多 Agent 知道狀態、邊界與過關條件** | **狀態留在票上、工作有邊界、檢查回到原目標** |
| 7 | **再走一次 #3：每一站換誰接、留下什麼、由人在哪裡把關** | **從 Brainstorming 到上線：#3 的 Agent 交接與 Human Gate** |

## 6. Owner 六點的證據界線

沿用 `r3-synthesis.md` 的「公開來源支持到哪裡／哪些是我們的觀點」格式，加入 web 路線後更新：

| Owner 的說法 | 兩路公開來源支持到哪裡【來源明示】 | 投影片須標成【歸納】或【查不到】的部分 |
|---|---|---|
| **一人分飾多角色** | 專責角色能分擔複雜工作；李宏毅有 PM→Programmer→Tester 例子，[2024 第 5 講，20:31–21:41](https://www.youtube.com/watch?v=inebiWdQW-4&t=1231s)；[Stanford CS224G，PDF 第 12–13 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=12)列角色分割與代價。 | 「同一 chat 分飾 PM／Dev／QA 必然失敗」**查不到**；把它當教學比喻。 |
| **context 污染** | 長歷史與無關資料會分散注意；分開局部 context 可減少互擾。[李宏毅 2025 秋季，PDF 第 40、46–55 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=40)；[Anthropic〈Context engineering for long-horizon tasks〉](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)。 | 李宏毅該講是否使用「context 污染」這個精確詞：**查不到**；英文 *context pollution* 在 Anthropic 文章中有。 |
| **球員兼裁判** | 生成與評估可拆成明確步驟；另有自我反省的正規做法。[CS224G，PDF 第 25 頁](https://web.stanford.edu/class/cs224g/lectures/CS%20224G%202026%20Lecture%207%20-%20Agent%20Orchestration%20%26%20Workflow%20Design.pdf#page=25)；[李宏毅 2024 第 5 講，12:03–15:32](https://www.youtube.com/watch?v=inebiWdQW-4&t=723s)。 | 「球員兼裁判」是 Owner 比喻；「同一 Agent 自評必然無效」**查不到**。應講清檢查標準與證據。 |
| **無法依問題選 model／effort** | 按難度分派不同模型有直接來源。[FrugalGPT，第 9 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2023-course-data/FrugalGPT-v2.pdf#page=9)；[CS329T 第 3 講，第 9 頁](https://web.stanford.edu/class/cs329t/slides/Lecture%203%20--%20CS%20329T%20Fall%202025.pdf#page=9)。[OpenAI Agents SDK〈GPT-5 models〉、〈Mixing models in one workflow〉](https://openai.github.io/openai-agents-python/models/)另支持可設定模型與 reasoning effort。 | 「一般 chat 沒辦法選」**查不到**，且不宜說成技術限制。可說「所有工作沿用同一配置，可能成本不合」。課程中逐任務調 effort 的教學位置仍**查不到**。 |
| **compact 之後遺忘** | 摘要可能漏掉後續需要的細節。[李宏毅 2025 秋季，PDF 第 67–70 頁](https://speech.ee.ntu.edu.tw/~hylee/GenAI-ML/2025-fall-course-data/Agent.pdf#page=67)；[Anthropic〈Compaction〉](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)。 | 「每次 compact 必然遺忘」及對某特定產品功能的通則均**查不到**。宜寫「壓縮有資訊遺漏風險」。 |
| **換 session 看不到前面內容／交接** | 模型延續工作需要重新取得歷史或外部狀態；長任務可讓新 session 讀進度與產物。[李宏毅 2026 講義，PDF 第 24–25、47–52 頁](https://speech.ee.ntu.edu.tw/~hylee/ml/ml2026-course-data/intro.pdf#page=24)；[Anthropic〈The long-running agent problem〉、〈Getting up to speed〉](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)。 | 「所有現今聊天產品的新 session 一定完全看不到舊內容」**查不到**。把 #3 的狀態、決定、產物與待辦留在票／PR，是本 workshop 的【歸納】。 |

整份教材的證據界線可收成一句：**【歸納】Owner 的六點是這場 workshop 對長工作協作的整理；公開來源支持多數底層機制，沒有共同提出這份六點清單，也沒有證明多 Agent 或任何一個 Human Gate 配置必然較好。**