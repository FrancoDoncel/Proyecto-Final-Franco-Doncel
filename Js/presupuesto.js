// Obtener el formulario de presupuesto
let formP = document.getElementById("formP");
// Agregar un evento al enviar el formulario para agregar un presupuesto
formP.addEventListener("submit", agregarPresupuesto);

// Verificar si ya existe una lista de presupuesto en el local storage y obtenerla
let listaPresupuesto = JSON.parse(localStorage.getItem("listaPresupuesto"));

// Si no hay una lista de presupuesto en el local storage, crear una vacía
if (!listaPresupuesto) {
    listaPresupuesto = [];
    localStorage.setItem("listaPresupuesto", JSON.stringify(listaPresupuesto));
}

// Obtener la lista de productos desde el local storage
let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));

// Inicializar el acumulador para el total del presupuesto
let acumulador = 0;

// Función para agregar un presupuesto
function agregarPresupuesto(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    // Obtener elementos del formulario
    let listaP = document.getElementById("itemP");
    let nombreP = document.getElementById("nombreP").value.toUpperCase();
    let cantidadP = parseInt(document.getElementById("cantidadP").value);
    let precioP = 0;
    let estado = false;

    // Buscar el producto en la lista de productos
    for (let i = 0; i < listaProductos.length; i++) {
        if (nombreP === listaProductos[i].nombre) {
            precioP = listaProductos[i].precioUnitario;
            estado = true;
            break;
        }
    }

    if (estado) {
        let total = precioP * cantidadP;
        acumulador += total;

        // Mostrar mensaje de éxito
        swal({
            title: "Producto agregado con éxito!",
            text: "Se agregó el producto: " + nombreP + " por: " + cantidadP + " unidad/es al carrito",
            icon: "success",
            button: "Continuar",
        });

        // Agregar el producto al carrito de presupuesto
        listaPresupuesto.push({"nombre": nombreP, "cantidad": cantidadP, "total": total});
        localStorage.setItem("listaPresupuesto", JSON.stringify(listaPresupuesto));

        // Crear un elemento <li> con los datos del producto y agregarlo a la lista
        const li = document.createElement('li');
        li.textContent = `${nombreP} - Cantidad: ${cantidadP} - Total: ${total}`;
        listaP.appendChild(li);

        // Resetea el formulario
        formP.reset();
        return acumulador;
    } else {
        // Mostrar mensaje de error si el producto no se encuentra en la base de datos
        swal({
            title: "Error!",
            text: "El producto no se encuentra en la base de datos!",
            icon: "error",
            button: "Continuar",
        });
    }
}

// Obtener el botón que muestra el total del presupuesto
let btnTotal = document.getElementById("btnTotal");
// Agregar un evento al hacer clic en el botón para finalizar el presupuesto
btnTotal.addEventListener("click", finalizaPresupuesto);

// Función para finalizar el presupuesto
function finalizaPresupuesto(){
    // Preguntar al usuario si desea finalizar el presupuesto
    swal({
        title: "¿Desea finalizar el presupuesto?",
        text: "Si continúa no podrá agregar más productos al presupuesto!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            // Mostrar el total a pagar
            swal("Presupuesto creado con éxito! Total a pagar: " + acumulador, {
                icon: "success",
            });
        }
    });
}

// Botón que redirecciona al login
document.getElementById("btnLogin").addEventListener("click", () => { window.location = "../index.html" });
