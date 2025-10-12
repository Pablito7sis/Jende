// backend/utils/mailer.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,  // correo desde .env
    pass: process.env.EMAIL_PASS,  // clave de aplicación desde .env
  },
});

export default transporter;
