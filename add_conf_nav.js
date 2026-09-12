const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

// Nav links
if (!indexContent.includes('href="#conference-2019"')) {
  indexContent = indexContent.replace(
    '<li><a href="#about">About</a></li>',
    '<li><a href="#about">About</a></li>\n      <li><a href="#conference-2019">Conference 2019</a></li>'
  );
  
  // Mobile menu
  indexContent = indexContent.replace(
    '<a href="#about" role="menuitem">About BFIAA</a>',
    '<a href="#about" role="menuitem">About BFIAA</a>\n    <a href="#conference-2019" role="menuitem">Conference 2019</a>'
  );

  // Footer navigate
  indexContent = indexContent.replace(
    '<li><a href="#about">About BFIAA</a></li>',
    '<li><a href="#about">About BFIAA</a></li>\n          <li><a href="#conference-2019">Conference 2019</a></li>'
  );
}

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Added Conference 2019 to nav and footer');
