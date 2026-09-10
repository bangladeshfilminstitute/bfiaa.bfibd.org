const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const tanvirUrl = 'https://bfibd.org/wp-content/uploads/2024/03/Tanvir-Mokammel-Founder-and-Director-of-Bangladesh-Film-institute.jpg';
const sagirUrl = 'https://bfibd.org/wp-content/uploads/2024/03/Sagir-Mostafa-Course-coordinator-and-teacher.jpg';

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
};

async function process() {
  const tanvirBuffer = await downloadImage(tanvirUrl);
  const sagirBuffer = await downloadImage(sagirUrl);
  
  await sharp(tanvirBuffer)
    .resize(300, 300, { fit: 'cover' })
    .jpeg({ quality: 85 })
    .toFile(path.join(__dirname, 'images', 'tanvir-avatar.jpg'));
    
  await sharp(sagirBuffer)
    .resize(300, 300, { fit: 'cover' })
    .jpeg({ quality: 85 })
    .toFile(path.join(__dirname, 'images', 'sagir-avatar.jpg'));
    
  console.log('Avatars saved successfully');
}

process();
