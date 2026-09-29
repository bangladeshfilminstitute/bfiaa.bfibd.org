// optimize_images.js
// Optimizes all images in the BFIBD Website-Antigravity/images directory
// - Converts heavy PNGs (non-logo/non-transparent) to JPEG
// - Compresses JPEGs to quality 82 (visually lossless)
// - Converts large JPEGs to WebP for modern browsers (keeps originals)
// - Resizes oversized images (hero/magazine scans > 2000px wide)
// - Skips logos (bfiaa-logo*.png, bfi-logo.png) — must stay PNG for transparency

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const CONCEPT_IMG = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'images');

// Files to SKIP optimization (logos with transparency, already WebP)
const SKIP_FILES = new Set([
  'bfiaa-logo.png', 'bfiaa-logo-03.png', 'bfiaa-logo-alt.png',
  'bfi-logo.png', 'bfiaa-logo.png',
]);

const SKIP_EXTENSIONS = new Set(['.webp', '.svg', '.gif', '.ico']);

// Settings
const JPEG_QUALITY = 82;           // Visually lossless (85 is standard, 82 saves ~10% more)
const PNG_QUALITY = [65, 80];      // min/max for PNG->PNG compression
const MAX_WIDTH = 2000;            // Max width before downscaling
const LARGE_THRESHOLD = 300 * 1024; // 300KB — optimize anything above this

let totalSaved = 0;
let processedCount = 0;
let skippedCount = 0;
const results = [];

async function getImageInfo(filePath) {
  try {
    const meta = await sharp(filePath).metadata();
    return meta;
  } catch (e) {
    return null;
  }
}

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const originalSize = fs.statSync(filePath).size;

  // Skip WebP, SVG, GIF
  if (SKIP_EXTENSIONS.has(ext)) {
    skippedCount++;
    return;
  }

  // Skip logo files (need transparency)
  if (SKIP_FILES.has(fileName)) {
    skippedCount++;
    console.log(`  [SKIP] ${fileName.padEnd(50)} — Logo/transparent, preserving`);
    return;
  }

  // Skip small files that are already well-optimized
  if (originalSize < LARGE_THRESHOLD) {
    skippedCount++;
    return;
  }

  const meta = await getImageInfo(filePath);
  if (!meta) {
    console.log(`  [ERROR] Cannot read: ${fileName}`);
    return;
  }

  const tempPath = filePath + '.tmp';

  try {
    let pipeline = sharp(filePath);

    // Resize if wider than MAX_WIDTH
    if (meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
    }

    // PNG with transparency → keep as PNG but compress
    // PNG without transparency that's large → convert to JPEG
    if (ext === '.png') {
      const hasAlpha = meta.channels === 4 || meta.hasAlpha;
      if (hasAlpha) {
        // Compress PNG in-place
        await pipeline.png({ compressionLevel: 9, effort: 10 }).toFile(tempPath);
      } else {
        // Convert to JPEG (no transparency needed)
        const jpegPath = filePath.replace(/\.png$/i, '.jpg');
        await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tempPath);
        const newSize = fs.statSync(tempPath).size;
        const saved = originalSize - newSize;
        if (saved > 0) {
          // Replace PNG with JPEG
          fs.renameSync(tempPath, jpegPath);
          // Keep original PNG for now, just report
          const savedKB = Math.round(saved / 1024);
          const pct = Math.round((saved / originalSize) * 100);
          results.push({ file: fileName, action: 'PNG→JPG', originalKB: Math.round(originalSize/1024), newKB: Math.round(newSize/1024), savedKB, pct });
          console.log(`  [PNG→JPG] ${fileName.padEnd(50)} ${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB  (saved ${savedKB}KB, ${pct}%)`);
          totalSaved += saved;
          processedCount++;
          return;
        } else {
          fs.unlinkSync(tempPath);
          skippedCount++;
          return;
        }
      }
    } else if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tempPath);
    } else {
      skippedCount++;
      return;
    }

    const newSize = fs.statSync(tempPath).size;
    const saved = originalSize - newSize;

    if (saved > 1024) { // Only replace if we actually saved > 1KB
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      const savedKB = Math.round(saved / 1024);
      const pct = Math.round((saved / originalSize) * 100);
      results.push({ file: path.relative(CONCEPT_IMG, filePath), action: 'Compress', originalKB: Math.round(originalSize/1024), newKB: Math.round(newSize/1024), savedKB, pct });
      console.log(`  [OK]  ${path.relative(CONCEPT_IMG, filePath).padEnd(55)} ${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB  (saved ${savedKB}KB, ${pct}%)`);
      totalSaved += saved;
      processedCount++;
    } else {
      fs.unlinkSync(tempPath);
      skippedCount++;
    }
  } catch (err) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.log(`  [ERROR] ${fileName}: ${err.message}`);
  }
}

async function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

async function main() {
  console.log('='.repeat(80));
  console.log('BFIAA IMAGE OPTIMIZER — Sharp (MozJPEG)');
  console.log('='.repeat(80));
  console.log(`Target: ${CONCEPT_IMG}`);
  console.log(`JPEG Quality: ${JPEG_QUALITY} | Max Width: ${MAX_WIDTH}px | Threshold: ${LARGE_THRESHOLD/1024}KB`);
  console.log('='.repeat(80) + '\n');

  const beforeTotal = (() => {
    let t = 0;
    function sumDir(d) {
      fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
        if (e.isDirectory()) sumDir(path.join(d, e.name));
        else t += fs.statSync(path.join(d, e.name)).size;
      });
    }
    sumDir(CONCEPT_IMG);
    return t;
  })();

  await walkDir(CONCEPT_IMG);

  const afterTotal = (() => {
    let t = 0;
    function sumDir(d) {
      fs.readdirSync(d, { withFileTypes: true }).forEach(e => {
        if (e.isDirectory()) sumDir(path.join(d, e.name));
        else t += fs.statSync(path.join(d, e.name)).size;
      });
    }
    sumDir(CONCEPT_IMG);
    return t;
  })();

  console.log('\n' + '='.repeat(80));
  console.log('OPTIMIZATION COMPLETE');
  console.log('='.repeat(80));
  console.log(`  Processed (optimized): ${processedCount} images`);
  console.log(`  Skipped (already OK):  ${skippedCount} images`);
  console.log(`  Before:  ${(beforeTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  After:   ${(afterTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Saved:   ${(totalSaved / 1024 / 1024).toFixed(2)} MB  (${Math.round(totalSaved/beforeTotal*100)}% reduction)`);
  console.log('='.repeat(80));

  if (results.length > 0) {
    console.log('\nTOP SAVINGS:');
    results.sort((a, b) => b.savedKB - a.savedKB).slice(0, 10).forEach(r => {
      console.log(`  ${r.file.padEnd(55)} ${r.originalKB}KB → ${r.newKB}KB  (-${r.savedKB}KB, ${r.pct}%)`);
    });
  }
}

main().catch(console.error);
