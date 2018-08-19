var q = 'task';

var connOPtions = require('../rabitmqConnConfig.js');

var open = require('amqplib').connect(connOPtions);

open.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    ch.assertQueue(q, { durable: false });
    ch.sendToQueue(q, Buffer.from('something to do'));
    console.log('ok')
}).catch(console.warn);