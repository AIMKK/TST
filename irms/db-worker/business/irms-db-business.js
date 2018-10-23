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

function execTransCmd(trans, cmd, cmdParam) {
    var resultMsg = {
        successed: false,
        msg: ''
    };
    if (!trans || !cmd) {
        resultMsg.successed = false;
        resultMsg.msg = 'trans or cmd not vaild';
        return resultMsg;
    }
    //
    resultMsg.successed = false;
    return trans.begin().then(() => {
        return cmd(cmdParam);
    }).then(result => {
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
    })
}

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
        var cmd = irmsDB.createATestTableInsertCmd(trans);
        //
        return execTransCmd(trans, cmd, 0).then(result => {
            var id = result.msg.output.ID;
            var cmdSelect = irmsDB.createATestTableSelectCmd(pool);
            //
            return execCmd(cmdSelect, id).then(result => {
                if (result && result.successed) {
                    return result.msg.recordset[0]
                }
            });
        });
    }).then(result => { //local db de 处理
        if (result == null) {
            resultMsg.successed = false;
            resultMsg.msg = "first failed";
            return resultMsg;
        }
        var localconnPool = localTestDB.createDBConnPool();
        return localconnPool.then(pool => {
            var trans = pool.transaction();
            var cmd = localTestDB.createATestTableUpdateCmd(trans);
            //
            return execTransCmd(trans, cmd, result).then(result => {
                resultMsg.successed = false;
                resultMsg.msg = "local failed";
                if (result && result.successed) {
                    resultMsg.successed = true;
                    resultMsg.msg = "both ok";
                }
                return resultMsg
            });
        })
    }).catch(error => {
        resultMsg.successed = false;
        resultMsg.msg = error;
        return resultMsg
    });
};