import Producto from "./producto.model.js";
import Categoria from "./categoria.model.js";
import Ventas from "./ventas.model.js";
import ventas_producto from "./ventas_productos.js";

// Asociación Producto -> Categoria (muchos productos tienen una categoría)
Producto.belongsTo(Categoria, { foreignKey: "categoriaFK", as : "categoria"});

// Asociación Categoria -> Producto (una categoría tiene muchos productos)
Categoria.hasMany(Producto, { foreignKey: "categoriaFK", as: "productos"});


ventas_producto.belongsTo(Producto, { foreignKey: "fkProducto", as : "idProducto"});
ventas_producto.belongsTo(Ventas, { foreignKey: "fkVenta", as : "idVenta"});

Producto.hasMany(ventas_producto, { foreignKey: "fkProducto", as : "relacionVenta"});
Producto.hasMany(ventas_producto, { foreignKey: "fkVenta", as : "relacionVenta"});