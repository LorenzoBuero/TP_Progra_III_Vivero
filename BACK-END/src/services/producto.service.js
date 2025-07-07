//import sequelize from "./config/db_mysql.js";
import Producto from "./models/producto.model.js";


export const crear = async (producto) => {

    return await Producto.create(producto);
};

export const obtenerPorCategoria = async (idCategoria) => {
    return await Producto.findAll({where : {idCategoria : idCategoria}})
};

export const obtenerPorID = async (id) => {

    return await Producto.findByPk(id);
};

export const editarPorID = async (id, producto) => {
    return await Producto.user(producto, {where : {id : id}})
}

export const desactivarPorID = async (id) =>{

    prod = obtenerPorID(id)
    prod.stock = false;
    return await editarPorID(id, prod);
};

export const activarPorID = async (id) =>{

    prod = obtenerPorID(id)
    prod.stock = true;
    return await editarPorID(id, prod);
};




