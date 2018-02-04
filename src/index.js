import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const render = () => {
    const Component = require(_REACT_ENV_APP_ENTRYPOINT).default;

    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('main')
    )
};

render();

if (module.hot) {
    console.log('accepting', _REACT_ENV_APP_ENTRYPOINT);
    module.hot.accept(_REACT_ENV_APP_ENTRYPOINT, () => { render() })
}