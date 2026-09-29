// fix_films_paths.js — replaces ../images/ with images/ in films.html
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'films.html');
let html = fs.readFileSync(filePath, 'utf8');

// Count before
let count = 0;
html = html.replace(/\.\.\/images\//g, function(match) {
  count++;
  return 'images/';
});

fs.writeFileSync(filePath, html, 'utf8');
console.log('Fixed ' + count + ' broken paths (../images/ -> images/)');

// Verify all poster src attributes
const re = /src="([^"]+)"/g;
let m;
const srcs = [];
while ((m = re.exec(html)) !== null) {
  const val = m[1];
  if (val.indexOf('image') !== -1 || val.indexOf('syed') !== -1 || val.indexOf('youtube') !== -1) {
    srcs.push(val);
  }
}
console.log('\nAll poster image paths:');
srcs.forEach(function(s) { console.log('  ' + s); });
