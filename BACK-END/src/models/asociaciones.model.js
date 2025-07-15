import Producto from "./producto.model.js";
import Categoria from "./categoria.model.js";
import Ventas from "./ventas.model.js";
import ventas_productos from "./ventas_productos.js";

// Producto - Categoria
Producto.belongsTo(Categoria, { foreignKey: "categoriaFK", as: "categoria" });
Categoria.hasMany(Producto, { foreignKey: "categoriaFK", as: "productos" });

// Ventas - Producto (muchos a muchos a través de ventas_productos)
ventas_productos.belongsTo(Producto, { foreignKey: "fkProducto", as: "producto" });
ventas_productos.belongsTo(Ventas, { foreignKey: "fkVenta", as: "venta" });

Producto.hasMany(ventas_productos, { foreignKey: "fkProducto", as: "ventasProducto" });
Ventas.hasMany(ventas_productos, { foreignKey: "fkVenta", as: "ventaProductos" });

export {
  Producto,
  Categoria,
  Ventas,
  ventas_productos
};
