import express from "express";
import doctorController from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", doctorController.getAllDoctors);

export default router;