import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyA3B5OGIJMEWA5fi16kB0eXVPAqi5hVW0E",
//   authDomain: "schoolplug-d0b57.firebaseapp.com",
//   projectId: "schoolplug-d0b57",
//   storageBucket: "schoolplug-d0b57.appspot.com",
//   messagingSenderId: "1052194861525",
//   appId: "1:1052194861525:web:f1b2deb305bb8d97de4d5c",
//   measurementId: "G-D68X6RTJ6Y",
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const messaging = getMessaging(app);
const provider = new GoogleAuthProvider();

export { auth, messaging, provider };
