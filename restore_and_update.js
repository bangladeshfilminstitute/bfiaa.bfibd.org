const fs = require('fs');

let indexContent = fs.readFileSync('index_10ff621.html', 'utf8');

// The block to replace:
// We know it starts with `<!-- Biennial Conference -->`
// And ends right before `<!-- Uralchitra -->`
const oldEventRegex = /<!-- Biennial Conference -->[\s\S]*?(?=<!-- Uralchitra -->)/;

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
          <span class="event-type-badge">PAST SCREENING</span>
        </div>
        <div class="event-card-body">
          <div class="event-date">📅 29 DECEMBER 2022 @ 9.00 PM</div>
          <h3 class="event-title">Cine Club Adda: <br><span style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 700; display: inline-block; margin-top: 5px;">সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী</span></h3>
          <p class="event-desc">
            On Thursday, December 29th, 2022, the BFIAA monthly "Cine Club Adda" hosted a special screening of <strong style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 600;">সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী</strong>, directed by BFI alumni Sajjad Khan. The film was screened virtually via Zoom and Facebook Live, bringing together alumni from across the globe. The session was hosted by BFIAA Publicity Secretary and filmmaker, Mamun Sobhani.
          </p>
        </div>
        <div class="event-card-footer">
          <span class="event-tag">Past Online Event</span>
          <span class="event-arrow">→</span>
        </div>
      </div>\n\n      `;

if (oldEventRegex.test(indexContent)) {
  indexContent = indexContent.replace(oldEventRegex, newEventHTML);
  
  // Also add the font if missing
  if (!indexContent.includes('Hind+Siliguri')) {
    indexContent = indexContent.replace('</head>', '  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet">\n</head>');
  }

  fs.writeFileSync('index.html', indexContent);
  console.log('Restored and successfully updated.');
} else {
  console.log('Could not find Biennial Conference block.');
}
