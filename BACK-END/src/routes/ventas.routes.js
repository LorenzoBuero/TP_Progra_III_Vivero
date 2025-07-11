import express from "express";
import { confirmarCompra } from "../controllers/ventas.controller.js";

const router = express.Router();

router.post("/ventas/confirmar", confirmarCompra);

export default router;