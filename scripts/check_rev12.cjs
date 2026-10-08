// Render every authored page; record clipping candidates and navigation evidence.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'drafts/rev12-review');
const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
const processPage=manifest.pages.find(page=>page.sourceIds.includes('P06'))?.number;
if(!processPage)throw new Error('P06 process page is missing from the candidate manifest');
fs.mkdirSync(path.join(out,'pages'),{recursive:true});
let browser;
(async()=>{
 browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const results={deckURL:process.env.DECK_URL || 'http://127.0.0.1:4318/slides/',timestamp:new Date().toISOString(),ssotSha256:manifest.ssotSha256,errors:[],pages:[],navigation:{},interactions:{}};
 page.on('pageerror',e=>results.errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)results.errors.push(`${r.status()} ${r.url()}`)});
 await page.goto(process.env.DECK_URL || 'http://127.0.0.1:4318/slides/');await page.evaluate(()=>document.fonts.ready);
 results.navigation.chapterOrder=await page.locator('.section-rail [data-rail]').evaluateAll(links=>links.map(link=>link.dataset.rail));
 await page.addStyleTag({content:'.fragment{transition:none!important;animation:none!important}'});
 for(let n=1;n<=99;n++){
  await page.evaluate(n=>{location.hash='#'+n},n);
  await page.waitForFunction(n=>document.querySelector('.slide.active')?.dataset.page===String(n),n);
  // Disable transition timing while inspecting the complete page, not fragment animation.
  const stats=await page.locator('.slide.active').evaluate(el=>{
   const outer=el.getBoundingClientRect();const candidates=[];
   for(const node of el.querySelectorAll('h1,h2,h3,p,article,table,svg,pre,.r-body,.r-card')){
    const r=node.getBoundingClientRect(),style=getComputedStyle(node);
    if(!r.width||!r.height||style.visibility==='hidden'||Number(style.opacity)===0||r.width<3||r.height<3)continue;
    if(r.top<outer.top-2||r.bottom>outer.bottom+2||r.left<outer.left-2||r.right>outer.right+2)candidates.push({kind:'outside',tag:node.tagName,cls:node.className?.baseVal??node.className,text:node.textContent.trim().slice(0,100),rect:{x:r.x,y:r.y,w:r.width,h:r.height}});
    if(node.namespaceURI!=='http://www.w3.org/2000/svg'&&node.clientWidth>0&&node.scrollWidth>node.clientWidth+3)candidates.push({kind:'horizontal',tag:node.tagName,cls:node.className,text:node.textContent.trim().slice(0,100),client:node.clientWidth,scroll:node.scrollWidth});
   }
   return {title:el.querySelector('h1')?.textContent,text:el.innerText,scrollHeight:el.scrollHeight,clientHeight:el.clientHeight,candidates};
  });
  if([6,8,84].includes(n))stats.contentLayout=await page.locator('.slide.active').evaluate(el=>{
   const heading=el.querySelector('h1')?.getBoundingClientRect();
   const content=el.querySelector(':scope > .r-content');
   const children=content?[...content.children].filter(node=>node.getBoundingClientRect().height>0):[];
   const first=children[0]?.getBoundingClientRect(),last=children.at(-1)?.getBoundingClientRect();
   return {headingBottom:heading?.bottom,firstContentTop:first?.top,lastContentBottom:last?.bottom,footerTop:document.querySelector('.controls').getBoundingClientRect().top};
  });
  await page.screenshot({path:path.join(out,'pages',String(n).padStart(2,'0')+'.png')});
  results.pages.push({number:n,...stats});
 }
 await page.evaluate(()=>location.hash='#99');await page.waitForFunction(()=>document.querySelector('#current').textContent==='99');
 const gateStage=async stage=>{
  await page.locator('.slide.active').evaluate((slide,stage)=>slide.querySelectorAll('.fragment').forEach(node=>{
   const step=Number([...node.classList].map(name=>/^move-(\d+)$/.exec(name)?.[1]).find(Boolean));
   node.classList.toggle('visible',Number.isFinite(step)&&step<=stage);
  }),stage);
  return page.locator('.slide.active').evaluate(slide=>{
   const board=slide.querySelector('.recap-board'),ticket=board.querySelector('.moving-ticket');
   const marker=board.querySelector('.human-gate-transition');
   const column=label=>[...board.querySelectorAll(':scope > div:not(.board-parent)')].find(node=>node.querySelector(':scope > h3')?.textContent.trim()===label);
   return {
    statusLabels:[...board.querySelectorAll(':scope > div:not(.board-parent) > h3')].map(node=>node.textContent.trim()),
    gateColumnCount:board.querySelectorAll(':scope > .human-gate-column').length,
    ticketGridColumn:getComputedStyle(ticket).gridColumnStart,
    gateColor:getComputedStyle(marker).color,
    productCheckBorder:getComputedStyle(column('Product Check')).borderTopColor,
    doneBorder:getComputedStyle(column('Done')).borderTopColor,
    finalNoteVisible:getComputedStyle(slide.querySelector('.move-8')).opacity==='1'
   };
  });
 };
 results.interactions.humanGatePending=await gateStage(6);
 await page.screenshot({path:path.join(out,'human-gate-pending.png')});
 results.interactions.humanGateReleased=await gateStage(7);
 await page.screenshot({path:path.join(out,'human-gate-released.png')});
 results.interactions.humanGateComplete=await gateStage(8);
 const reviewPages=[...new Set([3,4,5,6,7,8,9,10,11,12,13,14,15,20,21,22,23,24,25,26,33,34,35,36,37,38,39,40,41,42,43,44,45,46,52,53,54,55,56,57,58,59,60,80,81,82,83,84,85,98,99])].sort((a,b)=>a-b);
 fs.mkdirSync(path.join(out,'pages','projection'),{recursive:true});
 fs.mkdirSync(path.join(out,'pages','mobile'),{recursive:true});
 results.projectionScreenshots=[];
 await page.setViewportSize({width:1920,height:1080});
 for(const n of reviewPages){
  await page.evaluate(n=>{location.hash='#'+n},n);
  await page.waitForFunction(n=>document.querySelector('.slide.active')?.dataset.page===String(n),n);
  await page.screenshot({path:path.join(out,'pages','projection',String(n).padStart(2,'0')+'.png')});
  results.projectionScreenshots.push(n);
 }
 results.mobileScreenshots=[];
 await page.setViewportSize({width:390,height:844});
 for(const n of reviewPages){
  await page.evaluate(n=>{location.hash='#'+n},n);
  await page.waitForFunction(n=>document.querySelector('.slide.active')?.dataset.page===String(n),n);
  await page.screenshot({path:path.join(out,'pages','mobile',String(n).padStart(2,'0')+'.png')});
  results.mobileScreenshots.push(n);
 }
 await page.setViewportSize({width:1440,height:900});
 await page.keyboard.press('Home');results.navigation.home=await page.locator('#current').innerText();
 await page.keyboard.press('ArrowRight');results.navigation.right=await page.locator('#current').innerText();
 await page.keyboard.press('ArrowLeft');results.navigation.left=await page.locator('#current').innerText();
 await page.getByRole('button',{name:'目錄',exact:true}).click();results.navigation.tocEntries=await page.locator('#dialog-body a').count();
 await page.locator('#dialog-body a[href="#53"]').click();results.navigation.tocJump=await page.locator('#current').innerText();
 await page.getByRole('button',{name:'講者筆記',exact:true}).click();results.navigation.notes=await page.locator('#dialog-body').innerText();results.navigation.noteLinks=await page.locator('.r-note-links a').evaluateAll(links=>links.map(link=>link.getAttribute('href')));await page.keyboard.press('Escape');
 await page.keyboard.press('End');results.navigation.end=await page.locator('#current').innerText();results.navigation.lastDisabled=await page.locator('#next').isDisabled();
 await page.setViewportSize({width:1920,height:1080});await page.evaluate(()=>location.hash='#53');await page.waitForFunction(()=>document.querySelector('#current').textContent==='53');
 results.largeViewport=await page.locator('.deck').boundingBox();await page.screenshot({path:path.join(out,'large-53.png')});
 await page.setViewportSize({width:1440,height:900});
 await page.evaluate(n=>location.hash='#'+n,processPage);await page.waitForFunction(n=>document.querySelector('#current').textContent===String(n),processPage);
 const processState=()=>page.locator('.slide.active').evaluate(el=>({
  stage:Number(el.dataset.processStage),
  visibleLanes:[...el.querySelectorAll('.flow-lane')].filter(node=>getComputedStyle(node).display!=='none'&&getComputedStyle(node).visibility!=='hidden').length,
  visibleReturns:[...el.querySelectorAll('.flow-reject,.flow-reanchor')].filter(node=>getComputedStyle(node).display!=='none'&&getComputedStyle(node).visibility!=='hidden'&&Number(getComputedStyle(node).opacity)>0).length,
  stepText:el.querySelector('[data-process-note]')?.textContent,
 }));
 results.interactions.process=[await processState()];
 await page.screenshot({path:path.join(out,'process-stage-1.png')});
 await page.locator('[data-process-next]').click();results.interactions.process.push(await processState());
 await page.waitForFunction(()=>[...document.querySelectorAll('.slide.active .flow-reject')].some(node=>getComputedStyle(node).opacity==='1'));
 results.interactions.process[1]=await processState();
 await page.screenshot({path:path.join(out,'process-stage-2.png')});
 await page.locator('[data-process-next]').click();results.interactions.process.push(await processState());
 await page.waitForFunction(()=>[...document.querySelectorAll('.slide.active .fragment')].every(node=>getComputedStyle(node).opacity==='1'));
 results.interactions.process[2]=await processState();
 await page.screenshot({path:path.join(out,'process-stage-3.png')});
 results.interactions.processButtonDisabled=await page.locator('[data-process-next]').isDisabled();
 await page.evaluate(()=>location.hash='#68');await page.waitForFunction(()=>document.querySelector('#current').textContent==='68');
 results.interactions.wipBefore=await page.locator('.slide.active').evaluate(el=>({stage:el.dataset.wipStage,chart:getComputedStyle(el.querySelector('.visual')).display,comparison:el.querySelector('[data-wip-sequence]').hidden}));
 await page.screenshot({path:path.join(out,'wip-workflow.png')});
 await page.locator('.slide.active [data-wip-reveal]').click();
 results.interactions.wipComparison=await page.locator('.slide.active').evaluate(el=>({stage:el.dataset.wipStage,chart:getComputedStyle(el.querySelector('.visual')).display,comparison:el.querySelector('[data-wip-sequence]').hidden,labels:[...el.querySelectorAll('.r-wip-sequence .r-card h2')].map(node=>node.textContent),text:el.querySelector('[data-wip-sequence]').innerText}));
 await page.screenshot({path:path.join(out,'wip-comparison.png')});
 await page.locator('.slide.active [data-wip-return]').click();
 results.interactions.wipReturn=await page.locator('.slide.active').evaluate(el=>({stage:el.dataset.wipStage,chart:getComputedStyle(el.querySelector('.visual')).display,comparison:el.querySelector('[data-wip-sequence]').hidden,expanded:el.querySelector('[data-wip-reveal]').getAttribute('aria-expanded')}));
 await page.evaluate(()=>location.hash='#83');await page.waitForFunction(()=>document.querySelector('#current').textContent==='83');
 results.interactions.a13Before=await page.locator('.slide.active').evaluate(el=>({
  text:el.querySelector('.r-content').innerText,
  questionDisplay:getComputedStyle(el.querySelector('.r-content')).display,
  sequenceHidden:el.querySelector('[data-wip-sequence]').hidden,
  expanded:el.querySelector('[data-wip-reveal]').getAttribute('aria-expanded')
 }));
 await page.screenshot({path:path.join(out,'a13-before.png')});
 await page.locator('.slide.active [data-wip-reveal]').click();
 results.interactions.a13After=await page.locator('.slide.active').evaluate(el=>({
 text:el.querySelector('[data-wip-sequence]').innerText,
 links:[...el.querySelectorAll('[data-wip-sequence] a')].map(link=>link.getAttribute('href')),
  questionDisplay:getComputedStyle(el.querySelector('.r-content')).display,
  sequenceHidden:el.querySelector('[data-wip-sequence]').hidden,
  expanded:el.querySelector('[data-wip-reveal]').getAttribute('aria-expanded')
 }));
 await page.screenshot({path:path.join(out,'a13-after.png')});
 results.interactions.a13Font=await page.locator('.slide.active [data-wip-sequence] .r-body').evaluateAll(nodes=>Math.min(...nodes.map(node=>Number.parseFloat(getComputedStyle(node).fontSize))));
 await page.setViewportSize({width:390,height:844});
 results.interactions.a13Mobile=await page.locator('.slide.active').evaluate(el=>({
  questionDisplay:getComputedStyle(el.querySelector('.r-content')).display,
  sequenceHidden:el.querySelector('[data-wip-sequence]').hidden,
  minBodyFont:Math.min(...[...el.querySelectorAll('[data-wip-sequence] .r-body')].map(node=>Number.parseFloat(getComputedStyle(node).fontSize))),
  slideHeight:el.scrollHeight,
  viewportHeight:el.clientHeight
 }));
 await page.screenshot({path:path.join(out,'a13-after-mobile.png')});
 await page.setViewportSize({width:1440,height:900});
 await page.emulateMedia({media:'print'});
 results.interactions.a13Print=await page.locator('.slide.active').evaluate(el=>({
  questionDisplay:getComputedStyle(el.querySelector('.r-content')).display,
  answerDisplay:getComputedStyle(el.querySelector('[data-wip-sequence]')).display
 }));
 await page.emulateMedia({media:'screen'});
 await page.locator('.slide.active [data-wip-return]').click();
 results.interactions.a13Return=await page.locator('.slide.active').evaluate(el=>({
  sequenceHidden:el.querySelector('[data-wip-sequence]').hidden,
  expanded:el.querySelector('[data-wip-reveal]').getAttribute('aria-expanded'),
  triggerFocused:document.activeElement===el.querySelector('[data-wip-reveal]')
 }));
 await page.screenshot({path:path.join(out,'a13-return.png')});
 await page.evaluate(()=>location.hash='#84');await page.waitForFunction(()=>document.querySelector('#current').textContent==='84');
 results.interactions.a14Font=await page.locator('.slide.active .r-card .r-body').first().evaluate(node=>Number.parseFloat(getComputedStyle(node).fontSize));
 fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(results,null,2));
 const escaped=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 fs.writeFileSync(path.join(out,'index.html'),'<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><title>99頁版面總覽</title><style>body{background:#0b1119;color:#f3f6fa;font:16px system-ui;margin:30px}main{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}a{color:#c8e2ff;text-decoration:none}img{width:100%;border:1px solid #34475b}p{margin:8px 0;line-height:1.5}</style><h1>rev12 候選｜99頁版面總覽</h1><p><a href="../rev12.html">開啟完整投影片 →</a>　點縮圖跳到對應頁</p><main>'+results.pages.map(p=>`<a href="../rev12.html#${p.number}"><img loading="lazy" src="pages/${String(p.number).padStart(2,'0')}.png" alt="第${p.number}頁"><p>${p.number}｜${escaped(p.title)}</p></a>`).join('')+'</main></html>');
 const layoutIssues=results.pages.filter(p=>p.contentLayout&&(p.contentLayout.firstContentTop<p.contentLayout.headingBottom+8||p.contentLayout.lastContentBottom>p.contentLayout.footerTop-4));
 console.log(JSON.stringify({pages:results.pages.length,errors:results.errors,overflow:results.pages.filter(p=>p.candidates.length||p.scrollHeight>p.clientHeight+3).map(({number,candidates,scrollHeight,clientHeight})=>({number,candidates,scrollHeight,clientHeight})),layoutIssues:layoutIssues.map(p=>({number:p.number,...p.contentLayout})),interactions:results.interactions,navigation:{...results.navigation,notes:results.navigation.notes.slice(0,80)},largeViewport:results.largeViewport},null,2));
 const hasPlanLink=results.navigation.noteLinks.some(link=>link.endsWith('/workshop/matching-demo/evidence/A09-replay/plan-before-execution.md'));
 const hasCommentLink=results.navigation.noteLinks.some(link=>link.includes('issuecomment-6052541648'));
 const processStates=results.interactions.process;
 const processSequence=processStates.length===3&&processStates[0].stage===0&&processStates[0].visibleLanes===1&&processStates[0].visibleReturns===0&&processStates[1].stage===1&&processStates[1].visibleLanes===1&&processStates[1].visibleReturns>0&&processStates[2].stage===2&&processStates[2].visibleLanes===3&&processStates[2].visibleReturns>0;
 const a13Before=results.interactions.a13Before, a13After=results.interactions.a13After, a13Print=results.interactions.a13Print, a13Mobile=results.interactions.a13Mobile, a13Font=results.interactions.a13Font, a13Return=results.interactions.a13Return;
 const a13Sequence=a13Before?.sequenceHidden===true&&a13Before?.expanded==='false'&&a13Before?.questionDisplay!=='none'&&a13Before?.text.includes('B-pre')&&!a13Before?.text.includes('補驗後')&&a13After?.sequenceHidden===false&&a13After?.expanded==='true'&&a13After?.questionDisplay==='none'&&a13After?.text.includes('同一個 B 版')&&a13After?.text.includes('不要改規則')&&a13After?.text.includes('B-post')&&a13After?.text.includes('PASS')&&!a13After?.text.includes('--artifact')&&a13After?.text.includes('NOT RUN')&&a13After?.links?.some(link=>link.includes('matching-demo/exercise.md'))&&a13Print?.questionDisplay!=='none'&&a13Print?.answerDisplay==='none'&&a13Mobile?.questionDisplay==='none'&&a13Mobile?.sequenceHidden===false&&a13Mobile?.minBodyFont>=16&&a13Font>=18&&a13Return?.sequenceHidden===true&&a13Return?.expanded==='false'&&a13Return?.triggerFocused;
 const wipLabels=results.interactions.wipComparison?.labels?.join('|')||'';
 const wipSequence=results.interactions.wipBefore?.chart!=='none'&&results.interactions.wipBefore?.comparison===true&&results.interactions.wipComparison?.chart==='none'&&results.interactions.wipComparison?.comparison===false&&wipLabels.includes('1 Agent × WIP 2')&&wipLabels.includes('多 Agent × WIP 1')&&results.interactions.wipReturn?.stage==='workflow'&&results.interactions.wipReturn?.chart!=='none'&&results.interactions.wipReturn?.comparison===true&&results.interactions.wipReturn?.expanded==='false';
 const gatePending=results.interactions.humanGatePending,gateReleased=results.interactions.humanGateReleased,gateComplete=results.interactions.humanGateComplete;
 const gateSequence=gatePending?.statusLabels?.join('|')==='Backlog|Ready|Dev|Review|QA|Product Check|Done'&&gatePending?.gateColumnCount===0&&gatePending?.ticketGridColumn==='6'&&gatePending?.gateColor==='rgb(242, 207, 118)'&&gatePending?.productCheckBorder==='rgb(131, 188, 255)'&&gatePending?.doneBorder==='rgb(43, 58, 76)'&&gatePending?.finalNoteVisible===false&&gateReleased?.ticketGridColumn==='7'&&gateReleased?.gateColor==='rgb(131, 221, 167)'&&gateReleased?.productCheckBorder==='rgb(43, 58, 76)'&&gateReleased?.doneBorder==='rgb(131, 188, 255)'&&gateReleased?.finalNoteVisible===false&&gateComplete?.finalNoteVisible===true;
 if(results.errors.length || results.pages.length!==99 || results.pages.some(p=>p.candidates.some(c=>c.kind==='outside') || p.scrollHeight>p.clientHeight+3) || layoutIssues.length || results.interactions.a14Font<24 || results.navigation.home!=='1' || results.navigation.right!=='2' || results.navigation.left!=='1' || results.navigation.tocEntries!==99 || results.navigation.tocJump!=='53' || results.navigation.end!=='99' || !results.navigation.lastDisabled || results.navigation.chapterOrder.join(',')!=='C0,C2,C1,C3,C4,C5,C6,APP' || !results.navigation.notes.includes('執行前計畫') || !hasPlanLink || !hasCommentLink || !processSequence || !results.interactions.processButtonDisabled || !wipSequence || !a13Sequence || !gateSequence || results.projectionScreenshots.length!==reviewPages.length || results.mobileScreenshots.length!==reviewPages.length) process.exitCode=1;
 await browser.close();
})().catch(async e=>{console.error(e);if(browser)await browser.close();process.exitCode=1});
