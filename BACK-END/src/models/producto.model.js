import sequelize from "../config/db_mysql.js";
import {DataTypes} from "sequelize";


const Producto = sequelize.define("producto", {

    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
    },

    nombre : {
        type : DataTypes.CHAR,
        validate : {max : 100},
        allowNull : false,
    },

    categoriaFK : {
        type : DataTypes.TINYINT,
        validate : {max : 30},
        allowNull : false,
    },
    stock : {
        type : DataTypes.BOOLEAN,
        defaultValue : true,
        allowNull : false,
    },
    precio : {
        type : DataTypes.DECIMAL, 
        allowNull : false,
    },
    imagen : {
        type : DataTypes.BLOB,
        allowNull : false,
    }
});

export default Producto;
