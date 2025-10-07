import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 Componentes de productos
import ListaProductos from "./components/ListaProductos";
import FormProducto from "./components/FormProducto";

// 🔹 Componentes de autenticación
import Login from "./components/Login";
import Register from "./components/Register";
import Recuperar from "./components/Recuperar";

function PanelProductos() {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);
  const navigate = useNavigate();

  // 🔹 Obtener productos del backend
  const obtenerProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/productos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProductos(res.data);
    } catch (error) {
      console.error("❌ Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🔹 Agregar producto
  const agregarProducto = async (nuevoProducto) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/api/productos", nuevoProducto, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Producto agregado correctamente");
      await obtenerProductos();
    } catch (error) {
      console.error("❌ Error al agregar producto:", error);
      alert("❌ Error al agregar producto");
    }
  };

  // 🔹 Editar producto
  const editarProducto = (producto) => setProductoEditando(producto);

  // 🔹 Guardar edición
  const guardarEdicion = async (productoEditado) => {
    try {
      if (!productoEditado?._id) return alert("Error: el producto no tiene un ID válido");
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:4000/api/productos/${productoEditado._id}`,
        productoEditado,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Producto actualizado correctamente");
      await obtenerProductos();
      setProductoEditando(null);
    } catch (error) {
      console.error("❌ Error al actualizar producto:", error);
      alert("❌ Error al actualizar el producto");
    }
  };

  // 🗑 Eliminar producto
  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/api/productos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("🗑 Producto eliminado correctamente");
      await obtenerProductos();
    } catch (error) {
      console.error("❌ Error al eliminar producto:", error);
      alert("❌ Error al eliminar el producto");
    }
  };

  // 🚪 Cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", padding: "10px" }}>
        <h1>Gestión de Productos</h1>
        <button onClick={logout}>Cerrar sesión</button>
      </header>

      <FormProducto
        onProductoAgregado={agregarProducto}
        productoEditando={productoEditando}
        onGuardarEdicion={guardarEdicion}
      />

      <ListaProductos
        productos={productos}
        onEditar={editarProducto}
        onEliminar={eliminarProducto}
      />
    </div>
  );
}

// 🔒 Componente de protección de rutas
function RutaProtegida({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔐 Rutas de autenticación */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperar" element={<Recuperar />} />

        {/* 🧭 Rutas protegidas */}
        <Route
          path="/panel"
          element={
            <RutaProtegida>
              <PanelProductos />
            </RutaProtegida>
          }
        />

        {/* 🧭 Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
