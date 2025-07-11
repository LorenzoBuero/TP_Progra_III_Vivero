import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/db_mysql.js";
import envs from "./config/envs.js";
import "./models/asociaciones.model.js";
import productosRouter from "./routes/producto.routes.js";
import viewsRouter from "./routes/views.routes.js";
import adminRouter from "./routes/admin.routes.js"
import { subirDatos } from "./config/db_setup.js";
import { hashearSHA256 } from "./utils/hasheador.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src/public")));

app.use(express.urlencoded({ extended: true }));

//session
app.use(session({
  secret: "clave-secreta",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 } // 1 hora
}));

// Middleware para parsear JSON (importante para POST y PUT con body JSON)
app.use(express.json());

// Rutas API (productos CRUD)
app.use("/api/productos", productosRouter);

// Rutas vistas (HTML + EJS)
app.use("/", viewsRouter);

// Rutas admin
app.use("/", adminRouter)

async function iniciar() {
  try {
    await sequelize.sync();
    console.log("✅ Conexión DB lista");
    app.listen(envs.port || 3000, () =>
      console.log(`🚀 Servidor en http://localhost:${envs.port || 3000}`)
    );
    subirDatos();
  } catch (error) {
    console.error("Error DB:", error);
  }
  
}

iniciar();

console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
hashearSHA256("holisss")

/*sequelize.query("describe productos").then(function(rows) {
    console.log(JSON.stringify(rows));});
*/