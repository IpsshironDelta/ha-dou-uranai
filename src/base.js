import { initializeApp } from 'firebase/app';
import { getAuth }       from "firebase/auth";
require('dotenv').config();

console.log(process.env.REACT_APP_FIREBASE_API_KEY)

// const base = initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
// });
const base = initializeApp({
  apiKey: "AIzaSyBt_SFyvbOcXjJyvRVkyVZBLaOhCxIVSEw",
  authDomain: "ha-dou-uranai-aea55.firebaseapp.com",
  projectId: "ha-dou-uranai-aea55",
  storageBucket: "ha-dou-uranai-aea55.appspot.com",
  messagingSenderId: "872302651616",
  appId: "1:872302651616:web:f18f9638ad8d6d889fc885",
  measurementId: "G-PFCBR03BC6"
});

const auth = getAuth();

export default auth