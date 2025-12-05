export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Handle different routes
    if (path === '/' || path === '/index.html') {
      return serveStaticFile('index.html', 'text/html');
    } else if (path === '/login' || path === '/login.html') {
      return serveStaticFile('login.html', 'text/html');
    } else if (path === '/signup' || path === '/signup.html') {
      return serveStaticFile('signup.html', 'text/html');
    } else if (path === '/style.css') {
      return serveStaticFile('style.css', 'text/css');
    } else {
      // Default to login page for any other route
      return serveStaticFile('login.html', 'text/html');
    }
  },
};