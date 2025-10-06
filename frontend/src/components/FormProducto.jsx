import { useEffect, useState } from "react";

const FormProducto = ({ onGuardar, productoEditar, onGuardarEdicion }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    sku: "",
    foto: "",
  });

  // 📌 Si llega un producto para editar, se carga en el formulario
  useEffect(() => {
    if (productoEditar) {
      setFormData(productoEditar);
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productoEditar) {
      onGuardarEdicion(formData);
    } else {
      onGuardar(formData);
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
      <h2>{productoEditar ? "✏️ Editar Producto" : "➕ Agregar Producto"}</h2>

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
        {productoEditar ? "💾 Guardar Cambios" : "➕ Agregar Producto"}
      </button>
    </form>
  );
};

export default FormProducto;
