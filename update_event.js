const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

// Inject Google Font
if (!indexContent.includes('Hind+Siliguri')) {
  indexContent = indexContent.replace('</head>', '  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">\n</head>');
}

// Replace the Biennial Conference event
const oldEventRegex = /<!-- Biennial Conference -->[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newEventHTML = `<!-- Songsoptok Screening -->
      <div class="event-card reveal" tabindex="0">
        <div class="event-card-thumb" style="background:linear-gradient(135deg,#00120a,#0a0a0a);display:flex;align-items:center;justify-content:center;">
          <img
            src="images/songsoptok-flyer.jpg"
            alt="Cine Club Adda Screening: Songsoptok"
            loading="lazy"
            onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:3rem;\\'>🎬</span>';"
            style="width: 100%; height: 100%; object-fit: cover; object-position: center top;"
          />
          <span class="event-type-badge">SCREENING LIVE</span>
        </div>
        <div class="event-card-body">
          <div class="event-date">📅 29 DECEMBER @ 9.00 PM</div>
          <h3 class="event-title">Cine Club Adda: <br><span style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 700; display: inline-block; margin-top: 5px;">সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী</span></h3>
          <p class="event-desc">
            We are very happy to announce that on Thursday, December 29th, the BFIAA monthly "Cine Club Adda" will feature a screening of <strong style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 600;">সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী</strong>, directed by BFI alumni Sajjad Khan. The film will be screened online via Zoom and Facebook Live. The event will be hosted by BFIAA Publicity Secretary and filmmaker, Mamun Sobhani.
          </p>
        </div>
        <div class="event-card-footer">
          <span class="event-tag">Online Event</span>
          <span class="event-arrow">→</span>
        </div>
      </div>`;

if (oldEventRegex.test(indexContent)) {
  indexContent = indexContent.replace(oldEventRegex, newEventHTML);
  fs.writeFileSync('index.html', indexContent);
  console.log('Successfully replaced Biennial Conference with Songsoptok Screening.');
} else {
  console.log('Could not find Biennial Conference block.');
}
