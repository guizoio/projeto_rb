const controllerCarga = require('../controllers/carga')
const UsuarioTokenAcesso = require('../common/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();




module.exports = (server) => {

    server.get('/carga/:usuarii', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerCarga.controllers().consultar(req)
        res.send(result.recordset);
        return next();
    });

    server.get('/ConsultaCARGA/:obsConsul', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerCarga.controllers().consulCarga(req)
        res.send(result.recordset);
        return next();
    });

    server.get('/consultaPORcentagem/:obsConsul', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerCarga.controllers().consultaPORcentagem(req)
        res.send(result.recordset);
        return next();
    });

    server.get('/consulta4MOVIMENTACOES/:obsConsul', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerCarga.controllers().consulta4MOVIMENTACOES(req)
        res.send(result.recordset);
        return next();
    });
    
    // server.get('/usuario/:usuarioId', Acesso.verificaTokenAcesso, async (req, res, next) => {
    //     const result = await controllerUsuario.controllers().obterPorId(req)
    //     res.send(result.recordset);
    //     return next();
    // });

    server.post('/carga', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerCarga.controllers().inserir(req)
        res.send(result.recordset);
        return next();
    });

    
    server.post('/ConsultaOBS', Acesso.verificaTokenAcesso, async (req, res, next) => {
        const result = await controllerCarga.controllers().vaiConsultarObs(req)
        res.send(result.recordset);
        return next();
    });

    // server.put('/usuario', Acesso.verificaTokenAcesso, async (req, res, next) => {
    //     const result = await controllerUsuario.controllers().atualizar(req)
    //     res.send(result.recordset);
    //     return next();
    // });

    // server.post('/usuario/remover/:usuarioId', Acesso.verificaTokenAcesso, async (req, res, next) => {
    //     const result = await controllerUsuario.controllers().remover(req)
    //     res.send(result.recordset);
    //     return next();
    // });

}