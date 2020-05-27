const AcessoDados = require('../db/acessodados.js');
const db = new AcessoDados();
const crypto = require('crypto');
const ReadCommandSql = require('../common/readCommandSql');
const readCommandSql = new ReadCommandSql();

const controllers = () => {

    const consultar = async (req) => {

        var ComandoSQL = await readCommandSql.retornaStringSql('consultar', 'usuario');
        var result = await db.ExecuteQuery(ComandoSQL);

        console.log(result);
        return result

    }

    const obterPorId = async (req) => {

        var ComandoSQL = await readCommandSql.retornaStringSql('obterPorId', 'usuario');
        var result = await db.ExecuteQuery(ComandoSQL, req.params);

        console.log(result);
        return result

    }

    const inserir = async (req) => {

        req.body.senha = crypto.createHmac('sha256', req.body.senha).digest('hex');

        var ComandoSQL = await readCommandSql.retornaStringSql('inserir', 'usuario');
        var result = await db.ExecuteQuery(ComandoSQL, req.body);

        console.log(result);
        return result
    }

    const atualizar = async (req) => {

        var ComandoSQL = await readCommandSql.retornaStringSql('atualizar', 'usuario');
        var result = await db.ExecuteQuery(ComandoSQL, req.body);

        console.log(result);
        return result

    }

    const remover = async (req) => {

        var ComandoSQL = await readCommandSql.retornaStringSql('remover', 'usuario');
        var result = await db.ExecuteQuery(ComandoSQL, req.params);

        console.log(result);
        return result

    }

    return Object.create({
        consultar
        , obterPorId
        , inserir
        , atualizar
        , remover
    })

}

module.exports = Object.assign({ controllers })