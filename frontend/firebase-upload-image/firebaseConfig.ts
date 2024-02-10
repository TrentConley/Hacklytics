
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCPCNit9TUbybznClzooRXNi4c9YwpKP4Y",
  authDomain: "fir-upload-file-8e06e.firebaseapp.com",
  projectId: "fir-upload-file-8e06e",
  storageBucket: "fir-upload-file-8e06e.appspot.com",
  messagingSenderId: "424323532077",
  appId: "1:424323532077:web:341467690182219d13ffa4",
  measurementId: "G-VTBJTB2L6T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage();