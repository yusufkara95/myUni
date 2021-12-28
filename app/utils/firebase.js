import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCGfT6S0V3A_vcKPGhJaT39DQKu4cTnqjI",
    authDomain: "myuni-2e476.firebaseapp.com",
    projectId: "myuni-2e476",
    storageBucket: "myuni-2e476.appspot.com",
    messagingSenderId: "852380346317",
    appId: "1:852380346317:web:da23779496d510045f8684"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);