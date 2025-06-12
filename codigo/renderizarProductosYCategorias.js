

//TODO EL CODIGO DE ESTE ARCHIVO ES RECONTRA PROVISIONAL

const renderizarCategorias = (categorias) => 
{
    
    
    HTMLAModificar = document.querySelector("#categorias-grid")
    
    
    categorias.forEach(categoria => {
        
        HTMLAModificar.innerHTML += `<div id="cat-${categoria.id}" onclick="cambiarCategoria(${categoria.id})" class="tarjeta-categoria">
                                        <img src="${categoria.imagen}" alt="${categoria.nombre}">
                                    </div>`;
                           
    });


}


const cambiarCategoria = (idCategoria) =>
    {
        console.log("plop");

        let asidfmawd = obtenerJSON(jsonProductos, idCategoria);

    }

const renderizarProductos = (productos, IDCategoria) =>
{
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




const obtenerJSON = async (url, cosa) => 
{
    const response = await fetch(url);
    const arrayJson = await (response).json();
    

    //ESTO ESTA RE MAL, BUSCAR UN MEJOR METODO
    if(cosa === -1)
    {
        renderizarCategorias(arrayJson);
    }
    else
    {
        renderizarProductos(arrayJson, cosa)
    }
        
    return arrayJson;
}

const jsonCategorias = "../JSON/categorias.json";
const jsonProductos = "../JSON/productos.json";

let arrayCategorias = obtenerJSON(jsonCategorias, -1);
let arrayProductos = obtenerJSON(jsonProductos, 1);

//esto deberia ser así
/*
let arrayCategorias = obtenerJSON(jsonCategorias);
let arrayProductos = obtenerJSON(jsonProductos);


renderizarCategorias(arrayCategorias)
renderizarProductos(arrayProductos)
*/

//let categorias = obtenerJSON(jsonCategorias);
//let productos = obtenerJSON(jsonProductos);
























