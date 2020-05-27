const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const UsuarioTokenAcesso = require('../common/protecaoTokenAcesso');
const Acesso = new UsuarioTokenAcesso();
const crypto = require('crypto');
const ReadCommandSql = require('../common/readCommandSql');
const readCommandSql = new ReadCommandSql();

const controllers = () => {

    const login = async (req) => {

        var password = req.body.senha;

        var ComandoSQL = await readCommandSql.retornaStringSql('login', 'login');
        var usuarioBanco = await db.ExecuteQuery(ComandoSQL, req.body);

        if (usuarioBanco.recordset != undefined && usuarioBanco.recordset.length > 0) {

            // valida se as senhas são diferentes
            //var hashSenha = crypto.createHmac('sha256', password).digest('hex');
            //console.log("aqui");
            //console.log(hashSenha);
            //console.log(usuarioBanco.recordset[0].Senha);
             if (password != usuarioBanco.recordset[0].senha) {
                 return { "Status": false, "Mensagem": "Senha incorreta" };
             }

            // se estiver tudo ok, gera o token e retorna o json
            var tokenAcesso = Acesso.gerarTokenAcesso(req.body.usuario);
            return { 
                    "TokenAcesso": tokenAcesso, 
                    "NomeCompleto": usuarioBanco.recordset[0].Nome, 
                    "Status": true,
                    "UsuarioAcesso": usuarioBanco.recordset[0].login, 
                    "nick": usuarioBanco.recordset[0].nick, 
                    "email": usuarioBanco.recordset[0].email, 
                };

        }
        else {
            return { "Status": false, "Mensagem": "Usuário não cadastrado no sistema" };
        }
    };

    return Object.create({
        login
    })

};

module.exports = Object.assign({ controllers })