import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import productoRoutes from "./routes/productoRoutes.js"; // ✅ Faltaba esta importación

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🔹 Rutas
app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes); // ✅ Ya está bien conectado

// 🔹 Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// 🔹 Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
