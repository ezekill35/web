// auth.js - Manejo de Firebase Authentication

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// ---------------------
// Configuración Firebase
// ---------------------
const firebaseConfig = {
    apiKey: "AIzaSyCIo7CBX5jzAGlDFBu0mMb6BFfUsecaf7I",
    authDomain: "discovery-pets.firebaseapp.com",
    databaseURL: "https://discovery-pets-default-rtdb.firebaseio.com",
    projectId: "discovery-pets",
    storageBucket: "discovery-pets.appspot.com",
    messagingSenderId: "481355972999",
    appId: "1:481355972999:web:0000000000000000000000"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ---------------------
// Verificar sesión activa
// ---------------------
onAuthStateChanged(auth, user => {
    if(user){
        // Si hay sesión activa, redirigir al dashboard
        window.location.href = "dashboard.html";
    }
});

// ---------------------
// Registro de usuario
// ---------------------
const registerForm = document.getElementById("registerForm");
const authMessage = document.getElementById("authMessage");

registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            authMessage.textContent = "¡Registro exitoso! Inicie sesión.";
            authMessage.style.color = "green";
            registerForm.reset();
        })
        .catch((error) => {
            authMessage.textContent = error.message;
            authMessage.style.color = "red";
        });
});

// ---------------------
// Login de usuario
// ---------------------
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            authMessage.textContent = "Inicio de sesión correcto";
            authMessage.style.color = "green";

            // Redirigir al dashboard después de 1 segundo
            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        })
        .catch((error) => {
            authMessage.textContent = "Error: " + error.message;
            authMessage.style.color = "red";
        });
});
