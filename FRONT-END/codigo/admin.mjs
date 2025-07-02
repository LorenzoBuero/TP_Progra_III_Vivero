let categoriaSeleccionada = null;
let productosGlobal = [];
let productosVisibles = [];


const URLCategorias = "../JSON/categorias.json";
const URLProductos = "../JSON/productos.json";
const CATEGORIA_DEFAULT = 1;

// ================================
// FUNCIONES
// ================================

// Renderiza las categorías en pantalla
function renderizarCategorias(categorias) {
  const contenedor = document.querySelector("#grid-categorias-DOM");
  contenedor.innerHTML = "";

  for (let i = 0; i < categorias.length; i++) {
    const categoria = categorias[i];
    const div = document.createElement("div");
    div.classList.add("tarjeta-categoria");
    div.innerHTML = `<img src="${categoria.imagen}" alt="${categoria.nombre}">`;

    div.addEventListener("click", function () {
      categoriaSeleccionada = categoria.id;
      cambiarCategoria(categoria.id);

      const todas = document.querySelectorAll(".tarjeta-categoria");
      for (let j = 0; j < todas.length; j++) {
        todas[j].classList.remove("activa");
      }

      div.classList.add("activa");
    });

    contenedor.appendChild(div);
  }
}

// Cambia la categoría actual
function cambiarCategoria(idCategoria) {
  renderizarProductos(productosGlobal, idCategoria);
}

// Renderiza los productos de una categoría
function renderizarProductos(productos, IDCategoria) {
  const contenedor = document.querySelector("#grid-productos-DOM");
  contenedor.innerHTML = "";

  productosVisibles = [];

  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];
    if (producto.stock === true && producto.categoria === IDCategoria) {
      productosVisibles[productosVisibles.length] = producto;

      contenedor.innerHTML += `
        <div class="tarjeta-producto">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <p>${producto.nombre}</p>
          <p><strong>$${producto.precio}</strong></p>
          <button class="boton-agregar boton verde">Editar</button>
        </div>
      `;
    }
  }

  const botonesEditar = document.querySelectorAll(".boton-agregar");

  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].addEventListener("click", function () {
      window.location.href = "crud.html";
    });
  }
}

// Obtiene un JSON desde una URL
async function obtenerJSON(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}



// Filtra productos por nombre
function buscarProductosPorNombre(texto) {
  const textoBuscado = texto.toLowerCase();
  let productosBarraNavegacion = [];

  for (let i = 0; i < productosVisibles.length; i++) {
    if (productosVisibles[i].nombre.toLowerCase().includes(textoBuscado)) {
      productosBarraNavegacion[productosBarraNavegacion.length] = productosVisibles[i];
    }
  }

  const contenedor = document.querySelector("#grid-productos-DOM");
  contenedor.innerHTML = "";

  for (let i = 0; i < productosBarraNavegacion.length; i++) {
    const producto = productosBarraNavegacion[i];
    contenedor.innerHTML += `
      <div class="tarjeta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.nombre}</p>
        <p><strong>$${producto.precio}</strong></p>
        <button class="boton-agregar boton verde">Agregar al carrito</button>
      </div>
    `;
  }

  const botones = document.querySelectorAll(".boton-agregar");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function () {
      agregarAlCarrito(productosBarraNavegacion[i]);
    });
  }
}

// Evento para la barra de búsqueda
const inputBusqueda = document.getElementById("buscador-productos");

inputBusqueda.addEventListener("input", function () {
  const texto = inputBusqueda.value;

  let tieneCaracter = false;
  for (let i = 0; i < texto.length; i++) {
    if (texto[i] !== " ") {
      tieneCaracter = true;
    }
  }

  if (tieneCaracter === true) {
    buscarProductosPorNombre(texto);
  } else {
    renderizarProductos(productosGlobal, categoriaSeleccionada || CATEGORIA_DEFAULT);
  }
});

// ================================
// INICIO DEL SISTEMA
// ================================

async function iniciarAplicacion() {
  const categorias = await obtenerJSON(URLCategorias);
  productosGlobal = await obtenerJSON(URLProductos);
  console.log("productos cargados")

  renderizarCategorias(categorias);
  renderizarProductos(productosGlobal, CATEGORIA_DEFAULT);
  actualizarContadorCarrito();
}

// Llamar al inicio
iniciarAplicacion();