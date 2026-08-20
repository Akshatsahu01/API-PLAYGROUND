import express from "express";
import doctorController from "../controllers/doctorController.js";
import validateDoctorQuery from "../middleware/validateDoctorQuery.js";

const router = express.Router();

router.get("/", validateDoctorQuery, doctorController.getAllDoctors);

export default router;