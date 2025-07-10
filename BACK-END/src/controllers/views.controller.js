import { obtenerTodosLosProductos } from "../services/producto.service.js";
import { obtenerCategorias } from "../services/categoria.service.js";


export const productosCliente = async (req, res) => {
  try {
    const productos = await obtenerTodosLosProductos();
    const categorias = await obtenerCategorias();

    res.render("productos.ejs", { productos, categorias });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    res.status(500).send("Error al cargar productos");
  }
};