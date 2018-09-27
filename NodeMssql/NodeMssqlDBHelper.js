const sqlDB = require('mssql');
//连接配置
var connConfig;

var DBHelper = {};
module.exports = DBHelper;
//
DBHelper.paramDirection = {
    //输入参数
    Input: "input",
    //输出参数
    Output: "output"
};
DBHelper.commandType = {
    Proc: 'Procedure',
    Sql: 'Sql'
};

//
DBHelper.sqlDB = sqlDB;
//
DBHelper.createSqlParam = createSqlParam;

function createSqlParam(paramName, paramValue, sqlType, direction) {
    var param = {};
    param.paramName = paramName;
    param.paramValue = paramValue;
    param.outPutValue = null;
    param.sqlType = sqlType;
    param.direction = direction;
    return param;
}

//用来执行Insert、Update、Delete和其他没有返回结果集的SQL语句
//还要考虑事务怎么处理
//还要写log日志，并且往外发出去

DBHelper.getDBConnPool = getDBConnPool;

function getDBConnPool(config) {
    var dbConnPool = sqlDB.connect(config);
    return dbConnPool;
}

DBHelper.createDBRequest = createDBRequest;

function createDBRequest(param /* [pool or transaction] */ ) {
    var request = new sqlDB.Request(param); //param.request();

    function dbRequest(cmd, cmdType, sqlParas) {
        if (sqlParas != null) {
            for (var index in sqlParas) {
                if (sqlParas[index].direction == DBHelper.paramDirection.Output) {
                    request.output(sqlParas[index].paramName, sqlParas[index].sqlType, sqlParas[index].paramValue);
                } else {
                    request.input(sqlParas[index].paramName, sqlParas[index].sqlType, sqlParas[index].paramValue);
                }
            }
        }
        //
        if (DBHelper.commandType.Proc == cmdType) {
            return request.execute(cmd);
        } else {
            return request.query(cmd);
        }
    }
    return dbRequest;
}

function dealResult(result) {
    console.dir(result)
        // if (sqlParas != null) {
        //     for (var index in sqlParas) {
        //         if (sqlParas[index].direction == paramDirection.Output) {
        //             sqlParas[index].outPutValue = result.parameters[index].value;
        //         }
        //     }
        //}
}