module.exports = class AcessoDados {

    constructor(user) {
        this.sql = require('../node_modules/mssql')
            , this.types = require('../node_modules/mssql').types
            , this.process = require('process')
            , this.pid = this.process.pid
            , this.ControleId = 0
            , this.config = global.env.database
    }

    async Query(SqlQuery, parametros) {
        try {
            const pool = new this.sql.ConnectionPool(this.config);
            await pool.connect();
            let request = await pool.request();

            if (parametros) {
                for (var i = 0; i < parametros.length; i++) {
                    var campo = Object.keys(parametros[i])[0];
                    var valor = Object.values(parametros[i])[0];
                    var tipo = parametros[i].tipo;
                    request = await request.input(campo, tipo, valor);
                }
            }

            var result1 = await request.query(SqlQuery);
            pool.close();
            return result1;

        } catch (error) {
            return error;
        }
    }

    async ExecuteQuery(SqlQuery, parametros) {

        try {
            const pool = new this.sql.ConnectionPool(this.config);
            await pool.connect();

            let request = await pool.request();

            if (parametros) {
                let p = parametros;

                for (let key in p) {

                    if (p.hasOwnProperty(key)) {

                        let campo = key;
                        let valor = p[key];
                        let tipo = this.sql.VarChar;            

                        // valida se é para forçar o tipo para String (str)
                        if (campo.indexOf('str') != 0) {

                            // valida se é número
                            if (valor != '' && !isNaN(valor)) {
                                // valida se é float ou int
                                if (!Number.isInteger(parseFloat(valor)))
                                    tipo = this.sql.Float
                                else
                                    tipo = this.sql.Int
                            }
                            else {
                                // valida se é data (yyyy-MM-dd)
                                if (valor != '' && valor.split('-').length == 3)
                                    tipo = this.sql.Date
                            }

                        }
                        else {
                            campo = campo.replace('str', '');
                        }

                        request = await request.input(campo, tipo, valor);
                    }
                }
            }

            var result = await request.query(SqlQuery);
            pool.close();
            return result;

        } catch (error) {
            return error;
        }

    }

}