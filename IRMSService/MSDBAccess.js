const sqlDB = require('mssql');
module.exports = {
    getDBConnPool,
    getDBCommand,
    createCmdParam
};

function getDBConnPool(config) {
    var dbConnPool = sqlDB.connect(config);
    return dbConnPool;
}

function createCmdParam(paramName, paramValue) {
    var param = {};
    param.paramName = paramName;
    param.paramValue = paramValue;
    return param;
}

function getCmdParamValue(cmdParams, paramKey) {
    var paramValue;
    if (cmdParams != null) {
        for (var index in cmdParams) {
            if (paramValue[index].paramName === paramKey) {
                paramValue = cmdParams[index].paramValue;
                break;
            }
        }
    }
    return paramValue;
}

function getDBCommand(param /* [pool or transaction] */ ) {
    var command = {};
    // var request = new sqlDB.Request(param); //param.request();
    // if (request == null) return null;
    //
    command.userInfoGet = function userInfoGet(userInfoGetParam) {
        var sql = 'select * from Users where UserCode = @UserCode';
        var request = new sqlDB.Request(param);
        if (request == null) return null;
        request.input('UserCode', sqlDB.VarChar, userInfoGetParam.UserCode);
        return request.query(sql);
    }

    command.InsertMsg = function insertMsg(insertMsgParam) {
        var request = new sqlDB.Request(param);
        request.input('Msg', sqlDB.NVarChar, insertMsgParam.Msg);
        request.input('CreateDate', sqlDB.DateTime, insertMsgParam.CreateDate);
        return request.execute('InsertMsg');
    }

    //
    return command;
}