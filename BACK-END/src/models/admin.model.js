import sequelize from "../config/db_mysql.js";
import { DataTypes } from "sequelize";

const Admin = sequelize.define("admins", {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false,
    },
    mail : {
        type : DataTypes.STRING, 
        allowNull : false,
        unique : true,
    },
    contrasenia : {
        type : DataTypes.STRING,
        allowNull : false,
    }
});



export default Admin;