const path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const packageInfo = require(path.join(process.cwd(), 'package.json'));

const customVendors = packageInfo.reactAppConfig && packageInfo.reactAppConfig.vendors || [];

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        vendors: Array.from(new Set([ // Unique
            'webpack/hot/only-dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            'react-dom',
            'react-hot-loader',
            'react',
            ...customVendors,
        ])),
    },
    output: {
        filename: '[name]_[hash].dll.js',
        library: '[name]_[hash]',
        path: path.resolve(process.cwd(), 'dist'),
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(process.cwd(), "dist", "[name]-manifest.json"),
            name: "[name]_[hash]"
        }),
        new ExtractTextPlugin("[name]_[hash].css"),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|svg)$/,
                use: ['file-loader']
            }
        ]
    }
};