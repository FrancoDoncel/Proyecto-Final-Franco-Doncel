// Variable para almacenar productos del archivo JSON
let productosDesdeJSON = [];

// Listar productos desde el archivo JSON
document.getElementById("btnLista").addEventListener("click", listarDesdeJSON);

function listarDesdeJSON() {
    const lista = document.querySelector('#item');
    lista.innerHTML = ''; // Limpiamos la lista antes de agregar los elementos

    fetch('../Js/stock.json')
        .then((res) => res.json())
        .then((data) => {
            productosDesdeJSON = data;
            data.forEach((producto) => {
                lista.innerHTML += `<li>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio Unitario: ${producto.precioUnitario}</li>`;
            });
        });
}

// Actualizar stock con productos del Local Storage
document.getElementById("btnActualizar").addEventListener("click", actualizarStock);

function actualizarStock() {
    const lista = document.querySelector('#item');
    lista.innerHTML = ''; // Limpiamos la lista antes de agregar los elementos
    
    // Listar productos desde el archivo JSON
    productosDesdeJSON.forEach((producto) => {
        lista.innerHTML += `<li>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio Unitario: ${producto.precioUnitario}</li>`;
    });

    // Listar productos desde el Local Storage sin repetir
    let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

    if (listaProductos) {
        listaProductos.forEach((producto) => {
            // Verificamos si el producto no está en la lista del archivo JSON
            if (!productosDesdeJSON.some((p) => p.nombre === producto.nombre)) {
                lista.innerHTML += `<li>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio Unitario: ${producto.precioUnitario}</li>`;
            }
        });
    }
}

// Redireccionar a la página de presupuesto
document.getElementById("btnPresupuesto").addEventListener("click", () => {
    window.location = "presupuesto.html";
});

// Botón que redirecciona al login
document.getElementById("btnLogin").addEventListener("click", () => {
    window.location = "../index.html";
});

