var q = 'task';

var connOPtions = require('../rabitmqConnConfig.js');

var open = require('amqplib').connect(connOPtions);

open.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
        return ch.sendToQueue(q, Buffer.from('something to do'))
    });
}).catch(console.warn);