import { crearVentaConProductos, obtenerProductosYSusVentas, obtenerVentasCompletas } from "../services/ventas.service.js";

export const confirmarCompra = async (req, res) => {
  try {
    const { comprador, productos } = req.body;
    if (!comprador || !productos || !productos.length) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    const venta = await crearVentaConProductos(comprador, productos);

    res.status(201).json({ message: "Compra confirmada", ventaId: venta.id });
  } catch (error) {
    console.error("Error al guardar la compra:", error);
    res.status(500).json({ error: "Error al guardar la compra" });
  }
};


export const obtenerVentasDetalladas = async (req, res) =>{
  
  try{
  let ventas = await obtenerVentasCompletas();
  res.status(200).json({ message: "ventas obtenidas exitosamente", ventas : ventas });
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).json({ error: "Error al obtener las ventas o los productos" });
  }
}



export const ObtenerProductosConCantidadVendidos = async (req, res) => {
  try{
  const productos = await obtenerProductosYSusVentas();
  res.status(200).json({ message: "productos obtenidos exitosamente", productos : productos });
  } catch (error) {
    console.error("Error al consultar la base de datos:", error);
    res.status(500).json({ error: "Error al obtener los productos o las cantidades" });
  }
}
