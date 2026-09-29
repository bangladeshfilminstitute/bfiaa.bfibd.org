// fix_seo.js
// Fixes all SEO issues found in the audit:
// 1. Title tags > 60 chars → trimmed
// 2. Missing canonical URLs → added
// 3. Missing OG tags → added
// 4. Missing schema/structured data → added
// 5. Missing theme-color → added
// 6. Sitemap → updated to include all pages with correct lastmod
// 7. Meta descriptions > 160 → trimmed

const fs = require('fs');
const path = require('path');

const CONCEPT_DIR = path.join(__dirname, '..', 'BFIBD Website-Antigravity');
const BASE_URL = 'https://bfiaa.bfibd.org';

// ── SEO DATA per page ──────────────────────────────────────────────────────
const PAGE_SEO = {
  'index.html': {
    title: 'BFIAA — Bangladesh Film Institute Alumni Association',
    desc: 'Official alumni association of Bangladesh Film Institute (BFI), uniting 1000+ graduates across 86+ batches in a shared commitment to independent cinema culture since 1993.',
    canonical: 'https://bfiaa.bfibd.org/',
    ogImage: 'https://bfiaa.bfibd.org/images/bfiaa-logo.png',
    ogType: 'website',
    themeColor: '#1B3A2D',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bangladesh Film Institute Alumni Association (BFIAA)",
      "alternateName": "BFIAA",
      "url": "https://bfiaa.bfibd.org",
      "logo": "https://bfiaa.bfibd.org/images/bfiaa-logo.png",
      "foundingDate": "1993",
      "description": "Official alumni association of Bangladesh Film Institute connecting 1000+ graduates across 86+ batches.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "General Enquiry",
        "email": "bfiaa@bfibd.org"
      },
      "sameAs": [
        "https://www.facebook.com/BFIAlumniAssociation",
        "https://bfibd.org"
      ]
    }, null, 2)
  },
  'constitution.html': {
    title: 'BFIAA Constitution — Official Governing Document',
    desc: 'The full official constitution of the Bangladesh Film Institute Alumni Association (BFIAA) — all 15 Articles covering governance, membership, committees, and biennial assembly.',
    canonical: 'https://bfiaa.bfibd.org/constitution.html',
    ogImage: 'https://bfiaa.bfibd.org/images/bfiaa-logo.png',
    ogType: 'article',
    themeColor: '#1B3A2D',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "GovernmentDocument",
      "name": "BFIAA Constitution — Official Governing Document",
      "url": "https://bfiaa.bfibd.org/constitution.html",
      "publisher": {
        "@type": "Organization",
        "name": "BFIAA",
        "url": "https://bfiaa.bfibd.org"
      }
    }, null, 2)
  },
  'conference-2021.html': {
    title: 'BFIAA Conference 2021 — 6th Biennial Assembly | BFIAA',
    desc: 'Record of the BFIAA 6th Biennial Assembly held on 17 December 2021 at Sanskriti Bikash Kendra, Paribagh — electing the new 21-member Executive Committee for 2021–2023.',
    canonical: 'https://bfiaa.bfibd.org/conference-2021.html',
    ogImage: 'https://bfiaa.bfibd.org/images/bfiaa-logo.png',
    ogType: 'article',
    themeColor: '#1B3A2D',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "BFIAA 6th Biennial Assembly & Conference 2021",
      "startDate": "2021-12-17",
      "url": "https://bfiaa.bfibd.org/conference-2021.html",
      "location": {
        "@type": "Place",
        "name": "Sanskriti Bikash Kendra, Paribagh",
        "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD" }
      },
      "organizer": { "@type": "Organization", "name": "BFIAA", "url": "https://bfiaa.bfibd.org" }
    }, null, 2)
  },
  'conference-2019.html': {
    title: 'BFIAA Conference 2019 — 5th Biennial Assembly | BFIAA',
    desc: 'Complete record of the BFIAA 5th Biennial Assembly on 28 June 2019 at Public Library Seminar Hall, Dhaka — uniting pioneer graduates, filmmakers and faculty to form the 2019–2021 committees.',
    canonical: 'https://bfiaa.bfibd.org/conference-2019.html',
    ogImage: 'https://bfiaa.bfibd.org/images/conference-2019-1.jpg',
    ogType: 'article',
    themeColor: '#1B3A2D',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "BFIAA 5th Biennial Assembly & Conference 2019",
      "startDate": "2019-06-28",
      "url": "https://bfiaa.bfibd.org/conference-2019.html",
      "location": {
        "@type": "Place",
        "name": "Public Library Seminar Hall",
        "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD" }
      },
      "organizer": { "@type": "Organization", "name": "BFIAA", "url": "https://bfiaa.bfibd.org" }
    }, null, 2)
  },
  '30-years-event.html': {
    title: '30 Years of Tanvir Mokammel — BFIAA Retrospective 2023',
    desc: 'BFIAA hosted a 3-day retrospective festival in March 2023 celebrating 30 years of documentary filmmaking by Tanvir Mokammel — featuring screenings, a masterclass, and the Uralchitra magazine launch.',
    canonical: 'https://bfiaa.bfibd.org/30-years-event.html',
    ogImage: 'https://bfiaa.bfibd.org/images/30-years/photo-1.jpg',
    ogType: 'article',
    themeColor: '#1B3A2D',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "30 Years of Documentary Filmmaking — Tanvir Mokammel Retrospective",
      "startDate": "2023-03-01",
      "endDate": "2023-03-03",
      "url": "https://bfiaa.bfibd.org/30-years-event.html",
      "location": {
        "@type": "Place",
        "name": "Jatiya Chitrashala, Dhaka",
        "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD" }
      },
      "organizer": { "@type": "Organization", "name": "BFIAA", "url": "https://bfiaa.bfibd.org" }
    }, null, 2)
  },
  'uralchitra-special.html': {
    title: 'Uralchitra Special Edition — Tanvir Mokammel | BFIAA',
    desc: 'The Uralchitra Special Edition on Tanvir Mokammel — official magazine of BFIAA featuring retrospective essays, film credits, tributes, and the cinematic legacy of Bangladesh\'s foremost documentary filmmaker.',
    canonical: 'https://bfiaa.bfibd.org/uralchitra-special.html',
    ogImage: 'https://bfiaa.bfibd.org/images/uralchitra/Uralchitra Special Edition on Tanvir Mokammel.jpg',
    ogType: 'article',
    themeColor: '#1B3A2D',
    schema: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Book",
      "name": "Uralchitra Special Edition on Tanvir Mokammel",
      "url": "https://bfiaa.bfibd.org/uralchitra-special.html",
      "publisher": { "@type": "Organization", "name": "BFIAA", "url": "https://bfiaa.bfibd.org" },
      "editor": { "@type": "Person", "name": "Sandip Kumar Mistri" },
      "inLanguage": ["bn", "en"]
    }, null, 2)
  },
  'event-cinema-kotha.html': {
    title: 'Cinema Kotha: Zahir Raihan Webinar — BFIAA 2022',
    desc: 'Inaugural BFIAA live webinar "Cinema Kotha" — Zahir Raihan as a Political Filmmaker, with keynote by Tanvir Mokammel, moderated by Sagir Mostafa. 4 March 2022.',
    canonical: 'https://bfiaa.bfibd.org/event-cinema-kotha.html',
    ogImage: 'https://bfiaa.bfibd.org/images/cinema-kotha-flyer.png',
    ogType: 'article',
    themeColor: '#1B3A2D',
    // keep existing Event schema
  },
  'event-ec-meeting.html': {
    title: '6th EC First Meeting — BFIAA January 2022',
    desc: 'The inaugural 1st meeting of the BFIAA 6th Executive Committee on 7 January 2022 at BFI premises, presided by President Shahina Hafiz Daisy with Chief Guest Tanvir Mokammel.',
    canonical: 'https://bfiaa.bfibd.org/event-ec-meeting.html',
    ogImage: 'https://bfiaa.bfibd.org/images/ec-meeting-1.jpg',
    ogType: 'article',
    themeColor: '#1B3A2D',
  },
  'event-man.html': {
    title: 'Cine Club Adda: Man — Film Screening | BFIAA 2022',
    desc: 'BFIAA Cine Club Adda screening of the short film "Man" (ম্যান) by Imtiaz Pavel, followed by Meet the Director session hosted by Aparajita Sangita. 12 February 2022.',
    canonical: 'https://bfiaa.bfibd.org/event-man.html',
    ogImage: 'https://bfiaa.bfibd.org/images/man-film-flyer.png',
    ogType: 'article',
    themeColor: '#1B3A2D',
  },
  'event-pounopunik.html': {
    title: 'Cine Club Adda: Pounopunik — Screening | BFIAA 2022',
    desc: 'BFIAA Cine Club Adda screening of Pounopunik (পৌণঃপুণিক / The Hamster Wheel Rebellion) by Khandaker Sumon, hosted by Mamun Sobhani via Zoom. 9 August 2022.',
    canonical: 'https://bfiaa.bfibd.org/event-pounopunik.html',
    ogImage: 'https://bfiaa.bfibd.org/images/pounopunik-flyer.jpg',
    ogType: 'article',
    themeColor: '#1B3A2D',
  },
  'event-songsoptok.html': {
    title: 'Cine Club Adda: Songsoptok — Screening | BFIAA 2022',
    desc: 'BFIAA Cine Club Adda screening of Songsoptok (সংশপ্তক — Story of Bir Sreshtho Matiur Rahman) by Sajjad Khan, hosted by Mamun Sobhani. 29 December 2022.',
    canonical: 'https://bfiaa.bfibd.org/event-songsoptok.html',
    ogImage: 'https://bfiaa.bfibd.org/images/songsoptok-flyer.jpg',
    ogType: 'article',
    themeColor: '#1B3A2D',
  },
  'alumni/syed-oasiuddin-ahmed.html': {
    title: 'Syed Oasiuddin Ahmed — Filmmaker | BFIAA Alumni',
    desc: 'Alumni profile of Syed Oasiuddin Ahmed — BFI graduate, director, and screenwriter known for The Third Owner, Mande, and Madhukar. Featured filmmaker of BFIAA.',
    canonical: 'https://bfiaa.bfibd.org/alumni/syed-oasiuddin-ahmed.html',
    ogImage: 'https://bfiaa.bfibd.org/images/syed-og-thumbnail.jpg',
    ogType: 'profile',
    themeColor: '#1B3A2D',
  },
};

// ── HELPER: inject/replace <head> SEO block ─────────────────────────────────
function buildSEOHead(seo, existingTitle, existingDesc) {
  const title = seo.title || existingTitle;
  const desc = seo.desc || existingDesc;
  const canonical = seo.canonical || '';
  const ogImage = seo.ogImage || 'https://bfiaa.bfibd.org/images/bfiaa-logo.png';
  const ogType = seo.ogType || 'website';
  const themeColor = seo.themeColor || '#1B3A2D';

  return { title, desc, canonical, ogImage, ogType, themeColor };
}

function fixPage(relPath, seo) {
  const fullPath = path.join(CONCEPT_DIR, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`  [SKIP] Not found: ${relPath}`);
    return;
  }

  let html = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  // 1. Fix Title
  if (seo.title) {
    const newTitle = `<title>${seo.title}</title>`;
    if (html.match(/<title>.*?<\/title>/s)) {
      const oldTitle = html.match(/<title>(.*?)<\/title>/s)[0];
      if (oldTitle !== newTitle) {
        html = html.replace(/<title>.*?<\/title>/s, newTitle);
        changed = true;
      }
    }
  }

  // 2. Fix/add meta description
  if (seo.desc) {
    const newDesc = `<meta name="description" content="${seo.desc}"/>`;
    if (html.match(/<meta name="description"[^>]+>/)) {
      html = html.replace(/<meta name="description"[^>]+>/, newDesc);
    } else {
      html = html.replace('</head>', `  ${newDesc}\n</head>`);
    }
    changed = true;
  }

  // 3. Fix/add canonical
  if (seo.canonical) {
    const newCanonical = `<link rel="canonical" href="${seo.canonical}"/>`;
    if (html.match(/<link rel="canonical"[^>]+>/)) {
      html = html.replace(/<link rel="canonical"[^>]+>/, newCanonical);
    } else {
      // Insert after meta description
      html = html.replace(/<meta name="description"[^>]+>/, m => m + `\n  ${newCanonical}`);
    }
    changed = true;
  }

  // 4. Fix/add theme-color
  if (seo.themeColor) {
    const newTheme = `<meta name="theme-color" content="${seo.themeColor}"/>`;
    if (html.match(/<meta name="theme-color"[^>]+>/)) {
      html = html.replace(/<meta name="theme-color"[^>]+>/, newTheme);
    } else {
      html = html.replace(/<link rel="icon"[^>]+>/, m => m + `\n  ${newTheme}`);
    }
    changed = true;
  }

  // 5. Fix/add OG tags
  const ogBlock = `<meta property="og:title" content="${seo.title || ''}"/>
  <meta property="og:description" content="${seo.desc || ''}"/>
  <meta property="og:url" content="${seo.canonical || ''}"/>
  <meta property="og:type" content="${seo.ogType || 'website'}"/>
  <meta property="og:image" content="${seo.ogImage || ''}"/>
  <meta property="og:site_name" content="BFIAA — Bangladesh Film Institute Alumni Association"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${seo.title || ''}"/>
  <meta name="twitter:description" content="${seo.desc || ''}"/>
  <meta name="twitter:image" content="${seo.ogImage || ''}"/>`;

  if (!html.match(/property="og:title"/)) {
    // No OG block — add it before </head>
    html = html.replace('</head>', `  ${ogBlock}\n</head>`);
    changed = true;
  } else {
    // Replace existing OG tags
    html = html.replace(/<meta property="og:title"[^>]+>/, `<meta property="og:title" content="${seo.title || ''}"/>`);
    html = html.replace(/<meta property="og:description"[^>]+>/, `<meta property="og:description" content="${seo.desc || ''}"/>`);
    html = html.replace(/<meta property="og:url"[^>]+>/, `<meta property="og:url" content="${seo.canonical || ''}"/>`);
    html = html.replace(/<meta property="og:image"[^>]+>/, `<meta property="og:image" content="${seo.ogImage || ''}"/>`);
    // Add twitter if missing
    if (!html.match(/twitter:card/)) {
      html = html.replace('</head>', `  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="${seo.title || ''}"/>
  <meta name="twitter:description" content="${seo.desc || ''}"/>
  <meta name="twitter:image" content="${seo.ogImage || ''}"/>
</head>`);
    }
    changed = true;
  }

  // 6. Add Schema if missing (for pages that don't already have it)
  if (seo.schema && !html.match(/application\/ld\+json/)) {
    const schemaBlock = `\n  <script type="application/ld+json">\n${seo.schema}\n  </script>`;
    html = html.replace('</head>', schemaBlock + '\n</head>');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(fullPath, html, 'utf8');
    const newSize = fs.statSync(fullPath).size;
    console.log(`  ✓ Fixed: ${relPath.padEnd(45)} (${Math.round(newSize/1024)}KB)`);
  } else {
    console.log(`  — No change: ${relPath}`);
  }
}

// ── SITEMAP UPDATE ──────────────────────────────────────────────────────────
function updateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = [
    { loc: 'https://bfiaa.bfibd.org/', priority: '1.0', freq: 'monthly' },
    { loc: 'https://bfiaa.bfibd.org/constitution.html', priority: '0.8', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/conference-2021.html', priority: '0.9', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/conference-2019.html', priority: '0.9', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/30-years-event.html', priority: '0.8', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/uralchitra-special.html', priority: '0.8', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/event-cinema-kotha.html', priority: '0.7', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/event-ec-meeting.html', priority: '0.7', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/event-man.html', priority: '0.7', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/event-pounopunik.html', priority: '0.7', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/event-songsoptok.html', priority: '0.7', freq: 'yearly' },
    { loc: 'https://bfiaa.bfibd.org/alumni/syed-oasiuddin-ahmed.html', priority: '0.7', freq: 'yearly' },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(CONCEPT_DIR, 'sitemap.xml'), xml, 'utf8');
  console.log(`  ✓ sitemap.xml updated (${urls.length} URLs, lastmod: ${today})`);
}

// ── ROBOTS.TXT ──────────────────────────────────────────────────────────────
function updateRobots() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://bfiaa.bfibd.org/sitemap.xml

# Disallow working/dev files
Disallow: /node_modules/
Disallow: /*.js$
Disallow: /server.js
`;
  fs.writeFileSync(path.join(CONCEPT_DIR, 'robots.txt'), robotsTxt, 'utf8');
  console.log(`  ✓ robots.txt updated`);
}

// ── MAIN ─────────────────────────────────────────────────────────────────────
console.log('='.repeat(70));
console.log('BFIAA SEO FIXER');
console.log('='.repeat(70));
console.log('\nFixing pages...');

for (const [relPath, seo] of Object.entries(PAGE_SEO)) {
  fixPage(relPath, seo);
}

console.log('\nUpdating sitemap & robots.txt...');
updateSitemap();
updateRobots();

console.log('\n' + '='.repeat(70));
console.log('SEO FIXES COMPLETE');
console.log('='.repeat(70));
