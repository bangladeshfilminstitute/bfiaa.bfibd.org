const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'images', 'picnic-2024');
const files = ['1.png', '2.jpg', '3.jpg'];

async function process() {
  for (let i=0; i<files.length; i++) {
    const file = files[i];
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, `photo-${i+1}.jpg`);
    await sharp(inputPath)
      .rotate()
      .resize({ width: 1000, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(outputPath);
    console.log('Saved', outputPath);
    fs.unlinkSync(inputPath); // Remove original
  }
}
process();
