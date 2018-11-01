const msDB = require('mssql');
const { irmsConnConfig } = require('../config/db-conn-config.js');

var dbconnPool;
//216
module.exports = {
    createDBConnPool,
    createUserLoginCmd,
    createGetProdInfoForQuoteCmd,
    //test
    createNewVipQuickJoinCmd,
    createGetVIPPointsCmd,  
    
}
//
function createDBConnPool() {
    if (dbconnPool) {
        return dbconnPool;
    }
    dbconnPool = new msDB.ConnectionPool(irmsConnConfig).connect(); ////////msDB.connect(irmsConnConfig);
    return dbconnPool;
};
//
//UserLogin
function createUserLoginCmd(iniReqParam /* [pool or transaction] */ ) {

    //UserLogin
    var userLogin = function(userLoginParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('UserCode', msDB.VarChar(10), userLoginParam.UserCode);
        request.input('Password', msDB.VarChar(100), userLoginParam.Password);
        return request.execute('SP_UserMasterLogin');
    };

    return userLogin;
}

//getprodInfoForQuote
function createGetProdInfoForQuoteCmd(iniReqParam /* [pool or transaction] */ ) {

    //getProdInfoForQuote
    var getProdInfoForQuote = function(getProdInfoForQuoteParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('SkuNo', msDB.VarChar(10), getProdInfoForQuoteParam.SkuNo);
        return request.execute('SP_ProdInfoForQuote_Get');
    };

    return getProdInfoForQuote;
}

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
