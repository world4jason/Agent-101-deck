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

  // Returns a 0-based slide index for "#N" (1 <= N <= slides.length), else null.
  function indexFromHash(hash) {
    const m = /^#([1-9]\d*)$/.exec(hash);
    if (!m) return null;
    const n = Number(m[1]);
    return n <= slides.length ? n - 1 : null;
  }

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

  function goTo(i) {
    index = i;
    sync();
  }

  prev.addEventListener('click', goPrev);
  next.addEventListener('click', goNext);

  document.addEventListener('keydown', e => {
    // Leave browser/OS shortcuts (Alt+Arrow = history, Cmd/Ctrl+Arrow, etc.) alone.
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const el = document.activeElement;
    if (el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable)) return;
    // A focused button handles Space/Enter natively (fires click once); only skip those keys.
    const onButton = el?.tagName === 'BUTTON';

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !onButton)) { e.preventDefault(); goNext(); }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goPrev(); }
    else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
    else if (e.key === 'End') {
      e.preventDefault();
      fragments(slides[slides.length - 1]).forEach(x => x.classList.add('visible'));
      goTo(slides.length - 1);
    }
  });

  // Manual hash edits / back-forward: valid "#N" jumps there; anything else keeps the
  // current slide and rewrites the URL back to it.
  window.addEventListener('hashchange', () => {
    const i = indexFromHash(location.hash);
    if (i === null) sync();
    else goTo(i);
  });

  index = indexFromHash(location.hash) ?? 0;
  sync();
})();
