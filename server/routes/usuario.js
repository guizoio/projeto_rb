const controllerUsuario = require('../controllers/usuario')
const UsuarioTokenAcesso = require('../common/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();

module.exports = (server) => {

    server.get('/usuario', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerUsuario.controllers().consultar(req)
        res.send(result.recordset);
        return next();
    });

    server.get('/usuario/:usuarioId', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerUsuario.controllers().obterPorId(req)
        res.send(result.recordset);
        return next();
    });

    server.post('/usuario', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerUsuario.controllers().inserir(req)
        res.send(result.recordset);
        return next();
    });

    server.put('/usuario', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerUsuario.controllers().atualizar(req)
        res.send(result.recordset);
        return next();
    });

    server.post('/usuario/remover/:usuarioId', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerUsuario.controllers().remover(req)
        res.send(result.recordset);
        return next();
    });

}