//import sequelize from "./config/db_mysql.js";
//import Producto from "./models/producto.model.js";
import {crearProducto, obtenerTodosLosProductos, editarPorID, obtenerPorID, desactivarPorID, activarPorID} from "../services/producto.service.js"


export const crear = (req, res) => {
    try {
        crearProducto({
        nombre : prod.nombre,
        categoriaFK : prod.categoria,
        stock : prod.stock,
        precio : prod.precio,
        imagen : prod.imagen
       });
       res.status(201);
    } catch (error) {
        res.status(500);
    }

}

export const obtenerTodos = async (req, res) => {
    try {
        const productos = await obtenerTodosLosProductos(); 
        console.log(productos);
        res.status(200).json({message:"todos los productos:", payload:productos});
    } catch (error) {
        res.status(500);
    }
}

export const obtenerPorID = async (req, res) => {
    try {
        const producto = await obtenerPorID(req.id);
        console.log(producto);
        res.status(200).json({message:'producto con id' + req.id, payload:producto});
    } catch (error) {
        res.status(500);
    }
}

export const editar = async (req, res) => {
    try {
        await editarPorID(req.id);
        console.log("producto editado");
        res.status(200)//.json({message:'producto con id' + req.id, payload:producto});
    } catch (error) {
        res.status(500);
    }
}

const desactivar = async (id) => {
    await desactivarPorID(false);
    console.log("desactivado");
}

const activar = async (id) => {
    await activarPorID(true);
    console.log("activado");
}

export const activarYDesactivar = async (req, res) => {

    const producto = await obtenerPorID(req.id);
    try {
        if (producto.stock == true){
            await activar();
        }
        else{
            await desactivar();
        }
        res.status(200);
    } catch (error) {
        res.status(500);
    }
}


/*
const router = Router();

router.post("/", middlewareeee, crearProducto)//??

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerPorID);

router.put("/:id/activar", activarPorID);
router.put("/:id/desactivar", desactivarPorID);
router.put("/:id", editarPorID);


export default router;*/