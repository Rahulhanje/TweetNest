import express from "express";
import dotenv from "dotenv";
import {v2 as cloudinary } from "cloudinary";
import connectDB from "./db/connect.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});