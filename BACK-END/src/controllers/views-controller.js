import { obtenerTodosLosProductos, obtenerProductoPorID } from "../services/producto.service.js";
import { obtenerCategorias } from "../services/categoria.service.js";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//CLIENTE
export const productosCliente = async (req, res) => {

    try {
        const categorias = await obtenerCategorias();
        const productos = await obtenerTodosLosProductos();
        res.render("productos.ejs", { productos, categorias });
    } catch (error) {
        res.status(500).send("Error al cargar producto para editar");
    }
}

//ADMINISTRADOR

export const dashboard = async (req, res) => {

    try {
        const productos = await obtenerTodosLosProductos();
        res.render("adminDashboard.ejs", { productos });
    } catch (error) {
        res.status(500).send("Error al obtener los productos");
    }
}

export const crearProducto = async (req, res) => {

    try {
        const categorias = await obtenerCategorias();
        res.render("adminAltaProducto.ejs", { categorias });
    } catch (error) {
        res.status(500).send("Error al obtener categorias para el desplegable");
    }
}

export const editarProducto = async (req, res) => {

    try {
        const categorias = await obtenerCategorias();
        const producto = await obtenerProductoPorID(req.params.idProducto);
        res.render("adminEditarProducto.ejs", { producto, categorias });
    } catch (error) {
        res.status(500).send("Error al cargar producto para editar");
    }
}

//ESTATICAS
export const main = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}

export const loginAdmin = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "paginas", "adminLogin.html"));
}

export const carrito = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "paginas", "carrito.html"));
}

export const ticket = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "paginas", "ticket.html"));
}

//export const 