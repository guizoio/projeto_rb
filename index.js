const { server, restify, env, swaggerSpec } = require('./server/server');

// serve swagger
server.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

server.get('/*.*', restify.plugins.serveStatic({
    directory: './site/carousel/',
    default: 'index.html'
}));

server.listen(env.port, () => {
    console.log('\x1b[33m%s\x1b[0m', `AMBIENTE: ${env.ambiente}  URL: ${env.url} PORTA: ${env.port}`);
});