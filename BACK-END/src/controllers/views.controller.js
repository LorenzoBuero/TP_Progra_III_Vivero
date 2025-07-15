import { obtenerTodosLosProductos, contarProductos } from "../services/producto.service.js";
import { obtenerCategorias } from "../services/categoria.service.js";

export const productosCliente = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;  // página actual, default 1
    const limit = 10; // productos por página
    const offset = (page - 1) * limit;

    const productos = await obtenerTodosLosProductos(limit, offset);
    const categorias = await obtenerCategorias();

    // Usar la función contarProductos del service
    const totalProductos = await contarProductos();

    const totalPages = Math.ceil(totalProductos / limit);

    res.render("productos.ejs", {
      productos,
      categorias,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    res.status(500).send("Error al cargar productos");
  }
};
