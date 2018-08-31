var connOPtions = require('../rabitmqConnConfig.js');

const sql = require('mssql')

var open = require('amqplib').connect(connOPtions);

var msg;
var createdate;
const config = {
    user: 'sa',
    password: '123',
    server: '127.0.0.1', // You can use 'localhost\\instance' to connect to named instance
    database: 'tediousTestDB',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
var sqlConn = sql.connect(config);
open.then(function(conn) {
    return conn.createChannel();
}).then(function(ch) {
    var exchangeName = 'publsh';
    var exType = 'direct'; //'fanout';
    var routerKey = 'test';
    return ch.assertExchange(exchangeName, exType, { durable: false })
        .then(function() {
            return ch.assertQueue('', { exclusive: true })
                .then(function(q) {
                    return ch.bindQueue(q.queue, exchangeName, routerKey)
                        .then(function() {
                            //console.log('here')
                            //ch.prefetch(1);
                            return ch.consume(q.queue, function(msg) {
                                console.log("[x] Received '%s'", msg.content.toString());
                                msg = msg.content.toString();
                                //ch.ack(msg);
                                return sqlConn.then(pool => {
                                    // Query
                                    return pool.request()
                                        .input('msg', sql.NVarChar, msg)
                                        .input('CreateDate', sql.DateTime, new Date())
                                        .execute('InsertMsg');

                                }).then(result => {
                                    //ch.ack(msg);
                                    //console.log(result)
                                }).catch(err => {
                                    //ch.ack(msg);
                                    console.log(err)
                                })
                            }, { noAck: true });
                        });
                }).then(function() {
                    console.log('[*] Waiting for message. To exit press CRTL+C');
                });
        })
}).catch(console.warn)