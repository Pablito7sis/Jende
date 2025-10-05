import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4000;

// 🔹 Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err));

// Rutas simples para probar
app.get("/", (req, res) => {
  res.send("Servidor conectado con MongoDB Atlas 🚀");
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
