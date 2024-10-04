import React from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3B5OGIJMEWA5fi16kB0eXVPAqi5hVW0E",
  authDomain: "schoolplug-d0b57.firebaseapp.com",
  projectId: "schoolplug-d0b57",
  storageBucket: "schoolplug-d0b57.appspot.com",
  messagingSenderId: "1052194861525",
  appId: "1:1052194861525:web:f1b2deb305bb8d97de4d5c",
  measurementId: "G-D68X6RTJ6Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and GoogleAuthProvider
const auth = getAuth(app); // Initialize `auth`
const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider

// Export the `auth` and `provider` objects
export { auth, provider };
