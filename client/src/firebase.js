// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "gaj-7971b.firebaseapp.com",
  projectId: "gaj-7971b",
  storageBucket: "gaj-7971b.firebasestorage.app",
  messagingSenderId: "645641848906",
  appId: "1:645641848906:web:2985216b93981e0bb8beb3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);