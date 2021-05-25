const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/v1',
        createProxyMiddleware({
            target: 'http://10.0.2.34:8072',
            logLevel:"debug",
            changeOrigin: false,
        })
    );
    app.use(
        '/us/v1',
        createProxyMiddleware({
            target: 'http://10.0.2.34:8072',
            logLevel:"debug",
            changeOrigin: false,
        })
    );

};
