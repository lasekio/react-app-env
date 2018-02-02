const path = require('path');
const webpack = require('webpack');


module.exports = {
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|svg|css)$/,
                use: ['null-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
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