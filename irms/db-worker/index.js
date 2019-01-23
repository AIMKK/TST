const rabConnOPtions = require('./config/rabitmqConnConfig.js');
const irmsBusinessSet = require('./business/business-set.js');
const log4jsConfig=require('./log4js-config.js');
const log4js = require('log4js');
const amqp = require('amqplib');
//
log4js.configure(log4jsConfig);
// 
const filelogger = log4js.getLogger();
const tiplogger = log4js.getLogger('console');
//
const queue = 'task';
//
(function start() {
    /*
    *sendToReplayQueue
    */
    function sendToReplayQueue(channel,replyTo,replyCorrelationId,responseCode,replyData){
         //返回replyData        
         if (channel && replyTo) {
            tiplogger.info('sendback')//目前先打印出来
            var backDataBuff;
            var backData = { code: responseCode, message: '' };
            try {
                if (replyData === null || replyData === undefined) {
                    backData.message = '';
                } else {
                    backData.message = replyData;
                }
                backDataBuff = Buffer.from(JSON.stringify(backData));
            } catch (error) {
                backDataBuff = Buffer.from('');
            }
            channel.sendToQueue(replyTo, backDataBuff, { correlationId: replyCorrelationId });
        }else{
            tiplogger.info('can not reply to back queue,back queue param error!')//目前先打印出来
        }
    }
    //
    var connOpen = amqp.connect(rabConnOPtions);
    //还要考虑如果连接断掉了，就要，重新去建立连接，
    connOpen.then((rabconn) => {
        process.on('exit', ()=>{
            if(rabconn){
                rabconn.close.bind(rabconn);
            }
            //
            log4js.shutdown(()=>{
                tiplogger.info('shutdown')
            });
        });
        //
        rabconn.on('error', function (err) {
            tiplogger.error('rabconn error:'+err);          
            //这个地方需要重新连接
            tiplogger.error('restart again');
            //一秒钟以后重启
            setTimeout(function () {
                start();
            }, 1000);
        })
        //if there is some resource shortage, e.g., memory
        rabconn.on('blocked', function (reason) {
            tiplogger.info('blocked:'+reason);
        })
        //once the resource shortage has alleviated
        rabconn.on('unblocked', function () {
            tiplogger.info('unblocked');
        })
        //
        return rabconn.createChannel();
    }).then((ch) => {
        ch.prefetch(1);
        return ch.assertQueue(queue, { durable: false }).then(() => {
            return ch.consume(queue, (msg) => {
                try {
                    tiplogger.info("[irms-dbworker] Received '%s'", msg.content.toString());
                    var instructContent = JSON.parse(msg.content.toString());
                    //
                    instructContent = instructContent || {};
                    var bussinessKey = instructContent.bussinessKey;
                    var bussinessParam = instructContent.bussinessParam;
                    var bussinessPro = irmsBusinessSet.getBussinessByKey(bussinessKey);
                    //还要继续判断是不是函数
                    if (bussinessPro && typeof bussinessPro === "function") {
                        bussinessPro(bussinessParam).then((result) => {
                            //db worker ,只是根据key 找到数据，然后 返回，数据，复杂的事情交给business
                            tiplogger.info("Some debug messages");
                            tiplogger.info(result);
                            //
                            ch.ack(msg);
                            //返回result
                            if (msg.properties && msg.properties.replyTo) {                                
                                sendToReplayQueue(ch,msg.properties.replyTo,msg.properties.correlationId ,'200',result);
                            }
                        }).catch(error => {
                            tiplogger.error('exec bussiness error:' + error);
                            ch.ack(msg);
                            //并且还要向通知队列发送数据，说明 businessPro无法有效的执行，把错误告返回
                            //error 返回过去
                            if (msg.properties && msg.properties.replyTo) {
                                sendToReplayQueue(ch,msg.properties.replyTo,msg.properties.correlationId ,'500','exec bussiness error');
                            }                            
                        });
                    } else { //没有找到businessProc
                        tiplogger.error('not find bussinessproc error');
                        ch.ack(msg);
                        //
                        if (msg.properties && msg.properties.replyTo) {
                            sendToReplayQueue(ch,msg.properties.replyTo,msg.properties.correlationId ,'400',`current request can't be served,check request cmd pls!`);
                        }    
                    }
                } catch (error) {
                    tiplogger.error('error when consuming:'+error);
                    ch.ack(msg);
                    //
                    if (msg.properties && msg.properties.replyTo) {
                        sendToReplayQueue(ch,msg.properties.replyTo,msg.properties.correlationId ,'500',`error when consuming!`);
                    }   
                }
            }, { noAck: false });
        }).then(function () {
            tiplogger.info('irms-db-Worker start. To exit press CRTL+C')
        }).catch(error => {
            tiplogger.error('irms-db-Worker assertQueue error--');
            tiplogger.error(error);
        });
    }).catch(error => {
        tiplogger.error('irms-db-Worker connect to mq error--');
        tiplogger.error(error);
    });
})();
