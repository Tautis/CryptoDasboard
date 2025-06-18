import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpJN7v8c2vxcjeOnFdw4JIfGGH5yYAf2s",
  authDomain: "cryptodash-f61fb.firebaseapp.com",
  projectId: "cryptodash-f61fb",
  storageBucket: "cryptodash-f61fb.firebasestorage.app",
  messagingSenderId: "1052240888504",
  appId: "1:1052240888504:web:b482c4d94bfb7ce2c8ea4d",
  measurementId: "G-25E64J8TE5",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
