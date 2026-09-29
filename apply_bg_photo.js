const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update HTML layer structure
const oldLayer = `<div class="afs-bg-layer" aria-hidden="true">
      <div class="afs-grain"></div>
      <div class="afs-vignette"></div>
      <div class="afs-radial-glow"></div>
    </div>`;

const newLayer = `<div class="afs-bg-layer" aria-hidden="true">
      <div class="afs-bg-photo"></div>
      <div class="afs-bg-overlay"></div>
      <div class="afs-grain"></div>
      <div class="afs-vignette"></div>
      <div class="afs-radial-glow"></div>
    </div>`;

if (html.includes(oldLayer)) {
  html = html.replace(oldLayer, newLayer);
  console.log('✓ Replaced HTML bg-layer');
} else {
  console.log('⚠ oldLayer exact match not found, checking alternatives...');
}

// 2. Update CSS
const oldCss = `/* BG Layers */
  .afs-bg-layer { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
  .afs-grain {`;

const newCss = `/* BG Layers */
  .afs-bg-layer { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
  .afs-bg-photo {
    position: absolute;
    inset: 0;
    background-image: url('images/alumni-films-bg.webp');
    background-size: cover;
    background-position: center 25%;
    background-repeat: no-repeat;
    opacity: 0.38;
    filter: brightness(0.70) contrast(1.18) saturate(0.85);
    transform: scale(1.02);
  }
  .afs-bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(6, 16, 13, 0.94) 0%,
      rgba(6, 16, 13, 0.50) 28%,
      rgba(6, 16, 13, 0.72) 65%,
      rgba(6, 16, 13, 0.96) 100%
    );
  }
  .afs-grain {`;

if (html.includes(oldCss)) {
  html = html.replace(oldCss, newCss);
  console.log('✓ Replaced CSS rules');
} else {
  console.log('⚠ oldCss exact match not found');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Done updating index.html');
