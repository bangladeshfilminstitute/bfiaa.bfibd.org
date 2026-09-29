const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..', 'BFIBD Website-Antigravity', 'images');
const list = fs.readdirSync(baseDir);
console.log(list.filter(f => f.toLowerCase().includes('syed') || f.toLowerCase().includes('phera')));
