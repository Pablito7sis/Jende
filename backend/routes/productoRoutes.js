import express from "express";
import Producto from "../models/Producto.js";

const router = express.Router();

// 🟢 Obtener todos los productos
router.get("/", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// 🔵 Agregar un nuevo producto
router.post("/", async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🟠 Actualizar un producto
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔴 Eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
