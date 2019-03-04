import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: 'AIzaSyA8W2T9UGdfwTBs-kvjKOCP9lFoXr0YMxo',
  authDomain: 'invision-eba9e.firebaseapp.com',
  databaseURL: 'https://invision-eba9e.firebaseio.com',
  projectId: 'invision-eba9e',
  storageBucket: 'invision-eba9e.appspot.com',
  messagingSenderId: '634399611693',
};

const devConfig = {
  apiKey: 'AIzaSyA8W2T9UGdfwTBs-kvjKOCP9lFoXr0YMxo',
  authDomain: 'invision-eba9e.firebaseapp.com',
  databaseURL: 'https://invision-eba9e.firebaseio.com',
  projectId: 'invision-eba9e',
  storageBucket: 'invision-eba9e.appspot.com',
  messagingSenderId: '634399611693',
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();


export {
  db,
  auth,
};
