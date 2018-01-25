const path = require('path');
const webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const DLLmanifest = require(path.join(__dirname, 'dist', 'vendors-manifest.json'));

const dllEnabled = process.env.DLL_ENABLED === undefined ? true : process.env.DLL_ENABLED !== '0';

let plugins = [];

if (process.env.UNDLERSIS_WEBPACK_RENDER_HTML) {
    plugins = [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html.ejs'), cache: false }),
        dllEnabled && new AddAssetHtmlPlugin({ filepath: path.join(__dirname, 'dist', '*.dll.js'), includeSourcemap: false }),
        new AddAssetHtmlPlugin(
            { filepath: path.join(__dirname, 'dist', '*.css'), typeOfAsset: 'css', includeSourcemap: false  }
            ),
    ]
}

if (dllEnabled) {
    plugins.push(new webpack.DllReferencePlugin({
        context: path.join( __dirname ),
        manifest: DLLmanifest,
    }));
}

module.exports = {
    devtool: 'inline-source-map',
    cache: true,
    entry: {
        app: [
            'react-hot-loader/patch',
            './src/index.js',
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        ...plugins,
        new webpack.HotModuleReplacementPlugin({
            multiStep: true,
            fullBuildTimeout: -1,
        }),

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors
    ],
    devServer: {
        hot: true,
        historyApiFallback: true,
        contentBase: "./dist",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            "transform-react-jsx",
                            "react-hot-loader/babel",
                            "transform-object-rest-spread",
                            ["transform-class-properties", { "spec": true }]
                        ]
                    }
                }]
            }
        ]
    }
};