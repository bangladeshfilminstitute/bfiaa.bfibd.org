// patch_carousel.js — applies 3 fixes to the alumni showcase section in index.html
// 1. Rename "See All Films" → "See Alumni Films"
// 2. Open films.html in a new tab
// 3. Add 4s auto-advance with pause on hover / focus / touch / hidden tab

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// ─── 1. Button: rename + new tab ──────────────────────────────────────────
html = html.replace(
  'href="films.html" class="afs-see-all-btn" aria-label="See all alumni films"',
  'href="films.html" class="afs-see-all-btn" target="_blank" rel="noopener" aria-label="See all alumni films"'
);

// Rename button label text (just the visible text, keep SVG intact)
html = html.replace(
  '\n          See All Films\n',
  '\n          See Alumni Films\n'
);

// ─── 2. Auto-advance code block ────────────────────────────────────────────
const AUTO_BLOCK = `
    // ── AUTO-ADVANCE ─────────────────────────────────────────────────────
    const AUTO_DELAY = 4000;
    let autoTimer = null;

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(function() {
        var next = (current + 1 < total) ? current + 1 : 0;
        goTo(next);
      }, AUTO_DELAY);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    var showcase = document.getElementById('alumni-films');
    if (showcase) {
      showcase.addEventListener('mouseenter', stopAuto);
      showcase.addEventListener('mouseleave', startAuto);
      showcase.addEventListener('focusin',    stopAuto);
      showcase.addEventListener('focusout',   startAuto);
      showcase.addEventListener('touchstart', stopAuto,                         { passive: true });
      showcase.addEventListener('touchend',   function(){ setTimeout(startAuto, 2000); }, { passive: true });
    }

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) { stopAuto(); } else { startAuto(); }
    });

    startAuto();

`;

// Insert the auto-advance block right before the INIT comment
const INIT_ANCHOR = '    // ── INIT ─────────────────────────────────────────────────────────────';
if (html.includes(INIT_ANCHOR)) {
  // Only add if not already present
  if (!html.includes('AUTO_DELAY')) {
    html = html.replace(INIT_ANCHOR, AUTO_BLOCK + INIT_ANCHOR);
    console.log('  ✓ Auto-advance block inserted');
  } else {
    console.log('  — Auto-advance already present, skipping');
  }
} else {
  console.log('  ✗ Could not find INIT anchor — check markup');
}

// ─── 3. Write back ────────────────────────────────────────────────────────
fs.writeFileSync(indexPath, html, 'utf8');

// Verify
const updated = fs.readFileSync(indexPath, 'utf8');
const checks = {
  'Button renamed (See Alumni Films)': updated.includes('See Alumni Films'),
  'Button opens new tab (target=_blank)': updated.includes('target="_blank"'),
  'Auto-advance timer (setInterval)': updated.includes('setInterval'),
  'Pause on hover': updated.includes('mouseenter'),
  'Pause on touch': updated.includes('touchstart'),
  'Pause when hidden': updated.includes('visibilitychange'),
  'startAuto() called': updated.includes('startAuto();'),
};

console.log('\n=== PATCH VERIFICATION ===');
for (const [label, ok] of Object.entries(checks)) {
  console.log('  ' + (ok ? '✓' : '✗') + ' ' + label);
}
console.log('\n  File size: ' + Math.round(updated.length / 1024) + ' KB');
console.log('  Preview:  http://localhost:3232/#alumni-films');
