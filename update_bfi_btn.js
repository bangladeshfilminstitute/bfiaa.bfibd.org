const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

content = content.replace(
  /<a href="https:\/\/bfibd\.org" class="nav-btn"[^>]*>.*?BFI Home<\/a>/,
  `<a href="https://bfibd.org" class="nav-btn" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 8px;"><img src="images/bfi-logo.png" alt="BFI Logo" style="height: 16px; width: auto;"/> BFI Home</a>`
);

fs.writeFileSync('index.html', content);
console.log('Button updated');
