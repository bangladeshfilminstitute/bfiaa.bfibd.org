const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputPath = 'C:/Users/HP/.gemini/antigravity/brain/fed59904-c330-417f-9845-60e51bab8596/.user_uploaded/media_1789020838408.png';
const outputPath = path.join(__dirname, 'images', 'bfiaa-2021.jpg');

async function process() {
  await sharp(inputPath)
    .rotate()
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toFile(outputPath);
  console.log('Saved new image to', outputPath);

  // Remove the old .jpeg file if it exists
  const oldPath = path.join(__dirname, 'images', 'bfiaa-2021.jpeg');
  if (fs.existsSync(oldPath)) {
    fs.unlinkSync(oldPath);
  }

  // Update HTML to point to .jpg instead of .jpeg
  let content = fs.readFileSync('index.html', 'utf8');
  content = content.replace(/images\/bfiaa-2021\.jpeg/g, 'images/bfiaa-2021.jpg');
  
  // Let's also fix the unicode character that powershell messed up again:
  content = content.replace(/<span class="about-img-caption">\? BFIAA/, '<span class="about-img-caption">▶ BFIAA');
  
  fs.writeFileSync('index.html', content);
  console.log('Updated index.html');
}

process();
