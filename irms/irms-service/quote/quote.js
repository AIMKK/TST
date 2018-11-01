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

    let skuno = reqBody.skuno;

    var instruct = {
        businessKey: 'irmsGetProdInfoForQuote',
        businessParam: { SkuNo: skuno }
    }
    await mqMiddle.TXRX(queue, taskQueueOption, instruct,maxWaitMillisecond).then((data) => {
        return ctx.body = {
            code: 200,
            message: data
        };
    }).catch(error => {
        return ctx.body = {
            code: 500,
            message: error
        };
    });    
});

module.exports = router;