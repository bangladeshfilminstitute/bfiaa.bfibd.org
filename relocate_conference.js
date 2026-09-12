const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const confSectionHeader = `<!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     BIENNIAL CONFERENCE 2019 SECTION
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->`;

const confSectionEnd = `</section>`;

const startIdx = indexContent.indexOf(confSectionHeader);
if (startIdx === -1) {
  console.error('Conference header not found');
  process.exit(1);
}

const endTag = '</section>';
const endIdx = indexContent.indexOf(endTag, startIdx) + endTag.length;

const confSectionBlock = indexContent.substring(startIdx, endIdx).trim();

// Remove from current location in head
indexContent = indexContent.substring(0, startIdx) + indexContent.substring(endIdx).replace(/^\s+/, '\n\n  ');

// Destination: right after Executive Committee section closes, before Events banner
const committeeCloseTag = `</section>\n\n<!-- ═══════════════════════════════════════════════════════\n     EVENTS / ACTIVITIES`;

if (!indexContent.includes(committeeCloseTag)) {
  // Let's try with \r\n
  const committeeCloseTagCRLF = `</section>\r\n\r\n<!-- ═══════════════════════════════════════════════════════\r\n     EVENTS / ACTIVITIES`;
  if (!indexContent.includes(committeeCloseTagCRLF)) {
    console.error('Could not find committee close tag before events');
    process.exit(1);
  }
  indexContent = indexContent.replace(
    committeeCloseTagCRLF,
    `</section>\r\n\r\n${confSectionBlock}\r\n\r\n<!-- ═══════════════════════════════════════════════════════\r\n     EVENTS / ACTIVITIES`
  );
} else {
  indexContent = indexContent.replace(
    committeeCloseTag,
    `</section>\n\n${confSectionBlock}\n\n<!-- ═══════════════════════════════════════════════════════\n     EVENTS / ACTIVITIES`
  );
}

fs.writeFileSync('index.html', indexContent, 'utf8');
console.log('Successfully repositioned Conference 2019 section directly below Executive Committee!');
