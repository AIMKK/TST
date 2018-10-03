const Koa = require('koa');
const app = new Koa();
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const koaCors = require('koa2-cors')
const Router = require('koa-router');
//
app.use(bodyParser()).use(koaCors());
//
let userRouter = require('./appApi/user.js');
let goodsRouter = require('./appApi/goods.js');
let categoryRouter = require('./appApi/category.js');
let categorySubRouter = require('./appApi/categorySub.js');
//load sub router
let router = new Router();
router.use('/user', userRouter.routes());
router.use('/goods', goodsRouter.routes());
router.use('/category', categoryRouter.routes());
router.use('/categorySub', categorySubRouter.routes());
//load router mid soft
app.use(router.routes());
app.use(router.allowedMethods())
    //egg.js koa router complex set
    //
;
(async() => {
    await connect();
    initSchemas();

})();
app.use(async(ctx) => {
    ctx.body = '<h1>hellow</h1></h1>';
})
app.listen(3000);
console.log('listen ok')