var q = 'task';

var rabConnOPtions = require('./config/rabitmqConnConfig.js');

var open = require('amqplib').connect(rabConnOPtions);

open.then(function(conn) {
    return conn.createConfirmChannel().then(function(ch) {
        ch.prefetch(1);
        return ch.assertQueue(q, { durable: false }).then(function() {
            //
            var instruct = {
                businessKey: 'irmsUserLogin',
                businessParam: {UserCode:'1',Password:'abcd'}
            }
            var data = JSON.stringify(instruct);
            ch.sendToQueue(q, Buffer.from(data),{},function(err, ok) {
                if (err !== null){
                    console.warn('Message nacked!');
                    //尝试三次，如果还是失败，就返回不在尝试 关闭当前的ch
                    //多做log分析
                }                  
                else{
                    console.log(ok)
                    console.log('Message acked');
                }
                  
            });
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