/**
 * Simple HTTP server for vanilla JS example
 */

const server = Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);

    // Serve the index.html
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const file = Bun.file('examples/vanilla/index.html');
      return new Response(file, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
        },
      });
    }

    // Serve CSS files from dist
    if (url.pathname.startsWith('/dist/styles/')) {
      const file = Bun.file(`dist/styles/${url.pathname.split('/').pop()}`);
      return new Response(file, {
        headers: {
          'Content-Type': 'text/css; charset=utf-8',
        },
      });
    }

    // Serve JS files from dist
    if (url.pathname.startsWith('/dist/')) {
      const file = Bun.file(`dist/${url.pathname.replace('/dist/', '')}`);
      return new Response(file, {
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
        },
      });
    }

    // 404 for other routes
    return new Response('Not Found', { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
console.log(`Open http://localhost:${server.port}/ in your browser`);
