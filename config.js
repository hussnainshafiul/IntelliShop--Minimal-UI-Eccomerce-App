// firebase config key setup

import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
import 'firebase/storage' //to access firebase storage

// firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBtXpMf7ECv0qfTv1X6Ijhwa0qNLIItrgk",
  authDomain: "intellishop-37949.firebaseapp.com",
  projectId: "intellishop-37949",
  storageBucket: "intellishop-37949.appspot.com",
  messagingSenderId: "681136663061",
  appId: "1:681136663061:web:06932126010ecbc82cfc1c",
  measurementId: "G-Y8TT0BG85N"
}

if (!firebase.apps.length)
{
    firebase.initializeApp(firebaseConfig);
}

export {firebase};