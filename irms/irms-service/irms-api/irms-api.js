const Router = require('koa-router');
const mqMiddle = require('../mq-middle.js');
// 
const queue = 'task';
const taskQueueOption = { durable: false };
const maxWaitMillisecond=180000;
//
let router = new Router();

/*
*mqMiddleRemoteCall
*/
async function mqMiddleRemoteCall(taskQueueName,taskQueueOption,currInstruct,maxWaitMillisecond,ctx){
    await mqMiddle.RemoteCall(taskQueueName, taskQueueOption, currInstruct,maxWaitMillisecond).then((data) => {
        return ctx.body = data;        
    }).catch(error => {       
        return ctx.body = {
            code: 500,
            message: error
        };
    });    
}

/*
*login
*/
router.post('/login', async (ctx) => {
    let user = ctx.request.body;
    console.log(user);
    let userCode = user.userCode;
    let password = user.password;
    //
    var instruct = {
        bussinessKey: 'irmsUserLogin',
        bussinessParam: { UserCode: userCode, Password: password }
    }
    
    // await mqMiddle.RemoteCall(queue, taskQueueOption, instruct,maxWaitMillisecond).then((data) => {
    //     return ctx.body = data;        
    // }).catch(error => {       
    //     return ctx.body = {
    //         code: 500,
    //         message: error
    //     };
    // });

    //
    await mqMiddleRemoteCall (queue, taskQueueOption, instruct,maxWaitMillisecond,ctx);
});

/*
*getFunctionID
*/
router.post('/getFunctionID', async (ctx) => {
    let user = ctx.request.body;  
    let userCode = user.userCode;
    //
    var instruct = {
        bussinessKey: 'irmsGetFunctionID',
        bussinessParam: { UserCode: userCode}
    }
    //
    await mqMiddleRemoteCall (queue, taskQueueOption, instruct,maxWaitMillisecond,ctx);
});

module.exports = router;