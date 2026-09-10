const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">SD<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Shahina Hafiz Daisy<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/shahina-avatar.jpg" alt="Shahina Hafiz Daisy" style="object-fit: cover; object-position: center;" />\n    <div class="member-info">\n      <div class="member-name"$1>Shahina Hafiz Daisy</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Shahina avatar updated.');
