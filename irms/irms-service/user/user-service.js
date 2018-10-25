const Router = require('koa-router');

const rabConnOPtions = require('./config/rabitmqConnConfig.js');
//
const rabConnP = require('amqplib').connect(rabConnOPtions);
// 
const queue = 'task'

//
let router = new Router();

router.post('/updatePwd', async (ctx) => {
    const User = mongoose.model('User');
    let newUser = new User(ctx.request.body)
    await newUser.save().then(() => {
        ctx.body = {
            code: 200,
            message: 'register sucess'
        }
    }).catch((error) => {
        ctx.body = {
            code: 500,
            message: error
        }
    })
});

router.get('/hello', async (ctx) => {
    //
    await rabConnP.then((rabconn) => {
        return rabconn.createChannel();
    }).then((ch) => {
        ch.prefetch(1);
        ch.assertQueue(queue, { durable: false })
            .then(() => {
                return ch.sendToQueue(queue, Buffer.from('something to do'));

            })
            .then(function () {
                console.log('sned ok');
                //发送成功以后，还要异步等待结果，从结果队列里面获取结果，把获取的结果，返回给前端调用者
            });
    })
    ctx.body = 'sned ok';

}).get('/todo', async (ctx) => {
    ctx.body = ctx.query;
})

//
router.post('/login', async (ctx) => {
    let user = ctx.request.body;
    console.log(loginUser);
    let userCode = user.userCode;
    let password = user.password;
    // 发送命令到dbworker，等待结果，并把结果传递过去
    // await User.findOne({ userName: userName }).exec()
    // .then(async(result) => {
    //     console.log(result)
    //     if (result) {
    //         let newUser = new User();
    //         await newUser.comparePassword(password, result.password)
    //             .then((isMatch) => {
    //                 ctx.body = {
    //                     code: 200,
    //                     message: isMatch
    //                 }
    //             }).catch((error) => {
    //                 console.log(error)
    //                 ctx.body = {
    //                     code: 500,
    //                     message: error
    //                 }
    //             })
    //     } else {
    //         ctx.body = {
    //             code: 200,
    //             message: 'username not exists'
    //         }
    //     }
    // }).catch((error) => {
    //     console.log(error)
    //     ctx.body = {
    //         code: 500,
    //         message: error
    //     }
    // })
});

module.exports = router;