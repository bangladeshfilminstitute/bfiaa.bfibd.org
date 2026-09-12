const fs = require('fs');
let indexContent = fs.readFileSync('index.html', 'utf8');

const targetMarker = '<section class="about" id="founder"';

if (!indexContent.includes(targetMarker)) {
  console.error('Target marker <section class="about" id="founder" not found!');
  process.exit(1);
}

const conferenceSectionHTML = `<!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     BIENNIAL CONFERENCE 2019 SECTION
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
<section class="about" id="conference-2019" aria-label="BFIAA Biennial Conference 2019" style="background:var(--dark); border-top:1px solid var(--border); padding: 80px 0 100px;">
  <div class="container">
    <div class="about-grid">
      
      <!-- Visual (Group Photo) -->
      <div class="about-visual reveal" style="order:1;">
        <div class="about-img-frame" style="border-color:var(--gold); border-radius: var(--radius-lg); overflow:hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
          <img src="images/conference-2019-1.jpg" alt="BFIAA Biennial Conference 2019 Assembly" loading="lazy" style="width:100%; height:auto; aspect-ratio:16/10; object-fit:cover;" />
        </div>
        <div style="margin-top:12px; display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:11px; color:var(--text-dim);">
          <span>📍 Public Library Seminar Hall, Dhaka</span>
          <span style="color:var(--gold);">📅 28 June 2019</span>
        </div>
      </div>

      <!-- Content -->
      <div class="about-content reveal reveal-delay-1" style="order:2;">
        <div class="section-label">Historic Assembly • 2019–2021</div>
        <h2 class="section-title">BFIAA Biennial Conference <span>2019</span></h2>
        <div class="divider"></div>
        
        <h4 style="font-family:'Hind Siliguri', sans-serif; font-size:1.35rem; color:var(--gold); margin-bottom:15px; font-weight:700;">
          বাংলাদেশ ফিল্ম ইনস্টিটিউট এলামনাই এসোসিয়েশন সম্মেলন ২০১৯
        </h4>

        <p class="about-highlight">
          "A landmark gathering uniting pioneering graduates, filmmakers, and faculty to forge the 2019–2021 Advisory & Executive Councils."
        </p>
        <p>
          On June 28th, 2019, the BFIAA Biennial Conference was held at the Public Library Seminar Hall, presided over by President <strong>Imtiaz Pavel</strong> and moderated by <strong>Sagir Mostafa</strong>. BFI Director <strong>Tanvir Mokammel</strong> graced the event as Chief Guest, with <strong>Dr. Mohammad Jahangir Hossain</strong> as Special Guest.
        </p>
        <p>
          The historic conference culminated in establishing a <strong>7-member Advisory Council</strong> led by Tanvir Mokammel as Chief Advisor, and a <strong>23-member Executive Council</strong> headed by Dr. Mohammad Jahangir Hossain.
        </p>

        <div style="margin-top: 30px; display:flex; gap:16px; flex-wrap:wrap;">
          <a href="conference-2019.html" class="btn-primary">
            Explore Full Conference & Committee Roster →
          </a>
          <a href="images/conference-2019-1.jpg" target="_blank" class="btn-secondary">
            🔍 View Assembly Photo
          </a>
        </div>
      </div>

    </div>
  </div>
</section>\n\n`;

indexContent = indexContent.replace(targetMarker, conferenceSectionHTML + targetMarker);

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Successfully inserted Biennial Conference 2019 section above Founder & Patron section in index.html');
