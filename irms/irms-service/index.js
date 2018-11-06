const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const koaCors = require('koa2-cors')
const Router = require('koa-router');
const static = require('koa-static');
const staticPath = '../irms-web/dist/'; //'./static/dist/';//
//
const app = new Koa();
app.use(bodyParser()).use(koaCors());
app.use(static(path.join(__dirname, staticPath)));

//=====subrooter require
let userRouter = require('./user/user-service.js');
let quoteRouter = require('./quote/quote.js');
//
const rootRouter = new Router({
    prefix: ''
});
//==subrooter register
rootRouter.use('/userAPI', userRouter.routes(), userRouter.allowedMethods());
rootRouter.use('/quoteAPI', quoteRouter.routes(), quoteRouter.allowedMethods());

//
app.use(rootRouter.routes()).use(rootRouter.allowedMethods()).use(bodyParser());
//
app.listen(3000);
console.log('irms service api start at 3000');

