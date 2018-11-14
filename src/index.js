import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import AuthUserContext from './components/Session/AuthUserContext';
import { firebase } from '../src/firebase';

let isLoggedIn = false;

const authListner = (callback) => {
  firebase.auth.onAuthStateChanged(authUser => {
    authUser ? isLoggedIn = true : isLoggedIn = false
    callback();
  });
}

authListner(function() {
  ReactDOM.render(
    <AuthUserContext.Provider value={isLoggedIn}>
      <App />
    </AuthUserContext.Provider>
  , document.getElementById('root'));
  registerServiceWorker();
});


