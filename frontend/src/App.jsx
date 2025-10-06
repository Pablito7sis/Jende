import { useState, useEffect } from "react";
import axios from "axios";
import ListaProductos from "./components/ListaProductos";
import FormProducto from "./components/FormProducto";

function App() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);

  // 🔹 Cargar productos al iniciar
  const obtenerProductos = async () => {
    const res = await axios.get("http://localhost:4000/api/productos");
    setProductos(res.data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🔹 Refrescar lista después de agregar
  const agregarProducto = async () => {
    await obtenerProductos();
  };

  // 🔹 Editar producto (se pasa al formulario)
  const editarProducto = (producto) => {
    setProductoEditando(producto);
  };

  // 🔹 Guardar cambios del producto editado
  const guardarEdicion = async (productoEditado) => {
    try {
      if (!productoEditado || !productoEditado._id) {
        console.error("❌ Error: el producto no tiene un _id válido", productoEditado);
        return;
      }

      await axios.put(`http://localhost:4000/api/productos/${productoEditado._id}`, productoEditado);
      alert("✅ Producto actualizado correctamente");

      await obtenerProductos(); // Refresca lista
      setProductoEditando(null); // Limpia edición
    } catch (error) {
      console.error("❌ Error al actualizar el producto:", error);
    }
  };
  // 🗑 Eliminar producto
const eliminarProducto = async (id) => {
  if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

  try {
    await axios.delete(`http://localhost:4000/api/productos/${id}`);
    alert("🗑 Producto eliminado correctamente");
    await obtenerProductos(); // Refresca la lista
  } catch (error) {
    console.error("❌ Error al eliminar el producto:", error);
    alert("❌ Error al eliminar el producto");
  }
};


  return (
    <div>
      <h1>Gestión de Productos</h1>
      <FormProducto
        onProductoAgregado={agregarProducto}
        productoEditando={productoEditando}
        onGuardarEdicion={guardarEdicion}
      />
      <ListaProductos productos={productos} onEditar={editarProducto} />
    </div>
  );
}

export default App;
