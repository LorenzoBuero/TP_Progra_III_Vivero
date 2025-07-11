import Producto from "./producto.model.js";
import Categoria from "./categoria.model.js";
import Ventas from "./ventas.model.js";
import ventas_producto from "./ventas_productos.js";

// Producto - Categoria
Producto.belongsTo(Categoria, { foreignKey: "categoriaFK", as: "categoria" });
Categoria.hasMany(Producto, { foreignKey: "categoriaFK", as: "productos" });

// Ventas - Producto (muchos a muchos a través de ventas_productos)
ventas_producto.belongsTo(Producto, { foreignKey: "fkProducto", as: "producto" });
ventas_producto.belongsTo(Ventas, { foreignKey: "fkVenta", as: "venta" });

Producto.hasMany(ventas_producto, { foreignKey: "fkProducto", as: "ventasProductos" });
Ventas.hasMany(ventas_producto, { foreignKey: "fkVenta", as: "ventasProductos" });

export {
  Producto,
  Categoria,
  Ventas,
  ventas_producto
};
