const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// The section we want to replace
const startIndex = content.indexOf('<!-- Mega Gallery Grid (Replaced with Swiper) -->');
const endIndex = content.indexOf('</section>', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find the section to replace!");
  process.exit(1);
}

const originalBlock = content.substring(startIndex, endIndex);

const newSlider = `<!-- Saisei Inspired Custom Slider -->
    <div class="saisei-slider-wrapper" style="width: 100%; border: 1px solid var(--border); background: #0a0a0a; border-radius: 8px; overflow: hidden; font-family: var(--font-main);">
      
      <!-- Top Bar -->
      <div class="saisei-slider-top" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; border-bottom: 1px solid var(--border);">
        <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: var(--gold);">
          ? Selected Photos
        </div>
        <div class="saisei-pagination-fraction" style="font-family: var(--font-mono); font-size: 0.9rem; color: #fff;">
          <span class="saisei-current">1</span> / <span class="saisei-total">10</span>
        </div>
      </div>

      <!-- Main Slider -->
      <div class="reveal reveal-delay-1 swiper thirty-years-slider" style="width: 100%;">
        <div class="swiper-wrapper">
          <!-- Slide 1 (Default Photo) -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-2.jpg" alt="Uralchitra Launch" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Uralchitra Special Edition</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">Magazine Launch Event</p>
              </div>
            </div>
          </div>
          <!-- Slide 2 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-1.jpg" alt="Stage Celebration" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">30 Years Celebration</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">Stage Event & Masterclass</p>
              </div>
            </div>
          </div>
          <!-- Slide 3 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-3.jpg" alt="Birthday Celebration" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Birthday Celebration</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">Honoring Tanvir Mokammel</p>
              </div>
            </div>
          </div>
          <!-- Slide 4 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-4.jpg" alt="Tanvir Mokammel" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Tanvir Mokammel</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">Founder & Director</p>
              </div>
            </div>
          </div>
          <!-- Slide 5 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-5.jpg" alt="Film Festival Audience" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Film Festival</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">Retrospective Screenings</p>
              </div>
            </div>
          </div>
          <!-- Slide 6 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-6.jpg" alt="Alumni Gathering 1" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Alumni Gathering</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">BFI Community</p>
              </div>
            </div>
          </div>
          <!-- Slide 7 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-7.jpg" alt="Alumni Gathering 2" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Alumni Gathering</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">BFI Community</p>
              </div>
            </div>
          </div>
          <!-- Slide 8 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-8.jpg" alt="Alumni Gathering 3" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Alumni Gathering</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">BFI Community</p>
              </div>
            </div>
          </div>
          <!-- Slide 9 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-9.jpg" alt="Alumni Gathering 4" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Alumni Gathering</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">BFI Community</p>
              </div>
            </div>
          </div>
          <!-- Slide 10 -->
          <div class="swiper-slide">
            <div class="saisei-slide-inner" style="position: relative; width: 100%; aspect-ratio: 16/9; max-height: 700px;">
              <img src="images/30-years/photo-10.jpg" alt="Alumni Gathering 5" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;" />
              <div class="saisei-slide-content" style="position: absolute; bottom: 30px; left: 30px; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); border: 1px solid var(--border); padding: 20px 30px; border-radius: 4px;">
                <h3 style="margin: 0; font-family: var(--font-title); font-size: 1.4rem; color: var(--gold); letter-spacing: 1px;">Alumni Gathering</h3>
                <p style="margin: 5px 0 0; font-size: 0.9rem; color: #ddd;">BFI Community</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <!-- Bottom Bar -->
      <div class="saisei-slider-bottom" style="display: flex; justify-content: space-between; align-items: center; padding: 20px 30px; border-top: 1px solid var(--border);">
        <div class="saisei-slider-controls" style="display: flex; gap: 15px;">
          <button class="saisei-btn-prev" style="background: transparent; border: 1px solid var(--border); color: #fff; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: all 0.3s ease;">&larr;</button>
          <button class="saisei-btn-next" style="background: transparent; border: 1px solid var(--border); color: #fff; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center; transition: all 0.3s ease;">&rarr;</button>
        </div>
        <div class="saisei-pagination-bullets" style="display: flex; gap: 8px;">
          <!-- Bullets injected by Swiper -->
        </div>
      </div>
    </div>`;

// Replace it
content = content.replace(originalBlock, newSlider + '\n  </div>\n');

// Update JS for Swiper initialization
content = content.replace(
  `new Swiper('.thirty-years-slider', {`,
  `new Swiper('.thirty-years-slider', {
          on: {
            slideChange: function () {
              document.querySelector('.saisei-current').textContent = this.realIndex + 1;
            }
          },`
);
content = content.replace(`el: '.swiper-pagination'`, `el: '.saisei-pagination-bullets'`);
content = content.replace(`nextEl: '.swiper-button-next'`, `nextEl: '.saisei-btn-next'`);
content = content.replace(`prevEl: '.swiper-button-prev'`, `prevEl: '.saisei-btn-prev'`);

fs.writeFileSync('index.html', content);
console.log('Saisei Slider styling applied successfully.');
