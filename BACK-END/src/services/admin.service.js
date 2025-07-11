//import Categoria from "./models/categoria.model.js";
import Admin from "../models/admin.model.js"
import { hashearSHA256 } from "../utils/hasheador.js"
export const crearAdmin = async (mail, contrasenia) => {

    return await Admin.create(cifrarAdmin(mail, contrasenia));
}

export const obtenerAdmins = async () => {

    return await Admin.findAll();
}

export const verificarAdmin = async (mail, contrasenia) => {

    let retorno = false

    let esteAdmin = cifrarAdmin(mail, contrasenia);

    let adminsCargados = await obtenerAdmins();

    adminsCargados.forEach(admC => {
        if(admC.mail === esteAdmin.mail && admC.contrasenia === esteAdmin.contrasenia)
        {
            retorno = true;
        }
    });

    return retorno;
}

const cifrarAdmin = (mail, contrasenia) => {

    let mailCifrado = hashearSHA256(mail);
    let contraseniaCifrada = hashearSHA256(contrasenia);
    let adminCifrado = {mail:mailCifrado, contrasenia:contraseniaCifrada} 
    

    return adminCifrado;

}


/*
export const crearCategoria = async (categoria) => {

    return await Categoria.create(categoria);
}

export const obtenerCategorias = async () => {

    return await Categoria.findAll();
}
*/
