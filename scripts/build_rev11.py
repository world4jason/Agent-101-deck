"""Build the issue #48 107-page candidate deck from its consolidated storyboard.

Keep the rev11 output available at slides/rev11.html. Reuse the 82-page
content and original diagrams; the issue #48 storyboard controls candidate
order, titles, claims, transitions, and speaker-note source.
"""
from pathlib import Path
from bs4 import BeautifulSoup
from html import escape as e
import json, re, hashlib, copy

ROOT = Path(__file__).resolve().parents[1]
LEGACY_SSOT = ROOT/'docs/rev10-slide-by-slide-v1.md'
legacy_source = LEGACY_SSOT.read_text()
legacy_cards = {int(n): body.strip() for n,body in re.findall(r'^### (\d+)｜[^\n]+\n(.*?)(?=^### |^## |\Z)',legacy_source,re.M|re.S)}
legacy_pages=[]
for line in legacy_source.splitlines():
    if re.match(r'\| \d{2} \|',line):
        n,chapter,kind,ids,title,change=[v.strip() for v in line.split('|')[1:-1]]
        legacy_pages.append(dict(number=int(n),chapter=chapter,kind=kind.strip('*'),ids=re.findall(r'[PNEX]\d+',ids),title=title))
assert len(legacy_pages)==len(legacy_cards)==82

STORYBOARD = ROOT/'docs/issue48-execution-storyboard.md'
storyboard_source = STORYBOARD.read_text()
cards = {int(n): body.strip() for n,body in re.findall(r'^### (\d{2,3})｜[^\n]+\n(.*?)(?=^### |\Z)',storyboard_source,re.M|re.S)}
pages=[]
for line in storyboard_source.splitlines():
    if re.match(r'\|\s*\d{2,3}\s*\|',line):
        fields=[v.strip() for v in line.strip().strip('|').split('|')]
        assert len(fields)==9, f'Unexpected storyboard row: {line}'
        number,chapter,old_number,source_ids,added_id,title,message,visual,transition=fields
        old_number=None if old_number=='—' else int(old_number)
        added_id=None if added_id=='—' else added_id
        ids=re.findall(r'[PNEX]\d+',source_ids)
        legacy=next((p for p in legacy_pages if p['number']==old_number),None)
        pages.append(dict(number=int(number),chapter=chapter,kind=legacy['kind'] if legacy else '新增',
            ids=ids,title=title,oldRev11Page=old_number,addedId=added_id,
            rev10SourcePage=next((int(x[1:]) for x in ids if x.startswith('P')),None),
            claim=message,visual=visual,transition=transition))
assert len(pages)==len(cards)==107
assert [p['number'] for p in pages]==list(range(1,108))
assert sorted(p['oldRev11Page'] for p in pages if p['oldRev11Page'] is not None)==list(range(1,83))
assert sorted(p['addedId'] for p in pages if p['addedId'])==[f'A{i:02}' for i in range(1,26)]
source_ids=[source_id for p in pages for source_id in p['ids']]
assert len(source_ids)==len(set(source_ids))==90

# Original 107-page candidate keeps its mappings; new exit checks are inserted at chapter ends.
EXIT_PAGES={8,30,38,49,54,82,95,107}
def old_candidate_number(page):
    if page["addedId"] in {f"A{i:02}" for i in range(18,26)}:
        return None
    return page["number"]-sum(x<page["number"] for x in EXIT_PAGES)

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
new[5]=kicker('產品目標（Goal）說使用者想得到的結果；接受條件（AC）說怎樣算符合約定。')+cols(
panel('Planning／PO｜釐清目標與需求',para('<b>問題：</b>使用者要達成什麼？','<b>輸入：</b>使用者問題與範圍。','<b>交付：</b>Goal、#3 工作票與 AC：雙向 Like 才配對。','<b>接手：</b>UI／UX。')),
panel('UI／UX｜設計使用方式與畫面',para('<b>問題：</b>怎麼 Like／Pass，去哪看結果？','<b>輸入：</b>Goal、情境與 #3 AC。','<b>交付：</b>#1 Like／Pass 畫面；#2 配對列表顯示 Match。','<b>接手：</b>Developer。')),
panel('Developer／Dev｜實作',para('<b>問題：</b>如何依票實作並留紀錄？','<b>輸入：</b>設計、AC 與目前版本。','<b>交付：</b>#3 配對規則、#1 輸入、#2 列表；版本與自測。','<b>接手：</b>Reviewer／QA 核對。'),'good'))+ribbon('這些是職責，不是人數；一個人可以承擔多種職能。')
new[6]=kicker('同一張 #3｜單向 Like 不得配對：看見退回與同案重驗')+cols(
 panel('1｜第一次驗收',para('初始 0 筆；只有安 Like 晴。','預期：0 筆。','Version A 實際 1 筆 M01。','工具回傳：<b class="r-red">FAIL</b>。'),'problem'),
 panel('2｜退回修正',para('QA 對照 #3 AC 找出漏掉反向 Like。','把單向錯配交回 Dev。','Dev 只補「已有反向 Like 才配對」。')),
 panel('3｜同案重驗',para('Version B 重跑相同單向操作。','預期 0 筆；實際 0 筆。','工具回傳：<b class="r-green">PASS</b>。','交回版本與證據，由需求方判斷接受。'),'good'))+ribbon('真實規則層執行；不能推論 UI／產品串接已驗收。')+'<p class="r-meta"><a href="../workshop/matching-demo/evidence/A/one-way.json" target="_blank" rel="noopener">開啟 Version A 實際 FAIL ↗</a>　<a href="../workshop/matching-demo/evidence/B-pre-supplement/one-way.json" target="_blank" rel="noopener">開啟 Version B 同案 PASS ↗</a></p>'
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
 ['否','否','不建立配對'],['是','否','不建立配對'],['否','是','不建立配對'],['是','是','<b class="r-green">建立配對</b>']])+ribbon('只有最後一列成功還不夠；另外三列也必須不配對。')+'<p class="r-meta">決策表描述四種預期，不代表四列全都已實測；重複 Like 是另一種初始狀態。</p>'
new[39]=kicker('同一張 #3、同樣的驗收結果，放到不同地方')+cols(
 panel('假資料環境',para('錯配影響的是測試帳號。','可以重建測試資料，再驗一次。','確認隔離與回復方式。')),
 panel('真實使用者環境',para('錯配可能影響使用者與既有資料。','退回程式版本，未必消除既有後果。','需要知道曝光範圍與處理能力。'),'human'))+ribbon('驗收通過仍有剩餘不確定性；放行還要看影響範圍、資料與可逆性。')
new[40]=kicker('人看 #3 的交付與風險，記錄「放行／暫停」理由')+'<div class="r-grid4">'+''.join([
 panel('1 降低發生機率',para('Review、測試、範圍約束','哪些錯誤已設法攔下？')),
 panel('2 驗證結果',para('這次版本的 AC 與結果證據','有沒有未跑或失敗的情境？')),
 panel('3 找出風險',para('資料、使用者與相依範圍','錯了會影響誰？')),
 panel('4 降低衝擊',para('如何停止擴散、回復與處理','這些能力真的可用嗎？'))])+'</div>'+ribbon('本課固定：Goal Check → 人記錄 Gate 決定 → 通過後才 merge／release。','human')
new[42]=kicker('時間快轉：#1／#2 完成並整合後，從使用者目標走完整條路')+flow(
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
 ['下一步','沿原 AC 重跑、連結結果，解除阻礙標記並更新票。']])+ribbon('Blocked 仍是已開始、未完成的票；它持續計入目前 WIP。阻礙解除後沿原工作接續。')
new[79]=kicker('Specification by Example｜讓共同理解跨過人員與版本')+flow(
 panel('討論時',para('共同確認：','同一對不重複配對。','用關鍵範例找出歧義。')),
 panel('票與規格',para('保存規則與例子：','已配對 → 再 Like → 原一筆','讓下一位接手者讀得到。')),
 panel('驗證與維護',para('用同一例子核對行為。','規則變動時一起更新。','避免文件與測試各自漂移。')))+ribbon('共同探索 → 用範例保存理解 → 持續驗證與維護；不只留下會議紀錄。')
new[80]=kicker('處理路徑示意｜不宣稱本 App 已具備以下機制')+cols(
 panel('發現與停止',para('偵測到錯配，確認影響範圍。','先停止擴大影響。','依現有能力關閉或限制功能。'),'problem'),
 panel('回復與資料處理',para('確認版本，按能力回復。','找出受影響的配對資料。','另行處理已發生的後果。')),
 panel('修正與重驗',para('修正錯誤、補齊漏掉的情境。','重跑 AC 與整體路徑。','由人重新判斷是否放行。'),'human'))+ribbon('回復程式版本，不會自動回復所有資料與使用者影響。')

DEMO = ROOT/'workshop/matching-demo'
def demo_case(path): return json.loads((DEMO/path).read_text())
def case_result(path):
    record=demo_case(path)
    count=record['actual']['match_count']
    ids='、'.join(match['id'] for match in record['actual']['match_records']) or '無'
    return record, f'{count} 筆（{ids}）'

a_one, a_actual=case_result(Path('evidence/A/one-way.json'))
b_one, b_one_actual=case_result(Path('evidence/B-pre-supplement/one-way.json'))
b_two, b_two_actual=case_result(Path('evidence/B-pre-supplement/two-way.json'))
b_duplicate, b_duplicate_actual=case_result(Path('evidence/B-post-supplement/duplicate.json'))
hash_a=a_one['artifact_sha256'];hash_b=b_one['artifact_sha256']
assert hash_a!='' and hash_b==b_two['artifact_sha256']==b_duplicate['artifact_sha256']
def transition_summary(record):
    expected=record['expected'];actual=record['actual']
    return (f'預期 {expected["before_match_count"]}→{expected["match_count"]} 筆；'
        f'實際 {actual["before_match_count"]}→{actual["match_count"]} 筆。')
new[36]=kicker('時間快轉至 B-post｜前兩項沿用 B-pre 紀錄，這次只補驗重複情境')+table(['情境','B-pre｜補驗前已有證據','B-post｜此次補驗'],[
 ['單向 Like',transition_summary(b_one)+f'<b class="r-green">{b_one["status"]}</b>','表格沿用 B-pre；B-post 套件另有重跑'],
 ['雙向 Like',transition_summary(b_two)+f'<b class="r-green">{b_two["status"]}</b>','表格沿用 B-pre；B-post 套件另有重跑'],
 ['已配對再 Like','<b>NOT RUN</b>',transition_summary(b_duplicate)+f'<b class="r-green">{b_duplicate["status"]}</b>']])+ribbon('本表沿用 B-pre 單向／雙向原始紀錄；B-post 的完整測試套件也曾重跑三情境。B-pre／B-post 是同一 B 指紋，UI／串接 NOT RUN。')+'<p class="r-meta"><a href="../workshop/matching-demo/evidence/B-pre-supplement/README.md" target="_blank" rel="noopener">B-pre 原始紀錄 ↗</a>　<a href="../workshop/matching-demo/evidence/B-post-supplement/README.md" target="_blank" rel="noopener">B-post 補驗紀錄 ↗</a></p>'
new[37]=kicker('真實規則層證據｜同一個單向 Like 情境，A 失敗、B 通過')+table(['版本／情境','預期','實際配對紀錄','工具判定'],[
 [f'Version A｜單向 Like',f'{a_one["expected"]["match_count"]} 筆',a_actual,f'<b class="r-red">{a_one["status"]}</b>'],
 [f'Version B｜同一單向 Like',f'{b_one["expected"]["match_count"]} 筆',b_one_actual,f'<b class="r-green">{b_one["status"]}</b>']])+ribbon('檔案指紋：用來確認測的是同一份程式；不一定是 Git commit。這裡只證明 #3 規則；UI／產品串接仍 NOT RUN。')+'<p class="r-meta"><a href="../workshop/matching-demo/evidence/A/one-way.json" target="_blank" rel="noopener">Version A 原始 FAIL ↗</a>　<a href="../workshop/matching-demo/evidence/B-pre-supplement/one-way.json" target="_blank" rel="noopener">Version B 同案 PASS ↗</a></p>'

added={}
added['A01']=kicker('AI Agent 是能依目標使用工具推進工作的 AI；後面會看它如何交回可核對的成果。')+cols(
 panel('說清楚',para('使用者要解決什麼？','這次做什麼、不做什麼？')),
 panel('看懂交付',para('改了哪一版？','實際結果和證據在哪裡？'),'good'),
 panel('作出判斷',para('缺證據就退回補驗。','符合要求後再由人接受。'),'human'))+ribbon('同一個 Matching App 串起軟體工程與 Agent 合作；方法也能轉用到你的工具。')
added['A02']=kicker('職能是要負責回答的問題，不是人數或看板欄位')+cols(
 panel('Reviewer｜改動合理嗎？',para('輸入：需求與變更差異。','交回：具體意見與待修項。','接手：Dev 修正或送驗。')),
 panel('QA｜行為符合 AC 嗎？',para('輸入：AC、版本、入口與資料。','交回：操作、預期/實際、狀態與證據。','接手：Dev 處理，需求方核對。'),'good'),
 panel('需求方｜可以接受嗎？',para('輸入：Goal、AC、交付與風險。','交回：接受、退回或暫停及理由。','放行仍由人決定。'),'human'))+ribbon('同一個人可以承擔多種職能；責任仍要分清楚。')
added['A03']=kicker('同一張 #3：QA 是責任、#3 是工作、驗證中是狀態')+table(['類別','#3 的例子','用來回答'],[
 ['職能／責任','QA 驗行為','誰負責這種判斷？'],
 ['工作票','#3 雙向喜歡才配對','這一項要交付什麼？'],
 ['狀態','驗證中','目前工作走到哪裡？'],
 ['交付物','可核對的測試紀錄','交回什麼讓人核對？']])+ribbon('四類名稱不能互換；流程圖會同時畫到它們。')
added['A04']=kicker('先固定假資料，單獨執行 #3 規則')+flow(
 panel('輸入',para('小安 Like 小晴。','起初尚未配對。')),
 panel('#3 規則',para('只有一方 Like。','判斷是否建立配對。'),'rule'),
 panel('檢查記錄',para('預期：0 筆。','實際：看版本與工具輸出。'),'good'))+ribbon('規則層可先驗；這不能證明 Like 按鈕、配對列表或整個 App 已通過。')
added['A05']=kicker('目前 WIP 是已開始未完成的票數；上限是政策設定')+table(['票所在位置','目前是否計入','目前值例子'],[
 ['Backlog／Ready（未開始）','不計','0/1；或 0/2'],
 ['Dev、Review、QA、Product Check','計入','上限1：#3 在 Dev＝1/1；上限2：#1 在 Dev＋#2 在 QA＝2/2'],
 ['等待驗收、Blocked、退回修正','仍計入','#3 等 QA＝1/1；#1 Dev＋#2 QA＝2/2'],
 ['Done（達成本課 DoD）','不計','#3 Done 後 0/1；兩票 Done 後 0/2']])+ribbon('1/2 表示一張進行中、上限兩張；已開工的票退回 Backlog 仍計入。上限是政策，不是產量目標。')
added['A06']=kicker('同一張看板：上限 1 與 2 都有取捨')+cols(
panel('本課交付上限 1',para('<b>好處：</b>同時只追一張未完成票，交付路徑較容易看清。','<b>代價：</b>若 #3 在外部等待、#1／#2 又不能共同推進，其他能力可能暫時閒置。','適合先練完一張；不保證整體產出最高。'),'rule'),
panel('比較情境：明示上限改為 2',para('<b>好處：</b>#3 Done 後，獨立的 #1／#2 可分站並行；#1 Dev＋#2 QA 是目前 2／上限 2。','<b>代價：</b>要追更多版本、依賴、交接與待驗收事項；下游接不住會堆積。','條件：介面／資料已定、資源隔離、測試與審查接得住。'),'good'))+ribbon('增加 WIP 上限不會自動增加產能；選擇要看工作依賴與接手能力。')
added['A07']=kicker('每個案例先重置同一份假帳號資料；以下是實際工具紀錄')+'<p class="r-meta"><b>初始：</b>小安、小晴尚未配對，0 筆。<b>操作：</b>單向＝安 Like；雙向＝兩人互 Like；重複＝先建 M01，再由安重複 Like 一次。入口：`run_case.py` 會從固定假資料重置並輸出操作前後紀錄。</p>'+table(['版本／情境','預期','實際','狀態'],[
 ['A｜單向 Like', '0 筆', a_actual, '<b class="r-red">FAIL</b>'],
 ['B｜單向 Like', '0 筆', b_one_actual, '<b class="r-green">PASS</b>'],
 ['B｜雙向 Like', '1 筆 M01', b_two_actual, '<b class="r-green">PASS</b>'],
 ['B-pre｜重複 Like', '仍 1 筆 M01', '尚未執行', '<b>NOT RUN</b>']])+ribbon('真實證據只涵蓋安→晴單向、雙向、重複；雙方都未 Like／僅晴→安 尚未提供另測紀錄。UI／串接 NOT RUN。')+'<p class="r-meta"><a href="../workshop/matching-demo/README.md" target="_blank" rel="noopener">開啟操作 Runbook ↗</a>　<a href="../workshop/matching-demo/evidence/B-pre-supplement/README.md" target="_blank" rel="noopener">開啟原始結果與未測狀態 ↗</a></p>'
added['A08']=kicker('Agent 是 AI 模型依目標判斷下一步、呼叫工具並讀取回傳的工作循環')+flow(
panel('人交代目標',para('指定 #3、AC 與範圍。','說明停止條件。')),
panel('Agent 判斷下一步',para('先讀票與候選檔。','檢查能用的工具。')),
panel('實際使用工具',para('讀檔、修改、執行。','工具有真實回傳。'),'rule'),
panel('觀察後續',para('依回傳繼續、調整、詢問或停止。','回交結果與未測事項。'),'human'))+'<p class="r-loop-back"><b aria-hidden="true">↶</b> 結果未符合預期或需要補資料時，回到判斷，重新選擇下一步。</p>'+ribbon('不是只回答一句話：要觀察工具回傳，才知道接著該做什麼。')
added['A09']=kicker('時間倒回至獨立教學重演的起點：先看交辦、計畫與實際結果')+cols(
panel('交辦｜範圍先說清楚',para('只處理 #3 單向 Like。','預期：尚未互相喜歡時，不建立配對。','保留既有案例；不測 UI 或完整產品。')),
panel('計畫｜執行前先安排',para('讀票與候選版本。','執行一次單向情境，再對照 AC。','若不符合，才修正並用同一情境重驗。'),'good'),
panel('工具實際回傳｜Version A',para('<b>預期：</b>0 筆。','<b>實際：</b>1 筆 M01。','<b class="r-red">FAIL</b>','把錯誤結果交回修正。'),'problem'))+ribbon('這是獨立教學重演：主畫面呈現決策與結果；命令、檔案指紋、完整輸出與 replay 材料留在筆記。')
added['A10']=kicker('時間倒回 B-pre｜看同一單向情境如何由 FAIL 修正為 PASS')+cols(
panel('修正｜只改判斷條件',para('依 Version A 的失敗結果修正。','只有反向 Like 也存在時才配對。','接著重跑原本的單向情境。'),'problem'),
panel('重測｜Version B 單向 Like',para('<b>預期：</b>0 筆。','<b>實際：</b>0 筆。','<b class="r-green">PASS</b>','同一規則情境已通過。'),'good'),
panel('當時仍未知',para('B-pre 的雙向情境：PASS。','重複 Like：NOT RUN。','UI／產品串接：NOT RUN。','後面的 B-post 才補上重複情境。')))+ribbon('這裡明確回到重複情境補驗前的 B-pre；不把後來的 B-post 結果提前。')
added['A11']=kicker('Context 是 AI 這一輪實際取得並可使用的工作材料')+'<div class="r-worktable"><section><b>桌面｜本輪已取得</b><span>#3 ticket／AC 與 Version A</span><span>單向 FAIL → 修正 → 同案 PASS</span><span>Version B：單向／雙向 PASS</span><span>未完成：重複 NOT RUN；UI NOT RUN</span><span>授權：尚未批准 merge／發布</span></section><section class="not-on-desk"><b>桌邊｜文件已存在但本輪未讀</b><span>workshop/matching-demo/exercise.md</span><span>講師練習說明；使用前須先開啟並核對內容。</span></section></div>'+ribbon('本輪可用材料有上限；專案中存在的資料，不代表這一輪已讀取。')
added['A12']=kicker('交辦一項有邊界、能驗證、知道何時停的工作')+cols(
 panel('指定材料',para('ticket：`workshop/matching-demo/ticket.md`','程式：`workshop/matching-demo/versions/B/matching.py`','假資料：`workshop/matching-demo/fixtures/users.json`','執行入口：`workshop/matching-demo/run_case.py`')),
 panel('從專案根目錄執行',para('<code>python3 workshop/matching-demo/run_case.py --artifact workshop/matching-demo/versions/B/matching.py --candidate-id B --case one-way</code>','回報預期／實際紀錄、筆數與結果。','只驗 #3 規則；UI／產品串接不在此範圍。'),'good'))+ribbon('若票、B 程式、假資料或 runner 不可取得，停止並回報；不要改 AC 或宣稱產品驗收。')
added['A13']=kicker('B-pre 有一個缺口：重複情境尚未跑；你會怎麼要求補驗？')+cols(
panel('補驗前｜B-pre',para('單向：PASS，預期／實際 0 筆。','雙向：PASS，預期／實際 1 筆 M01。','重複 Like：NOT RUN。','先寫下一句補驗指令。'),'problem'))+ribbon('請在揭露前說清楚：核對同一個 B artifact、不可改規則、重置資料後只補跑重複 Like，並交回前後紀錄。')
added['A14']=kicker('用未補驗的 B-pre 練交接，再恢復補驗完成主線')+cols(
panel('交接卡｜B-pre',para('Ticket：#3 雙向才配對。','版本：B · '+hash_b[:12]+'…','已驗：單向、雙向 PASS。','未驗：重複 Like；UI NOT RUN。','停點：不合併、不發布。'),'rule'),
panel('練習｜寫下一句交辦',para('請寫給接手者：','先讀 #3 ticket，核對 B artifact hash。','重置後建立 M01，再只重複 Like 一次。','提供前後筆數、紀錄與執行結果。'),'human'),
panel('回到主線｜B-post',para('恢復同一 B hash 的補驗後證據。','duplicate 實際 PASS，仍只有 M01。','下一頁：人依 Goal、AC 與證據作 Human Gate。'),'good'))+ribbon('接手演練結束；回到補驗完成的主線，核對更新證據，再進入 Human Gate。')+'<p class="r-meta"><a href="../workshop/matching-demo/evidence/B-pre-supplement/README.md" target="_blank" rel="noopener">開啟補驗前交接材料 ↗</a>　<a href="../workshop/matching-demo/evidence/B-post-supplement/README.md" target="_blank" rel="noopener">開啟補驗後證據 ↗</a></p>'
added['A15']=kicker('把方法轉用到你熟悉的小工具：只寫第一張有邊界的票')+table(['票上要有','請寫清楚'],[
 ['使用者與問題','誰需要它？要改善哪件事？'],
 ['第一個交付','這一輪只做哪個最小結果？'],
 ['成功與禁止','一個應成功的情況、一個不應發生的情況。'],
 ['核對與停止','怎麼看結果與版本？什麼情況先停下回報？']])+ribbon('練習只寫一張票，不要求學員再做第二個完整產品。')
added['A16']=kicker('產品可能把另存背景或過去對話的相關資訊帶進本輪')+'<div class="r-worktable"><section><b>共同工作桌｜最新正式狀態</b><span>需求：雙向才配對</span><span>候選：Version B · '+hash_b[:12]+'…</span><span>待核對：重複情境證據</span><span>接受／合併：尚未授權</span></section><section class="not-on-desk"><b>可能帶入的背景</b><span>正在做配對 App</span><span>熟悉工具與目標</span><span>來源依產品與設定而異</span></section></div>'+ribbon('不同產品與設定可取得的背景不同，也不保證保留所有細節；仍要核對最新版本、未測事項與授權。')
added['A17']=kicker('電腦上的 Agent：先選接續方式，再核對工作狀態')+cols(
panel('Codex CLI',para('選取已保存的工作對話，或搜尋舊對話。','確認回到正確專案與工作內容。','再讀票面核對候選版本。')),
panel('Claude Code',para('在目前目錄接續最近的工作對話，或從選單挑選既有 session。','回到後核對專案、票、已做與未測。'),'good'))+ribbon('接續對話不會回滾專案檔案或分支；仍要讀票、核對版本並確認未測事項。命令例子見講者筆記。')


# Eight chapter exits: one learning objective and three learner questions each.
exit_check_data = {'A18': {'label': '人類合作',
         'outcome': '能辨認職能、交付物與最後的接受責任。',
         'questions': [('做出 #3 配對規則，要有哪些工作責任？各交回什麼？', 'PO 交 Goal／AC，Dev 交候選規則與自測，Reviewer 交改動意見，QA 交預期／實際證據，需求方交接受／退回決議。'),
                       ('Reviewer、QA 和需求方各自要回答什麼？', 'Reviewer 看修改是否合理且未超出範圍；QA 對照 AC 與證據；需求方作接受、退回或暫停決定。'),
                       ('需要六種工作責任，就一定要六個人嗎？', '不一定。職能代表責任，不代表人數；同一個人可以承擔多項工作，仍應分清審查與接受責任。')]},
 'A19': {'label': '想法到 Ready',
         'outcome': '能把模糊要求寫成有邊界、有 AC、有證據的可交辦 Ticket。',
         'questions': [('只有一句「支援配對」，你會先問什麼？', '先釐清誰需要、Goal 是什麼；用單向、雙向、重複 Like 的具體情境確認共同理解。'),
                       ('老師已確認「文字非空才能提交、空白不得送」，但自動評分未決。你會怎麼寫第一張 Ticket？',
                        '範圍：文字提交；AC：非空新增一筆、空白不能提交；評分先列待確認，不擅自加入 AC 或宣布不做；驗證：兩種前提的預期／實際提交紀錄。'),
                       ('#3 在 Ready 尚未開始時，WIP 是 0/1 還是 1/1？', '0/1。Ready 代表可開工，尚未開始；進入 Dev 才計入進行中的 WIP。')]},
 'A20': {'label': '版本協作',
         'outcome': '能找到指定版本，分清 branch、commit、PR、merge 的用途。',
         'questions': [('PR #3 指定已審查的 commit abc123；另有 app_final。要重現那次改動，該選哪個版本？',
                        '選 PR 指定的 commit abc123，核對對應測試紀錄；檔名 app_final 不能證明版本。檔案指紋與 commit 的差別留待後續實測章節教。'),
                       ('Commit、Branch、PR 分別幫我們做什麼？', 'Commit 留存一版、Branch 隔離修改路線、PR 讓協作者審查差異與相關證據。'),
                       ('PR 通過或 Merge，是否代表產品已上線、Goal 已達成？', '不代表。Merge 是整合版本；部署與上線後是否達成 Goal，要另外確認。')]},
 'A21': {'label': '實作與驗收',
         'outcome': '能用 AC、候選版本和預期／實際結果判斷 PASS、FAIL、NOT RUN。',
         'questions': [('Version A 只有小安 Like 小晴，預期／實際各幾筆？', '預期 0 筆，實際 1 筆 M01，所以是 FAIL；Version B 同案重跑實際 0 筆才 PASS。'),
                       ('新案例預期 1 筆、實際 0 筆；另一個案例已確認尚未執行。各標什麼？',
                        '第一個是 FAIL，第二個是 NOT RUN；若只缺紀錄、不能確認是否曾執行，應先要求補證據，不自行判定 NOT RUN 或 PASS。'),
                       ('Reviewer、QA、Product Check 的核對重點有何不同？', 'Reviewer 看修改範圍與品質，QA 驗行為與 AC，Product Check 判斷這張票是否仍推進 Goal。')]},
 'A22': {'label': '放行與完成',
         'outcome': '能區分單票驗收、人的放行、整體 Goal 成效。',
         'questions': [('在教材推演中，若 #3 的工作票已 Done，就代表配對 App 的 Goal 達成嗎？',
                        '不代表。這是假設 #3 本身已完成的示意，不是實際部署證據；#1／#2 與完整使用者路徑仍待整合，上線後也須觀察 Goal 訊號。'),
                       ('在 Product Check 之後，誰決定能否 Merge／Release？', '依本課約定是人作 Human Gate 放行或暫停；Gate 是決策點，不是多一個看板欄位。'),
                       ('上線前核對什麼，上線後量什麼？', '上線前依 AC、版本、證據與風險決定接受／放行；上線後再觀察真正的 Goal 成效。')]},
 'A23': {'label': 'Agent 演進',
         'outcome': '能分辨 Agent、Workflow、Session、WIP，判斷何時需要多 Agent。',
         'questions': [('比較情境：已核准把 WIP 上限調為 2；同一個 Agent 開始 #1／#2，均未完成。Agent 數和 WIP 各多少？',
                        'Agent 1 位、WIP 2 張。因已明示調整上限，此情境不違反上限；Agent 數量與 WIP 是兩種獨立尺度。'),
                       ('按本課已定流程，QA 不通過便退回 Dev。這條路由誰定？是否一定要增加 Agent？',
                        '由人核准的 Workflow／看板規則決定退回路徑，可由系統或獲授權者執行；工作者人數不因此增加，多 Agent 另看隔離、專責或並行效益。'),
                       ('換 Session 或 Compact 後，要優先核對哪幾項？', '共同 Ticket／AC、候選版本、已測／未測與授權狀態；Memory 不是最新工作狀態的證據。')]},
 'A24': {'label': 'Agent 交付',
         'outcome': '能交辦一張票、辨認缺證據並要求補驗與接續。',
         'questions': [('拿上一頁自己寫的 Ticket，寫一段可交給 Agent 的交辦與停止條件。', '例如：「請先讀［票］，只做［範圍］，按［AC］交回版本、預期／實際及未測事項；缺資料或超出範圍先停下詢問，不得自行發布。」'),
                       ('Agent 說 B 版完成，但重複 Like 是 NOT RUN，怎麼回覆？', '要求在相同 B artifact 與假資料重播重複 Like，交出操作前後筆數及原始結果；暫不接受。'),
                       ('把上一頁自己的 Ticket 交接給新 Agent：請寫版本、已做／未測、下一步、停止條件。',
                        '示例：票＝你上一頁的工作；版本＝候選版本／連結；已做＝哪些 AC 有證據；未測＝明列；下一步＝具體補驗；停止＝未核准前不 Merge／發布，缺資料先詢問。')]},
 'A25': {'label': '附錄',
         'outcome': '能按需要查找方法，分辨教學示意與真正驗證過的結果。',
         'questions': [('需求理解分歧、條件組合多、想先看失敗測試：請在附錄找三種方法與頁碼。',
                        '可回查 P101 Example Mapping 釐清分歧、P97 規則／決策表比較條件、P99 TDD 先紅再綠；必要時 P100 BDD。選法依問題，不必記全部術語。'),
                       ('TDD、BDD、Specification by Example 是同一件事嗎？能如何配合？',
                        '不是同一件事。TDD 用失敗測試推進實作；BDD 共同探索、描述與驗證行為；SBE 用範例保存可核對的長期規格，三者可以搭配。'),
                       ('看到六層架構圖或全綠畫面，就代表整個 App 已驗收嗎？', '不代表。圖是教學模型；測試結果只支持有執行且可追到版本、情境及證據的範圍。')]}}
for exit_id,check in exit_check_data.items():
    exit_items=[]
    for n,(question,answer) in enumerate(check['questions'],1):
        exit_items.append('<article class="r-exit-card"><div class="r-exit-question"><span class="r-exit-marker">Q'+str(n)+'</span><h2>'+e(question)+'</h2></div><details class="r-exit-answer"><summary>自己先回答，再揭露參考答案</summary><p>'+e(answer)+'</p></details></article>')
    added[exit_id]='<div class="r-exit-head"><p class="r-kicker">Chapter Exit Check｜本章學完，你應該能做到：</p><p class="r-exit-outcome">'+e(check['outcome'])+'</p></div><div class="r-exit-grid">'+''.join(exit_items)+'</div>'+ribbon('先口頭／筆記作答，再逐題展開必要要點；未決條件不自行補成 AC，答不出就回到本章練習。')

new[46]=kicker('長對話可能被整理成較短摘要，之後繼續工作')+'<div class="r-worktable"><section><b>共同工作票｜完整規則</b><span>單向 Like：不配對</span><span>雙向 Like：建立一筆配對</span><span>已配對再 Like：不增加筆數</span></section><section class="not-on-desk"><b>可能的精簡摘要｜示意</b><span>Goal：互相喜歡才算配對成功</span><span>此摘要省略了重複規則</span><span>回到票面核對 AC 與版本</span></section></div>'+ribbon('長對話的上下文可能被精簡；摘要可能省略細節，實際方式依產品而異。')
new[47]=kicker('Session 是一段工作對話；視窗只是進入它的介面')+'<div class="r-worktable"><section><b>路徑 A｜恢復原 session</b><span>回到同一段工作對話。</span><span>核對目前專案與候選版本。</span><span>確認已做、未測與授權。</span></section><section class="not-on-desk"><b>路徑 B｜開新 session</b><span>讀共同工作紀錄與 AC。</span><span>指定候選 artifact／版本。</span><span>核對已做、未測與授權。</span></section></div>'+ribbon('新開對話不保證完整帶入前文；恢復對話也不保證已查證最新工作狀態。')


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
        steps=node.select('.flow-visual svg .flow-step')
        assert len(steps)==2, 'Expected preserved forward and return groups in the legacy P06 diagram.'
        steps[0]['class'].append('flow-forward-step')
        steps[1]['class'].append('flow-return-step')
        return_label=node.select_one('.flow-visual svg .flow-reanchor-label')
        if return_label:return_label.string='#3 回查 Goal（re-anchor）'
        append_html(node,'<div class="r-process-stepper" role="group" aria-label="完整流程圖逐步顯示"><span data-process-note aria-live="polite">1／3｜先看 #3 雙向配對一路經過關卡</span><button type="button" data-process-next>下一步：展開退回路徑 →</button></div>')
    elif n==10:
        add_note(node,'#3 的修改歷史：初版 → 修正單向錯配 → 補上重複情境；Git 比較前後差異，GitHub 分享給協作者。')
    elif n==11:
        for x,t in zip(node.select('.commit-labels span'),['#3 初版','#3 修正','#3 補測']):x.string=t
        replace_text(node,'不會自動存，也看不到、回不去。','尚未 commit 的修改，不在這次提交歷史裡。')
        add_note(node,'本地 commit ── push → 遠端分支；讓協作者取得這些版本。Push 還不是 merge。')
    elif n==12:
        replace_text(node,'分出一份','建立工作分支')
        add_note(node,'#1 Like／Pass、#2 配對列表也各有自己的工作分支。本課交付 WIP 上限：1；本頁 #3 尚未開工，目前 0/1。真正開始後，接手時先更新共同版本。')
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
        replace_text(node,'WIP=1：同時只推進一張票','本課交付 WIP 上限：1｜目前：0/1（都在 Backlog）')
    elif n==21:
        replace_text(node,'工作持續流動；本例一次只做一張（WIP=1）。','工作持續流動；本課交付 WIP 上限 1，目前 0/1。')
        add_note(node,'目前 WIP＝開始但尚未完成的票數；本課交付 WIP 上限 1 是政策。Ready 尚未開工，尚不計入。')
    elif n==22:
        replace_text(node,'WIP=1','本課交付 WIP 上限 1｜目前 0/1')
    elif n==30:
        replace_text(node,'WIP=1','本課交付上限 1｜目前 0/1（Ready 尚未開工）')
        add_note(node,'#3 可先用測試資料驗核心規則；#1、#2 再串接。各票要有可交付結果、驗收方式與清楚依賴。')
    elif n==31:
        replace_text(node,'WIP=1','本課交付上限 1｜目前 1/1（#3 已開始）')
        replace_text(node,'Developer＝第 2 段的 branch＋commit：','Developer 接回前面學過的 branch＋commit：')
        replace_text(node,'branch 是隔離修改的副本','branch 標示一條獨立的開發路線')
    elif n==33:
        replace_text(node,'WIP=1','本課交付上限 1｜目前 1/1（#3 在 Review）')
    elif n==36:
        replace_text(node,'WIP=1','本課交付上限 1｜目前 1/1（#3 在 QA）')
        replace_text(node,'CI 是每個 PR 都會自動執行的檢查；QA 依 AC 驗證實際行為與邊界。','本課設定 CI 在 PR 更新時執行 checks；QA 依 AC 驗行為。下表結果為教學示意。')
    elif n==38:
        replace_text(node,'WIP=1','本課交付上限 1｜目前 1/1（#3 在 Product Check）')
        replace_text(node,'接受後 → merge 回 main → 上線檢查 → 關閉子票。','接受後 → Human Gate 放行 → merge／上線／檢查 → 關閉子票。')
    elif n==41:
        replace_text(node,'WIP=1','本課交付上限 1｜目前 0/1（#3 Done；#1、#2 尚未開工）')
        replace_text(node,'Done 接回第 2 段的 Merge：通過關卡後合回 main，上線檢查後關閉子票。','本課 Done：依 Human Gate 決議 merge／上線，完成共用 DoD 後關閉子票。')
        replace_text(node,'產品接受後，#3 已 merge','產品接受並經 Human Gate 放行後，#3 已 merge')
    elif n==44:
        add_note(node,'這裡比較工作如何推進；聊天介面也能承載 Agent，不能只看介面判定自主程度。')
    elif n==46:
        replace_text(node,'系統把前面的內容自動壓縮成摘要。','系統可能把前文壓縮成摘要；以下是關鍵規則被漏掉的示例。')
    elif n==47:
        replace_text(node,'session：一段獨立的對話；開新的對話就是新的 session，看不到前一段的內容。','session：一段工作對話。可恢復原對話，或新開後讀共用票面與交接紀錄。')
        replace_text(node,'新接手者看不到前段對話','另開 session 需要取得共同紀錄；續聊也要核對最新狀態')
    elif n==49:
        replace_text(node,'全部放進同一個 chat','若各步驟沿用同一套設定')
        replace_text(node,'開越高越慢、越貴。','速度、成本與品質有取捨。')
        replace_text(node,'簡單的事也又慢又貴','簡單工作可能付出額外時間與成本')
        replace_text(node,'困難的規則判斷容易出錯','複雜規則是否可靠，仍需實際驗證')
        replace_text(node,'第 5 段怎麼解','模型／effort 選擇與 Agent 數量是不同問題；接著看分工。')
    elif n==56:
        replace_text(node,'案例票｜#3 雙向喜歡才配對','例：#3 Review 不過 → Dev 修正 → 再送審；誰安排這條路徑？')
        append_html(node,'<button class="r-wip-trigger" type="button" data-wip-reveal aria-expanded="false">下一步：收起路線圖，展示 Agent 數量 × WIP 比較 →</button><section class="r-wip-sequence" data-wip-sequence hidden><p class="r-kicker">先固定一張票，再改變 Agent 數量；再固定 Agent 數量，改變未完成票數</p><div class="r-grid4">'+
            panel('1 Agent × WIP 1',para('只推進同一張 #3。','先完成、交回，再接下一張。'))+
            panel('1 Agent × WIP 2',para('同一 Agent 先接 #1，未 Done 又開始 #2。','兩張都未完成，Agent 需切換注意力。'),'problem')+
            panel('多 Agent × WIP 1',para('Dev、Reviewer、QA 接力同一張 #3。','仍是一張未完成工作票。'))+
            panel('多 Agent × WIP 2',para('#3 Done 後，#1 在 Dev、#2 在 QA。','目前 2/2；先明示上限改為 2，確認依賴獨立、資源隔離、驗收接得住。'),'good')+
            '</div><p class="r-meta">上限 2 是 A06 的比較政策，不代表本課預設改成 2；等待驗收的已開工票仍計入。</p><button type="button" data-wip-return>返回原 Workflow／執行者圖</button></section>')
    elif n==60:
        replace_text(node,'WIP=1','本課交付 WIP 上限：1')
    elif n==58:
        replace_text(node,'由另一站核對','依條件獨立核對')
        for a,b in [('5-5｜','SHIFT｜'),('4–5｜','交接問題｜'),('4｜','Chat 問題｜'),('5｜','協作問題｜')]:
            for t in list(node.find_all(string=True)):
                if a in t:t.replace_with(str(t).replace(a,b))
    elif n==59:
        replace_text(node,'新 Session 讀票，不讀聊天','新 session 先讀共同紀錄，不只依賴聊天')
    elif n==61:
        replace_text(node,'規劃與接受','整理規劃與接受建議')
        add_note(node,'角色代表責任，不代表每個職能都需要一個 Agent。人主導目標與接受標準，核對結果；Human Gate 由人決定放行，不由 Agent 自行核准。')
    elif n==62:
        replace_text(node,'核對 #3 的 AC 與證據','核對 #3 AC：單向不配對、雙向才配對、重複不增筆；再對版本與證據')
        replace_text(node,'PR Review、QA 與 Developer 分開；只認證據，不認自述。','核對責任與產出分開；可由人依 AC、版本與證據核對，不只接受產出者自述。')
    elif n==71:
        replace_text(node,'Push branch','Push branch／開 PR')
        replace_text(node,'開 Pull Request','審查差異與意見')
        replace_text(node,'執行 checks','依 AC 驗行為、留證據')
    elif n==72:
        replace_text(node,'Appendix','附錄')
    elif n==68:
        add_note(node,'這張 #3 已開始後退回 Dev 修正，仍在交付區間內；退回、Blocked、等人驗收都不會讓它退出目前 WIP。')
    elif n==82:
        replace_text(node,'Agent 依序交接 · WIP=1','Agent 依序交接 · 本課交付上限 1｜目前 0/1')
        replace_text(node,'核准後 #3 才進 Done（WIP=1）。','核准後 #3 才進 Done（目前 WIP 回到 0/1）。')
    else:raise ValueError(n)
    return node

def adjust_preserved_wip(node,old_number):
    """Apply only the approved WIP count labels to otherwise preserved pages."""
    if old_number==21:
        replace_text(node,'工作持續流動；本例一次只做一張（WIP=1）。','工作持續流動；目前 WIP 是已開始未完成的票數；本課交付上限：1，當下 0/1（尚未開工）。')
    elif old_number==22:
        replace_text(node,'WIP=1','本課交付 WIP 上限：1｜目前：0/1（全在 Backlog）')
    elif old_number==30:
        replace_text(node,'WIP=1','本課交付 WIP 上限：1｜目前：0/1（Ready 尚未開工）')
    elif old_number==82:
        replace_text(node,'Agent 依序交接 · WIP=1','Agent 依序交接 · 本課交付 WIP 上限：1｜目前：0/1')
        replace_text(node,'核准後 #3 才進 Done（WIP=1）。','核准後 #3 才進 Done（目前 WIP 回到 0/1）。')
    else:
        raise ValueError(f'No preserved-page WIP label update for rev11 page {old_number}.')
    return node

baseline_path=ROOT/'slides/rev11.html'
if not baseline_path.exists():
    baseline_html=(ROOT/'slides/index.html').read_text()
    assert len(BeautifulSoup(baseline_html,'html.parser').select('.slide'))==82, 'Refusing to archive a non-rev11 baseline.'
    baseline_path.write_text(baseline_html)
baseline_sha=hashlib.sha256(baseline_path.read_bytes()).hexdigest()

issue_comment_urls={
    4:'https://github.com/world4jason/Agent-101-deck/issues/48#issuecomment-6039187588',
    5:'https://github.com/world4jason/Agent-101-deck/issues/48#issuecomment-6039188518',
    7:'https://github.com/world4jason/Agent-101-deck/issues/48#issuecomment-6042650681',
    8:'https://github.com/world4jason/Agent-101-deck/issues/48#issuecomment-6052541648',
}
demo_refs={
    'A04':['workshop/matching-demo/ticket.md','workshop/matching-demo/fixtures/users.json','workshop/matching-demo/run_case.py'],
    'A07':['workshop/matching-demo/evidence/A/one-way.json','workshop/matching-demo/evidence/B-pre-supplement/one-way.json','workshop/matching-demo/evidence/B-pre-supplement/two-way.json','workshop/matching-demo/evidence/B-pre-supplement/README.md'],
    'A09':['workshop/matching-demo/evidence/A09-replay/README.md','workshop/matching-demo/evidence/A09-replay/assignment.md','workshop/matching-demo/evidence/A09-replay/plan-before-execution.md','workshop/matching-demo/evidence/A09-replay/ticket-read.txt','workshop/matching-demo/evidence/A09-replay/version-a-read.txt','workshop/matching-demo/evidence/A09-replay/version-a-one-way.json','workshop/matching-demo/evidence/A09-replay/identity-hashes.txt','workshop/matching-demo/versions/A/matching.py'],
    'A10':['workshop/matching-demo/evidence/A09-replay/README.md','workshop/matching-demo/evidence/A09-replay/A-to-working.diff','workshop/matching-demo/evidence/A09-replay/candidate-b-one-way.json','workshop/matching-demo/evidence/A09-replay/identity-hashes.txt','workshop/matching-demo/evidence/B-pre-supplement/one-way.json','workshop/matching-demo/evidence/B-pre-supplement/two-way.json','workshop/matching-demo/evidence/B-pre-supplement/README.md'],
    'A12':['workshop/matching-demo/exercise.md','workshop/matching-demo/ticket.md'],
    'A13':['workshop/matching-demo/exercise.md','workshop/matching-demo/evidence/B-pre-supplement/README.md','workshop/matching-demo/evidence/B-post-supplement/duplicate.json'],
    'A14':['workshop/matching-demo/exercise.md','workshop/matching-demo/evidence/B-pre-supplement/README.md','workshop/matching-demo/evidence/B-post-supplement/README.md'],
}

chapter_labels={'C0':'人類合作','C2':'想法到 Ready','C1':'版本協作','C3':'實作與驗收','C4':'放行與完成','C5':'Agent 演進','C6':'Agent 交付','APP':'附錄'}
chapter_order=[]
for p in pages:
    if p['chapter'] not in chapter_order:chapter_order.append(p['chapter'])
chapter_starts={key:next(p['number'] for p in pages if p['chapter']==key) for key in chapter_order}
rail=''.join(f'<a href="#{chapter_starts[key]}" data-rail="{key}">{chapter_labels[key]}</a>' for key in chapter_order)

manifest=[];out=[]
for i,p in enumerate(pages):
    p={**p,'sourceIds':p['ids'],'prerequisite':pages[i-1]['transition'] if i else '開場：使用共同案例。',
        'sourceCommentUrls':[{'label':f'Issue #48 comment {n}','url':issue_comment_urls[n]} for n in [4,8]]}
    if p['addedId'] in {f'A{i:02}' for i in range(1,16)}:p['sourceCommentUrls'].insert(1,{'label':'Issue #48 comment 5','url':issue_comment_urls[5]})
    if p['addedId'] in {'A11','A14','A16','A17'} or (p['chapter']=='C5' and old_candidate_number(p) in range(55,61)):
        p['sourceCommentUrls'].append({'label':'Issue #48 comment 7','url':issue_comment_urls[7]})
    p['materialRefs']=[{'label':'Issue #48 執行故事板','path':'docs/issue48-execution-storyboard.md'}]
    if p['rev10SourcePage'] is not None:p['materialRefs'].append({'label':f'rev10 source P{p["rev10SourcePage"]:02}','path':f'drafts/rev10.html#{p["rev10SourcePage"]}'})
    if p['addedId'] in demo_refs:p['materialRefs'].extend({'label':Path(ref).name,'path':ref} for ref in demo_refs[p['addedId']])
    if p['oldRev11Page']==6:p['materialRefs'].extend({'label':Path(ref).name,'path':ref} for ref in ['workshop/matching-demo/evidence/A/one-way.json','workshop/matching-demo/evidence/B-pre-supplement/one-way.json'])
    if p['addedId'] in {f'A{i:02}' for i in range(18,26)}:
        p['materialRefs'].append({'label':'八章 Exit Check 原始問答與章節目標','path':'docs/issue48-execution-storyboard.md'})
        p['sourceCommentUrls']=[{'label':'Issue #52｜八章 Exit Check 原話與驗收','url':'https://github.com/world4jason/Agent-101-deck/issues/52'}]
    if p['addedId']=='A16':p['materialRefs'].append({'label':'OpenAI Memory in ChatGPT','path':'https://help.openai.com/en/articles/8590148-memory-in-chatgpt'})
    if p['addedId']=='A17':p['materialRefs'].extend([
        {'label':'Claude Code: Sessions','path':'https://code.claude.com/docs/en/sessions'},
        {'label':'Claude Code: How it works','path':'https://code.claude.com/docs/en/how-claude-code-works'},
        {'label':'Codex CLI','path':'https://learn.chatgpt.com/docs/codex/cli'}])
    old_number=p['oldRev11Page'];source_page=p['rev10SourcePage']
    if p['addedId']:
        node=BeautifulSoup(f'<section class="slide rev10-slide r-new"><h1>{e(p["title"])}</h1><div class="r-content">{added[p["addedId"]]}</div></section>','html.parser').section
    else:
        legacy=next(x for x in legacy_pages if x['number']==old_number)
        if old_number in new:
            node=BeautifulSoup(f'<section class="slide rev10-slide r-new"><h1>{e(p["title"])}</h1><div class="r-content">{new[old_number]}</div></section>','html.parser').section
        else:
            assert source_page is not None, f'Legacy page {old_number} has no source P-page and no custom content.'
            node=copy.deepcopy(originals[source_page-1])
            if legacy['kind']=='調整':node=adjust(node,{**p,'number':old_number})
            else:
                node.h1.clear();node.h1.append(p['title'])
                if old_number in {21,22,30,82}:node=adjust_preserved_wip(node,old_number)
    if old_candidate_number(p)==14:
        replace_text(node,'本課交付 WIP 上限：1｜目前：0/1（都在 Backlog）','已開始但未完成的票數（WIP）上限：1｜目前：0/1（都在 Backlog）')
        replace_text(node,'Goal / Epic｜互相喜歡才算配對成功','共同目標｜互相喜歡才算配對成功')
        replace_text(node,'Parent issue · 三張票的共同目標與分組','三張工作票的共同目標與分組')
        definition=BeautifulSoup('<p class="r-meta">Backlog＝待釐清或退回的待辦；Ready＝可以開工。已開工的票退回 Backlog，仍計入 WIP。</p>','html.parser').p
        node.select_one('.visual').insert(0,definition)
    if old_candidate_number(p)==4:
        replace_text(node,'後面每一段都用這個例子；#1 → #3 雙向喜歡才配對 → #2 配對列表','Like＝表示喜歡，Pass＝略過；雙方都 Like 才配對。後面沿 #1 輸入 → #3 判斷 → #2 查看結果。')
        match_title=node.select_one('.match-result strong')
        match_title.string='雙方都 Like 才配對'
        node.select_one('.match-result p').string='配對已建立'
        node.select_one('.match-list-node span').string='查看已配對對象'
    if old_candidate_number(p)==9:
        replace_text(node,'形成 parent Goal / Epic','形成共同目標')
        replace_text(node,'雙方 Like 才 Match','雙方 Like 才配對')
        definition=BeautifulSoup('<p class="r-meta">Brainstorming：共同釐清使用者問題與可能方案，先形成目標，不急著決定實作。</p>','html.parser').p
        node.select_one('.visual').insert(0,definition)
    if old_candidate_number(p)==10:
        replace_text(node,'GOAL / EPIC ISSUE · PARENT','共同目標（Goal）')
        replace_text(node,'不是 workflow state','不是目前進度欄位')
    if old_candidate_number(p)==11:
        replace_text(node,'Goal（parent issue）','共同目標')
        replace_text(node,'IMPLEMENTATION SUB-ISSUE','可獨立交付的工作票')
        replace_text(node,'#3 建立 Match，#2 才能列出已配對對象。','#3 建立配對紀錄，#2 才能列出已配對對象。')
    if old_candidate_number(p)==21:
        replace_text(node,'Goal / Epic｜互相喜歡才算配對成功','共同目標｜互相喜歡才算配對成功')
        replace_text(node,'parent issue · 泳道標題','三張工作票共同目標的泳道')
        replace_text(node,'等待 Refinement','待整理')
        replace_text(node,'Refinement','整理中')
        replace_text(node,'SUB-ISSUE #3','工作票 #3')
        replace_text(node,'BACKLOG','待辦')
        replace_text(node,'Title','標題')
        replace_text(node,'Context / Why','背景／原因')
        replace_text(node,'Goal linkage','對應共同目標')
        replace_text(node,'Acceptance Criteria（AC）','接受條件（AC）')
        replace_text(node,'Out of Scope','本次不做')
        replace_text(node,'Scope','工作範圍')
        replace_text(node,'Required Evidence','需要留下的驗證紀錄')
        replace_text(node,'AC 說明功能怎樣才算做對；DoD 是所有票共用的完工標準；Out-of-scope 是這次不做的事。','工作票整理＝把需求、例子與未決問題整理成可接手的票。AC 說明功能怎樣才算做對；DoD 是所有票共用的完工標準；本次不做的事要明列。')
    if old_candidate_number(p)==99:
        board=node.select_one('.recap-board')
        assert board, 'The preserved rev11 source must still contain its recap board.'
        gate_column=board.select_one(':scope > .human-gate-column')
        assert gate_column, 'The preserved rev11 source must still contain its original Human Gate column.'
        gate_column.decompose()
        parent=board.select_one(':scope > .board-parent')
        append_html(parent,'<span class="human-gate-transition">Product Check → Human Gate（人決定放行／暫停）→ Done</span>')
        replace_text(node,'Human Gate 由產品負責人（人類流程中的 PO／PM 本人）決定，核准後 #3 才進 Done（目前 WIP 回到 0/1）。','Human Gate 是 Product Check 與 Done 之間的人類決策點；產品負責人核對後放行，#3 才進 Done（目前 WIP 回到 0/1）。Gate 不另增看板狀態。')
    if old_candidate_number(p)==22:
        replace_text(node,'三種情境的測試結果；確認雙方看到 Match，且只建立一次。','三種情境的測試結果；預期配對紀錄符合筆數與成員。')
    if p['addedId']=='A13':
        node['data-wip-stage']='workflow'
        append_html(node,'<button class="r-wip-trigger" type="button" data-wip-reveal aria-expanded="false">顯示補驗要求與 B-post 結果 →</button><section class="r-wip-sequence" data-wip-sequence hidden><p class="r-kicker">同一個 B artifact；補驗前後狀態逐項對照</p><div class="r-cols r-cols-2">'+
            panel('補驗要求｜沿用 B 版',para('請用同一個 B 版與原有假資料。','先確認已有一筆 M01，再讓小安重複 Like 一次。','交回補驗前後的筆數、紀錄與結果；不要改規則。'))+
            panel('B-post｜實際補驗紀錄',para(f'補驗前：{b_duplicate["actual"]["before_match_count"]} 筆 M01。',f'補驗後：預期 {b_duplicate["expected"]["match_count"]} 筆；實際 {b_duplicate_actual}。',f'工具結果：<b class="r-green">{b_duplicate["status"]}</b>。','UI／產品串接仍 NOT RUN。'),'good')+
            '</div><p class="r-meta"><a href="../workshop/matching-demo/exercise.md" target="_blank" rel="noopener">開啟 A13 練習與可複製命令 ↗</a>　<a href="../workshop/matching-demo/evidence/B-post-supplement/duplicate.json" target="_blank" rel="noopener">開啟 B-post 重複情境原始結果 ↗</a></p><button type="button" data-wip-return>返回補驗問題</button></section>')
    if p['number']==1:
        cover_copy=node.select_one('.cover-copy')
        assert cover_copy is not None, 'Missing first-page cover content'
        append_html(cover_copy,'<p class="r-desktop-reading-notice">請用電腦版閱讀｜手機版開發中</p>')
    # One canonical learner-facing status name. Goal alignment remains a question
    # performed inside Product Check, not a separate stage.
    for part in list(node.find_all(string=True)):
        if 'Goal Check' in part:
            part.replace_with(str(part).replace('Goal Check','Product Check'))

    if p['number']==26:
        # Refinement is a backlog activity, not an extra canonical Kanban column.
        for part in list(node.find_all(string=True)):
            if 'Refinement' in part:
                part.replace_with(str(part).replace('Refinement','Backlog'))
        node.h1.string='本課示範流程：從 Backlog 到 Done'
        add_note(node,'本課看板共七欄：Backlog、Ready、Dev、Review、QA、Product Check、Done。Refinement 是 Backlog 階段的需求釐清活動；Human Gate 是欄位外的人類放行判斷。團隊實務可選用其他流程。')
    if p['number']==15:
        add_note(node,'本課 WIP 計數政策：從 Dev 到 Product Check 的已開始、未完成票計入，Blocked 仍計入；Ready 不計。這是本課示例政策，不是全業界唯一規則。')
    if p['number']==41:
        criteria=node.select_one('.review-criteria')
        assert criteria and '檢查 code' in criteria.get_text()
        criteria.string='Reviewer 看 code／architecture／maintainability 與範圍；QA 依 AC 驗行為和相關 regression。'
        review=node.select_one('.review-context')
        assert review
        label=BeautifulSoup('<p class="r-scenario-note">PR Review 教學示意：多做聊天室不是 A/B 實測紀錄；下一頁才展示真實規則層 FAIL → PASS。</p>','html.parser').p
        review.insert_before(label)
    if p['number']==52:
        intro=node.select_one('.carried-note.git-callback')
        assert intro
        intro.string='教學假設：#3 規則票可先獨立驗輸入／輸出，並完成本票人工放行與發布檢查才 Done；#1／#2 未開工，端到端串接留下一頁。真實部署 NOT RUN。'
        question=node.select_one('.step-question.step-intro')
        assert question
        question.string='流程推演：假設 #3 完成；整體 Goal 仍未達成。'
        summary=node.select_one('.done-summary p')
        assert summary
        summary.string='條件式示意：#3 可先用假資料驗核心規則；假設完成本票 Review／QA、Human Gate 與整合／上線檢查才關票。#1／#2 仍在 Ready，完整 UI 串接等三票完成。'
        closing=node.select_one('.closed-issue b')
        assert closing
        closing.string='Closed（假設）'
    if p['number']==53:
        for part in list(node.find_all(string=True)):
            if '時間快轉：#1／#2 完成並整合後' in part:
                part.replace_with(str(part).replace('時間快轉：#1／#2 完成並整合後','教學假設：若 #1／#2 已完成並整合後'))
        add_note(node,'這一整條使用者路徑是「若三張票完成之後」的教學示例，不是本次規則層 demo 的真實 UI／整合測試結果；UI／產品串接仍 NOT RUN。')
    if p['number']==91:
        node.h1.string='本課的 Human Gate：依風險選擇 PR／QA 審查配置'
        replace_text(node,'慢速節奏／重要 release 前','配置 A｜人主導 Review／QA')
        replace_text(node,'快速節奏','配置 B｜Agent 協助 Review／QA')
        replace_text(node,'Agent 檢查 PR；人關注 Epic／milestone。','Agent 交回可核對證據；是否另需人工 PR Review，依風險與政策決定。')
        replace_text(node,'選一種 PR 審查節奏','依風險與授權選審查配置')
        # The teaching qualification is kept in the SSOT speaker notes; the slide is already dense.
    if p['number']==93:
        # Keep all seven canonical state cards and all return routes, but
        # move the Human Gate out of the status grid.
        statuses=node.select_one('.recap-columns')
        assert statuses
        gate=statuses.select_one(':scope > .recap-human-gate')
        assert gate
        gate.decompose()
        assert len(statuses.find_all('article',recursive=False))==7
        note=BeautifulSoup('<p class="r-recap-gate-note">Human Gate 是 <strong>Product Check → Done</strong> 之間的人類決策點；等待放行時仍留在 Product Check，不新增看板欄位。</p>','html.parser').p
        statuses.insert_after(note)
        ret=node.select_one('.return-desktop')
        assert ret
        paths=ret.select('path.return-dev-branch, path.return-dev-path, path.return-goal-path')
        assert len(paths)==3
        paths[0]['d']='M500 0 V42 Q500 54 512 54 H571 M642.9 0 V42 Q642.9 54 631 54 H571'
        paths[1]['d']='M571 54 H369 Q357.1 54 357.1 43 V0'
        paths[2]['d']='M785.7 0 V150 Q785.7 162 773.7 162 H83.4 Q71.4 162 71.4 150 V0'
        # The names in SVGs/notes are normalized to Product Check above.
    if p['number']==106:
        add_note(node,'所有欄位只代表本課定義的七個看板狀態；Product Check 判斷是否推進 Goal，Human Gate 是欄外決策；圖中 Done 為教學推演，不能拿規則層 PASS 宣稱 UI／部署已完成。')
        small=node.select_one('.moving-ticket small')
        assert small is not None
        small.string='WIP 1/1｜待人放行'
        controls=BeautifulSoup('<div class="r-gate-controls" role="group" aria-label="Kanban 交付三階段回顧"><span data-gate-message aria-live="polite">1／3｜#3 在 Product Check，WIP 1/1；等待人的放行決定</span><button type="button" data-gate-next>下一步：由人決定放行 →</button><button type="button" data-gate-reset disabled>重頭回顧</button></div>','html.parser').div
        note=node.select_one('.short-note.move-8')
        assert note is not None
        note.insert_before(controls)

    # Learner-facing editorial correctness and prerequisite fixes.
    # The page title and rationale come from the authoritative storyboard.
    assert node.h1
    node.h1.clear()
    node.h1.append(p["title"])
    n=p["number"]
    if n==6:
        note=node.select_one(".r-kicker")
        assert note
        note.string="PO（Product Owner：產品需求）、UI／UX（操作與畫面）、Dev（實作）是職責；Goal 是目標，AC 是驗收約定。"
    if n==7:
        note=node.select_one(".r-kicker")
        assert note
        note.string="Reviewer＝檢查改動；QA＝驗證行為；需求方決定是否接受。這些是責任，不是固定人數。"
        ribbon_node=node.select_one(".r-ribbon")
        assert ribbon_node
        ribbon_node.string="需求方定目標／接受；PO 代表需求方整理需求，PM 在本課泛指規劃／排優先序。可同人擔任，職責不會混成一個 Gate。"
    if n==10:
        wall=node.select(".sticky-wall > .sticky")
        assert len(wall)==4
        for t in list(wall[2].find_all(string=True,recursive=False)):
            if "方案？" in t:t.replace_with(str(t).replace("方案？","候選做法？"))
        wall[2].small.string="提議：雙方 Like 才配對（待確認）"
        node.select_one(".brainstorming-visual > .r-meta").string="Brainstorming 先釐清為誰解決什麼問題，再形成 Goal；方案在後續和 PO／Dev／QA 確認。"
    if n==11:
        replace_text(node,"錯誤配對率＝0（核對錯配紀錄）。","觀測到的錯配事件＝0（須有監測或回報資料）。")
    if n==14:
        replace_text(node,"Parent issue 記錄大需求；sub-issue 拆成能分別處理的子工作。","本課用 parent issue 記共同 Goal；sub-issue 分成可交付工作。這是一種安排，不是每個團隊的硬規則。")
    if n==13:
        ribbon_node=node.select_one(".r-ribbon")
        assert ribbon_node
        ribbon_node.string="規則層＝只測配對判斷及紀錄；不包含 Like 按鈕、配對畫面與整體產品串接。此處 PASS 只能證明規則層。"
    if n==17:
        x=node.select_one(".r-meta")
        assert x
        x.string="寫出可核對範例：業務語言、具體資料、清楚意圖、必要前提、一次聚焦一件事。"
    if n==20:
        x=node.select_one(".r-meta")
        assert x and "等價分割" in x.get_text()
        x.decompose()
    if n==26:
        # The teaching gate compares two questions, not two unrelated job titles.
        # Keep one brief projected annotation, not three large note blocks
        # that shrink the seven-state diagram until learners cannot read it.
        for prior in node.select('.r-revision'):
            prior.decompose()
        add_note(node,'Product Check 核對是否推進 Goal（實作問題回 Dev；需求問題回 Backlog）；Human Gate 決定現在可否發布。兩者可同人負責，Gate 不設看板欄。已開工票退回仍計 WIP。')
        for term in list(node.find_all(string=True)):
            if str(term).strip()=='已上線':term.replace_with('放行且檢查')
    if n==28:
        x=node.select_one(".r-kicker")
        assert x
        x.string="本課 WIP 政策：開始且未完成的票才計入；上限由團隊決定。"
    if n==33:
        replace_text(node,"共享資料夾＋審查室","託管 Git 歷史、PR 與協作討論")
    if n==40:
        note=node.select_one('.r-meta')
        assert note
        note.string='CI（Continuous Integration，持續整合）＝依 PR 設定自動重跑檢查；此頁是審查流程示意，不聲稱已搭建真實 CI。'
    if n==62:
        kicker_note=node.select_one('.r-kicker')
        assert kicker_note
        kicker_note.string='對話壓縮（Compact）：長對話整理成摘要後，仍需回到工作票核對完整規則。'
    if n==57:
        replace_text(node,"CHAT｜一問一答","手動 Chat｜逐輪追問")
        replace_text(node,"AGENT｜朝目標工作","Agent 工作方式｜循環執行")
    if n==68:
        replace_text(node,"模型依任務選用：規則判斷用推理較強的模型；畫面樣板用較輕的模型。","模型可依任務、風險、成本與驗證結果調整；此處只是分工示例，不是固定配置。")
    if n in (71,76,81):
        for t in list(node.find_all(string=True)):
            if "SHIFT" in t:t.replace_with(str(t).replace("SHIFT","目標漂移"))
    if n in (69,70):
        citation=node.select_one(".draft-source")
        assert citation
        citation.insert(0,"配對 App 情境為教材改編，非研究原案例｜")
    if n==74:
        x=node.select_one(".term-note")
        assert x
        x.string="model：選擇使用的 AI 模型。effort：產品提供的推理強度／資源設定，延遲、成本與結果可能不同；支援方式依模型而異。"
    if n==77:
        replace_text(node,"Chat-driven｜靠對話推進","只靠 Chat 紀錄工作")
    if n==78:
        replace_text(node,"WIP=1","本課 WIP 上限 1")
    if n==80:
        add_note(node,"另一隻 Agent 不代表已獨立驗證：先由原 AC 確定預期，再核對特定版本與原始結果；人也可以獨立核驗。")
    if n==85:
        replace_text(node,"現在：PM Agent＋PO Agent｜#3 雙向喜歡才配對","現在：Agent 協助規劃職能｜#3 雙向喜歡才配對")
        tasks=node.select(".agent-responsibilities span")
        assert len(tasks)==2
        tasks[0].b.string="理解問題"
        tasks[1].b.string="整理規格"
        node.select_one(".brainstorm-agent p").append("（同一 Agent 可協助兩種職能。）")
    if n==86:
        replace_text(node,"把確認結果整理成票與 GWT。","把確認結果整理成票與 Given–When–Then（GWT）。")
    if n==87:
        # Give the assignment to copy/edit before showing any technical paths.
        cards_start=node.select_one('.r-cols')
        assert cards_start
        instruction=BeautifulSoup('<p class="r-assignment-line">交辦示例：請依 #3 的 AC 驗證 B 候選規則，交回預期／實際結果與未測事項；若材料不足或超出範圍，先停止詢問，不能自行發布。</p>','html.parser').p
        cards_start.insert_before(instruction)
        # Novices answer from expected/actual; engineering execution is opt-in.
        handout_cards=node.select(".r-cols > .r-card")
        assert len(handout_cards)==2
        first=handout_cards[0].select_one(".r-body")
        second=handout_cards[1].select_one(".r-body")
        assert first and second
        paths=list(first.find_all("p",recursive=False))
        assert len(paths)==4
        raw=BeautifulSoup('<details class="r-tech-reveal"><summary>進階：查看本次實際檔案路徑</summary></details>','html.parser').details
        for entry in paths:raw.append(entry.extract())
        first.append(BeautifulSoup('<p>交辦時要附上工作票、候選版本、測試資料、驗證入口；不用背檔案路徑。</p>','html.parser').p)
        first.append(raw)
        cmdp=next((x for x in second.find_all("p",recursive=False) if x.select_one("code")),None)
        assert cmdp
        cmdp.extract()
        more=BeautifulSoup('<details class="r-tech-reveal"><summary>進階：展開並複製實測命令</summary></details>','html.parser').details
        more.append(cmdp)
        second.insert(0,BeautifulSoup('<p>非工程師先看：預期什麼、實際什麼、還有哪些 NOT RUN；命令可由講師或 Agent 執行。</p>','html.parser').p)
        second.append(more)
        node.select_one(".r-kicker").string="非工程師也能交辦：說明目標、AC、證據與停止條件；Python 是進階選項。"
    if n==90:
        node.select_one(".r-kicker").string="時間倒回 B-pre：先根據交接卡自己寫補驗指令，再逐項揭露參考答案及 B-post 證據。"
        reviewcards=node.select(".r-cols > .r-card")
        assert len(reviewcards)==3
        for i,card in enumerate(reviewcards[1:],1):
            body=card.select_one(".r-body")
            assert body
            details=BeautifulSoup('<details class="r-tech-reveal"><summary>完成自己的回答後，點此揭露</summary></details>','html.parser').details
            for child in list(body.contents):
                details.append(child.extract())
            body.append(details)
            title=card.select_one("h2")
            assert title
            title.string="參考補驗指令（先作答）" if i==1 else "B-post 結果（先推測）"
    if n==64:
        ribbon=node.select_one(".r-ribbon")
        assert ribbon
        ribbon.string="一人＋一 Agent 的完整交付示例：Agent 交 B-pre（單向／雙向 PASS，重複 NOT RUN）→ 人依 AC 退回補驗 → 接手 Agent 用同一 B 版補測 duplicate PASS（B-post）→ 人核對版本與證據；UI／產品整合仍 NOT RUN，不准自行 Merge／發布。接著才討論何時值得增加 Agent。"
    if n==92:
        replace_text(node,"另一個實際案例｜v7 簡報首版發布 PR #43","實際教材改版案例｜未經最終確認就發布")
        replace_text(node,"PR #43 合併，v7 簡報上線","教材首版先合併並發布")
        replace_text(node,"Owner 看過首版後指出問題","發布後需求方才指出說明錯誤")
        replace_text(node,"Owner 看過 v7 上線版後才指出問題。","需求方在發布後才指出問題。")
        source=node.select_one(".draft-source")
        assert source
        replace_text(node,"上線前未攔下「把 AC 當成成效」的錯誤說明；需求方在發布後才指出問題。","發布後才發現誤把 AC 當成成效；Human Gate 能提供核對機會，但不保證一定攔得住所有錯誤。")
        source.string="真實教材的發布復盤；PR 編號、合併 SHA 與完整來源保留在講者筆記。"
    if n==93:
        replace_text(node,"Product Check 退回 Backlog／Refinement","Product Check 需求問題退回 Backlog；實作問題回 Dev")
    if n==94:
        node.select_one(".r-kicker").string="從活動報名、課程作業、行銷素材審核、行政申請或小工具，選一件真正熟悉的工作。"
    if n==105:
        mapping={
            "1｜Goal / Governance":"1｜Goal / Governance（目標決策）",
            "2｜Planning / Backlog":"2｜Planning / Backlog（拆票）",
            "3｜Task Graph / Kanban":"3｜Task Graph / Kanban（看板）",
            "4｜Orchestrator":"4｜Orchestrator（安排接手）",
            "5｜Execution Runtime":"5｜Execution Runtime（實際執行）",
            "6｜Review / QA / Human":"6｜Review / QA / Human（審查與人放行）",
        }
        for before,after in mapping.items():replace_text(node,before,after)
    # Goal outcomes are measurable only with a real observation mechanism:
    # observed=0 must not imply all incidents were impossible.
    for t in list(node.find_all(string=True)):
        x=str(t)
        if "錯誤配對率" in x:
            x=x.replace("錯誤配對率維持 0","觀測到的錯配事件維持 0")
            x=x.replace("錯誤配對率為 0","觀測到的錯配事件為 0")
            x=x.replace("錯誤配對率＝0","觀測到的錯配事件＝0")
            if x!=str(t):t.replace_with(x)

    node['data-section']=p['chapter'];node['data-page']=str(p['number']);node['data-source']=' '.join(p['ids']);node['id']=f'page-{p["number"]}'
    if p['addedId']:node['data-added-id']=p['addedId']
    if p['oldRev11Page']==7:node['data-process-stage']='0'
    if p['oldRev11Page']==56:node['data-wip-stage']='workflow'
    if node.select_one('.cover-mark'):node.select_one('.cover-mark').decompose()
    if node.select_one('.cover-kicker'):node.select_one('.cover-kicker').string=chapter_labels[p['chapter']]
    out.append(str(node))
    p['notes']=cards[p['number']].replace('新標題為提案，未修改 HTML。','本草稿採用此標題。')
    manifest.append(p)
assert sorted(p['oldRev11Page'] for p in manifest if p['oldRev11Page'] is not None)==list(range(1,83))
assert sorted(p['rev10SourcePage'] for p in manifest if p['rev10SourcePage'] is not None)==list(range(1,56))
assert sorted(p['addedId'] for p in manifest if p['addedId'])==[f'A{i:02}' for i in range(1,26)]

source=storyboard_source
ssot_sha=hashlib.sha256(source.encode()).hexdigest()
data=json.dumps(manifest,ensure_ascii=False).replace('<','\\u003c')
page_count=len(manifest);mainline_count=sum(p['chapter']!='APP' for p in manifest);appendix_start=chapter_starts['APP']
draft_html='''<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"><title>Agent 101｜rev12 候選 107 頁</title><link rel="stylesheet" href="rev11-base.css"><link rel="stylesheet" href="rev10.css"><link rel="stylesheet" href="rev11.css"><link rel="stylesheet" href="rev12.css"></head><body class="rev10-draft rev11-draft rev12-draft" data-review-mode="full"><main class="deck"><header class="topbar"><div class="brand">Agent 101 <span class="draft-badge">rev12 · 107 頁候選</span></div><nav class="section-rail" aria-label="簡報章節">'''+rail+'''</nav><div class="counter"><span id="current">1</span> / <span id="total">'''+str(page_count)+'''</span></div></header><div class="slides">'''+''.join(out)+'''</div><footer class="controls"><button id="prev" type="button">← 上一頁</button><div class="r-toolbar"><button id="contents" type="button">目錄</button><button id="notes" type="button">講者筆記</button><div class="progress-track" aria-hidden="true"><div id="progress"></div></div><a id="compare-link" target="_blank" rel="noopener">對照 rev10 ↗</a></div><button id="next" type="button">下一頁 →</button></footer></main><dialog id="review-dialog"><div class="r-dialog-head"><h2 id="dialog-title"></h2><button id="close-dialog" type="button">關閉</button></div><div id="dialog-body"></div></dialog><script id="deck-data" type="application/json">'''+data+'''</script><script src="rev12.js"></script></body></html>'''
release_html=draft_html
for asset in ['rev11-base.css','rev10.css','rev11.css','rev12.css']:
    release_html=release_html.replace(f'href="{asset}"',f'href="../drafts/{asset}"')
release_html=release_html.replace('src="rev12.js"','src="../drafts/rev12.js"')
(ROOT/'drafts/rev12.html').write_text(draft_html)
(ROOT/'slides/index.html').write_text(release_html)
review_dir=ROOT/'drafts/rev12-review';review_dir.mkdir(parents=True,exist_ok=True)
(review_dir/'manifest.json').write_text(json.dumps({'ssot':'docs/issue48-execution-storyboard.md','ssotSha256':ssot_sha,'baseline':{'path':'slides/rev11.html','pages':82,'sha256':baseline_sha},'deck':{'title':'Agent 101','revision':'rev12 candidate','pageCount':page_count,'mainlinePageCount':mainline_count,'appendixStartsAt':appendix_start,'chapterOrder':chapter_order},'demo':{'versionA':hash_a,'versionB':hash_b,'evidenceRoot':'workshop/matching-demo/evidence/','uiAndProductIntegration':'NOT RUN'},'pages':manifest},ensure_ascii=False,indent=2))
print(f'Built {page_count} candidate pages: {sum(p["oldRev11Page"] is not None for p in manifest)} preserved rev11 pages, {sum(p["addedId"] is not None for p in manifest)} added A-pages. Baseline: slides/rev11.html ({baseline_sha}).')
