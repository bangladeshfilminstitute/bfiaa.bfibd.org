const fs = require('fs');

let content = fs.readFileSync('css/style.css', 'utf8');

const target = `.member-name {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`;

const replacement = `.member-name {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 3px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}`;

// I added -webkit-line-clamp: 2 so it doesn't wrap to 3 lines and break things too much. Or just let it wrap naturally?
// The user asked to fix cut off names. The longest name is "Kazi Mushfiqus Saleheen". That easily fits in 2 lines.

if(content.includes(target)) {
  content = content.replace(target, replacement);
} else {
  // Try CRLF
  const targetCRLF = target.replace(/\n/g, '\r\n');
  if(content.includes(targetCRLF)) {
    content = content.replace(targetCRLF, replacement);
  } else {
    // Regex
    const regex = /\.member-name\s*\{\s*font-family:\s*var\(--font-body\);\s*font-size:\s*0\.9rem;\s*font-weight:\s*700;\s*color:\s*var\(--text\);\s*margin-bottom:\s*3px;\s*white-space:\s*nowrap;\s*overflow:\s*hidden;\s*text-overflow:\s*ellipsis;\s*\}/;
    content = content.replace(regex, replacement);
  }
}

fs.writeFileSync('css/style.css', content);
console.log("Updated member-name css");
