        class Producto {
            constructor(nombre, cantidad, precioUnitario) {
                this.nombre = nombre;
                this.cantidad = parseInt(cantidad);
                this.precioUnitario = parseFloat(precioUnitario);
            }
        }
        
        // Verificamos si ya hay una lista en el localStorage y la obtenemos
        let listaProductos = JSON.parse(localStorage.getItem("listaProductos"));
        
        // Variable para mantener el índice del último producto listado
        let ultimoIndiceListado = 0;
        
        // Agregamos el evento para listar stock con el botón
        let btnLista = document.getElementById("btnLista")
        btnLista.addEventListener("click", listarPorBoton);
        
        // Función que lista el stock
        function listarPorBoton() {
            let lista = document.getElementById("item");
            // Comenzamos a listar desde el último índice listado
            for (let i = ultimoIndiceListado; i < listaProductos.length; i++) {
                const producto = listaProductos[i];
                lista.innerHTML += `<li>${producto.nombre} - Cantidad: ${producto.cantidad} - Precio Unitario: ${producto.precioUnitario}</li>`;
            }
            // Actualizamos el último índice listado
            ultimoIndiceListado = listaProductos.length;
        }
        
        // Agregar evento de envío al formulario
        let form = document.getElementById("form");
        form.addEventListener("submit", agregar);
        
        function agregar(event) {
            event.preventDefault(); // Previene el envío del formulario
            let nombre = document.getElementById("nombre").value;
            let cantidad = document.getElementById("cantidad").value;
            let precioUnitario = document.getElementById("precio").value;
        
            listaProductos.push(new Producto(nombre.toUpperCase(), cantidad, precioUnitario));
            localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
            //Mensaje de exito
            swal({
                title: "Producto agregado con éxito!",
                text: "Se agregó el producto: " + nombre + "- " + " Cantidad: " + cantidad + "- " + " Precio unitario: "+ precioUnitario,
                icon: "success",
                button: "Continuar",
            });
        
            form.reset(); // Reseteamos el formulario para limpiar los campos
        }
        // Boton que redirecciona al login
        document.getElementById("btnLogin").addEventListener("click",()=>{window.location = "../index.html"})