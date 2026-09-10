const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
content = content.replace(/<div class="event-date">. WATCH NOW<\/div>/, '<div class="event-date">▶ WATCH NOW</div>');
content = content.replace(/<span class="event-arrow">.<\/span>/, '<span class="event-arrow">→</span>');
fs.writeFileSync('index.html', content);
