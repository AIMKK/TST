const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
//const webpack = require('webpack');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),

    },
    mode: 'production', //'development'
    devtool: 'inline-source-map',
    //only localhost 8080
    // devServer: {
    //     contentBase: './dist',
    //     hot: true
    // },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        //new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
};