const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3232;

// Primary: New Design Concept directory
const NEW_CONCEPT_DIR = path.resolve(__dirname, '..', 'BFIBD Website-Antigravity');
// Fallback / Classic design directory
const CLASSIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

function resolveFilePath(baseDir, pathname) {
  let safePath = path.normalize(path.join(baseDir, pathname));
  if (!safePath.startsWith(baseDir)) return null;

  if (fs.existsSync(safePath)) {
    const stats = fs.statSync(safePath);
    if (stats.isDirectory()) {
      const indexPath = path.join(safePath, 'index.html');
      if (fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()) {
        return indexPath;
      }
    } else if (stats.isFile()) {
      return safePath;
    }
  }

  // Check with .html extension for clean URLs
  const htmlPath = safePath + '.html';
  if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
    return htmlPath;
  }

  return null;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // Allow switching via query param (?concept=classic or ?concept=new)
  const isClassic = parsedUrl.query.concept === 'classic' || pathname.startsWith('/classic');
  if (pathname.startsWith('/classic')) {
    pathname = pathname.replace(/^\/classic/, '') || '/';
  }

  const primaryDir = isClassic ? CLASSIC_DIR : NEW_CONCEPT_DIR;
  const secondaryDir = isClassic ? NEW_CONCEPT_DIR : CLASSIC_DIR;

  let targetPath = resolveFilePath(primaryDir, pathname);
  let resolvedFrom = isClassic ? 'Classic' : 'New Concept';

  // Fallback to secondary dir if missing in primary (for shared images/assets)
  if (!targetPath) {
    targetPath = resolveFilePath(secondaryDir, pathname);
    if (targetPath) {
      resolvedFrom = isClassic ? 'New Concept (fallback)' : 'Classic (fallback)';
    }
  }

  if (!targetPath) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>');
    console.log(`[404] ${req.method} ${pathname}`);
    return;
  }

  const ext = path.extname(targetPath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  const stream = fs.createReadStream(targetPath);
  stream.on('error', (streamErr) => {
    console.error('Stream error:', streamErr);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('500 Internal Server Error');
    }
  });

  console.log(`[200] [${resolvedFrom}] ${req.method} ${pathname} -> ${path.relative(__dirname, targetPath)}`);
  stream.pipe(res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(`  ★ LIVE: BFIAA NEW DESIGN CONCEPT SERVER ★`);
  console.log(`  Local URL:    http://localhost:${PORT}/#home`);
  console.log(`  Network URL:  http://127.0.0.1:${PORT}/#home`);
  console.log(`  Serving from: ${NEW_CONCEPT_DIR}`);
  console.log(`  Fallback:     ${CLASSIC_DIR}`);
  console.log(`====================================================`);
});
