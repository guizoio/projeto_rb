const controllerLogin = require('../controllers/login')
const UsuarioTokenAcesso = require('../common/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();
const fs = require('fs');

module.exports = (server) => {

    server.post('/login', async (req, res, next) => {
        const result = await controllerLogin.controllers().login(req)
        res.send(result);
        return next();
    });

}