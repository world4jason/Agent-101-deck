/**
 * Reproducible PowerPoint export from the current website HTML.
 * Slides become full-frame static images, without the web player controls.
 * Additional presenter material (and hidden Exit Check answers) goes to Notes.
 *
 * npm run export:pptx
 * node scripts/export_pptx.cjs --version=current
 * node scripts/export_pptx.cjs --version=all --max-pages=2
 */
'use strict';
const fs=require('fs');
const os=require('os');
const path=require('path');
const {pathToFileURL}=require('url');
const PptxGenJS=require('pptxgenjs');
const {chromium}=require('playwright');

const root=path.resolve(__dirname,'..');
const destination=path.join(root,'downloads');
const PPT_WIDTH=13.333333, PPT_HEIGHT=7.5;
const versions=[
  {name:'v7',source:'versions/v7/index.html',expected:44},
  {name:'v10',source:'drafts/rev10.html',expected:55},
  {name:'current',source:'slides/index.html',expected:107}
];
const args=process.argv.slice(2);
const selected=(args.find(x=>x.startsWith('--version='))||'--version=all').split('=')[1];
const capArg=args.find(x=>x.startsWith('--max-pages='));
const cap=capArg?Number(capArg.split('=')[1]):null;
if(!['all','v7','v10','current'].includes(selected)||
   (cap!==null && (!Number.isInteger(cap)||cap<1))) {
  console.error('Usage: node scripts/export_pptx.cjs [--version=all|v7|v10|current] [--max-pages=N]');
  process.exit(2);
}
fs.mkdirSync(destination,{recursive:true});

function attachNotes(slide,version,number,additional){
  const full=['Agent 101｜'+version+'｜第 '+number+' 頁',
    '此 PPTX 以圖片保留網頁投影片版面；動畫、逐步揭露與按鈕須使用網頁版本。',
    (additional||'').trim()].filter(Boolean).join('\n\n');
  slide.addNotes(full);
}

async function exportVersion(browser,version) {
  const target=path.join(destination,'agent101-'+version.name+'.pptx');
  const temp=fs.mkdtempSync(path.join(os.tmpdir(),'agent101-'+version.name+'-pptx-'));
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  try {
    await page.goto(pathToFileURL(path.join(root,version.source)).href,{waitUntil:'load'});
    await page.evaluate(()=>document.fonts.ready);
    const total=await page.locator('section.slide').count();
    if(total!==version.expected)throw Error(version.name+' expected '+version.expected+' slides; got '+total);
    const count=cap?Math.min(cap,total):total;
    const pptx=new PptxGenJS();
    pptx.layout='LAYOUT_WIDE';
    pptx.author='Agent 101';
    pptx.subject='Agent 101 learning workshop static export';
    pptx.title='Agent 101｜'+version.name+'｜'+count+' 頁';
    pptx.company='Agent 101';
    pptx.lang='zh-TW';
    let notesManifest=[];
    if(version.name==='current') {
      const manifest=JSON.parse(fs.readFileSync(path.join(root,'drafts/rev12-review/manifest.json'),'utf8'));
      notesManifest=manifest.pages||[];
    }
    for(let n=1;n<=count;n++){
      await page.evaluate(number=>{location.hash='#'+number;},n);
      await page.waitForFunction(number=>{
        const active=document.querySelector('section.slide.active');
        return active && [...document.querySelectorAll('section.slide')].indexOf(active)===number-1;
      },n);
      await page.evaluate(()=>document.fonts.ready);
      const slideElement=page.locator('section.slide.active');
      const image=path.join(temp,'slide-'+String(n).padStart(3,'0')+'.png');
      const box=await slideElement.boundingBox();
      if(!box||box.width<100||box.height<100)throw Error('Invalid slide dimensions at '+version.name+' P'+n);
      await slideElement.screenshot({path:image,animations:'disabled'});
      const presentationSlide=pptx.addSlide();
      presentationSlide.background={color:'0B111A'};
      const ratio=box.width/box.height;
      const imageWidth=Math.min(PPT_WIDTH,PPT_HEIGHT*ratio);
      const imageHeight=imageWidth/ratio;
      presentationSlide.addImage({path:image,x:(PPT_WIDTH-imageWidth)/2,
        y:(PPT_HEIGHT-imageHeight)/2,w:imageWidth,h:imageHeight,
        altText:'Agent 101 '+version.name+' page '+n});
      const notes=[];
      if(notesManifest[n-1]&&notesManifest[n-1].notes)notes.push(notesManifest[n-1].notes);
      if(version.name==='current') {
        const quiz=await slideElement.evaluate(el=>[...el.querySelectorAll('.r-exit-card')].map((card,i)=>({
          question:card.querySelector('h2')?.textContent?.trim()||('Question '+(i+1)),
          answer:card.querySelector('details')?.textContent?.trim()||''
        })));
        if(quiz.length)notes.push('Exit Check 參考答案\n'+quiz.map((q,i)=>
          'Q'+(i+1)+' '+q.question+'\n'+q.answer).join('\n\n'));
      }
      attachNotes(presentationSlide,version.name,n,notes.join('\n\n'));
      if(n%10===0||n===count)console.log(version.name+' screenshot '+n+'/'+count);
    }
    if(errors.length)throw Error(version.name+' browser errors: '+errors.join('; '));
    await pptx.writeFile({fileName:target});
    const bytes=fs.statSync(target).size;
    if(bytes<2000)throw Error('PPTX unexpectedly small: '+target+' bytes='+bytes);
    console.log('EXPORTED '+version.name+' '+count+' slides '+(bytes/1024/1024).toFixed(2)+'MiB -> '+target);
    return {name:version.name,count,bytes,target};
  } finally {
    await page.close();
    fs.rmSync(temp,{recursive:true,force:true});
  }
}
(async()=>{
  const browser=await chromium.launch({headless:true,channel:'chrome'});
  try{
    const results=[];
    for(const version of versions.filter(v=>selected==='all'||v.name===selected)){
      results.push(await exportVersion(browser,version));
    }
    console.log('PPTX_OK '+JSON.stringify(results));
  }finally{await browser.close();}
})().catch(err=>{console.error('PPTX_FAILED',err.stack||err);process.exit(1);});
