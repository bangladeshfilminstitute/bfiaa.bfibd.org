const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Update the Hero button and add the disclaimer
const heroOld = `<a href="#contact" class="btn-primary">🎬 Become a Member</a>`;
const heroNew = `<a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-primary">🎬 Become a Member</a>`;
content = content.replace(heroOld, heroNew);

const heroButtonsOld = `<a href="#about" class="btn-secondary">Learn More &rarr;</a>
  </div>`;
const heroButtonsNew = `<a href="#about" class="btn-secondary">Learn More &rarr;</a>
  </div>
  <p style="margin-top:20px; font-size:0.95rem; font-style:italic; color:var(--text-dim); text-align:center; animation: fadeInUp 0.8s ease-out 0.6s backwards;">* To become a member of BFIAA, you must have completed a BFI course and received a certificate.</p>`;
content = content.replace(heroButtonsOld, heroButtonsNew);

// 2. Update Nav "Join Us" button
const navOld = `<a href="#contact" class="nav-btn gold">Join Us &rarr;</a>`;
const navNew = `<a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="nav-btn gold">Join Us &rarr;</a>`;
content = content.replace(navOld, navNew);

// 3. Update Contact section description
const contactDescOld = `To apply for membership, inquire about events, or connect with the BFIAA committee,
        fill out the form below or reach us through the Bangladesh Film Institute.`;
const contactDescNew = `To inquire about events or connect with the BFIAA committee,
        reach us through the channels below. To apply for membership, please use the official membership registration form.`;
content = content.replace(contactDescOld, contactDescNew);

// 4. Replace the Form with a nice Link Banner
const formRegex = /<form class="contact-form" id="membershipForm"[\s\S]*?<\/form>/;
const replacementBanner = `
        <div class="contact-form" style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; background: rgba(200, 169, 81, 0.05); border: 1px dashed var(--gold-dark); border-radius: var(--radius);">
          <div style="font-size: 2.5rem; margin-bottom: 15px;">📋</div>
          <h3 style="color: var(--gold); margin-bottom: 10px; font-family: var(--font-title); font-size: 1.5rem;">Membership Registration</h3>
          <p style="color: var(--text-dim); margin-bottom: 25px; line-height: 1.6; max-width: 400px;">
            Please complete the official Google Form to apply for BFIAA membership. 
            <br><br>
            <span style="color: var(--crimson); font-style: italic;">* To become a member of BFIAA, you must have completed a BFI course and received a certificate.</span>
          </p>
          <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-primary" style="width: 100%; justify-content: center;">
            🔗 Open Registration Form
          </a>
        </div>
`;
content = content.replace(formRegex, replacementBanner);

fs.writeFileSync('index.html', content);
console.log('index.html updated successfully with Google Form links and disclaimers');
