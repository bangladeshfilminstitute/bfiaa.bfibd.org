const http = require('http');

http.get('http://localhost:3232/films.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Check nested <a> in films
    console.log('Contains <a class="fa-yt-badge":', data.includes('class="fa-yt-badge"'));
    const matches = data.match(/<a[^>]*class="fa-film-card"[^>]*>[\s\S]*?<\/a>/g);
    console.log('Matches count:', matches ? matches.length : 0);
  });
});
