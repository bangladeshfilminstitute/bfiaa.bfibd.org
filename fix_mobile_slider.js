const fs = require('fs');

let indexContent = fs.readFileSync('index.html', 'utf8');

const responsiveCSS = `
    @media (max-width: 768px) {
      .saisei-slide-content {
        left: 10px !important;
        bottom: 10px !important;
        padding: 12px 15px !important;
        max-width: calc(100% - 20px) !important;
      }
      .saisei-slide-content h3 {
        font-size: 1.1rem !important;
      }
      .saisei-slide-content p {
        font-size: 0.85rem !important;
      }
      .saisei-slide-inner {
        aspect-ratio: 4/3 !important;
      }
      .saisei-slider-top {
        padding: 15px !important;
      }
      .saisei-slider-bottom {
        padding: 15px !important;
      }
      .saisei-download-btn {
        top: 10px !important;
        right: 10px !important;
        width: 32px !important;
        height: 32px !important;
      }
      .saisei-download-btn svg {
        width: 16px !important;
        height: 16px !important;
      }
    }
`;

if (!indexContent.includes('@media (max-width: 768px) {\\n      .saisei-slide-content {')) {
  // Inject just before </style>
  indexContent = indexContent.replace('</style>', responsiveCSS + '  </style>');
  fs.writeFileSync('index.html', indexContent);
  console.log('Responsive CSS added.');
} else {
  console.log('Responsive CSS already present.');
}
