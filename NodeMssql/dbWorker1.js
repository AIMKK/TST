const config = {
    user: 'sa',
    password: '123',
    server: '127.0.0.1', // You can use 'localhost\\instance' to connect to named instance
    database: 'tediousTestDB',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

const sql = require('mssql')

sql.connect(config).then(pool => {
        // Query

        return pool.request()
            .input('UserCode', sql.VarChar, '0000001')
            .query('select * from Users where UserCode = @UserCode')
    })
    // .then(result => {
    //     console.dir(result)

//     // Stored procedure

//     return pool.request()
//         .input('input_parameter', sql.Int, value)
//         .output('output_parameter', sql.VarChar(50))
//         .execute('procedure_name')
// })
.then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
})

sql.on('error', err => {
    // ... error handler
})