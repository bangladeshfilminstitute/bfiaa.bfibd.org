const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const targetMarker = '<!-- Masterclass -->';

if (!indexContent.includes(targetMarker)) {
  console.error('Target marker <!-- Masterclass --> not found!');
  process.exit(1);
}

const newEventHTML = `<!-- Cinema Kotha Webinar -->
        <div class="event-card reveal reveal-delay-2" tabindex="0">
          <div class="event-card-thumb" style="background:linear-gradient(135deg,#00120a,#0a0a0a);display:flex;align-items:center;justify-content:center;">
            <img
              src="images/cinema-kotha-flyer.png"
              alt="Live Webinar: Cinema Kotha - Zahir Raihan"
              loading="lazy"
              onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:3rem;\\'>🎙️</span>';"
              style="width: 100%; height: 100%; object-fit: cover; object-position: center top;"
            />
            <span class="event-type-badge">PAST WEBINAR</span>
          </div>
          <div class="event-card-body">
            <div class="event-date">📅 04 MARCH 2022 @ 7.00 PM</div>
            <h3 class="event-title">Cinema Kotha: <br><span style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 700; display: inline-block; margin-top: 5px;">রাজনৈতিক চলচ্চিত্রকার হিসেবে জহির রায়হান</span></h3>
            <p class="event-desc">
              On Friday, March 4th, 2022, BFIAA presented its inaugural live webinar series "Cinema Kotha" (<span style="font-family: 'Hind Siliguri', 'Kalpurush', sans-serif;">সিনেমা কথা</span>) in memory of legendary filmmaker Zahir Raihan on the theme <strong style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 600;">"রাজনৈতিক চলচ্চিত্রকার হিসেবে জহির রায়হান"</strong> (Zahir Raihan as a Political Filmmaker). Renowned filmmaker and BFIAA Chief Advisor Tanvir Mokammel featured as keynote speaker, moderated by Advisor Sagir Mostafa, with an essay reading by member Redwan Hossain Riyad, streamed live on Facebook.
            </p>
          </div>
          <div class="event-card-footer">
            <span class="event-tag">Past Live Webinar</span>
            <span class="event-arrow">→</span>
          </div>
        </div>\n\n        `;

indexContent = indexContent.replace(targetMarker, newEventHTML + targetMarker);

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Successfully inserted Event 03 (Cinema Kotha Webinar) into index.html');
