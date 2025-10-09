// script.js - Animaciones y UX para index.html

// ----------------------
// Animaciones de enfoque en inputs
// ----------------------
const inputs = document.querySelectorAll("input");
inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.style.boxShadow = "0 0 8px 2px rgba(13,110,253,0.5)";
        input.style.borderColor = "#0d6efd";
        input.style.transition = "all 0.3s ease";
    });
    input.addEventListener("blur", () => {
        input.style.boxShadow = "inset 0 2px 5px rgba(0,0,0,0.1)";
        input.style.borderColor = "#ccc";
    });
});

// ----------------------
// Animación de tarjeta login 3D al mover el mouse
// ----------------------
const loginCard = document.querySelector(".login-card");
document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    loginCard.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
});

document.addEventListener("mouseleave", () => {
    loginCard.style.transform = "rotateY(0deg) rotateX(0deg)";
});

// ----------------------
// Mensaje de bienvenida al cargar la página
// ----------------------
window.addEventListener("load", () => {
    const msg = document.getElementById("authMessage");
    if(msg) {
        msg.textContent = "Bienvenido! Inicie sesión o regístrese.";
        msg.style.color = "#0d6efd";
        msg.style.transition = "all 0.5s ease";
    }
});

// ----------------------
// Validaciones simples extra
// ----------------------
function validarEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Opcional: animación de botón al hacer click
const buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("mousedown", () => {
        btn.style.transform = "scale(0.95)";
    });
    btn.addEventListener("mouseup", () => {
        btn.style.transform = "scale(1)";
        btn.style.transition = "transform 0.1s ease";
    });
});
