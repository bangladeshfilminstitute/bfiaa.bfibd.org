const https = require('https');
https.get('https://bfibd.org/team/', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // extract image URLs
    const regex = /src=["'](https:\/\/bfibd\.org\/wp-content\/uploads\/[^"']+)["']/gi;
    let match;
    const urls = new Set();
    while ((match = regex.exec(data)) !== null) {
      urls.add(match[1]);
    }
    
    console.log(Array.from(urls).join('\n'));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
