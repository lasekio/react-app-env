#!/usr/bin/env sh

webpack --config $ENV/config/webpack.config.dll.js
REACT_APP_ENV_WEBPACK_RENDER_HTML=1 webpack --config $ENV/config/webpack.config.js
$ENV/scripts/dev-server.sh