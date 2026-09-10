const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

if (!content.includes('.saisei-btn-next:hover')) {
  content = content.replace(
    '</head>',
    `  <style>
    .saisei-btn-prev:hover, .saisei-btn-next:hover {
      background: var(--gold) !important;
      color: #000 !important;
      border-color: var(--gold) !important;
    }
    .saisei-pagination-bullets .swiper-pagination-bullet {
      background: #fff;
      opacity: 0.5;
    }
    .saisei-pagination-bullets .swiper-pagination-bullet-active {
      background: var(--gold);
      opacity: 1;
    }
  </style>
</head>`
  );
  fs.writeFileSync('index.html', content);
}
console.log('Hover styles added.');
