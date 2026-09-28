/**
 * BFIAA Cinematic Editorial Lightbox Engine
 * Full keyboard and mouse interactive gallery viewer:
 * - Zoom in / out (wheel, double click, buttons, keyboard +, -)
 * - Drag / pan when zoomed in
 * - Prev / Next navigation (arrows, keyboard ArrowLeft, ArrowRight, touch swipe)
 * - Bottom interactive thumbnail filmstrip showing all other photos
 * - Download archive / high-res
 * - Keyboard shortcuts: Esc, ←, →, +, -, 0, D
 */

(function() {
  'use strict';

  class EditorialLightbox {
    constructor() {
      this.items = [];
      this.currentIndex = 0;
      this.zoomLevel = 1;
      this.minZoom = 0.5;
      this.maxZoom = 4.0;
      this.zoomStep = 0.25;
      this.panX = 0;
      this.panY = 0;
      this.isDragging = false;
      this.dragStartX = 0;
      this.dragStartY = 0;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.isOpen = false;
      this.syncCallback = null;

      this.createDOM();
      this.attachEvents();
    }

    createDOM() {
      if (document.getElementById('bfiaaLightbox')) return;

      const overlay = document.createElement('div');
      overlay.id = 'bfiaaLightbox';
      overlay.className = 'bfiaa-lightbox';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Photo Lightbox Gallery');
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
            <span class="lb-sep">/</span>
            <span class="lb-caption" id="lbCaption">BFIAA Gallery</span>
          </div>
          <div class="lb-controls">
            <button class="lb-btn" id="lbZoomOut" title="Zoom Out (-)" aria-label="Zoom Out">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
            <span class="lb-zoom-badge" id="lbZoomBadge">100%</span>
            <button class="lb-btn" id="lbZoomIn" title="Zoom In (+)" aria-label="Zoom In">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </button>
            <button class="lb-btn" id="lbZoomReset" title="Reset Zoom (0)" aria-label="Reset Zoom">1:1</button>
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
          <button class="lb-nav-arrow lb-prev" id="lbPrev" aria-label="Previous Photo" title="Previous (←)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div class="lb-canvas" id="lbCanvas">
            <div class="lb-img-container" id="lbImgContainer">
              <img id="lbActiveImg" src="" alt="Gallery Image" draggable="false" />
            </div>
          </div>
          <button class="lb-nav-arrow lb-next" id="lbNext" aria-label="Next Photo" title="Next (→)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>

        <div class="lb-tray">
          <div class="lb-strip-wrap">
            <div class="lb-filmstrip" id="lbFilmstrip"></div>
          </div>
          <div class="lb-shortcuts-hint">
            <span>← / → Navigate</span>
            <span>•</span>
            <span>Scroll / Pinch Zoom</span>
            <span>•</span>
            <span>Drag to Pan</span>
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
      this.zoomBadge = document.getElementById('lbZoomBadge');
      this.downloadBtn = document.getElementById('lbDownload');
      this.filmstrip = document.getElementById('lbFilmstrip');
      this.prevBtn = document.getElementById('lbPrev');
      this.nextBtn = document.getElementById('lbNext');
    }

    attachEvents() {
      document.getElementById('lbClose').addEventListener('click', () => this.close());
      document.getElementById('lbZoomIn').addEventListener('click', () => this.zoom(this.zoomStep));
      document.getElementById('lbZoomOut').addEventListener('click', () => this.zoom(-this.zoomStep));
      document.getElementById('lbZoomReset').addEventListener('click', () => this.resetZoom());
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());

      // Double click to toggle 1x / 2.5x zoom
      this.canvas.addEventListener('dblclick', (e) => {
        if (this.zoomLevel > 1) {
          this.resetZoom();
        } else {
          this.setZoom(2.2);
        }
      });

      // Mouse wheel zoom
      this.canvas.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? this.zoomStep : -this.zoomStep;
        this.zoom(delta);
      }, { passive: false });

      // Mouse Drag / Pan
      this.canvas.addEventListener('mousedown', (e) => {
        if (e.target.closest('.lb-nav-arrow')) return;
        if (this.zoomLevel > 1) {
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

      // Touch events for mobile swipe & pan
      this.canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          this.touchStartX = e.touches[0].clientX;
          this.touchStartY = e.touches[0].clientY;
          if (this.zoomLevel > 1) {
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
        } else if (this.zoomLevel === 1 && e.changedTouches.length === 1) {
          const deltaX = e.changedTouches[0].clientX - this.touchStartX;
          const deltaY = e.changedTouches[0].clientY - this.touchStartY;
          if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 60) {
            if (deltaX < 0) this.next();
            else this.prev();
          }
        }
      }, { passive: true });

      // Close on canvas click if 1x zoom and clicked background
      this.canvas.addEventListener('click', (e) => {
        if (e.target === this.canvas && this.zoomLevel === 1) {
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

      this.renderFilmstrip();
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
        thumb.innerHTML = `<img src="${item.src}" alt="${item.alt || ''}" />`;
        thumb.addEventListener('click', () => this.showIndex(idx));
        this.filmstrip.appendChild(thumb);
      });
    }

    showIndex(index) {
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

      // Update filmstrip active state
      const thumbs = this.filmstrip.querySelectorAll('.lb-thumb');
      thumbs.forEach((t, i) => {
        if (i === index) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          t.classList.remove('active');
        }
      });

      // Notify page stage if callback provided
      if (typeof this.syncCallback === 'function') {
        this.syncCallback(item.src, index);
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
      if (this.zoomLevel <= 1) {
        this.panX = 0;
        this.panY = 0;
      }
      this.zoomBadge.textContent = Math.round(this.zoomLevel * 100) + '%';
      this.applyTransform();
    }

    resetZoom() {
      this.zoomLevel = 1;
      this.panX = 0;
      this.panY = 0;
      this.zoomBadge.textContent = '100%';
      this.applyTransform();
    }

    applyTransform() {
      this.imgContainer.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomLevel})`;
      if (this.zoomLevel > 1) {
        this.imgContainer.classList.add('zoomable');
      } else {
        this.imgContainer.classList.remove('zoomable');
      }
    }

    downloadCurrent() {
      this.downloadBtn.click();
    }
  }

  // Initialize singleton
  window.editorialLightbox = new EditorialLightbox();

  // Helper to auto-bind photo stage cards
  window.bindPhotoStageToLightbox = function(stageCardSelector = '.photo-stage-card') {
    const card = document.querySelector(stageCardSelector);
    if (!card) return;

    const mainImg = card.querySelector('.main-photo-frame img') || card.querySelector('#activePhoto');
    const thumbBoxes = card.querySelectorAll('.thumbnails-strip .thumb-box');
    const viewBtn = card.querySelector('#viewFullBtn') || card.querySelector('.gold-btn');

    // Build items from thumbnails
    const items = [];
    thumbBoxes.forEach(box => {
      const img = box.querySelector('img');
      if (img) {
        // Look up onclick or direct src
        let fullSrc = img.src;
        const onclickAttr = box.getAttribute('onclick') || '';
        const match = onclickAttr.match(/switchPhoto\(['"]([^'"]+)['"]/);
        if (match && match[1]) fullSrc = match[1];

        items.push({
          src: fullSrc,
          alt: img.alt || 'Gallery photo',
          caption: img.alt || 'Conference Assembly'
        });
      }
    });

    if (items.length === 0 && mainImg) {
      items.push({ src: mainImg.src, alt: mainImg.alt, caption: mainImg.alt });
    }

    function openAtCurrent() {
      const currentSrc = (mainImg.getAttribute('src') || mainImg.src);
      let startIdx = items.findIndex(item => item.src.includes(currentSrc) || currentSrc.includes(item.src));
      if (startIdx < 0) startIdx = 0;

      window.editorialLightbox.open(items, startIdx, (newSrc, idx) => {
        // Sync on-page stage
        if (mainImg) {
          mainImg.src = newSrc;
        }
        thumbBoxes.forEach((tb, i) => {
          if (i === idx) tb.classList.add('active');
          else tb.classList.remove('active');
        });
        const dBtn = card.querySelector('#downloadBtn');
        if (dBtn) dBtn.href = newSrc;
        if (viewBtn) viewBtn.href = newSrc;
      });
    }

    if (mainImg) {
      mainImg.style.cursor = 'zoom-in';
      mainImg.addEventListener('click', openAtCurrent);
    }
    if (viewBtn) {
      viewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openAtCurrent();
      });
    }
  };

  // Auto initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    window.bindPhotoStageToLightbox();
  });
})();
