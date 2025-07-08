import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const productosPath = path.join(__dirname, "..", "public", "JSON", "productos.json");

// GET /api/productos → todos los productos
router.get("/", async (req, res) => {
  try {
    const data = await fs.readFile(productosPath, "utf-8");
    const productos = JSON.parse(data);
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al leer productos" });
  }
});

// GET /api/productos/:id → producto por ID
router.get("/:id", async (req, res) => {
  try {
    const data = await fs.readFile(productosPath, "utf-8");
    const productos = JSON.parse(data);
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar producto" });
  }
});

// POST /api/productos → agregar nuevo producto
router.post("/", express.json(), async (req, res) => {
  try {
    const data = await fs.readFile(productosPath, "utf-8");
    const productos = JSON.parse(data);

    const nuevoProducto = req.body;
    nuevoProducto.id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    productos.push(nuevoProducto);

    await fs.writeFile(productosPath, JSON.stringify(productos, null, 2));
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// PUT /api/productos/:id → actualizar producto
router.put("/:id", express.json(), async (req, res) => {
  try {
    const data = await fs.readFile(productosPath, "utf-8");
    const productos = JSON.parse(data);
    const index = productos.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Producto no encontrado" });

    productos[index] = { ...productos[index], ...req.body };
    await fs.writeFile(productosPath, JSON.stringify(productos, null, 2));
    res.json(productos[index]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});



export default router;