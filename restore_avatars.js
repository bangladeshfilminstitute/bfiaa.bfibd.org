const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The incorrect replacements look like this:
// <img class="member-avatar" src="images/sagir-avatar.jpg" alt="Sagir Mostafa" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid var(--gold-dark);" />
// And they are followed closely by the actual member-name. Let's do string replacement specifically for Sandip and Shanu.

const wrongImg = `<img class="member-avatar" src="images/sagir-avatar.jpg" alt="Sagir Mostafa" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid var(--gold-dark);" />`;

const sandipTarget = wrongImg + `
    <div class="member-info">
      <div class="member-name" style="font-size: 1.1rem; color: var(--gold);">Sandip Kumar Mistry</div>`;
const sandipFix = `<div class="member-avatar">SM</div>
    <div class="member-info">
      <div class="member-name" style="font-size: 1.1rem; color: var(--gold);">Sandip Kumar Mistry</div>`;
content = content.replace(sandipTarget, sandipFix);

const shanuTarget = wrongImg + `
    <div class="member-info">
      <div class="member-name" style="font-size: 1.1rem; color: var(--gold);">Shanu Manik</div>`;
const shanuFix = `<div class="member-avatar">SM</div>
    <div class="member-info">
      <div class="member-name" style="font-size: 1.1rem; color: var(--gold);">Shanu Manik</div>`;
content = content.replace(shanuTarget, shanuFix);

// Are there any other SMs? Let's use a regex to restore ANY leftover wrongImg in the committee grid
content = content.replace(new RegExp(wrongImg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '<div class="member-avatar">SM</div>');

fs.writeFileSync('index.html', content);
console.log('Restored SM avatars!');
