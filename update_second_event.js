const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

// The block to remove: Uralchitra
const uralchitraRegex = /\s*<!-- Uralchitra -->[\s\S]*?(?=<!-- Cine Club Adda -->)/;
if (uralchitraRegex.test(indexContent)) {
  indexContent = indexContent.replace(uralchitraRegex, '\n\n');
  console.log('Removed Uralchitra block.');
} else {
  console.log('Could not find Uralchitra block.');
}

// The block to replace: Cine Club Adda
const cineClubRegex = /<!-- Cine Club Adda -->[\s\S]*?(?=<!-- Masterclass -->)/;
const newEventHTML = `      <!-- Pounopunik Screening -->
      <div class="event-card reveal reveal-delay-1" tabindex="0">
        <div class="event-card-thumb" style="background:linear-gradient(135deg,#00120a,#0a0a0a);display:flex;align-items:center;justify-content:center;">
          <img
            src="images/pounopunik-flyer.jpg"
            alt="Cine Club Adda Screening: Pounopunik"
            loading="lazy"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:3rem;\\'>🎬</span>';"
            style="width: 100%; height: 100%; object-fit: cover; object-position: center top;"
          />
          <span class="event-type-badge">PAST SCREENING</span>
        </div>
        <div class="event-card-body">
          <div class="event-date">📅 09 AUGUST 2022 @ 9.00 PM</div>
          <h3 class="event-title">Cine Club Adda: <br><span style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 700; display: inline-block; margin-top: 5px;">পৌণঃপুণিক</span></h3>
          <p class="event-desc">
            On Tuesday, August 9th, 2022, the BFIAA monthly "Cine Club Adda" hosted a special screening of <strong style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 600;">পৌণঃপুণিক</strong>, directed by BFI alumni Khandaker Sumon. The film was screened virtually via Zoom, bringing together alumni from across the globe. The session was hosted by BFIAA Publicity Secretary and filmmaker, Mamun Sobhani.
          </p>
        </div>
        <div class="event-card-footer">
          <span class="event-tag">Past Online Event</span>
          <span class="event-arrow">→</span>
        </div>
      </div>\n\n`;

if (cineClubRegex.test(indexContent)) {
  indexContent = indexContent.replace(cineClubRegex, newEventHTML);
  console.log('Replaced Cine Club Adda with Pounopunik Screening.');
} else {
  console.log('Could not find Cine Club Adda block.');
}

fs.writeFileSync('index.html', indexContent);
console.log('Updates completed.');
