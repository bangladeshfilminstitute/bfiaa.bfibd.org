const fs = require('fs');
let indexContent = fs.readFileSync('index.html', 'utf8');

// 1. Fix Tanvir's avatar
indexContent = indexContent.replace(
  /<img class="president-avatar" src="images\/tanvir-avatar\.jpg"[^>]*>/i,
  '<img class="president-avatar" src="images/tanvir-avatar.jpg" alt="Tanvir Mokammel" style="width: 80px; height: 80px; border-radius: 50%; object-fit: contain; background: #fff; padding: 4px; margin: 0 auto 15px auto; border: 3px solid var(--gold-dark); box-sizing: border-box;" />'
);

// 2. Fix Sagir's avatar
indexContent = indexContent.replace(
  /<img class="president-avatar" src="images\/sagir-avatar\.jpg"[^>]*>/i,
  '<img class="president-avatar" src="images/sagir-avatar.jpg" alt="Sagir Mostafa" style="width: 80px; height: 80px; border-radius: 50%; object-fit: contain; background: #fff; padding: 4px; margin: 0 auto 15px auto; border: 3px solid var(--gold-dark); box-sizing: border-box;" />'
);

// 3. Fix Sohel Ahmed Siddiquee
// Currently it is:
// <div class="member-card reveal reveal-delay-0">
//   <div class="member-avatar">SS</div>
//   <div class="member-info">
//     <div class="member-name" style="font-size: 1.1rem; color: var(--gold);">Sohel Ahmed Siddiquee</div>
// ...
// We will replace <div class="member-avatar">SS</div> with the new image tag.
const sohelRegex = /<div class="member-avatar">SS<\/div>\s*<div class="member-info">\s*<div class="member-name"([^>]*)>Sohel Ahmed Siddiquee<\/div>/i;
indexContent = indexContent.replace(
  sohelRegex,
  '<img class="member-avatar" src="images/sohel-avatar.jpg" alt="Sohel Ahmed Siddiquee" style="object-fit: contain; background: #fff; padding: 3px; box-sizing: border-box;" />\n    <div class="member-info">\n      <div class="member-name"$1>Sohel Ahmed Siddiquee</div>'
);

fs.writeFileSync('index.html', indexContent);
console.log('Avatars updated successfully.');
