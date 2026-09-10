const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="gallery-item" tabindex="0" data-src="images\/picnic-2024\/photo-1\.jpg"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div class="gallery-item" tabindex="0" data-src="images\/picnic-2024\/photo-2\.jpg"/;

// Let's do it safer:
const toRemove = `      <div class="gallery-item" tabindex="0" data-src="images/picnic-2024/photo-1.jpg" data-caption="Annual Picnic 2024">
        <img src="images/picnic-2024/photo-1.jpg" alt="Picnic 2024" loading="lazy" style="height: 100%; object-fit: cover;" />
        <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
      </div>\n`;

const toRemoveCRLF = `      <div class="gallery-item" tabindex="0" data-src="images/picnic-2024/photo-1.jpg" data-caption="Annual Picnic 2024">\r\n        <img src="images/picnic-2024/photo-1.jpg" alt="Picnic 2024" loading="lazy" style="height: 100%; object-fit: cover;" />\r\n        <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>\r\n      </div>\r\n`;

if (content.includes(toRemove)) {
  content = content.replace(toRemove, '');
  fs.writeFileSync('index.html', content);
  console.log("Removed photo-1 successfully (LF).");
} else if (content.includes(toRemoveCRLF)) {
  content = content.replace(toRemoveCRLF, '');
  fs.writeFileSync('index.html', content);
  console.log("Removed photo-1 successfully (CRLF).");
} else {
  // Try regex
  const regex2 = /<div class="gallery-item" tabindex="0" data-src="images\/picnic-2024\/photo-1\.jpg"[^>]*>\s*<img[^>]*>\s*<div class="gallery-overlay"><span class="gallery-icon">⤢<\/span><\/div>\s*<\/div>\s*/;
  if(regex2.test(content)) {
    content = content.replace(regex2, '');
    fs.writeFileSync('index.html', content);
    console.log("Removed photo-1 successfully (Regex).");
  } else {
    console.log("Could not find photo-1 to remove.");
  }
}
