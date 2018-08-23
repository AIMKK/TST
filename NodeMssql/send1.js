var q = 'task';

var connOPtions = require('../rabitmqConnConfig.js');

var open = require('amqplib').connect(connOPtions);

open.then(function(conn) {
    return conn.createChannel().then(function(ch) {
        return ch.assertQueue(q, { durable: false }).then(function() {
            ch.sendToQueue(q, Buffer.from('something to do'));
            console.log('ok');

            //conn.close();
            //process.exit(0)
        });
    });
}).catch(console.warn);