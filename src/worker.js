export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Let the asset handler serve all files from the public folder
    return env.ASSETS.fetch(request);
  }
}