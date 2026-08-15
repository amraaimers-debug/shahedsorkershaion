// Language toggle (session-only, no persistent storage)
(function () {
  const html = document.documentElement;

  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      html.setAttribute('lang', lang);
      document.querySelectorAll('.lang-toggle button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
})();

// Theme toggle (light / dark, session-only)
(function () {
  const html = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) html.setAttribute('data-theme', 'dark');

  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    });
  });
})();

// Intro overlay cleanup (home page only)
(function () {
  const overlay = document.getElementById('introOverlay');
  if (!overlay) return;
  overlay.addEventListener('animationend', function (e) {
    if (e.animationName === 'introWipe') {
      overlay.style.display = 'none';
    }
  });
  // fallback in case animation event doesn't fire (e.g. reduced motion)
  setTimeout(() => { if (overlay) overlay.style.display = 'none'; }, 2200);
})();

// Typewriter headline + random line (home page only)
(function () {
  const l1 = document.getElementById('tw-line1-bn');
  const l2 = document.getElementById('tw-line2-bn');
  const l3 = document.getElementById('tw-line3-bn');
  const randomLineEl = document.getElementById('randomLine');
  if (!l1 || !l2 || !l3) return;

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const lines = [
    { el: l1, text: l1.textContent },
    { el: l2, text: l2.textContent },
    { el: l3, text: l3.textContent }
  ];

  const randomLines = [
    { bn: 'ফুলার রোডে জোনাকিরা এখনও কথা বলে।', en: 'The fireflies on Fuller Road still speak.' },
    { bn: 'কিছু গল্প রাত ১টায় লেখা হয়।', en: 'Some stories get written at 1 AM.' },
    { bn: 'দুই পরিচয়, একটাই মানুষ।', en: 'Two identities, one person.' },
    { bn: 'অভ্র এখনও অপেক্ষা করছে।', en: 'Abhra is still waiting.' },
    { bn: 'যা বানাই, তার মধ্যেও কিছুটা কবিতা থাকে।', en: 'Even what I build carries a little poetry.' }
  ];

  if (randomLineEl) {
    const pick = randomLines[Math.floor(Math.random() * randomLines.length)];
    randomLineEl.innerHTML = `<span data-bn>${pick.bn}</span><span data-en>${pick.en}</span>`;
  }

  if (reduceMotion) {
    lines.forEach(l => { l.el.textContent = l.text; });
    return;
  }

  lines.forEach(l => { l.el.textContent = ''; });

  function typeLine(index) {
    if (index >= lines.length) return;
    const { el, text } = lines[index];
    const chars = Array.from(text);
    el.classList.add('typing');
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += chars[i];
      i++;
      if (i >= chars.length) {
        clearInterval(interval);
        el.classList.remove('typing');
        setTimeout(() => typeLine(index + 1), 180);
      }
    }, 42);
  }

  setTimeout(() => typeLine(0), 1500);
})();

// Cursor follower doodle (desktop/mouse only)
(function () {
  const dot = document.getElementById('cursorDot');
  if (!dot) return;
  const canHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;

  let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
  let started = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!started) {
      started = true;
      dotX = mouseX; dotY = mouseY;
      dot.classList.add('active');
    }
  });

  document.addEventListener('mouseleave', () => dot.classList.remove('active'));
  document.addEventListener('mouseenter', () => { if (started) dot.classList.add('active'); });

  function animate() {
    dotX += (mouseX - dotX) * 0.15;
    dotY += (mouseY - dotY) * 0.15;
    dot.style.transform = `translate(${dotX - 11}px, ${dotY - 11}px) rotate(${(mouseX - dotX) * 0.5}deg)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();

// Easter egg sticker
(function () {
  const btn = document.querySelector('.egg-sticker');
  const modal = document.querySelector('.egg-modal');
  if (!btn || !modal) return;
  btn.addEventListener('click', () => modal.classList.add('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('egg-close')) {
      modal.classList.remove('open');
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.classList.remove('open');
  });
})();

// Mobile hamburger menu
(function () {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.menu-toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('menu-open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('menu-open'));
  });
})();
