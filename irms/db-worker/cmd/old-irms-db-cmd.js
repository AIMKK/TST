const msDB = require('mssql');
const { oldIrmsConnConfig } = require('../config/db-conn-config.js');

var dbconnPool;
//215
module.exports = {
    createNewVipQuickJoinCmd,
    createDBConnPool
}

function createDBConnPool() {
    if (dbconnPool) {
        return dbconnPool;
    }
    dbconnPool = msDB.connect(oldIrmsConnConfig);

    return dbconnPool;
};
//create request command
function createNewVipQuickJoinCmd(iniReqParam /* [pool or transaction] */ ) {

    if (!iniReqParam) {
        return null;
    }

    //用最少信息创建一个会员
    var newVipQuickJoin = function(newVipQuickJoinParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('CompanyCode', msDB.VarChar, newVipQuickJoinParam.CompanyCode);
        request.output('VIPCode', msDB.VarChar, newVipQuickJoinParam.VIPCode);
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
function createGtNewVipCodeCmd(iniReqParam /* [pool or transaction] */ ) {
    if (!iniReqParam) {
        return null;
    }
    //
    var getNewVipCode = function(getNewVipCodeParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('companyCode', msDB.VarChar, getNewVipCodeParam.companyCode);
        request.input('locationCode', msDB.VarChar, getNewVipCodeParam.locationCode);
        return request.execute('Sp_NewIRMS_NewVipCode_get');
    };

    return getNewVipCode;
}