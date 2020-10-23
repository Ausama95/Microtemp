import firebase from 'firebase';
import "firebase/firestore";
import'firebase/analytics';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBFw3w3tFxkX91HPmnAoLSNvlzWQk5MRZY",
    authDomain: "bbc-microbit-sensor.firebaseapp.com",
    databaseURL: "https://bbc-microbit-sensor.firebaseio.com",
    projectId: "bbc-microbit-sensor",
    storageBucket: "bbc-microbit-sensor.appspot.com",
    messagingSenderId: "965274359597",
    appId: "1:965274359597:web:946808284e3625b43b65a4",
    measurementId: "G-7GRQ99FVT0"
  };

  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }

  /* if (typeof window !== 'undefined' && !firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)

      if ('measurementId' in firebaseConfig) firebase.analytics()
  } */

  export default firebase;
  export const firestore = firebase.firestore();
