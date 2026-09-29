const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'BFIBD Website-Antigravity', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const targetOld = `    // ── AUTO-ADVANCE ─────────────────────────────────────────────────────
    const AUTO_DELAY = 3000;
    let autoTimer = null;

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(function() {
        var next = (current + 1 < total) ? current + 1 : 0;
        goTo(next);
      }, AUTO_DELAY);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    var showcase = document.getElementById('alumni-films');
    if (showcase) {
      showcase.addEventListener('mouseenter', stopAuto);
      showcase.addEventListener('mouseleave', startAuto);
      showcase.addEventListener('focusin',    stopAuto);
      showcase.addEventListener('focusout',   startAuto);
      showcase.addEventListener('touchstart', stopAuto,                         { passive: true });
      showcase.addEventListener('touchend',   function(){ setTimeout(startAuto, 2000); }, { passive: true });
    }

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) { stopAuto(); } else { startAuto(); }
    });

    startAuto();`;

const targetNew = `    // ── AUTO-ADVANCE ─────────────────────────────────────────────────────
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
    });`;

if (html.includes(targetOld)) {
  html = html.replace(targetOld, targetNew);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('✓ Successfully updated auto-advance logic in index.html');
} else {
  console.log('⚠ targetOld not found directly, checking partial...');
  const idx = html.indexOf('// ── AUTO-ADVANCE');
  if (idx !== -1) {
    console.log(html.slice(idx, idx + 400));
  }
}
