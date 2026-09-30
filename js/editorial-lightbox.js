/**
 * BFIAA Cinematic Editorial Lightbox Engine
 * Universal, accessible, high-performance archival photo viewer.
 * 
 * Features:
 * - Zoom In / Out via mouse wheel scroll, toolbar buttons, and double-click
 * - Click & drag / touch pan when zoomed in with boundary constraints
 * - Previous / Next navigation via floating chevron buttons, keyboard arrows, and mobile touch swipe
 * - Bottom interactive thumbnail filmstrip with auto-centering
 * - Live photo counter (Photo X of Y) and archival captions
 * - Auto-synchronization with on-page photo showcase stages
 * - Universal auto-discovery for all conference galleries, retrospective galleries, and single flyers/covers
 * - Full keyboard navigation: Escape, ←, →, +, -, 0, D
 */

(function() {
  'use strict';

  class EditorialLightbox {
    constructor() {
      this.items = [];
      this.currentIndex = 0;
      this.zoomLevel = 1.0;
      this.minZoom = 0.6;
      this.maxZoom = 4.5;
      this.zoomStep = 0.25;
      this.panX = 0;
      this.panY = 0;
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.lastTapTime = 0;
      this.isOpen = false;
      this.syncCallback = null;

      this.createDOM();
      this.attachEvents();
    }

    createDOM() {
      if (document.getElementById('bfiaaLightbox')) {
        this.overlay = document.getElementById('bfiaaLightbox');
        this.activeImg = document.getElementById('lbActiveImg');
        this.imgContainer = document.getElementById('lbImgContainer');
        this.canvas = document.getElementById('lbCanvas');
        this.counter = document.getElementById('lbCounter');
        this.caption = document.getElementById('lbCaption');
        this.zoomBadge = document.getElementById('lbZoomBadge');
        this.downloadBtn = document.getElementById('lbDownload');
        this.filmstrip = document.getElementById('lbFilmstrip');
        this.prevBtn = document.getElementById('lbPrev');
        this.nextBtn = document.getElementById('lbNext');
        this.tray = this.overlay.querySelector('.lb-tray');
        return;
      }

      const overlay = document.createElement('div');
      overlay.id = 'bfiaaLightbox';
      overlay.className = 'bfiaa-lightbox';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Archival Photo Lightbox Gallery');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.zIndex = '99999';
      overlay.style.display = 'none';
      overlay.style.visibility = 'hidden';
      overlay.style.opacity = '0';
      overlay.style.pointerEvents = 'none';

      overlay.innerHTML = `
        <div class="lb-topbar">
          <div class="lb-info">
            <span class="lb-counter" id="lbCounter">Photo 1 of 1</span>
            <span class="lb-sep" id="lbSep">/</span>
            <span class="lb-caption" id="lbCaption">BFIAA Gallery</span>
          </div>
          <div class="lb-controls">
            <button class="lb-btn" id="lbZoomOut" title="Zoom Out (- or Scroll Down)" aria-label="Zoom Out">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
            <span class="lb-zoom-badge" id="lbZoomBadge" title="Current Zoom Level">100%</span>
            <button class="lb-btn" id="lbZoomIn" title="Zoom In (+ or Scroll Up)" aria-label="Zoom In">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
            <button class="lb-btn" id="lbZoomReset" title="Reset Zoom (0 or DblClick)" aria-label="Reset Zoom">1:1</button>
            <a class="lb-btn lb-btn-gold" id="lbDownload" href="#" download title="Download Photo (D)" aria-label="Download Photo">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Download</span>
            </a>
            <button class="lb-btn lb-btn-close" id="lbClose" title="Close (Esc)" aria-label="Close Lightbox">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div class="lb-viewport" id="lbViewport">
          <button class="lb-nav-arrow lb-prev" id="lbPrev" aria-label="Previous Photo (←)" title="Previous (←)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="lb-canvas" id="lbCanvas">
            <div class="lb-img-container" id="lbImgContainer">
              <img id="lbActiveImg" class="lb-active-img" src="" alt="Gallery Image" draggable="false" />
            </div>
          </div>
          <button class="lb-nav-arrow lb-next" id="lbNext" aria-label="Next Photo (→)" title="Next (→)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div class="lb-tray">
          <div class="lb-strip-wrap">
            <div class="lb-filmstrip" id="lbFilmstrip"></div>
          </div>
          <div class="lb-shortcuts-hint">
            <span>← / → Previous / Next</span>
            <span>•</span>
            <span>Scroll Wheel Zoom</span>
            <span>•</span>
            <span>Drag Pan</span>
            <span>•</span>
            <span>DblClick Reset</span>
            <span>•</span>
            <span>Esc Close</span>
          </div>
        </div>
      `;

      document.body.appendChild(overlay);

      this.overlay = overlay;
      this.activeImg = document.getElementById('lbActiveImg');
      this.imgContainer = document.getElementById('lbImgContainer');
      this.canvas = document.getElementById('lbCanvas');
      this.counter = document.getElementById('lbCounter');
      this.caption = document.getElementById('lbCaption');
      this.sep = document.getElementById('lbSep');
      this.zoomBadge = document.getElementById('lbZoomBadge');
      this.downloadBtn = document.getElementById('lbDownload');
      this.filmstrip = document.getElementById('lbFilmstrip');
      this.prevBtn = document.getElementById('lbPrev');
      this.nextBtn = document.getElementById('lbNext');
      this.tray = overlay.querySelector('.lb-tray');
    }

    attachEvents() {
      document.getElementById('lbClose').addEventListener('click', () => this.close());
      document.getElementById('lbZoomIn').addEventListener('click', () => this.zoom(this.zoomStep));
      document.getElementById('lbZoomOut').addEventListener('click', () => this.zoom(-this.zoomStep));
      document.getElementById('lbZoomReset').addEventListener('click', () => this.resetZoom());
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());

      // Double-click to toggle 1x / 2.2x zoom
      this.canvas.addEventListener('dblclick', (e) => {
        if (e.target.closest('.lb-nav-arrow')) return;
        if (this.zoomLevel > 1.05) {
          this.resetZoom();
        } else {
          this.setZoom(2.2);
        }
      });

      // Mouse wheel zoom (scrolling over canvas zooms in / out)
      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? this.zoomStep : -this.zoomStep;
        this.zoom(delta);
      }, { passive: false });

      // Mouse drag to pan when zoomed in
      this.canvas.addEventListener('mousedown', (e) => {
        if (e.target.closest('.lb-nav-arrow')) return;
        if (this.zoomLevel > 1.0) {
          e.preventDefault();
          this.isDragging = true;
          this.dragStartX = e.clientX - this.panX;
          this.dragStartY = e.clientY - this.panY;
          this.imgContainer.classList.add('grabbing');
        }
      });

      window.addEventListener('mousemove', (e) => {
        if (!this.isOpen || !this.isDragging) return;
        this.panX = e.clientX - this.dragStartX;
        this.panY = e.clientY - this.dragStartY;
        this.applyTransform();
      });

      window.addEventListener('mouseup', () => {
        if (this.isDragging) {
          this.isDragging = false;
          this.imgContainer.classList.remove('grabbing');
        }
      });

      // Touch events for mobile pinch, pan, and swipe navigation
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          const now = Date.now();
          if (now - this.lastTapTime < 300) {
            // Double tap detected
            if (this.zoomLevel > 1.05) this.resetZoom();
            else this.setZoom(2.2);
            this.lastTapTime = 0;
            return;
          }
          this.lastTapTime = now;

          this.touchStartX = e.touches[0].clientX;
          this.touchStartY = e.touches[0].clientY;
          if (this.zoomLevel > 1.0) {
            this.isDragging = true;
            this.dragStartX = e.touches[0].clientX - this.panX;
            this.dragStartY = e.touches[0].clientY - this.panY;
          }
        }
      }, { passive: true });

      this.canvas.addEventListener('touchmove', (e) => {
        if (this.isDragging && e.touches.length === 1) {
          this.panX = e.touches[0].clientX - this.dragStartX;
          this.panY = e.touches[0].clientY - this.dragStartY;
          this.applyTransform();
        }
      }, { passive: true });

      this.canvas.addEventListener('touchend', (e) => {
        if (this.isDragging) {
          this.isDragging = false;
        } else if (this.zoomLevel <= 1.05 && e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - this.touchStartX;
          const deltaY = e.changedTouches[0].clientY - this.touchStartY;
          if (Math.abs(deltaX) > 45 && Math.abs(deltaY) < 70) {
            if (deltaX < 0) this.next();
            else this.prev();
          }
        }
      }, { passive: true });

      // Close on canvas click only if clicking backdrop at 1x zoom
      this.canvas.addEventListener('click', (e) => {
        if (e.target === this.canvas && this.zoomLevel <= 1.05) {
          this.close();
        }
      });

      // Keyboard Shortcuts
      window.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;

        switch (e.key) {
          case 'Escape':
            e.preventDefault();
            this.close();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.prev();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.next();
            break;
          case '+':
          case '=':
            e.preventDefault();
            this.zoom(this.zoomStep);
            break;
          case '-':
          case '_':
            e.preventDefault();
            this.zoom(-this.zoomStep);
            break;
          case '0':
          case 'r':
          case 'R':
            e.preventDefault();
            this.resetZoom();
            break;
          case 'd':
          case 'D':
            if (!e.ctrlKey && !e.metaKey) {
              e.preventDefault();
              this.downloadCurrent();
            }
            break;
        }
      });
    }

    open(items, startIndex = 0, syncCallback = null) {
      if (!items || items.length === 0) return;
      this.items = items;
      this.syncCallback = syncCallback;
      this.isOpen = true;

      // Handle single image mode vs multi-image gallery
      const isSingle = items.length <= 1;
      this.prevBtn.style.display = isSingle ? 'none' : 'flex';
      this.nextBtn.style.display = isSingle ? 'none' : 'flex';
      this.counter.style.display = isSingle ? 'none' : 'inline-block';
      if (this.sep) this.sep.style.display = isSingle ? 'none' : 'inline-block';
      if (this.tray) this.tray.style.display = isSingle ? 'none' : 'flex';

      this.overlay.style.display = 'flex';
      this.overlay.style.visibility = 'visible';
      this.overlay.style.pointerEvents = 'auto';

      requestAnimationFrame(() => {
        if (this.isOpen) {
          this.overlay.classList.add('active');
          this.overlay.style.opacity = '1';
        }
      });
      document.body.style.overflow = 'hidden';

      if (!isSingle) {
        this.renderFilmstrip();
      }
      this.showIndex(startIndex);
    }

    close() {
      this.isOpen = false;
      this.overlay.classList.remove('active');
      this.overlay.style.opacity = '0';
      this.overlay.style.pointerEvents = 'none';
      document.body.style.overflow = '';
      this.resetZoom();
      setTimeout(() => {
        if (!this.isOpen) {
          this.overlay.style.display = 'none';
          this.overlay.style.visibility = 'hidden';
        }
      }, 260);
    }

    renderFilmstrip() {
      this.filmstrip.innerHTML = '';
      this.items.forEach((item, idx) => {
        const thumb = document.createElement('div');
        thumb.className = 'lb-thumb' + (idx === this.currentIndex ? ' active' : '');
        thumb.title = item.caption || `Photo ${idx + 1}`;
        thumb.innerHTML = `<img src="${item.src}" alt="${item.alt || ''}" loading="lazy" />`;
        thumb.addEventListener('click', () => this.showIndex(idx));
        this.filmstrip.appendChild(thumb);
      });
    }

    showIndex(index) {
      if (!this.items || this.items.length === 0) return;
      if (index < 0) index = this.items.length - 1;
      if (index >= this.items.length) index = 0;

      this.currentIndex = index;
      const item = this.items[index];

      this.resetZoom();

      this.activeImg.style.opacity = '0.3';
      this.activeImg.src = item.src;
      this.activeImg.alt = item.alt || item.caption || `Photo ${index + 1}`;

      this.activeImg.onload = () => {
        this.activeImg.style.opacity = '1';
      };

      this.counter.textContent = `Photo ${index + 1} of ${this.items.length}`;
      this.caption.textContent = item.caption || item.alt || 'BFIAA Gallery Archive';
      this.downloadBtn.href = item.src;
      this.downloadBtn.download = (item.alt || `bfiaa-photo-${index + 1}`).toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.jpg';

      // Update filmstrip active state & center it
      const thumbs = this.filmstrip.querySelectorAll('.lb-thumb');
      thumbs.forEach((t, i) => {
        if (i === index) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          t.classList.remove('active');
        }
      });

      // Synchronize back to the on-page stage if callback provided
      if (typeof this.syncCallback === 'function') {
        this.syncCallback(item.src, item.caption || item.alt, index);
      }
    }

    next() {
      this.showIndex(this.currentIndex + 1);
    }

    prev() {
      this.showIndex(this.currentIndex - 1);
    }

    zoom(delta) {
      this.setZoom(this.zoomLevel + delta);
    }

    setZoom(val) {
      this.zoomLevel = Math.min(Math.max(val, this.minZoom), this.maxZoom);
      if (this.zoomLevel <= 1.05) {
        this.panX = 0;
        this.panY = 0;
        this.imgContainer.classList.remove('zoomable');
      } else {
        this.imgContainer.classList.add('zoomable');
      }
      this.zoomBadge.textContent = Math.round(this.zoomLevel * 100) + '%';
      this.applyTransform();
    }

    resetZoom() {
      this.zoomLevel = 1.0;
      this.panX = 0;
      this.panY = 0;
      this.zoomBadge.textContent = '100%';
      this.imgContainer.classList.remove('zoomable');
      this.applyTransform();
    }

    applyTransform() {
      // Soft boundary clamp when zoomed in
      if (this.zoomLevel > 1.0 && this.activeImg && this.canvas) {
        const scaledW = this.activeImg.offsetWidth * this.zoomLevel;
        const scaledH = this.activeImg.offsetHeight * this.zoomLevel;
        const maxPanX = Math.max(0, (scaledW - this.canvas.offsetWidth) / 2 + 120);
        const maxPanY = Math.max(0, (scaledH - this.canvas.offsetHeight) / 2 + 120);
        this.panX = Math.max(-maxPanX, Math.min(maxPanX, this.panX));
        this.panY = Math.max(-maxPanY, Math.min(maxPanY, this.panY));
      }

      this.imgContainer.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomLevel})`;
    }

    downloadCurrent() {
      this.downloadBtn.click();
    }
  }

  // Instantiate singleton
  const lightbox = new EditorialLightbox();
  window.editorialLightbox = lightbox;

  /**
   * Helper: Discovers all photos in a gallery container (e.g. Conference or 30-Years stages)
   */
  function discoverGalleryItems(container) {
    if (!container) return [];
    const items = [];

    // Check thumbnail elements
    const thumbs = container.querySelectorAll('.conf-thumb-item, .thumb-box, [data-gallery-thumb]');
    thumbs.forEach(t => {
      const img = t.querySelector('img');
      if (img) {
        let fullSrc = img.src;
        let caption = img.alt || '';

        // Extract from onclick="switchPhoto('src', 'caption', ...)"
        const onclickAttr = t.getAttribute('onclick') || '';
        const match = onclickAttr.match(/switchPhoto\(\s*['"]([^'"]+)['"]\s*,\s*['"]([^'"]*)['"]/);
        if (match) {
          fullSrc = match[1];
          if (match[2]) caption = match[2];
        } else {
          const matchSingle = onclickAttr.match(/switchPhoto\(\s*['"]([^'"]+)['"]/);
          if (matchSingle) fullSrc = matchSingle[1];
        }

        items.push({
          src: fullSrc,
          alt: img.alt || 'Gallery photo',
          caption: caption || img.alt || 'BFIAA Photographic Archive'
        });
      }
    });

    // Fallback: main display image if no thumbs found
    if (items.length === 0) {
      const mainImg = container.querySelector('#activePhoto') || container.querySelector('.main-photo-frame img') || container.querySelector('.conf-main-display img') || container.querySelector('img');
      if (mainImg) {
        items.push({
          src: mainImg.src,
          alt: mainImg.alt || 'Photographic Record',
          caption: mainImg.alt || 'BFIAA Photographic Archive'
        });
      }
    }

    return items;
  }

  /**
   * Universal openLightbox: Works across all pages and binds seamlessly to on-page state
   */
  window.openLightbox = function(customSrc, customCaption) {
    // 1. If explicit src is provided
    if (customSrc && typeof customSrc === 'string') {
      // Find if this image belongs to a gallery on the page
      const gallery = document.querySelector('.conf-gallery-container, .photo-stage-card, [data-gallery-container]');
      if (gallery) {
        const items = discoverGalleryItems(gallery);
        const idx = items.findIndex(it => it.src.includes(customSrc) || customSrc.includes(it.src));
        if (idx !== -1) {
          lightbox.open(items, idx, syncPageStage);
          return;
        }
      }
      // Otherwise open as standalone photo with zoom
      lightbox.open([{
        src: customSrc,
        alt: customCaption || 'Archival Photograph',
        caption: customCaption || 'BFIAA Archival View'
      }], 0);
      return;
    }

    // 2. Discover active gallery on current page
    const gallery = document.querySelector('.conf-gallery-container, .photo-stage-card, [data-gallery-container]');
    if (gallery) {
      const items = discoverGalleryItems(gallery);
      if (items.length > 0) {
        const activeImg = gallery.querySelector('#activePhoto') || gallery.querySelector('.conf-main-display img') || gallery.querySelector('.main-photo-frame img');
        let currentSrc = activeImg ? (activeImg.getAttribute('src') || activeImg.src) : '';
        let startIdx = items.findIndex(it => it.src.includes(currentSrc) || currentSrc.includes(it.src));
        if (startIdx < 0) startIdx = 0;

        lightbox.open(items, startIdx, syncPageStage);
        return;
      }
    }

    // 3. Check for standalone flyer / cover
    const standaloneImg = document.querySelector('.flyer-frame img, .pub-cover-frame img');
    if (standaloneImg) {
      lightbox.open([{
        src: standaloneImg.src,
        alt: standaloneImg.alt || 'Official Flyer',
        caption: standaloneImg.alt || 'BFIAA Document'
      }], 0);
    }
  };

  window.closeLightbox = function() {
    lightbox.close();
  };

  /**
   * Synchronizes page UI when navigating inside lightbox
   */
  function syncPageStage(newSrc, newCaption, newIndex) {
    const gallery = document.querySelector('.conf-gallery-container, .photo-stage-card');
    if (!gallery) return;

    // Update main active photo on page
    const activePhoto = gallery.querySelector('#activePhoto');
    if (activePhoto && activePhoto.src !== newSrc) {
      activePhoto.src = newSrc;
    }

    // Update captions and counters if present
    const captionEl = document.getElementById('photoCaption');
    if (captionEl && newCaption) captionEl.textContent = newCaption;

    const counterEl = document.getElementById('photoCounter');
    if (counterEl) counterEl.textContent = `Photo ${newIndex + 1} of ${lightbox.items.length}`;

    const downloadBtn = document.getElementById('downloadPhotoBtn') || document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.href = newSrc;
    }

    // Update active thumbnail on page
    const thumbs = gallery.querySelectorAll('.conf-thumb-item, .thumb-box');
    thumbs.forEach((t, i) => {
      if (i === newIndex) t.classList.add('active');
      else t.classList.remove('active');
    });
  }

  /**
   * Auto-bind click handlers to gallery elements and flyers on DOM load
   */
  function autoBindPhotoViews() {
    // 1. Main gallery photos and inspection buttons
    document.querySelectorAll('#openLightboxBtn, #viewFullBtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.openLightbox();
      });
    });

    // 2. Click on active main photos directly
    document.querySelectorAll('.conf-main-display img, .main-photo-frame img, #activePhoto').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        window.openLightbox();
      });
    });

    // 3. Standalone Event Flyers & Publication Covers
    document.querySelectorAll('.flyer-frame img, .pub-cover-frame img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        window.openLightbox(img.src, img.alt);
      });
    });

    document.querySelectorAll('.flyer-btn-gold, .pub-action-btn.gold').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href && (href.endsWith('.jpg') || href.endsWith('.png') || href.endsWith('.webp') || href.includes('/images/'))) {
          e.preventDefault();
          window.openLightbox(href, btn.textContent.trim());
        }
      });
    });
  }

  // Initialize auto-binding
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoBindPhotoViews);
  } else {
    autoBindPhotoViews();
  }

})();
