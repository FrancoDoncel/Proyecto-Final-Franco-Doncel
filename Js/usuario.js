class Empleado {
    constructor(usuario, password, estado) {
        this.usuario = usuario;
        this.password = password;
        this.estado = estado;
    }
}

const arrayEmpleado = [
    new Empleado("vendedor1000", "1234", "vendedor"),
    new Empleado("vendedor2000", "5678", "supervisor"),
];

    let btn = document.getElementById("btnlog");
    btn.addEventListener("click", comparaUsuario);

    function comparaUsuario() {
        let usser = document.getElementById("usuario").value;
        let pass = document.getElementById("password").value;
        let encontrado = false;
        let estado;
    
        for (let i = 0; i < arrayEmpleado.length; i++) {
            if (usser === arrayEmpleado[i].usuario && pass === arrayEmpleado[i].password) {
                encontrado = true;
                estado = arrayEmpleado[i].estado;
                break;
            }
        }
        encontrado
            ?(alert("¡Bienvenido! " + usser),
                estado === "vendedor"
                    ? (window.location = "Pages/vendedor.html")
                    : estado === "supervisor"
                    ? (window.location = "Pages/supervisor.html")
                    : null)
            : alert("Usuario o contraseña incorrectos.");
    }

/*===========================================Carga de datos en el localstorage============================================*/

class Producto {
    constructor(nombre, cantidad, precioUnitario) {
        this.nombre = nombre;
        this.cantidad = parseInt(cantidad);
        this.precioUnitario = parseFloat(precioUnitario);
    }
}

let arrayProducto = [
    new Producto("REMERA", "1000", "9000"),
    new Producto("BUZO", "1023", "23000"),
    new Producto("CAMPERA", "963", "45000"),
    new Producto("CAMISA", "562", "16000"),
    new Producto("PANTALON", "2560", "20000"),
    new Producto("ZAPATILLA", "300", "70000")
];

// Verificamos si ya hay una lista en el localStorage
if (!localStorage.getItem("listaProductos")) {
    // Si no existe, almacenamos el arreglo en el LocalStorage
    localStorage.setItem("listaProductos", JSON.stringify(arrayProducto));
}

