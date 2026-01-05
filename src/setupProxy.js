const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy uploaded files (images, avatars, etc.)
  app.use(
    '/uploads',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  );
};
