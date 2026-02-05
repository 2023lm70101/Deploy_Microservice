const http = require('http');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'hello-world', 'build');

function sendJSON(res, obj, code = 200) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(code);
  res.end(JSON.stringify(obj));
}

function serveStatic(req, res) {
  // map request URL to build dir
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(buildDir, reqPath.replace(/^\//, ''));

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // If file not found, fallback to index.html for SPA routing
      const indexPath = path.join(buildDir, 'index.html');
      fs.readFile(indexPath, (err2, data) => {
        if (err2) {
          sendJSON(res, { message: 'API running', status: 'success' });
          return;
        }
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end(data);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const map = {
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.html': 'text/html',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };
    const contentType = map[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  // Allow CORS for API endpoints
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // API endpoint
  if (req.url === '/api' && req.method === 'GET') {
    sendJSON(res, { message: 'Hello from API', status: 'success' });
    return;
  }

  // If build exists, serve static files (React app)
  if (fs.existsSync(buildDir)) {
    serveStatic(req, res);
    return;
  }

  // Fallback simple response
  sendJSON(res, { message: 'Hello from API (no frontend build found)', status: 'success' });
});

server.listen(2300, () => {
  console.log('Server running on http://localhost:2300');
});
