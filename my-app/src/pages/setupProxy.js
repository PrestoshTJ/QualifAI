const { createProxyMiddlewar}= require('http-proxy-middleware')
module.exports=function(app) {
    app.use(
        '/api',
        createProxyMiddlewar({
            target: 'http://localhost:3000',
            changeOrigin: true
        })
    );
};