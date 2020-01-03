import firebase from 'firebase/app';
import "firebase/storage";

const config = {
  authDomain: "easytools-app-cb174.firebaseapp.com",
  databaseURL: "https://easytools-app-cb174.firebaseio.com",
  projectId: "easytools-app-cb174",
  storageBucket: "easytools-app-cb174.appspot.com",
  messagingSenderId: "932251775837",
  appId: "1:932251775837:web:935f7c272aef0335896eb4",
  measurementId: "G-WT85ZYBPLD"
}

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseStorage = firebase.storage();