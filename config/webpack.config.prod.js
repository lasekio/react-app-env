const path = require('path');
const webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let plugins = [];

plugins = [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html.ejs'), cache: false }),
    new AddAssetHtmlPlugin(
        { filepath: path.join(__dirname, 'dist', '*.css'), typeOfAsset: 'css', includeSourcemap: false  }
    ),
    new ExtractTextPlugin("[name]_[hash].css"),
];

module.exports = {
    entry: {
        styles: [
            'semantic-ui-css/semantic.min.css',
        ],
        app: './src/index.js',
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: plugins,
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
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: [
                            "transform-react-jsx",
                            "transform-object-rest-spread",
                            ["transform-class-properties", { "spec": true }]
                        ]
                    }
                }]
            }
        ]
    }
};