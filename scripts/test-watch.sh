#!/usr/bin/env sh

mocha-webpack -w --webpack-config node_modules/react-app-env/config/webpack.config.test.js {app,src}/**/*.{test,spec}.js