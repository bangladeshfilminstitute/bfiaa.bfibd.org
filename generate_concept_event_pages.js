// generate_concept_event_pages.js
// Generates full editorial concept versions of all 4 event pages
// with complete content from live site

const fs = require('fs');
const path = require('path');

const CONCEPT_DIR = path.join(__dirname, '..', 'BFIBD Website-Antigravity');

// Shared editorial nav header template
function editorialHeader(activeSection = 'events') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>`;
}

// Shared editorial nav
function editorialNav() {
  return `
  <header class="site-header" role="banner">
    <div class="header-inner">
      <a href="index.html#home" class="header-brand" aria-label="BFIAA Home">
        <img src="images/bfiaa-logo.png" alt="BFIAA - Bangladesh Film Institute Alumni Association" onerror="this.style.display='none'"/>
      </a>

      <nav class="header-nav" role="navigation" aria-label="Main navigation">
        <a href="index.html#home">Home</a>
        <a href="index.html#about">About</a>
        <a href="index.html#founder">Founder</a>
        <a href="index.html#committee">Committee</a>
        <a href="index.html#conferences">Conferences</a>
        <a href="index.html#alumni">Alumni</a>
        <a href="index.html#events" class="active">Events</a>
        <a href="index.html#retrospective">30 Years</a>
        <a href="index.html#publications">Publications</a>
        <a href="index.html#picnic">Picnic</a>
        <a href="index.html#contact">Contact</a>
      </nav>

      <div class="header-actions">
        <a href="https://bfibd.org" target="_blank" rel="noopener" class="btn-bfi-home">
          <img src="images/bfi-logo.png" alt="BFI" style="height: 14px; width: auto;"/>
          BFI Main Site
        </a>
        <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-member">Become a Member</a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <nav class="mobile-nav" id="mobileNav">
    <a href="index.html#home">Home</a>
    <a href="index.html#about">About BFIAA</a>
    <a href="index.html#founder">Founder &amp; Patron</a>
    <a href="index.html#committee">Executive Committee</a>
    <a href="index.html#conferences">Conferences</a>
    <a href="index.html#alumni">Featured Alumni</a>
    <a href="index.html#events">Events &amp; Screenings</a>
    <a href="index.html#retrospective">30 Years Retrospective</a>
    <a href="index.html#publications">Uralchitra Publications</a>
    <a href="index.html#picnic">Annual Picnic</a>
    <a href="constitution.html">Constitution</a>
    <a href="index.html#contact">Contact &amp; Join</a>
    <div class="mobile-cta-group">
      <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="mobile-cta-member">Become a Member</a>
      <a href="https://bfibd.org" target="_blank" rel="noopener" class="mobile-cta-bfi">Visit BFI Main Site →</a>
    </div>
  </nav>`;
}

// Shared footer
function editorialFooter() {
  return `
  <footer class="site-footer" role="contentinfo">
    <div class="filmstrip-border left" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
    </div>
    <div class="filmstrip-border right" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span><span></span>
    </div>

    <div class="container footer-top">
      <div class="footer-cols">
        <div>
          <div class="footer-brand">
            <a href="index.html#home" class="footer-brand-link" aria-label="BFIAA Home" style="display: inline-block; text-decoration: none;">
              <img src="images/bfiaa-logo.png" alt="BFIAA Logo" style="height: 42px; width: auto; margin-bottom: 16px; display: block;" onerror="this.style.display='none'"/>
            </a>
          </div>
          <p class="footer-brand-desc">
            The official alumni body of Bangladesh Film Institute, connecting over 1,000 graduates across 86+ batches in a shared commitment to cinema culture.
          </p>
          <div class="footer-social">
            <a href="https://www.facebook.com/BFIAlumniAssociation" target="_blank" rel="noopener" class="social-link" title="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://bfibd.org" target="_blank" rel="noopener" class="social-link" title="BFI Main Site">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <div class="footer-col-title">Navigation</div>
          <ul class="footer-links-list">
            <li><a href="index.html#home">Home</a></li>
            <li><a href="index.html#about">About BFIAA</a></li>
            <li><a href="index.html#founder">Tanvir Mokammel</a></li>
            <li><a href="index.html#committee">Executive Committee</a></li>
            <li><a href="index.html#conferences">Conferences</a></li>
            <li><a href="index.html#alumni">Featured Alumni</a></li>
            <li><a href="index.html#events">Events &amp; Screenings</a></li>
            <li><a href="index.html#picnic">Annual Picnic</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-col-title">Documents</div>
          <ul class="footer-links-list">
            <li><a href="constitution.html">Official Constitution</a></li>
            <li><a href="conference-2021.html">Conference 2021 Record</a></li>
            <li><a href="conference-2019.html">Conference 2019 Record</a></li>
            <li><a href="uralchitra-special.html">Uralchitra Special Edition</a></li>
            <li><a href="30-years-event.html">30 Years Retrospective Event</a></li>
            <li><a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener">Membership Form</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-col-title">BFI Network</div>
          <ul class="footer-links-list">
            <li><a href="https://bfibd.org" target="_blank" rel="noopener">bfibd.org (Main Site)</a></li>
            <li><a href="https://archive.bfibd.org" target="_blank" rel="noopener">BFI Photo Archive</a></li>
            <li><a href="https://bfibd.org/our-courses/" target="_blank" rel="noopener">BFI Courses</a></li>
            <li><a href="https://tanvirmokammel.info" target="_blank" rel="noopener">Tanvir Mokammel Site</a></li>
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
      hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
      });
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }
  </script>

  <script src="js/editorial-lightbox.js"></script>
  <!-- Scroll to Top Button -->
  <button class="scroll-top-btn" id="scrollTopBtn" aria-label="Scroll to top" title="Scroll to top">
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  </button>
  <script src="js/scroll-top.js"></script>
</body>
</html>`;
}

// Extra inline styles for event detail pages
function eventDetailStyles() {
  return `
  <style>
    .event-breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--mono);
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--ink-faded);
      margin-bottom: 32px;
      padding-top: 24px;
    }
    .event-breadcrumb a { color: var(--gold); text-decoration: none; transition: color 0.2s; }
    .event-breadcrumb a:hover { color: var(--cream); }
    .event-breadcrumb .sep { color: var(--ink-faded); }

    .editorial-badge {
      display: inline-block;
      font-family: var(--mono);
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      padding: 5px 14px;
      border: 1px solid var(--gold);
      color: var(--gold);
      border-radius: 2px;
      margin-bottom: 20px;
    }
    .editorial-title {
      font-family: var(--serif);
      font-size: clamp(2rem, 4vw, 3.2rem);
      color: var(--cream);
      line-height: 1.2;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .editorial-bengali-title {
      font-family: 'Hind Siliguri', 'Kalpurush', sans-serif;
      font-size: clamp(1.3rem, 2.5vw, 2rem);
      color: var(--gold);
      font-weight: 600;
      line-height: 1.45;
      margin-bottom: 32px;
      display: block;
    }
    .editorial-meta-table {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 1px;
      background: var(--border);
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 40px;
    }
    .meta-item {
      background: var(--surface);
      padding: 16px 20px;
    }
    .meta-item label {
      display: block;
      font-family: var(--mono);
      font-size: 9px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: var(--ink-faded);
      margin-bottom: 6px;
    }
    .meta-item span {
      font-family: var(--sans);
      font-size: 14px;
      font-weight: 600;
      color: var(--cream);
      line-height: 1.4;
    }
    .meta-item span small {
      display: block;
      font-size: 12px;
      color: var(--gold);
      font-weight: 400;
      margin-top: 2px;
    }

    .editorial-grid {
      display: grid;
      grid-template-columns: 340px 1fr;
      gap: 48px;
      align-items: start;
      margin-bottom: 60px;
    }
    .editorial-sticky-side {
      position: sticky;
      top: 100px;
    }
    .photo-stage-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .photo-stage-card img {
      width: 100%;
      height: auto;
      display: block;
    }
    .stage-actions {
      display: flex;
      gap: 10px;
      padding: 14px;
      background: rgba(0,0,0,0.3);
      border-top: 1px solid var(--border);
    }
    .btn-stage {
      flex: 1;
      text-align: center;
      padding: 10px 12px;
      font-family: var(--mono);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 4px;
      border: 1px solid var(--border);
      color: var(--cream);
      background: transparent;
      transition: all 0.2s;
    }
    .btn-stage:hover { background: var(--border); }
    .btn-stage.gold-btn { border-color: var(--gold); color: var(--gold); }
    .btn-stage.gold-btn:hover { background: rgba(212,175,55,0.1); }

    .editorial-prose h3 {
      font-family: var(--serif);
      font-size: 1.15rem;
      color: var(--gold);
      letter-spacing: 0.5px;
      margin: 28px 0 12px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .editorial-prose p {
      font-size: 1rem;
      line-height: 1.85;
      color: var(--ink-light);
      margin-bottom: 16px;
    }
    .bengali-quote-card {
      background: rgba(61,42,10,0.3);
      border-left: 3px solid var(--gold);
      padding: 24px 28px;
      border-radius: 0 6px 6px 0;
      margin-bottom: 28px;
      font-family: 'Hind Siliguri', 'Kalpurush', sans-serif;
      font-size: 1rem;
      line-height: 1.95;
      color: var(--cream);
    }
    .bengali-quote-card h4 {
      font-family: var(--serif);
      font-size: 1rem;
      color: var(--gold);
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .bengali-quote-card p {
      font-family: 'Hind Siliguri', 'Kalpurush', sans-serif;
      color: var(--cream);
      font-size: 1rem;
      line-height: 1.95;
      margin: 0;
    }
    .event-action-row {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 36px;
      padding-top: 28px;
      border-top: 1px solid var(--border);
    }
    .btn-editorial {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      font-family: var(--mono);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 4px;
      transition: all 0.2s;
    }
    .btn-editorial.primary {
      background: var(--green);
      color: var(--cream);
      border: 1px solid var(--green);
    }
    .btn-editorial.primary:hover { opacity: 0.88; }
    .btn-editorial.secondary {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--cream);
    }
    .btn-editorial.secondary:hover { border-color: var(--cream); }
    .btn-editorial.gold {
      background: transparent;
      border: 1px solid var(--gold);
      color: var(--gold);
    }
    .btn-editorial.gold:hover { background: rgba(212,175,55,0.1); }

    @media (max-width: 860px) {
      .editorial-grid { grid-template-columns: 1fr; }
      .editorial-sticky-side { position: static; }
      .photo-stage-card { max-width: 420px; margin: 0 auto; }
    }
  </style>`;
}

// ============================================================
// PAGE 1: event-cinema-kotha.html
// ============================================================
const cinemakothaHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Live Webinar: Cinema Kotha — জহির রায়হান — BFIAA | Bangladesh Film Institute Alumni Association</title>
  <meta name="description" content="Inaugural live webinar of Cinema Kotha: 'রাজনৈতিক চলচ্চিত্রকার হিসেবে জহির রায়হান' with keynote speaker Tanvir Mokammel, moderated by Sagir Mostafa."/>
  <link rel="canonical" href="https://bfiaa.bfibd.org/event-cinema-kotha.html"/>
  <link rel="icon" type="image/png" href="images/bfiaa-logo.png"/>
  <meta property="og:title" content="Live Webinar: Cinema Kotha — জহির রায়হান — BFIAA"/>
  <meta property="og:description" content="Commemorating Zahir Raihan with keynote speaker Tanvir Mokammel."/>
  <meta property="og:url" content="https://bfiaa.bfibd.org/event-cinema-kotha.html"/>
  <meta property="og:type" content="article"/>
  <meta property="og:image" content="https://bfiaa.bfibd.org/images/cinema-kotha-flyer.png"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Hind+Siliguri:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/editorial.css"/>
  <script type="application/ld+json">
{"@context":"https://schema.org","@type":"Event","name":"Cinema Kotha — Live Webinar on Zahir Raihan","startDate":"2022-03-04T19:00","url":"https://bfiaa.bfibd.org/event-cinema-kotha.html","organizer":{"@type":"Organization","name":"BFIAA","url":"https://bfiaa.bfibd.org"},"location":{"@type":"VirtualLocation","url":"https://www.facebook.com/BFIAlumniAssociation"}}
  </script>
${eventDetailStyles()}
</head>
<body>
${editorialNav()}

  <main class="editorial-page-hero">
    <div class="container">

      <nav class="event-breadcrumb" aria-label="Breadcrumb">
        <a href="index.html#home">Home</a>
        <span class="sep">/</span>
        <a href="index.html#events">Events</a>
        <span class="sep">/</span>
        <span>Cinema Kotha: Zahir Raihan</span>
      </nav>

      <div class="editorial-badge">🎙️ INAUGURAL LIVE WEBINAR · CINEMA KOTHA · SERIES 01</div>
      <h1 class="editorial-title">Live Webinar: Cinema Kotha (Episode 01)</h1>
      <h2 class="editorial-bengali-title">"রাজনৈতিক চলচ্চিত্রকার হিসেবে জহির রায়হান"</h2>

      <div class="editorial-meta-table">
        <div class="meta-item">
          <label>Date &amp; Time</label>
          <span>04 March 2022<small>Friday @ 7:00 PM</small></span>
        </div>
        <div class="meta-item">
          <label>Keynote Speaker</label>
          <span>Tanvir Mokammel<small>Ekushey Padak Filmmaker &amp; Chief Advisor, BFIAA</small></span>
        </div>
        <div class="meta-item">
          <label>Moderator</label>
          <span>Sagir Mostafa<small>Advisor, BFIAA</small></span>
        </div>
        <div class="meta-item">
          <label>Essay Presentation</label>
          <span>Redwan Hossain Riyad<small>Selected Author &amp; Member, BFIAA</small></span>
        </div>
        <div class="meta-item">
          <label>Platform</label>
          <span>Facebook Live<small>Official BFIAA Page</small></span>
        </div>
        <div class="meta-item">
          <label>Series</label>
          <span>Cinema Kotha<small>সিনেমা কথা · Edition 01</small></span>
        </div>
      </div>

      <div class="editorial-grid">
        <aside class="editorial-sticky-side">
          <div class="photo-stage-card">
            <div class="main-photo-frame">
              <img src="images/cinema-kotha-flyer.png" alt="Cinema Kotha: Zahir Raihan — Live Webinar Flyer" loading="lazy"/>
            </div>
            <div class="stage-actions">
              <a href="images/cinema-kotha-flyer.png" target="_blank" class="btn-stage gold-btn">🔍 View Full Flyer</a>
              <a href="images/cinema-kotha-flyer.png" download="BFIAA-Cinema-Kotha-Webinar.png" class="btn-stage">⬇ Download</a>
            </div>
          </div>
        </aside>

        <div class="editorial-prose">
          <div class="bengali-quote-card">
            <h4>মূল বিজ্ঞপ্তি (Official Announcement)</h4>
            <p>
              আনন্দের সাথে জানাচ্ছি যে, আগামী ৪ মার্চ ২০২২ (শুক্রবার) তারিখে সন্ধ্যা ৭.০০ টায় বাংলাদেশ ফিল্ম ইনস্টিটিউট এলামনাই এসোসিয়েশন (বিএফআইএএ) তাদের প্রথম লাইভ ওয়েবিনার "সিনেমা কথা" আয়োজন করতে যাচ্ছে। বাংলাদেশের প্রখ্যাত চলচ্চিত্রকার জহির রায়হানকে স্মরণ করে এবারের ওয়েবিনারের বিষয় নির্ধারণ করা হয়েছে "রাজনৈতিক চলচ্চিত্রকার হিসেবে জহির রায়হান"। উক্ত ওয়েবিনারে মূল আলোচক হিসেবে উপস্থিত থাকবেন বিএফআইএএ-য়ের প্রধান উপদেষ্টা একুশে পদকপ্রাপ্ত চলচ্চিত্রনির্মাতা শ্রদ্ধেয় তানভীর মোকাম্মেল। অনুষ্ঠানটি সঞ্চালনা করবেন বিএফআইএএ-য়ের অন্যতম উপদেষ্টা জনাব সগীর মোস্তফা এবং বিএফআইএএ-য়ের সদস্যদের পাঠানো লেখার মধ্য থেকে নির্বাচিত লেখক হিসেবে রেদোয়ান হোসেন রিয়াদ তার প্রবন্ধ পাঠ করবেন। ওয়েবিনারটি বাংলাদেশ ফিল্ম ইনস্টিটিউট এলামনাই এসোসিয়েশন-য়ের ফেসবুক পেজ থেকে সরাসরি সম্প্রচার করা হবে।
            </p>
            <p style="margin-top:12px; font-weight:600; color: var(--gold); font-family: var(--mono); font-size: 13px; letter-spacing: 1px;">
              অনুষ্ঠানের সময়ঃ সন্ধ্যা ৭.০০টা (৪ঠা মার্চ ২০২২)
            </p>
          </div>

          <h3>Overview &amp; Theme</h3>
          <p>
            On Friday, March 4th, 2022, the Bangladesh Film Institute Alumni Association (BFIAA) launched its flagship educational live webinar series titled <strong>"Cinema Kotha" (সিনেমা কথা)</strong>.
          </p>
          <p>
            Honoring the memory, ideology, and pathbreaking contributions of legendary Bangladeshi filmmaker and novelist <strong>Zahir Raihan</strong>, the theme of this premiere session was <strong>"রাজনৈতিক চলচ্চিত্রকার হিসেবে জহির রায়হান" (Zahir Raihan as a Political Filmmaker)</strong>.
          </p>
          <p>
            The webinar featured esteemed Ekushey Padak-winning filmmaker and BFIAA Chief Advisor <strong>Tanvir Mokammel</strong> as the keynote speaker, who dissected the artistic courage, political consciousness, and documentary realism in Raihan's cinematic canon (including <em>Stop Genocide</em>, <em>Jibon Theke Neya</em>, and more). The session was moderated by BFIAA Advisor <strong>Sagir Mostafa</strong>, and included a thought-provoking research essay reading by selected alumni member <strong>Redwan Hossain Riyad</strong>.
          </p>
          <p>
            The entire event was broadcast live on the official BFIAA Facebook page, welcoming alumni, film scholars, and cinephiles into a rich and engaging dialogue.
          </p>

          <div class="event-action-row">
            <a href="index.html#home" class="btn-editorial gold">🏠 Home</a>
            <a href="index.html#events" class="btn-editorial secondary">← All Events</a>
            <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-editorial primary">Join BFIAA Today</a>
          </div>
        </div>
      </div>

    </div>
  </main>
${editorialFooter()}`;

// ============================================================
// PAGE 2: event-man.html
// ============================================================
const eventManHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cine Club Adda: ম্যান (Man) — BFIAA | Bangladesh Film Institute Alumni Association</title>
  <meta name="description" content="BFIAA Cine Club Adda screening of acclaimed short film ম্যান (Man) by Imtiaz Pavel, followed by Meet the Director, hosted by Aparajita Sangita."/>
  <link rel="canonical" href="https://bfiaa.bfibd.org/event-man.html"/>
  <link rel="icon" type="image/png" href="images/bfiaa-logo.png"/>
  <meta property="og:title" content="Cine Club Adda: ম্যান (Man) — BFIAA"/>
  <meta property="og:description" content="Film screening and Meet the Director with former BFIAA President Imtiaz Pavel."/>
  <meta property="og:url" content="https://bfiaa.bfibd.org/event-man.html"/>
  <meta property="og:type" content="article"/>
  <meta property="og:image" content="https://bfiaa.bfibd.org/images/man-film-flyer.png"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Hind+Siliguri:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/editorial.css"/>
  <script type="application/ld+json">
{"@context":"https://schema.org","@type":"Event","name":"Cine Club Adda: ম্যান — Film Screening &amp; Meet the Director","startDate":"2022-02-12T21:00","url":"https://bfiaa.bfibd.org/event-man.html","organizer":{"@type":"Organization","name":"BFIAA","url":"https://bfiaa.bfibd.org"},"location":{"@type":"VirtualLocation","url":"https://www.facebook.com/BFIAlumniAssociation"}}
  </script>
${eventDetailStyles()}
</head>
<body>
${editorialNav()}

  <main class="editorial-page-hero">
    <div class="container">

      <nav class="event-breadcrumb" aria-label="Breadcrumb">
        <a href="index.html#home">Home</a>
        <span class="sep">/</span>
        <a href="index.html#events">Events</a>
        <span class="sep">/</span>
        <span>Cine Club Adda: ম্যান</span>
      </nav>

      <div class="editorial-badge">🎞️ PAST SCREENING &amp; DIRECTOR'S MEET · CINE CLUB ADDA</div>
      <h1 class="editorial-title">Cine Club Adda: Screening of Man (ম্যান)</h1>
      <h2 class="editorial-bengali-title">"ম্যান" — চলচ্চিত্র প্রদর্শনী ও মীট দ্যা ডিরেক্টর</h2>

      <div class="editorial-meta-table">
        <div class="meta-item">
          <label>Date &amp; Time</label>
          <span>12 February 2022<small>Saturday @ 9:00 PM</small></span>
        </div>
        <div class="meta-item">
          <label>Director &amp; Guest</label>
          <span>Imtiaz Pavel<small>Filmmaker &amp; Former President, BFIAA</small></span>
        </div>
        <div class="meta-item">
          <label>Host &amp; Moderator</label>
          <span>Aparajita Sangita<small>Organizing Secretary, BFIAA</small></span>
        </div>
        <div class="meta-item">
          <label>Streaming Platform</label>
          <span>Facebook Live<small>Official BFIAA Page</small></span>
        </div>
      </div>

      <div class="editorial-grid">
        <aside class="editorial-sticky-side">
          <div class="photo-stage-card">
            <div class="main-photo-frame">
              <img src="images/man-film-flyer.png" alt="Cine Club Adda: ম্যান — Film Screening Flyer" loading="lazy"/>
            </div>
            <div class="stage-actions">
              <a href="images/man-film-flyer.png" target="_blank" class="btn-stage gold-btn">🔍 View Full Flyer</a>
              <a href="images/man-film-flyer.png" download="BFIAA-Man-Film-Screening.png" class="btn-stage">⬇ Download</a>
            </div>
          </div>
        </aside>

        <div class="editorial-prose">
          <div class="bengali-quote-card">
            <h4>মূল বিজ্ঞপ্তি (Official Announcement)</h4>
            <p>
              আনন্দের সাথে জানাচ্ছি যে, বাংলাদেশ ফিল্ম ইনস্টিটিউট এলামনাই এসোসিয়েশন প্রতি মাসে তাদের কোনো একজন সদস্যের চলচ্চিত্র নিয়ে বিশেষ চলচ্চিত্র প্রদর্শনী ও মীট দ্যা ডিরেক্টর-য়ের আয়োজন করতে যাচ্ছে। এ অনুষ্ঠানের নাম দেয়া হয়েছে "বিএফআইএএ সিনে ক্লাব আড্ডা"। এ মাসের সিনে ক্লাব আড্ডা অনুষ্ঠিত হবে ১২ ফেব্রুয়ারী, শনিবার (রাত ৯.০০ টায়)। এবারের অতিথি বিএফআইএএ-য়ের প্রাক্তন সভাপতি ইমতিয়াজ পাভেল। অনুষ্ঠানে তাঁর নির্মিত স্বল্পদৈর্ঘ্য চলচ্চিত্র "ম্যান" প্রদর্শিত হবে; প্রদর্শনী শেষে মীট দ্যা ডিরেক্টর-য়ে পরিচালক নিজে সবার সঙ্গে যুক্ত হবেন। অনুষ্ঠানটি উপস্থাপনা করবেন এসোসিয়েশনের সাংগঠনিক সম্পাদক চলচ্চিত্রনির্মাতা অপরাজিতা সংগীতা। অনুষ্ঠানটি ফেসবুকে বিএফআইএএ-য়ের পেজ থেকে সরাসরি সম্প্রচার করা হবে।
            </p>
            <p style="margin-top:12px; font-weight:600; color: var(--gold); font-family: var(--mono); font-size: 13px; letter-spacing: 1px;">
              প্রদর্শনীর সময়ঃ রাত ৯.০০টা (১২ই ফেব্রুয়ারী ২০২২)
            </p>
          </div>

          <h3>Overview &amp; Details</h3>
          <p>
            On Saturday, February 12th, 2022, the Bangladesh Film Institute Alumni Association (BFIAA) hosted a signature monthly episode of <strong>"Cine Club Adda"</strong> designed to showcase works by its talented members coupled with an engaging "Meet the Director" segment.
          </p>
          <p>
            The featured production was the acclaimed short film <strong>"ম্যান" (Man: From Boys to Men - A Film)</strong>, directed by former BFIAA President and filmmaker <strong>Imtiaz Pavel</strong>. The film examines gender roles, masculinity, and societal expectations with nuanced cinematic sensitivity.
          </p>
          <p>
            Following the screening, director Imtiaz Pavel joined the audience in an open Q&amp;A session discussing the film's narrative structure, artistic choices, and challenges faced during production. The session was hosted and moderated by BFIAA Organizing Secretary and filmmaker <strong>Aparajita Sangita</strong>, and broadcast live directly from the BFIAA official Facebook page.
          </p>

          <div class="event-action-row">
            <a href="index.html#home" class="btn-editorial gold">🏠 Home</a>
            <a href="index.html#events" class="btn-editorial secondary">← All Events</a>
            <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-editorial primary">Join BFIAA Today</a>
          </div>
        </div>
      </div>

    </div>
  </main>
${editorialFooter()}`;

// ============================================================
// PAGE 3: event-pounopunik.html
// ============================================================
const eventPounopunikHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cine Club Adda: পৌণঃপুণিক — BFIAA | Bangladesh Film Institute Alumni Association</title>
  <meta name="description" content="BFIAA Cine Club Adda screening of acclaimed short film পৌণঃপুণিক (Pounopunik) by BFI alumnus filmmaker Khandaker Sumon, hosted by Mamun Sobhani."/>
  <link rel="canonical" href="https://bfiaa.bfibd.org/event-pounopunik.html"/>
  <link rel="icon" type="image/png" href="images/bfiaa-logo.png"/>
  <meta property="og:title" content="Cine Club Adda: পৌণঃপুণিক — BFIAA"/>
  <meta property="og:description" content="Screening of পৌণঃপুণিক by BFI alumni filmmaker Khandaker Sumon."/>
  <meta property="og:url" content="https://bfiaa.bfibd.org/event-pounopunik.html"/>
  <meta property="og:type" content="article"/>
  <meta property="og:image" content="https://bfiaa.bfibd.org/images/pounopunik-flyer.jpg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Hind+Siliguri:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/editorial.css"/>
  <script type="application/ld+json">
{"@context":"https://schema.org","@type":"Event","name":"Cine Club Adda: পৌণঃপুণিক — Film Screening","startDate":"2022-08-09T21:00","url":"https://bfiaa.bfibd.org/event-pounopunik.html","organizer":{"@type":"Organization","name":"BFIAA","url":"https://bfiaa.bfibd.org"},"location":{"@type":"VirtualLocation","url":"https://zoom.us"}}
  </script>
${eventDetailStyles()}
</head>
<body>
${editorialNav()}

  <main class="editorial-page-hero">
    <div class="container">

      <nav class="event-breadcrumb" aria-label="Breadcrumb">
        <a href="index.html#home">Home</a>
        <span class="sep">/</span>
        <a href="index.html#events">Events</a>
        <span class="sep">/</span>
        <span>Cine Club Adda: পৌণঃপুণিক</span>
      </nav>

      <div class="editorial-badge">🎞️ PAST SCREENING &amp; DIRECTOR'S MEET · CINE CLUB ADDA</div>
      <h1 class="editorial-title">Cine Club Adda: Screening of Pounopunik</h1>
      <h2 class="editorial-bengali-title">"পৌণঃপুণিক" (The Hamster Wheel Rebellion) — খন্দকার সুমন</h2>

      <div class="editorial-meta-table">
        <div class="meta-item">
          <label>Date &amp; Time</label>
          <span>09 August 2022<small>Tuesday @ 9:00 PM</small></span>
        </div>
        <div class="meta-item">
          <label>Director / Guest</label>
          <span>Khandaker Sumon<small>Filmmaker &amp; BFI Alumni</small></span>
        </div>
        <div class="meta-item">
          <label>Host &amp; Moderator</label>
          <span>Mamun Sobhani<small>Publicity Secretary, BFIAA</small></span>
        </div>
        <div class="meta-item">
          <label>Streaming Platform</label>
          <span>Zoom Virtual Room<small>Interactive Online Screening</small></span>
        </div>
      </div>

      <div class="editorial-grid">
        <aside class="editorial-sticky-side">
          <div class="photo-stage-card">
            <div class="main-photo-frame">
              <img src="images/pounopunik-flyer.jpg" alt="Cine Club Adda: পৌণঃপুণিক — Film Screening Flyer" loading="lazy"/>
            </div>
            <div class="stage-actions">
              <a href="images/pounopunik-flyer.jpg" target="_blank" class="btn-stage gold-btn">🔍 View Full Flyer</a>
              <a href="images/pounopunik-flyer.jpg" download="BFIAA-Pounopunik-Screening.jpg" class="btn-stage">⬇ Download</a>
            </div>
          </div>
        </aside>

        <div class="editorial-prose">
          <div class="bengali-quote-card">
            <h4>মূল বিজ্ঞপ্তি (Official Announcement)</h4>
            <p>
              সকলকে অত্যন্ত আনন্দের সাথে জানানো যাচ্ছে যে, আগামী ৯ই আগস্ট (মঙ্গলবার), বাংলাদেশ ফিল্ম ইনস্টিটিউট এলামনাই এসোসিয়েশনের মাসিক আয়োজন "সিনে ক্লাব আড্ডায়" বাংলাদেশ ফিল্ম ইনস্টিটিউটের প্রাক্তণ শিক্ষার্থী চলচ্চিত্রনির্মাতা খন্দকার সুমনের "পৌণঃপুণিক" চলচ্চিত্রটি অনলাইন জুমের মাধ্যমে প্রদর্শিত হবে। অনুষ্ঠানটি উপস্থাপনা করবেন এসোসিয়েশনের প্রচার সম্পাদক চলচ্চিত্রনির্মাতা মামুন সোবহানি।
            </p>
            <p style="margin-top:12px; font-weight:600; color: var(--gold); font-family: var(--mono); font-size: 13px; letter-spacing: 1px;">
              প্রদর্শনীর সময়ঃ রাত ৯.০০টা (৯ই আগস্ট ২০২২)
            </p>
          </div>

          <h3>Overview &amp; Details</h3>
          <p>
            On Tuesday, August 9th, 2022, the Bangladesh Film Institute Alumni Association (BFIAA) held its monthly <strong>"Cine Club Adda"</strong> featuring the award-winning short film <strong>"পৌণঃপুণিক" (Pounopunik / The Hamster Wheel Rebellion)</strong>.
          </p>
          <p>
            Directed by BFI alumnus and celebrated independent filmmaker <strong>Khandaker Sumon</strong>, <em>Pounopunik</em> explores poignant socio-economic realities with artistic conviction and deep human insight. The film was showcased in a dedicated online Zoom room attended by BFI alumni, students, and invited film enthusiasts.
          </p>
          <p>
            The screening concluded with a comprehensive "Meet the Director" session moderated by filmmaker and BFIAA Publicity Secretary <strong>Mamun Sobhani</strong>, offering attendees an intimate perspective into the filmmaker's creative philosophy and independent production journey.
          </p>

          <div class="event-action-row">
            <a href="index.html#home" class="btn-editorial gold">🏠 Home</a>
            <a href="index.html#events" class="btn-editorial secondary">← All Events</a>
            <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-editorial primary">Join BFIAA Today</a>
          </div>
        </div>
      </div>

    </div>
  </main>
${editorialFooter()}`;

// ============================================================
// PAGE 4: event-songsoptok.html
// ============================================================
const eventSongsoptokHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Cine Club Adda: সংশপ্তক — BFIAA | Bangladesh Film Institute Alumni Association</title>
  <meta name="description" content="BFIAA Cine Club Adda screening of সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী by filmmaker Sajjad Khan, hosted by Mamun Sobhani."/>
  <link rel="canonical" href="https://bfiaa.bfibd.org/event-songsoptok.html"/>
  <link rel="icon" type="image/png" href="images/bfiaa-logo.png"/>
  <meta property="og:title" content="Cine Club Adda: সংশপ্তক — BFIAA"/>
  <meta property="og:description" content="Screening of সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী by BFI alumni filmmaker Sajjad Khan."/>
  <meta property="og:url" content="https://bfiaa.bfibd.org/event-songsoptok.html"/>
  <meta property="og:type" content="article"/>
  <meta property="og:image" content="https://bfiaa.bfibd.org/images/songsoptok-flyer.jpg"/>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Hind+Siliguri:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/editorial.css"/>
  <script type="application/ld+json">
{"@context":"https://schema.org","@type":"Event","name":"Cine Club Adda: সংশপ্তক — Film Screening","startDate":"2022-12-29T21:00","url":"https://bfiaa.bfibd.org/event-songsoptok.html","organizer":{"@type":"Organization","name":"BFIAA","url":"https://bfiaa.bfibd.org"},"location":{"@type":"VirtualLocation","url":"https://zoom.us"}}
  </script>
${eventDetailStyles()}
</head>
<body>
${editorialNav()}

  <main class="editorial-page-hero">
    <div class="container">

      <nav class="event-breadcrumb" aria-label="Breadcrumb">
        <a href="index.html#home">Home</a>
        <span class="sep">/</span>
        <a href="index.html#events">Events</a>
        <span class="sep">/</span>
        <span>Cine Club Adda: সংশপ্তক</span>
      </nav>

      <div class="editorial-badge">🎞️ PAST SCREENING &amp; DIRECTOR'S MEET · CINE CLUB ADDA</div>
      <h1 class="editorial-title">Cine Club Adda: Screening of Songsoptok</h1>
      <h2 class="editorial-bengali-title">"সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী" — সাজ্জাদ খান</h2>

      <div class="editorial-meta-table">
        <div class="meta-item">
          <label>Date &amp; Time</label>
          <span>29 December 2022<small>Thursday @ 9:00 PM</small></span>
        </div>
        <div class="meta-item">
          <label>Director / Guest</label>
          <span>Sajjad Khan<small>Filmmaker &amp; BFI Alumni</small></span>
        </div>
        <div class="meta-item">
          <label>Host &amp; Moderator</label>
          <span>Mamun Sobhani<small>Publicity Secretary, BFIAA</small></span>
        </div>
        <div class="meta-item">
          <label>Streaming Platform</label>
          <span>Zoom &amp; Facebook Live<small>Online Broadcast</small></span>
        </div>
      </div>

      <div class="editorial-grid">
        <aside class="editorial-sticky-side">
          <div class="photo-stage-card">
            <div class="main-photo-frame">
              <img src="images/songsoptok-flyer.jpg" alt="Cine Club Adda: সংশপ্তক — Film Screening Flyer" loading="lazy"/>
            </div>
            <div class="stage-actions">
              <a href="images/songsoptok-flyer.jpg" target="_blank" class="btn-stage gold-btn">🔍 View Full Flyer</a>
              <a href="images/songsoptok-flyer.jpg" download="BFIAA-Songsoptok-Screening.jpg" class="btn-stage">⬇ Download</a>
            </div>
          </div>
        </aside>

        <div class="editorial-prose">
          <div class="bengali-quote-card">
            <h4>মূল বিজ্ঞপ্তি (Official Announcement)</h4>
            <p>
              সকলকে অত্যন্ত আনন্দের সাথে জানানো যাচ্ছে যে, আগামী ২৯শে ডিসেম্বর (বৃহস্পতিবার), বাংলাদেশ ফিল্ম ইনস্টিটিউট এলামনাই এসোসিয়েশনের মাসিক আয়োজন "সিনে ক্লাব আড্ডায়" বাংলাদেশ ফিল্ম ইনস্টিটিউটের প্রাক্তণ শিক্ষার্থী চলচ্চিত্রনির্মাতা সাজ্জাদ খানের "সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী" চলচ্চিত্রটি অনলাইন জুম ও ফেসবুক লাইভের মাধ্যমে প্রদর্শিত হবে। অনুষ্ঠানটি উপস্থাপনা করবেন এসোসিয়েশনের প্রচার সম্পাদক চলচ্চিত্রনির্মাতা মামুন সোবহানি।
            </p>
            <p style="margin-top:12px; font-weight:600; color: var(--gold); font-family: var(--mono); font-size: 13px; letter-spacing: 1px;">
              প্রদর্শনীর সময়ঃ রাত ৯.০০টা (২৯শে ডিসেম্বর ২০২২)
            </p>
          </div>

          <h3>Overview &amp; Details</h3>
          <p>
            On Thursday, December 29th, 2022, the Bangladesh Film Institute Alumni Association (BFIAA) held another memorable edition of its regular monthly cultural session <strong>"Cine Club Adda"</strong>.
          </p>
          <p>
            The session featured an exclusive virtual screening of the documentary <strong>"সংশপ্তক- বীরশ্রেষ্ঠ মতিউর রহমানের কাহিনী"</strong> (<em>Songsoptok - The Story of Bir Sreshtho Matiur Rahman</em>), directed by prominent filmmaker and BFI alumnus <strong>Sajjad Khan</strong>. Following the film screening, an interactive "Meet the Director" conversation was held where alumni, cinephiles, and guests engaged in discussions regarding the film's conceptualization, historical context, and cinematic technique.
          </p>
          <p>
            The event was hosted by filmmaker and BFIAA Publicity Secretary <strong>Mamun Sobhani</strong>, and broadcast live via Zoom and Facebook Live to connect alumni both across Bangladesh and internationally.
          </p>

          <div class="event-action-row">
            <a href="index.html#home" class="btn-editorial gold">🏠 Home</a>
            <a href="index.html#events" class="btn-editorial secondary">← All Events</a>
            <a href="https://forms.gle/J8exDqQ7kwm7sjgz8" target="_blank" rel="noopener" class="btn-editorial primary">Join BFIAA Today</a>
          </div>
        </div>
      </div>

    </div>
  </main>
${editorialFooter()}`;

// Write all pages
const pages = [
  { filename: 'event-cinema-kotha.html', content: cinemakothaHtml },
  { filename: 'event-man.html', content: eventManHtml },
  { filename: 'event-pounopunik.html', content: eventPounopunikHtml },
  { filename: 'event-songsoptok.html', content: eventSongsoptokHtml },
];

pages.forEach(({ filename, content }) => {
  const targetPath = path.join(CONCEPT_DIR, filename);
  fs.writeFileSync(targetPath, content, { encoding: 'utf8' });
  const size = fs.statSync(targetPath).size;
  console.log(`✓ Written: ${filename} (${size} bytes)`);
});

console.log('\nAll 4 event pages written successfully to BFIBD Website-Antigravity/');
