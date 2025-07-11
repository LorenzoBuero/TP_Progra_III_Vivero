import sequelize from "../config/db_mysql.js";
import { DataTypes } from "sequelize";

const Ventas = sequelize.define("ventas", {

    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    comprador : {
        type : DataTypes.STRING,
        allowNull : false,
    }
});


export default Ventas;