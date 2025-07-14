let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarYagregarAlCarrito(numero, indice) {
  const producto = carrito[indice];

  if (numero === -1 && producto.cantidad === 1) {
    // Si se quiere restar y la cantidad es 1, se elimina
    let nuevoCarrito = [];
    for (let j = 0; j < carrito.length; j++) {
      if (j !== indice) {
        nuevoCarrito[nuevoCarrito.length] = carrito[j];
      }
    }
    carrito = nuevoCarrito;
  } else {
    // En cualquier otro caso, sumamos/restamos
    producto.cantidad = producto.cantidad + numero;
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
    botonAgregar.textContent = "+1";

    // Eventos de botones
    botonEliminar.addEventListener("click", eliminarYagregarAlCarrito.bind(this, -1, i));
    botonAgregar.addEventListener("click", eliminarYagregarAlCarrito.bind(this, 1, i));

    li.appendChild(nombre);
    li.appendChild(info);
    li.appendChild(botonEliminar);
    li.appendChild(botonAgregar);
    lista.appendChild(li);
  }

  totalSpan.textContent = total.toFixed(2);
  contador.textContent = cantidadTotal;
}

// Confirmar compra
const btnConfirmar = document.getElementById("btn-confirmar-compra");
btnConfirmar.addEventListener("click", function () {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  confirmarCompra();
});

// Vaciar carrito
const btnVaciar = document.getElementById("btn-vaciar-carrito");
btnVaciar.addEventListener("click", function () {
  const confirmar = confirm("¿Estás seguro que querés vaciar el carrito?");
  if (confirmar) {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  }
});

// Función para confirmar compra y enviar a backend
async function confirmarCompra() {
  const comprador = localStorage.getItem("nombreUsuario") || "Anónimo";
  const productos = carrito.map(p => ({
    idProducto: p.id,
    cantidad: p.cantidad
  }));

  if (productos.length === 0) {
    alert("No hay productos en el carrito para comprar.");
    return;
  }

  try {
    console.log("➡️ Enviando a backend:", { comprador, productos });
    const res = await fetch("/ventas/confirmar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comprador, productos })
    });

    if (!res.ok) throw new Error("Error al confirmar compra");

    const data = await res.json();
    alert("Compra guardada con éxito. Número de venta: " + data.ventaId);

    // Generar ticket
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
      total = total + carrito[i].precio * carrito[i].cantidad;
    }

    const ticket = {
      cliente: comprador,
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total: total
    };

    localStorage.setItem("ticket", JSON.stringify(ticket));

    // Vaciar carrito
    localStorage.removeItem("carrito");

    // Redirigir a la página del ticket
    window.location.href = "/ticket";
  } catch (error) {
    alert("Error al guardar la compra.");
    console.error(error);
  }
}

// Render inicial
renderizarCarrito();
