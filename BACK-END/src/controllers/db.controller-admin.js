import { crearAdmin, obtenerAdmins } from "../services/admin.service";


export const crear = async (req, res) => {

    try {
        await crearAdmin({mail : req.mail,
                        contrasenia : req.contrasenia});
        res.status(201);
        console.log("admin creado");
    } catch (error) {
        res.status(500);
    }
}

export const obtener = async (req, res) => {

    try {
        const admins = await obtenerAdmins();
        console.log(admins);
        res.status(200).json({message:"Los admins son", payload:admins});
    } catch (error) {
        res.status(500)
    }
}