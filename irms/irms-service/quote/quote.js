const Router = require('koa-router');
const mqMiddle = require('../mq-middle.js');
// 
const queue = 'task';
const taskQueueOption = { durable: false };
const maxWaitMillisecond=180000;
//
let router = new Router();
//
router.post('/getProductInfoForQuote', async (ctx) => {
    let reqBody = ctx.request.body;
    console.log(reqBody)
    let skuno = reqBody.skuno;

    var instruct = {
        bussinessKey: 'irmsGetProdInfoForQuote',
        bussinessParam: { SkuNo: skuno }
    }   
    await mqMiddle.RemoteCall(queue, taskQueueOption, instruct,maxWaitMillisecond).then((data) => {
        return ctx.body = data;        
    }).catch(error => {
        return ctx.body = {
            code: 500,
            message: error
        };
    });    
});

//quoteSave
router.post('/atQuoteSave', async (ctx) => {
    let reqBody = ctx.request.body;
    console.log(reqBody)
    let workshopOrderMaster = reqBody.workshopOrderMaster;   
    let  workShopOrderDetail= reqBody.workShopOrderDetail;
    var instruct = {
        bussinessKey: 'irmsATQuoteSave',
        bussinessParam: { workshopOrderMaster ,workShopOrderDetail}
    }   
    await mqMiddle.RemoteCall(queue, taskQueueOption, instruct,maxWaitMillisecond).then((data) => {
        return ctx.body = data;        
    }).catch(error => {
        return ctx.body = {
            code: 500,
            message: error
        };
    });    
});
//
module.exports = router;