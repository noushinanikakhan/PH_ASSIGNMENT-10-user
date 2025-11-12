// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY-qe2-hBw2MqY6pMp-Nf-L9d-13OMvdo",
  authDomain: "assignment-10-plateshare.firebaseapp.com",
  projectId: "assignment-10-plateshare",
  storageBucket: "assignment-10-plateshare.firebasestorage.app",
  messagingSenderId: "565652299219",
  appId: "1:565652299219:web:bdc6169f4ab14c860a2326"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);