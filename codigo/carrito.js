// Codigo previsorio



// ================================
// VARIABLES GLOBALES
// ================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ================================
// FUNCIONES
// ================================

const renderizarCarrito = () => {
  const lista = document.getElementById("cart-items");
  const totalSpan = document.getElementById("cart-total");
  const contador = document.getElementById("cart-count");

  lista.innerHTML = "";
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement("li");
    li.classList.add("item-block");

    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;
    cantidadTotal += producto.cantidad;

    li.innerHTML = `
      <span class="item-name">${producto.nombre}</span>
      <span class="info-carrito">Precio: $${producto.precio.toFixed(2)} | Cantidad: ${producto.cantidad}</span>
      <button class="delete-button" data-index="${index}">Eliminar</button>
    `;

    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
  contador.textContent = cantidadTotal;

  // Botones de eliminar
  document.querySelectorAll(".delete-button").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;
      carrito.splice(index, 1);
      guardarCarrito();
      renderizarCarrito();
    });
  });
};

const guardarCarrito = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

// ================================
// BOTONES
// ================================

document.getElementById("btn-confirmar-compra").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  const nombre = localStorage.getItem("nombreUsuario") || "Cliente";

  // Guardar ticket en storage
  const ticket = {
    cliente: nombre,
    fecha: new Date().toLocaleString(),
    productos: carrito,
    total: carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0),
  };

  localStorage.setItem("ticket", JSON.stringify(ticket));
  localStorage.removeItem("carrito");

  
});

document.getElementById("btn-vaciar-carrito").addEventListener("click", () => {
  if (confirm("¿Estás seguro que querés vaciar el carrito?")) {
    carrito = [];
    guardarCarrito();
    renderizarCarrito();
  }
});

// ================================
// INICIO
// ================================
document.addEventListener("DOMContentLoaded", renderizarCarrito);