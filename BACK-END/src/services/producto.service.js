//import sequelize from "./config/db_mysql.js";
import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js";


export const crearProducto = async (producto) => {

    return await Producto.create(producto);
};

export const obtenerTodosLosProductos = async () => {
  return await Producto.findAll({
    where: { stock: true }, //  Solo productos activos
    include: {
      model: Categoria,
      as: "categoria",
    },
    order: [["id", "ASC"]],
  });
};

export const contarProductos = async () => {
  return await Producto.count({ where: { stock: true } }); //  Solo contar activos
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




