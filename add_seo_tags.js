const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/HP/Downloads/Antigravity/BFIAA.BFIBD.ORG';

function processFile(relPath, schemaJson) {
    const filePath = path.join(dir, relPath);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    const canonicalUrl = https://bfiaa.bfibd.org/;
    
    // Check if canonical already exists
    if (!content.includes('rel="canonical"')) {
        const canonicalTag = \n  <link rel="canonical" href="" />;
        content = content.replace('</title>', '</title>' + canonicalTag);
    }
    
    // Check if JSON-LD already exists
    if (!content.includes('application/ld+json') && schemaJson) {
        const scriptTag = \n  <script type="application/ld+json">\n\n  </script>;
        // insert before </head>
        content = content.replace('</head>', scriptTag + '\n</head>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(Processed: );
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bangladesh Film Institute Alumni Association",
  "alternateName": "BFIAA",
  "url": "https://bfiaa.bfibd.org",
  "logo": "https://bfiaa.bfibd.org/images/bfiaa-logo.png",
  "description": "Alumni association of Bangladesh Film Institute graduates",
  "parentOrganization": {
    "@type": "Organization",
    "name": "Bangladesh Film Institute",
    "url": "https://bfibd.org"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "BD",
    "addressLocality": "Dhaka"
  }
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Syed Oasiuddin Ahmed",
  "jobTitle": "Filmmaker, Documentary Director",
  "alumniOf": {
    "@type": "EducationalOrganization",
    "name": "Bangladesh Film Institute"
  },
  "worksFor": {
    "@type": "Organization",
    "name": "Bangladesh Film Institute Alumni Association"
  },
  "url": "https://bfiaa.bfibd.org/alumni/syed-oasiuddin-ahmed.html",
  "image": "https://bfiaa-bfibd.pages.dev/Alumni%20members%20indivisual%20pages/Syed%20Oasi%20Uddin%20Ahmed.jpg"
};

const eventSchema = (name, url) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": name,
  "url": url,
  "organizer": { "@type": "Organization", "name": "BFIAA", "url": "https://bfiaa.bfibd.org" },
  "location": { "@type": "Place", "address": { "@type": "PostalAddress", "addressCountry": "BD", "addressLocality": "Dhaka" } }
});

processFile('index.html', orgSchema);
processFile('alumni/syed-oasiuddin-ahmed.html', personSchema);

// Add basic canonical to others
const eventFiles = {
    'conference-2019.html': 'BFIAA Conference 2019',
    'conference-2021.html': 'BFIAA Conference 2021',
    '30-years-event.html': '30 Years Celebration',
    'uralchitra-special.html': 'Uralchitra Special Event',
    'event-cinema-kotha.html': 'Cinema Kotha Event',
    'event-ec-meeting.html': 'EC Meeting',
    'event-man.html': 'Man Film Flyer Release',
    'event-pounopunik.html': 'Pounopunik Screening',
    'event-songsoptok.html': 'Songsoptok Event'
};

for (const [file, name] of Object.entries(eventFiles)) {
    processFile(file, eventSchema(name, https://bfiaa.bfibd.org/));
}

// Just canonical for constitution
processFile('constitution.html', null);

