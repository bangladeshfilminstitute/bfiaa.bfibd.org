const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">SK<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Sajjad Khan<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/sajjad-avatar.jpg" alt="Sajjad Khan" style="object-fit: cover; object-position: center 10%;" />\n    <div class="member-info">\n      <div class="member-name"$1>Sajjad Khan</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Sajjad avatar updated.');
