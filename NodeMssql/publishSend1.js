var connOPtions = require('../rabitmqConnConfig.js');

var open = require('amqplib').connect(connOPtions);

open.then(function(conn) {
    return conn.createChannel().then(function(ch) {
        var exchangeName = 'publsh';
        return ch.assertExchange(exchangeName, 'fanout', { durable: false }).then(function() {
            for (i = 0; i < 105; i++) {
                ch.publish(exchangeName, '', Buffer.from('something to do'));
                console.log('ok');
            }

            console.log('close')
            return ch.close();

        }).then(function() {
            console.log('over');
            conn.close();
        });
    });
}).catch(console.warn);