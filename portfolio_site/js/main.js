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
