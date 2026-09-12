const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const targetMarker = '<!-- Masterclass -->';

if (!indexContent.includes(targetMarker)) {
  console.error('Target marker <!-- Masterclass --> not found!');
  process.exit(1);
}

const newEventHTML = `<!-- Man Film Screening & Director's Meet -->
        <div class="event-card reveal reveal-delay-3" tabindex="0">
          <div class="event-card-thumb" style="background:linear-gradient(135deg,#00120a,#0a0a0a);display:flex;align-items:center;justify-content:center;">
            <img
              src="images/man-film-flyer.png"
              alt="Cine Club Adda: Screening of Man with Imtiaz Pavel"
              loading="lazy"
              onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:3rem;\\'>🎬</span>';"
              style="width: 100%; height: 100%; object-fit: cover; object-position: center top;"
            />
            <span class="event-type-badge">PAST SCREENING</span>
          </div>
          <div class="event-card-body">
            <div class="event-date">📅 12 FEBRUARY 2022 @ 9.00 PM</div>
            <h3 class="event-title">Cine Club Adda: <br><span style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 700; display: inline-block; margin-top: 5px;">ম্যান (Man)</span></h3>
            <p class="event-desc">
              On Saturday, February 12th, 2022, the monthly "BFIAA Cine Club Adda" presented a special screening of the acclaimed short film <strong style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 600;">“ম্যান” (Man)</strong>, followed by an interactive "Meet the Director" session with former BFIAA President and filmmaker Imtiaz Pavel. The session was hosted by BFIAA Organizing Secretary and filmmaker Aparajita Sangita, streamed live on Facebook.
            </p>
          </div>
          <div class="event-card-footer">
            <span class="event-tag">Past Online Event</span>
            <span class="event-arrow">→</span>
          </div>
        </div>\n\n        `;

indexContent = indexContent.replace(targetMarker, newEventHTML + targetMarker);

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Successfully inserted Event 04 (Man Film Screening) into index.html');
