const msDB = require('mssql');
const { localdbtestconfig } = require('../config/db-conn-config.js');

var dbconnPool;
//test
module.exports = {
    createNewVipQuickJoinCmd,
    createGetMaxUserCodeCmd,
    createDBConnPool
}

function createDBConnPool() {
    if (dbconnPool) {
        return dbconnPool;
    }
    dbconnPool = msDB.connect(localdbtestconfig);
    return dbconnPool;
};

//create request command
function createNewVipQuickJoinCmd(iniReqParam /* [pool or transaction] */ ) {
    if (!iniReqParam) {
        return null;
    }
    //
    var newVipQuickJoin = function(userInfoGetParam) {

        var sql = 'select top 1 * from Users';
        var request = new msDB.Request(iniReqParam);
        if (request == null) return null;
        //request.input('UserCode', sqlDB.VarChar, userInfoGetParam.UserCode);
        return request.query(sql);
    };
    //
    return newVipQuickJoin;
}

//create request command
function createGetMaxUserCodeCmd(iniReqParam /* [pool or transaction] */ ) {
    if (!iniReqParam) {
        return null;
    }
    //
    var getMaxUserCode = function(userCodeParam) {
        var request = new msDB.Request(iniReqParam);
        request.output('maxUserCode', msDB.VarChar(10), '');
        return request.execute('getMaxUserCode');
    };
    //
    return getMaxUserCode;
}