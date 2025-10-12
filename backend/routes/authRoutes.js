import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { recuperarPassword } from "../controllers/authController.js";
import User from "../models/User.js";

const router = express.Router();

// 🔹 REGISTRO
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "Todos los campos son obligatorios" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "El usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

// ✅ Recuperación de contraseña (por código enviado al correo - método correcto)
router.post("/recuperar", recuperarPassword);

export default router;
