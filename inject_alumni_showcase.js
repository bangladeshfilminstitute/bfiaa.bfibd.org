// inject_alumni_showcase.js
// Builds and injects the "Our Alumni in Cinema" cinematic carousel section
// into the BFIBD Website-Antigravity/index.html

const fs = require('fs');
const path = require('path');

const CONCEPT_DIR = path.join(__dirname, '..', 'BFIBD Website-Antigravity');
const INDEX_PATH = path.join(CONCEPT_DIR, 'index.html');

// ── The full showcase section HTML ──────────────────────────────────────────
const showcaseSection = `
  <!-- ═══════════════════════════════════════════════════════════════════════
       ALUMNI FILM SHOWCASE
  ════════════════════════════════════════════════════════════════════════ -->
  <section class="alumni-film-showcase" id="alumni-films" aria-label="Alumni Film Showcase">

    <div class="afs-bg-layer" aria-hidden="true">
      <div class="afs-bg-photo"></div>
      <div class="afs-bg-overlay"></div>
      <div class="afs-grain"></div>
      <div class="afs-vignette"></div>
      <div class="afs-radial-glow"></div>
    </div>

    <div class="afs-inner">

      <!-- Section Header -->
      <div class="afs-header">
        <div class="afs-header-left">
          <div class="afs-eyebrow">
            <span class="afs-eyebrow-line"></span>
            <span class="afs-eyebrow-text">ALUMNI FILM SHOWCASE</span>
          </div>
          <h2 class="afs-heading">
            Films by<br>
            <em class="afs-heading-accent">Our Alumni</em>
          </h2>
          <p class="afs-subtext">
            Discover powerful stories, unique perspectives and<br class="afs-br-desktop">
            remarkable films created by BFIAA alumni.
          </p>
        </div>
        <div class="afs-header-right" aria-hidden="true">
          <p class="afs-tagline">Real people.<br>Real stories.<br>Lasting impact.</p>
        </div>
      </div>

      <!-- Carousel Container -->
      <div class="afs-carousel-wrap" role="region" aria-label="Alumni films carousel">

        <!-- Prev Button -->
        <button class="afs-nav-btn afs-prev" id="afsPrev" aria-label="Previous film" type="button">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <!-- Track -->
        <div class="afs-track-outer">
          <div class="afs-track" id="afsTrack" role="list">
            <!-- Cards injected by JS -->
          </div>
        </div>

        <!-- Next Button -->
        <button class="afs-nav-btn afs-next" id="afsNext" aria-label="Next film" type="button">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

      </div><!-- /carousel-wrap -->

      <!-- Pagination Dots -->
      <div class="afs-pagination" id="afsPagination" role="tablist" aria-label="Film navigation"></div>

      <!-- See All Films -->
      <div class="afs-footer-row">
        <a href="films.html" class="afs-see-all-btn" aria-label="See all alumni films">
          See All Films
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>

    </div><!-- /afs-inner -->
  </section>
  <!-- ─── END ALUMNI FILM SHOWCASE ─── -->

  <style>
  /* ══════════════════════════════════════════════════════
     ALUMNI FILM SHOWCASE — Local Styles
  ════════════════════════════════════════════════════════ */
  :root {
    --afs-bg:        #06100d;
    --afs-surface:   #0c1710;
    --afs-cream:     #f1eadc;
    --afs-muted:     #8a9190;
    --afs-accent:    #d2ad6b;
    --afs-accent2:   #b8945a;
    --afs-border:    rgba(255,255,255,0.10);
    --afs-glow:      rgba(210,173,107,0.18);
    --afs-ease:      cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .alumni-film-showcase {
    position: relative;
    background: var(--afs-bg);
    padding: 100px 0 80px;
    overflow: hidden;
    isolation: isolate;
  }

  /* BG Layers */
  .afs-bg-layer { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
  .afs-bg-photo {
    position: absolute;
    inset: 0;
    background-image: url('images/alumni-films-bg.webp');
    background-size: cover;
    background-position: center 25%;
    background-repeat: no-repeat;
    opacity: 0.38;
    filter: brightness(0.70) contrast(1.18) saturate(0.85);
    transform: scale(1.02);
  }
  .afs-bg-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(6, 16, 13, 0.94) 0%,
      rgba(6, 16, 13, 0.50) 28%,
      rgba(6, 16, 13, 0.72) 65%,
      rgba(6, 16, 13, 0.96) 100%
    );
  }
  .afs-grain {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    opacity: 0.5;
  }
  .afs-vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%);
  }
  .afs-radial-glow {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 700px; height: 500px;
    background: radial-gradient(ellipse, rgba(210,173,107,0.06) 0%, transparent 70%);
    border-radius: 50%;
  }

  /* Inner */
  .afs-inner {
    position: relative; z-index: 1;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
  }

  /* Header */
  .afs-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 64px;
    gap: 32px;
  }
  .afs-header-left { max-width: 520px; }
  .afs-eyebrow {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 18px;
  }
  .afs-eyebrow-line {
    display: block; width: 36px; height: 1px;
    background: var(--afs-accent);
  }
  .afs-eyebrow-text {
    font-family: var(--mono, 'Space Mono', monospace);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--afs-accent);
  }
  .afs-heading {
    font-family: var(--serif, 'Cormorant Garamond', serif);
    font-size: clamp(2.4rem, 4.5vw, 4rem);
    font-weight: 700;
    color: var(--afs-cream);
    line-height: 1.1;
    margin: 0 0 18px;
    letter-spacing: -0.5px;
  }
  .afs-heading-accent {
    font-style: italic;
    color: var(--afs-accent);
  }
  .afs-subtext {
    font-family: var(--sans, 'Inter', sans-serif);
    font-size: 0.95rem;
    color: var(--afs-muted);
    line-height: 1.7;
    margin: 0;
  }
  .afs-br-desktop { display: inline; }
  .afs-header-right { padding-top: 14px; }
  .afs-tagline {
    font-family: var(--serif, 'Cormorant Garamond', serif);
    font-size: 1rem;
    font-style: italic;
    color: rgba(241,234,220,0.35);
    line-height: 1.9;
    text-align: right;
    margin: 0;
  }

  /* Carousel Wrap */
  .afs-carousel-wrap {
    display: flex;
    align-items: center;
    gap: 0;
    position: relative;
  }

  /* Track outer — clips overflow */
  .afs-track-outer {
    flex: 1;
    overflow: hidden;
    position: relative;
    /* allow cards to breathe vertically for scale effect */
    padding: 40px 0;
    margin: -40px 0;
  }

  /* Track */
  .afs-track {
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.6s var(--afs-ease);
    will-change: transform;
  }

  /* ── FILM CARD ── */
  .afs-card {
    flex: 0 0 auto;
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    cursor: pointer;
    transition:
      transform   0.55s var(--afs-ease),
      opacity     0.55s var(--afs-ease),
      box-shadow  0.55s var(--afs-ease),
      filter      0.55s var(--afs-ease),
      width       0.55s var(--afs-ease);
    text-decoration: none;
    display: block;
    /* default: side card */
    width: 220px;
    transform: scale(0.85);
    opacity: 0.45;
    filter: brightness(0.65) saturate(0.6);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    outline: none;
  }
  .afs-card:focus-visible {
    box-shadow: 0 0 0 3px var(--afs-accent), 0 8px 32px rgba(0,0,0,0.4);
  }
  .afs-card.afs-adjacent {
    width: 220px;
    transform: scale(0.88);
    opacity: 0.62;
    filter: brightness(0.75) saturate(0.7);
    box-shadow: 0 12px 40px rgba(0,0,0,0.45);
  }
  .afs-card.afs-center {
    width: 300px;
    transform: scale(1.0);
    opacity: 1;
    filter: brightness(1) saturate(1);
    box-shadow:
      0 0 0 1.5px var(--afs-accent),
      0 24px 80px rgba(0,0,0,0.65),
      0 0 60px var(--afs-glow);
    z-index: 10;
  }

  /* Poster image */
  .afs-poster {
    width: 100%;
    aspect-ratio: 2/3;
    object-fit: cover;
    display: block;
    border-radius: 14px 14px 0 0;
  }

  /* Format badge */
  .afs-format-badge {
    position: absolute;
    top: 14px; left: 14px;
    font-family: var(--mono, 'Space Mono', monospace);
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: rgba(241,234,220,0.9);
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    padding: 4px 8px;
    border-radius: 3px;
    border: 1px solid rgba(255,255,255,0.12);
  }

  /* Play overlay for center card */
  .afs-play-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    background: rgba(0,0,0,0.25);
    border-radius: 14px 14px 0 0;
  }
  .afs-card.afs-center .afs-play-overlay { opacity: 1; }
  .afs-play-icon {
    width: 44px; height: 44px;
    border-radius: 50%;
    background: rgba(210,173,107,0.18);
    border: 1.5px solid rgba(210,173,107,0.6);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s ease, background 0.2s ease;
  }
  .afs-card.afs-center:hover .afs-play-icon {
    transform: scale(1.1);
    background: rgba(210,173,107,0.3);
  }

  /* Card Meta (bottom) */
  .afs-card-meta {
    background: linear-gradient(to bottom, rgba(12,23,16,0.92), rgba(6,16,13,0.98));
    padding: 14px 16px 18px;
    border-top: 1px solid rgba(210,173,107,0.18);
  }
  .afs-card-meta-bar {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 8px;
    font-family: var(--mono, 'Space Mono', monospace);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--afs-muted);
  }
  .afs-card-meta-bar span + span::before {
    content: '|';
    margin-right: 10px;
    opacity: 0.35;
  }
  .afs-card-title-bn {
    font-family: 'Hind Siliguri', 'Kalpurush', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--afs-cream);
    line-height: 1.35;
    margin: 0 0 3px;
  }
  .afs-card-title-en {
    font-family: var(--serif, 'Cormorant Garamond', serif);
    font-size: 0.78rem;
    font-style: italic;
    color: var(--afs-accent);
    letter-spacing: 0.3px;
    margin: 0 0 8px;
  }
  .afs-card-by {
    font-family: var(--mono, 'Space Mono', monospace);
    font-size: 8.5px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(210,173,107,0.5);
    display: none;
  }
  .afs-card.afs-center .afs-card-by { display: block; }

  /* Graduated opacity on far cards */
  .afs-card.afs-far {
    opacity: 0.2;
    filter: brightness(0.4) saturate(0.3);
    transform: scale(0.78);
  }

  /* ── NAV BUTTONS ── */
  .afs-nav-btn {
    flex: 0 0 auto;
    width: 50px; height: 50px;
    border-radius: 50%;
    border: 1.5px solid rgba(241,234,220,0.2);
    background: rgba(12,23,16,0.6);
    backdrop-filter: blur(8px);
    color: var(--afs-cream);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
    z-index: 20;
    position: relative;
    outline: none;
  }
  .afs-nav-btn:hover {
    border-color: var(--afs-accent);
    color: var(--afs-accent);
    background: rgba(210,173,107,0.08);
    transform: scale(1.08);
  }
  .afs-nav-btn:focus-visible {
    box-shadow: 0 0 0 3px var(--afs-accent);
  }
  .afs-nav-btn:disabled {
    opacity: 0.25;
    cursor: not-allowed;
    transform: none;
  }
  .afs-prev { margin-right: 20px; }
  .afs-next { margin-left: 20px; }

  /* ── PAGINATION ── */
  .afs-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 36px;
  }
  .afs-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(241,234,220,0.2);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
    outline: none;
  }
  .afs-dot.afs-active {
    width: 28px;
    border-radius: 4px;
    background: var(--afs-accent);
  }
  .afs-dot:hover:not(.afs-active) {
    background: rgba(241,234,220,0.45);
  }
  .afs-dot:focus-visible { box-shadow: 0 0 0 2px var(--afs-accent); }

  /* ── SEE ALL ── */
  .afs-footer-row {
    display: flex;
    justify-content: center;
    margin-top: 48px;
  }
  .afs-see-all-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 14px 36px;
    font-family: var(--mono, 'Space Mono', monospace);
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    color: var(--afs-cream);
    border: 1.5px solid rgba(210,173,107,0.45);
    border-radius: 4px;
    background: transparent;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .afs-see-all-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(210,173,107,0.07);
    transform: translateX(-100%);
    transition: transform 0.35s ease;
  }
  .afs-see-all-btn:hover::before { transform: translateX(0); }
  .afs-see-all-btn:hover {
    border-color: var(--afs-accent);
    color: var(--afs-accent);
    box-shadow: 0 0 20px var(--afs-glow);
  }
  .afs-see-all-btn:focus-visible { box-shadow: 0 0 0 3px var(--afs-accent); }

  /* ── RESPONSIVE ── */
  @media (max-width: 1200px) {
    .afs-card.afs-center { width: 260px; }
    .afs-card, .afs-card.afs-adjacent { width: 190px; }
    .afs-heading { font-size: 3rem; }
  }
  @media (max-width: 900px) {
    .alumni-film-showcase { padding: 72px 0 60px; }
    .afs-header { flex-direction: column; gap: 0; margin-bottom: 48px; }
    .afs-header-right { display: none; }
    .afs-card.afs-center { width: 230px; }
    .afs-card, .afs-card.afs-adjacent { width: 170px; }
    .afs-br-desktop { display: none; }
  }
  @media (max-width: 600px) {
    .alumni-film-showcase { padding: 60px 0 52px; }
    .afs-inner { padding: 0 16px; }
    .afs-heading { font-size: 2.2rem; }
    .afs-subtext { font-size: 0.875rem; }
    .afs-card.afs-center { width: min(68vw, 230px); }
    .afs-card, .afs-card.afs-adjacent { width: min(50vw, 170px); }
    .afs-card.afs-far { opacity: 0.15; }
    .afs-nav-btn { width: 40px; height: 40px; }
    .afs-prev { margin-right: 10px; }
    .afs-next { margin-left: 10px; }
    .afs-see-all-btn { padding: 12px 28px; font-size: 10.5px; }
  }
  @media (max-width: 400px) {
    .afs-card.afs-center { width: min(72vw, 200px); }
    .afs-card, .afs-card.afs-adjacent { width: min(52vw, 150px); }
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .afs-card, .afs-track, .afs-nav-btn { transition: none !important; }
  }
  </style>

  <script>
  (function() {
    // ── FILM DATA ──────────────────────────────────────────────────────────
    const alumniFilms = [
      {
        titleBn: "মধুকর",
        titleEn: "Madhukar — Way of Life",
        year: "2015",
        duration: "10 min",
        format: "HDTV",
        poster: "images/syed-madhukar.webp",
        watchUrl: "https://youtu.be/VZ3CPW9hlb4",
        alumnusName: "Syed Oasiuddin Ahmed",
        alumnusSlug: "syed-oasiuddin-ahmed",
        filmAnchor: "filmography"
      },
      {
        titleBn: "ফেরা",
        titleEn: "Phera — Return",
        year: "2020",
        duration: "31 min",
        format: "2K Digital",
        poster: "https://img.youtube.com/vi/cTTfVWE_uxk/hqdefault.jpg",
        watchUrl: "https://youtu.be/cTTfVWE_uxk",
        alumnusName: "Syed Oasiuddin Ahmed",
        alumnusSlug: "syed-oasiuddin-ahmed",
        filmAnchor: "filmography"
      },
      {
        titleBn: "কুমার কাহন",
        titleEn: "Kumar Kahon",
        year: "2012",
        duration: "40 min",
        format: "Digital",
        poster: "images/syed-kumar-kahon.webp",
        watchUrl: null,
        alumnusName: "Syed Oasiuddin Ahmed",
        alumnusSlug: "syed-oasiuddin-ahmed",
        filmAnchor: "filmography"
      },
      {
        titleBn: "মান্দে",
        titleEn: "Mande — The Soul of Nature",
        year: "2015",
        duration: "—",
        format: "Digital",
        poster: "images/syed-mande.webp",
        watchUrl: null,
        alumnusName: "Syed Oasiuddin Ahmed",
        alumnusSlug: "syed-oasiuddin-ahmed",
        filmAnchor: "filmography"
      },
      {
        titleBn: "তৃতীয় পক্ষ",
        titleEn: "Third Owner",
        year: "2025",
        duration: "23 min",
        format: "HDTV",
        poster: "images/syed-third-owner-poster.jpg",
        watchUrl: null,
        alumnusName: "Syed Oasiuddin Ahmed",
        alumnusSlug: "syed-oasiuddin-ahmed",
        filmAnchor: "filmography"
      },
      {
        titleBn: "কচুরিপানার আত্মা",
        titleEn: "The Soul of Water",
        year: "2013",
        duration: "25 min",
        format: "Digital",
        poster: "images/syed-water-hyacinth.webp",
        watchUrl: null,
        alumnusName: "Syed Oasiuddin Ahmed",
        alumnusSlug: "syed-oasiuddin-ahmed",
        filmAnchor: "filmography"
      }
    ];

    // Future: add more alumni films here ↑

    const FEATURED = alumniFilms; // Show all for now; use .slice(0,6) to limit

    // ── DOM REFS ────────────────────────────────────────────────────────────
    const track      = document.getElementById('afsTrack');
    const prevBtn    = document.getElementById('afsPrev');
    const nextBtn    = document.getElementById('afsNext');
    const pagination = document.getElementById('afsPagination');

    if (!track) return;

    let current = 0;
    const total = FEATURED.length;

    // ── BUILD CARDS ─────────────────────────────────────────────────────────
    function buildCard(film, index) {
      const href = "alumni/" + film.alumnusSlug + ".html#" + film.filmAnchor;
      const card = document.createElement('a');
      card.href = href;
      card.className = 'afs-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', film.titleEn + " by " + film.alumnusName);
      card.dataset.index = index;

      // Image wrapper
      const imgWrap = document.createElement('div');
      imgWrap.style.cssText = 'position:relative;';

      const img = document.createElement('img');
      img.src = film.poster;
      img.alt = film.titleEn + " — Film Poster";
      img.className = 'afs-poster';
      img.loading = index === 0 ? 'eager' : 'lazy';
      img.decoding = 'async';

      // format badge
      const badge = document.createElement('div');
      badge.className = 'afs-format-badge';
      badge.textContent = film.format;

      // play overlay
      const playOverlay = document.createElement('div');
      playOverlay.className = 'afs-play-overlay';
      playOverlay.setAttribute('aria-hidden', 'true');
      if (film.watchUrl) {
        playOverlay.innerHTML = '<div class="afs-play-icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" style="fill:rgba(210,173,107,0.9)"></polygon></svg></div>';
      }

      imgWrap.appendChild(img);
      imgWrap.appendChild(badge);
      imgWrap.appendChild(playOverlay);

      // Meta bottom
      const meta = document.createElement('div');
      meta.className = 'afs-card-meta';

      const metaBar = document.createElement('div');
      metaBar.className = 'afs-card-meta-bar';
      [film.year, film.duration, film.format].forEach(txt => {
        const s = document.createElement('span');
        s.textContent = txt;
        metaBar.appendChild(s);
      });

      const titleBn = document.createElement('h3');
      titleBn.className = 'afs-card-title-bn';
      titleBn.textContent = film.titleBn;

      const titleEn = document.createElement('h4');
      titleEn.className = 'afs-card-title-en';
      titleEn.textContent = film.titleEn;

      const byLine = document.createElement('p');
      byLine.className = 'afs-card-by';
      byLine.textContent = 'BY OUR ALUMNI — ' + film.alumnusName.toUpperCase();

      meta.appendChild(metaBar);
      meta.appendChild(titleBn);
      meta.appendChild(titleEn);
      meta.appendChild(byLine);

      card.appendChild(imgWrap);
      card.appendChild(meta);

      // Keyboard: Enter/Space navigates
      card.addEventListener('click', (e) => {
        if (index !== current) {
          e.preventDefault();
          goTo(index);
        }
      });

      return card;
    }

    // Init cards
    FEATURED.forEach((film, i) => track.appendChild(buildCard(film, i)));

    // ── PAGINATION DOTS ──────────────────────────────────────────────────────
    function buildPagination() {
      pagination.innerHTML = '';
      FEATURED.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'afs-dot' + (i === current ? ' afs-active' : '');
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-label', 'Go to film ' + (i + 1));
        btn.setAttribute('aria-selected', i === current ? 'true' : 'false');
        btn.addEventListener('click', () => goTo(i));
        pagination.appendChild(btn);
      });
    }

    // ── UPDATE CLASSES ───────────────────────────────────────────────────────
    function updateCards() {
      const cards = track.querySelectorAll('.afs-card');
      cards.forEach((card, i) => {
        const diff = i - current;
        card.classList.remove('afs-center', 'afs-adjacent', 'afs-far');
        if (diff === 0) {
          card.classList.add('afs-center');
          card.setAttribute('aria-current', 'true');
        } else if (Math.abs(diff) === 1) {
          card.classList.add('afs-adjacent');
          card.removeAttribute('aria-current');
        } else {
          card.classList.add('afs-far');
          card.removeAttribute('aria-current');
        }
      });

      // Update dots
      pagination.querySelectorAll('.afs-dot').forEach((dot, i) => {
        dot.classList.toggle('afs-active', i === current);
        dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
      });

      // Disable buttons at limits
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === total - 1;
    }

    // ── SCROLL TRACK ────────────────────────────────────────────────────────
    function scrollTrack() {
      const cards = track.querySelectorAll('.afs-card');
      if (!cards[current]) return;

      const trackOuter = track.parentElement;
      const centerCard = cards[current];
      const outerWidth = trackOuter.offsetWidth;
      const cardWidth  = centerCard.offsetWidth;

      // We want to center the current card in the outer
      let offset = centerCard.offsetLeft - (outerWidth / 2) + (cardWidth / 2);

      // Account for card gap and scale transform
      track.style.transform = 'translateX(' + (-offset) + 'px)';
    }

    function goTo(index) {
      if (index < 0 || index >= total) return;
      current = index;
      updateCards();
      requestAnimationFrame(scrollTrack);
    }

    // ── EVENTS ───────────────────────────────────────────────────────────────
    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const section = document.getElementById('alumni-films');
      if (!section) return;
      // Only when section is in viewport
      const rect = section.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) return;
      if (e.key === 'ArrowLeft')  goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    // Touch swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) goTo(current + 1);
        else        goTo(current - 1);
      }
    });

    // Recalc on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(scrollTrack, 120);
    });

    // ── AUTO-ADVANCE ─────────────────────────────────────────────────────
    const AUTO_DELAY = 2800; // Snappy, cinematic 2.8s interval
    let autoTimer = null;
    let isHoveringPosters = false;
    let isVisible = false;

    function advanceNext() {
      var next = (current + 1 < total) ? current + 1 : 0;
      goTo(next);
    }

    function startAuto(delay) {
      stopAuto();
      if (!isVisible || isHoveringPosters) return;
      autoTimer = setTimeout(function() {
        advanceNext();
        startAuto(AUTO_DELAY);
      }, delay !== undefined ? delay : AUTO_DELAY);
    }

    function stopAuto() {
      if (autoTimer) {
        clearTimeout(autoTimer);
        clearInterval(autoTimer);
        autoTimer = null;
      }
    }

    // ONLY pause when hovering directly on the poster carousel, NOT the whole section!
    var carouselWrap = document.querySelector('.afs-carousel-wrap');
    if (carouselWrap) {
      carouselWrap.addEventListener('mouseenter', function() {
        isHoveringPosters = true;
        stopAuto();
      });
      carouselWrap.addEventListener('mouseleave', function() {
        isHoveringPosters = false;
        // Resume quickly after leaving posters (1s delay, not long pause)
        startAuto(1000);
      });
      carouselWrap.addEventListener('touchstart', function() {
        isHoveringPosters = true;
        stopAuto();
      }, { passive: true });
      carouselWrap.addEventListener('touchend', function() {
        isHoveringPosters = false;
        startAuto(1200);
      }, { passive: true });
    }

    // When user scrolls to this section, start auto-advance with a fast first transition (1.2s)
    var showcase = document.getElementById('alumni-films');
    if ('IntersectionObserver' in window && showcase) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            isVisible = true;
            // Short initial delay (1200ms) so user immediately sees it move after scrolling to it
            startAuto(1200);
          } else {
            isVisible = false;
            stopAuto();
          }
        });
      }, { threshold: 0.25 });
      observer.observe(showcase);
    } else {
      isVisible = true;
      startAuto(1200);
    }

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        stopAuto();
      } else if (isVisible && !isHoveringPosters) {
        startAuto(1000);
      }
    });

    // ── INIT ─────────────────────────────────────────────────────────────────
    buildPagination();
    updateCards();
    // Delay first scroll to after layout
    requestAnimationFrame(() => requestAnimationFrame(scrollTrack));
  })();
  </script>
`;

// ── INJECT into index.html ──────────────────────────────────────────────────
let html = fs.readFileSync(INDEX_PATH, 'utf8');

// Find the insertion point: right before <!-- FOUNDER & PATRON --> section
const insertBefore = '<!-- 🎬\n       FOUNDER & PATRON\n  🎬 -->';
const altInsertBefore = 'id="founder"';

let insertIndex = html.indexOf(insertBefore);
if (insertIndex === -1) {
  // Fallback: find the founder section comment or id
  insertIndex = html.indexOf('<!-- \n       FOUNDER');
}
if (insertIndex === -1) {
  insertIndex = html.indexOf('<section class="founder-section"');
}

if (insertIndex === -1) {
  console.error('ERROR: Could not find insertion point (founder section) in index.html');
  process.exit(1);
}

// Check if section already exists to avoid double-injection
if (html.includes('alumni-film-showcase')) {
  console.log('⚠ Section already exists — replacing...');
  // Remove existing section
  const sectionStart = html.indexOf('<section class="alumni-film-showcase"');
  const sectionEnd   = html.indexOf('<!-- ─── END ALUMNI FILM SHOWCASE ─── -->') + '<!-- ─── END ALUMNI FILM SHOWCASE ─── -->'.length;
  if (sectionStart !== -1 && sectionEnd > sectionStart) {
    html = html.slice(0, sectionStart) + html.slice(sectionEnd);
    // Re-find insertion point
    insertIndex = html.indexOf('<section class="founder-section"');
  }
}

// Insert the section
html = html.slice(0, insertIndex) + showcaseSection + '\n  ' + html.slice(insertIndex);

fs.writeFileSync(INDEX_PATH, html, 'utf8');

const finalSize = fs.statSync(INDEX_PATH).size;
console.log('✓ Alumni Film Showcase injected into index.html');
console.log('  File size: ' + Math.round(finalSize / 1024) + ' KB');
console.log('  Open: http://localhost:3232/#alumni-films');
