// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4oD-jkLhXmb_kREo0Vvvdl0InibJYelU",
  authDomain: "ecolution-6ae7f.firebaseapp.com",
  projectId: "ecolution-6ae7f",
  storageBucket: "ecolution-6ae7f.appspot.com",
  messagingSenderId: "569949883187",
  appId: "1:569949883187:web:366930bc33504b2b99cc46",
  measurementId: "G-B8HD66R7MX",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;
