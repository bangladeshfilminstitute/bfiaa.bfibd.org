const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const targetMarker = '<!-- Masterclass -->';

if (!indexContent.includes(targetMarker)) {
  console.error('Target marker <!-- Masterclass --> not found!');
  process.exit(1);
}

const newEventHTML = `<!-- 6th EC 1st Meeting -->
        <a href="event-ec-meeting.html" class="event-card reveal" style="text-decoration:none; color:inherit; display:block;" tabindex="0">
          <div class="event-card-thumb" style="background:linear-gradient(135deg,#00120a,#0a0a0a);display:flex;align-items:center;justify-content:center;">
            <img
              src="images/ec-meeting-1.jpg"
              alt="6th Executive Committee 1st Meeting"
              loading="lazy"
              onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:3rem;\\'>🏛️</span>';"
              style="width: 100%; height: 100%; object-fit: cover; object-position: center center;"
            />
            <span class="event-type-badge">COMMITTEE MEETING</span>
          </div>
          <div class="event-card-body">
            <div class="event-date">📅 07 JANUARY 2022</div>
            <h3 class="event-title">6th Executive Committee: <br><span style="font-family: 'Hind Siliguri', 'Kalpurush', 'SolaimanLipi', sans-serif; font-weight: 700; display: inline-block; margin-top: 5px;">ষষ্ঠ কার্যনির্বাহী কমিটির প্রথম সভা</span></h3>
            <p class="event-desc">
              On Friday, January 7th, 2022, the inaugural 1st meeting of the 6th Executive Committee was held at the BFI premises, presided over by President Shahina Hafiz Daisy with BFI Director Tanvir Mokammel as Chief Guest and former President Dr. Mohammad Jahangir Hossain as Special Guest, with 16 committee members attending.
            </p>
          </div>
          <div class="event-card-footer">
            <span class="event-tag">Official Meeting</span>
            <span class="event-arrow">→</span>
          </div>
        </a>\n\n        `;

indexContent = indexContent.replace(targetMarker, newEventHTML + targetMarker);

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Successfully inserted Event 05 (6th EC 1st Meeting) into index.html');
