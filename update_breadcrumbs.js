const fs = require('fs');
['event-songsoptok.html', 'event-pounopunik.html', 'event-cinema-kotha.html', 'event-man.html'].forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/<a href="index\.html">Home<\/a>/g, '<a href="https://bfiaa.bfibd.org/">Home</a>');
  fs.writeFileSync(f, c, 'utf8');
});
console.log('Breadcrumb Home links updated.');
