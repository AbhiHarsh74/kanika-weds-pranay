(() => {
  const $ = (id) => document.getElementById(id);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Countdown (date comes from data-date in index.html) ---- */
  const box = $('count');
  const target = new Date(box.dataset.date).getTime();
  const pad = (n) => String(n).padStart(2, '0');
  function tick() {
    const diff = Math.max(0, target - Date.now());
    $('d').textContent = Math.floor(diff / 864e5);
    $('h').textContent = pad(Math.floor(diff / 36e5) % 24);
    $('m').textContent = pad(Math.floor(diff / 6e4) % 60);
    $('s').textContent = pad(Math.floor(diff / 1e3) % 60);
  }
  tick();
  setInterval(tick, 1000);

  /* ---- Scroll reveal ----
     data-stagger="N" on a parent delays its .reveal children in groups of N. */
  document.querySelectorAll('[data-stagger]').forEach((parent) => {
    const n = parseInt(parent.dataset.stagger, 10) || 3;
    parent.querySelectorAll('.reveal').forEach((el, i) => {
      el.style.setProperty('--d', (i % n) * 120 + 'ms');
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---- Active nav link ---- */
  const links = [...document.querySelectorAll('nav a')];
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => a.classList.toggle('active', a.hash === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach((a) => { const s = document.querySelector(a.hash); if (s) spy.observe(s); });

  /* ---- Scroll-linked effects: progress bar, nav shadow, hero parallax ---- */
  const bar = $('progress'), nav = $('nav'), bg = $('heroBg'), inner = $('heroIn');
  let ticking = false;
  function update() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    nav.classList.toggle('scrolled', y > 40);
    if (!reduce && y < innerHeight * 1.2) {
      if (bg) bg.style.transform = 'translate3d(0,' + y * 0.3 + 'px,0)';
      inner.style.transform = 'translate3d(0,' + y * 0.12 + 'px,0)';
      inner.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.75));
    }
    ticking = false;
  }
  addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
})();
