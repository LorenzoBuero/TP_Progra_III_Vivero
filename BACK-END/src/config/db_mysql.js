import {createRequire} from "module";
const require = createRequire(import.meta.url); 

import { Sequelize } from "sequelize";
import envs from "./envs.js";


const {host, usuario, contrasenia, puerto, nombre_db} = envs.db_conf;
const db = require("mysql2");

const sequelize = new Sequelize(nombre_db, usuario, contrasenia, {
    host : host,
    dialect : "mysql",
    port: puerto
}); 

try
{
    await sequelize.authenticate();
    console.log("Sequelize conectó la base de datos");

} catch (error)
{
    throw error;
}


export default sequelize;

/*
const mysql = db.createConnection({

    host: host,
    user: usuario,
    password: contrasenia,
    database: nombre_db,
    port: puerto 

});*/


/*
try {
    await mysql.connect(function(err) {
        console.log("    Hola mysql");
    });
}
catch (err)
{
    throw err;
}
*/


