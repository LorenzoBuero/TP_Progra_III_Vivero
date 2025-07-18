import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js";
import Admin from "../models/admin.model.js";
import { crearProducto } from "../services/producto.service.js";
import { crearCategoria } from "../services/categoria.service.js";
import { crearAdmin } from "../services/admin.service.js";
import sequelize from "../config/db_mysql.js";

// ------- Datos por defecto -------
const productosDefault = [
    {
        nombre:"venus atrapamoscas",
        categoria:5,
        stock:true,
        precio:10000.00,
        imagen:"../imagenes/datos/productos/venus_atrapamoscas.jpg"
    },
    {
        nombre:"yerba mate",
        categoria:6,
        stock:true,
        precio:4000.00,
        imagen:"../imagenes/datos/productos/yerba_mate.jpg"
    },
    {
        nombre:"ramo de margaritas",
        categoria:2,
        stock:true,
        precio:3000.00,
        imagen:"../imagenes/datos/productos/ramo margaritas.jpg"
    },
    {
        nombre:"clavel del aire",
        categoria:2,
        stock:true,
        precio:302.32,
        imagen:"../imagenes/datos/productos/clavel_del_aire.jpg"
    },
    {
        nombre:"maceta plastico cuadrada 20cm x 30cm",
        categoria:1,
        stock:true,
        precio:1700.02123,
        imagen:"../imagenes/datos/productos/maceta_plastico_30_x_25.webp"
    },
    {
        nombre:"álamo",
        categoria:3,
        stock:true,
        precio:15000.00,
        imagen:"../imagenes/datos/productos/álamo.jpg"
    },
    {
        nombre:"zapallo",
        categoria:4,
        stock:true,
        precio:6000.00,
        imagen:"../imagenes/datos/productos/planta_de_zapallos.jpg"
    },
    {
        nombre:"lirio",
        categoria:2,
        stock:true,
        precio:4000.00,
        imagen:"../imagenes/datos/productos/lirios.jpg"
    },
    {
        nombre:"hongo hermoso",
        categoria:5,
        stock:false,
        precio:8000.00,
        imagen:"../imagenes/datos/productos/hongo_hermoso.jpg"
    },
    {
        nombre:"semillas álamo",
        categoria:3,
        stock:true,
        precio:3000.00,
        imagen:"../imagenes/datos/productos/alamo_semillas.jpg"
    },
    {
        nombre:"BURRITO",
        categoria:6,
        stock:true,
        precio:4000.20,
        imagen:"../imagenes/datos/productos/burrito.jpg"
    },
    {
        nombre:"jacarandá",
        categoria:3,
        stock:true,
        precio:15000.00,
        imagen:"../public/imagenes/datos/productos/jacaranda.jpg"
    },
    {
        nombre:"pala de mano abuelita-Jardinera",
        categoria:1,
        stock: true,
        precio: 5000.00,
        imagen: "../public/imagenes/datos/productos/pala_de_mano_Abuela.jpg"
    },
    {
        nombre: "aloe vera",
        categoria: 7,
        stock: false,
        precio: 2000.00,
        imagen: "../public/imagenes/datos/productos/aloe_vera.jpg"
    }
];

const categorias = [
    {
        nombre:"otros--no-plantas",
        imagen:"../imagenes/datos/categorias/no-plantas.png"
    },
    {
        nombre:"flores",
        imagen:"../imagenes/datos/categorias/flores.png"
    },
    {
        nombre:"cultivos",
        imagen:"../imagenes/datos/categorias/cultivos.png"
    },
    {
        nombre:"arboles",
        imagen:"../imagenes/datos/categorias/arboles.png"
    },
    {
        nombre:"exoticos",
        imagen:"../imagenes/datos/categorias/Planta-atrapamoscas.png"
    },
    {
        nombre:"cactus-y-suculentas",
        imagen:"../imagenes/datos/categorias/cactus-y-suculentas.png"
    },
    {
        nombre:"para-el-mate",
        imagen:"../imagenes/datos/categorias/para-el-mate.png"
    }
];

const admins = [
    {
        mail : "lore@perrito.com",
        contrasenia : "mantaraya"
    },
    {
        mail : "admin@vivero.com",
        contrasenia: "1234"
    }
];

// ------- Funciones para insertar -------
const subirCategoriasADB = async (cats) => {
    for (const cat of cats) {
        await crearCategoria({
            nombre: cat.nombre,
            imagen: cat.imagen
        });
    }
};

const subirProductosADB = async (prods) => {
    for (const prod of prods) {
        await crearProducto({
            nombre: prod.nombre,
            categoriaFK: prod.categoria,
            stock: prod.stock,
            precio: prod.precio,
            imagen: prod.imagen
        });
    }
};

const subirAdminsADB = async (adms) => {
    for (const adm of adms) {
        await crearAdmin(adm.mail, adm.contrasenia);
    }
};

// ------- Carga inicial -------
export const subirDatos = async () => {
    if (await Categoria.count() === 0){
        console.log("Agregando *categorías* a la DB");
        await subirCategoriasADB(categorias);
    }

    if (await Producto.count() === 0){
        console.log("Agregando *productos* a la DB");
        await subirProductosADB(productosDefault);
    }

    if (await Admin.count() === 0){
        console.log("Agregando *admins* a la DB");
        await subirAdminsADB(admins);
    }
};

// ------- Reinicio forzado -------
export const resubirDatos = async () => {
    await Producto.drop();
    await Categoria.drop();
    await Admin.drop();

    await sequelize.sync({ force: true }); // recrear estructura

    await subirCategoriasADB(categorias);
    await subirProductosADB(productosDefault);
    await subirAdminsADB(admins);
};
