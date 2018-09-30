var rabConnOPtions = require('../rabitmqConnConfig.js');
const dbBusiness = require('./IRMSDBBusiness.js')
    //
const queue = 'task'

var rabConnP = require('amqplib').connect(rabConnOPtions);

rabConnP.then((rabconn) => {
    return rabconn.createChannel();
}).then((ch) => {
    ch.prefetch(1);
    ch.assertQueue(queue, { durable: false })
        .then(() => {
            return ch.consume(queue, (msg) => {
                console.log("[x] Received '%s'", msg.content.toString());
                //todo by msg type
                dbBusiness.businessTest1().then(() => {
                    ch.ack(msg);
                });
            }, { noAck: false })
        })
        .then(function() {
            console.log('[*] Waiting for message. To exit press CRTL+C');
        });
})