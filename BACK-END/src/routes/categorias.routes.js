import express from "express";
import { requiereAutenticacion } from "../middlewares/autenticacion.middleware.js";
import { inyeccionInputs } from "../middlewares/inyeccion.middleware.js";
import { crear, obtenerPorID, obtenerTodos } from "../controllers/db.categorias-controller.js";
//import { crear, editar, activarYDesactivar, obtenerTodos, obtenerUnoPorID, chiche } from "../controllers/db.controller-productos.js";

const router = express.Router();

router.post("/", requiereAutenticacion, inyeccionInputs, crear)

router.get("/:destino", requiereAutenticacion, obtenerTodos);

router.get("/:destino/:id", requiereAutenticacion, obtenerPorID)


export default router;