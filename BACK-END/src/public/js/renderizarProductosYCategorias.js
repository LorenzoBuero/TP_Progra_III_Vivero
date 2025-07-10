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

// Agrega producto al carrito
function agregarAlCarrito(productoId, nombre, precio, imagen) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let existente = null;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id == productoId) {
      existente = carrito[i];
      break;
    }
  }

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ id: productoId, nombre, precio, imagen, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// Asignar eventos a botones "Agregar" sin acumular
function asignarEventosBotonesAgregar() {
  const botones = document.querySelectorAll(".boton-agregar");

  for (let i = 0; i < botones.length; i++) {
    botones[i].onclick = function () {
      const tarjeta = this.closest(".tarjeta-producto");
      const productoId = tarjeta.getAttribute("data-id");
      const imagen = tarjeta.querySelector("img").src;

      const parrafos = tarjeta.querySelectorAll("p");
      const nombre = parrafos[0].textContent;
      const precioTexto = parrafos[1].textContent;
      const partes = precioTexto.split("$");

      let precio = 0;
      if (partes.length === 2) {
        precio = Number(partes[1]);
      }

      agregarAlCarrito(productoId, nombre, precio, imagen);
    };
  }
}

// Filtro por texto + categoría
function filtrarProductos() {
  const texto = inputBusqueda.value.toLowerCase().trim();
  const tarjetas = document.querySelectorAll(".tarjeta-producto");

  for (let i = 0; i < tarjetas.length; i++) {
    const tarjeta = tarjetas[i];
    const nombre = tarjeta.querySelector("p").textContent.toLowerCase();
    const categoria = tarjeta.getAttribute("data-categoria");

    const coincideTexto = nombre.indexOf(texto) !== -1;

    // Convertir ambos a string para comparar correctamente
    const coincideCategoria =
      categoriaSeleccionada === null || categoriaSeleccionada === "" // si no hay selección, mostrar todo
        ? true
        : String(categoria) === String(categoriaSeleccionada);

    tarjeta.style.display = coincideTexto && coincideCategoria ? "" : "none";
  }

  asignarEventosBotonesAgregar();
}

// Evento click de categoría
for (let i = 0; i < tarjetasCategorias.length; i++) {
  tarjetasCategorias[i].addEventListener("click", function () {
    // Si ya estaba activa, desactivar el filtro
    if (this.classList.contains("activa")) {
      this.classList.remove("activa");
      categoriaSeleccionada = null;
    } else {
      // Desactivar todas las demás
      for (let j = 0; j < tarjetasCategorias.length; j++) {
        tarjetasCategorias[j].classList.remove("activa");
      }
      this.classList.add("activa");
      categoriaSeleccionada = this.getAttribute("data-id");
    }
    filtrarProductos();
  });
}

// Evento input búsqueda
inputBusqueda.addEventListener("input", filtrarProductos);

// Inicialización
actualizarContadorCarrito();
filtrarProductos();