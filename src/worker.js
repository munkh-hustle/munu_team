export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Clean URL routing
    if (url.pathname === '/') {
      const newUrl = new URL(request.url);
      newUrl.pathname = '/index.html';
      return env.ASSETS.fetch(new Request(newUrl, request));
    } else if (url.pathname === '/login') {
      const newUrl = new URL(request.url);
      newUrl.pathname = '/login.html';
      return env.ASSETS.fetch(new Request(newUrl, request));
    } else if (url.pathname === '/signup') {
      const newUrl = new URL(request.url);
      newUrl.pathname = '/signup.html';
      return env.ASSETS.fetch(new Request(newUrl, request));
    } else if (url.pathname === '/style.css') {
      return env.ASSETS.fetch(request);
    }
    
    // For all other static files, let ASSETS handle it
    return env.ASSETS.fetch(request);
  }
}