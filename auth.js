// auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCIo7CBX5jzAGlDFBu0mMb6BFfUsecaf7I",
    authDomain: "discovery-pets.firebaseapp.com",
    projectId: "discovery-pets",
    storageBucket: "discovery-pets.firebasestorage.app",
    messagingSenderId: "481355972999",
    appId: "1:481355972999:web:5f5fa07f75b3fc9f4c5322",
    measurementId: "G-0WMLRY8FGM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const authMessage = document.getElementById("authMessage");

// Redirigir si sesión activa
onAuthStateChanged(auth, user => {
    if(user) window.location.href = "dashboard.html";
});

// Registro
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            authMessage.textContent = "¡Registro exitoso! Inicie sesión.";
            authMessage.style.color = "green";
            registerForm.reset();
        })
        .catch(err => {
            authMessage.textContent = err.message;
            authMessage.style.color = "red";
        });
});

// Login
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            authMessage.textContent = "Inicio de sesión correcto";
            authMessage.style.color = "green";
            setTimeout(() => window.location.href = "dashboard.html", 1000);
        })
        .catch(err => {
            authMessage.textContent = "Error: " + err.message;
            authMessage.style.color = "red";
        });
});
