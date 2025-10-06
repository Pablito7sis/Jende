import { useState, useEffect } from "react";
import axios from "axios";
import ListaProductos from "./components/ListaProductos";
import FormProducto from "./components/FormProducto";

function App() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);

  // 🟢 Cargar productos desde MongoDB
  const cargarProductos = async () => {
    const res = await axios.get("http://localhost:4000/api/productos");
    setProductos(res.data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // 🟡 Cuando guardas una edición
  
 const guardarEdicion = async (productoEditado) => {
  try {
    if (!productoEditado || !productoEditado._id) {
      console.error("Error: el producto no tiene un _id válido", productoEditado);
      alert("❌ No se puede guardar: el producto no tiene un ID válido.");
      return;
    }

    await axios.put(`http://localhost:4000/api/productos/${productoEditado._id}`, productoEditado);
    alert("✅ Producto actualizado correctamente");

    obtenerProductos();
    setProductoEditando(null);
  } catch (error) {
    console.error("❌ Error al actualizar el producto:", error);
    alert("❌ Error al guardar el producto");
  }
};


  return (
    <div>
      <h1>Gestión de Productos</h1>

      <FormProducto
        onProductoAgregado={cargarProductos}
        productoEditando={productoEditando}
        onGuardarEdicion={guardarEdicion}
      />

      <ListaProductos
        productos={productos}
        onEditar={setProductoEditando}
        onEliminar={cargarProductos}
      />
    </div>
  );
}

export default App;