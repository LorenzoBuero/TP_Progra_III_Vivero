import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/db_mysql.js";
import envs from "./config/envs.js";
import productosRouter from "./routes/producto.routes.js";
import viewsRouter from "./routes/views.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware para parsear JSON (importante para POST y PUT con body JSON)
app.use(express.json());

// Rutas API (productos CRUD)
app.use("/api/productos", productosRouter);

// Rutas vistas (HTML + EJS)
app.use("/", viewsRouter);

async function iniciar() {
  try {
    await sequelize.sync();
    console.log("✅ Conexión DB lista");
    app.listen(envs.port || 3000, () =>
      console.log(`🚀 Servidor en http://localhost:${envs.port || 3000}`)
    );
  } catch (error) {
    console.error("Error DB:", error);
  }
}

iniciar();
