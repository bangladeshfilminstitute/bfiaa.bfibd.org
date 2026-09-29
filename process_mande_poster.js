const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/HP/.gemini/antigravity/brain/fed59904-c330-417f-9845-60e51bab8596/.user_uploaded/media_1789461739266.jpg';
const outputPath = 'C:/Users/HP/Downloads/Antigravity/BFIAA.BFIBD.ORG/images/syed-mande.webp';

async function processImage() {
    try {
        await sharp(inputPath)
            .resize({ width: 800 }) // reasonable width for a poster card
            .webp({ quality: 80 })
            .toFile(outputPath);
        console.log('Image processed and saved to:', outputPath);
        
        // Log final file size
        const stats = fs.statSync(outputPath);
        console.log(`Final size: ${(stats.size / 1024).toFixed(2)} KB`);
    } catch (err) {
        console.error('Error processing image:', err);
    }
}

processImage();
