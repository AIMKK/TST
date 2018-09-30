const Koa = require('koa');
const path = require('path');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const static = require('koa-static');

var rabConnOPtions = require('../rabitmqConnConfig.js');
//
var rabConnP = require('amqplib').connect(rabConnOPtions);
// 
const queue = 'task'

const staticPath = './static';
//
const app = new Koa();
const router = new Router({
    prefix: ''
});

const irms = new Router();
irms.get('/hello', async(ctx) => {
    //
    rabConnP.then((rabconn) => {
        return rabconn.createChannel();
    }).then((ch) => {
        ch.prefetch(1);
        ch.assertQueue(queue, { durable: false })
            .then(() => {
                ch.sendToQueue(queue, Buffer.from('something to do'));
                ctx.body = 'sned ok';
                console.log('sned ok');
            })
            .then(function() {
                console.log('[*] Waiting for message. To exit press CRTL+C');
            });
    })

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
router.use('/irms', irms.routes(), irms.allowedMethods());
router.use('/page', page.routes(), page.allowedMethods());
//
app.use(static(path.join(__dirname, staticPath)));
//
app.use(router.routes())
    .use(router.allowedMethods()).use(bodyParser());

app.listen(3000);
console.log('server start at 3000')