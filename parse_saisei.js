const fs = require('fs');
const data = fs.readFileSync('C:/Users/HP/.gemini/antigravity/brain/fed59904-c330-417f-9845-60e51bab8596/.system_generated/steps/1310/content.md', 'utf8');

const match = data.match(/<div class="slider_main u-container u-grid-custom">([\s\S]*?)<\/section>/i);
if (match) {
  console.log("Slider main content length:", match[1].length);
  // Look for any 'list' related classes
  const listMatch = match[1].match(/<div class="[^"]*list[^"]*"[\s\S]*?(?=<\/section>)/i);
  if (listMatch) {
     console.log("Found list:", listMatch[0].substring(0, 1000));
  } else {
     console.log("No list found. Here's a snippet:", match[1].replace(/<svg[\s\S]*?<\/svg>/g, '').substring(0, 1500));
  }
}
