const fs = require('fs');

// --- Update constitution.html ---
let constContent = fs.readFileSync('constitution.html', 'utf8');
constContent = constContent.replace(/\s*<span class="nav-logo-text">BFIAA<\/span>/gi, '');
fs.writeFileSync('constitution.html', constContent);

// --- Update index.html ---
let indexContent = fs.readFileSync('index.html', 'utf8');

// 1. Remove nav text
indexContent = indexContent.replace(/\s*<span class="nav-logo-text">BFIAA<\/span>/gi, '');

// 2. Change 'Selected Photos' to something nostalgic
indexContent = indexContent.replace(/\? Selected Photos/gi, '🎞️ Timeless Memories');

// 3. Add Download button to each slide
// We can do this by matching the <img src="images/30-years/...> inside saisei-slide-inner
// and appending the download link right after it.
indexContent = indexContent.replace(
  /(<img src="(images\/30-years\/[^"]+)"[^>]*>)/gi,
  `$1\n              <a href="$2" download target="_blank" class="saisei-download-btn" title="View Full / Download" style="position: absolute; top: 20px; right: 20px; background: rgba(0,0,0,0.6); color: #fff; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px); transition: all 0.3s ease; z-index: 10; border: 1px solid rgba(255,255,255,0.2);"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg></a>`
);

// Add hover effect for download button if not already there
if (!indexContent.includes('.saisei-download-btn:hover')) {
  indexContent = indexContent.replace(
    '.saisei-btn-next:hover {',
    '.saisei-btn-prev:hover, .saisei-btn-next:hover, .saisei-download-btn:hover {\n      transform: scale(1.1);\n      border-color: var(--gold) !important;\n    }\n    .saisei-btn-prev:hover, .saisei-btn-next:hover {'
  );
}

fs.writeFileSync('index.html', indexContent);
console.log('Updates applied successfully.');
