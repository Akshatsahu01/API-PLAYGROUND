import express from "express";
import patientController from "../controllers/patientController.js";
import validatePatientQuery from "../middleware/validatePatientQuery.js";
import respondToValidatedMutation from "../controllers/simulatedMutationController.js";
import validateDeleteQuery from "../middleware/validateDeleteQuery.js";
import validateMutationBody from "../middleware/validateMutationBody.js";
const router = express.Router();
router.get("/", validatePatientQuery, patientController.getAllPatients);
router.delete("/", validateDeleteQuery("patients"), respondToValidatedMutation);
router.put("/", validateMutationBody("patients", "PUT"), respondToValidatedMutation);
router.patch("/", validateMutationBody("patients", "PATCH"), respondToValidatedMutation);

export default router;
