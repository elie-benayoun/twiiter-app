import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"
  var firebaseConfig = {
    apiKey: "AIzaSyCNjAwkig3PVLnUfQinGirvKpytb9HLi3U",
    authDomain: "twitter-1faf3.firebaseapp.com",
    databaseURL: "https://twitter-1faf3.firebaseio.com",
    projectId: "twitter-1faf3",
    storageBucket: "twitter-1faf3.appspot.com",
    messagingSenderId: "616505415253",
    appId: "1:616505415253:web:07ad737194770b811526dc",
    measurementId: "G-6V44NJ8HTB"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase