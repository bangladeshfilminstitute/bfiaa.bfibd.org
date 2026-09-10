const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">NM<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Dr\. Nazia Mahmood<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/nazia-avatar.jpg" alt="Dr. Nazia Mahmood" style="object-fit: cover; object-position: center 10%;" />\n    <div class="member-info">\n      <div class="member-name"$1>Dr. Nazia Mahmood</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Nazia avatar updated.');
