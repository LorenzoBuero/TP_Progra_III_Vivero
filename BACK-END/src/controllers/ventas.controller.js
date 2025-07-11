import { crearVentaConProductos } from "../services/ventas.service.js";

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
