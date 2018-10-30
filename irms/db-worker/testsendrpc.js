var q = 'task';

var rabConnOPtions = require('./config/rabitmqConnConfig.js');

var open = require('amqplib').connect(rabConnOPtions);

open.then(function (conn) {
    return conn.createConfirmChannel().then(function (ch) {
        // ch.prefetch(1);
        return ch.assertQueue('', {
            durable: false, exclusive: true, expires: 20000, autoDelete: true
        }).then((tempQueue) => {
            console.log('temp queue create')
            return ch.assertQueue(q, { durable: false }).then(function () {
                //
                var instruct = {
                    businessKey: 'irmsUserLogin',
                    businessParam: { UserCode: '1', Password: 'abcd' }
                }
                var data = JSON.stringify(instruct);
                ch.sendToQueue(q, Buffer.from(data), { replyTo: tempQueue.queue }, function (err, ok) {
                    if (err !== null) {
                        console.warn('Message nacked!');
                        //尝试三次，如果还是失败，就返回不在尝试 关闭当前的ch
                        //多做log分析
                    }
                    else {
                        console.log('send ok  Message acked');
                        var consumed;
                        ch.consume(tempQueue.queue, function (msg) {
                            console.log(' ======= %s', msg.content.toString());
                            console.log(JSON.parse(msg.content.toString()))
                            consumed = true;
                            ch.close();
                        }, { noAck: true });
                        //
                        setTimeout(function () {
                            if (!consumed) {
                                ch.close().then(() => {
                                    console.log('no data back to rpc queue in limit time')
                                }).catch((error) => {
                                    console.log(error)
                                });
                            }                           
                        }, 180000);//如果一致都没有返回的消息，这里是最大的等待时间,三分钟后删掉
                    }
                });
            });
        });


    }).then(function () {
        console.log('over')
        ///conn.close();
    });

}).catch(error => {
    console.log('123')
    console.log(error)
});