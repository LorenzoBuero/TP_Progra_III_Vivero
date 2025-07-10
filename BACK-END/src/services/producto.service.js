//import sequelize from "./config/db_mysql.js";
import Producto from "../models/producto.model.js";


export const crearProducto = async (producto) => {

    return await Producto.create(producto);
};

export const obtenerTodosLosProductos = async () => {
    return await Producto.findAll()
};

export const obtenerProductoPorID = async (id) => {

    return await Producto.findByPk(id);
};

export const editarProductoPorID = async (id, producto) => {
    return await Producto.user(producto, {where : {id : id}})
}

export const desactivarProductoPorID = async (id) =>{

    prod = obtenerProductoPorID(id)
    prod.stock = false;
    return await editarProductoPorID(id, prod);
};

export const activarPorID = async (id) =>{

    prod = obtenerProductoPorID(id)
    prod.stock = true;
    return await editarProductoPorID(id, prod);
};




