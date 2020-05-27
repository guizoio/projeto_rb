var jwt = require('jsonwebtoken');
var SchemaObject = require('node-schema-object');

var UsuarioTokenAcesso = new SchemaObject(
    {
        tokenAcesso: String
    },
    {
        methods: {
            gerarTokenAcesso(UsuarioAD) {
                return jwt.sign({ 'UsuarioAD': UsuarioAD }, 'chaveseguranca', { expiresIn: 36000 });
            },
            verificaTokenAcesso(req, res, next) {
                var headerTokenAcesso = req.headers['authorization'];
                if (typeof headerTokenAcesso != 'undefined') {
                    try {
                        var decoded = jwt.verify(headerTokenAcesso, 'chaveseguranca');
                        next();
                    } catch (err) {
                        res.send(401);
                    }
                } else {
                    res.send(401);
                }
            },
            retornaCodigoTokenAcesso(Valor, req) {
                var headerTokenAcesso = req;
                var decoded = jwt.decode(headerTokenAcesso, { complete: true });
                if (Valor === "UsuarioAD") {
                    return decoded.payload.UsuarioAD;
                }
            }
        }
    }
);

module.exports = UsuarioTokenAcesso;