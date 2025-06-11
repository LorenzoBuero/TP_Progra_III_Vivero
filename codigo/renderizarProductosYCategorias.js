

//TODO EL CODIGO DE ESTE ARCHIVO ES RECONTRA PROVISIONAL

const renderizarCategorias = (categorias) => 
{
    
    
    HTMLAModificar = document.querySelector("#categorias-grid")
    categorias.forEach(categoria => {
        console.log(categoria);
        
        HTMLAModificar.innerHTML += `<div id="${categoria.id}" class="tarjeta-categoria">
                                        <img src="${categoria.imagen}" alt="${categoria.nombre}">
                                    </div>`;
                           
    });


}

/*  const lugarDeLasFrutas = document.querySelector(".product-grid");
    lugarDeLasFrutas.innerHTML = "";
    console.log("falalalalal")
    frutas.forEach(fruta => {
        

        lugarDeLasFrutas.innerHTML += `<div class="product-card">
                                            <img src="${fruta.img}" alt="${fruta.nombre}">
                                            <h3>${fruta.nombre}</h3>
                                            <p>$${fruta.precio}</p>
                                            <button class="add-to-cart" onclick="clickAgregarAlCarrito('${fruta.nombre}', '${fruta.precio}')">Agregar a carrito</button>
                                        </div>`*/

const obtenerJSON = async (url) => 
{
    const response = await fetch(url);
    const arrayJson = await (response).json();
    
    renderizarCategorias(arrayJson);
    return arrayJson;
}

const jsonCategorias = "../JSON/categorias.json";
//const jsonProductos = "../JSON/productos.json";

let categorias = obtenerJSON(jsonCategorias);
//let productos = obtenerJSON(jsonProductos);
























