const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {

    const proxy = {
        target: 'https://staging.planetaxbet.com',
        //target: 'http://127.0.0.1:8072',
        //target: 'http://192.168.30.50:8072',
       // target: 'http://192.168.10.34:8072',
        logLevel:"debug",
        changeOrigin: true,
    }

    app.use(
        '/ss/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/os/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/us/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/us/v2',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/ws/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/v1',
        createProxyMiddleware(proxy)
    );
    app.use(
        '/wsd/v1',
        createProxyMiddleware(proxy)
    );
};
