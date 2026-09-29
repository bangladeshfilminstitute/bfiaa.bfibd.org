const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/HP/.gemini/antigravity/brain/fed59904-c330-417f-9845-60e51bab8596/.user_uploaded/media_1789462101273.jpg';
const outputPath = 'C:/Users/HP/Downloads/Antigravity/BFIAA.BFIBD.ORG/images/syed-madhukar.webp';

async function processImage() {
    try {
        await sharp(inputPath)
            .resize({ width: 800 })
            .webp({ quality: 80 })
            .toFile(outputPath);
        console.log('Image processed and saved to:', outputPath);
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
