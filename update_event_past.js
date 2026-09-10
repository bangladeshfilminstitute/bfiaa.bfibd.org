const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const regexDate = /<div class="event-date">📅 29 DECEMBER @ 9\.00 PM<\/div>/g;
indexContent = indexContent.replace(regexDate, '<div class="event-date">📅 29 DECEMBER 2022 @ 9.00 PM</div>');

const regexBadge = /<span class="event-type-badge">SCREENING LIVE<\/span>/g;
indexContent = indexContent.replace(regexBadge, '<span class="event-type-badge">PAST SCREENING</span>');

const regexDesc = /We are very happy to announce that on Thursday, December 29th, the BFIAA monthly "Cine Club Adda" will feature a screening of/g;
indexContent = indexContent.replace(regexDesc, 'On Thursday, December 29th, 2022, the BFIAA monthly "Cine Club Adda" hosted a special screening of');

const regexDesc2 = /The film will be screened online via Zoom and Facebook Live\. The event will be hosted by/g;
indexContent = indexContent.replace(regexDesc2, 'The film was screened virtually via Zoom and Facebook Live, bringing together alumni from across the globe. The session was hosted by');

const regexTag = /<span class="event-tag">Online Event<\/span>/g;
indexContent = indexContent.replace(regexTag, '<span class="event-tag">Past Online Event</span>');

fs.writeFileSync('index.html', indexContent);
console.log('Event updated to past tense.');
