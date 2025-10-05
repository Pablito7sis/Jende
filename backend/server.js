import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Conexión con MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// 📦 Importar las rutas
import productoRoutes from "./routes/productoRoutes.js";
// (más adelante también agregaremos usuarios, login, reportes, etc.)

// 🧭 Usar las rutas
app.use("/api/productos", productoRoutes);

// 🖥️ Levantar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
