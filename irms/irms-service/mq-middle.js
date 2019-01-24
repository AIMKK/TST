
var Q = require('q');
var rabConnOPtions = require('./config/rabitmqConnConfig.js');
var amqplib = require('amqplib');
const log4jsConfig=require('./log4js-config.js');
const log4js = require('log4js');
//
log4js.configure(log4jsConfig);
// 
const tiplogger = log4js.getLogger('console');
//
var currentConn;
//
module.exports = {
    RemoteCall,
    PushMsg
};
//send receive
function RemoteCall(taskQueueName, taskQueueOption, sendData, maxWaitMillisecond) {
    if (maxWaitMillisecond < 60000) {
        maxWaitMillisecond = 180000;
    }
    //
    if (!currentConn) {
        var open = amqplib.connect(rabConnOPtions);
        //
        return open.then(function (conn) {
            currentConn = conn;
            //
            process.on('exit', ()=>{
                if(currentConn){
                    currentConn.close.bind(currentConn);
                }                
                log4js.shutdown();
            });
            //
            conn.on('error', function (err) {
                currentConn=null;
                tiplogger.error('rabconn error:'+err);
            })
            //if there is some resource shortage, e.g., memory
            conn.on('blocked', function (reason) {
                tiplogger.info('blocked:'+reason);
            })
            //once the resource shortage has alleviated
            conn.on('unblocked', function () {
                tiplogger.info('unblocked');
            })
            return RemoteCallInner();
        }).catch(error => {
            currentConn = null;
            tiplogger.error(error);
            return 'open mp connection error';
        });
    } else {
        return RemoteCallInner();
    }

    //
    function RemoteCallInner() {
        if (!currentConn) {
            var deferred = Q.defer();
            deferred.reject('connection of mq is invalid');
            return deferred.promise;
        }
        //
        return currentConn.createConfirmChannel().then(function (ch) {
            //// ch.prefetch(1);
            return ch.assertQueue('', {
                durable: false, exclusive: true, expires: 20000, autoDelete: true
            }).then((tempBackQueue) => {
                if (!taskQueueOption) {
                    taskQueueOption = { durable: false };
                }
                //
                return ch.assertQueue(taskQueueName, taskQueueOption).then(function () {
                    var data = JSON.stringify(sendData);
                    var deferred = Q.defer();

                    ch.sendToQueue(taskQueueName, Buffer.from(data), { replyTo: tempBackQueue.queue }, function (err, ok) {
                        if (err != null) {
                            tiplogger.error(err);
                            deferred.reject('send to mq queue failed !');
                        }
                        else {
                            var backConsumed;
                            ch.consume(tempBackQueue.queue, function (msg) {
                                var backData = JSON.parse(msg.content.toString());
                                //
                                if (!backConsumed) {
                                    backConsumed = true;
                                    ch.close().catch((error) => {
                                        tiplogger.error(error);
                                    });
                                }
                                //
                                deferred.resolve(backData);
                            }, { noAck: true });
                            //
                            setTimeout(function () {
                                if (!backConsumed) {
                                    backConsumed = true;
                                    ch.close().catch((error) => {
                                        tiplogger.error(error);
                                    });
                                    //
                                    deferred.reject('no data back to rpc queue in limit time');
                                }
                            }, maxWaitMillisecond);//如果一致都没有返回的消息，这里是最大的等待时间,三分钟后删掉
                        }
                    });
                    return deferred.promise;
                });
            });
        }).catch(function (error) {
            currentConn = null;
            tiplogger.error(error);
            return 'create mq chanel error';
        });
    }
}
//
function PushMsg(taskQueueName, taskQueueOption, sendData) {
    if (!currentConn) {
        var open = amqplib.connect(rabConnOPtions);
        //
        return open.then(function (conn) {
            currentConn = conn;
             //
             process.on('exit', ()=>{
                if(currentConn){
                    currentConn.close.bind(currentConn);
                }                
                log4js.shutdown();
            });
            //
            conn.on('error', function (err) {
                currentConn=null;
                tiplogger.error('rabconn error:'+err);
            })
            //if there is some resource shortage, e.g., memory
            conn.on('blocked', function (reason) {
                tiplogger.info('blocked:'+reason);
            })
            //once the resource shortage has alleviated
            conn.on('unblocked', function () {
                tiplogger.info('unblocked');
            })
            return PushMsgInner();
        }).catch(error => {
            currentConn = null;
            tiplogger.error(error);
            return 'open mp connection error';
        });
    } else {
        return PushMsgInner()
    }

    //
    function PushMsgInner() {
        if (!currentConn) {
            var deferred = Q.defer();
            deferred.reject('connection of mq is invalid');
            return deferred.promise;
        }
        //
        return currentConn.createConfirmChannel().then(function (ch) {
            if (!taskQueueOption) {
                taskQueueOption = { durable: false };
            }
            return ch.assertQueue(taskQueueName, taskQueueOption).then(function () {
                var data = JSON.stringify(sendData);
                var deferred = Q.defer();
                ch.sendToQueue(taskQueueName, Buffer.from(data), {}, function (err, ok) {
                    if (!err) {
                        tiplogger.error(err);
                        deferred.reject('send to mq queue failed !');
                    }
                    else {
                        deferred.resolve('sendOK')
                    }
                });
                return deferred.promise;
            });
        }).catch(function (error) {
            currentConn = null;
            tiplogger.error(error);
            return 'create mq chanel error';
        });
    }
}


