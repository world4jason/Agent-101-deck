// Render every authored page; record clipping candidates and navigation evidence.
const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'drafts/rev11-review');
const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
fs.mkdirSync(path.join(out,'pages'),{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.BROWSER_CHANNEL?{channel:process.env.BROWSER_CHANNEL}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const results={deckURL:process.env.DECK_URL || 'http://127.0.0.1:4318/slides/rev11.html',timestamp:new Date().toISOString(),ssotSha256:manifest.ssotSha256,errors:[],pages:[],navigation:{}};
 page.on('pageerror',e=>results.errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)results.errors.push(`${r.status()} ${r.url()}`)});
 await page.goto(process.env.DECK_URL || 'http://127.0.0.1:4318/slides/rev11.html');await page.evaluate(()=>document.fonts.ready);
 for(let n=1;n<=82;n++){
  await page.evaluate(n=>{location.hash='#'+n},n);
  await page.waitForFunction(n=>document.querySelector('.slide.active')?.dataset.page===String(n),n);
  // Disable transition timing while inspecting the complete page, not fragment animation.
  await page.addStyleTag({content:'.fragment{transition:none!important;animation:none!important}'});
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
  await page.screenshot({path:path.join(out,'pages',String(n).padStart(2,'0')+'.png')});
  results.pages.push({number:n,...stats});
 }
 await page.keyboard.press('Home');results.navigation.home=await page.locator('#current').innerText();
 await page.keyboard.press('ArrowRight');results.navigation.right=await page.locator('#current').innerText();
 await page.keyboard.press('ArrowLeft');results.navigation.left=await page.locator('#current').innerText();
 await page.getByRole('button',{name:'目錄',exact:true}).click();results.navigation.tocEntries=await page.locator('#dialog-body a').count();
 await page.locator('#dialog-body a[href="#67"]').click();results.navigation.tocJump=await page.locator('#current').innerText();
 await page.getByRole('button',{name:'講者筆記',exact:true}).click();results.navigation.notes=await page.locator('#dialog-body').innerText();await page.keyboard.press('Escape');
 await page.keyboard.press('End');results.navigation.end=await page.locator('#current').innerText();results.navigation.lastDisabled=await page.locator('#next').isDisabled();
 await page.setViewportSize({width:1920,height:1080});await page.evaluate(()=>location.hash='#67');await page.waitForFunction(()=>document.querySelector('#current').textContent==='67');
 results.largeViewport=await page.locator('.deck').boundingBox();await page.screenshot({path:path.join(out,'large-67.png')});
 fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify(results,null,2));
 const escaped=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 fs.writeFileSync(path.join(out,'index.html'),'<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><title>82頁版面總覽</title><style>body{background:#0b1119;color:#f3f6fa;font:16px system-ui;margin:30px}main{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}a{color:#c8e2ff;text-decoration:none}img{width:100%;border:1px solid #34475b}p{margin:8px 0;line-height:1.5}</style><h1>82頁草稿｜版面總覽</h1><p><a href="../rev11.html">開啟完整投影片 →</a>　點縮圖跳到對應頁</p><main>'+results.pages.map(p=>`<a href="../rev11.html#${p.number}"><img loading="lazy" src="pages/${String(p.number).padStart(2,'0')}.png" alt="第${p.number}頁"><p>${p.number}｜${escaped(p.title)}</p></a>`).join('')+'</main></html>');
 console.log(JSON.stringify({pages:results.pages.length,errors:results.errors,overflow:results.pages.filter(p=>p.candidates.length||p.scrollHeight>p.clientHeight+3).map(({number,candidates,scrollHeight,clientHeight})=>({number,candidates,scrollHeight,clientHeight})),navigation:{...results.navigation,notes:results.navigation.notes.slice(0,80)},largeViewport:results.largeViewport},null,2));
 if(results.errors.length || results.pages.length!==82 || results.pages.some(p=>p.candidates.some(c=>c.kind==='outside') || p.scrollHeight>p.clientHeight+3) || results.navigation.home!=='1' || results.navigation.right!=='2' || results.navigation.left!=='1' || results.navigation.tocEntries!==82 || results.navigation.tocJump!=='67' || results.navigation.end!=='82' || !results.navigation.lastDisabled) process.exitCode=1;
 await browser.close();
})().catch(e=>{console.error(e);process.exitCode=1});
