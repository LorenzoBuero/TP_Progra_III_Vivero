import Ventas from "../models/ventas.model.js";
import ventas_producto from "../models/ventas_productos.js";

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
    ventas_producto.create({
      fkVenta: venta.id,
      fkProducto: prod.idProducto,
      cantidad: prod.cantidad
    });
  }

  return venta;
};