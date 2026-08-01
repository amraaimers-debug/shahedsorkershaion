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
