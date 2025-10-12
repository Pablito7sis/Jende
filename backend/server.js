import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

dotenv.config();

// ✅ Necesario para resolver __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ✅ Habilitar CORS y JSON
app.use(cors());
app.use(express.json());

// ✅ Servir imágenes desde /productos (RUTA CORRECTA)
app.use("/productos", express.static(path.join(__dirname, "productos")));

// ✅ Servir imágenes de multer si usas /uploads (opcional)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Rutas de productos (API REST protegida con token)
app.use("/api/productos", productoRoutes);

// ✅ Rutas de autenticación
app.use("/api/auth", authRoutes);

// ✅ Conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// ✅ Levantar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
