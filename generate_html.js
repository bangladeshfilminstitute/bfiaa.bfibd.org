const fs = require('fs');
const path = require('path');

const data = {
  "Cover": [ "1Ug16BIVHnXX8tuDKGjgLDdB5Bcao-iIE" ],
  "Raffle Tickets": [ "1u-TxqOy_99GTj7KWvNDpzzeIXP9Uhe82", "1meegyM8BDEqGjUf9k8Gz0jbXJoKqQKR4", "19R9479DDqiuVVVJrhuRtb6FAW4-1lRot", "1XuUs6iOf6Ofw7X_bSWlaP5dWoxyMNPIH", "1xHwLhAr4vfDd3Mb1HFQNXjUr3e2sqsEX", "1EvGl7kO82iK3OWz8DEhP_rUrni3HYC7B", "1bDbGvHToQ8iG6JhEpuL-0p_NAPWep6cw", "1bsLQGpnR7b2BfkSvFQuGVidfcO2EU3H8", "1o11JLZhvuZsgCYzg5XG9c_xOW6_bUJA5" ],
  "Raffle Prizes": [ "1piKcp8_KH0NqOcel3QZy3XFIalX1XtG0", "1x_B7v_ZBu6dzipSbd5DTqL9KdtEnn0Ev", "1rlS4zRAzjZpmY4mnMkpyse3M05pHcnf4", "1HHDn49l7kxlxhTVHWUC_eYqM6vDI0S8M", "1GTNmugEFRlYvG0WbSkhdyqNVk6HPXt96", "1fKVX4o9qp7UmzPNpMMJJehrVSshMiOe5", "1nV6llsyk-XhmNjKvkDzvHXL3bBzhNa6z", "14WqLLdyF6eygXW4AiKKuMqDjGx0T4q4N", "1iigGSsTOHv1wCcs4ydAc5FKlpfiivOhq", "12VnkN9WuSoB5UYeh_kJI3hxKWC3QN5bc", "1FOptUEnUtB7JgOvAyngMDd3ifjr2CkFa", "1NphgFAW1EjKBx48ortRqGyHAwm_v7vDS", "1998UvFyG2nDWr4I5TvvSqBDYy0yjhYF-", "1kQjgbkTXGzXF-gNK4_wbYHK9ZqqZN5RU", "1R0qvRcSDfis5V9y3iv6_A_jQ5ZJsCJ62", "1eP9CCEFa4bb3zr44A6VWKobM-hUvGhLF", "1Un4g-4Yn_SWR1IgUTlwf7LCVrvEsrrP7", "1uLlZ3VHC1fVlou7fWS61-wu37X09jQR0" ],
  "Moments": [ "1V0gAfBBy-pmlJGY1i4kHs8FUnqMrRZrR", "19U-69STAf4JfKUICWh4dKPn3G9FcOCGT", "1kdamcm7Za3TYE_bv2GIq3PcWxwRKu4nr", "1rMjZ9rDQ1S9u5su3OZHgbrcYaFARwd5p", "1Fvu3Md9fHk6SxFyXa7dk3DDGy-qsSIq1", "12ofBWShu0QctBcuGuya6lqPX_lDOjA2f", "1eKJN4kXohZIK9k9Iyr5sW-VcUZi_uRcD", "1A1bEaGraZw615u87wcXdZQPTYPqx3Szn", "1CIWZi8KrG-Zfc2dXa8xILucsrhuY6jGS", "1UMLXy--3RxxItdthQMERQLfXzhZjxRCo", "16sKg4IfsLr2wLwC3CGIM8vkay-xiX9mA" ],
  "Cricket Match": [ "18rhjMRWOCweXbb33AcXxgenDx9VDU_wR", "1TVTVzPMQqATYiHJcnFXYIDRSHdpUDH0w", "1LMHHglI-sHamrAcwFCEHKBNeG0nFlfL6" ],
  "Tanvir Mokammel": [ "16ihT9CG_Zuna8-qyIJE4gJurMqzWHKzv" ],
  "Last Moment": [ "1WbTfHBt9X3MKR6ml_Lbjs8z0F5rJMJkC", "1woVkOEkES6oJ7FdPtWmMGojXxYzryfkt", "1u0HHZhoPGFlbaZotg1msVcj9cC53_hyK" ]
};

let html = `
<!-- ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
     PICNIC 2023
■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ -->
<section class="gallery-section" id="picnic" aria-label="BFIAA Picnic 2023" style="background:var(--dark); padding:100px 0;">
  <div class="container">
    <div class="reveal text-center" style="margin-bottom: 60px;">
      <div class="section-label" style="justify-content:center;">Events</div>
      <h2 class="section-title">Annual Picnic <span>2023</span></h2>
      <div class="divider" style="margin: 20px auto;"></div>
      <p class="section-desc" style="margin-top: 20px; max-width: 800px; margin-left: auto; margin-right: auto;">
        A day of joy, cricket, raffle draws, and memorable moments with our founding director Tanvir Mokammel and fellow alumni.
      </p>
    </div>
`;

for (const [category, ids] of Object.entries(data)) {
    const catSafe = category.toLowerCase().replace(/ /g, '-');
    
    html += `\n    <!-- Segment: ${category} -->\n`;
    html += `    <div class="picnic-segment" style="margin-bottom: 60px;">\n`;
    
    // Only add a title if it's not the Cover, or maybe format it differently
    if (category !== "Cover") {
        html += `      <h3 style="font-family: var(--font-title); font-size: 1.8rem; margin-bottom: 24px; color: var(--gold); border-bottom: 1px solid rgba(200, 169, 81, 0.2); padding-bottom: 10px;">${category}</h3>\n`;
    }
    
    // If it's the cover, just one big image
    if (category === "Cover" || ids.length === 1) {
        html += `      <div class="gallery-grid" style="grid-template-columns: 1fr;">\n`;
    } else {
        html += `      <div class="gallery-grid">\n`;
    }

    for (let i = 0; i < ids.length; i++) {
        const urlPath = `images/picnic-2023/${catSafe}/${i + 1}.jpg`;
        html += `        <div class="gallery-item reveal" tabindex="0" data-src="${urlPath}" data-caption="${category} - Photo ${i + 1}">
          <img src="${urlPath}" alt="${category}" loading="lazy" />
          <div class="gallery-overlay">
            <span class="gallery-icon">⤢</span>
          </div>
        </div>\n`;
    }

    html += `      </div>\n`;
    html += `    </div>\n`;
}

html += `  </div>\n</section>\n`;

fs.writeFileSync('picnic_html.txt', html);
console.log("Written to picnic_html.txt");
