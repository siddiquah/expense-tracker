// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB44zP11dIgpfI1f54MqVBDuR69K937lZg",
  authDomain: "expense-tracker-2d223.firebaseapp.com",
  projectId: "expense-tracker-2d223",
  storageBucket: "expense-tracker-2d223.appspot.com",
  messagingSenderId: "915975340484",
  appId: "1:915975340484:web:3047f509a7192a981de491",
  measurementId: "G-35XFZCMDXB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

const analytics = getAnalytics(app);
