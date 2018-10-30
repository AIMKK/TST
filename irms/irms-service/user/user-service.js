const Router = require('koa-router');
const mqMiddle = require('../mq-middle.js');
// 
const queue = 'task';
const taskQueueOption = { durable: false };
const maxWaitMillisecond=180000;
//
let router = new Router();
//
router.post('/login', async (ctx) => {
    let user = ctx.request.body;
    console.log(user);
    let userCode = user.userCode;
    let password = user.password;
    //
    var instruct = {
        businessKey: 'irmsUserLogin',
        businessParam: { UserCode: userCode, Password: password }
    }
    await mqMiddle.rpc(queue, taskQueueOption, instruct,maxWaitMillisecond).then((data) => {
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