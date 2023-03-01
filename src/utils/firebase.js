// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2theD8ACLNswb4xFUyCzDLnxrKJVVwLI",
  authDomain: "react-game-store-795d3.firebaseapp.com",
  projectId: "react-game-store-795d3",
  storageBucket: "react-game-store-795d3.appspot.com",
  messagingSenderId: "613765418433",
  appId: "1:613765418433:web:cfc8da680ccb0cdb40b340",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
