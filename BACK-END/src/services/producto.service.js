//import sequelize from "./config/db_mysql.js";
import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js";


export const crearProducto = async (producto) => {

    return await Producto.create(producto);
};

export const obtenerTodosLosProductos = async (opciones = {}) => {
  const include = [];

  if (opciones.incluirCategoria) {
    include.push({
      model: Categoria,
      as: "categoria"
    });
  }

  return await Producto.findAll({ include });
};

export const obtenerProductoPorID = async (id) => {

    return await Producto.findByPk(id);
};

export const editarProductoPorID = async (id, producto) => {
    return await Producto.user(producto, {where : {id : id}})
}

export const desactivarProductoPorID = async (id) =>{

    prod = obtenerProductoPorID(id)
    prod.stock = true;
    return await editarProductoPorID(id, prod);
};

export const activarProductoPorID = async (id) =>{

    prod = obtenerProductoPorID(id)
    prod.stock = false;
    return await editarProductoPorID(id, prod);
};




