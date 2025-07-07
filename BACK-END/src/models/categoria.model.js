import sequelize from "../config/db_mysql.js";
import { DataTypes } from "sequelize";

const Categoria = sequelize.define("categorias", {

    id : {
        type : DataTypes.INTEGER, 
        autoIncrement : true,
        allowNull : false, 
        primaryKey : true
    },
    nombre : {
        type : DataTypes.INTEGER,
        unique : true,
        allowNull : true
    },
    activo : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
});


export default Categoria;