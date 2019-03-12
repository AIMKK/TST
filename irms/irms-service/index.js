const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const koaCors = require('koa2-cors')
const Router = require('koa-router');
const static = require('koa-static');
const staticPath = '../irms-web/dist/'; //'./static/dist/';//
const log4jsConfig=require('./log4js-config.js');
const log4js = require('log4js');
//
log4js.configure(log4jsConfig);
// 
let tiplogger = log4js.getLogger('console');
if (process.env.NODE_ENV === 'production') {
    tiplogger = log4js.getLogger(); 
} else {
    tiplogger = log4js.getLogger('console'); 
}
//
const app = new Koa();
app.use(bodyParser()).use(koaCors());
app.use(static(path.join(__dirname, staticPath)));

//=====subrooter require
// let userRouter = require('./user/user-service.js');
let irmsAPIRouter = require('./irms-api/irms-api.js');
//
const rootRouter = new Router({
    prefix: ''
});
//==subrooter register
// rootRouter.use('/userAPI', userRouter.routes(), userRouter.allowedMethods());

rootRouter.use('/irmsAPI', irmsAPIRouter.routes(), irmsAPIRouter.allowedMethods());
//
app.use(rootRouter.routes()).use(rootRouter.allowedMethods()).use(bodyParser());
//
app.listen(3000);
tiplogger.info('irms service api start at 3000');

