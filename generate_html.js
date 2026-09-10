const fs = require('fs');
const path = require('path');

const data = {
  "Cover": [ "1Ug16BIVHnXX8tuDKGjgLDdB5Bcao-iIE" ],
  "Raffle Tickets": [ "1u-TxqOy_99GTj7KWvNDpzzeIXP9Uhe82", "1meegyM8BDEqGjUf9k8Gz0jbXJoKqQKR4", "19R9479DDqiuVVVJrhuRtb6FAW4-1lRot", "1XuUs6iOf6Ofw7X_bSWlaP5dWoxyMNPIH", "1xHwLhAr4vfDd3Mb1HFQNXjUr3e2sqsEX", "1EvGl7kO82iK3OWz8DEhP_rUrni3HYC7B", "1bDbGvHToQ8iG6JhEpuL-0p_NAPWep6cw", "1bsLQGpnR7b2BfkSvFQuGVidfcO2EU3H8", "1o11JLZhvuZsgCYzg5XG9c_xOW6_bUJA5" ],
  "Raffle Prizes": [ "1piKcp8_KH0NqOcel3QZy3XFIalX1XtG0", "1x_B7v_ZBu6dzipSbd5DTqL9KdtEnn0Ev", "1rlS4zRAzjZpmY4mnMkpyse3M05pHcnf4", "1HHDn49l7kxlxhTVHWUC_eYqM6vDI0S8M", "1GTNmugEFRlYvG0WbSkhdyqNVk6HPXt96", "1fKVX4o9qp7UmzPNpMMJJehrVSshMiOe5", "1nV6llsyk-XhmNjKvkDzvHXL3bBzhNa6z", "14WqLLdyF6eygXW4AiKKuMqDjGx0T4q4N", "1iigGSsTOHv1wCcs4ydAc5FKlpfiivOhq", "12VnkN9WuSoB5UYeh_kJI3hxKWC3QN5bc", "1FOptUEnUtB7JgOvAyngMDd3ifjr2CkFa", "1NphgFAW1EjKBx48ortRqGyHAwm_v7vDS", "1998UvFyG2nDWr4I5TvvSqBDYy0yjhYF-", "1kQjgbkTXGzXF-gNK4_wbYHK9ZqqZN5RU", "1R0qvRcSDfis5V9y3iv6_A_jQ5ZJsCJ62", "1eP9CCEFa4bb3zr44A6VWKobM-hUvGhLF", "1Un4g-4Yn_SWR1IgUTlwf7LCVrvEsrrP7", "1uLlZ3VHC1fVlou7fWS61-wu37X09jQR0" ],
  "Moments": [ "1V0gAfBBy-pmlJGY1i4kHs8FUnqMrRZrR", "19U-69STAf4JfKUICWh4dKPn3G9FcOCGT", "1kdamcm7Za3TYE_bv2GIq3PcWxwRKu4nr", "1rMjZ9rDQ1S9u5su3OZHgbrcYaFARwd5p", "1Fvu3Md9fHk6SxFyXa7dk3DDGy-qsSIq1", "12ofBWShu0QctBcuGuya6lqPX_lDOjA2f", "1eKJN4kXohZIK9k9Iyr5sW-VcUZi_uRcD", "1A1bEaGraZw615u87wcXdZQPTYPqx3Szn", "1CIWZi8KrG-Zfc2dXa8xILucsrhuY6jGS", "1UMLXy--3RxxItdthQMERQLfXzhZjxRCo", "16sKg4IfsLr2wLwC3CGIM8vkay-xiX9mA" ],
  "Cricket Match": [ "18rhjMRWOCweXbb33AcXxgenDx9VDU_wR", "1TVTVzPMQqATYiHJcnFXYIDRSHdpUDH0w", "1LMHHglI-sHamrAcwFCEHKBNeG0nFlfL6" ],
  "Tanvir Mokammel": [ "1_Ozz9gQMgnUMXhTtnhhfUXcWnHGv8bR9", "1jOBsFP9eAr-BmvvQn-nAfJm7xCOLenSs", "1rS1PQ3gIhXZY0wQFWTSHLbuyu7TnC1Rd", "16ihT9CG_Zuna8-qyIJE4gJurMqzWHKzv" ],
  "Last Moment": [ "1WbTfHBt9X3MKR6ml_Lbjs8z0F5rJMJkC", "1woVkOEkES6oJ7FdPtWmMGojXxYzryfkt", "1u0HHZhoPGFlbaZotg1msVcj9cC53_hyK" ]
};

let html = `
<section class="gallery-section" id="picnic" aria-label="BFIAA Picnic 2023" style="background:var(--dark-2); padding:100px 0; border-top: 1px solid var(--border);">
  <div class="container">
    <div class="reveal text-center" style="margin-bottom: 40px;">
      <div class="section-label" style="justify-content:center;">Events</div>
      <h2 class="section-title">Annual Picnic <span>2023</span></h2>
      <div class="divider" style="margin: 20px auto;"></div>
      <p class="section-desc" style="margin-top: 20px; max-width: 800px; margin-left: auto; margin-right: auto;">
        A day of joy, cricket, raffle draws, and memorable moments with our founding director Tanvir Mokammel and fellow alumni.
      </p>
    </div>

    <!-- Picnic Tabs -->
    <div class="picnic-tabs reveal" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 40px;">
`;

const categories = Object.keys(data);
categories.forEach((cat, idx) => {
    const activeClass = idx === 0 ? "active" : "";
    html += `      <button class="picnic-tab-btn ${activeClass}" data-target="picnic-seg-${idx}">${cat}</button>\n`;
});

html += `    </div>\n\n    <div class="picnic-segments-container reveal reveal-delay-1" style="min-height: 400px;">\n`;

categories.forEach((category, idx) => {
    const ids = data[category];
    const catSafe = category.toLowerCase().replace(/ /g, '-');
    const displayStyle = idx === 0 ? "block" : "none";
    
    html += `      <!-- Segment: ${category} -->\n`;
    html += `      <div class="picnic-segment" id="picnic-seg-${idx}" style="display: ${displayStyle}; animation: fadeIn 0.4s ease-out forwards;">\n`;
    
    // Add masonry style layout for segments with more than 3 images
    let gridStyle = "";
    if (ids.length > 5) {
        // Masonry trick with columns
        gridStyle = `display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); grid-auto-rows: 250px; gap: 16px;`;
    } else if (ids.length === 1) {
        gridStyle = `display: grid; grid-template-columns: 1fr; max-width: 800px; margin: 0 auto;`;
    } else {
        gridStyle = `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px;`;
    }

    html += `        <div class="gallery-grid" style="${gridStyle}">\n`;

    for (let i = 0; i < ids.length; i++) {
        const urlPath = `images/picnic-2023/${catSafe}/${i + 1}.jpg`;
        // Make the first image span 2 rows if it's a large gallery to give a "bento box" feel
        let itemStyle = "";
        if (ids.length > 5 && i === 0) {
            itemStyle = `grid-row: span 2; grid-column: span 2;`;
        }

        html += `          <div class="gallery-item" tabindex="0" data-src="${urlPath}" data-caption="${category} - Photo ${i + 1}" style="${itemStyle}">
            <img src="${urlPath}" alt="${category}" loading="lazy" style="height: 100%; object-fit: cover;" />
            <div class="gallery-overlay">
              <span class="gallery-icon">⤢</span>
            </div>
          </div>\n`;
    }

    html += `        </div>\n`;
    html += `      </div>\n`;
});

html += `    </div>\n  </div>\n</section>\n`;

fs.writeFileSync('picnic_html.txt', html);
console.log("Written new tabbed layout to picnic_html.txt");
