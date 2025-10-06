import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this";

router.post("/register", async (req,res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const u = new User({ username, email, passwordHash: hash });
  await u.save();
  res.json({ ok: true });
});

// login
router.post("/login", async (req,res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if(!user) return res.status(401).json({ error: "Credenciales inválidas" });
  const ok = await user.verifyPassword(password);
  if(!ok) return res.status(401).json({ error: "Credenciales inválidas" });
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ token, user: { username: user.username, email: user.email, role: user.role } });
});

export default router;
