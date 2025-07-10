import Categoria from "../models/categoria.model.js";


export const crearCategoria = async (categoria) => {

    return await Categoria.create(categoria);
}

export const obtenerCategorias = async () => {

    return await Categoria.findAll();
}

export const obtenerCategoriaPorID = async (id) => {

    return await Categoria.findByPk(id);
}
