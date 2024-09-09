// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlidaVdTpNseyS6_RKJ6h0vWH51w98qNQ",
    authDomain: "save-photos-7b945.firebaseapp.com",
    databaseURL: "https://save-photos-7b945-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "save-photos-7b945",
    storageBucket: "save-photos-7b945.appspot.com",
    messagingSenderId: "984812210399",
    appId: "1:984812210399:web:9206f62e20540da621016a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;