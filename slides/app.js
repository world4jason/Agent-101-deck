(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const current = document.getElementById('current');
  const total = document.getElementById('total');
  const progress = document.getElementById('progress');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const rails = [...document.querySelectorAll('[data-rail]')];
  let index = 0;

  total.textContent = slides.length;

  const fragments = slide => [...slide.querySelectorAll('.fragment')];

  function sync() {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    current.textContent = index + 1;
    progress.style.width = ((index + 1) / slides.length * 100) + '%';
    rails.forEach(r => r.classList.toggle('active', r.dataset.rail === slides[index].dataset.section));
    history.replaceState(null, '', '#' + (index + 1));
  }

  function goNext() {
    const hidden = fragments(slides[index]).find(x => !x.classList.contains('visible'));
    if (hidden) { hidden.classList.add('visible'); return; }
    if (index < slides.length - 1) { index += 1; sync(); }
  }

  function goPrev() {
    const fs = fragments(slides[index]).filter(x => x.classList.contains('visible'));
    if (fs.length) { fs[fs.length - 1].classList.remove('visible'); return; }
    if (index > 0) {
      index -= 1;
      fragments(slides[index]).forEach(x => x.classList.add('visible'));
      sync();
    }
  }

  prev.addEventListener('click', goPrev);
  next.addEventListener('click', goNext);
  document.addEventListener('keydown', e => {
    if (['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement?.tagName)) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); goNext(); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goPrev(); }
    if (e.key === 'Home') { index = 0; sync(); }
    if (e.key === 'End') { index = slides.length - 1; fragments(slides[index]).forEach(x => x.classList.add('visible')); sync(); }
  });

  const hash = Number(location.hash.slice(1));
  if (Number.isFinite(hash) && hash >= 1 && hash <= slides.length) index = hash - 1;
  sync();
})();