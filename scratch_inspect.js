const http = require('http');

http.get('http://localhost:3232/films.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const idx = data.indexOf('<main');
    if (idx !== -1) {
      console.log(data.slice(idx));
    }
  });
});
