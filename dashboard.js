// dashboard.js - CRUD completo con Cloud Firestore v12.4.0
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// ---------------------
// Configuración Firebase
// ---------------------
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
const db = getFirestore(app);
const auth = getAuth(app);

// ---------------------
// Logout
// ---------------------
document.getElementById("logoutBtn").addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "index.html";
});

// ---------------------
// Verificar sesión activa
// ---------------------
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
// Función para crear fila con editar/eliminar
// ---------------------
function crearFilaFirestore(id, datos, tablaId, campos, coleccion){
    const tabla = document.getElementById(tablaId);
    const tr = document.createElement("tr");

    campos.forEach(campo => {
        const td = document.createElement("td");
        td.textContent = datos[campo] || "";
        tr.appendChild(td);
    });

    // Acciones
    const tdAcciones = document.createElement("td");

    // Botón Editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "btn btn-warning btn-sm me-1";
    btnEditar.addEventListener("click", () => editarDocumento(coleccion, id, datos));
    tdAcciones.appendChild(btnEditar);

    // Botón Eliminar
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "btn btn-danger btn-sm";
    btnEliminar.addEventListener("click", async () => {
        await deleteDoc(doc(db, coleccion, id));
    });
    tdAcciones.appendChild(btnEliminar);

    tr.appendChild(tdAcciones);
    tabla.appendChild(tr);
}

// ---------------------
// Función para editar documento
// ---------------------
function editarDocumento(coleccion, id, datos){
    // Llenar formulario con los datos existentes
    if(coleccion === "proveedores"){
        document.getElementById("rucProv").value = datos.ruc;
        document.getElementById("nombreProv").value = datos.nombre;
        document.getElementById("productoProv").value = datos.producto;
        document.getElementById("direccionProv").value = datos.direccion;

        // Cambiar botón agregar por actualizar
        const btn = document.querySelector("#formProveedor button");
        btn.textContent = "Actualizar";
        btn.onclick = async (e) => {
            e.preventDefault();
            await updateDoc(doc(db, "proveedores", id), {
                ruc: document.getElementById("rucProv").value,
                nombre: document.getElementById("nombreProv").value,
                producto: document.getElementById("productoProv").value,
                direccion: document.getElementById("direccionProv").value
            });
            btn.textContent = "Agregar";
            btn.onclick = null;
            document.getElementById("formProveedor").reset();
        };
    }

    // Similar para facturas y gastos...
    if(coleccion === "facturas"){
        document.getElementById("proveedorFactura").value = datos.proveedor;
        document.getElementById("tipoFactura").value = datos.tipo;
        document.getElementById("montoFactura").value = datos.monto;
        document.getElementById("monedaFactura").value = datos.moneda;
        document.getElementById("fechaFactura").value = datos.fecha;
        document.getElementById("descFactura").value = datos.desc;

        const btn = document.querySelector("#formFactura button");
        btn.textContent = "Actualizar";
        btn.onclick = async (e) => {
            e.preventDefault();
            await updateDoc(doc(db, "facturas", id), {
                proveedor: document.getElementById("proveedorFactura").value,
                tipo: document.getElementById("tipoFactura").value,
                monto: document.getElementById("montoFactura").value,
                moneda: document.getElementById("monedaFactura").value,
                fecha: document.getElementById("fechaFactura").value,
                desc: document.getElementById("descFactura").value
            });
            btn.textContent = "Agregar";
            btn.onclick = null;
            document.getElementById("formFactura").reset();
        };
    }

    if(coleccion === "gastos"){
        document.getElementById("nombreGasto").value = datos.nombre;
        document.getElementById("tipoGasto").value = datos.tipo;
        document.getElementById("montoGasto").value = datos.monto;
        document.getElementById("fechaGasto").value = datos.fecha;

        const btn = document.querySelector("#formGasto button");
        btn.textContent = "Actualizar";
        btn.onclick = async (e) => {
            e.preventDefault();
            await updateDoc(doc(db, "gastos", id), {
                nombre: document.getElementById("nombreGasto").value,
                tipo: document.getElementById("tipoGasto").value,
                monto: document.getElementById("montoGasto").value,
                fecha: document.getElementById("fechaGasto").value
            });
            btn.textContent = "Agregar";
            btn.onclick = null;
            document.getElementById("formGasto").reset();
        };
    }
}

// ---------------------
// CRUD PROVEEDORES
// ---------------------
const formProveedor = document.getElementById("formProveedor");
formProveedor.addEventListener("submit", async e => {
    e.preventDefault();
    const ruc = document.getElementById("rucProv").value;
    const nombre = document.getElementById("nombreProv").value;
    const producto = document.getElementById("productoProv").value;
    const direccion = document.getElementById("direccionProv").value;

    await addDoc(collection(db, "proveedores"), { ruc, nombre, producto, direccion });
    formProveedor.reset();
});

// Actualizar tabla en tiempo real
onSnapshot(collection(db, "proveedores"), snapshot => {
    const tabla = document.getElementById("tablaProveedores");
    tabla.innerHTML = "";
    snapshot.forEach(docu => {
        crearFilaFirestore(docu.id, docu.data(), "tablaProveedores", ["ruc","nombre","producto","direccion"], "proveedores");
    });
});

// ---------------------
// CRUD FACTURAS
// ---------------------
const formFactura = document.getElementById("formFactura");
formFactura.addEventListener("submit", async e => {
    e.preventDefault();
    const proveedor = document.getElementById("proveedorFactura").value;
    const tipo = document.getElementById("tipoFactura").value;
    const monto = document.getElementById("montoFactura").value;
    const moneda = document.getElementById("monedaFactura").value;
    const fecha = document.getElementById("fechaFactura").value;
    const desc = document.getElementById("descFactura").value;

    await addDoc(collection(db, "facturas"), { proveedor, tipo, monto, moneda, fecha, desc });
    formFactura.reset();
});

onSnapshot(collection(db, "facturas"), snapshot => {
    const tabla = document.getElementById("tablaFacturas");
    tabla.innerHTML = "";
    snapshot.forEach(docu => {
        crearFilaFirestore(docu.id, docu.data(), "tablaFacturas", ["proveedor","tipo","monto","fecha","desc"], "facturas");
    });
});

// ---------------------
// CRUD GASTOS
// ---------------------
const formGasto = document.getElementById("formGasto");
formGasto.addEventListener("submit", async e => {
    e.preventDefault();
    const nombre = document.getElementById("nombreGasto").value;
    const tipo = document.getElementById("tipoGasto").value;
    const monto = document.getElementById("montoGasto").value;
    const fecha = document.getElementById("fechaGasto").value;

    await addDoc(collection(db, "gastos"), { nombre, tipo, monto, fecha });
    formGasto.reset();
});

onSnapshot(collection(db, "gastos"), snapshot => {
    const tabla = document.getElementById("tablaGastos");
    tabla.innerHTML = "";
    snapshot.forEach(docu => {
        crearFilaFirestore(docu.id, docu.data(), "tablaGastos", ["nombre","tipo","monto","fecha"], "gastos");
    });
});

