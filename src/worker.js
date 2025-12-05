export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Route to specific pages
    if (url.pathname === '/' || url.pathname === '/login.html') {
      return env.ASSETS.fetch(request);
    } else if (url.pathname === '/login' || url.pathname === '/login.html') {
      // Modify the request URL to get login.html
      const newUrl = new URL(request.url);
      newUrl.pathname = '/login.html';
      return env.ASSETS.fetch(new Request(newUrl, request));
    } else if (url.pathname === '/signup' || url.pathname === '/signup.html') {
      // Modify the request URL to get signup.html
      const newUrl = new URL(request.url);
      newUrl.pathname = '/signup.html';
      return env.ASSETS.fetch(new Request(newUrl, request));
    } else if (url.pathname === '/style.css') {
      return env.ASSETS.fetch(request);
    }
    
    // Default: serve the signup page
    const signupUrl = new URL(request.url);
    signupUrl.pathname = '/signup.html';
    return env.ASSETS.fetch(new Request(signupUrl, request));
  }
}