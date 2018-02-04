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
    const entry = _REACT_ENV_APP_ENTRYPOINT;
    console.log('accepting', entry);
    module.hot.accept('./' . entry, () => { render() })
}