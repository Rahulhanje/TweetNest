import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/connect.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
  connectDB();
});