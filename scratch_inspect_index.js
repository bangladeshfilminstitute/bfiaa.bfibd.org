const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'index.html');
const html = fs.readFileSync(file, 'utf8');

const sIdx = html.indexOf('afs-see-all-btn');
console.log('Button Index:', sIdx);
if (sIdx !== -1) {
  console.log(html.slice(sIdx - 50, sIdx + 400));
}
