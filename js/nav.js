(function () {
  const NAMESPACE = 'OpusLayout';
  window[NAMESPACE] = window[NAMESPACE] || {};

  function initNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const panel = document.querySelector('[data-nav-panel]');
    const overlay = document.querySelector('[data-nav-overlay]');
    const header = document.querySelector('header');
    const root = document.documentElement;

    if (!toggle || !panel || !overlay || toggle.dataset.navReady === 'true') {
      return;
    }

    toggle.dataset.navReady = 'true';

    const updateNavOffset = () => {
      if (!header) {
        return;
      }
      const offset = header.offsetHeight + 16;
      root.style.setProperty('--mobile-nav-offset', `${offset}px`);
    };
    updateNavOffset();

    const closeMenu = () => {
      panel.classList.remove('is-open');
      overlay.classList.remove('is-active');
      document.body.classList.remove('nav-is-open');
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const handleToggle = () => {
      const isOpen = panel.classList.toggle('is-open');
      overlay.classList.toggle('is-active', isOpen);
      document.body.classList.toggle('nav-is-open', isOpen);
      toggle.classList.toggle('is-active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    toggle.addEventListener('click', handleToggle);
    overlay.addEventListener('click', closeMenu);
    panel.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      updateNavOffset();
      if (window.innerWidth > 960 && panel.classList.contains('is-open')) {
        closeMenu();
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && panel.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  window[NAMESPACE].initNav = initNav;
})();
