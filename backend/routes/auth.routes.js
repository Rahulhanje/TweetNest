import express from "express";
import { signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/signup", signup );

router.post("/login", (req, res) => {
  res.json({message:"YOu hit login route"});
});

router.post("/logout", (req, res) => {
  res.json({message:"YOu hit logout route"});
});
export default router;