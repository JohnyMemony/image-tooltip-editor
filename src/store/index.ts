import {combineReducers, applyMiddleware, compose, createStore} from 'redux';
import {connectRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';
import {persistReducer, persistStore} from 'redux-persist';
import storage from "redux-persist/lib/storage/session";
import thunk from 'redux-thunk';

import {rServerData, ServerDataState} from './ServerDataStore';
import {rImages, ImagesState} from './ImagesStore';

export interface AppState {
    router: any,
    rServerData: ServerDataState,
    rImages: ImagesState,
};

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory({
    basename: '/'
});

const createRootReducer = (history: any) => combineReducers({
    router: connectRouter(history),
    rServerData,
    rImages,
} as any);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['rServerData'],
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

export const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history)
        ),
    ),
);

export const persistor = persistStore(store);
