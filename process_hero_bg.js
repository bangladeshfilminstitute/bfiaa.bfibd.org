const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/HP/.gemini/antigravity/brain/fed59904-c330-417f-9845-60e51bab8596/.user_uploaded/media_1789543017874.png';
const outputPath = 'C:/Users/HP/Downloads/Antigravity/BFIAA.BFIBD.ORG/images/syed-hero-bg.webp';

sharp(inputPath)
  .webp({ quality: 85 })
  .toFile(outputPath)
  .then(info => {
    console.log('Successfully created syed-hero-bg.webp', info);
  })
  .catch(err => {
    console.error('Error processing image:', err);
  });
