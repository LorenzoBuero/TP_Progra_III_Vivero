import {createRequire} from "module";
const require = createRequire(import.meta.url); 
import sequelize from "./config/db_mysql.js"
import envs from "./config/envs.js";
import express from "express";

//TEMPORAL, importar esto desde controllers
import coso from "./models/producto.model.js";
import cosa from "./models/categoria.model.js";
import cosu from "./models/admin.model.js";



const app = express();//INICIALIZA EXPRESS

//INICIALIZA LA CONECCION A LA DB
const coneccionDB = async () => {
    try 
    {
        await sequelize.sync();
        console.log("    MYSQL en linea");

                //debug temporal
                /*sequelize.query("show tables").then(function(rows) {
                    console.log(JSON.stringify(rows));
                });*/



    }catch (error)
    {
        throw error;
    }

}




app.get("/", (req, res) => {
    res.send("Estas en el Main");
});



//Listeners
coneccionDB();
app.listen(envs.port || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}
                \n    NODE.JS en linea`);
});

