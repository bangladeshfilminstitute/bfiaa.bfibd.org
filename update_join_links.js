const fs = require('fs');

// --- Fix constitution.html ---
let constContent = fs.readFileSync('constitution.html', 'utf8');

// Replace nav Join button
constContent = constContent.replace(
  /<a href="index\.html#contact" class="nav-btn gold">Join(.*?)<\/a>/gi,
  '<a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="nav-btn gold">Join$1</a>'
);

// Replace bottom Join BFIAA button
constContent = constContent.replace(
  /<a href="index\.html#contact" class="btn-primary" style="display:inline-flex;">Join BFIAA(.*?)<\/a>/gi,
  '<a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-primary" style="display:inline-flex;">Join BFIAA$1</a>'
);

fs.writeFileSync('constitution.html', constContent);
console.log('Updated constitution.html join links.');


// --- Fix index.html ---
let indexContent = fs.readFileSync('index.html', 'utf8');

// Fix mobile menu Join / Contact
indexContent = indexContent.replace(
  /<a href="#contact" role="menuitem">Join \/ Contact<\/a>/g,
  '<a href="https://forms.gle/J8exDqQ7kwm7sjgz8" role="menuitem" target="_blank" rel="noopener">Join Us</a>\n  <a href="#contact" role="menuitem">Contact</a>'
);

// Fix footer Apply to Join
indexContent = indexContent.replace(
  /<li><a href="#contact">Apply to Join<\/a><\/li>/g,
  '<li><a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener">Apply to Join</a></li>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Updated index.html mobile & footer join links.');
