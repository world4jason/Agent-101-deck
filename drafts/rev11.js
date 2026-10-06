(() => {
  const siteRoot = new URL('../', document.currentScript.src);
  const slides = [...document.querySelectorAll('.slide')];
  const data = JSON.parse(document.getElementById('deck-data').textContent);
  const current = document.getElementById('current');
  const progress = document.getElementById('progress');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const dialog = document.getElementById('review-dialog');
  const body = document.getElementById('dialog-body');
  const title = document.getElementById('dialog-title');
  let index = 0;
  const chapterNames = {C0:'人類原本如何合作',C1:'版本與協作',C2:'從想法到 Ready',C3:'實作、審查與驗證',C4:'放行、完成與整體驗收',C5:'Agent 演進與新問題',C6:'Agent 交付與人的驗收',APP:'附錄'};
  function fromHash() {const match=/^#([1-9]\d*)$/.exec(location.hash);return match&&Number(match[1])<=slides.length?Number(match[1])-1:null;}
  function sync() {
    slides.forEach((s,i)=>{s.classList.toggle('active',i===index);s.setAttribute('aria-hidden',String(i!==index));});
    current.textContent=index+1;progress.style.width=`${(index+1)/slides.length*100}%`;
    prev.disabled=index===0;next.disabled=index===slides.length-1;
    document.querySelectorAll('[data-rail]').forEach(a=>{const active=a.dataset.rail===data[index].chapter;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
    const compare = document.getElementById('compare-link');
    compare.hidden = !data[index].original;
    if(data[index].original) compare.href = new URL(`drafts/rev10.html#${data[index].original}`, siteRoot).href;
    document.title=`${index+1}/82 · ${data[index].title}｜Agent 101`;
    history.replaceState(null,'',`#${index+1}`);
  }
  function go(n) {index=Math.max(0,Math.min(slides.length-1,n));slides[index].scrollTop=0;sync();}
  // Review mode shows each page's entire content. One key press moves one page.
  document.querySelectorAll('.fragment').forEach(x=>x.classList.add('visible'));
  prev.onclick=()=>go(index-1);next.onclick=()=>go(index+1);
  window.addEventListener('hashchange',()=>go(fromHash() ?? index));
  document.getElementById('close-dialog').onclick=()=>dialog.close();
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  function showNotes(){
    const p=data[index];title.textContent=`${p.number}｜${p.title}`;body.replaceChildren();
    const links=document.createElement('div');links.className='r-note-links';
    for(const [text,url] of [['內容 SSOT','docs/rev10-slide-by-slide-v1.md'],...(p.original?[['rev10 原頁',`drafts/rev10.html#${p.original}`]]:[])]){const a=document.createElement('a');a.textContent=text;a.href=new URL(url,siteRoot).href;a.target='_blank';a.rel='noopener';links.append(a);}
    const copy=document.createElement('div');copy.className='note-copy';copy.textContent=`${p.kind} · ${p.ids.join('／')}\n\n${p.notes}`;
    body.append(links,copy);dialog.showModal();
  }
  function showContents(){
    title.textContent='82 頁目錄 · 主線 1–71／附錄 72–82';body.replaceChildren();
    for(const [key,label] of Object.entries(chapterNames)){const group=document.createElement('section');group.className='r-toc-group';const h=document.createElement('h3');h.textContent=label;group.append(h);
      data.filter(p=>p.chapter===key).forEach(p=>{const a=document.createElement('a');a.href=`#${p.number}`;a.textContent=`${String(p.number).padStart(2,'0')}　${p.title}`;a.onclick=()=>{dialog.close();go(p.number-1)};group.append(a)});body.append(group);
    }dialog.showModal();
  }
  document.getElementById('notes').onclick=showNotes;document.getElementById('contents').onclick=showContents;
  document.addEventListener('keydown',e=>{
    if(e.altKey||e.ctrlKey||e.metaKey||dialog.open)return;
    const el=document.activeElement;if(el&&(['INPUT','TEXTAREA','SELECT'].includes(el.tagName)||el.isContentEditable))return;
    if(['ArrowRight','PageDown'].includes(e.key)||(e.key===' '&&el?.tagName!=='BUTTON')){e.preventDefault();go(index+1)}
    else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(index-1)}
    else if(e.key==='Home'){e.preventDefault();go(0)}
    else if(e.key==='End'){e.preventDefault();go(slides.length-1)}
    else if(e.key.toLowerCase()==='n'){e.preventDefault();showNotes()}
    else if(e.key.toLowerCase()==='o'){e.preventDefault();showContents()}
  });
  function fit(){document.querySelector('.deck').style.setProperty('--deck-scale',Math.min(innerWidth/1440,innerHeight/900));}
  window.addEventListener('resize',fit);fit();index=fromHash() ?? 0;sync();
})();
