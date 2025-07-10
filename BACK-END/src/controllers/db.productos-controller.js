//import sequelize from "./config/db_mysql.js";
//import Producto from "./models/producto.model.js";
import {crearProducto, obtenerTodosLosProductos, obtenerProductoPorID, editarProductoPorID, desactivarProductoPorID, activarPorID} from "../services/producto.service.js"


export const crear = (req, res) => {
    try {
        crearProducto({
            nombre : prod.nombre,
            categoriaFK : prod.categoria,
            stock : prod.stock,
            precio : prod.precio,
            imagen : prod.imagen
        });

        if(req.params.destino == "dashboard"){
            res.redirect("/dashboard");
        } else{
            res.status(201);
        }
    
    } catch (error) {
        res.status(500);
    }

}

export const obtenerTodos = async (req, res) => {
    try {
        const productos = await obtenerTodosLosProductos(); 

        
        res.status(200).json({message:"todos los productos:", payload:productos});
        


    } catch (error) {
        res.status(500);
    }
}

export const obtenerUnoPorID = async (req, res) => {
    try {//else if(req.params.destino == "editarProducto")
        //{
            //-*/res.render("adminEditarProducto.ejs", { producto, categorias });    
        //}
        const producto = await obtenerProductoPorID(req.id);
        console.log(producto);
        res.status(200).json({message:'producto con id' + req.id, payload:producto});
    } catch (error) {
        res.status(500);
    }
}

export const chiche = async (req, res) => {
    try {
        const producto = await obtenerProductoPorID(req.params.id);
        console.log(producto);
        res.status(200).json({message:'producto con id' + req.id, payload:producto});
    } catch (error) {
        res.status(500);
    }
}

export const editar = async (req, res) => {
    try {
        await editarProductoPorID(req.id);
        console.log("producto editado");
        
        if(req.params.destino == "dashboard"){
            res.redirect("/administrador/dashboard");
        } else{
            res.status(200);
        }
        
    } catch (error) {
        res.status(500);
    }
}

const desactivar = async (id) => {
    await desactivarProductoPorID(false);
}

const activar = async (id) => {
    await activarPorID(true);
}

export const activarYDesactivar = async (req, res) => {
    console.log("fua")
    const producto = await obtenerProductoPorID(req.params.id);
    try {
        
        if (producto.stock == true){
            await activar();
        }
        else{
            await desactivar();
        }
        
        if(req.params.destino == "dashboard"){
            res.redirect("/administrador/dashboard");
        } else{
            res.status(200);
        }
    } catch (error) {
        res.status(500);
    }
}

