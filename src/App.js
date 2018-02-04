import React from 'react';
import { hot } from 'react-hot-loader';

const AppClient = require(_REACT_ENV_APP_ENTRYPOINT).default;


const App = () => <AppClient/>;

export default hot(module)(App)
