import Producto from "../models/Producto.js";

// 🟢 Crear nuevo producto con imagen y SKU incremental
export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, stock } = req.body;
    
    // Validación básica
    if (!nombre || !precio) {
      return res.status(400).json({ mensaje: "Nombre y precio son obligatorios" });
    }

    // Obtener último SKU y generar uno nuevo incremental
    const ultimoProducto = await Producto.findOne().sort({ sku: -1 });
    const nuevoSKU = ultimoProducto ? ultimoProducto.sku + 1 : 1;

    // Obtener la ruta de la imagen si fue subida
    const rutaFoto = req.file ? `/productos/${req.file.filename}` : "";

    // Crear producto
    const nuevoProducto = new Producto({
      nombre,
      precio,
      descripcion,
      stock,
      foto: rutaFoto,
      sku: nuevoSKU
    });

    await nuevoProducto.save();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ mensaje: "Error al crear el producto", error });
  }
};

// 🟡 Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener productos", error });
  }
};

// 🔵 Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const id = req.params.id;
    const { nombre, precio, descripcion, stock } = req.body;

    const updateData = { nombre, precio, descripcion, stock };

    // Si se envió una nueva foto, actualizarla
    if (req.file) {
      updateData.foto = `/productos/${req.file.filename}`;
    }

    const productoActualizado = await Producto.findByIdAndUpdate(id, updateData, { new: true });

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ mensaje: "Error al actualizar producto", error });
  }
};

// 🔴 Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    await Producto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar producto", error });
  }
};
