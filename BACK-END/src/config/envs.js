import dotenv from "dotenv";
dotenv.config();


export default {
    port: process.env.PORT,
    
    db_conf : {
        puerto : process.env.DB_PORT,
        nombre_db : process.env.DB_NAME,
        contrasenia : process.env.DB_PASSWORD,
        host : process.env.DB_HOST,
        usuario : process.env.DB_USER
    }
};