(function () {
  // -------- 1) Copyright year (applies on all pages) --------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------- 2) Add a Theme Toggle button and wire it up --------
  const headerContainer = document.querySelector('.site-header .container') || document.querySelector('.site-header');
  if (headerContainer) {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-pressed', 'false');
    btn.title = 'Toggle light/dark theme';
    btn.innerHTML = '🌓 Theme';
    headerContainer.appendChild(btn);

    // Event listener #1: inverts colors by toggling a CSS class on <body>
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark');
      btn.setAttribute('aria-pressed', String(isDark));
    });
  }

  // -------- 3) Click-to-zoom on images (progressive enhancement) --------
  document.querySelectorAll('img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      img.classList.toggle('zoomed');
      img.style.cursor = img.classList.contains('zoomed') ? 'zoom-out' : 'zoom-in';
    });
  });

  // -------- 4) Filter table rows on Home page by price tier --------
  function filterTable() {
    const select = document.getElementById('priceFilter');
    const table = document.getElementById('brandTable');
    if (!select || !table) return; // Not on the Home page

    const tier = select.value; // "all", "accessible", "premium", "luxury"
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const rowTier = row.getAttribute('data-tier');
      const show = tier === 'all' ? true : (rowTier === tier);
      row.style.display = show ? '' : 'none';
    });
  }

  // Run once on load (in case default isn't "all")
  filterTable();

  // Event listener #2: change -> filters table, altering page structure
  const priceSelect = document.getElementById('priceFilter');
  if (priceSelect) {
    priceSelect.addEventListener('change', filterTable);
  }

  // -------- 5) Highlight current nav item based on URL (defensive) --------
  const navLinks = document.querySelectorAll('.site-nav a');
  const here = location.pathname.split('/').pop().toLowerCase();
  navLinks.forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href && here && href === here) {
      a.classList.add('active');
    }
  });
})();


