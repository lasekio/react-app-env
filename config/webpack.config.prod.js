const path = require('path');
const webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const packageInfo = require(path.join(process.cwd(), 'package.json'));

let plugins = [];

plugins = [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../src/index.html.ejs'), cache: false }),
    new AddAssetHtmlPlugin(
        { filepath: path.join(process.cwd(), 'dist', '*.css'), typeOfAsset: 'css', includeSourcemap: false  }
    ),
    new webpack.DefinePlugin({
        _REACT_ENV_APP_ENTRYPOINT: JSON.stringify(packageInfo.main),
    }),
    new ExtractTextPlugin("[name]_[hash].css"),
];

module.exports = {
    entry: {
        app: [path.resolve(__dirname, '../src/index.js')],
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/public/'
    },
    resolve: { modules: [ process.cwd(), 'node_modules' ]},
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
                exclude: /(node_modules\/[^react\-app\-env])/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["env", {
                                "targets": {
                                    "browsers": ["last 2 Chrome versions"]
                                }
                            }]],
                        plugins: [
                            "transform-react-jsx",
                            "syntax-async-functions",
                            "transform-object-rest-spread",
                            ["transform-class-properties", { "spec": true }]
                        ]
                    }
                }]
            }
        ]
    }
};