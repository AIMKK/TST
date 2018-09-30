const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const static = require('koa-static');

const staticPath = './static';
//
const app = new Koa();
const router = new Router({
    prefix: ''
});

const home = new Router();
home.get('/hello', async(ctx) => {
    ctx.body = ctx.query;
}).get('/todo', async(ctx) => {
    ctx.body = ctx.query;
})
const page = new Router();
page.get('/hello', async(ctx) => {
    ctx.body = 'page hello'
}).get('/todo', async(ctx) => {
    ctx.body = 'page todo'
})

//
router.use('/home', home.routes(), home.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());
//
app.use(static(path.join(__dirname, staticPath)));
//
app.use(router.routes())
    .use(router.allowedMethods()).use(bodyParser());

app.listen(3000);
console.log('server start at 3000')