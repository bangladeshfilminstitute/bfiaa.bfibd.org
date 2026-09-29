// create_films_page.js
// Creates the films.html archive page
const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'films.html');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Alumni Films \u2014 BFIAA | Bangladesh Film Institute Alumni Association</title>
  <meta name="description" content="Complete archive of films directed by BFIAA members \u2014 documentaries, short films, and features spanning decades of independent cinema in Bangladesh."/>
  <link rel="canonical" href="https://bfiaa.bfibd.org/films.html"/>
  <link rel="icon" type="image/png" href="images/bfiaa-logo.png"/>
  <meta name="theme-color" content="#06100d"/>
  <meta property="og:title" content="Alumni Films \u2014 BFIAA"/>
  <meta property="og:description" content="Films by Bangladesh Film Institute alumni \u2014 a growing archive of independent cinema."/>
  <meta property="og:url" content="https://bfiaa.bfibd.org/films.html"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="https://bfiaa.bfibd.org/images/syed-og-thumbnail.jpg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Hind+Siliguri:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/editorial.css"/>
  <style>
    :root{--afs-bg:#06100d;--afs-surface:#0c1710;--afs-cream:#f1eadc;--afs-muted:#8a9190;--afs-accent:#d2ad6b;--afs-border:rgba(255,255,255,0.10);}
    .films-archive-page{background:var(--afs-bg);min-height:100vh;padding:120px 0 80px;}
    .films-archive-inner{max-width:1280px;margin:0 auto;padding:0 32px;}
    .fa-hero{margin-bottom:64px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:48px;}
    .fa-eyebrow{display:flex;align-items:center;gap:14px;margin-bottom:18px;}
    .fa-eyebrow-line{display:block;width:36px;height:1px;background:var(--afs-accent);}
    .fa-eyebrow-text{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--afs-accent);}
    .fa-heading{font-family:'Cormorant Garamond',serif;font-size:clamp(2.5rem,5vw,4.5rem);font-weight:700;color:var(--afs-cream);line-height:1.1;margin:0 0 20px;}
    .fa-heading em{font-style:italic;color:var(--afs-accent);}
    .fa-desc{font-size:1rem;color:var(--afs-muted);line-height:1.75;max-width:540px;margin:0;}
    .fa-stats{display:flex;gap:40px;margin-top:32px;}
    .fa-stat-num{font-family:'Cormorant Garamond',serif;font-size:2.2rem;font-weight:700;color:var(--afs-accent);line-height:1;}
    .fa-stat-lbl{font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--afs-muted);margin-top:6px;}
    .fa-alumnus-group{margin-bottom:72px;}
    .fa-alumnus-header{display:flex;align-items:center;gap:20px;margin-bottom:36px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.07);}
    .fa-alumnus-name{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:700;color:var(--afs-cream);margin:0;}
    .fa-alumnus-link{font-family:'Space Mono',monospace;font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--afs-accent);text-decoration:none;border:1px solid rgba(210,173,107,0.35);padding:6px 14px;border-radius:3px;transition:all 0.2s;margin-left:auto;}
    .fa-alumnus-link:hover{background:rgba(210,173,107,0.08);border-color:var(--afs-accent);}
    .fa-film-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:28px;}
    .fa-film-card{display:block;text-decoration:none;border-radius:10px;overflow:hidden;background:var(--afs-surface);border:1px solid var(--afs-border);transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s ease;}
    .fa-film-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(210,173,107,0.3);border-color:rgba(210,173,107,0.3);}
    .fa-film-card:focus-visible{outline:none;box-shadow:0 0 0 3px var(--afs-accent);}
    .fa-film-poster{width:100%;aspect-ratio:2/3;object-fit:cover;display:block;}
    .fa-film-info{padding:14px 16px 18px;border-top:1px solid rgba(210,173,107,0.15);}
    .fa-film-meta{font-family:'Space Mono',monospace;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--afs-muted);margin-bottom:8px;display:flex;gap:8px;flex-wrap:wrap;}
    .fa-film-title-bn{font-family:'Hind Siliguri',sans-serif;font-size:1rem;font-weight:600;color:var(--afs-cream);margin:0 0 3px;}
    .fa-film-title-en{font-family:'Cormorant Garamond',serif;font-size:0.78rem;font-style:italic;color:var(--afs-accent);margin:0;}
    .fa-back-row{margin-bottom:48px;}
    .fa-back-link{font-family:'Space Mono',monospace;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--afs-muted);text-decoration:none;display:inline-flex;align-items:center;gap:8px;transition:color 0.2s;}
    .fa-back-link:hover{color:var(--afs-cream);}
    @media(max-width:600px){.films-archive-inner{padding:0 16px;}.fa-film-grid{grid-template-columns:repeat(2,1fr);gap:16px;}.fa-stats{gap:24px;}.fa-heading{font-size:2.2rem;}.fa-alumnus-header{flex-wrap:wrap;}.fa-alumnus-link{margin-left:0;}}
  </style>
</head>
<body>
  <header class="site-header" role="banner">
    <div class="header-inner">
      <a href="index.html#home" class="header-brand" aria-label="BFIAA Home">
        <img src="images/bfiaa-logo.png" alt="BFIAA" onerror="this.style.display='none'"/>
      </a>
      <nav class="header-nav" role="navigation" aria-label="Main navigation">
        <a href="index.html#home">Home</a>
        <a href="index.html#about">About</a>
        <a href="index.html#founder">Founder</a>
        <a href="index.html#committee">Committee</a>
        <a href="index.html#conferences">Conferences</a>
        <a href="index.html#alumni">Alumni</a>
        <a href="index.html#alumni-films" class="active">Films</a>
        <a href="index.html#events">Events</a>
        <a href="index.html#retrospective">30 Years</a>
        <a href="index.html#publications">Publications</a>
        <a href="index.html#contact">Contact</a>
      </nav>
      <div class="header-actions">
        <a href="https://bfibd.org" target="_blank" rel="noopener" class="btn-bfi-home"><img src="images/bfi-logo.png" alt="BFI" style="height:14px;width:auto;"/>BFI Main Site</a>
        <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-member">Become a Member</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
  <nav class="mobile-nav" id="mobileNav">
    <a href="index.html#home">Home</a>
    <a href="index.html#alumni">Featured Alumni</a>
    <a href="index.html#alumni-films">Alumni Films</a>
    <a href="index.html#events">Events</a>
    <a href="index.html#contact">Contact &amp; Join</a>
    <div class="mobile-cta-group">
      <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="mobile-cta-member">Become a Member</a>
      <a href="https://bfibd.org" target="_blank" rel="noopener" class="mobile-cta-bfi">Visit BFI Main Site &#8594;</a>
    </div>
  </nav>

  <main class="films-archive-page" id="main">
    <div class="films-archive-inner">
      <div class="fa-back-row">
        <a href="index.html#alumni-films" class="fa-back-link">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"></polyline></svg>
          Back to Homepage
        </a>
      </div>
      <div class="fa-hero">
        <div class="fa-eyebrow">
          <span class="fa-eyebrow-line"></span>
          <span class="fa-eyebrow-text">Full Archive</span>
        </div>
        <h1 class="fa-heading">Alumni <em>Film Archive</em></h1>
        <p class="fa-desc">A growing archive of films directed by Bangladesh Film Institute alumni \u2014 documentaries, short films, and features that reflect the diversity and depth of BFI\u2019s filmmaking education.</p>
        <div class="fa-stats">
          <div><div class="fa-stat-num" id="filmCount">6</div><div class="fa-stat-lbl">Films</div></div>
          <div><div class="fa-stat-num">1</div><div class="fa-stat-lbl">Filmmakers</div></div>
          <div><div class="fa-stat-num">2012\u20132025</div><div class="fa-stat-lbl">Active Years</div></div>
        </div>
      </div>
      <div id="filmsArchiveRoot"></div>
    </div>
  </main>

  <footer class="site-footer" role="contentinfo">
    <div class="filmstrip-border left" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
    <div class="filmstrip-border right" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
    <div class="container footer-top">
      <div class="footer-cols">
        <div>
          <a href="index.html#home" style="display:inline-block;text-decoration:none;"><img src="images/bfiaa-logo.png" alt="BFIAA Logo" style="height:42px;width:auto;margin-bottom:16px;display:block;" onerror="this.style.display='none'"/></a>
          <p class="footer-brand-desc">The official alumni body of Bangladesh Film Institute, connecting over 1,000 graduates across 86+ batches.</p>
        </div>
        <div>
          <div class="footer-col-title">Navigation</div>
          <ul class="footer-links-list">
            <li><a href="index.html#home">Home</a></li>
            <li><a href="index.html#alumni">Featured Alumni</a></li>
            <li><a href="index.html#alumni-films">Alumni Films</a></li>
            <li><a href="index.html#events">Events</a></li>
            <li><a href="index.html#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <div class="footer-col-title">BFI Network</div>
          <ul class="footer-links-list">
            <li><a href="https://bfibd.org" target="_blank" rel="noopener">bfibd.org</a></li>
            <li><a href="https://tanvirmokammel.info" target="_blank" rel="noopener">Tanvir Mokammel</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <div>&copy; 2026 Bangladesh Film Institute Alumni Association (BFIAA). All rights reserved.</div>
        <div>Dedicated to Alternative &amp; Independent Cinema in Bangladesh.</div>
      </div>
    </div>
  </footer>

  <script>
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => { const o = mobileNav.classList.toggle('open'); hamburger.setAttribute('aria-expanded', o); });
      mobileNav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => { mobileNav.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); }));
    }

    const alumniFilmsArchive = [
      {
        alumnusName: "Syed Oasiuddin Ahmed",
        alumnusSlug: "syed-oasiuddin-ahmed",
        filmAnchor: "filmography",
        films: [
          { titleBn: "\u09ae\u09a7\u09c1\u0995\u09b0", titleEn: "Madhukar \u2014 Way of Life", year: "2015", duration: "10 min", format: "HDTV", poster: "images/syed-madhukar.webp" },
          { titleBn: "\u09ab\u09c7\u09b0\u09be", titleEn: "Phera \u2014 Return", year: "2020", duration: "31 min", format: "2K Digital", poster: "https://img.youtube.com/vi/cTTfVWE_uxk/hqdefault.jpg" },
          { titleBn: "\u0995\u09c1\u09ae\u09be\u09b0 \u0995\u09be\u09b9\u09a8", titleEn: "Kumar Kahon", year: "2012", duration: "40 min", format: "Digital", poster: "images/syed-kumar-kahon.webp" },
          { titleBn: "\u09ae\u09be\u09a8\u09cd\u09a6\u09c7", titleEn: "Mande \u2014 The Soul of Nature", year: "2015", duration: "\u2014", format: "Digital", poster: "images/syed-mande.webp" },
          { titleBn: "\u09a4\u09c3\u09a4\u09c0\u09df \u09aa\u0995\u09cd\u09b7", titleEn: "Third Owner", year: "2025", duration: "23 min", format: "HDTV", poster: "images/syed-third-owner-poster.jpg" },
          { titleBn: "\u0995\u099a\u09c1\u09b0\u09bf\u09aa\u09be\u09a8\u09be\u09b0 \u0986\u09a4\u09cd\u09ae\u09be", titleEn: "The Soul of Water", year: "2013", duration: "25 min", format: "Digital", poster: "images/syed-water-hyacinth.webp" }
        ]
      }
    ];

    const root = document.getElementById('filmsArchiveRoot');
    let totalFilms = 0;
    alumniFilmsArchive.forEach(alumnus => {
      totalFilms += alumnus.films.length;
      const group = document.createElement('div');
      group.className = 'fa-alumnus-group';
      const header = document.createElement('div');
      header.className = 'fa-alumnus-header';
      header.innerHTML = '<h2 class="fa-alumnus-name">' + alumnus.alumnusName + '</h2><a href="alumni/' + alumnus.alumnusSlug + '.html#' + alumnus.filmAnchor + '" class="fa-alumnus-link" aria-label="View ' + alumnus.alumnusName + '\'s full profile">View Profile &#8594;</a>';
      const grid = document.createElement('div');
      grid.className = 'fa-film-grid';
      alumnus.films.forEach(film => {
        const card = document.createElement('a');
        card.href = 'alumni/' + alumnus.alumnusSlug + '.html#' + alumnus.filmAnchor;
        card.className = 'fa-film-card';
        card.setAttribute('aria-label', film.titleEn + ' by ' + alumnus.alumnusName);
        card.innerHTML = '<img src="' + film.poster + '" alt="' + film.titleEn + ' \u2014 Film Poster" class="fa-film-poster" loading="lazy" decoding="async"/><div class="fa-film-info"><div class="fa-film-meta"><span>' + film.year + '</span><span>' + film.duration + '</span><span>' + film.format + '</span></div><h3 class="fa-film-title-bn">' + film.titleBn + '</h3><p class="fa-film-title-en">' + film.titleEn + '</p></div>';
        grid.appendChild(card);
      });
      group.appendChild(header);
      group.appendChild(grid);
      root.appendChild(group);
    });
    const countEl = document.getElementById('filmCount');
    if (countEl) countEl.textContent = totalFilms;
  </script>
  <script src="js/editorial-lightbox.js"></script>
  <button class="scroll-top-btn" id="scrollTopBtn" aria-label="Scroll to top"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></button>
  <script src="js/scroll-top.js"></script>
</body>
</html>`;

fs.writeFileSync(target, html, 'utf8');
console.log('Created films.html:', fs.statSync(target).size, 'bytes');
