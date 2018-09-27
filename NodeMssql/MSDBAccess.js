const sqlDB = require('mssql');
module.exports = {
    getDBConnPool,
    getDBCommand
};

function getDBConnPool(config) {
    var dbConnPool = sqlDB.connect(config);
    return dbConnPool;
}

function getDBCommand(param /* [pool or transaction] */ ) {
    var command = {};
    var request = new sqlDB.Request(param); //param.request();
    if (request == null) return null;
    command.UserInfoGet = function(UserCode) {
        var sql = 'select * from Users where UserCode = @UserCode';
        request.input('UserCode', sqlDB.VarChar, UserCode);
        return request.query(sql);
    }
    return command;
}