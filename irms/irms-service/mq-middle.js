
var Q = require('q');
var rabConnOPtions = require('./config/rabitmqConnConfig.js');
var amqplib = require('amqplib');
var currentConn;
//
module.exports = {
    rpc,
    send
};
//
function rpc(taskQueueName, taskQueueOption, sendData, maxWaitMillisecond) {
    if (maxWaitMillisecond < 60000) {
        maxWaitMillisecond = 180000;
    }
    //
    if (!currentConn) {
        var open = amqplib.connect(rabConnOPtions);
        //
        return open.then(function (conn) {
            currentConn = conn;
            return rpcInner();
        }).catch(error => {
            currentConn = null;
            console.log(error)
            return 'open mp connection error';
        });
    } else {
        return rpcInner()
    }

    //
    function rpcInner() {
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
                        if (err!=null) {
                            console.log(err);
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
                                        console.log(error)
                                    });
                                }
                                //
                                deferred.resolve(backData)
                            }, { noAck: true });
                            //
                            setTimeout(function () {
                                if (!backConsumed) {
                                    backConsumed = true;
                                    ch.close().catch((error) => {
                                        console.log(error)
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
            console.log(error)
            return 'create mq chanel error';
        });
    }
}
//
function send(taskQueueName, taskQueueOption, sendData) {
    if (!currentConn) {
        var open = amqplib.connect(rabConnOPtions);
        //
        return open.then(function (conn) {
            currentConn = conn;
            return sendInner();
        }).catch(error => {
            currentConn = null;
            console.log(error)
            return 'open mp connection error';
        });
    } else {
        return sendInner()
    }

    //
    function sendInner() {
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
                        console.log(err);
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
            console.log(error)
            return 'create mq chanel error';
        });
    }
}


