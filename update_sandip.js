const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">SM<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Sandip Kumar Mistry<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/sandip-avatar.jpg" alt="Sandip Kumar Mistry" style="object-fit: cover; object-position: center;" />\n    <div class="member-info">\n      <div class="member-name"$1>Sandip Kumar Mistry</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Sandip avatar updated.');
