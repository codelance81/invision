import firebase from  'firebase';


export default { 
  apiKey: "AIzaSyA8W2T9UGdfwTBs-kvjKOCP9lFoXr0YMxo",
  authDomain: "invision-eba9e.firebaseapp.com",
  databaseURL: "https://invision-eba9e.firebaseio.com",
  projectId: "invision-eba9e",
  storageBucket: "invision-eba9e.appspot.com",
  messagingSenderId: "634399611693"
}

const config = {
  apiKey: "AIzaSyA8W2T9UGdfwTBs-kvjKOCP9lFoXr0YMxo",
  authDomain: "invision-eba9e.firebaseapp.com",
  databaseURL: "https://invision-eba9e.firebaseio.com",
  projectId: "invision-eba9e",
  storageBucket: "invision-eba9e.appspot.com",
  messagingSenderId: "634399611693"
}


if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth
 }