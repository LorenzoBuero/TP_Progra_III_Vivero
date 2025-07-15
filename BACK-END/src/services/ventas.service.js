import Ventas from "../models/ventas.model.js";
import ventas_productos from "../models/ventas_productos.js";
import Producto from "../models/producto.model.js"
import { obtenerTodosLosProductos } from "./producto.service.js";

export const crearVentaConProductos = async (comprador, productos) => {
    console.log(comprador);
    console.log(productos);
    
  
    if (!comprador || !productos || !productos.length) {
    throw new Error("Datos incompletos para crear la venta");
  }

  const venta = await Ventas.create({ comprador });

  for (const prod of productos) {
    if (!prod.idProducto || !prod.cantidad) {
      throw new Error("Producto con datos incompletos");
    }
    ventas_productos.create({
      fkVenta: venta.id,
      fkProducto: prod.idProducto,
      cantidad: prod.cantidad
    });
  }

  return venta;
};


export const obtenerProductosYSusVentas = async () => {

  const ProductosEnVentas = await Producto.findAll({include : {
                                model : ventas_productos,
                                as : "ventasProducto",
                                required : true,
                                //atributes : ["nombre"]
                                attributes : ["cantidad"]
                              },
                              attributes : ["nombre", "id", "precio"]//categoria?? 
                            
  });      
  //console.log(ProductosEnVentas);
  //console.log("---------------------------");
  //console.log(ProductosEnVentas[2].ventasProducto);
  
  
  const productos = await obtenerTodosLosProductos();
  let listaProductosCantidad = [];

  productos.forEach(prod => {

    listaProductosCantidad.push({
      producto : prod.nombre,
      cantidad : 0
    });
  });

  

  ProductosEnVentas.forEach(relacion => {      
    listaProductosCantidad.forEach(productoYCantidad => {

      if(productoYCantidad.producto == relacion.nombre){
      
        relacion.ventasProducto.forEach(venta => {
          productoYCantidad.cantidad += venta.cantidad;

        });
      }
    });
  });

  return listaProductosCantidad;
}


export const obtenerVentasCompletas = async () => {

  const ventasYProductos = await ventas_productos.findAll(
    {
      include : [{
        required : true,
        model : Producto,
        as : "producto"
      },
      {
        required : true,
        model : Ventas,
        as : "venta"
      }]
    });

    //let coso = (await ventasYProductos).map()

    let ventasCompletas = []


    ventasYProductos.forEach(ventaYProducto => {

		const esteProducto = {
							nombre : ventaYProducto.producto.nombre,
							precio : ventaYProducto.producto.precio,
							cantidad : ventaYProducto.cantidad 
							};
		const precioTotalEsteProducto = esteProducto.precio * esteProducto.cantidad;

		let ventaRegistrada = false;


		ventasCompletas.forEach(ventaCompl => {
			if (ventaCompl.id == ventaYProducto.venta.id){
			
				ventaRegistrada = true;

				ventaCompl.productos.push(esteProducto);
				ventaCompl.valorFinal += precioTotalEsteProducto;
			}
		});


		if(!ventaRegistrada){

			ventasCompletas.push({
			id : ventaYProducto.venta.id,
			comprador : ventaYProducto.venta.comprador,
			productos : [esteProducto],
			valorFinal: precioTotalEsteProducto
			});
		}
    });




  return ventasCompletas;//ventasYProductos;
}




