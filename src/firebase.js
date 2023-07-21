import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAao5RoGMWb9AyHo-bk-Ilde3L78KS61k",
    authDomain: "web-themes-kenya.firebaseapp.com",
    projectId: "web-themes-kenya",
    storageBucket: "web-themes-kenya.appspot.com",
    messagingSenderId: "342703668258",
    appId: "1:342703668258:web:4645db273857c1a58e1e7b",
    measurementId: "G-QKKV7PY4R4"
  };

  const firebaseSApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
   const db = firebaseSApp.firestore();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const facebookProvider = new firebase.auth.FacebookAuthProvider();
   const TwitterProvider = new firebase.auth.TwitterAuthProvider();
   const GithubProvider = new firebase.auth.GithubAuthProvider();
   const storage = firebase.storage();
  export default {auth, db, storage};
  export  {db, googleProvider, facebookProvider, TwitterProvider,GithubProvider};
  export  {auth};
  export  {storage};