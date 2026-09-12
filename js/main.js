/* =========================================================
   BFIAA — main.js  (v2)
   Mobile nav · Scroll reveal · Counter · Advanced Lightbox
   Features: zoom · download · prev/next · thumbs · keyboard
             · drag-to-pan · mouse-wheel zoom · fullscreen
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile Nav ─────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      const spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      });
    });
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
      }
    });
  }

  // ── Active Nav on Scroll ───────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  sections.forEach(s => sectionObs.observe(s));

  // ── Scroll Reveal ──────────────────────────────────────
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── Counter Animation ──────────────────────────────────
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.animated) {
        e.target.dataset.animated = '1';
        const target = parseInt(e.target.dataset.count, 10);
        const suffix = e.target.dataset.suffix || '';
        const dur = 1800;
        const start = performance.now();
        const tick = now => {
          const t = Math.min((now - start) / dur, 1);
          e.target.textContent = Math.floor((1 - Math.pow(1 - t, 3)) * target) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else e.target.textContent = target + suffix;
        };
        requestAnimationFrame(tick);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  // ── Back to Top ────────────────────────────────────────
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', scrollY > 500), { passive: true });
    btt.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── Smooth Anchor Scroll ───────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const tgt = document.querySelector(href);
      if (tgt) { e.preventDefault(); scrollTo({ top: tgt.getBoundingClientRect().top + scrollY - 70, behavior: 'smooth' }); }
    });
  });

  // ── Nav Shadow ────────────────────────────────────────
  const nav = document.querySelector('.site-nav');
  if (nav) window.addEventListener('scroll', () => {
    nav.style.boxShadow = scrollY > 30 ? '0 4px 24px rgba(0,0,0,0.5)' : '';
  }, { passive: true });

  // ── Mobile Menu Toggle ─────────────────────────────────
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  if (hb && mm) {
    hb.addEventListener('click', function() {
      const open = mm.classList.toggle('open');
      hb.setAttribute('aria-expanded', open);
    });
    mm.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mm.classList.remove('open');
        hb.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── Membership Form ────────────────────────────────────
  const form = document.getElementById('membershipForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent! We\'ll be in touch.';
      btn.style.background = '#1a6632';
      btn.disabled = true;
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; form.reset(); }, 4000);
    });
  }

  // ═══════════════════════════════════════════════════════
  //  ADVANCED LIGHTBOX
  // ═══════════════════════════════════════════════════════

  // Collect all gallery items into an ordered array
  const galleryItems = [...document.querySelectorAll('.gallery-item[data-src]')];
  const TOTAL = galleryItems.length;

  // DOM refs
  const lb         = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightboxImg');
  const lbStage    = document.getElementById('lbStage');
  const lbCounter  = document.getElementById('lbCounter');
  const lbCaption  = document.getElementById('lbCaption');
  const lbThumbs   = document.getElementById('lbThumbs');
  const lbSpinner  = document.getElementById('lbSpinner');
  const lbPrev     = document.getElementById('lbPrev');
  const lbNext     = document.getElementById('lbNext');
  const lbClose    = document.getElementById('lightboxClose');
  const lbZoomIn   = document.getElementById('lbZoomIn');
  const lbZoomOut  = document.getElementById('lbZoomOut');
  const lbZoomReset= document.getElementById('lbZoomReset');
  const lbFull     = document.getElementById('lbFullscreen');
  const lbDownload = document.getElementById('lbDownload');

  if (!lb || !lbImg) return;

  // State
  let currentIdx = 0;
  let scale = 1;
  let panX = 0, panY = 0;
  let isDragging = false, dragStartX = 0, dragStartY = 0, panStartX = 0, panStartY = 0;
  let zoomBadgeTimer = null;

  // ── Build Thumbnail Strip ────────────────────────────
  if (lbThumbs) {
    galleryItems.forEach((item, i) => {
      const th = document.createElement('img');
      th.src = item.dataset.src;
      th.alt = item.dataset.caption || '';
      th.className = 'lb-thumb';
      th.loading = 'lazy';
      th.addEventListener('click', () => openLightbox(i));
      lbThumbs.appendChild(th);
    });
  }

  // ── Add zoom-badge element to stage ─────────────────
  const zoomBadge = document.createElement('div');
  zoomBadge.className = 'lb-zoom-badge';
  lbStage && lbStage.appendChild(zoomBadge);

  // ── Helpers ──────────────────────────────────────────
  function applyTransform(animate = false) {
    if (!animate) lbImg.style.transition = 'opacity 0.3s ease';
    else lbImg.style.transition = 'transform 0.2s ease, opacity 0.3s ease';
    lbImg.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
    lbStage && lbStage.classList.toggle('zoomed', scale > 1);
  }

  function showZoomBadge() {
    zoomBadge.textContent = Math.round(scale * 100) + '%';
    zoomBadge.classList.add('visible');
    clearTimeout(zoomBadgeTimer);
    zoomBadgeTimer = setTimeout(() => zoomBadge.classList.remove('visible'), 1200);
  }

  function resetZoom(animate = true) {
    scale = 1; panX = 0; panY = 0;
    applyTransform(animate);
  }

  function clampPan() {
    if (scale <= 1) { panX = 0; panY = 0; return; }
    const stageRect = lbStage.getBoundingClientRect();
    const maxX = (stageRect.width  * (scale - 1)) / 2;
    const maxY = (stageRect.height * (scale - 1)) / 2;
    panX = Math.max(-maxX, Math.min(maxX, panX));
    panY = Math.max(-maxY, Math.min(maxY, panY));
  }

  function updateNav() {
    if (lbPrev) lbPrev.disabled = currentIdx === 0;
    if (lbNext) lbNext.disabled = currentIdx === TOTAL - 1;
    if (lbCounter) lbCounter.textContent = `${currentIdx + 1} / ${TOTAL}`;
  }

  function updateThumbs() {
    lbThumbs && lbThumbs.querySelectorAll('.lb-thumb').forEach((th, i) => {
      th.classList.toggle('active', i === currentIdx);
    });
    // Scroll active thumb into view
    const activeTh = lbThumbs && lbThumbs.querySelector('.lb-thumb.active');
    if (activeTh) activeTh.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function loadImage(src, caption) {
    // Show spinner, hide image
    lbImg.classList.add('loading');
    lbImg.classList.remove('fade-in');
    lbSpinner && lbSpinner.classList.add('active');
    if (lbCaption) lbCaption.textContent = caption || '';

    const tmpImg = new Image();
    tmpImg.onload = () => {
      lbImg.src = src;
      lbImg.alt = caption || '';
      lbSpinner && lbSpinner.classList.remove('active');
      lbImg.classList.remove('loading');
      requestAnimationFrame(() => lbImg.classList.add('fade-in'));
      // Set download link
      if (lbDownload) {
        lbDownload.href = src;
        lbDownload.download = src.split('/').pop();
      }
    };
    tmpImg.onerror = () => {
      lbSpinner && lbSpinner.classList.remove('active');
      lbImg.classList.remove('loading');
      lbImg.classList.add('fade-in');
    };
    tmpImg.src = src;
  }

  // ── Open ─────────────────────────────────────────────
  function openLightbox(idx) {
    currentIdx = idx;
    const item = galleryItems[idx];
    resetZoom(false);
    loadImage(item.dataset.src, item.dataset.caption || '');
    updateNav();
    updateThumbs();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  // ── Close ────────────────────────────────────────────
  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    setTimeout(() => { lbImg.src = ''; resetZoom(false); }, 300);
  }

  // ── Navigate ─────────────────────────────────────────
  function navigate(dir) {
    const next = currentIdx + dir;
    if (next < 0 || next >= TOTAL) return;
    currentIdx = next;
    const item = galleryItems[currentIdx];
    resetZoom(false);
    loadImage(item.dataset.src, item.dataset.caption || '');
    updateNav();
    updateThumbs();
  }

  // ── Zoom ─────────────────────────────────────────────
  function zoom(factor, cx, cy) {
    const newScale = Math.max(1, Math.min(5, scale * factor));
    if (newScale === scale) return;
    // Zoom towards cursor position if provided
    if (cx !== undefined && lbStage) {
      const rect = lbStage.getBoundingClientRect();
      const ox = cx - rect.left - rect.width  / 2;
      const oy = cy - rect.top  - rect.height / 2;
      panX = (panX - ox) * (newScale / scale) + ox;
      panY = (panY - oy) * (newScale / scale) + oy;
    }
    scale = newScale;
    clampPan();
    applyTransform(true);
    showZoomBadge();
  }

  // ── Wheel Zoom ───────────────────────────────────────
  lbStage && lbStage.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 0.87;
    zoom(factor, e.clientX, e.clientY);
  }, { passive: false });

  // ── Drag / Pan ───────────────────────────────────────
  lbStage && lbStage.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    isDragging  = true;
    dragStartX  = e.clientX;
    dragStartY  = e.clientY;
    panStartX   = panX;
    panStartY   = panY;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    panX = panStartX + (e.clientX - dragStartX);
    panY = panStartY + (e.clientY - dragStartY);
    clampPan();
    applyTransform();
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  // ── Touch Gestures (pinch + pan) ─────────────────────
  let lastTouchDist = null;
  let touchPanStartX = 0, touchPanStartY = 0;
  let touchMidX = 0, touchMidY = 0;

  lbStage && lbStage.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      lastTouchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchMidX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      touchMidY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    } else if (e.touches.length === 1 && scale > 1) {
      isDragging  = true;
      dragStartX  = e.touches[0].clientX;
      dragStartY  = e.touches[0].clientY;
      panStartX   = panX;
      panStartY   = panY;
    }
  }, { passive: true });

  lbStage && lbStage.addEventListener('touchmove', e => {
    if (e.touches.length === 2 && lastTouchDist !== null) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / lastTouchDist;
      zoom(factor, touchMidX, touchMidY);
      lastTouchDist = dist;
    } else if (e.touches.length === 1 && isDragging) {
      panX = panStartX + (e.touches[0].clientX - dragStartX);
      panY = panStartY + (e.touches[0].clientY - dragStartY);
      clampPan();
      applyTransform();
    }
  }, { passive: false });

  lbStage && lbStage.addEventListener('touchend', e => {
    if (e.touches.length < 2) lastTouchDist = null;
    if (e.touches.length === 0) isDragging = false;
  }, { passive: true });

  // Double-tap to zoom
  let lastTap = 0;
  lbStage && lbStage.addEventListener('touchend', e => {
    const now = Date.now();
    if (now - lastTap < 300 && e.changedTouches.length === 1) {
      if (scale > 1) resetZoom(true);
      else zoom(2, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      showZoomBadge();
    }
    lastTap = now;
  }, { passive: true });

  // ── Button Controls ──────────────────────────────────
  lbZoomIn  && lbZoomIn.addEventListener('click',  () => { zoom(1.3); });
  lbZoomOut && lbZoomOut.addEventListener('click', () => { zoom(0.77); });
  lbZoomReset && lbZoomReset.addEventListener('click', () => { resetZoom(true); showZoomBadge(); });

  lbFull && lbFull.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      lb.requestFullscreen().then(() => { lbFull.textContent = '⛷'; lbFull.title = 'Exit fullscreen (F)'; }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => { lbFull.textContent = '⛶'; lbFull.title = 'Fullscreen (F)'; }).catch(() => {});
    }
  });

  lbPrev && lbPrev.addEventListener('click', () => navigate(-1));
  lbNext && lbNext.addEventListener('click', () => navigate(+1));
  lbClose && lbClose.addEventListener('click', closeLightbox);

  // Close on backdrop click (not on image)
  lb.addEventListener('click', e => {
    if (e.target === lb || e.target === lbStage) closeLightbox();
  });

  // ── Keyboard ─────────────────────────────────────────
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    switch (e.key) {
      case 'Escape':    closeLightbox(); break;
      case 'ArrowLeft': navigate(-1); break;
      case 'ArrowRight':navigate(+1); break;
      case '+': case '=': zoom(1.3); break;
      case '-': case '_': zoom(0.77); break;
      case '0':         resetZoom(true); showZoomBadge(); break;
      case 'f': case 'F':
        lbFull && lbFull.click(); break;
      case 'd': case 'D':
        lbDownload && lbDownload.click(); break;
    }
  });

  // ── Attach to gallery items ───────────────────────────
  galleryItems.forEach((item, i) => {
    const open = () => openLightbox(i);
    item.addEventListener('click', open);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });

  // ■ Tab Logic for Picnic 2023 ■
  const tabBtns = document.querySelectorAll('.picnic-tab-btn');
  const tabSegments = document.querySelectorAll('.picnic-segment');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      tabBtns.forEach(b => b.classList.remove('active'));
      tabSegments.forEach(s => s.style.display = 'none');
      
      // Add active class to clicked
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-target');
      document.getElementById(targetId).style.display = 'block';
      
      // Re-initialize lightbox array so the new images are in correct order!
      // Actually, since we only hide/show them with display: none, 
      // the Lightbox STILL works perfectly because all DOM elements exist!
    });
  });

  console.log('🎬 BFIAA — bfiaa.bfibd.org — Advanced Lightbox ready');
});
