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
  const chapterNames = {
    C0: '人類合作', C2: '想法到 Ready', C1: '版本協作', C3: '實作與驗收',
    C4: '放行與完成', C5: 'Agent 演進', C6: 'Agent 交付', APP: '附錄',
  };
  function fromHash() {
    const match = /^#([1-9]\d*)$/.exec(location.hash);
    return match && Number(match[1]) <= slides.length ? Number(match[1]) - 1 : null;
  }
  function sync() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', String(i !== index));
    });
    current.textContent = index + 1;
    progress.style.width = `${(index + 1) / slides.length * 100}%`;
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
    document.querySelectorAll('[data-rail]').forEach(link => {
      const active = link.dataset.rail === data[index].chapter;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    const sourcePage = data[index].rev10SourcePage;
    const compare = document.getElementById('compare-link');
    compare.hidden = !sourcePage;
    if (sourcePage) compare.href = new URL(`drafts/rev10.html#${sourcePage}`, siteRoot).href;
    document.title = `${index + 1}/${slides.length} · ${data[index].title}｜Agent 101`;
    history.replaceState(null, '', `#${index + 1}`);
  }
  function go(n) {
    index = Math.max(0, Math.min(slides.length - 1, n));
    slides[index].scrollTop = 0;
    sync();
  }
  // Other legacy fragments are deliberately fully visible; the final Kanban recap
  // is an actual learner-operated sequence, not a synthetic test-only screenshot.
  document.querySelectorAll('.fragment').forEach(node => {
    if (!node.closest('.slide[data-page="106"]')) node.classList.add('visible');
  });
  const gateSlide = document.querySelector('.slide[data-page="106"]');
  if (gateSlide) {
    const gateNext = gateSlide.querySelector('[data-gate-next]');
    const gateReset = gateSlide.querySelector('[data-gate-reset]');
    const gateMessage = gateSlide.querySelector('[data-gate-message]');
    const ticketCount = gateSlide.querySelector('.moving-ticket small');
    const stages = [
      '1／3｜#3 在 Product Check，WIP 1/1；等待人的放行決定',
      '2／3｜教學假設：人已放行，且 Merge／Release／上線檢查與 DoD 均完成，#3 才 Done；WIP 0/1',
      '3／3｜教學假設：放行、Merge／Release／上線檢查及 DoD 均完成，#3 才 Done；但整體 Goal 尚未達成',
    ];
    const syncGateStage = (nextStage) => {
      const stage = Math.max(0, Math.min(2, nextStage));
      gateSlide.dataset.gateStage = String(stage);
      gateSlide.querySelectorAll('.fragment').forEach(fragment => {
        const step = Number([...fragment.classList].map(c => /^move-(\d+)$/.exec(c)?.[1]).find(Boolean));
        fragment.classList.toggle('visible', step===6 || (step===7 && stage>=1) || (step===8 && stage>=2) || (step<6 && !!step));
      });
      gateMessage.textContent = stages[stage];
      ticketCount.textContent = stage===0
        ? 'WIP 1/1｜待人放行'
        : 'WIP 0/1｜已完成本課 DoD（假設）';
      gateNext.textContent = stage===0 ? '下一步：由人決定放行 →'
        : stage===1 ? '下一步：核對是否達成 Goal →' : '已完成三階段回顧';
      gateNext.disabled = stage===2;
      gateReset.disabled = stage===0;
    };
    gateNext.addEventListener('click', () => syncGateStage(Number(gateSlide.dataset.gateStage||0)+1));
    gateReset.addEventListener('click', () => { syncGateStage(0); gateNext.focus(); });
    syncGateStage(0);
  }
  // PR Review is a staged teaching illustration. Stage 0 cannot silently
  // include a repair or successful re-review that has not happened yet.
  document.querySelectorAll('.r-pr-story').forEach(story => {
    const slides = [...story.querySelectorAll('[data-pr-pane]')];
    const markers = [...story.querySelectorAll('[data-pr-marker]')];
    const counter = story.querySelector('[data-pr-counter]');
    const next = story.querySelector('[data-pr-next]');
    const reset = story.querySelector('[data-pr-reset]');
    const labels = ['下一步：Dev 修正 →', '下一步：重新送審 →', '本例已交給 QA'];
    const show = value => {
      const current = Math.max(0, Math.min(slides.length-1, value));
      story.dataset.prStage = String(current);
      slides.forEach((pane, i) => {pane.hidden=i!==current;});
      markers.forEach((el,i) => el.classList.toggle('active',i===current));
      counter.textContent = String(current+1)+'／'+String(slides.length);
      next.textContent = labels[current];
      next.disabled = current===slides.length-1;
      reset.disabled = current===0;
    };
    next.addEventListener('click',()=>show(Number(story.dataset.prStage||0)+1));
    reset.addEventListener('click',()=>{show(0);next.focus();});
    show(0);
  });
  document.querySelectorAll('[data-process-next]').forEach(button => {
    const slide = button.closest('.slide');
    const note = slide.querySelector('[data-process-note]');
    const returnLabel = slide.querySelector('.flow-reanchor-label');
    const labels = [
      '1／3｜先看 #3 雙向配對一路經過關卡',
      '2／3｜Review／QA 退回 Dev；Product Check 可回 Backlog 重新釐清',
      '3／3｜再展開 #1、#2，回到完整三票流程',
    ];
    function syncProcessStep() {
      const stage = Number(slide.dataset.processStage || 0);
      note.textContent = labels[stage];
      if (returnLabel) returnLabel.textContent = stage === 2 ? '三張票回查 Goal（re-anchor）' : '#3 回查 Goal（re-anchor）';
      button.textContent = stage === 0 ? '下一步：展開退回路徑 →'
        : stage === 1 ? '下一步：顯示完整三票流程 →' : '已顯示完整三票流程';
      button.disabled = stage === 2;
    }
    button.addEventListener('click', () => {
      slide.dataset.processStage = String(Math.min(2, Number(slide.dataset.processStage || 0) + 1));
      syncProcessStep();
    });
    syncProcessStep();
  });
  document.querySelectorAll('[data-wip-reveal]').forEach(button => {
    const slide = button.closest('.slide');
    const sequence = slide.querySelector('[data-wip-sequence]');
    button.addEventListener('click', () => {
      slide.dataset.wipStage = 'compare';
      sequence.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    });
  });
  document.querySelectorAll('[data-wip-return]').forEach(button => {
    const slide = button.closest('.slide');
    const sequence = slide.querySelector('[data-wip-sequence]');
    const trigger = slide.querySelector('[data-wip-reveal]');
    button.addEventListener('click', () => {
      slide.dataset.wipStage = 'workflow';
      sequence.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus();
    });
  });
  prev.onclick = () => go(index - 1);
  next.onclick = () => go(index + 1);
  window.addEventListener('hashchange', () => go(fromHash() ?? index));
  document.getElementById('close-dialog').onclick = () => dialog.close();
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  function addLink(container, label, path) {
    const link = document.createElement('a');
    link.textContent = label;
    link.href = /^https?:\/\//.test(path) ? path : new URL(path, siteRoot).href;
    link.target = '_blank';
    link.rel = 'noopener';
    container.append(link);
  }
  function showNotes() {
    const page = data[index];
    title.textContent = `${String(page.number).padStart(2, '0')}｜${page.title}`;
    body.replaceChildren();
    const links = document.createElement('div');
    links.className = 'r-note-links';
    addLink(links, '本版執行故事板', 'docs/issue48-execution-storyboard.md');
    if (page.rev10SourcePage) addLink(links, `rev10 原始來源 P${String(page.rev10SourcePage).padStart(2, '0')}`, `drafts/rev10.html#${page.rev10SourcePage}`);
    page.materialRefs.forEach(ref => addLink(links, ref.label, ref.path));
    page.sourceCommentUrls.forEach(ref => addLink(links, ref.label, ref.url));
    const prerequisites = document.createElement('p');
    prerequisites.className = 'r-note-prerequisite';
    prerequisites.textContent = `前頁交接：${page.prerequisite}\n本頁主張：${page.claim}\n主要畫面／證據：${page.visual}\n下一頁轉場：${page.transition}`;
    const copy = document.createElement('div');
    copy.className = 'note-copy';
    copy.textContent = `${page.kind} · 舊 rev11 頁 ${page.oldRev11Page ?? '—'} · source ID ${page.sourceIds.join('／') || '—'} · 新頁 ID ${page.addedId ?? '—'}\n\n${page.notes}`;
    body.append(links, prerequisites, copy);
    dialog.showModal();
  }
  function showContents() {
    // The course map and dialog follow the actual chapter order of this deck.
    // A chapter-count change is an instructional decision, not a code error.
    const chapterGroups = [...document.querySelectorAll('.section-rail [data-rail]')];
    const appendixStart = data.find(page => page.chapter === 'APP')?.number;
    title.textContent = '全課 Outline · ' + (appendixStart - 1) +
                        ' 頁主線／附錄 ' + appendixStart + '–' + data.length;
    body.replaceChildren();
    const introduction = document.createElement('p');
    introduction.className = 'r-toc-course-context';
    introduction.textContent = '先看人類如何分工與交付，接著細拆需求、版本、實作與放行；再看 Agent 如何承接，最後由人根據證據驗收。';
    body.append(introduction);

    for (const chapterLink of chapterGroups) {
      const key = chapterLink.dataset.rail;
      const matching = data.filter(page => page.chapter === key);
      if (!matching.length) throw new Error('Outline chapter missing: ' + key);
      const group = document.createElement('details');
      group.className = 'r-toc-group';
      group.dataset.tocChapter = key;
      const summary = document.createElement('summary');
      summary.textContent = chapterLink.textContent.trim() + '｜' +
                            matching[0].number + '–' + matching.at(-1).number + ' 頁';
      group.append(summary);
      const pages = document.createElement('div');
      pages.className = 'r-toc-page-links';
      for (const page of matching) {
        const link = document.createElement('a');
        link.href = '#' + page.number;
        link.textContent = String(page.number).padStart(2, '0') + '　' + page.title;
        link.onclick = () => { dialog.close(); go(page.number - 1); };
        pages.append(link);
      }
      group.append(pages);
      if (key === 'APP') group.classList.add('r-toc-reference');
      body.append(group);
    }
    dialog.showModal();
  }
  document.getElementById('notes').onclick = showNotes;
  document.getElementById('contents').onclick = showContents;
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || dialog.open) return;
    const element = document.activeElement;
    if (element && (['INPUT', 'TEXTAREA', 'SELECT', 'SUMMARY'].includes(element.tagName) || element.isContentEditable)) return;
    if (['ArrowRight', 'PageDown'].includes(event.key) || (event.key === ' ' && element?.tagName !== 'BUTTON')) { event.preventDefault(); go(index + 1); }
    else if (['ArrowLeft', 'PageUp'].includes(event.key)) { event.preventDefault(); go(index - 1); }
    else if (event.key === 'Home') { event.preventDefault(); go(0); }
    else if (event.key === 'End') { event.preventDefault(); go(slides.length - 1); }
    else if (event.key.toLowerCase() === 'n') { event.preventDefault(); showNotes(); }
    else if (event.key.toLowerCase() === 'o') { event.preventDefault(); showContents(); }
  });
  function fit() { document.querySelector('.deck').style.setProperty('--deck-scale', Math.min(innerWidth / 1440, innerHeight / 900)); }
  window.addEventListener('resize', fit);
  fit();
  index = fromHash() ?? 0;
  sync();
})();
