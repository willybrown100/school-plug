

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};


export default firebaseConfig;



// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Analytics


// Initialize Firebase Authentication and GoogleAuthProvider
const auth = getAuth(app); // Initialize `auth`
const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider

// Export the `auth` and `provider` objects
export { auth, provider };




