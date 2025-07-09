// admin.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js"; // asumí que lo tenés
import { requiereAutenticacion } from "../middlewares/autenticacion.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/imagenes/productos/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Mostrar dashboard (listado productos)
router.get("/admin/dashboard", requiereAutenticacion, async (req, res) => {
    try {
    const productos = await Producto.findAll({
      include: {
        model: Categoria,
        as: "categoria",
        attributes: ['id', 'nombre', 'imagen']  // opcional
      }
    });
    res.render("adminDashboard.ejs", { productos });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar dashboard");
  }
});

// Formulario alta producto
router.get("/admin/productos/nuevo", requiereAutenticacion, async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.render("adminAltaProducto.ejs", { categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar formulario alta producto");
  }
});

// Crear producto (POST)
router.post("/admin/productos", requiereAutenticacion, upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, categoriaFK, precio } = req.body;
    const imagen = `/imagenes/productos/${req.file.filename}`;

    await Producto.create({
      nombre,
      categoriaFK,
      stock: true,
      precio,
      imagen
    });

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).send("Error al crear producto");
  }
});

// Formulario editar producto
router.get("/admin/productos/:id/editar", requiereAutenticacion, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).send("Producto no encontrado");
    const categorias = await Categoria.findAll();

    res.render("adminEditarProducto.ejs", { producto, categorias });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al cargar producto para editar");
  }
});

// Editar producto (POST en vez de PUT)
router.post("/admin/productos/:id/editar", requiereAutenticacion, upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, categoriaFK, precio } = req.body;
    const id = req.params.id;
    const producto = await Producto.findByPk(id);

    if (!producto) return res.status(404).send("Producto no encontrado");

    producto.nombre = nombre;
    producto.categoriaFK = categoriaFK;
    producto.precio = precio;

    if (req.file) {
      producto.imagen = `/imagenes/productos/${req.file.filename}`;
    }

    await producto.save();

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error al editar producto:", error);
    res.status(500).send("Error al editar producto");
  }
});

// Dar de baja producto (POST)
router.post("/admin/productos/:id/baja", requiereAutenticacion, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).send("Producto no encontrado");

    producto.stock = false; // baja lógica
    await producto.save();

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error al dar baja producto:", error);
    res.status(500).send("Error al dar baja producto");
  }
});

// Dar de alta producto (POST)
router.post("/admin/productos/:id/alta", requiereAutenticacion, async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).send("Producto no encontrado");

    producto.stock = true; // alta lógica
    await producto.save();

    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Error al dar alta producto:", error);
    res.status(500).send("Error al dar alta producto");
  }
});



router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@vivero.com" && password === "1234") {
    req.session.usuarioAutenticado = true;
    res.redirect("/admin/dashboard");
  } else {
    res.status(401).send("Credenciales incorrectas. <a href='/admin'>Volver</a>");
  }
});


export default router;