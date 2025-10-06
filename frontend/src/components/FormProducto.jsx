import { useState, useEffect } from "react";
import axios from "axios";

const FormProducto = ({ onProductoAgregado, productoEditando, onGuardarEdicion }) => {
  const [producto, setProducto] = useState({
    _id: "",
    nombre: "",
    precio: "",
    descripcion: "",
    foto: "",
    stock: "",
    sku: ""
  });

  useEffect(() => {
    if (productoEditando) {
      setProducto(productoEditando); // Carga el producto a editar (incluye el _id)
    } else {
      setProducto({
        _id: "",
        nombre: "",
        precio: "",
        descripcion: "",
        foto: "",
        stock: "",
        sku: ""
      });
    }
  }, [productoEditando]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (producto._id) {
        // 🟢 Editar producto existente
        await axios.put(`http://localhost:4000/api/productos/${producto._id}`, producto);
        alert("✅ Producto actualizado correctamente");
        onGuardarEdicion();
      } else {
        // 🔵 Crear nuevo producto
        await axios.post("http://localhost:4000/api/productos", producto);
        alert("✅ Producto agregado correctamente");
        onProductoAgregado();
      }

      // Limpia el formulario
      setProducto({
        _id: "",
        nombre: "",
        precio: "",
        descripcion: "",
        foto: "",
        stock: "",
        sku: ""
      });
    } catch (err) {
      console.error("❌ Error al guardar el producto:", err);
      alert("❌ Error al guardar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{producto._id ? "Editar Producto" : "Registrar Producto"}</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={producto.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={producto.precio}
        onChange={handleChange}
        required
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={producto.descripcion}
        onChange={handleChange}
      ></textarea>
      <input
        type="text"
        name="foto"
        placeholder="URL de la foto"
        value={producto.foto}
        onChange={handleChange}
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={producto.stock}
        onChange={handleChange}
      />
      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={producto.sku}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {producto._id ? "Guardar Cambios" : "Agregar Producto"}
      </button>
    </form>
  );
};

export default FormProducto;
