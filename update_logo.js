const fs = require('fs');

const files = ['index.html', 'constitution.html'];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(
    /<div class="nav-logo">[\s\S]*?<img src="images\/bfiaa-logo\.png" alt="BFIAA Logo" onerror="this\.style\.display='none'"\/>[\s\S]*?<span class="nav-logo-text">BFIAA<\/span>[\s\S]*?<\/div>/g,
    `<a href="https://bfiaa.bfibd.org/" class="nav-logo" style="text-decoration: none;" aria-label="Homepage">
    <img src="images/bfiaa-logo.png" alt="BFIAA Logo" onerror="this.style.display='none'"/>
    <span class="nav-logo-text">BFIAA</span>
  </a>`
  );

  fs.writeFileSync(file, content);
});

console.log('Logo links updated via regex.');
