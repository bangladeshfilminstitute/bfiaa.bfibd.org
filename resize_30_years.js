const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'images', '30-years');
const files = ['1.jpg', '2.png', '3.jpg', '4.png', '5.jpg'];

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
    fs.unlinkSync(inputPath);
  }
}
process();
