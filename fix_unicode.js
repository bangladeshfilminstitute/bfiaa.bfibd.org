const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace('? WATCH NOW', '▶ WATCH NOW');
content = content.replace('<span class="event-arrow">?</span>', '<span class="event-arrow">→</span>');
fs.writeFileSync('index.html', content);
