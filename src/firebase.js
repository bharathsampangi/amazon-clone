// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVjVHebiExpW1FpdPVX6JqkKv2m-PdOgQ",
  authDomain: "clone-b7fcb.firebaseapp.com",
  projectId: "clone-b7fcb",
  storageBucket: "clone-b7fcb.appspot.com",
  messagingSenderId: "902639847873",
  appId: "1:902639847873:web:476a9a0c81b5f7f81a4740",
  measurementId: "G-EFZLN2S2MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);