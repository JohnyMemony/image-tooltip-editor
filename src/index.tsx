import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {PersistGate} from 'redux-persist/integration/react';
import {store, history, persistor} from './store';
import Routes from './Routes';

import './styles/index.scss';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Routes/>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));
