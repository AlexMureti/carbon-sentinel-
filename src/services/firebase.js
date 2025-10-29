// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVkxcOqdwBBpOkzYLnlJNkLYMti01b2sg",
  authDomain: "carbon-sentinel.firebaseapp.com",
  projectId: "carbon-sentinel",
  storageBucket: "carbon-sentinel.firebasestorage.app",
  messagingSenderId: "1069720577901",
  appId: "1:1069720577901:web:c415a5df90e23ca1891c64",
  measurementId: "G-0HBK503Y55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize services
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const db = getFirestore(app);
