// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8cHDZUEJ0QJ179SRnCFJSrifF2ZInpB0",
  authDomain: "app-viagem-43294.firebaseapp.com",
  projectId: "app-viagem-43294",
  storageBucket: "app-viagem-43294.firebasestorage.app",
  messagingSenderId: "595270350213",
  appId: "1:595270350213:web:af16d2d29c9869920c40ec",
  measurementId: "G-GH0EPDR4BX"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);