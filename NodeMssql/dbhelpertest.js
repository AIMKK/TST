const dbhelper = require('./NodeMssqlDBHelper.js')
const sqlDB = dbhelper.sqlDB;
const commandType = dbhelper.commandType;
const cmdParamDirection = dbhelper.paramDirection;

const config = {
        user: 'sa',
        password: '123',
        server: '127.0.0.1', // You can use 'localhost\\instance' to connect to named instance
        database: 'tediousTestDB',

        options: {
            encrypt: true // Use this if you're on Windows Azure
        }
    }
    //to test  1,query get recs 2,query get stream  3,in/updat serial 4,trans

var sql = 'select * from Users where UserCode = @UserCode';
var paras = [];
var param = dbhelper.createSqlParam('UserCode', '0000001', sqlDB.VarChar, cmdParamDirection.Input);
paras.push(param);
//
var dbconnPool = dbhelper.getDBConnPool(config);
dbconnPool.then(pool => {
    var trans = pool.transaction();
    var request = dbhelper.createDBRequest(trans);
    trans.begin()
        .then(() => {
            request(sql, commandType.Sql, paras).then(
                (result) => {
                    console.dir(result);
                }
            )
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