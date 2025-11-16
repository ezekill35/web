// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyClIVsZ5JQOOgPYyoQvSucOACxu-oszml0",
  authDomain: "veterinaria-3f4fe.firebaseapp.com",
  projectId: "veterinaria-3f4fe",
  storageBucket: "veterinaria-3f4fe.firebasestorage.app",
  messagingSenderId: "112867202700",
  appId: "1:112867202700:web:560c6be184236b25f74da9",
  measurementId: "G-X756K1SL3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportar las funciones de Firestore
export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc };
