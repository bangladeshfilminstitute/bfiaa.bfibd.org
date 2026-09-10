const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">MS<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Mamun Sobhani<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/mamun-avatar.jpg" alt="Mamun Sobhani" style="object-fit: cover; object-position: center 10%;" />\n    <div class="member-info">\n      <div class="member-name"$1>Mamun Sobhani</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Mamun avatar updated.');
