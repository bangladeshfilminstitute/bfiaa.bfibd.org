const fs = require('fs');

const newHtml = `      <!-- Masterclass -->
      <a href="https://youtu.be/GeiOwicK9Ac?si=OM68VNtKtnF2ZD_Q" target="_blank" class="event-card reveal reveal-delay-3" style="text-decoration:none; color:inherit;" tabindex="0">
        <div class="event-card-thumb" style="position:relative;">
          <img src="https://img.youtube.com/vi/GeiOwicK9Ac/maxresdefault.jpg" alt="Master Class by Tanvir Mokammel on Mrinal Sen" loading="lazy" style="width:100%; height:100%; object-fit:cover;" />
          <div style="position:absolute; inset:0; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center;">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="var(--gold)"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <span class="event-type-badge" style="z-index:2;">MASTERCLASS</span>
        </div>
        <div class="event-card-body">
          <div class="event-date">▶ WATCH NOW</div>
          <h3 class="event-title">Master Class by Tanvir Mokammel on Mrinal Sen</h3>
          <p class="event-desc">
            Dive into the brilliant mind of legendary filmmaker Mrinal Sen through the lens of our founder, Tanvir Mokammel. In this exclusive, deeply insightful Masterclass, you will explore the rebellious philosophy, radical storytelling, and unapologetic craft that defined Sen's cinematic universe. A must-watch for any true cinephile.
          </p>
        </div>
        <div class="event-card-footer">
          <span class="event-tag">YouTube</span>
          <span class="event-arrow">→</span>
        </div>
      </a>`;

let content = fs.readFileSync('index.html', 'utf8');

// Regex to match the old Masterclass block
const regex = /<!-- Masterclass -->\s*<div class="event-card reveal reveal-delay-3" tabindex="0">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

// The regex above matches too much (it matches all the way to the end of the events grid).
// Let's use string replacement for safety.

const oldHtml = `      <!-- Masterclass -->
      <div class="event-card reveal reveal-delay-3" tabindex="0">
        <div class="event-card-thumb" style="background:linear-gradient(135deg,#100500,#0a0a00);display:flex;align-items:center;justify-content:center;">
          <span style="font-size:3rem;">🎓</span>
          <span class="event-type-badge">EDUCATION</span>
        </div>
        <div class="event-card-body">
          <div class="event-date">⏳ RECURRING</div>
          <h3 class="event-title">Masterclass by Tanvir Mokammel</h3>
          <p class="event-desc">
            Special masterclasses by BFI founder and celebrated documentary filmmaker
            Tanvir Mokammel, open to alumni and current students. These sessions explore
            the craft, philosophy and practice of independent filmmaking in Bangladesh.
          </p>
        </div>
        <div class="event-card-footer">
          <span class="event-tag">Workshop</span>
          <span class="event-arrow">→</span>
        </div>
      </div>`;

// Account for different line endings
const oldHtmlCRLF = oldHtml.replace(/\n/g, '\r\n');

if (content.includes(oldHtml)) {
  content = content.replace(oldHtml, newHtml);
  fs.writeFileSync('index.html', content);
  console.log("Replaced using LF");
} else if (content.includes(oldHtmlCRLF)) {
  content = content.replace(oldHtmlCRLF, newHtml);
  fs.writeFileSync('index.html', content);
  console.log("Replaced using CRLF");
} else {
  console.log("Could not find the block to replace.");
}
