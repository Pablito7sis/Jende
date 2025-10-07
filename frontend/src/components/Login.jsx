import { useState } from "react";
import API_URL from "../api.js";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contraseña }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMensaje("Inicio de sesión exitoso ✅");
      } else {
        setMensaje(data.message || "Error al iniciar sesión ❌");
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full mb-3 border rounded p-2"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          className="w-full mb-3 border rounded p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Ingresar
        </button>

        <p className="text-sm text-center mt-3">
          <a href="/recuperar" className="text-blue-600">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
        {mensaje && <p className="mt-3 text-center text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}
