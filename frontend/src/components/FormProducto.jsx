import { useEffect, useState } from "react";

const FormProducto = ({ onProductoAgregado, productoEditando, onGuardarEdicion }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    sku: "",
    foto: "",
  });

  // 📌 Cargar datos si se va a editar
  useEffect(() => {
    if (productoEditando) {
      setFormData(productoEditando);
    } else {
      setFormData({
        nombre: "",
        precio: "",
        descripcion: "",
        stock: "",
        sku: "",
        foto: "",
      });
    }
  }, [productoEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productoEditando) {
      onGuardarEdicion(formData);
    } else {
      onProductoAgregado(formData);
    }

    // 🧹 Limpia el formulario después de guardar
    setFormData({
      nombre: "",
      precio: "",
      descripcion: "",
      stock: "",
      sku: "",
      foto: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{productoEditando ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="number"
        name="precio"
        placeholder="Precio"
        value={formData.precio}
        onChange={handleChange}
        required
      />
      <br />

      <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
      />
      <br />

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={formData.stock}
        onChange={handleChange}
      />
      <br />

      <input
        type="text"
        name="sku"
        placeholder="SKU"
        value={formData.sku}
        onChange={handleChange}
      />
      <br />

      <input
        type="text"
        name="foto"
        placeholder="URL de la imagen"
        value={formData.foto}
        onChange={handleChange}
      />
      <br />

      <button type="submit">
        {productoEditando ? "💾 Guardar Cambios" : "➕ Agregar Producto"}
      </button>
    </form>
  );
};

export default FormProducto;
