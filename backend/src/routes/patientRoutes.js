import express from "express";
import patientController from "../controllers/patientController.js";
import validatePatientQuery from "../middleware/validatePatientQuery.js";
const router = express.Router();
router.get("/", validatePatientQuery, patientController.getAllPatients);

export default router;
