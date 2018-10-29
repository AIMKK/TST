const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const static = require('koa-static');
//
const rabConnOPtions = require('../config/rabitmqConnConfig.js');
//
const rabConnP = require('amqplib').connect(rabConnOPtions);
//
const staticPath = '../irms/dist/'; //'./static/dist/';
//
const app = new Koa();
app.use(static(path.join(__dirname, staticPath)));
//=====subrooter require
let userRouter = require('./user/user-service.js');
//
const rootRouter = new Router({
    prefix: ''
});
//==subrooter register
rootRouter.use('/user', userRouter.routes(), userRouter.allowedMethods());
//
app.use(rootRouter.routes()).use(rootRouter.allowedMethods()).use(bodyParser());
//
app.listen(3000);
console.log('irms service api start at 3000');

