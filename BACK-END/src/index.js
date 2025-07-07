import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/db_mysql.js";
import Producto from "./models/producto.model.js";
import Categoria from "./models/categoria.model.js";
import envs from "./config/envs.js";
import fs from "fs/promises";




const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/productos", async (req, res) => {
    try {
        const categoriasPath = path.join(__dirname, "public", "JSON", "categorias.json");
        const productosPath = path.join(__dirname, "public", "JSON", "productos.json");
        console.log(productosPath);


        const categoriasJSON = await fs.readFile(categoriasPath, "utf-8");
        const productosJSON = await fs.readFile(productosPath, "utf-8");

        const categorias = JSON.parse(categoriasJSON);
        const productos = JSON.parse(productosJSON).filter(p => p.stock === true);

        res.render("productos", { productos, categorias });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al cargar productos o categorías");
    }
});

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
