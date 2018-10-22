var q = 'task';

var rabConnOPtions = require('./config/rabitmqConnConfig.js');

var open = require('amqplib').connect(rabConnOPtions);

open.then(function(conn) {
    return conn.createChannel().then(function(ch) {
        ch.prefetch(1);
        return ch.assertQueue(q, { durable: false }).then(function() {
            //
            ch.sendToQueue(q, Buffer.from('something to do'));
            console.log('sned ok');
        })


    }).then(function() {
        console.log('over')
            ///conn.close();
    });

}).catch(console.warn);