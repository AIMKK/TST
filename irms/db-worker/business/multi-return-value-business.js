const localTestDB = require('../cmd/local-test-cmd.js');
module.exports = multiReturnValueTest;
//
var resultMsg = {
    successed: false,
    msg: ''
};
//
function multiReturnValueTest() {
    var localconn = localTestDB.createDBConnPool();
    //
    return localconn.then(pool => {
        var cmdTest = localTestDB.createMultiReturnSetCmd(pool);
        return cmdTest().then(result => {
            console.log("multi value....");
            resultMsg.successed = true;
            resultMsg.msg = result;
            return resultMsg;

        }).catch((error) => {
            console.log(error);
            resultMsg.successed = false;
            resultMsg.msg = error;
            return resultMsg;
        })
    }).catch(error => {
        console.log(error)
        resultMsg.successed = false;
        resultMsg.msg = error;
        return resultMsg
    });
};