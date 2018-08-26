var q = 'task';

var connOPtions = require('../rabitmqConnConfig.js');

var open = require('amqplib').connect(connOPtions);

open.then(function(conn) {
    return conn.createChannel().then(function(ch) {
        return ch.assertQueue(q, { durable: false }).then(function() {
            for (i = 0; i < 5; i++) {
                ch.sendToQueue(q, Buffer.from('something to do'));
                console.log('ok');
            }
            console.log('close')
            return ch.close();
        }).then(function() {
            console.log('over')
            conn.close();
        });
    });
}).catch(console.warn);