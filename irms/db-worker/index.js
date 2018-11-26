const rabConnOPtions = require('./config/rabitmqConnConfig.js');
const irmsBusinessSet = require('./business/business-set.js');
const log4js = require('log4js');
const amqp = require('amqplib');
//
const queue = 'task';
//
(function start() {
    var connOpen = amqp.connect(rabConnOPtions);
    //还要考虑如果连接断掉了，就要，重新去建立连接，
    connOpen.then((rabconn) => {
        process.once('SIGINT', rabconn.close.bind(rabconn));
        //
        rabconn.on('error', function (err) {
            console.log('rabconn error:')
            console.log(err);
            //这个地方需要重新连接
            console.log('restart again');
            //一秒钟以后重启
            setTimeout(function () {
                start();
            }, 1000);
        })
        //if there is some resource shortage, e.g., memory
        rabconn.on('blocked', function (reason) {
            console.log('blocked:')
            console.log(reason)
        })
        //once the resource shortage has alleviated
        rabconn.on('unblocked', function () {
            console.log('unblocked')
        })
        log4js.configure({
            appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
            categories: { default: { appenders: ['cheese'], level: 'error' } }
        });

        return rabconn.createChannel();
    }).then((ch) => {
        ch.prefetch(1);
        return ch.assertQueue(queue, { durable: false }).then(() => {
            return ch.consume(queue, (msg) => {
                try {
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
                            console.log(result)
                            ch.ack(msg);                           
                            //返回result
                            if (msg.properties.replyTo) {
                                console.log('sendback')//目前先打印出来
                                var buf;
                                try{
                                    if(result==null||result==undefined){
                                        buf=new Buffer('');
                                    }else{
                                        buf=new Buffer(JSON.stringify(result));
                                    }                                    
                                }catch(error){
                                    buf=new Buffer('');
                                }
                                ch.sendToQueue(msg.properties.replyTo, buf, { correlationId: msg.properties.correlationId });
                            }                            
                        }).catch(error => {
                            console.log('exec business error:' + error);
                            ch.ack(msg);
                            //并且还要向通知队列发送数据，说明 businessPro无法有效的执行，把错误告返回
                            //error 返回过去
                        });
                    } else { //没有找到businessProc
                        console.log('not find businessproc error');
                        ch.ack(msg);
                        if (msg.properties.replyTo) {
                            var buf=new Buffer(JSON.stringify(`current request can't be served,check request cmd pls!`));                      
                            ch.sendToQueue(msg.properties.replyTo, buf, { correlationId: msg.properties.correlationId });
                        }
                    }
                } catch (error) {
                    console.log('error when consuming');
                    console.log(error);
                    //
                    ch.ack(msg);
                    if (msg.properties.replyTo) {
                        var buf=new Buffer(JSON.stringify('error when consuming'));                      
                        ch.sendToQueue(msg.properties.replyTo, buf, { correlationId: msg.properties.correlationId });
                    }
                }
            }, { noAck: false });
        }).then(function () {
            console.log('irms-db-Worker start. To exit press CRTL+C');
        }).catch(error => {
            console.log('irms-db-Worker assertQueue error--');
            console.log(error);
        });
    }).catch(error => {
        console.log('irms-db-Worker connect to mq error--');
        console.log(error);
    });
})();