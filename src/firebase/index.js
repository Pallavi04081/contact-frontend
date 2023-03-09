// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCw280pyd3XqXbQmxQQZA-tk3sNCjKhwLc",
    authDomain: "recipe-app-c03ae.firebaseapp.com",
    projectId: "recipe-app-c03ae",
    storageBucket: "recipe-app-c03ae.appspot.com",
    messagingSenderId: "879564182513",
    appId: "1:879564182513:web:9249471dd71fcaf2fe6a50",
    measurementId: "G-JVSDJHRTLT"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
const storage  = getStorage();

  export {storage,db,app};