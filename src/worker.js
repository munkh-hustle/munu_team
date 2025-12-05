export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Handle root path - serve index.html
    if (url.pathname === '/') {
      const response = await env.ASSETS.fetch(new URL(request.url).origin + '/index.html');
      return response;
    }
    
    // For all other static files, let ASSETS handle it
    return env.ASSETS.fetch(request);
  }
}