const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The nav button uses unicode ? or arrow, let's use regex
content = content.replace(
  /<a href="#contact" class="nav-btn gold">Join Us [^<]*<\/a>/g,
  '<a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="nav-btn gold">Join Us &rarr;</a>'
);

fs.writeFileSync('index.html', content);
console.log('Nav button updated');
