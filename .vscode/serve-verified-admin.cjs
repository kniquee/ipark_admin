const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const allowed = new Set(['admin4.html', 'admin_signin.html', 'logo.png', 'app_icon.png']);
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://127.0.0.1').pathname;
  const name = pathname.replace(/^\/ipark_admin\//, '');
  if (!allowed.has(name)) { res.writeHead(404); res.end(); return; }
  fs.readFile(path.join(root, name), (error, contents) => {
    if (error) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, {
      'Content-Type': name.endsWith('.html') ? 'text/html; charset=utf-8' : 'image/png',
      'Cache-Control': 'no-store, max-age=0',
      'X-iPark-Source': 'verified-local-project'
    });
    res.end(contents);
  });
}).listen(5500, '127.0.0.1');
