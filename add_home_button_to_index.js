const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

// 1. Add Home to nav-links if not already present
if (!indexContent.includes('<li><a href="https://bfiaa.bfibd.org/">Home</a></li>') && !indexContent.includes('<li><a href="#">Home</a></li>')) {
  indexContent = indexContent.replace(
    /<ul class="nav-links" role="list">\s*<li><a href="#about">About<\/a><\/li>/,
    `<ul class="nav-links" role="list">\n      <li><a href="https://bfiaa.bfibd.org/">Home</a></li>\n      <li><a href="#about">About</a></li>`
  );
}

// 2. Add Home button to nav-actions
const navActionsRegex = /<div class="nav-actions">\s*<a href="https:\/\/bfibd\.org"/;
if (navActionsRegex.test(indexContent)) {
  indexContent = indexContent.replace(
    navActionsRegex,
    `<div class="nav-actions">\n      <a href="https://bfiaa.bfibd.org/" class="nav-btn" style="border-color:var(--gold); color:var(--gold);">🏠 Home</a>\n      <a href="https://bfibd.org"`
  );
}

// 3. Add Home to mobile menu if not already present
if (!indexContent.includes('<a href="https://bfiaa.bfibd.org/" role="menuitem">Home</a>')) {
  indexContent = indexContent.replace(
    /<div class="mobile-menu" id="mobileMenu" role="menu">\s*<a href="#about"/,
    `<div class="mobile-menu" id="mobileMenu" role="menu">\n    <a href="https://bfiaa.bfibd.org/" role="menuitem">Home</a>\n    <a href="#about"`
  );
}

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Successfully added Home button to homepage navbar in index.html');
