#!/usr/bin/env bash

mocha-webpack --webpack-config --watch node_modules/react-app-env/config/webpack.config.test.js {app,src}/**/*.{test,spec}.js