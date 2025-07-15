import sequelize from "../config/db_mysql.js";
import { DataTypes } from "sequelize";

const ventas_productos = sequelize.define(
  "ventas_productos",
  {
    fkVenta: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    fkProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    //timestamps: false,       // no usamos createdAt / updatedAt
    freezeTableName: true,   // Evita pluralizar nombre de tabla
    id: false,               // Evita que Sequelize agregue campo 'id' automáticamente
  }
);

export default ventas_productos;