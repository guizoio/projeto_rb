const controllerCarga = require('../controllers/conta')
const UsuarioTokenAcesso = require('../common/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();





module.exports = (server) => {

    server.post('/cadastro', async (req, res, next) => {
        const result = await controllerCarga.controllers().inserir(req)
        res.send(result.recordset);
        return next();
    });

}