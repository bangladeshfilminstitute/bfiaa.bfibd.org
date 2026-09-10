const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'images', '30-years');
const files = ['6.jpg', '7.png', '8.png', '9.png', '10.png'];

async function process() {
  for (let i=0; i<files.length; i++) {
    const file = files[i];
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, `photo-${i+6}.jpg`);
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
