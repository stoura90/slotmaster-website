const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {

    app.use(
        '/ss/v1',
        createProxyMiddleware({
            //target: 'http://212.72.155.131',
            //target: 'http://127.0.0.1:8072',
            target: 'http://192.168.30.50:8072',
            // target: 'http://192.168.10.34:8072',
            logLevel:"debug",
            changeOrigin: false,
        })
    );
    app.use(
        '/us/v1',
        createProxyMiddleware({
            //target: 'http://212.72.155.131',
            //target: 'http://127.0.0.1:8072',
            target: 'http://192.168.30.50:8072',
            //target: 'http://192.168.10.34:8072',
            logLevel:"debug",
            changeOrigin: false,
        })
    );
    app.use(
        '/us/v2',
        createProxyMiddleware({
            //target: 'http://212.72.155.131',
            //target: 'http://127.0.0.1:8072',
            target: 'http://192.168.30.50:8072',
            //target: 'http://192.168.10.34:8072',
            logLevel:"debug",
            changeOrigin: false,
        })
    );
    app.use(
        '/ws/v1',
        createProxyMiddleware({
            //target: 'http://212.72.155.131',
            //target: 'http://127.0.0.1:8072',
            target: 'http://192.168.30.50:8072',
            //target: 'http://192.168.10.34:8072',
            logLevel:"debug",
            changeOrigin: false,
        })
    );
    app.use(
        '/v1',
        createProxyMiddleware({
            //target: 'http://212.72.155.131',
            target: 'http://192.168.30.50:8072',
           //target: 'http://127.0.0.1:8072',
            //target: 'http://192.168.10.34:8072',
            logLevel:"debug",
            changeOrigin: false,
        })
    );
};
