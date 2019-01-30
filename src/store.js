import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import {createBrowserHistory} from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import rootReducer from './state/rootReducer';

const persistConfig = {
  key: 'invision',
  storage: storage,
  whitelist: ['auth'],
}

export const history = createBrowserHistory();

const persistedReducer = persistReducer(persistConfig, rootReducer(history))

const persistedStore = createStore(
  persistedReducer,
  {},
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
));

export const persistor = persistStore(persistedStore);

export default persistedStore;
