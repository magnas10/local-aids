const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('🔧 Setting up proxy middleware...');
  
  // Proxy API requests
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5002',
      changeOrigin: true,
      logLevel: 'debug',
      onProxyReq: (proxyReq, req, res) => {
        console.log(`[PROXY] ${req.method} ${req.url} -> http://localhost:5002${req.url}`);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log(`[PROXY] ${proxyRes.statusCode} from ${req.url}`);
      },
      onError: (err, req, res) => {
        console.error('[PROXY ERROR]:', err.message);
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
          success: false,
          message: 'Backend server connection failed. Please ensure the backend is running on port 5002.'
        }));
      }
    })
  );

  // Proxy uploaded files
  app.use(
    '/uploads',
    createProxyMiddleware({
      target: 'http://localhost:5002',
      changeOrigin: true
    })
  );
  
  console.log('✅ Proxy middleware configured for /api and /uploads');
};
