const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">KS<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Kazi Mushfiqus Saleheen<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/kazi-avatar.png" alt="Kazi Mushfiqus Saleheen" style="object-fit: cover; object-position: center;" />\n    <div class="member-info">\n      <div class="member-name"$1>Kazi Mushfiqus Saleheen</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Kazi avatar updated.');
