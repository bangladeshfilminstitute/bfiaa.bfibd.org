// patch_carousel_smooth.js
// Fixes:
// 1. Reduce poster sizes (center 260→240px, side 200px fixed)
// 2. Auto-advance: 4000ms → 3000ms
// 3. Jerk fix: all cards use FIXED DOM width, only scale() changes visually
//              so offsetLeft never changes mid-transition → no layout reflow

const fs   = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// ─────────────────────────────────────────────────────────────────────────────
// 1. FIX JERK + REDUCE SIZE — replace card CSS block
// Old approach used different `width` per state → layout reflow → jerk
// New approach: ALL cards same DOM width (200px), only scale() differs
// ─────────────────────────────────────────────────────────────────────────────

// Replace the card CSS rules
html = html.replace(
  `  /* ── FILM CARD ── */
  .afs-card {
    flex: 0 0 auto;
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition:
      transform   0.55s var(--afs-ease),
      opacity     0.55s var(--afs-ease),
      box-shadow  0.55s var(--afs-ease),
      filter      0.55s var(--afs-ease),
      width       0.55s var(--afs-ease);
    text-decoration: none;
    display: block;
    /* default: side card */
    width: 220px;
    transform: scale(0.85);
    opacity: 0.45;
    filter: brightness(0.65) saturate(0.6);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    outline: none;
  }
  .afs-card:focus-visible {
    box-shadow: 0 0 0 3px var(--afs-accent), 0 8px 32px rgba(0,0,0,0.4);
  }
  .afs-card.afs-adjacent {
    width: 220px;
    transform: scale(0.88);
    opacity: 0.62;
    filter: brightness(0.75) saturate(0.7);
    box-shadow: 0 12px 40px rgba(0,0,0,0.45);
  }
  .afs-card.afs-center {
    width: 300px;
    transform: scale(1.0);
    opacity: 1;
    filter: brightness(1) saturate(1);
    box-shadow:
      0 0 0 1.5px var(--afs-accent),
      0 24px 80px rgba(0,0,0,0.65),
      0 0 60px var(--afs-glow);
    z-index: 10;
  }`,

  `  /* ── FILM CARD — fixed DOM width, scale-only visual states (no layout reflow) ── */
  .afs-card {
    flex: 0 0 200px;           /* FIXED width: no layout shift during transition  */
    width: 200px;
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    /* Transition only non-layout properties → butter-smooth, zero jerk */
    transition:
      transform   0.55s var(--afs-ease),
      opacity     0.55s var(--afs-ease),
      box-shadow  0.55s var(--afs-ease),
      filter      0.55s var(--afs-ease);
    text-decoration: none;
    display: block;
    /* default: far side card */
    transform: scale(0.82);
    opacity: 0.42;
    filter: brightness(0.60) saturate(0.55);
    box-shadow: 0 8px 28px rgba(0,0,0,0.38);
    outline: none;
    will-change: transform, opacity, filter;
  }
  .afs-card:focus-visible {
    box-shadow: 0 0 0 3px var(--afs-accent), 0 8px 28px rgba(0,0,0,0.4);
  }
  .afs-card.afs-adjacent {
    /* Same DOM width — only scale and appearance change */
    transform: scale(0.90);
    opacity: 0.60;
    filter: brightness(0.72) saturate(0.68);
    box-shadow: 0 12px 36px rgba(0,0,0,0.42);
  }
  .afs-card.afs-center {
    /* Center: scale UP visually but DOM width stays 200px → no reflow */
    transform: scale(1.12);
    opacity: 1;
    filter: brightness(1) saturate(1);
    box-shadow:
      0 0 0 1.5px var(--afs-accent),
      0 20px 70px rgba(0,0,0,0.60),
      0 0 50px var(--afs-glow);
    z-index: 10;
  }`
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. Fix responsive card sizes to match new fixed approach
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
  `  @media (max-width: 1200px) {
    .afs-card.afs-center { width: 260px; }
    .afs-card, .afs-card.afs-adjacent { width: 190px; }
    .afs-heading { font-size: 3rem; }
  }
  @media (max-width: 900px) {
    .alumni-film-showcase { padding: 72px 0 60px; }
    .afs-header { flex-direction: column; gap: 0; margin-bottom: 48px; }
    .afs-header-right { display: none; }
    .afs-card.afs-center { width: 230px; }
    .afs-card, .afs-card.afs-adjacent { width: 170px; }
    .afs-br-desktop { display: none; }
  }
  @media (max-width: 600px) {
    .alumni-film-showcase { padding: 60px 0 52px; }
    .afs-inner { padding: 0 16px; }
    .afs-heading { font-size: 2.2rem; }
    .afs-subtext { font-size: 0.875rem; }
    .afs-card.afs-center { width: min(68vw, 230px); }
    .afs-card, .afs-card.afs-adjacent { width: min(50vw, 170px); }
    .afs-card.afs-far { opacity: 0.15; }
    .afs-nav-btn { width: 40px; height: 40px; }
    .afs-prev { margin-right: 10px; }
    .afs-next { margin-left: 10px; }
    .afs-see-all-btn { padding: 12px 28px; font-size: 10.5px; }
  }
  @media (max-width: 400px) {
    .afs-card.afs-center { width: min(72vw, 200px); }
    .afs-card, .afs-card.afs-adjacent { width: min(52vw, 150px); }
  }`,

  `  @media (max-width: 1200px) {
    /* Fixed width cards — only gap and scale tuning needed */
    .afs-track { gap: 16px; }
    .afs-heading { font-size: 3rem; }
  }
  @media (max-width: 900px) {
    .alumni-film-showcase { padding: 72px 0 60px; }
    .afs-header { flex-direction: column; gap: 0; margin-bottom: 48px; }
    .afs-header-right { display: none; }
    .afs-card { flex: 0 0 160px; width: 160px; }
    .afs-br-desktop { display: none; }
  }
  @media (max-width: 600px) {
    .alumni-film-showcase { padding: 60px 0 52px; }
    .afs-inner { padding: 0 16px; }
    .afs-heading { font-size: 2.2rem; }
    .afs-subtext { font-size: 0.875rem; }
    .afs-card { flex: 0 0 140px; width: 140px; }
    .afs-card.afs-far { opacity: 0.12; }
    .afs-nav-btn { width: 40px; height: 40px; }
    .afs-prev { margin-right: 10px; }
    .afs-next { margin-left: 10px; }
    .afs-see-all-btn { padding: 12px 28px; font-size: 10.5px; }
  }
  @media (max-width: 400px) {
    .afs-card { flex: 0 0 120px; width: 120px; }
  }`
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. Fix scrollTrack() — with fixed-width cards offsetLeft is stable,
//    but we add a rAF delay to wait for CSS transition to settle scale
//    before recalculating center position (handles the initial load snap)
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
  `    // ── SCROLL TRACK ────────────────────────────────────────────────────────
    function scrollTrack() {
      const cards = track.querySelectorAll('.afs-card');
      if (!cards[current]) return;

      const trackOuter = track.parentElement;
      const centerCard = cards[current];
      const outerWidth = trackOuter.offsetWidth;
      const cardWidth  = centerCard.offsetWidth;

      // We want to center the current card in the outer
      let offset = centerCard.offsetLeft - (outerWidth / 2) + (cardWidth / 2);

      // Account for card gap and scale transform
      track.style.transform = 'translateX(' + (-offset) + 'px)';
    }

    function goTo(index) {
      if (index < 0 || index >= total) return;
      current = index;
      updateCards();
      requestAnimationFrame(scrollTrack);
    }`,

  `    // ── SCROLL TRACK (jerk-free: fixed DOM width, no layout reflow) ──────────
    function scrollTrack() {
      var cards = track.querySelectorAll('.afs-card');
      if (!cards[current]) return;

      var trackOuter = track.parentElement;
      var outerWidth = trackOuter.offsetWidth;

      // With fixed card width, offsetLeft is always stable — no jerk
      var centerCard = cards[current];
      var cardW = centerCard.offsetWidth; // always 200px (or responsive override)

      // Center the active card within the outer container
      var offset = centerCard.offsetLeft - (outerWidth / 2) + (cardW / 2);
      track.style.transform = 'translateX(' + (-offset) + 'px)';
    }

    function goTo(index) {
      if (index < 0 || index >= total) return;
      current = index;
      updateCards();
      // Single rAF — layout is stable (fixed widths), no need for double frame
      requestAnimationFrame(scrollTrack);
    }`
);

// ─────────────────────────────────────────────────────────────────────────────
// 4. Change auto-advance interval 4000 → 3000ms
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace('const AUTO_DELAY = 4000;', 'const AUTO_DELAY = 3000;');
html = html.replace('var AUTO_DELAY = 4000;', 'var AUTO_DELAY = 3000;');

// ─────────────────────────────────────────────────────────────────────────────
// 5. Smooth track transition — use ease-out (feels less mechanical than ease)
// ─────────────────────────────────────────────────────────────────────────────
html = html.replace(
  "    transition: transform 0.6s var(--afs-ease);",
  "    transition: transform 0.52s cubic-bezier(0.33, 1, 0.68, 1);"
);

// ─────────────────────────────────────────────────────────────────────────────
// Save
// ─────────────────────────────────────────────────────────────────────────────
fs.writeFileSync(indexPath, html, 'utf8');

// Verify
const updated = fs.readFileSync(indexPath, 'utf8');
const checks = {
  'Fixed card width (200px DOM)':          updated.includes('flex: 0 0 200px'),
  'No width transition on card':           !updated.includes('width       0.55s'),
  'Center uses scale(1.12)':               updated.includes('scale(1.12)'),
  'Auto-advance 3000ms':                   updated.includes('AUTO_DELAY = 3000'),
  'Smooth track easing (cubic-bezier)':    updated.includes('0.33, 1, 0.68, 1'),
  'Card transition (no width property)':   updated.includes('transform   0.55s var(--afs-ease),\n      opacity     0.55s var(--afs-ease),\n      box-shadow  0.55s var(--afs-ease),\n      filter      0.55s var(--afs-ease);'),
};

console.log('=== PATCH VERIFICATION ===');
for (const [label, ok] of Object.entries(checks)) {
  console.log('  ' + (ok ? '✓' : '✗') + ' ' + label);
}
console.log('\n  File size: ' + Math.round(updated.length / 1024) + ' KB');
console.log('  Preview:   http://localhost:3232/#alumni-films');
