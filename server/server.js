global.env = require('./env').get('teste_dev');

const restify = require('restify');

const recursiveReaddir = require('recursive-readdir');

const path = require('path');

const server = restify.createServer({
    name: 'PROOJETOVENDAS',
    version: '1.0.0'
});


var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Projeto Vendas - API',
        version: '1.0',
        description: 'Documentação de todas as rotas da API do Projeto Vendas',
    },
    host: 'localhost:9093',
    basePath: '/'
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./server/documentation/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.urlEncodedBodyParser())

const pathFiles = path.resolve(path.resolve('./').concat('/server/routes'));

recursiveReaddir(pathFiles, ['!*.js'], (err, files) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    files.forEach(element => { require(element)(server) })
});


server.use(
    function nocache(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Pragma', 'no-cache');
        next();
    }

);

module.exports = Object.assign({ server, restify, env, swaggerSpec });
