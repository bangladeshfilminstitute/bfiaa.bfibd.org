const fs = require('fs');

let html = `    <!-- 2024 Section -->
    <div class="reveal text-center" style="margin-bottom: 40px;">
      <div class="section-label" style="justify-content:center;">9 February 2024</div>
      <h2 class="section-title">Annual Picnic <span>2024</span></h2>
      <div class="divider" style="margin: 20px auto;"></div>
    </div>
    
    <div class="gallery-grid reveal" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; margin-bottom: 80px;">
      <div class="gallery-item" tabindex="0" data-src="images/picnic-2024/photo-1.jpg" data-caption="Annual Picnic 2024">
        <img src="images/picnic-2024/photo-1.jpg" alt="Picnic 2024" loading="lazy" style="height: 100%; object-fit: cover;" />
        <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
      </div>
      <div class="gallery-item" tabindex="0" data-src="images/picnic-2024/photo-2.jpg" data-caption="Annual Picnic 2024">
        <img src="images/picnic-2024/photo-2.jpg" alt="Picnic 2024" loading="lazy" style="height: 100%; object-fit: cover;" />
        <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
      </div>
      <div class="gallery-item" tabindex="0" data-src="images/picnic-2024/photo-3.jpg" data-caption="Annual Picnic 2024">
        <img src="images/picnic-2024/photo-3.jpg" alt="Picnic 2024" loading="lazy" style="height: 100%; object-fit: cover;" />
        <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
      </div>
    </div>
`;

let content = fs.readFileSync('index.html', 'utf8');

// Replace the top part of the picnic section
content = content.replace(
  '<div class="reveal text-center" style="margin-bottom: 40px;">\r\n      <div class="section-label" style="justify-content:center;">Events</div>\r\n      <h2 class="section-title">Annual Picnic <span>2023</span></h2>',
  html + '\n    <!-- 2023 Section -->\n    <div class="reveal text-center" style="margin-bottom: 40px;">\n      <div class="section-label" style="justify-content:center;">Events</div>\n      <h2 class="section-title">Annual Picnic <span>2023</span></h2>'
);

// We need to account for LF vs CRLF
content = content.replace(
  '<div class="reveal text-center" style="margin-bottom: 40px;">\n      <div class="section-label" style="justify-content:center;">Events</div>\n      <h2 class="section-title">Annual Picnic <span>2023</span></h2>',
  html + '\n    <!-- 2023 Section -->\n    <div class="reveal text-center" style="margin-bottom: 40px;">\n      <div class="section-label" style="justify-content:center;">Events</div>\n      <h2 class="section-title">Annual Picnic <span>2023</span></h2>'
);

fs.writeFileSync('index.html', content);
console.log('Added 2024 section');
