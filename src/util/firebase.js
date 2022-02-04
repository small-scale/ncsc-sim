
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAWee0rD6tY_LslKDTfRfLslkyGxfavL4w",
    authDomain: "ncsc-sim.firebaseapp.com",
    projectId: "ncsc-sim",
    storageBucket: "ncsc-sim.appspot.com",
    messagingSenderId: "828612939825",
    appId: "1:828612939825:web:7dab080445c4eab5ab0510"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {firebaseApp, db, auth}