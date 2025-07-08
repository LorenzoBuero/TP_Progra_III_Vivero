import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { requiereAutenticacion } from "../middlewares/autenticacion.middleware.js";

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
router.get("/productos", async (req, res) => {
  try {
    const categoriasPath = path.join(__dirname, "..", "public", "JSON", "categorias.json");
    const productosPath = path.join(__dirname, "..", "public", "JSON", "productos.json");

    const categoriasJSON = await fs.readFile(categoriasPath, "utf-8");
    const productosJSON = await fs.readFile(productosPath, "utf-8");

    const categorias = JSON.parse(categoriasJSON);
    const productos = JSON.parse(productosJSON).filter(p => p.stock === true);

    res.render("productos.ejs", { productos, categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar productos o categorías");
  }
});

export default router;
