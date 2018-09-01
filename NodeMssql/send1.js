var q = 'task';
var callbackQ = 'callbackQ'

var connOPtions = require('../rabitmqConnConfig.js');

var open = require('amqplib').connect(connOPtions);

open.then(function(conn) {
    return conn.createChannel().then(function(ch) {
        ch.prefetch(1);
        return ch.assertQueue(q, { durable: false }).then(function() {
            var corrid = Math.random().toString();
            ch.assertQueue(callbackQ, { durable: false }).then(function() {
                //
                ch.consume(callbackQ, function(msg) {
                    if (msg.properties.correlationId == corrid) {
                        console.log("[x] Received '%s'", msg.content.toString());
                    } else {
                        console.log("[x] Received djdjdj");
                    }
                    //
                    ch.ack(msg);
                    console.log('close')
                    return ch.close().then(function() {
                        console.log('over1')
                        conn.close();
                    });
                }, { noAck: false });
            }).then(function() {
                //
                ch.sendToQueue(q, Buffer.from('something to do'), { correlationId: corrid });
                console.log('sned ok');
            })


        }).then(function() {
            console.log('over')
                ///conn.close();
        });
    });
}).catch(console.warn);