import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import { syncData } from "./syncDB.js";

import authRoutes from "./routes/authRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

dotenv.config();

// Configuración de rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas estáticas (imágenes, archivos, etc.)
app.use("/productos", express.static(path.join(__dirname, "productos")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas API
app.use("/api/productos", productoRoutes);
app.use("/api/auth", authRoutes);

// Conexión a MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000, // aumenta el tiempo de espera
  })
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar MongoDB:", err));

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

// 🔁 CRON JOB ➜ Ejecutar syncData() cada 1 minuto (solo en entorno local)
if (process.env.NODE_ENV !== "production") {
  cron.schedule("*/1 * * * *", async () => {
    console.log("⏳ Ejecutando sincronización automática (modo desarrollo)...");
    try {
      await syncData();
    } catch (err) {
      console.error("❌ Error en sincronización:", err);
    }
  });
}
