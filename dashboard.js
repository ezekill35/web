// dashboard.js - CRUD completo y Firebase Realtime Database

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

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
const db = getDatabase(app);
const auth = getAuth(app);

// ---------------------
// Logout
// ---------------------
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
});

// Verificar sesión activa
onAuthStateChanged(auth, user => {
    if(!user){
        window.location.href = "index.html";
    }
});

// ---------------------
// Navegación de secciones
// ---------------------
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".content-section");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const sectionId = btn.dataset.section;
        sections.forEach(sec => sec.classList.remove("active"));
        document.getElementById(sectionId).classList.add("active");
    });
});

// ---------------------
// Funciones genéricas
// ---------------------
function crearFila(id, datos, tablaId, campos) {
    const tabla = document.getElementById(tablaId);
    const tr = document.createElement("tr");
    campos.forEach(campo => {
        const td = document.createElement("td");
        td.textContent = datos[campo] || "";
        tr.appendChild(td);
    });

    // Botón eliminar
    const tdAcciones = document.createElement("td");
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn btn-danger btn-sm";
    btnEliminar.addEventListener("click", () => {
        remove(ref(db, `${tablaId}/${id}`));
    });
    tdAcciones.appendChild(btnEliminar);
    tr.appendChild(tdAcciones);

    tabla.appendChild(tr);
}

// ---------------------
// CRUD PROVEEDORES
// ---------------------
const formProveedor = document.getElementById("formProveedor");
formProveedor.addEventListener("submit", e => {
    e.preventDefault();
    const ruc = document.getElementById("rucProv").value;
    const nombre = document.getElementById("nombreProv").value;
    const producto = document.getElementById("productoProv").value;
    const direccion = document.getElementById("direccionProv").value;

    push(ref(db, "tablaProveedores"), { ruc, nombre, producto, direccion });

    formProveedor.reset();
});

// Escuchar cambios
onValue(ref(db, "tablaProveedores"), snapshot => {
    const tabla = document.getElementById("tablaProveedores");
    tabla.innerHTML = "";
    const proveedores = snapshot.val();
    if(proveedores){
        Object.keys(proveedores).forEach(id => {
            crearFila(id, proveedores[id], "tablaProveedores", ["ruc","nombre","producto","direccion"]);
        });
        actualizarSelectProveedores(proveedores);
    }
});

// ---------------------
// Actualizar select de proveedores en facturas
// ---------------------
function actualizarSelectProveedores(proveedores){
    const select = document.getElementById("proveedorFactura");
    select.innerHTML = "";
    Object.values(proveedores).forEach(p => {
        const option = document.createElement("option");
        option.value = p.nombre;
        option.textContent = p.nombre;
        select.appendChild(option);
    });
}

// ---------------------
// CRUD FACTURAS
// ---------------------
const formFactura = document.getElementById("formFactura");
formFactura.addEventListener("submit", e => {
    e.preventDefault();
    const proveedor = document.getElementById("proveedorFactura").value;
    const tipo = document.getElementById("tipoFactura").value;
    const monto = document.getElementById("montoFactura").value;
    const moneda = document.getElementById("monedaFactura").value;
    const fecha = document.getElementById("fechaFactura").value;
    const desc = document.getElementById("descFactura").value;

    push(ref(db, "tablaFacturas"), { proveedor, tipo, monto, moneda, fecha, desc });

    formFactura.reset();
});

onValue(ref(db, "tablaFacturas"), snapshot => {
    const tabla = document.getElementById("tablaFacturas");
    tabla.innerHTML = "";
    const facturas = snapshot.val();
    if(facturas){
        Object.keys(facturas).forEach(id => {
            crearFila(id, facturas[id], "tablaFacturas", ["proveedor","tipo","monto","fecha","desc"]);
        });
    }
});

// ---------------------
// CRUD GASTOS
// ---------------------
const formGasto = document.getElementById("formGasto");
formGasto.addEventListener("submit", e => {
    e.preventDefault();
    const nombre = document.getElementById("nombreGasto").value;
    const tipo = document.getElementById("tipoGasto").value;
    const monto = document.getElementById("montoGasto").value;
    const fecha = document.getElementById("fechaGasto").value;

    push(ref(db, "tablaGastos"), { nombre, tipo, monto, fecha });

    formGasto.reset();
});

onValue(ref(db, "tablaGastos"), snapshot => {
    const tabla = document.getElementById("tablaGastos");
    tabla.innerHTML = "";
    const gastos = snapshot.val();
    if(gastos){
        Object.keys(gastos).forEach(id => {
            crearFila(id, gastos[id], "tablaGastos", ["nombre","tipo","monto","fecha"]);
        });
    }
});
