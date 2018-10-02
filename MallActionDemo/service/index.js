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
let userRouter = require('./appApi/user.js')
    //load sub router
let router = new Router();
router.use('/user', userRouter.routes());
//load router mid soft
app.use(router.routes());
app.use(router.allowedMethods())
    //egg.js koa router complex set
    //
;
// (async() => {
//     await connect();
//     initSchemas();
//     const User = mongoose.model('User');
//     let oneUser = new User({ userName: 'zhi02', password: '123' });
//     oneUser.save().then(() => {
//         console.log('insert user ok')
//     })
//     let user = await User.findOne({}).exec();
//     console.log('------')
//     console.log(user)
// })();
app.use(async(ctx) => {
    ctx.body = '<h1>hellow</h1></h1>';
})
app.listen(3000);
console.log('listen ok')