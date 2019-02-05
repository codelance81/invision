import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history, persistor } from './store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
