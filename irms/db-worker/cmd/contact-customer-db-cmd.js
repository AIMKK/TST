const msDB = require('mssql');
const { contactCustomerConnConfig } = require('../config/db-conn-config.js');
var dbconnPool;
//223
module.exports = {
    createCustomerContactUpdateCmd,
    createTestsqlCmd,
    createDBConnPool
}

function createDBConnPool() {
    if (dbconnPool) {
        return dbconnPool;
    }
    dbconnPool = new msDB.ConnectionPool(contactCustomerConnConfig).connect(); //msDB.connect(contactCustomerConnConfig);
    return dbconnPool;
};

//create request command
function createCustomerContactUpdateCmd(iniReqParam /* [pool or transaction] */ ) {

    //customerContactUpdate
    var customerContactUpdate = function(customerContactUpdateParam) {
        var request = new msDB.Request(iniReqParam);
        request.input('VIPCode', msDB.VarChar(20), customerContactUpdateParam.VIPCode);
        request.input('CompanyCode', msDB.VarChar(20), customerContactUpdateParam.CompanyCode);
        request.input('EnglishName', msDB.NVarChar(50), customerContactUpdateParam.EnglishName);
        request.input('ChineseName', msDB.NVarChar(50), customerContactUpdateParam.ChineseName);
        request.input('Email', msDB.VarChar(100), customerContactUpdateParam.Email);
        request.input('PhoneNo', msDB.VarChar(50), customerContactUpdateParam.PhoneNo);
        request.input('Address', msDB.NVarChar(200), customerContactUpdateParam.Address);
        request.input('Country', msDB.NVarChar(50), customerContactUpdateParam.Country);
        request.input('Remarks', msDB.NVarChar(500), customerContactUpdateParam.Remarks);
        request.input('UserCode', msDB.VarChar(10), customerContactUpdateParam.UserCode);
        return request.execute('CustomerContact_Update');
    };
    //
    return customerContactUpdate;
}


//create request command
function createTestsqlCmd(iniReqParam /* [pool or transaction] */ ) {


    //customerContactUpdate
    var testsql = function(customerContactUpdateParam) {
        var request = new msDB.Request(iniReqParam);
        return request.query('select top 1 * from CustomerContact');
    };
    //
    return testsql;
}