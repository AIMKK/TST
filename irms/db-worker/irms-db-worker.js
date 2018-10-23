var rabConnOPtions = require('./config/rabitmqConnConfig.js');
const irmsDBBusiness = require('./business/irms-db-business.js')
    //
const queue = 'task'

var rabConnP = require('amqplib').connect(rabConnOPtions);

var newVipQuickJoinParam = {
    CompanyCode: '',
    vipcode: 'tester',
    LocationCode: 'HK992',
    ChineseName: 'tesaaa',
    EnglishName: 'tesaaa',
}
rabConnP.then((rabconn) => {
    return rabconn.createChannel();
}).then((ch) => {
    ch.prefetch(1);
    return ch.assertQueue(queue, { durable: false })
        .then(() => {
            return ch.consume(queue, (msg) => {
                console.log("[x] Received '%s'", msg.content.toString());
                //todo by msg type

                irmsDBBusiness.irmsAtestTableDataAdd(newVipQuickJoinParam).then((abc) => {
                    console.log('1111--')
                    console.log(abc)
                    ch.ack(msg);
                }).catch(error => {
                    console.log('affdsfds--' + error)
                });
            }, { noAck: false })
        })
        .then(function() {
            console.log('[*] Waiting for message. To exit press CRTL+C');
        });
});