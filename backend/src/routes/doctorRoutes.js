import express from "express";
import doctorController from "../controllers/doctorController.js";
import respondToValidatedMutation from "../controllers/simulatedMutationController.js";
import validateDoctorQuery from "../middleware/validateDoctorQuery.js";
import validateDeleteQuery from "../middleware/validateDeleteQuery.js";
import validateMutationBody from "../middleware/validateMutationBody.js";

const router = express.Router();

router.get("/", validateDoctorQuery, doctorController.getAllDoctors);
router.delete("/", validateDeleteQuery("doctors"), respondToValidatedMutation);
router.put("/", validateMutationBody("doctors", "PUT"), respondToValidatedMutation);
router.patch("/", validateMutationBody("doctors", "PATCH"), respondToValidatedMutation);

export default router;
