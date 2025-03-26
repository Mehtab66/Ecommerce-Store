// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMTEDcgQ8dFGefsgqvdvWbqT9dYvDzgjo",
  authDomain: "ecomercestore-86b60.firebaseapp.com",
  projectId: "ecomercestore-86b60",
  storageBucket: "ecomercestore-86b60.firebasestorage.app",
  messagingSenderId: "178550837525",
  appId: "1:178550837525:web:2e93cacf70865b483a591c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)