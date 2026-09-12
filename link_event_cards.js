const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

// 1. Songsoptok Card
indexContent = indexContent.replace(
  /<!-- Songsoptok Screening -->\s*<div class="event-card reveal" tabindex="0">/,
  `<!-- Songsoptok Screening -->\n        <a href="event-songsoptok.html" class="event-card reveal" style="text-decoration:none; color:inherit; display:block;" tabindex="0">`
);
// Replace closing div for Songsoptok (before <!-- Pounopunik Screening -->)
indexContent = indexContent.replace(
  /(<!-- Songsoptok Screening -->[\s\S]*?<span class="event-tag">Past Online Event<\/span>\s*<span class="event-arrow">.*?<\/span>\s*<\/div>\s*)<\/div>(\s*<!-- Pounopunik Screening -->)/,
  `$1</a>$2`
);

// 2. Pounopunik Card
indexContent = indexContent.replace(
  /<!-- Pounopunik Screening -->\s*<div class="event-card reveal reveal-delay-1" tabindex="0">/,
  `<!-- Pounopunik Screening -->\n        <a href="event-pounopunik.html" class="event-card reveal reveal-delay-1" style="text-decoration:none; color:inherit; display:block;" tabindex="0">`
);
// Replace closing div for Pounopunik (before <!-- Cinema Kotha Webinar -->)
indexContent = indexContent.replace(
  /(<!-- Pounopunik Screening -->[\s\S]*?<span class="event-tag">Past Online Event<\/span>\s*<span class="event-arrow">.*?<\/span>\s*<\/div>\s*)<\/div>(\s*<!-- Cinema Kotha Webinar -->)/,
  `$1</a>$2`
);

// 3. Cinema Kotha Card
indexContent = indexContent.replace(
  /<!-- Cinema Kotha Webinar -->\s*<div class="event-card reveal reveal-delay-2" tabindex="0">/,
  `<!-- Cinema Kotha Webinar -->\n        <a href="event-cinema-kotha.html" class="event-card reveal reveal-delay-2" style="text-decoration:none; color:inherit; display:block;" tabindex="0">`
);
// Replace closing div for Cinema Kotha (before <!-- Man Film Screening)
indexContent = indexContent.replace(
  /(<!-- Cinema Kotha Webinar -->[\s\S]*?<span class="event-tag">Past Live Webinar<\/span>\s*<span class="event-arrow">.*?<\/span>\s*<\/div>\s*)<\/div>(\s*<!-- Man Film Screening)/,
  `$1</a>$2`
);

// 4. Man Card
indexContent = indexContent.replace(
  /<!-- Man Film Screening & Director's Meet -->\s*<div class="event-card reveal reveal-delay-3" tabindex="0">/,
  `<!-- Man Film Screening & Director's Meet -->\n        <a href="event-man.html" class="event-card reveal reveal-delay-3" style="text-decoration:none; color:inherit; display:block;" tabindex="0">`
);
// Replace closing div for Man (before <!-- Masterclass -->)
indexContent = indexContent.replace(
  /(<!-- Man Film Screening & Director's Meet -->[\s\S]*?<span class="event-tag">Past Online Event<\/span>\s*<span class="event-arrow">.*?<\/span>\s*<\/div>\s*)<\/div>(\s*<!-- Masterclass -->)/,
  `$1</a>$2`
);

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Finished updating event links in index.html');
