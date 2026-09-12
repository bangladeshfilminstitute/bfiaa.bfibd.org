const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const footerMatch = html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/);
if (footerMatch) {
  fs.writeFileSync('footer_snippet.html', footerMatch[0], 'utf8');
  console.log('Saved footer_snippet.html');
} else {
  console.log('Not found');
}
