const path = require('path');

module.exports = {
    entry: './irms-db-worker.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'irmsdbworker.bundle.js'
    }
};