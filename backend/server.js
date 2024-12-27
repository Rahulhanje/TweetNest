import express from "express";
import dotenv from "dotenv";
import {v2 as cloudinary } from "cloudinary";
import connectDB from "./db/connect.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/posts.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import cors from "cors";


dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: "783375918234471",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notification", notificationRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});