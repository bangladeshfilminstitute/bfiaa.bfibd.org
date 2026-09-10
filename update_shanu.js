const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">SM<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Shanu Manik<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/shanu-avatar.jpg" alt="Shanu Manik" style="object-fit: cover; object-position: center 10%;" />\n    <div class="member-info">\n      <div class="member-name"$1>Shanu Manik</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Shanu avatar updated.');
