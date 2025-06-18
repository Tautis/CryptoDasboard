import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBpJN7v8c2vxcjeOnFdw4JIfGGH5yYAf2s",
  authDomain: "cryptodash-f61fb.firebaseapp.com",
  projectId: "cryptodash-f61fb",
  storageBucket: "cryptodash-f61fb.appspot.com", // fixed typo here
  messagingSenderId: "1052240888504",
  appId: "1:1052240888504:web:b482c4d94bfb7ce2c8ea4d",
  measurementId: "G-25E64J8TE5",
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export auth and db instances
export const auth = getAuth(app);
export const db = getFirestore(app);
