const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Update the Apply for Membership button link
content = content.replace(
  /<a href="#contact" class="btn-primary">(.*?)Apply for Membership<\/a>/,
  '<a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-primary">$1Apply for Membership</a>'
);

// Update object-position for the advisor avatars so their heads aren't cut off
// Tanvir avatar
content = content.replace(
  /src="images\/tanvir-avatar\.jpg"([^>]*)style="([^"]*)"/g,
  (match, p1, p2) => {
    if (!p2.includes('object-position')) {
      return `src="images/tanvir-avatar.jpg"${p1}style="${p2} object-position: top;"`;
    }
    return match;
  }
);

// Sagir avatar
content = content.replace(
  /src="images\/sagir-avatar\.jpg"([^>]*)style="([^"]*)"/g,
  (match, p1, p2) => {
    if (!p2.includes('object-position')) {
      return `src="images/sagir-avatar.jpg"${p1}style="${p2} object-position: top;"`;
    }
    return match;
  }
);

fs.writeFileSync('index.html', content);
console.log('Membership button and avatar positions updated.');
