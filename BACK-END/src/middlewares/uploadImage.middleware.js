import multer from "multer";
import path from "path";
import fs from "fs";

// Definimos el destino dinámicamente y aseguramos que exista
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "../public/imagenes/datos/productos";

    // Si la carpeta no existe, la creamos
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// Configuramos multer con límites y filtros
export const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    console.log("middleware");
    
    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagen no permitido"));
    }
  },
});