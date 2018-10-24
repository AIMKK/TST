const irmsDB = require('../cmd/irms-db-cmd.js');
const oldIrmsDB = require('../cmd/old-irms-db-cmd.js');
const contactCustomerDB = require('../cmd/contact-customer-db-cmd.js');
const localTestDB = require('../cmd/local-test-cmd.js');
//

module.exports = {
    irmsNewVipQuickJoin,
    irmsAtestTableDataAdd,
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