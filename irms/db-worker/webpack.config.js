const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: './irms-db-worker.js',
    output: {
        //filename: '[name].bundle.js',
        filename: 'irms-db-worker.js',
        path: path.resolve(__dirname, 'dist-temp'),

    },
    target: 'node',
    plugins: [
        new CleanWebpackPlugin(['dist-temp']),
    ],
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },

};