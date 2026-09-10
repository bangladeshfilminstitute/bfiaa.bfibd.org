const fs = require('fs');
const data = fs.readFileSync('C:/Users/HP/.gemini/antigravity/brain/fed59904-c330-417f-9845-60e51bab8596/.system_generated/steps/1310/content.md', 'utf8');

const match = data.match(/<section data-theme="dark" class="slider_main">([\s\S]*?)<\/section>/i);
if (match) {
  console.log(match[1].replace(/<svg[\s\S]*?<\/svg>/g, '[SVG]').substring(0, 3000));
}
