import express from "express";
import { requiereAutenticacion } from "../middlewares/autenticacion.middleware.js";
import { inyeccionInputs } from "../middlewares/inyeccion.middleware.js";
import { crear, editar, activarYDesactivar, obtenerTodos, obtenerUnoPorID, chiche } from "../controllers/db.productos-controller.js";

const router = express.Router();

// POST /productos/:destino → agregar nuevo producto
router.post("/:destino", requiereAutenticacion, inyeccionInputs, crear);

//router.get("/chiche/:id", /*requiereAutenticacion,*/ chiche)

// GET /productos/:id → producto por ID
router.get("/:id/:destino", requiereAutenticacion, obtenerUnoPorID);
// GET /productos → todos los productos
router.get("/:destino", requiereAutenticacion, obtenerTodos);

//PUT /productos/alternarStock/:id → activar o desactivar producto 
router.post("/alternarStock/:id", requiereAutenticacion, activarYDesactivar);
// PUT /productos/:id → actualizar producto
router.put("/:id/:destino", requiereAutenticacion,inyeccionInputs, editar);


export default router;