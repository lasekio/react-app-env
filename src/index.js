import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('main')
    )
}
const entry = _REACT_ENV_APP_ENTRYPOINT;

const App = require(_REACT_ENV_APP_ENTRYPOINT).default;

render(App);

if (module.hot) {
    console.log('accepting..', entry);
    module.hot.accept('./' +  entry, () => {
        render(App)
    })
}