/* forma sin DOMContentLoaded

function cargarPagina(){

    const botonCargado = document.querySelector(".boton-ingresar");
    if (botonCargado) {
        botonCargado.addEventListener("click", function(event) {
            event.preventDefault();
            window.location.href = "productos.html";
        });
    }
}

cargarPagina(); 

usar el script al final del body
*/


function cargarPagina() {
    const botonCargado = document.querySelector(".boton-ingresar");

    if (botonCargado) {
        botonCargado.addEventListener("click", function(event) {
            event.preventDefault(); 
            window.location.href = "pagCliente.html"; 
        });
    }
}

document.addEventListener("DOMContentLoaded", cargarPagina); 

/* se puede poner en el head y en el body porque espera a cargar el documento*/