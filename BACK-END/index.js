import {createRequire} from "module";
const require = createRequire(import.meta.url); 
import sequelize from "./src/config/db_mysql.js"
import envs from "./src/config/envs.js";
import express from "express";
import coso from "./src/models/producto.model.js"



const app = express();//INICIALIZA EXPRESS

//INICIALIZA LA CONECCION A LA DB
const coneccionDB = async () => {
    try 
    {
        await sequelize.sync();
        console.log("    MYSQL en linea");

                //debug temporal
                /*await sequelize.query("create table papa (id int)");
                await sequelize.query("show tables").then(function(rows) {
                    console.log(JSON.stringify(rows));
                });
                await sequelize.query("drop table papa");
                await sequelize.query("show tables").then(function(rows) {
                    console.log(JSON.stringify(rows));
                });;*/



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

