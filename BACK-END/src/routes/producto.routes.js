import express from "express";
import { requiereAutenticacion } from "../middlewares/autenticacion.middleware.js";
import { inyeccionInputs } from "../middlewares/inyeccion.middleware.js";
import { crear, editar, activarYDesactivar, obtenerTodos, obtenerUnoPorID, chiche } from "../controllers/db.productos-controller.js";

const router = express.Router();

// POST /api/productos → agregar nuevo producto
router.post("/:destino", requiereAutenticacion, inyeccionInputs, crear);

//router.get("/chiche/:id", /*requiereAutenticacion,*/ chiche)

// GET /api/productos/:id → producto por ID
router.get("/:id/:destino", requiereAutenticacion, obtenerUnoPorID);
// GET /api/productos → todos los productos
router.get("/:destino", requiereAutenticacion, obtenerTodos);

//PUT /api/productos/alternarStock/:id → activar o desactivar producto 
router.put("/alternarStock/:id/:destino", requiereAutenticacion, activarYDesactivar);
// PUT /api/productos/:id → actualizar producto
router.put("/:id/:destino", requiereAutenticacion,inyeccionInputs, editar);


export default router;