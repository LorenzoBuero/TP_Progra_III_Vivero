import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { requiereAutenticacion } from "../middlewares/autenticacion.middleware.js";
import { productosCliente } from "../controllers/views.controller.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Ruta: / → Página login cliente (HTML estático)
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Ruta: /admin → Página login administrador (HTML estático)
router.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "paginas", "adminLogin.html"));
});

// Ruta: /carrito → Página carrito (HTML estático)
router.get("/carrito", requiereAutenticacion, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "paginas", "carrito.html"));
});


// Ruta: /ticket → Página de ticket (HTML estático)
router.get("/ticket", requiereAutenticacion, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "paginas", "ticket.html"));
});

// Ruta: /productos → Página que renderiza productos (EJS)
router.get("/productos", requiereAutenticacion, productosCliente);



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
