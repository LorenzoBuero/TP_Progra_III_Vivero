import sequelize from "./config/db_mysql.js";
import Producto from "./models/producto.model.js";
import {crearProducto, obtenerPorCategoria, editarPorID, obtenerPorID, desactivarPorID, activarPorID} from "../services/producto.service.js"


const router = Router();

router.post("/", middlewareeee, crearProducto)//??

router.get("/porID/:idProducto", obtenerPorCategoria);
router.get("/:id", obtenerPorID);


router.put("/:id/activar", activarPorID);
router.put("/:id/desactivar", desactivarPorID);
router.put("/:id", editarPorID);


export default router;