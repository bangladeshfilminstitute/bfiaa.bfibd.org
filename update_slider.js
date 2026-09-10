const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// The section we want to replace
const sectionRegex = /<!-- Mega Gallery Grid -->[\s\S]*?(?=<\/div>\s*<\/section>\s*<!-- \n     TIMELINE)/;

const newSlider = `<!-- Swiper Slider (Production Ready) -->
    <div class="reveal reveal-delay-1 swiper thirty-years-slider" style="width: 100%; border-radius: 12px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
      <div class="swiper-wrapper">
        <!-- Default Photo (Slide 1 now, was photo-2) -->
        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-2.jpg" alt="Uralchitra Launch" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Uralchitra Special Edition Launch</h3>
            </div>
          </div>
        </div>
        
        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-1.jpg" alt="Stage Celebration" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">30 Years Celebration - Stage</h3>
            </div>
          </div>
        </div>
        
        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-3.jpg" alt="Birthday Celebration" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Birthday Celebration</h3>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-4.jpg" alt="Tanvir Mokammel" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Tanvir Mokammel</h3>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-5.jpg" alt="Film Festival Audience" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Film Festival Audience</h3>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-6.jpg" alt="Alumni Gathering 1" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Alumni Gathering</h3>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-7.jpg" alt="Alumni Gathering 2" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Alumni Gathering</h3>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-8.jpg" alt="Alumni Gathering 3" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Alumni Gathering</h3>
            </div>
          </div>
        </div>
        
        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-9.jpg" alt="Alumni Gathering 4" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Alumni Gathering</h3>
            </div>
          </div>
        </div>

        <div class="swiper-slide">
          <div class="slider-img-wrap" style="position: relative; width: 100%; aspect-ratio: 21/9; max-height: 600px;">
            <img src="images/30-years/photo-10.jpg" alt="Alumni Gathering 5" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
            <div class="slider-caption" style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 20px 20px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); color: #fff;">
              <h3 style="margin:0; font-family: var(--font-title); font-size: 1.5rem; letter-spacing: 1px; color: var(--gold);">Alumni Gathering</h3>
            </div>
          </div>
        </div>

      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Navigation -->
      <div class="swiper-button-prev" style="color: var(--gold);"></div>
      <div class="swiper-button-next" style="color: var(--gold);"></div>
    </div>`;

content = content.replace(sectionRegex, newSlider + '\n    ');

// We also need to add Swiper CSS/JS if not already present
if (!content.includes('swiper-bundle.min.css')) {
  content = content.replace(
    '</head>',
    '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>'
  );
}

if (!content.includes('swiper-bundle.min.js')) {
  content = content.replace(
    '</body>',
    `  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof Swiper !== 'undefined') {
        new Swiper('.thirty-years-slider', {
          loop: true,
          speed: 600,
          parallax: true,
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          }
        });
      }
    });
  </script>
</body>`
  );
}

fs.writeFileSync('index.html', content);
console.log('Slider updated successfully.');
