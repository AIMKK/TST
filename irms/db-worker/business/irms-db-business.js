const irmsDB = require('../cmd/irms-db-cmd.js');
const oldIrmsDB = require('../cmd/old-irms-db-cmd.js');
const contactCustomerDB = require('../cmd/contact-customer-db-cmd.js');
const localTestDB = require('../cmd/local-test-cmd.js');
//

module.exports = {
    irmsNewVipQuickJoin,
    irmsAtestTableDataAdd,
    irmsGetProdInfoForQuote,
    irmsUserLogin,
    irmsGetFunctionID,
};
var resultMsg = {
    successed: false,
    msg: ''
};
//
function irmsNewVipQuickJoin(newVipQuickJoinParam) {
    //首先215成功，再次 216成功，再次 223 成功
    //把成功或者不成功的数据要返回
    var oldIrmsconnPool = localTestDB.createDBConnPool(); //===============oldIrmsDB  
    //
    return oldIrmsconnPool.then(pool => {
        var trans = pool.transaction();
        //oldIrmsDB.createNewVipQuickJoinCmd(trans);createGetVIPPointsCmd//createGetMaxUserCodeCmd
        var cmd = localTestDB.createGetMaxUserCodeCmd(trans); //===============oldIrmsDB
        if (!cmd) {
            resultMsg.successed = false;
            resultMsg.msg = 'can not create cmd';
            return resultMsg;
        }
        //
        return trans.begin().then(() => {
            return cmd(newVipQuickJoinParam);
        }).then(result => {
            console.log("||||||||||||||....");
            return trans.commit().then((error) => {
                if (error) {
                    console.log(error)
                    return error;
                }
                console.log("result is ...."); //获取到vip加入到216里面
                console.dir(result); //获取到vip加入到216里面
                console.log("max code is " + result.output.maxUserCode)
                resultMsg.successed = true;
                resultMsg.msg = '215 create vip ok!!';
                return resultMsg;
            })

        }).catch((error) => {
            console.log("xxxxxxxxxxxx....");
            return trans.rollback().then(err => {
                if (err) {
                    console.log('rollback error:' + err);
                    return err;
                }
                console.log("-------------....");
                console.log(error);
                resultMsg.successed = false;
                resultMsg.msg = '215 create vip failed';
                return resultMsg;
            })
        })
    }).catch(error => {
        console.log("xxxxxxxxxxxx222....");
        console.log(error)
        resultMsg.successed = false;
        resultMsg.msg = error;
        return resultMsg
    })


};

function execCmd(cmd, cmdParam) {
    var resultMsg = {
        successed: false,
        msg: ''
    };
    if (!cmd) {
        resultMsg.successed = false;
        resultMsg.msg = 'cmd not vaild';
        return resultMsg;
    }
    //
    resultMsg.successed = false;
    return cmd(cmdParam).then(result => {
        resultMsg.successed = true;
        resultMsg.msg = result;
        return resultMsg;

    }).catch((error) => {
        resultMsg.successed = false;
        resultMsg.msg = error;
        return resultMsg;
    })
}

function irmsAtestTableDataAdd() {
    //首先 216成功，再次 本地
    //把成功或者不成功的数据要返回
    var oldIrmsconnPool = irmsDB.createDBConnPool();
    //
    return oldIrmsconnPool.then(pool => {
        var trans = pool.transaction();
        var cmdInsert = irmsDB.createATestTableInsertCmd(trans);
        return trans.begin().then(() => {
            return cmdInsert(0); //这里只有一个要处理的
        }).then(result => {
            console.log('1')
            return trans.commit().then((error) => {
                if (error) {
                    console.log(error)
                    resultMsg.successed = false;
                    resultMsg.msg = error;
                    return resultMsg;
                }
                resultMsg.successed = true;
                resultMsg.msg = result;
                return resultMsg;
            })
        }).catch((error) => {
            console.log('2')
            resultMsg.successed = false;
            return trans.rollback().then(err => {
                if (err) {
                    console.log('rollback error:' + err);
                    resultMsg.msg = error + err;
                    return resultMsg;
                }
                resultMsg.msg = error;
                return resultMsg;
            })
        }).then(result => {
            //这里要判断是否成功，如果成功就继续，不成功，就不做任何事情
            if (result && result.successed) {
                var id = result.msg.output.ID;
                var cmdSelect = irmsDB.createATestTableSelectCmd(pool);
                //
                return execCmd(cmdSelect, id).then(result => {
                    if (result && result.successed) {
                        resultMsg.successed = true;
                        resultMsg.msg = result.msg.recordset[0]
                        return resultMsg;
                    } else {
                        resultMsg.successed = false;
                        resultMsg.msg = result.msg;
                        return resultMsg;
                    }
                });
            } else {
                resultMsg.successed = false;
                resultMsg.msg = result.msg;
                return resultMsg;
            }
        });
    }).then(result => { //local db de 处理
        if (result == null || !resultMsg.successed) {
            resultMsg.successed = false;
            resultMsg.msg = "first failed";
            return resultMsg;
        }
        var localconnPool = localTestDB.createDBConnPool();
        return localconnPool.then(pool => {
            var trans = pool.transaction();
            var cmdupdate = localTestDB.createATestTableUpdateCmd(trans);
            var param = resultMsg.msg;
            //
            return trans.begin().then(() => {
                return cmdupdate(param); //这里只有一个要处理的
            }).then(result => {
                console.log('3')
                return trans.commit().then((error) => {
                    if (error) {
                        console.log(error)
                        resultMsg.successed = false;
                        resultMsg.msg = error;
                        return resultMsg;
                    }
                    resultMsg.successed = true;
                    resultMsg.msg = 'both ok';
                    return resultMsg;
                }).then(result => {
                    if (result && result.successed) {
                        resultMsg.successed = true;
                        resultMsg.msg = "111both ok";
                    } else {
                        resultMsg.successed = false;
                        resultMsg.msg = "local failed";
                    }
                    return resultMsg
                })
            }).catch((error) => {
                console.log('4')
                resultMsg.successed = false;
                return trans.rollback().then(err => {
                    if (err) {
                        console.log('rollback error:' + err);
                        resultMsg.msg = error + err;
                        return resultMsg;
                    }
                    resultMsg.msg = error;
                    return resultMsg;
                })
            });

        })
    }).catch(error => {
        resultMsg.successed = false;
        resultMsg.msg = error;
        return resultMsg
    });
};

function irmsGetProdInfoForQuote(prodInfoForQuoteParam) {
    var irmsConn = irmsDB.createDBConnPool();
    //
    return irmsConn.then(pool => {
        var quoteCmd = irmsDB.createGetProdInfoForQuoteCmd(pool);
        return quoteCmd(prodInfoForQuoteParam).then(result => {
            var ProdInfo = "";
            try {
                //这个地方返回的是两个集合               
                if (result && result.recordsets) {
                    if (result.recordsets.length > 0) {
                        ProdInfo = result.recordsets;
                    }
                }
            } catch (error) {
                ProdInfo = "";
            }
            return ProdInfo;

        }).catch((error) => {
            //记录日志
            console.log('命令执行不正确--')
            console.log(error);
            console.log('---------------')
            return '命令执行不正确';
        })
    }).catch(error => {
        //记录日志
        console.log('貌似连接不给力--')
        console.log(error)
        console.log('---------------')
        return '貌似连接不给力！';
    });
};

/*
*irmsUserLogin
*/
function irmsUserLogin(userLoginParam) {
    var irmsConn = irmsDB.createDBConnPool();
    //
    return irmsConn.then(pool => {
        var loginCmd = irmsDB.createUserLoginCmd(pool);
        return loginCmd(userLoginParam).then(result => {
            //根据具体的业务来确定，怎么处理result的值直接返回还是包装一次
            //如果用户名密码正确，那么，recordset 就会有值,获取第一个值即可
            var user = "";
            try {
                /*
                { recordsets: [ [] ],
                  recordset: [],
                  output: {},
                  rowsAffected: [],
                  returnValue: 0 }
                */
                if (result && result.recordset) {
                    if (result.recordset.length > 0) {
                        user = result.recordset[0];
                    }
                }
            } catch (error) {
                user = "";
            }
            return user;
        })
    })
};

/*
*irmsGetFunctionID
*/
function irmsGetFunctionID(getFunctionIDParam) {
    var irmsConn = irmsDB.createDBConnPool();
    return irmsConn.then(pool => {
        var command = irmsDB.createGetFunctionIDCmd(pool);
        return command(getFunctionIDParam).then(result => {
            var functionList = "";
            try {
                if (result && result.recordsets) {
                    if (result.recordsets.length > 0) {
                        functionList = result.recordsets;
                    }
                }
            } catch (error) {
                functionList = "";
            }
            return functionList;
        })
    });
};