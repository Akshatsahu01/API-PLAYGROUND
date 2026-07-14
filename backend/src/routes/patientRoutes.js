import express from "express";
import patientController from "../controllers/patientController.js"
const router=express.Router()
router.get("/",patientController.getAllPatients)

export default router

