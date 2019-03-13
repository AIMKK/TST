const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    target: 'node',
    entry: './index.js',
    output: {
        //filename: '[name].bundle.js',
        filename: 'irms-db-worker.js',
        path: path.resolve(__dirname, 'dist-temp'),

    },    
    plugins: [
        new CleanWebpackPlugin(['dist-temp']),
    ],
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    //mode:'development'
};