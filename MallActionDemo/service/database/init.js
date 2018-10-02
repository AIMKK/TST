const mongoose = require('mongoose');
const glob = require('glob');
const { resolve } = require('path');

const db = "mongodb://localhost/malldb"

module.exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require);
}

//
module.exports.connect = () => {

    let maxConnectTimes = 0;
    return new Promise((resolve, reject) => {
        mongoose.connect(db); //connect db

        // event set
        mongoose.connection.on('disconnected', () => {
            console.log('*******db closed connect again')
            if (maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db);

            } else {
                reject();
                throw new Error('connect db error can not open')

            }
            //connect db
        })

        //
        mongoose.connection.on('error', (err) => {
            console.log('*******db closed connect again')
            if (maxConnectTimes <= 3) {
                maxConnectTimes++;
                mongoose.connect(db);

            } else {
                reject(err);
                throw new Error('connect db error can not open')

            }
        })
        mongoose.connection.once('open', () => {
            console.log('*******db connect ok')
            resolve();
        })
    })


}