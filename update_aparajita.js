const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">AS<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Aparajita Sangita<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/aparajita-avatar.jpg" alt="Aparajita Sangita" style="object-fit: cover; object-position: center 10%;" />\n    <div class="member-info">\n      <div class="member-name"$1>Aparajita Sangita</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Aparajita avatar updated.');
