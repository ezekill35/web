// script.js
// ------------------------
// Animaciones 3D y UX
// ------------------------

// Función para aplicar efecto 3D a un elemento
function efecto3D(elemento) {
    elemento.addEventListener('mousemove', e => {
        const rect = elemento.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = -(y - centerY) / 20;
        const rotateY = (x - centerX) / 20;
        elemento.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    elemento.addEventListener('mouseleave', () => {
        elemento.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}

// Aplicar efecto 3D a login card
const loginCard = document.querySelector('.login-card');
if(loginCard) efecto3D(loginCard);

// Aplicar efecto 3D a dashboard
document.querySelectorAll('.sidebar, .main-content, form, table').forEach(el => {
    efecto3D(el);
});

// ------------------------
// Animaciones adicionales (hover) para botones
// ------------------------
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 8px 15px rgba(0,0,0,0.3)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0px)';
        btn.style.boxShadow = '0 5px 10px rgba(0,0,0,0.2)';
    });
});

// ------------------------
// Animación suave de enfoque en inputs
// ------------------------
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 8px rgba(255, 26, 198, 0.7)';
        input.style.borderColor = '#ff1ac6';
        input.style.transition = 'all 0.3s ease';
    });
    input.addEventListener('blur', () => {
        input.style.boxShadow = 'inset 0 2px 5px rgba(0,0,0,0.1)';
        input.style.borderColor = '#ccc';
    });
});

