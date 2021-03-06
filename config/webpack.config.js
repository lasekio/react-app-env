const path = require('path');
const webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const DLLmanifest = require(path.join(process.cwd(), 'dist', 'vendors-manifest.json'));

const dllEnabled = process.env.DLL_ENABLED === undefined ? true : process.env.DLL_ENABLED !== '0';
const packageInfo = require(path.join(process.cwd(), 'package.json'));

let plugins = [];

if (process.env.REACT_APP_ENV_WEBPACK_RENDER_HTML) {
    plugins = [
        new HtmlWebpackPlugin({ template: path.resolve(__dirname, '../src/index.html.ejs'), cache: false }),
        dllEnabled && new AddAssetHtmlPlugin({ filepath: path.join(process.cwd(), 'dist', '*.dll.js'), includeSourcemap: false }),
        new AddAssetHtmlPlugin({filepath: path.join(process.cwd(), 'dist', '*.css'), typeOfAsset: 'css', includeSourcemap: false  }),
    ]
}

if (dllEnabled) {
    plugins.push(new webpack.DllReferencePlugin({
        context: path.join( process.cwd() ),
        manifest: DLLmanifest,
    }));
}

module.exports = {
    devtool: 'inline-source-map',
    cache: true,
    entry: {
        app: [path.resolve(process.cwd(), packageInfo.main)],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'dist'),
        publicPath: '/'
    },
    plugins: [
        ...plugins,
        new webpack.HotModuleReplacementPlugin({
            multiStep: true,
            fullBuildTimeout: -1,
        }),
        new webpack.DefinePlugin({
            _REACT_ENV_APP_ENTRYPOINT: JSON.stringify(packageInfo.main),
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
        hot: true,
        port: (packageInfo.reactAppConfig || {}).devServerPort || 8080,
        historyApiFallback: true,
        contentBase: "./dist",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules\/[^react\-app\-env])/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            "transform-react-jsx",
                            "syntax-async-functions",
                            "react-hot-loader/babel",
                            "transform-object-rest-spread",
                            ["transform-class-properties", { "spec": true }]
                        ]
                    }
                }]
            }
        ],
    },
    resolve: { modules: [ process.cwd(), path.dirname(process.cwd() + packageInfo.main), 'node_modules' ]},
};