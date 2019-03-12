const Router = require('koa-router');
const mqMiddle = require('../mq-middle.js');
// 
const taskQueueOption = { durable: false };
const maxWaitMillisecond = 180000;

let queue = 'iRMSDevelopment';

/*
 * npm i -g cross-env
   cross-env NODE_ENV=development node index.js
   
 */
if (process.env.NODE_ENV === 'production') {
    queue = 'iRMSProduction';
} else {
    queue = 'iRMSDevelopment';
}

//
let router = new Router();

/*
*mqMiddleRemoteCall
*/
async function mqMiddleRemoteCall(taskQueueName, taskQueueOption, currInstruct, maxWaitMillisecond, ctx) {
    await mqMiddle.RemoteCall(taskQueueName, taskQueueOption, currInstruct, maxWaitMillisecond).then((data) => {
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
    await mqMiddleRemoteCall(queue, taskQueueOption, instruct, maxWaitMillisecond, ctx);
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
        bussinessParam: { UserCode: userCode }
    }
    //
    await mqMiddleRemoteCall(queue, taskQueueOption, instruct, maxWaitMillisecond, ctx);
});

/*
*getApplyInfoNeedQuote
*/
router.post('/getApplyInfoNeedQuote', async (ctx) => {
    let user = ctx.request.body;
    let userCode = user.userCode;
    //
    var instruct = {
        bussinessKey: 'irmsGetApplyInfoNeedQuote',
        bussinessParam: { UserCode: userCode }
    }
    //
    await mqMiddleRemoteCall(queue, taskQueueOption, instruct, maxWaitMillisecond, ctx);
});

/*
*getProductInfoForQuote
*/
router.post('/getProductInfoForQuote', async (ctx) => {
    let reqBody = ctx.request.body;
    let skuno = reqBody.skuno;
    //
    var instruct = {
        bussinessKey: 'irmsGetProdInfoForQuote',
        bussinessParam: { SkuNo: skuno }
    }
    await mqMiddleRemoteCall(queue, taskQueueOption, instruct, maxWaitMillisecond, ctx)
});

//quoteSave
router.post('/atQuoteSave', async (ctx) => {
    let reqBody = ctx.request.body;
    console.log(reqBody)
    let workshopOrderMaster = reqBody.workshopOrderMaster;
    let workShopOrderDetail = reqBody.workShopOrderDetail;
    var instruct = {
        bussinessKey: 'irmsATQuoteSave',
        bussinessParam: { workshopOrderMaster, workShopOrderDetail }
    }
    await mqMiddleRemoteCall(queue, taskQueueOption, instruct, maxWaitMillisecond, ctx);
});

module.exports = router;