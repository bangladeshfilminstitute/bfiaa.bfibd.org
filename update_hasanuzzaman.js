const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">HK<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Hasanuzzaman Khan<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/hasanuzzaman-avatar.jpg" alt="Hasanuzzaman Khan" style="object-fit: cover; object-position: center 10%;" />\n    <div class="member-info">\n      <div class="member-name"$1>Hasanuzzaman Khan</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Hasanuzzaman avatar updated.');
