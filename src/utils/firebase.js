// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0nV39Zsk4KEQKkZDLvTjjWdN_8cp5B8E",
  authDomain: "projectmanagement-6bc08.firebaseapp.com",
  projectId: "projectmanagement-6bc08",
  storageBucket: "projectmanagement-6bc08.appspot.com",
  messagingSenderId: "685987263203",
  appId: "1:685987263203:web:1a578ab42e5511c6650bd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth instance
export const auth = getAuth(app);
