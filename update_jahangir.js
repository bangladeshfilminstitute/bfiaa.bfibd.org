const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regex = /<div class="member-avatar">MH<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Dr\. Mohammad Jahangir Hossain<\/div>/i;

indexContent = indexContent.replace(
  regex,
  '<img class="member-avatar" src="images/jahangir-avatar.jpg" alt="Dr. Mohammad Jahangir Hossain" style="object-fit: cover; object-position: center 10%;" />\n    <div class="member-info">\n      <div class="member-name"$1>Dr. Mohammad Jahangir Hossain</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Jahangir avatar updated.');
