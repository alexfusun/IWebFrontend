import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import process from 'process';

require('dotenv').config();

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
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
