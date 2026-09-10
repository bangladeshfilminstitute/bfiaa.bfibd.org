const fs = require('fs');
const https = require('https');

const options = {
  hostname: 'raw.githubusercontent.com',
  path: '/bangladeshfilminstitute/bfiaa.bfibd.org/main/css/style.css',
  method: 'GET',
  headers: { 'User-Agent': 'Node.js' }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('css/style.css', data);
    console.log('Restored style.css from GitHub.');
    
    // Now safely modify it
    let css = fs.readFileSync('css/style.css', 'utf8');
    // Fix line clamp to avoid truncating names
    css = css.replace(/-webkit-line-clamp:\s*2;/g, '/* -webkit-line-clamp: 2; removed */');
    css = css.replace(/overflow:\s*hidden;/g, '/* overflow: hidden; removed to show full names */');
    fs.writeFileSync('css/style.css', css);
    console.log('Fixed cut-off names safely via Node.');
  });
}).on('error', err => console.log('Error: ', err.message));
