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
            console.log("[irms-dbworker] Received '%s'", msg.content.toString());
            var instructContent = JSON.parse(msg.content.toString());
            //
            var businessKey = instructContent.businessKey;
            var businessParam = instructContent.businessParam;
            var businessPro = irmsBusinessSet.getBusinessByKey(businessKey);
            //还要继续判断是不是函数
            if (businessPro && typeof businessPro === "function") {
                businessPro(businessParam).then((result) => {
                  //db worker ,只是根据key 找到数据，然后 返回，数据，复杂的事情交给business
                    ch.ack(msg);
                    //
                    console.log(result)//目前先打印出来
                    if(result){
                        //如果存在值，就返回给调用者
                        console.log('sendback')//目前先打印出来
                    }
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
    }).then(function () {
        console.log('irms-db-Worker start. To exit press CRTL+C');
    });
});