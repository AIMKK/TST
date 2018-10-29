const Router = require('koa-router');

const rabConnOPtions = require('../config/rabitmqConnConfig.js');
//
const rabConnP = require('amqplib').connect(rabConnOPtions);
// 
const queue = 'task'

//
let router = new Router();
//
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

//
router.post('/login', async (ctx) => {
    let user = ctx.request.body;
    console.log(loginUser);
    let userCode = user.userCode;
    let password = user.password;
    //
    await rabConnP.then(function(conn) {
        return conn.createChannel().then(function(ch) {
            ch.prefetch(1);
            return ch.assertQueue(q, { durable: false }).then(function() {
                //
                var instruct = {
                    businessKey: 'irmsUserLogin',
                    businessParam: {UserCode:'1',Password:'abcd'}
                }
                var data = JSON.stringify(instruct);
                ch.sendToQueue(q, Buffer.from(data));
                console.log('sned ok');
            });
    
        }).then(function() {
            console.log('over')
                ///conn.close();
        });
    
    }).catch(error=>{
        console.log('123')
        console.log(error)
    });


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