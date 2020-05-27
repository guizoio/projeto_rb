var config = {
    teste_dev: {
        url: 'http://localhost',
        port: 3330,
        ambiente: 'DEV',
        session: {
            secret: 'teste',
            resave: false,
            saveUninitialized: false,
            cookie: { secure: false }
        },
        database: {
            user: 'sa',
            password: 'Ovodepascoades2',
            server: '172.17.0.3',
            //serve: '192.168.0.110',
            database: 'projeto_l',
            requestTimeout: 180000,
            connectionTimeout: 180000,
            options: { encrypt: false },
            pool: {
                idleTimeoutMillis: 180000,
                max: 100
            }
        }
    }
}

exports.get = function get(env) {
    return config.teste_dev;
}