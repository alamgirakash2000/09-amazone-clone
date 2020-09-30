import firebase from "firebase";

const Config = firebase.initializeApp({
  apiKey: "AIzaSyD6miqZHIPraVrHYve8TfgIBHi9EKqjVz0",
  authDomain: "clone-904cc.firebaseapp.com",
  databaseURL: "https://clone-904cc.firebaseio.com",
  projectId: "clone-904cc",
  storageBucket: "clone-904cc.appspot.com",
  messagingSenderId: "262331714843",
  appId: "1:262331714843:web:d184902bdf22ba29bc17be",
  measurementId: "G-6JK8M8PPMH",
});

const database = Config.firestore();
const auth = Config.auth();
const storage = firebase.storage();

export { database, auth, storage };
