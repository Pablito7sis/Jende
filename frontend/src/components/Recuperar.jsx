import { useState } from "react";
import API_URL from "../api.js";

export default function Recuperar() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRecuperar = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch(`${API_URL}/auth/recuperar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo }),
      });

      const data = await res.json();
      setMensaje(data.message);
    } catch (error) {
      setMensaje("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <form
        onSubmit={handleRecuperar}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Recuperar contraseña
        </h2>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full mb-3 border rounded p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700"
        >
          Enviar enlace
        </button>

        <p className="text-sm text-center mt-3">
          <a href="/" className="text-blue-600">
            Volver al login
          </a>
        </p>
        {mensaje && <p className="mt-3 text-center text-sm">{mensaje}</p>}
      </form>
    </div>
  );
}
