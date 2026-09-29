// patch_carousel_default_pos.js
// Fixes:
// 1. Default start at index 1 → cards visible on BOTH sides on load
// 2. Red YouTube play button on any film with a watchUrl
//    (clicking the button opens YouTube, not the alumni profile)

const fs   = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 1. DEFAULT START POSITION — change `let current = 0` → `let current = 1`
//    Index 1 = Phera: one card (Madhukar) on left, rest on right
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
  '    let current = 0;\n    const total = FEATURED.length;',
  '    let current = 1; // Start at index 1 so cards appear on BOTH sides\n    const total = FEATURED.length;'
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. RED YOUTUBE PLAY BUTTON — add CSS for the badge
// ─────────────────────────────────────────────────────────────────────────────
const ytBadgeCSS = `
  /* ── YOUTUBE RED PLAY BADGE ─────────────────────────────────────────────── */
  .afs-yt-badge {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 36px;
    height: 26px;
    background: #FF0000;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    box-shadow: 0 2px 8px rgba(0,0,0,0.55);
    transition: transform 0.2s ease, background 0.2s ease;
    text-decoration: none;
    flex-shrink: 0;
  }
  .afs-yt-badge:hover {
    background: #cc0000;
    transform: scale(1.12);
  }
  .afs-yt-badge:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #FF0000;
  }
  .afs-yt-badge svg {
    display: block;
    flex-shrink: 0;
  }

`;

// Insert before the closing </style> of the showcase section
html = html.replace(
  '  /* Reduced motion */\n  @media (prefers-reduced-motion: reduce) {',
  ytBadgeCSS + '  /* Reduced motion */\n  @media (prefers-reduced-motion: reduce) {'
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. REPLACE buildCard function — add red YouTube badge when watchUrl exists
//    Also remove the old gold play overlay (replaced by the badge)
// ─────────────────────────────────────────────────────────────────────────────
const OLD_BUILD_CARD = `    // ── BUILD CARDS ─────────────────────────────────────────────────────────
    function buildCard(film, index) {
      const href = "alumni/" + film.alumnusSlug + ".html#" + film.filmAnchor;
      const card = document.createElement('a');
      card.href = href;
      card.className = 'afs-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', film.titleEn + " by " + film.alumnusName);
      card.dataset.index = index;

      // Image wrapper
      const imgWrap = document.createElement('div');
      imgWrap.style.cssText = 'position:relative;';

      const img = document.createElement('img');
      img.src = film.poster;
      img.alt = film.titleEn + " — Film Poster";
      img.className = 'afs-poster';
      img.loading = index === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';

      // format badge
      const badge = document.createElement('div');
      badge.className = 'afs-format-badge';
      badge.textContent = film.format;

      // play overlay
      const playOverlay = document.createElement('div');
      playOverlay.className = 'afs-play-overlay';
      playOverlay.setAttribute('aria-hidden', 'true');
      if (film.watchUrl) {
        playOverlay.innerHTML = '<div class="afs-play-icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" style="fill:rgba(210,173,107,0.9)"></polygon></svg></div>';
      }

      imgWrap.appendChild(img);
      imgWrap.appendChild(badge);
      imgWrap.appendChild(playOverlay);

      // Meta bottom
      const meta = document.createElement('div');
      meta.className = 'afs-card-meta';

      const metaBar = document.createElement('div');
      metaBar.className = 'afs-card-meta-bar';
      [film.year, film.duration, film.format].forEach(txt => {
        const s = document.createElement('span');
        s.textContent = txt;
        metaBar.appendChild(s);
      });

      const titleBn = document.createElement('h3');
      titleBn.className = 'afs-card-title-bn';
      titleBn.textContent = film.titleBn;

      const titleEn = document.createElement('h4');
      titleEn.className = 'afs-card-title-en';
      titleEn.textContent = film.titleEn;

      const byLine = document.createElement('p');
      byLine.className = 'afs-card-by';
      byLine.textContent = 'BY OUR ALUMNI — ' + film.alumnusName.toUpperCase();

      meta.appendChild(metaBar);
      meta.appendChild(titleBn);
      meta.appendChild(titleEn);
      meta.appendChild(byLine);

      card.appendChild(imgWrap);
      card.appendChild(meta);

      // Keyboard: Enter/Space navigates
      card.addEventListener('click', (e) => {
        if (index !== current) {
          e.preventDefault();
          goTo(index);
        }
      });

      return card;
    }`;

const NEW_BUILD_CARD = `    // ── BUILD CARDS ─────────────────────────────────────────────────────────
    function buildCard(film, index) {
      const href = "alumni/" + film.alumnusSlug + ".html#" + film.filmAnchor;
      const card = document.createElement('a');
      card.href = href;
      card.className = 'afs-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', film.titleEn + " by " + film.alumnusName);
      card.dataset.index = index;

      // ── Image wrapper ──
      const imgWrap = document.createElement('div');
      imgWrap.style.cssText = 'position:relative;overflow:hidden;';

      const img = document.createElement('img');
      img.src = film.poster;
      img.alt = film.titleEn + " — Film Poster";
      img.className = 'afs-poster';
      img.loading = index <= 2 ? 'eager' : 'lazy';
      img.decoding = 'async';

      // Format badge (top-left)
      const fmtBadge = document.createElement('div');
      fmtBadge.className = 'afs-format-badge';
      fmtBadge.textContent = film.format;

      imgWrap.appendChild(img);
      imgWrap.appendChild(fmtBadge);

      // ── RED YOUTUBE BADGE (bottom-right) — only if watchUrl exists ──
      if (film.watchUrl) {
        const ytBadge = document.createElement('a');
        ytBadge.className = 'afs-yt-badge';
        ytBadge.href = film.watchUrl;
        ytBadge.target = '_blank';
        ytBadge.rel = 'noopener noreferrer';
        ytBadge.setAttribute('aria-label', 'Watch ' + film.titleEn + ' on YouTube');
        // Classic YouTube play triangle
        ytBadge.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4" fill="white"/></svg>';

        // CRITICAL: stop the card's click from firing when the badge is clicked
        ytBadge.addEventListener('click', function(e) {
          e.stopPropagation(); // Don't navigate to alumni profile
        });

        imgWrap.appendChild(ytBadge);
      }

      // ── Card Meta (bottom) ──
      const meta = document.createElement('div');
      meta.className = 'afs-card-meta';

      const metaBar = document.createElement('div');
      metaBar.className = 'afs-card-meta-bar';
      [film.year, film.duration, film.format].forEach(function(txt) {
        const s = document.createElement('span');
        s.textContent = txt;
        metaBar.appendChild(s);
      });

      const titleBn = document.createElement('h3');
      titleBn.className = 'afs-card-title-bn';
      titleBn.textContent = film.titleBn;

      const titleEn = document.createElement('h4');
      titleEn.className = 'afs-card-title-en';
      titleEn.textContent = film.titleEn;

      const byLine = document.createElement('p');
      byLine.className = 'afs-card-by';
      byLine.textContent = 'BY OUR ALUMNI — ' + film.alumnusName.toUpperCase();

      meta.appendChild(metaBar);
      meta.appendChild(titleBn);
      meta.appendChild(titleEn);
      meta.appendChild(byLine);

      card.appendChild(imgWrap);
      card.appendChild(meta);

      // Click: if not center card, navigate carousel; if center, follow href normally
      card.addEventListener('click', function(e) {
        if (index !== current) {
          e.preventDefault();
          goTo(index);
        }
        // If center: let the <a> href navigate to alumni profile normally
      });

      return card;
    }`;

if (html.includes(OLD_BUILD_CARD)) {
  html = html.replace(OLD_BUILD_CARD, NEW_BUILD_CARD);
  console.log('  ✓ buildCard() replaced with YouTube badge support');
} else {
  console.log('  ✗ Could not find old buildCard() — check for changes in inject script');
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Remove the old gold play overlay CSS (no longer used)
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
  `  /* Play overlay for center card */
  .afs-play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: rgba(0,0,0,0.25);
    border-radius: 14px 14px 0 0;
  }
  .afs-card.afs-center .afs-play-overlay { opacity: 1; }
  .afs-play-icon {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(210,173,107,0.18);
    border: 1.5px solid rgba(210,173,107,0.6);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .afs-card.afs-center:hover .afs-play-icon {
    transform: scale(1.1);
    background: rgba(210,173,107,0.3);
  }`,
  '  /* Gold play overlay removed — replaced by red YouTube badge */'
);

// ─────────────────────────────────────────────────────────────────────────────
// Save & verify
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(indexPath, html, 'utf8');
const updated = fs.readFileSync(indexPath, 'utf8');

const checks = {
  'Default index = 1 (cards both sides)': updated.includes('let current = 1;'),
  'Red YouTube badge CSS':                updated.includes('.afs-yt-badge'),
  'Badge background: #FF0000':            updated.includes('#FF0000'),
  'Badge bottom-right position':          updated.includes('bottom: 10px') && updated.includes('right: 10px'),
  'stopPropagation on badge click':       updated.includes('e.stopPropagation()'),
  'Badge opens YouTube new tab':          updated.includes('target = \'_blank\''),
  'Old gold overlay removed':             !updated.includes('afs-play-overlay {'),
};

console.log('\n=== PATCH VERIFICATION ===');
for (const [label, ok] of Object.entries(checks)) {
  console.log('  ' + (ok ? '✓' : '✗') + ' ' + label);
}
console.log('\n  File size: ' + Math.round(updated.length / 1024) + ' KB');
console.log('  Preview:   http://localhost:3232/#alumni-films');
