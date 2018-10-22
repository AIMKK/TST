const irmsDB = require('../cmd/irms-db-cmd.js');
const oldIrmsDB = require('../cmd/old-irms-db-cmd.js');
const contactCustomerDB = require('../cmd/contact-customer-db-cmd.js');
const localTestDB = require('../cmd/local-test-cmd.js');
//

module.exports = {
    irmsNewVipQuickJoin,
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
            //oldIrmsDB.createNewVipQuickJoinCmd(trans);
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
                trans.rollback().then(err => {
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
        // .then((result) => {
        //     if (!result || !result.isSuccessed) {
        //         resultMsg.isSuccessed = false;
        //         resultMsg.msg = '216 create vip failed';
        //         return resultMsg;
        //     } else {
        //         var irmsconnPool = irmsDB.createDBConnPool();
        //         if (!irmsconnPool) {
        //             resultMsg.isSuccessed = false;
        //             resultMsg.msg = 'can not create irms db connection';
        //             return resultMsg;
        //         }
        //         //216 save
        //         return irmsconnPool.then(pool => {
        //             var trans = pool.transaction();
        //             var cmd = irmsDB.createDBCommands(trans);
        //             return trans.begin().then(() => {
        //                 return cmd.newVipQuickJoin(newVipQuickJoinParam);
        //             }).then(result => {
        //                 trans.commit(err => {
        //                     console.log('commit error:' + err);
        //                 })
        //                 console.dir(result); //获取到vip加入到216里面
        //                 resultMsg.isSuccessed = true;
        //                 resultMsg.msg = '216 create vip ok!!';
        //                 return resultMsg;
        //             }).catch(() => {
        //                 trans.rollback(err => {
        //                     console.log('rollback error:' + err);
        //                 })
        //                 console.log(error);
        //                 resultMsg.isSuccessed = false;
        //                 resultMsg.msg = '216 create vip failed';
        //                 return resultMsg;
        //             })
        //         })
        //     }
        // }).then((result => {
        //     if (!result || !result.isSuccessed) {
        //         resultMsg.isSuccessed = false;
        //         resultMsg.msg = '216 create vip failed';
        //         return resultMsg;
        //     } else {

    //     }
    // }));

};