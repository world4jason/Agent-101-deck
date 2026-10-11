/* Browser smoke for all archived versions and PowerPoint download links. */
'use strict';
const fs=require('fs');
const path=require('path');
const {pathToFileURL}=require('url');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..');
const versions=[
 {id:'v7',html:'versions/v7/index.html',count:44,file:'agent101-v7.pptx'},
 {id:'v10',html:'drafts/rev10.html',count:55,file:'agent101-v10.pptx'},
 {id:'current',html:'slides/index.html',count:107,file:'agent101-current.pptx'}
];
(async()=>{
const browser=await chromium.launch({headless:true,channel:'chrome'});
try{
 for(const version of versions){
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[];
  page.on('pageerror',err=>errors.push(err.message));
  await page.goto(pathToFileURL(path.join(root,version.html)).href);
  const nav=page.locator('.deck-version-tools');
  await nav.waitFor();
  const current=page.locator('.deck-version-link[aria-current="page"]');
  if(await current.count()!==1)throw Error(version.id+' selected link missing');
  const slides=await page.locator('section.slide').count();
  if(slides!==version.count)throw Error(version.id+' wrong page count '+slides);
  const links=await page.locator('.deck-version-links a').all();
  if(links.length!==3)throw Error(version.id+' does not show three versions');
  for(let i=0;i<links.length;i++){
   const href=await links[i].getAttribute('href');
   const url=new URL(href);
   let filePath;
   if(url.protocol==='file:')filePath=decodeURIComponent(url.pathname);
   if(!filePath||!fs.existsSync(filePath))throw Error(version.id+' broken link '+href);
  }
  const exportLink=page.locator('.deck-pptx-export');
  const download=await exportLink.getAttribute('href');
  if(!download.endsWith('/'+version.file))throw Error(version.id+' wrong PPTX URL '+download);
  const downloaded=new URL(download);
  if(downloaded.protocol!=='file:' || !fs.existsSync(decodeURIComponent(downloaded.pathname)))
    throw Error(version.id+' PPTX file not available');
  const bounding=await page.evaluate(()=>{
   const foot=document.querySelector('footer.controls').getBoundingClientRect();
   const tools=document.querySelector('.deck-version-tools').getBoundingClientRect();
   return {fits:tools.left>=foot.left && tools.right<=foot.right&&tools.top>=foot.top&&tools.bottom<=foot.bottom,
      onScreen:tools.right<=innerWidth&&tools.bottom<=innerHeight};
  });
  if(!bounding.fits||!bounding.onScreen)throw Error(version.id+' toolbar overflows footer');
  await page.evaluate(n=>{location.hash='#'+n;},version.count);
  await page.waitForFunction(n=>{
   const slide=document.querySelector('section.slide.active');
   return slide && [...document.querySelectorAll('section.slide')].indexOf(slide)===n-1;
  },version.count);
  if(errors.length)throw Error(version.id+' JS error '+errors.join('; '));
  console.log('PASS '+version.id+' '+version.count+' pages, three links, PPTX, toolbar, navigation');
  await page.close();
 }
} finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
