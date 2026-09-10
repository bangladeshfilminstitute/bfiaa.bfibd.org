const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace Tanvir Role
content = content.replace(
  /<div class="president-title">Founder (?:&|&amp;) Advisor [–\-] Bangladesh Film Institute<\/div>/g,
  '<div class="president-title">Role: Founder &amp; Director - Bangladesh Film Institute (BFI)</div>'
);

// Replace Sagir Role
content = content.replace(
  /<div class="president-title">Advisor [–\-] Bangladesh Film Institute<\/div>/g,
  '<div class="president-title">Role: Coordinator &amp; Teacher - Bangladesh Film Institute (BFI)</div>'
);

fs.writeFileSync('index.html', content);
console.log('HTML updated successfully with correct dash regex');
