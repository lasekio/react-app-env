import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            {/*<Provider store={appStore}>*/}
                <Component />
            {/*</Provider>*/}
        </AppContainer>,
        document.getElementById('main')
    )
}
const entry = _REACT_ENV_APP_ENTRYPOINT;

const App = require(_REACT_ENV_APP_ENTRYPOINT).default;

render(App);

if (module.hot) {
    module.hot.accept(entry, () => {
        const App = require(_REACT_ENV_APP_ENTRYPOINT).default;
        render(App)
    })
}