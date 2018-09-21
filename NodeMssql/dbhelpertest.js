const dbhelper = require('./NodeMssqlDBHelper.js')
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
dbhelper.setConnConfig(config);
var param = dbhelper.createSqlParam('UserCode', '0000001', dbhelper.sqlDB.VarChar, dbhelper.commandType.Input);
paras.push(param);
dbhelper.executeNonQuery(sql, dbhelper.commandType.Sql, paras);

//zhixing,zbc


//
dbhelper.setConnConfig(config);
var dbconn = dbhelper.getDBConn();
dbconn.connect()
    .then(() => {
        var trans = dbhelper.createTransaction(dbconn);
        var request = dbhelper.createRequestByTrans(trans);
        trans.begin().then(() => {
            request.exec(sql, dbhelper.commandType.Sql, paras)
                .then(() => {

                }).then();
        }).catch(() => {})
    }).catch(() => {

    });
//