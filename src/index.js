import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

const App = require(_REACT_ENV_APP_ENTRYPOINT).default;

const HotModule = hot(module)(App)

ReactDOM.render(<HotModule/>, document.getElementById('main'));
