import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import "firebase/storage";
 // Your web app's Firebase configuration
 var fbConfig = {
    apiKey: "AIzaSyByEuNxdiUY5IwH5c9egHSITYgi2VDYacU",
    authDomain: "intellisaverapp-4e311.firebaseapp.com",
    databaseURL: "https://intellisaverapp-4e311.firebaseio.com",
    projectId: "intellisaverapp-4e311",
    storageBucket: "intellisaverapp-4e311.appspot.com",
    messagingSenderId: "856036328877",
    appId: "1:856036328877:web:f31f407aa5b820f7470d24",
    measurementId: "G-LFR1WF6KF4"
  };


// Initialize Firebase
firebase.initializeApp(fbConfig);

// Initialize other services on firebase instance
firebase.firestore();

  export default firebase;