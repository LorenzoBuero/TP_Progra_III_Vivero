import Producto from "./producto.model.js";
import Categoria from "./categoria.model.js";

// Asociación Producto -> Categoria (muchos productos tienen una categoría)
Producto.belongsTo(Categoria, { foreignKey: "categoriaFK", as : "categoria"});

// Asociación Categoria -> Producto (una categoría tiene muchos productos)
Categoria.hasMany(Producto, { foreignKey: "categoriaFK", as: "productos"});