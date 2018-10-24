const rabConnOPtions = require('./config/rabitmqConnConfig.js');
const irmsBusinessSet = require('./business/business-set.js');
//
const queue = 'task';
//
var rabConnP = require('amqplib').connect(rabConnOPtions);
//
rabConnP.then((rabconn) => {
    return rabconn.createChannel();
}).then((ch) => {
    ch.prefetch(1);
    return ch.assertQueue(queue, { durable: false }).then(() => {
        return ch.consume(queue, (msg) => {
            var instructContent = JSON.parse(msg.content.toString());

            console.log("[x] Received '%s'", instructContent);
            var businessKey = instructContent.businessKey;

            var businessParam = instructContent.businessParam;
            var businessPro = irmsBusinessSet.getBusiness(businessKey);
            //还要继续判断是不是函数
            if (businessPro) {
                businessPro(businessParam).then((result) => {
                    //多个值的获取
                    if (result.msg.recordset.length > 0) {
                        console.log(result.msg.recordsets[0]);
                        console.log(result.msg.recordsets[1]);
                    }
                    ch.ack(msg);
                    //并且还要向通知队列发送数据，说明已经执行成功，
                    //并且把result 返回过去
                }).catch(error => {
                    console.log('exec business error:' + error);
                    ch.ack(msg);
                    //并且还要向通知队列发送数据，说明 businessPro无法有效的执行，把错误告返回
                    //error 返回过去
                });
            } else { //没有找到businessProc
                console.log('not find businessproc error');
                ch.ack(msg);
                //并且还要向通知队列发送数据，说明 businessKey 无效
            }
        }, { noAck: false });
    }).then(function() {
        console.log('irms-db-Worker start. To exit press CRTL+C');
    });
});