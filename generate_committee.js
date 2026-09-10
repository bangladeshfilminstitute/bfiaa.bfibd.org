const fs = require('fs');

const members = [
  { role: 'Advisor', name: 'Tanvir Mokammel', initial: 'TM', isHighlight: true, title: 'Founder & Advisor – Bangladesh Film Institute' },
  { role: 'Advisor', name: 'Sagir Mostafa', initial: 'SM', isHighlight: true, title: 'Advisor – Bangladesh Film Institute' },
  { role: 'President', name: 'Shahina Hafiz Daisy', initial: 'SD' },
  { role: 'Vice-President', name: '', initial: 'VP' },
  { role: 'General Secretary', name: 'Sandip Kumar Mistry', initial: 'SM' },
  { role: 'Joint Secretary', name: 'Kazi Mushfiqus Saleheen', initial: 'KS' },
  { role: 'Treasurer', name: 'Sohel Ahmed Siddiquee', initial: 'SS' },
  { role: 'Organising Secretary', name: 'Aparajita Sangita', initial: 'AS' },
  { role: 'Office Secretary', name: 'Md. Kawsar Ahmed Abir', initial: 'MA' },
  { role: 'International Secretary', name: '', initial: 'IS' },
  { role: 'Library Secretary', name: '', initial: 'LS' },
  { role: 'Seminar Secretary', name: '', initial: 'SS' },
  { role: 'Publicity Secretary', name: 'Mamun Sobhani', initial: 'MS' },
  { role: 'Publication Secretary', name: 'Dr. Nazia Mahmood', initial: 'NM' },
  { role: 'Executive Member 01', name: 'Dr. Mohammad Jahangir Hossain', initial: 'MH' },
  { role: 'Executive Member 02', name: 'Sajjad Khan', initial: 'SK' },
  { role: 'Executive Member 03', name: 'Shanu Manik', initial: 'SM' },
  { role: 'Executive Member 04', name: 'Hasanuzzaman Khan', initial: 'HK' },
  { role: 'Executive Member 05', name: '', initial: 'E5' },
  { role: 'Executive Member 06', name: '', initial: 'E6' },
  { role: 'Executive Member 07', name: '', initial: 'E7' },
  { role: 'Executive Member 08', name: '', initial: 'E8' },
  { role: 'Executive Member 09', name: '', initial: 'E9' }
];

let html = `<!-- Advisors Highlight -->\n<div class="committee-president reveal" style="display: flex; gap: 20px; flex-wrap: wrap;">\n`;

const advisors = members.filter(m => m.isHighlight);
advisors.forEach(adv => {
  html += `  <div class="president-card" style="flex: 1; min-width: 300px;">
    <div class="president-avatar">${adv.initial}</div>
    <div class="president-name">${adv.role}: ${adv.name}</div>
    <div class="president-title">${adv.title}</div>
  </div>\n`;
});

html += `</div>\n\n<!-- Committee Grid -->\n<div class="committee-grid">\n`;

const regularMembers = members.filter(m => !m.isHighlight);
regularMembers.forEach((member, i) => {
  const delay = i % 4; // Add slight staggering
  const nameDisplay = member.name ? member.name : `<span style="opacity: 0.3;">TBA</span>`;
  
  html += `  <div class="member-card reveal reveal-delay-${delay}">
    <div class="member-avatar">${member.initial}</div>
    <div class="member-info">
      <div class="member-name" style="font-size: 1.1rem; color: var(--gold);">${nameDisplay}</div>
      <div class="member-role">${member.role}<br><span style="font-size: 0.75rem; opacity: 0.6; font-family: var(--font-mono);">2022-23 TERM</span></div>
    </div>
  </div>\n`;
});

html += `</div>`;

fs.writeFileSync('committee_html.txt', html);
console.log('HTML written to committee_html.txt');
