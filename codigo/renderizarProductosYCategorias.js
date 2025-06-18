
/*
//TODO EL CODIGO DE ESTE ARCHIVO ES RECONTRA PROVISIONAL

//PONE LAS CATEGORIAS EN PANTALLA JUNTO A SU EVENTO DE ONCLICK
let categoriaSeleccionada = null;

const renderizarCategorias = (categorias) => {
    const contenedor = document.querySelector("#categorias-grid");
    contenedor.innerHTML = "";

    categorias.forEach(categoria => {
        const div = document.createElement("div");
        div.classList.add("tarjeta-categoria");
        div.innerHTML = `<img src="${categoria.imagen}" alt="${categoria.nombre}">`;

        div.addEventListener("click", () => {
            cambiarCategoria(categoria.id);

            // Quitar clase activa de todas
            document.querySelectorAll(".tarjeta-categoria").forEach(el => {
                el.classList.remove("activa");
            });

            // Agregar clase activa a esta
            div.classList.add("activa");
        });

        contenedor.appendChild(div);
    });
};

//Es llamado cuando se clickea una categoria, vuelve a renderizar los productos que sean de esa categoria
const cambiarCategoria = async (idCategoria) => {
    console.log("plop");

    let asidfmawd = obtenerJSON(jsonProductos, idCategoria);

}


//renderiza los productos cuya categoria sea la misma a la pasada por parametro
const renderizarProductos = (productos, IDCategoria) => {
    HTMLAModificar = document.querySelector("#product-grid")


    HTMLAModificar.innerHTML = ""


    productos.forEach(producto => {
        if (producto.stock && producto.categoria === IDCategoria) {
            HTMLAModificar.innerHTML += `
  <div id="prod-${producto.id}" class="tarjeta-producto">
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <p>${producto.nombre}</p>
    <p><strong>$${producto.precio.toFixed(2)}</strong></p>
    <button class="boton-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
  </div>
`;

        }

    });

}



//obtiene los datos del json y llama a las funciones de renderizar cuando 
//se inicializa la pagina
//ESO ESTÁ MAL, DEBERIA RETORNAR UN ARRAY, PERO COMO EL RETORNO ES
//UNA PROMESA ASINCRONA EL CÓDIGO QUE USA ESE VALOR RETORNADO ANDA MAL
const obtenerJSON = async (url, cosa) => {
    const response = await fetch(url);
    const arrayJson = await (response).json();


    //ESTO ESTA RE MAL, BUSCAR UN MEJOR METODO
    if (cosa === -1) {
        renderizarCategorias(arrayJson);
    }
    else {
        renderizarProductos(arrayJson, cosa)
    }

    return arrayJson;
}

const jsonCategorias = "../JSON/categorias.json";
const jsonProductos = "../JSON/productos.json";

let arrayCategorias = obtenerJSON(jsonCategorias, -1);
let arrayProductos = obtenerJSON(jsonProductos, 1);
*/
//TODO EL CODIGO DEBERIA SER MASOMENOS ASÍ

//FUNCIONES
const renderizarCategorias = async () => 
{
    const URLCategorias = "../JSON/categorias.json";
    let categorias = await obtenerJSON(URLCategorias);
    
    HTMLAModificar = document.querySelector("#categorias-grid")


    categorias.forEach(categoria => {

        //agregar el evento con addEventListener en vez de usando el HTML
        HTMLAModificar.innerHTML += `<div id="cat-${categoria.id}" onclick="cambiarCategoria(${categoria.id})" class="tarjeta-categoria">
                                        <img src="${categoria.imagen}" alt="${categoria.nombre}">
                                    </div>`;
                           
    });


}


const cambiarCategoria = (idCategoria) =>
    {
        console.log("plop");

        renderizarProductos(idCategoria)

    }

const renderizarProductos = async (IDCategoria) =>
{
    const URLProductos = "../JSON/productos.json";
    let productos = await obtenerJSON(URLProductos);

    HTMLAModificar = document.querySelector("#product-grid")
    HTMLAModificar.innerHTML = ""


    productos.forEach(producto => {
        if(producto.stock && producto.categoria === IDCategoria)
        {
            HTMLAModificar.innerHTML += `<div id="prod-${producto.id}" class="tarjeta-producto">
                                            <img src="${producto.imagen}" alt="${producto.nombre}">
                                            <p>${producto.nombre}</p>
                                        </div>`;
    
        }
                      
    });

}


const obtenerJSON = async (url) => 
{
    const response = await fetch(url);
    const arrayJson = await (response).json();
        
    return arrayJson;
}




const CATEGORIA_DEFAULT = 1;

renderizarCategorias()
renderizarProductos(CATEGORIA_DEFAULT)





