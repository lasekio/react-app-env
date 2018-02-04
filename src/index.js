import React from 'react';
import ReactDOM from 'react-dom';

const AppClient = require(_REACT_ENV_APP_ENTRYPOINT).default;

ReactDOM.render(<AppClient/>, document.getElementById('main'));
