import { crearCategoria, obtenerCategoriaPorID, obtenerCategorias } from "../services/categoria.service.js";

export const crear = async (req, res) =>
{
    try {
        crearCategoria({nombre:req.nombre,
                        imagen:req.imagen});
        res.status(201);
    } catch (error) {
        res.status(500);
    }
    
}

export const obtenerPorID = async (req, res) => {

    try {
        const categoria = await obtenerCategoriaPorID(req.id);

        res.status(200).json({message:"La categoria es", payload:categoria});
    } catch (error) {
        res.status(500)
    }
}

export const obtenerTodos = async (req, res) => {

    try {
        const categorias = await obtenerCategorias();

        res.status(200).json({message:"Las categorias son", payload:categorias});
        
    } catch (error) {
        res.status(500)
    }
}