import express from "express";
import Producto from "../models/Producto.js";

const router = express.Router();

// ✅ Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const guardado = await nuevoProducto.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear producto", error });
  }
});

// ✅ Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
});

export default router;
