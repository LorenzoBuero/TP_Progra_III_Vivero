import sequelize from "../config/db_mysql.js";
import { DataTypes } from "sequelize";

const ventas_producto = sequelize.define("ventas_productos", {
    fkVenta: {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true
    },
    fkProducto : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true
    },
    cantidad : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
});

export default ventas_producto;