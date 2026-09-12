const fs = require('fs');

const eventFiles = [
  'event-songsoptok.html',
  'event-pounopunik.html',
  'event-cinema-kotha.html',
  'event-man.html'
];

const exactFooter = `<footer class="site-footer" role="contentinfo">
  <div class="footer-inner">
    <div class="footer-top">

      <div class="footer-brand">
        <div class="footer-logo">
          <img src="images/bfiaa-logo.png" alt="BFIAA" onerror="this.style.display='none'"/>
          <div class="footer-logo-text">BFIAA<br><span style="font-size:10px;letter-spacing:1px;color:var(--text-dim);">Bangladesh Film Institute<br>Alumni Association</span></div>
        </div>
        <p class="footer-brand-desc">
          The official alumni association of the Bangladesh Film Institute —
          connecting 1000+ graduates across 86+ batches in a shared love of cinema.
        </p>
        <div class="footer-social">
          <a href="https://bfibd.org" class="social-btn" title="BFI Main Site" target="_blank" rel="noopener">🎬</a>
          <a href="https://www.facebook.com/BFIAlumniAssociation" class="social-btn" title="Facebook" target="_blank" rel="noopener">f</a>
          <a href="#" class="social-btn" title="YouTube">▶</a>
        </div>
      </div>

      <div class="footer-col">
        <h4>Navigate</h4>
        <ul>
          <li><a href="https://bfiaa.bfibd.org/">Home</a></li>
          <li><a href="https://bfiaa.bfibd.org/#about">About BFIAA</a></li>
          <li><a href="https://bfiaa.bfibd.org/#mission">Mission</a></li>
          <li><a href="https://bfiaa.bfibd.org/#committee">Committee</a></li>
          <li><a href="https://bfiaa.bfibd.org/#events">Events</a></li>
          <li><a href="https://bfiaa.bfibd.org/#magazine">Uralchitra</a></li>
          <li><a href="https://bfiaa.bfibd.org/#picnic">Picnic</a></li>
          <li><a href="https://bfiaa.bfibd.org/#gallery">Gallery</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>Documents</h4>
        <ul>
          <li><a href="constitution.html">Constitution</a></li>
          <li><a href="https://bfiaa.bfibd.org/#membership">Membership Info</a></li>
          <li><a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener">Apply to Join</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4>BFI Network</h4>
        <ul>
          <li><a href="https://bfibd.org" target="_blank" rel="noopener">bfibd.org (Main Site)</a></li>
          <li><a href="https://archive.bfibd.org" target="_blank" rel="noopener">BFI Photo Archive</a></li>
          <li><a href="https://bfibd.org/our-courses/" target="_blank" rel="noopener">BFI Courses</a></li>
          <li><a href="https://tanvirmokammel.info" target="_blank" rel="noopener">Tanvir Mokammel</a></li>
        </ul>
      </div>

    </div>

    <div class="footer-bottom">
      <p class="footer-copy">
        © 2026 BANGLADESH FILM INSTITUTE ALUMNI ASSOCIATION · bfiaa.bfibd.org
      </p>
      <a href="https://bfibd.org" class="footer-parent-link" target="_blank" rel="noopener">
        A SUBDOMAIN OF BFIBD.ORG →
      </a>
    </div>
  </div>
</footer>`;

eventFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`File ${file} not found!`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // 1. Update navigation on top to include Home button linking to https://bfiaa.bfibd.org/
  const navRegex = /<nav class="site-nav"[\s\S]*?<\/nav>/;
  const newNav = `<nav class="site-nav" role="navigation">
  <a href="https://bfiaa.bfibd.org/" class="nav-logo" style="text-decoration: none;" aria-label="Homepage">
    <img src="images/bfiaa-logo.png" alt="BFIAA Logo" onerror="this.style.display='none'"/>
  </a>
  <ul class="nav-links">
    <li><a href="https://bfiaa.bfibd.org/">Home</a></li>
    <li><a href="https://bfiaa.bfibd.org/#about">About</a></li>
    <li><a href="https://bfiaa.bfibd.org/#committee">Committee</a></li>
    <li><a href="https://bfiaa.bfibd.org/#events">Events</a></li>
    <li><a href="constitution.html">Constitution</a></li>
    <li><a href="https://bfiaa.bfibd.org/#contact">Contact</a></li>
  </ul>
  <div class="nav-actions">
    <a href="https://bfiaa.bfibd.org/" class="nav-btn" style="background:var(--dark-card); border-color:var(--gold); color:var(--gold);">🏠 Home</a>
    <a href="https://bfiaa.bfibd.org/#events" class="nav-btn">← All Events</a>
    <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="nav-btn gold">Join BFIAA</a>
  </div>
</nav>`;

  content = content.replace(navRegex, newNav);

  // 2. Replace the footer with the exact homepage footer
  const footerRegex = /<footer class="site-footer"[\s\S]*?<\/footer>/;
  content = content.replace(footerRegex, exactFooter);

  // 3. In the bottom action links, also offer Home button alongside Back to All Events
  content = content.replace(
    /<a href="index\.html#events" class="btn-secondary">← Back to All Events<\/a>/g,
    `<a href="https://bfiaa.bfibd.org/" class="btn-secondary" style="border-color:var(--gold); color:var(--gold);">🏠 Home</a>\n          <a href="https://bfiaa.bfibd.org/#events" class="btn-secondary">← All Events</a>`
  );

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated navigation and footer for ${file}`);
});
