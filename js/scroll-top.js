/**
 * BFIAA — Unified Scroll to Top Component
 * Automatically provides an accessible, smooth-scrolling button on all pages.
 */
(function () {
  function initScrollTop() {
    let btn = document.getElementById('scrollTopBtn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'scrollTopBtn';
      btn.className = 'scroll-top-btn';
      btn.setAttribute('aria-label', 'Scroll to top');
      btn.setAttribute('title', 'Scroll to top');
      btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
      document.body.appendChild(btn);
    }

    function toggleVisibility() {
      if (window.pageYOffset > 280) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTop);
  } else {
    initScrollTop();
  }
})();
