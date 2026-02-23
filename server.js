const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

var server = http.createServer(function(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*' });
    res.end();
    return;
  }

  if (req.method === 'GET') {
    if (req.url === '/' || req.url === '/index.html') {
      serveFile(res, path.join(__dirname, 'index.html'), 'text/html');
    } else if (req.url === '/astro-data.json') {
      serveFile(res, path.join(__dirname, 'astro-data.json'), 'application/json');
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
    return;
  }

  res.writeHead(405);
  res.end('Method not allowed');
});

server.listen(PORT, function() {
  console.log('Astro Thesaurus running at http://localhost:' + PORT);
});
