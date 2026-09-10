const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">MA<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Md\. Kawsar Ahmed Abir<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/kawsar-avatar.png" alt="Md. Kawsar Ahmed Abir" style="object-fit: contain; background: #fff; padding: 3px; box-sizing: border-box;" />\n    <div class="member-info">\n      <div class="member-name"$1>Md. Kawsar Ahmed Abir</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Kawsar avatar updated.');
