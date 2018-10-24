const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './irms-db-worker.js',
    output: {
        path: path.resolve(__dirname, 'dist-temp'),
        filename: '[name].js',
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 chunks: "initial",
    //                 minChunks: 2,
    //                 maxInitialRequests: 5, // The default limit is too small to showcase the effect
    //                 minSize: 0 // This is example is too small to create commons chunks
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: "initial",
    //                 name: "vendor",
    //                 priority: 10,
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    rules: [{
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
    }],
    resolve: {
        // 一定不要忘记配置ts tsx后缀
        extensions: ['.tsx', '.ts', '.js'],
    },
    node: {
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        dns: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }


};