const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const data = {
  "Cover": [
    "1Ug16BIVHnXX8tuDKGjgLDdB5Bcao-iIE"
  ],
  "Raffle Tickets": [
    "1u-TxqOy_99GTj7KWvNDpzzeIXP9Uhe82",
    "1meegyM8BDEqGjUf9k8Gz0jbXJoKqQKR4",
    "19R9479DDqiuVVVJrhuRtb6FAW4-1lRot",
    "1XuUs6iOf6Ofw7X_bSWlaP5dWoxyMNPIH",
    "1xHwLhAr4vfDd3Mb1HFQNXjUr3e2sqsEX",
    "1EvGl7kO82iK3OWz8DEhP_rUrni3HYC7B",
    "1bDbGvHToQ8iG6JhEpuL-0p_NAPWep6cw",
    "1bsLQGpnR7b2BfkSvFQuGVidfcO2EU3H8",
    "1o11JLZhvuZsgCYzg5XG9c_xOW6_bUJA5"
  ],
  "Raffle Prizes": [
    "1piKcp8_KH0NqOcel3QZy3XFIalX1XtG0",
    "1x_B7v_ZBu6dzipSbd5DTqL9KdtEnn0Ev",
    "1rlS4zRAzjZpmY4mnMkpyse3M05pHcnf4",
    "1HHDn49l7kxlxhTVHWUC_eYqM6vDI0S8M",
    "1GTNmugEFRlYvG0WbSkhdyqNVk6HPXt96",
    "1fKVX4o9qp7UmzPNpMMJJehrVSshMiOe5",
    "1nV6llsyk-XhmNjKvkDzvHXL3bBzhNa6z",
    "14WqLLdyF6eygXW4AiKKuMqDjGx0T4q4N",
    "1iigGSsTOHv1wCcs4ydAc5FKlpfiivOhq",
    "12VnkN9WuSoB5UYeh_kJI3hxKWC3QN5bc",
    "1FOptUEnUtB7JgOvAyngMDd3ifjr2CkFa",
    "1NphgFAW1EjKBx48ortRqGyHAwm_v7vDS",
    "1998UvFyG2nDWr4I5TvvSqBDYy0yjhYF-",
    "1kQjgbkTXGzXF-gNK4_wbYHK9ZqqZN5RU",
    "1R0qvRcSDfis5V9y3iv6_A_jQ5ZJsCJ62",
    "1eP9CCEFa4bb3zr44A6VWKobM-hUvGhLF",
    "1Un4g-4Yn_SWR1IgUTlwf7LCVrvEsrrP7",
    "1uLlZ3VHC1fVlou7fWS61-wu37X09jQR0"
  ],
  "Moments": [
    "1V0gAfBBy-pmlJGY1i4kHs8FUnqMrRZrR",
    "19U-69STAf4JfKUICWh4dKPn3G9FcOCGT",
    "1kdamcm7Za3TYE_bv2GIq3PcWxwRKu4nr",
    "1rMjZ9rDQ1S9u5su3OZHgbrcYaFARwd5p",
    "1Fvu3Md9fHk6SxFyXa7dk3DDGy-qsSIq1",
    "12ofBWShu0QctBcuGuya6lqPX_lDOjA2f",
    "1eKJN4kXohZIK9k9Iyr5sW-VcUZi_uRcD",
    "1A1bEaGraZw615u87wcXdZQPTYPqx3Szn",
    "1CIWZi8KrG-Zfc2dXa8xILucsrhuY6jGS",
    "1UMLXy--3RxxItdthQMERQLfXzhZjxRCo",
    "16sKg4IfsLr2wLwC3CGIM8vkay-xiX9mA"
  ],
  "Cricket Match": [
    "18rhjMRWOCweXbb33AcXxgenDx9VDU_wR",
    "1TVTVzPMQqATYiHJcnFXYIDRSHdpUDH0w",
    "1LMHHglI-sHamrAcwFCEHKBNeG0nFlfL6"
  ],
  "Tanvir Mokammel": [ 
    "1_Ozz9gQMgnUMXhTtnhhfUXcWnHGv8bR9",
    "1jOBsFP9eAr-BmvvQn-nAfJm7xCOLenSs",
    "1rS1PQ3gIhXZY0wQFWTSHLbuyu7TnC1Rd",
    "16ihT9CG_Zuna8-qyIJE4gJurMqzWHKzv" 
  ],
  "Last Moment": [
    "1WbTfHBt9X3MKR6ml_Lbjs8z0F5rJMJkC",
    "1woVkOEkES6oJ7FdPtWmMGojXxYzryfkt",
    "1u0HHZhoPGFlbaZotg1msVcj9cC53_hyK"
  ]
};

async function downloadFile(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 303) {
                return downloadFile(res.headers.location).then(resolve).catch(reject);
            }
            
            const data = [];
            res.on('data', chunk => data.push(chunk));
            res.on('end', () => resolve(Buffer.concat(data)));
            res.on('error', reject);
        }).on('error', reject);
    });
}

async function processAll() {
    const baseDir = path.join(__dirname, 'images', 'picnic-2023');
    if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

    for (const [category, ids] of Object.entries(data)) {
        console.log(`Processing category: ${category}`);
        const catSafe = category.toLowerCase().replace(/ /g, '-');
        const catDir = path.join(baseDir, catSafe);
        if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const url = `https://drive.google.com/uc?export=download&id=${id}`;
            const filepath = path.join(catDir, `${i + 1}.jpg`);
            
            // if (fs.existsSync(filepath)) {
            //     console.log(`Skipping ${catSafe}/${i + 1}.jpg (already exists)`);
            //     continue;
            // }

            console.log(`Downloading ${catSafe}/${i + 1}.jpg ...`);
            try {
                const buffer = await downloadFile(url);
                // Check if buffer is valid image
                try {
                    await sharp(buffer)
                        .rotate() // Auto-rotates based on EXIF orientation!
                        .resize({ width: 1000, withoutEnlargement: true })
                        .jpeg({ quality: 80 })
                        .toFile(filepath);
                    console.log(` -> Saved ${filepath}`);
                } catch (sharpErr) {
                    console.log(` -> Failed to process image with sharp. Saving raw.`);
                    fs.writeFileSync(filepath, buffer);
                }
            } catch (err) {
                console.error(`Error downloading ${id}:`, err.message);
            }
        }
    }
}

processAll().then(() => console.log('Done!')).catch(console.error);
