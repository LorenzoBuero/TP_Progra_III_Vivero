import express from "express";
import { requiereAutenticacion } from "../middlewares/autenticacion.middleware.js";
import { inyeccionInputs } from "../middlewares/inyeccion.middleware.js";
import { crear, editar, activarYDesactivar, obtenerTodos, obtenerUnoPorID } from "../controllers/db.controller-productos.js";

const router = express.Router();

// GET /api/productos → crea prodcto
// POST /api/productos → agregar nuevo producto
router.post("/", requiereAutenticacion, inyeccionInputs, crear);

// GET /api/productos → todos los productos
router.get("/", obtenerTodos);
// GET /api/productos/:id → producto por ID
router.get("/:id", obtenerUnoPorID);

//PUT /api/productos/alternarStock/:id → activar o desactivar producto 
router.put("/alternarStock/:id", activarYDesactivar);

// PUT /api/productos/:id → actualizar producto
router.put("/:id", requiereAutenticacion,inyeccionInputs, editar);


export default router;