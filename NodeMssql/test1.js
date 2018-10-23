const config2 = {
    user: 'sa',
    password: '123',
    server: '192.168.122.248', // You can use 'localhost\\instance' to connect to named instance
    database: 'tediousTestDB',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

const sql = require('mssql')

function execute() {
    sql.connect(config).then(pool => {
            // Query
            console.log('heerer')
            return pool.request()
                .query('select top 1 * from CashFlow '); // Users // CashFlow

        })
        .then(result => {
            console.dir(result)
        }).catch(err => {
            console.log(err)
                // ... error checks
        })

    sql.on('error', err => {
        console.log(err)
            // ... error handler
    })
}

execute();