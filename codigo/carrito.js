let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarYagregarAlCarrito(numero, indice){

        if (carrito[indice].cantidad >= 1) {
          
          carrito[indice].cantidad = carrito[indice].cantidad + numero;
        } else {
          // armamos un nuevo array sin ese elemento
          let nuevoCarrito = [];
          for (let j = 0; j < carrito.length; j++) {
            if (j !== indice) {
              nuevoCarrito[nuevoCarrito.length] = carrito[j];
            }
          }
          carrito = nuevoCarrito;
        }

        guardarCarrito();
        renderizarCarrito();
      }



function renderizarCarrito() {
  const lista = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");
  const contador = document.getElementById("cart-count");

  lista.innerHTML = "";
  let total = 0;
  let cantidadTotal = 0;

  for (let i = 0; i < carrito.length; i++) {

    const producto = carrito[i];
    const li = document.createElement("li");
    li.className = "item-block";

    let subtotal = producto.precio * producto.cantidad;
    total = total + subtotal;
    cantidadTotal = cantidadTotal + producto.cantidad;

    const nombre = document.createElement("span");
    nombre.className = "item-name";
    nombre.textContent = producto.nombre;

    const info = document.createElement("span");
    info.className = "info-carrito";
    info.textContent = "Precio: $" + producto.precio + " | Cantidad: " + producto.cantidad;

    const botonEliminar = document.createElement("button");
    botonEliminar.className = "delete-button boton rojo";
    botonEliminar.textContent = "Eliminar";

    const botonAgregar = document.createElement("button");
    botonAgregar.className = "agregar-button boton verde";
    botonAgregar.textContent = "+1"


    // variable i directamente 
    botonEliminar.addEventListener("click", (eliminarYagregarAlCarrito.bind(this, -1, i)), i);

    botonAgregar.addEventListener("click", (eliminarYagregarAlCarrito.bind(this, 1, i)), i)
  ;

    li.appendChild(nombre);
    li.appendChild(info);
    li.appendChild(botonEliminar);
    li.appendChild(botonAgregar);
    lista.appendChild(li);
  }

  totalSpan.textContent = + total;
  contador.textContent = cantidadTotal;
}

// Confirmar compra
const btnConfirmar = document.getElementById("btn-confirmar-compra");
btnConfirmar.addEventListener("click", function() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const nombre = localStorage.getItem("nombreUsuario");
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total = total + carrito[i].precio * carrito[i].cantidad;
  }

  const ticket = {
    cliente: nombre || "Cliente",
    fecha: new Date().toLocaleString(),
    productos: carrito,
    total: total
  };

  localStorage.setItem("ticket", JSON.stringify(ticket));
  localStorage.removeItem("carrito");

  // Redirige a ticket 
  window.location.href = "ticket.html";
});

// Vaciar carrito
const btnVaciar = document.getElementById("btn-vaciar-carrito");
btnVaciar.addEventListener("click", function() {
  const confirmar = confirm("¿Estás seguro que querés vaciar el carrito?");
  if (confirmar) {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  }
});

// Llamamos directamente
renderizarCarrito();