const dbAccess = require('./MSDBAccess.js')

const config = {
    user: 'sa',
    password: '123',
    server: '127.0.0.1', // You can use 'localhost\\instance' to connect to named instance
    database: 'tediousTestDB',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

var dbconnPool = dbAccess.getDBConnPool(config);
dbconnPool.then(pool => {
    var trans = pool.transaction();
    var dbCommand = dbAccess.getDBCommand(trans);
    trans.begin()
        .then(() => {
            return dbCommand.UserInfoGet('0000001')
                .then((result) => {
                    console.dir(result);
                })
        })
        .then(() => {
            trans.commit(err => {
                // ... error checks
            })
        })
        .catch((error) => {
            console.log(error);
            trans.rollback(err => {
                // ... error checks
            })
        })
}).catch((error) => {
    console.log(error);
});
//