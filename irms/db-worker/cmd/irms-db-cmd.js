const msDB = require('mssql');
const { irmsConnConfig } = require('../config/db-conn-config.js');

var dbconnPool;
//216
module.exports = {
    createNewVipQuickJoinCmd,
    createDBConnPool
}

function createDBConnPool() {
    if (dbconnPool) {
        return dbconnPool;
    }
    dbconnPool = msDB.connect(irmsConnConfig);
    return dbconnPool;
};
//
//create request command
function createNewVipQuickJoinCmd(iniReqParam /* [pool or transaction] */ ) {

    if (!iniReqParam) {
        return null;
    }

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