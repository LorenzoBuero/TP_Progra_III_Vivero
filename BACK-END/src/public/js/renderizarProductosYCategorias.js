const contadorCarrito = document.getElementById("cart-count");
const inputBusqueda = document.getElementById("buscador-productos");
const tarjetasCategorias = document.querySelectorAll(".tarjeta-categoria");
const contenedorProductos = document.getElementById("grid-productos-DOM");

let categoriaSeleccionada = null;
// 🛒 Actualiza contador del carrito
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const cantidad = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  contadorCarrito.textContent = cantidad;
}

//  Agrega producto al carrito
function agregarAlCarrito(productoId, nombre, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let existente = carrito.find(p => p.id == productoId);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ id: productoId, nombre, precio, imagen, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

//  Asignar eventos a botones "Agregar"
function asignarEventosBotonesAgregar() {
  const botones = document.querySelectorAll(".boton-agregar");
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const tarjeta = boton.closest(".tarjeta-producto");
      const productoId = tarjeta.getAttribute("data-id");
      const nombre = tarjeta.querySelector("p:nth-of-type(1)").textContent;
      const precioTexto = tarjeta.querySelector("p:nth-of-type(2)").textContent;
      const precio = Number(precioTexto.replace(/[^0-9.-]+/g, ""));
      const imagen = tarjeta.querySelector("img").src;

      agregarAlCarrito(productoId, nombre, precio, imagen);
    });
  });
}

//  Filtro por texto + categoría
function filtrarProductos() {
  const texto = inputBusqueda.value.toLowerCase().trim();
  const tarjetas = document.querySelectorAll(".tarjeta-producto");

  tarjetas.forEach(tarjeta => {
    const nombre = tarjeta.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
    const categoria = tarjeta.getAttribute("data-categoria");

    const coincideTexto = nombre.includes(texto);
    const coincideCategoria = categoriaSeleccionada === null || categoria == categoriaSeleccionada;

    tarjeta.style.display = (coincideTexto && coincideCategoria) ? "" : "none";
  });

  asignarEventosBotonesAgregar(); // Siempre reasignar después de filtrar
}

//  Evento click de categoría
tarjetasCategorias.forEach(tarjeta => {
  tarjeta.addEventListener("click", () => {
    tarjetasCategorias.forEach(cat => cat.classList.remove("activa"));
    tarjeta.classList.add("activa");
    categoriaSeleccionada = tarjeta.getAttribute("data-id");
    filtrarProductos();
  });
});

//  Evento input búsqueda
inputBusqueda.addEventListener("input", filtrarProductos);

//  Inicialización
actualizarContadorCarrito();
filtrarProductos();