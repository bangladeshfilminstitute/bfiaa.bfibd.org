const fs = require('fs');

const newPhotosHtml = `
        <!-- New Photos -->
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-6.jpg" data-caption="Alumni Gathering" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-6.jpg" alt="Alumni Gathering" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-7.jpg" data-caption="Alumni Gathering" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-7.jpg" alt="Alumni Gathering" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-8.jpg" data-caption="Alumni Gathering" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-8.jpg" alt="Alumni Gathering" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-9.jpg" data-caption="Alumni Gathering" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-9.jpg" alt="Alumni Gathering" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-10.jpg" data-caption="Alumni Gathering" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-10.jpg" alt="Alumni Gathering" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>`;

let content = fs.readFileSync('index.html', 'utf8');

// Find the insertion point (right after photo-5)
const target = `<img src="images/30-years/photo-5.jpg" alt="Film Festival Audience" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>`;

if (content.includes(target)) {
  content = content.replace(target, target + newPhotosHtml);
  
  // Update the comment "4 Photos Grid" to "9 Photos Grid" for correctness
  content = content.replace('<!-- 4 Photos Grid -->', '<!-- 9 Photos Grid -->');

  fs.writeFileSync('index.html', content);
  console.log("Inserted new photos successfully.");
} else {
  // Try regex if spacing is weird
  const regex = /<img src="images\/30-years\/photo-5\.jpg"[^>]*>\s*<div class="gallery-overlay"><span class="gallery-icon">.<\/span><\/div>\s*<\/div>/;
  if(regex.test(content)) {
    content = content.replace(regex, match => match + newPhotosHtml);
    content = content.replace('<!-- 4 Photos Grid -->', '<!-- 9 Photos Grid -->');
    fs.writeFileSync('index.html', content);
    console.log("Inserted new photos successfully (via regex).");
  } else {
    console.log("Could not find insertion point.");
  }
}
