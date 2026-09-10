const fs = require('fs');

const newHtml = `<!-- 
     30 YEARS MILESTONE CELEBRATION
========================================================= -->
<section class="gallery-section" id="celebration-30" aria-label="30 Years Celebration" style="background:var(--dark); padding:100px 0; border-top: 1px solid var(--border);">
  <div class="container">
    <div class="reveal text-center" style="margin-bottom: 50px;">
      <div class="section-label" style="justify-content:center; color:var(--gold);">6-8 March 2023</div>
      <h2 class="section-title" style="max-width: 900px; margin: 0 auto; line-height: 1.3;">
        <span>30 Years</span> of Documentary Filmmaking by Tanvir Mokammel
      </h2>
      <div class="divider" style="margin: 25px auto;"></div>
      <p class="section-desc" style="max-width: 800px; margin-left: auto; margin-right: auto; font-size: 1.1rem; color: var(--text);">
        A glorious three-day event featuring a Retrospective Documentary Film Festival, Masterclass, Birthday Celebration, and the publication of <strong>URALCHITRA</strong> magazine Special Edition.
      </p>
      <p style="color: var(--gold); font-weight: 600; margin-top: 20px; font-family: var(--font-mono); letter-spacing: 1px; font-size: 0.85rem;">
        ORGANIZED BY BANGLADESH FILM INSTITUTE ALUMNI ASSOCIATION (BFIAA)
      </p>
    </div>

    <!-- Mega Gallery Grid -->
    <div class="reveal reveal-delay-1" style="display: flex; flex-direction: column; gap: 16px;">
      
      <!-- Hero Photo -->
      <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-1.jpg" data-caption="30 Years Celebration - Stage" style="width: 100%; aspect-ratio: 21/9; max-height: 600px; overflow: hidden; border: 1px solid var(--border);">
        <img src="images/30-years/photo-1.jpg" alt="Stage Celebration" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
        <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
      </div>
      
      <!-- 4 Photos Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;">
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-2.jpg" data-caption="Uralchitra Special Edition Launch" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-2.jpg" alt="Uralchitra Launch" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-3.jpg" data-caption="Birthday Celebration" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-3.jpg" alt="Birthday Celebration" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-4.jpg" data-caption="Tanvir Mokammel" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-4.jpg" alt="Tanvir Mokammel" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>
        <div class="gallery-item" tabindex="0" data-src="images/30-years/photo-5.jpg" data-caption="Film Festival Audience" style="aspect-ratio: 4/3; border: 1px solid var(--border);">
          <img src="images/30-years/photo-5.jpg" alt="Film Festival Audience" loading="lazy" style="height: 100%; width: 100%; object-fit: cover;" />
          <div class="gallery-overlay"><span class="gallery-icon">⤢</span></div>
        </div>
      </div>

    </div>
  </div>
</section>

`;

let content = fs.readFileSync('index.html', 'utf8');

// Insert right before the timeline section
content = content.replace('<!-- \r\n     ASSOCIATION TIMELINE', newHtml + '<!-- \r\n     ASSOCIATION TIMELINE');
content = content.replace('<!-- \n     ASSOCIATION TIMELINE', newHtml + '<!-- \n     ASSOCIATION TIMELINE');
content = content.replace('<!-- \n\r     ASSOCIATION TIMELINE', newHtml + '<!-- \n\r     ASSOCIATION TIMELINE');
content = content.replace('<!-- \r     ASSOCIATION TIMELINE', newHtml + '<!-- \r     ASSOCIATION TIMELINE');

// Some powershell edits might have messed up the comment format, let's try a stronger regex just in case
if(!content.includes('30 YEARS MILESTONE')) {
  content = content.replace(/<section class="timeline-section"/, newHtml + '<section class="timeline-section"');
}

fs.writeFileSync('index.html', content);
console.log('Inserted 30 Years Celebration section');
