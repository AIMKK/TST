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
DBHelper.setConnConfig = setConnConfig;

function setConnConfig(config) {
    connConfig = config;
}
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

DBHelper.executeNonQuery = executeNonQuery;
//用来执行Insert、Update、Delete和其他没有返回结果集的SQL语句
//还要考虑事务怎么处理
//还要写log日志，并且往外发出去
function executeNonQuery(cmd, cmdType, sqlParas, transaction) {

    sqlDB.connect(connConfig).then(pool => {
        var request = pool.request();
        //
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
            return request.execute(cmd).then(result => {
                pool.close();
                console.dir(result)
            });
        } else {
            return request.query(cmd).then(result => {
                pool.close();
                console.dir(result)
            });;
        }

    }).catch(err => {
        // ... error checks
        console.log(err)
        sqlDB.close();
    })

    sqlDB.on('error', err => {
        // ... error handler
        console.log(err)
        sqlDB.close();
    })
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