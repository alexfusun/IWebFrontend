import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbTM_Wpu4w7XZTuCooW93qf1wTMLBA5qA",
  authDomain: "iwebplantillaparcial.firebaseapp.com",
  projectId: "iwebplantillaparcial",
  storageBucket: "iwebplantillaparcial.firebasestorage.app",
  messagingSenderId: "274643098729",
  appId: "1:274643098729:web:cadd1284473f387d05d6f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Authentication

export { auth, onAuthStateChanged };
