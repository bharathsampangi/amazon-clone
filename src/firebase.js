import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"
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

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth}