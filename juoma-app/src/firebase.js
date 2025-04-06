// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo7hem46UCheeagsvswL9lVFDqd41D-rg",
  authDomain: "juoma-app-cbd86.firebaseapp.com",
  databaseURL: "https://juoma-app-cbd86-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "juoma-app-cbd86",
  storageBucket: "juoma-app-cbd86.firebasestorage.app",
  messagingSenderId: "919378134630",
  appId: "1:919378134630:web:57bae0cff2f437f50f8fa7",
  measurementId: "G-GJQ6X8ZJ3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);