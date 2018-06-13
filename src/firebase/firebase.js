import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyBc3t2eTTz5-NlyyYRHHFbM4Q_XipKajUI",
    authDomain: "nvopt-dbed3.firebaseapp.com",
    databaseURL: "https://nvopt-dbed3.firebaseio.com",
    projectId: "nvopt-dbed3",
    storageBucket: "",
    messagingSenderId: "494333174898"
  };

const devConfig = {
  apiKey: "AIzaSyBc3t2eTTz5-NlyyYRHHFbM4Q_XipKajUI",
    authDomain: "nvopt-dbed3.firebaseapp.com",
    databaseURL: "https://nvopt-dbed3.firebaseio.com",
    projectId: "nvopt-dbed3",
    storageBucket: "",
    messagingSenderId: "494333174898"
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
