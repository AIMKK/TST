const msDB = require('mssql');
const { localdbtestconfig } = require('../config/db-conn-config.js');

var dbconnPool;
//test
module.exports = {
    createNewVipQuickJoinCmd,
    createGetMaxUserCodeCmd,
    createATestTableInsertCmd,
    createATestTableSelectCmd,
    createATestTableUpdateCmd,
    createMultiReturnSetCmd,
    createDBConnPool
}

function createDBConnPool() {
    if (dbconnPool) {
        return dbconnPool;
    }
    dbconnPool = new msDB.ConnectionPool(localdbtestconfig).connect();
    return dbconnPool;
};

//create request command
function createNewVipQuickJoinCmd(iniReqParam /* [pool or transaction] */ ) {

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

    //
    var getMaxUserCode = function(userCodeParam) {
        var request = new msDB.Request(iniReqParam);
        request.output('@maxUserCode', msDB.VarChar(10), '');
        return request.execute('getMaxUserCode');
    };
    //
    return getMaxUserCode;
}




//create request command
function createATestTableInsertCmd(iniReqParam /* [pool or transaction] */ ) {

    //用最少信息创建一个会员
    var ATestTableInsert = function(id) {
        var request = new msDB.Request(iniReqParam);
        request.output('ID', msDB.Int, id);
        return request.execute('ATestTableInsert');
    };


    return ATestTableInsert;
}


//create request command
function createATestTableSelectCmd(iniReqParam /* [pool or transaction] */ ) {

    //用最少信息创建一个会员
    var ATestTableSelect = function(id) {
        var request = new msDB.Request(iniReqParam);
        request.input('ID', msDB.Int, id);
        return request.execute('ATestTableSelect');
    };


    return ATestTableSelect;
}


//create request command
function createATestTableUpdateCmd(iniReqParam /* [pool or transaction] */ ) {

    //用最少信息创建一个会员
    var ATestTableUpdate = function(AtestTableData) {
        var request = new msDB.Request(iniReqParam);
        request.input('ID', msDB.Int, AtestTableData.ID);
        request.input('Name', msDB.NVarChar(100), AtestTableData.Name);
        request.input('City', msDB.NVarChar(100), AtestTableData.City);
        return request.execute('ATestTableupdate');
    };

    return ATestTableUpdate;
}


//create request command
function createMultiReturnSetCmd(iniReqParam /* [pool or transaction] */ ) {

    var multiReturnSet = function(id) {
        var request = new msDB.Request(iniReqParam);
        return request.execute('getMultiReturnSetTest');
    };

    return multiReturnSet;
}