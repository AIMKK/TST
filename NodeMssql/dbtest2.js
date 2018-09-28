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

//
var dbconnPool = dbAccess.getDBConnPool(config);
dbconnPool.then(pool => {
    var trans = pool.transaction();
    var dbCommand = dbAccess.getDBCommand(trans);
    trans.begin()
        .then(() => {
            userInfoGetParam = {}
            userInfoGetParam.UserCode = '0000001';
            return dbCommand.userInfoGet(userInfoGetParam)
                .then((result) => {
                    console.dir(result);
                    insertMsgParam = {}
                    insertMsgParam.Msg = 'some thing to do'
                    insertMsgParam.CreateDate = new Date();
                    return dbCommand.InsertMsg(insertMsgParam)
                })
        }).then(() => {
            trans.commit(err => {
                // ... errorchecks 
            })
        }).catch((error) => {
            console.log(error);
            trans.rollback(err => {
                // ... error checks
            })
        })
}).catch((error) => {
    console.log(error);
});
//

// var dbconnPool2 = dbAccess.getDBConnPool(config);
// dbconnPool2.then(pool => {
//     var dbCommand = dbAccess.getDBCommand(pool);
//     userInfoGetParam = {}
//     userInfoGetParam.UserCode = '0000001';
//     dbCommand.userInfoGet(userInfoGetParam)
//         .then((result) => {
//             console.dir(result);
//             insertMsgParam = {}
//             insertMsgParam.Msg = 'some thing to do'
//             insertMsgParam.CreateDate = new Date();
//             return dbCommand.InsertMsg(insertMsgParam)
//         })
// }).catch((error) => {
//     console.log(error);
// });
// //