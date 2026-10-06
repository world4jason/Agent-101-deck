"""Build the authorized 82-page review deck. Content/order: storyboard SSOT.

Keep rev10 sources intact. Reuse its original diagrams; author only new pages
and the explicitly planned changes. Generated HTML is not a second SSOT.
"""
from pathlib import Path
from bs4 import BeautifulSoup
from html import escape as e
import json, re, hashlib, copy

ROOT = Path(__file__).resolve().parents[1]
SSOT = ROOT/'docs/rev10-slide-by-slide-v1.md'
source = SSOT.read_text()
cards = {int(n): body.strip() for n,body in re.findall(r'^### (\d+)｜[^\n]+\n(.*?)(?=^### |^## |\Z)',source,re.M|re.S)}
pages=[]
for line in source.splitlines():
    if re.match(r'\| \d{2} \|',line):
        n,chapter,kind,ids,title,change=[v.strip() for v in line.split('|')[1:-1]]
        pages.append(dict(number=int(n),chapter=chapter,kind=kind.strip('*'),ids=re.findall(r'[PNEX]\d+',ids),title=title))
assert len(pages)==len(cards)==82
old=BeautifulSoup((ROOT/'drafts/rev10.html').read_text(),'html.parser')
originals=old.select('.slide')
assert len(originals)==55

def panel(title,body,tone=''):
    return f'<article class="r-card {tone}"><h2>{title}</h2><div class="r-body">{body}</div></article>'
def cols(*items):
    return f'<div class="r-cols r-cols-{len(items)}">'+''.join(items)+'</div>'
def flow(*items):
    return '<div class="r-flow">'+ '<span class="r-arrow" aria-hidden="true">→</span>'.join(items)+'</div>'
def ribbon(text,tone=''):
    return f'<p class="r-ribbon {tone}">{text}</p>'
def kicker(text): return f'<p class="r-kicker">{text}</p>'
def table(head,rows):
    return '<table class="r-table"><thead><tr>'+''.join(f'<th scope="col">{x}</th>' for x in head)+'</tr></thead><tbody>'+''.join('<tr>'+''.join(f'<td>{x}</td>' for x in row)+'</tr>' for row in rows)+'</tbody></table>'
def para(*lines):return ''.join(f'<p>{x}</p>' for x in lines)

new={}
new[6]=kicker('同一張 #3｜雙向喜歡才配對')+flow(
 panel('PM／PO',para('說清要什麼','交付需求與接受條件')),
 panel('Dev',para('依票實作與自測','交付改動與自測紀錄')),
 panel('Reviewer／QA',para('審差異、驗行為','交回意見與證據')),
 panel('PM／PO',para('對回需求與 Goal','判斷接受或退回'),'human'))+ribbon('需求 → 成果 → 證據 → 決定；Human Gate 再決定最終放行。')
new[9]=kicker('同一個 App，三張票各交回一份檔案')+cols(
 panel('#1 Like／Pass','<code>app_final</code>'+para('昨天的修改被覆蓋。','哪一份能找回？'),'problem'),
 panel('#3 雙向配對','<code>app_final_final</code>'+para('我從另一份開始改。','應該合回哪裡？'),'problem'),
 panel('#2 配對列表','<code>app_1006_final</code>'+para('你說已經做好了。','改了什麼、根據哪張需求？'),'problem'))+ribbon('先解三件事：版本可追溯、修改能整合、成果有依據可以審。')
new[23]=kicker('票上只有一句話：「支援配對」')+cols(
 panel('一位同事','<blockquote>「一方 Like，<br>就可以配對吧？」</blockquote>'),
 panel('另一位同事','<blockquote>「不是要雙方<br>都 Like 才算嗎？」</blockquote>'),
 panel('第三位同事','<blockquote>「已經配對，<br>再 Like 會怎樣？」</blockquote>'))+ribbon('給一個具體情境：小安 Like 小晴，小晴尚未 Like。現在應不應配對？','question')
new[24]=kicker('同一條規則：同一對使用者，不重複配對')+cols(
 panel('說不清楚的範例',para('「Like 後應正常。」','或：開瀏覽器 → 登入 → 點選單 → 找按鈕 → 點 Like → 確認正常。'),'problem'),
 panel('可以一起判斷的範例',para('<b>前提：</b>小安與小晴已經配對。','<b>事件：</b>小安再次 Like 小晴。','<b>結果：</b>仍只有原本那一筆配對。'),'good'))+ribbon('保留影響判斷的前提、事件與結果；拿掉與這條規則無關的操作細節。')+'<p class="r-meta">BRIEF：業務語言、具體資料、意圖清楚、必要細節、聚焦一件事。完整名稱見筆記。</p>'
new[25]=kicker('#3 的範例寫清楚了，仍可能漏掉不同角色的疑問')+cols(
 panel('PO｜業務結果',para('「只有雙向 Like 才配對。」','說明使用者要得到什麼。')),
 panel('Dev｜規則與依賴',para('「已有配對又收到 Like 呢？」','檢查規則是否一致、資料從哪來。')),
 panel('QA｜反向與重複',para('「單向不能配對，怎麼驗？」','確認預期結果與測試前提。')))+ribbon('先對照既有需求形成共識；尚未決定的事情留下疑問，不能直接當成新 AC。')
new[26]=kicker('Example Mapping｜把討論分清楚，才知道能不能進 Ready')+'<div class="r-map-story">故事／工作：#3 雙向喜歡才配對</div>'+cols(
 panel('規則',para('只有雙向 Like 才配對。','同一對不重複配對。'),'rule'),
 panel('具體範例',para('單向 Like → 不配對','雙向 Like → 建立配對','已配對再 Like → 不增筆'),'good'),
 panel('尚待確認',para('例如：取消 Like 怎麼處理？','本輪不納入，不自行補功能。','若問題影響既定 AC，就先釐清。'),'problem'))+ribbon('確認的規則與範例回到票面；未解問題要有負責人、處置與下一步。')
new[27]=kicker('先問：這些範例有沒有解決我們的分歧？')+cols(
 panel('為了共同理解',para('用單向、雙向、重複的關鍵例子，','讓大家對規則得出同一個答案。','未解問題要有處置。'),'good'),
 panel('為了驗證系統',para('再依風險展開重要條件組合。','不只測成功，也測禁止與重複。','AI 產生更多，不代表已經窮舉。')))+ribbon('「寫了幾個」不是完成依據；下一步把 Like 的四種組合攤成決策表。')+'<p class="r-meta">測試設計還可用等價分割、邊界值、決策表、Use Case；依問題選方法。</p>'
new[28]=kicker('同一個例子，把「接受什麼」接到「如何證明」')+cols(
 panel('AC｜接受條件',para('<b>同一對不重複配對。</b>','描述必須成立的行為。'),'rule'),
 panel('AT｜驗收測試',para('<b>Given</b> 小安與小晴已配對','<b>When</b> 小安再次 Like','<b>Then</b> 仍只有原本一筆'),'good'),
 panel('DoD｜共用完成要求',para('PR 已審查、沒有超出範圍','既有功能沒壞、上線後檢查','本課所有票共同遵守。')))+ribbon('一張票的特定行為用 AC 判斷；AT 驗證它；完成還要滿足團隊共用 DoD。')
new[32]=kicker('#3 單向不得配對：不同檢查回答不同問題')+flow(
 panel('Dev ↔ 自測',para('邊改邊測，快速修正。','PR 帶著改動與自測紀錄。')),
 panel('PR／CI',para('PR 是送審與討論位置。','CI 依設定重複執行 checks。')),
 panel('Reviewer／QA',para('Review：範圍與改動合理嗎？','QA：行為符合 AC 嗎？')))+ribbon('自測過了，仍可能誤解需求或漏情境；審查與獨立驗證各有責任。')+'<p class="r-meta">本課以這條路徑示範；草稿 PR 可以提早開，測試也會在開發中反覆執行。</p>'
new[34]=kicker('把 #3 視為黑箱：先約定輸入與可觀察結果')+table(['輸入／前提','執行','應觀察到的結果'],[
 ['尚未配對；只有小安 Like','執行配對判斷','<b class="r-red">不得建立配對</b>'],
 ['尚未配對；雙方都 Like','執行配對判斷','<b class="r-green">建立配對</b>'],
 ['兩人已配對','再次 Like','<b>仍只有原本那一筆</b>']])+ribbon('驗收包含應有、禁止與重複情境；不能只看一個成功畫面。')+'<p class="r-meta">這裡是驗證設計示意。畫面正常，不能單獨證明所有內部資料都正確。</p>'
new[35]=kicker('前提固定：這兩人起初尚未配對')+table(['小安 Like 小晴','小晴 Like 小安','預期結果'],[
 ['否','否','不建立配對'],['是','否','不建立配對'],['否','是','不建立配對'],['是','是','<b class="r-green">建立配對</b>']])+ribbon('只有最後一列成功還不夠；另外三列也必須不配對。')+'<p class="r-meta">這就是決策表。已有配對再 Like，是另一個初始狀態，另外驗。</p>'
new[37]=kicker('教學示意｜不是實際 App 測試結果')+cols(
 panel('共同的驗證條件',para('<b>Arrange／Given：</b>已配對一筆','<b>Act／When：</b>再次 Like','<b>Assert／Then：</b>仍只有原配對','固定測試環境與同一組假資料。')),
 panel('版本 A → 修正 → 版本 B',table(['版本','實際結果','判定'],[['A','多出第二筆','<b class="r-red">FAIL</b>'],['B','維持原一筆','<b class="r-green">PASS</b>']]),'good'))+ribbon('留下版本、環境、資料、操作、預期、實際結果與證據；修正後必須重測。')
new[39]=kicker('同一張 #3、同樣的驗收結果，放到不同地方')+cols(
 panel('假資料環境',para('錯配影響的是測試帳號。','可以重建測試資料，再驗一次。','確認隔離與回復方式。')),
 panel('真實使用者環境',para('錯配可能影響使用者與既有資料。','退回程式版本，未必消除既有後果。','需要知道曝光範圍與處理能力。'),'human'))+ribbon('驗收通過仍有剩餘不確定性；放行還要看影響範圍、資料與可逆性。')
new[40]=kicker('人看 #3 的交付與風險，記錄「放行／暫停」理由')+'<div class="r-grid4">'+''.join([
 panel('1 降低發生機率',para('Review、測試、範圍約束','哪些錯誤已設法攔下？')),
 panel('2 驗證結果',para('這次版本的 AC 與結果證據','有沒有未跑或失敗的情境？')),
 panel('3 找出風險',para('資料、使用者與相依範圍','錯了會影響誰？')),
 panel('4 降低衝擊',para('如何停止擴散、回復與處理','這些能力真的可用嗎？'))])+'</div>'+ribbon('本課固定：Goal Check → 人記錄 Gate 決定 → 通過後才 merge／release。','human')
new[42]=kicker('現在三張票都已交付；從使用者的目標走完整條路')+flow(
 panel('#1｜輸入',para('小安 Like 小晴','小晴也 Like 小安')),
 panel('#3｜判斷',para('確認雙向喜歡','只建立一筆配對')),
 panel('#2｜呈現',para('小安的列表看見小晴','小晴的列表也看見小安')))+ribbon('單票通過，不保證串接正確；整條路徑還要核對資料與結果。')+'<p class="r-meta">上線前確認行為；上線後再量 Goal 的成功訊號，兩者不能互相代替。</p>'
new[48]=kicker('把 #3 分給三個 chat，人的交接工作還在')+flow(
 panel('PM chat',para('「雙向才配對，','同一對不重複。」')),
 panel('人搬運 → Dev chat',para('貼需求、指明目前版本。','把實作結果交給 QA。'),'human'),
 panel('QA chat',para('「這是哪個版本？','重複情境的前提在哪？」'),'problem'))+ribbon('分角色能隔開對話；交接、狀態同步與下一步，不會因此自動成立。')
new[55]=kicker('多幾位幫手，不等於更容易交出一道好菜')+cols(
 panel('一個人煮',para('備料、煮菜、洗碗全包。','對應：一個 chat 扮演多種角色。','每件事仍靠你盯。')),
 panel('多人進廚房',para('工具在哪？誰做到哪？','對應：多 chat／多 Agent。','分工之後，交接問題浮現。')),
 panel('主廚安排流程',para('分工作站、交接材料、檢查出菜。','對應：workflow、共同狀態、驗收。','流程穩定，制度才能重複使用。'),'human'))+ribbon('重點是合作制度是否清楚，不是同時開了多少個 Agent。')
new[66]=kicker('已確認：雙向才配對、不重複；未確認的推測仍留在待決區')+cols(
 panel('會前｜提候選',para('AI 依規則提出情境。','例：只有一方 Like。','PO／Dev／QA 一起核對。')),
 panel('會後｜轉寫',para('把確認結果整理成票與 GWT。','核對前提、事件、結果，','沒有在轉寫時偷偷改規則。')),
 panel('抓漏｜提疑問',para('AI 問：取消 Like 要怎麼辦？','先標成疑問，不加入 AC。','人決定是否另列後續工作。'),'human'))+ribbon('AI 幫忙準備、整理與找漏洞；需求的意思和取捨仍由人確認。')
responsibility=json.loads((ROOT/'drafts/rev11-responsibility.json').read_text())
new[67]=kicker(responsibility['subtitle'])+flow(*[panel(c['label'],para(*c['desc'].splitlines())+f'<p class="r-example">{c["example"]}</p>','human' if i!=1 else '') for i,c in enumerate(responsibility['cards'])])+ribbon(responsibility['footer'])
new[69]=kicker('Agent 回報「#3 完成，測試 PASS」；人還要打開交付包')+cols(
 panel('應能對上的材料',para('原 Issue／Goal 與每條 AC','PR、交付版本與變更範圍','測試前提、實際結果、證據','未跑情境、失敗與未解問題')),
 panel('根據材料作決定',para('<b>缺少重複情境證據：</b>退回補驗。','<b>需求仍有重大疑問：</b>暫停釐清。','<b>證據支持接受：</b>再作 Gate 決定。'),'human'))+ribbon('不只看 Agent 的完成摘要；把「接受／退回／暫停」及理由留在 Issue／PR。')
new[73]=kicker('同一條規則：同一對使用者不重複配對')+cols(
 panel('Rule based',para('「同一對只配對一次。」','<b>適合：</b>簡潔表達要求。','<b>要補：</b>適用前提與具體例子。')),
 panel('Given–When–Then',para('已配對 → 再 Like → 原一筆','<b>適合：</b>行為與前提。','<b>要留意：</b>大量組合可能重複。')),
 panel('Table',table(['原狀態','事件','結果'],[['未配對','雙向 Like','一筆'],['已配對','再 Like','原一筆']])+para('<b>適合：</b>並排比較條件與結果。')))+ribbon('選最能看清這條規則的格式；不必為同一規則寫三份。')
new[74]=kicker('教學偽碼｜假設錯誤實作在單向 Like 時也產生配對')+cols(
 panel('無效測試也會綠','<pre>actual = match(單向 Like)\nassert actual == actual</pre>'+para('拿結果和自己比，當然相同。','複製實作邏輯算預期，也可能一起錯。'),'problem'),
 panel('獨立預期會抓到錯誤','<pre>actual = match(單向 Like)\nassert actual == 不配對</pre>'+para('預期來自已確認的規則。','錯誤行為應讓測試失敗。'),'good'))+ribbon('修正無效測試，確認它能抓到錯誤；不能刪掉失敗測試來換綠燈。')
new[75]=kicker('教學示意｜已確認的 AC：只有單向 Like，不得配對')+flow(
 panel('Red',para('先寫單向情境的測試。','錯誤配對行為使它失敗。','不是因為環境或語法壞掉。'),'problem'),
 panel('Green',para('實作雙向判斷。','讓這條測試通過。','保留其他已確認規則。'),'good'),
 panel('Refactor',para('整理程式結構。','行為不改，測試仍通過。','再進下一個小循環。')))+ribbon('叫 Agent 用 TDD，也要看它是否真的經過有意義的紅燈，而不是只有最後一張綠燈。')
new[76]=kicker('同一個重複配對範例，從共識到可重複驗證')+flow(
 panel('Discovery',para('PO／Dev／QA 討論：','已配對再 Like，應怎樣？','找出假設、規則與疑問。')),
 panel('Formulation',para('寫成精確的共同描述：','已配對 → 再 Like → 原一筆','用 GWT 或合適的格式。')),
 panel('Automation',para('把情境接上測試執行。','改動後重複驗證。','規格與測試一起維護。')))+ribbon('發現新的疑問就回頭討論；BDD 是可迭代的合作流程，Gherkin 文字本身不會自動執行。')
new[77]=kicker('演練題：「兩位使用者互相喜歡，就能確認配對成功。」')+cols(
 panel('先各自判斷',para('小安 Like 小晴，小晴尚未 Like。','後來小晴也 Like 小安。','已配對後，小安再次 Like。','每一步應該看到什麼？')),
 panel('再一起整理',para('黃卡：本次工作','藍卡：大家確認的規則','綠卡：可判斷的具體例子','紅卡：仍有分歧的問題')))+ribbon('比較討論前後：哪些假設被修正？哪些疑問仍要處理？不比誰寫的例子最多。')
new[78]=kicker('票填滿了，仍可能沒有人知道下一步怎麼做')+table(['欄位','同一張 #3 的處置示意'],[
 ['Assignee','目前接手 #3 的 Dev：負責推進與更新狀態。'],
 ['Blocked 原因','缺少重測環境的存取，無法重跑已確認的情境。'],
 ['解除負責人／條件','環境負責人協助恢復存取；Dev 確認可以執行。'],
 ['下一步','沿原 AC 重跑、連結結果，解除阻礙標記並更新票。']])+ribbon('資訊透明、邊界清楚、可以執行；Blocked 是阻礙標記，不是另創一套流程。')
new[79]=kicker('Specification by Example｜讓共同理解跨過人員與版本')+flow(
 panel('討論時',para('共同確認：','同一對不重複配對。','用關鍵範例找出歧義。')),
 panel('票與規格',para('保存規則與例子：','已配對 → 再 Like → 原一筆','讓下一位接手者讀得到。')),
 panel('驗證與維護',para('用同一例子核對行為。','規則變動時一起更新。','避免文件與測試各自漂移。')))+ribbon('共同探索 → 用範例保存理解 → 持續驗證與維護；不只留下會議紀錄。')
new[80]=kicker('處理路徑示意｜不宣稱本 App 已具備以下機制')+cols(
 panel('發現與停止',para('偵測到錯配，確認影響範圍。','先停止擴大影響。','依現有能力關閉或限制功能。'),'problem'),
 panel('回復與資料處理',para('確認版本，按能力回復。','找出受影響的配對資料。','另行處理已發生的後果。')),
 panel('修正與重驗',para('修正錯誤、補齊漏掉的情境。','重跑 AC 與整體路徑。','由人重新判斷是否放行。'),'human'))+ribbon('回復程式版本，不會自動回復所有資料與使用者影響。')

def replace_text(node, before, after):
    hits=0
    for t in list(node.find_all(string=True)):
        if before in t:
            t.replace_with(str(t).replace(before,after));hits+=1
    assert hits, f'Missing source text: {before}'
def add_note(node,text):
    frag=BeautifulSoup(f'<p class="r-revision">{text}</p>','html.parser').p
    node.append(frag)
def append_html(node,html):
    for x in list(BeautifulSoup(html,'html.parser').contents):node.append(x)

def adjust(node,p):
    n=p['number'];node.h1.clear();node.h1.append(p['title'])
    if n==7:
        replace_text(node,'每張票在 Goal Check 對回 Goal；退件則回 Refinement','每張票在 Goal Check 對回 Goal；退件回 Refinement。接受後，人於 Human Gate 放行，才 merge／release／檢查。')
        add_note(node,'Goal Check 接受 → Human Gate 由人放行 → merge／release／檢查。Gate 是決策註記，不另增看板狀態。')
    elif n==10:
        add_note(node,'#3 的修改歷史：初版 → 修正單向錯配 → 補上重複情境；Git 比較前後差異，GitHub 分享給協作者。')
    elif n==11:
        for x,t in zip(node.select('.commit-labels span'),['#3 初版','#3 修正','#3 補測']):x.string=t
        replace_text(node,'不會自動存，也看不到、回不去。','尚未 commit 的修改，不在這次提交歷史裡。')
        add_note(node,'本地 commit ── push → 遠端分支；讓協作者取得這些版本。Push 還不是 merge。')
    elif n==12:
        replace_text(node,'分出一份','建立工作分支')
        add_note(node,'#1 Like／Pass、#2 配對列表也各有自己的工作分支。本例 WIP＝1：目前只推進 #3；接手時先更新共同版本。')
    elif n==14:
        vals=['對照 Issue #3 的範圍與 diff','「再次 Like 會不會重複配對？」','单向／雙向／重複情境的結果']
        for x,t in zip(node.select('.pr-sections > div > span'),vals):x.string=t.replace('单','單')
        add_note(node,'Issue 說需求，PR 呈現這次差異、討論與證據；「做好了」本身還不是審查依據。')
    elif n==15:
        replace_text(node,'Merge：把審過的分支合回 main；舊版仍可回復。','依檢查與 Human Gate 決議，#3 合入 main；#2 更新共同版本後，再接配對結果。')
        add_note(node,'Merge 不等於部署；衝突要判斷，沒有文字衝突也不保證行為正確。')
    elif n==19:
        add_note(node,'開發順序：#3 可用測試資料先驗核心規則；#1、#2 再串接。各票要有可交付結果、驗收方式與清楚依賴。')
    elif n==20:
        replace_text(node,'Parent issue · 泳道標題，不佔欄位','Parent issue · 三張票的共同目標與分組')
    elif n==31:
        replace_text(node,'Developer＝第 2 段的 branch＋commit：','Developer 接回前面學過的 branch＋commit：')
        replace_text(node,'branch 是隔離修改的副本','branch 標示一條獨立的開發路線')
    elif n==36:
        replace_text(node,'CI 是每個 PR 都會自動執行的檢查；QA 依 AC 驗證實際行為與邊界。','本課設定 CI 在 PR 更新時執行 checks；QA 依 AC 驗行為。下表結果為教學示意。')
    elif n==38:
        replace_text(node,'接受後 → merge 回 main → 上線檢查 → 關閉子票。','接受後 → Human Gate 放行 → merge／上線／檢查 → 關閉子票。')
    elif n==41:
        replace_text(node,'Done 接回第 2 段的 Merge：通過關卡後合回 main，上線檢查後關閉子票。','本課 Done：依 Human Gate 決議 merge／上線，完成共用 DoD 後關閉子票。')
        replace_text(node,'產品接受後，#3 已 merge','產品接受並經 Human Gate 放行後，#3 已 merge')
    elif n==44:
        add_note(node,'這裡比較工作如何推進；聊天介面也能承載 Agent，不能只看介面判定自主程度。')
    elif n==46:
        replace_text(node,'系統把前面的內容自動壓縮成摘要。','系統可能把前文壓縮成摘要；以下是關鍵規則被漏掉的示例。')
    elif n==47:
        replace_text(node,'session：一段獨立的對話；開新的對話就是新的 session，看不到前一段的內容。','session：一段工作對話。新 session 不會自動帶齊前文；可以透過共用票面與交接紀錄補齊。')
        replace_text(node,'新接手者看不到前段對話','這次交接缺少前文與共同紀錄')
    elif n==49:
        replace_text(node,'開越高越慢、越貴。','速度、成本與品質有取捨。')
        replace_text(node,'簡單的事也又慢又貴','簡單工作可能付出額外時間與成本')
        replace_text(node,'困難的規則判斷容易出錯','複雜規則是否可靠，仍需實際驗證')
        replace_text(node,'第 5 段怎麼解','接著看多 Agent 分工')
    elif n==56:
        replace_text(node,'案例票｜#3 雙向喜歡才配對','例：#3 Review 不過 → Dev 修正 → 再送審；誰安排這條路徑？')
    elif n==58:
        for a,b in [('5-5｜','SHIFT｜'),('4–5｜','交接問題｜'),('4｜','Chat 問題｜'),('5｜','協作問題｜')]:
            for t in list(node.find_all(string=True)):
                if a in t:t.replace_with(str(t).replace(a,b))
    elif n==59:
        replace_text(node,'新 Session 讀票，不讀聊天','新 session 先讀共同紀錄，不只依賴聊天')
    elif n==61:
        replace_text(node,'規劃與接受','整理規劃與接受建議')
        add_note(node,'人主導目標與接受標準，核對結果；Human Gate 由人決定放行，不由 Agent 自行核准。')
    elif n==71:
        replace_text(node,'Push branch','Push branch／開 PR')
        replace_text(node,'開 Pull Request','審查差異與意見')
        replace_text(node,'執行 checks','依 AC 驗行為、留證據')
    elif n==72:
        replace_text(node,'Appendix','附錄')
    else:raise ValueError(n)
    return node

out=[];manifest=[]
for p in pages:
    n=p['number'];orig=next((int(x[1:]) for x in p['ids'] if x.startswith('P')),None)
    if n in new:
        node=BeautifulSoup(f'<section class="slide rev10-slide r-new"><h1>{e(p["title"])}</h1><div class="r-content">{new[n]}</div></section>','html.parser').section
    else:
        assert orig
        node=copy.deepcopy(originals[orig-1])
        if p['kind']=='調整':node=adjust(node,p)
    node['data-section']=p['chapter'];node['data-page']=str(n);node['data-source']=' '.join(p['ids']);node['id']=f'page-{n}'
    # Deck-wide section labels are navigation, not course content changes.
    if node.select_one('.cover-kicker'):
        node.select_one('.cover-kicker').string={'C0':'先看人類如何合作','C1':'版本與協作','C2':'想法到 Ready','C5':'Agent 接手與新問題','C6':'Agent 交付與人的驗收','APP':'附錄'}.get(p['chapter'],p['chapter'])
    out.append(str(node))
    manifest.append({**p,'original':orig,'notes':cards[n].replace('新標題為提案，未修改 HTML。','本草稿採用此標題。')})
assert sorted(x['original'] for x in manifest if x['original'])==list(range(1,56))
chapters=[('C0',1,'人類合作'),('C1',8,'版本協作'),('C2',16,'想法到 Ready'),('C3',31,'實作與驗收'),('C4',39,'放行與完成'),('C5',43,'Agent 演進'),('C6',64,'Agent 交付'),('APP',72,'附錄')]
rail=''.join(f'<a href="#{n}" data-rail="{key}">{name}</a>' for key,n,name in chapters)
html='''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>Agent 101｜rev11 正式版</title><link rel="stylesheet" href="rev11-base.css"><link rel="stylesheet" href="rev10.css"><link rel="stylesheet" href="rev11.css"></head><body class="rev10-draft rev11-draft" data-review-mode="full"><main class="deck"><header class="topbar"><div class="brand">Agent 101 <span class="draft-badge">rev11 · 82 頁</span></div><nav class="section-rail" aria-label="簡報章節">'''+rail+'''</nav><div class="counter"><span id="current">1</span> / <span id="total">82</span></div></header><div class="slides">'''+''.join(out)+'''</div><footer class="controls"><button id="prev" type="button">← 上一頁</button><div class="r-toolbar"><button id="contents" type="button">目錄</button><button id="notes" type="button">講者筆記</button><div class="progress-track" aria-hidden="true"><div id="progress"></div></div><a id="compare-link" target="_blank" rel="noopener">對照 rev10 ↗</a></div><button id="next" type="button">下一頁 →</button></footer></main><dialog id="review-dialog"><div class="r-dialog-head"><h2 id="dialog-title"></h2><button id="close-dialog" type="button">關閉</button></div><div id="dialog-body"></div></dialog><script id="deck-data" type="application/json">'''+json.dumps(manifest,ensure_ascii=False).replace('<','\\u003c')+'''</script><script src="rev11.js"></script></body></html>'''
(ROOT/'drafts/rev11.html').write_text(html)
release_html=html
for asset in ['rev11-base.css','rev10.css','rev11.css']:
    release_html=release_html.replace(f'href="{asset}"',f'href="../drafts/{asset}"')
release_html=release_html.replace('src="rev11.js"','src="../drafts/rev11.js"')
(ROOT/'slides/index.html').write_text(release_html)
(ROOT/'drafts/rev11-review').mkdir(parents=True,exist_ok=True)
(ROOT/'drafts/rev11-review/manifest.json').write_text(json.dumps({'ssot':str(SSOT.relative_to(ROOT)),'ssotSha256':hashlib.sha256(source.encode()).hexdigest(),'pages':[{k:v for k,v in p.items() if k!='notes'} for p in manifest]},ensure_ascii=False,indent=2))
print(f'Built {len(out)} pages: {sum(p["kind"]=="沿用" for p in pages)} reused, {sum(p["kind"]=="調整" for p in pages)} adjusted, {sum(p["kind"]=="新增" for p in pages)} new. All 55 originals mapped.')
