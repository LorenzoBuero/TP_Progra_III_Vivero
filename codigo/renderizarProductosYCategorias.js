let categoriaSeleccionada = null;
let productosGlobal = [];
let productosVisibles = [];
let carrito = [];

const URLCategorias = "../JSON/categorias.json";
const URLProductos = "../JSON/productos.json";
const CATEGORIA_DEFAULT = 1;

// ================================
// FUNCIONES
// ================================

// Renderiza las categorías en pantalla
const renderizarCategorias = (categorias) => {
  const contenedor = document.querySelector("#categorias-grid");
  contenedor.innerHTML = "";

  categorias.forEach((categoria, index) => {
    const div = document.createElement("div");
    div.classList.add("tarjeta-categoria");
    div.innerHTML = `<img src="${categoria.imagen}" alt="${categoria.nombre}">`;

    div.addEventListener("click", () => {
      cambiarCategoria(categoria.id);

      // Quitar clase activa de todas
      document.querySelectorAll(".tarjeta-categoria").forEach(el => {
        el.classList.remove("activa");
      });

      // Agregar clase activa a la seleccionada
      div.classList.add("activa");
    });

    contenedor.appendChild(div);
  });
};

//  Cuando se hace clic en una categoría
const cambiarCategoria = (idCategoria) => {
  renderizarProductos(productosGlobal, idCategoria);
};

//  Renderiza los productos filtrados por categoría
const renderizarProductos = (productos, IDCategoria) => {
  const contenedor = document.querySelector("#product-grid");
  contenedor.innerHTML = "";

  productosVisibles = productos.filter(p => p.stock && p.categoria === IDCategoria);

  productosVisibles.forEach(producto => {
    contenedor.innerHTML += `
      <div id="prod-${producto.id}" class="tarjeta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <p>${producto.nombre}</p>
        <p><strong>$${producto.precio.toFixed(2)}</strong></p>
        <button class="boton-agregar">Agregar al carrito</button>
      </div>
    `;
  });

  // Asignar eventos a los botones
  const botonesAgregar = document.querySelectorAll(".boton-agregar");

  botonesAgregar.forEach((boton, i) => {
    boton.addEventListener("click", () => {
      const productoSeleccionado = productosVisibles[i];
      agregarAlCarrito(productoSeleccionado);
    });
  });
};

//  Función genérica para obtener JSON
const obtenerJSON = async (url) => {
  const response = await fetch(url);
  const arrayJson = await response.json();
  return arrayJson;
};

//  Función de carrito (provisoria)
function agregarAlCarrito(producto) {
  console.log("Agregado al carrito:", producto.nombre);
  // Más adelante: agregar al array de carrito y actualizar contador
  carrito.push(producto)
  console.log(carrito)
  renderizarItemsCarrito(carrito)
}

// ================================
// INICIO DEL SISTEMA
// ================================
(async () => {
  const categorias = await obtenerJSON(URLCategorias);
  productosGlobal = await obtenerJSON(URLProductos);

  renderizarCategorias(categorias);
  renderizarProductos(productosGlobal, CATEGORIA_DEFAULT);
})();

function renderizarItemsCarrito(carrito){
    itemsCarrito = document.querySelector("#cart-count");
    itemsCarrito.textContent = carrito.length;
}