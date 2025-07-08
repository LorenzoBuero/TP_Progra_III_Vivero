//import Categoria from "./models/categoria.model.js";
import Admin from "../models/categoria.model.js"

export const crearAdmin = async (admin) => {

    return await Admin.create(admin);
}

export const obtenerAdmins = async () => {

    return await Admin.findAll();
}
/*
export const crearCategoria = async (categoria) => {

    return await Categoria.create(categoria);
}

export const obtenerCategorias = async () => {

    return await Categoria.findAll();
}
*/
