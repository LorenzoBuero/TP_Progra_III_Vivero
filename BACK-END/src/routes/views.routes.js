import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { requiereAutenticacion } from "../middlewares/autenticacion.middleware.js";
import { productosCliente, dashboard, crearProducto, editarProducto, main, loginAdmin, carrito, ticket } from "../controllers/views-controller.js";


const router = express.Router();


//EJS
router.get("/cliente/productos", requiereAutenticacion, productosCliente);

router.get("/administrador/dashboard", requiereAutenticacion, dashboard);

router.get("/administrador/dashboard/crear", requiereAutenticacion, crearProducto);

router.get("/administrador/dashboard/:idProducto/editar", editarProducto);

// HTML estático
router.get("/", main);

router.get("/administradorLogin", loginAdmin);

router.get("/cliente/carrito", requiereAutenticacion, carrito);

router.get("/cliente/ticket", requiereAutenticacion, ticket);


// Login cliente (POST)
router.post("/login", (req, res) => {
  const { usuario } = req.body;

  // Validación básica (en el futuro podés consultar una tabla de usuarios)
  if (usuario && usuario.trim() !== "") {
    req.session.usuarioAutenticado = true;
    req.session.nombreUsuario = usuario.trim();

    return res.status(200).json({ mensaje: "Autenticado" });
  }

  res.status(400).json({ error: "Nombre inválido" });
});


export default router;
