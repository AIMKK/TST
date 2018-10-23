const msDB = require('mssql');
const { irmsConnConfig } = require('../config/db-conn-config.js');

var dbconnPool;
//216
module.exports = {
    createNewVipQuickJoinCmd,
    createGetVIPPointsCmd,
    createATestTableInsertCmd,
    createATestTableSelectCmd,
    createATestTableUpdateCmd,
    createDBConnPool
}

function createDBConnPool() {
    if (dbconnPool) {
        return dbconnPool;
    }
    dbconnPool = new msDB.ConnectionPool(irmsConnConfig).connect(); //msDB.connect(irmsConnConfig);
    return dbconnPool;
};
//
//create request command
function createNewVipQuickJoinCmd(iniReqParam /* [pool or transaction] */ ) {

    //用最少信息创建一个会员
    var newVipQuickJoin = function(newVipQuickJoinParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('CompanyCode', msDB.VarChar, newVipQuickJoinParam.CompanyCode);
        request.input('VIPCode', msDB.VarChar, newVipQuickJoinParam.VIPCode);
        request.input('LocationCode', msDB.VarChar, newVipQuickJoinParam.LocationCode);
        request.input('ChineseName', msDB.NVarChar, newVipQuickJoinParam.ChineseName);
        request.input('EnglishName', msDB.NVarChar, newVipQuickJoinParam.EnglishName);
        request.input('MobilePhone', msDB.VarChar, newVipQuickJoinParam.MobilePhone);
        request.input('LastUpdate', msDB.VarChar, newVipQuickJoinParam.LastUpdateUser);
        request.input('IsTravelVip', msDB.Bit, newVipQuickJoinParam.IsTravelVip);
        request.input('AgentBuy', msDB.VarChar, newVipQuickJoinParam.AgentBuy);
        return request.execute('SP_newVipQuickJoin_Set');
    };


    return newVipQuickJoin;
}

//create request command
function createGetVIPPointsCmd(iniReqParam /* [pool or transaction] */ ) {

    //用最少信息创建一个会员
    var getVIPPoints = function(getVIPPointsParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('VIPCode', msDB.VarChar, getVIPPointsParam.VIPCode);
        return request.execute('SP_VIPPoints_Get');
    };


    return getVIPPoints;
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