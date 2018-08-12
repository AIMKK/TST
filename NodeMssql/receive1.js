var q = 'task';

var connOPtions = require('../rabitmqConnConfig.js');
var execute = require('./dbWorker1.js');

var open = require('amqplib').connect(connOPtions);

open.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
        return ch.consume(q).then(function(data) {
            console.log(data);
        });
    });
}).then(function(data) {
    console.log(data);
    execute();
}).catch(console.warn);

// var execute = require('./dbWorker1.js');
// execute();