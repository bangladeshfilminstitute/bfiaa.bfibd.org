const fs = require('fs');
const path = require('path');
const xml = fs.readFileSync(path.join(process.env.TEMP, 'sandip_docx', 'word', 'document.xml'), 'utf8');
const rels = fs.readFileSync(path.join(process.env.TEMP, 'sandip_docx', 'word', '_rels', 'document.xml.rels'), 'utf8');

const relMap = {};
const relMatches = rels.match(/<Relationship[^>]*\/>/g) || [];
relMatches.forEach(m => {
  const id = m.match(/Id="([^"]+)"/)?.[1];
  const target = m.match(/Target="([^"]+)"/)?.[1];
  if (id && target) relMap[id] = target;
});

const pMatches = xml.match(/<w:p\b[^>]*>[\s\S]*?<\/w:p>/g) || [];

pMatches.forEach((p, idx) => {
  if (p.includes('r:embed=')) {
    const embeds = (p.match(/r:embed="([^"]+)"/g) || []).map(e => e.replace(/r:embed="|"/g, ''));
    const files = embeds.map(e => relMap[e] || e);
    const text = p.replace(/<[^>]+>/g, '').trim();
    console.log(`Para ${idx+1}: [${files.join(', ')}] Text: "${text.substring(0, 80)}"`);
  }
});
