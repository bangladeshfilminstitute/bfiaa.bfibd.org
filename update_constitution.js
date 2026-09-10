const fs = require('fs');

let content = fs.readFileSync('constitution.html', 'utf8');

const insertionPoint = `education in Bangladesh.
  </p>`;

const newArticle = `education in Bangladesh.
  </p>

  <h2>Article 11 - Development Protocol</h2>
  <p>
    11.1 The association decrees that one must work smartly. Always check what you have done before deploying.
  </p>`;

content = content.replace(insertionPoint, newArticle);

fs.writeFileSync('constitution.html', content);
console.log('Constitution updated.');
