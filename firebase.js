// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB09rYVivn8dsyM-Bf4ixp7nIYJb_0-nd0",
  authDomain: "myuni-8b85f.firebaseapp.com",
  projectId: "myuni-8b85f",
  storageBucket: "myuni-8b85f.appspot.com",
  messagingSenderId: "182216359336",
  appId: "1:182216359336:web:209ce483cc4dd03e66b19d"
};

// Initialize Firebase

let app;
if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const auth = firebase.auth();

export { auth };