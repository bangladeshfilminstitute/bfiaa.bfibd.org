const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const confBlockRegex = /<!-- ■+[\r\n\s]+BIENNIAL CONFERENCE 2019 SECTION[\r\n\s]+■+ -->[\s\S]*?<\/section>\s*/;

const match = indexContent.match(confBlockRegex);
if (!match) {
  console.error('Could not find the conference section block to move!');
  process.exit(1);
}

const confBlockHTML = match[0].trim() + '\n\n';

// Remove the block from its current location
indexContent = indexContent.replace(confBlockRegex, '');

// Target destination: immediately before EVENTS section or its banner
const destRegex = /(<!-- [═=\s\S]*?EVENTS \/ ACTIVITIES[\s\S]*?-->[\s\r\n]*<section class="events-section" id="events")/;

if (!destRegex.test(indexContent)) {
  console.error('Could not find destination marker (EVENTS / ACTIVITIES)!');
  process.exit(1);
}

// Insert the block at destination
indexContent = indexContent.replace(destRegex, confBlockHTML + '$1');

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Successfully moved Conference 2019 section below Executive Committee and before Events & Activities!');
