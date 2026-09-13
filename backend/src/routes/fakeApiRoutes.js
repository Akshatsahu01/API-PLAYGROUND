import express from "express";
import fakeApiController from "../controllers/fakeApiController.js";

const router = express.Router();

// GET /api/fake-apis         → list all fake APIs
router.get("/", fakeApiController.getAllFakeApis);

// GET /api/fake-apis/:id     → single API details
router.get("/:id", fakeApiController.getFakeApiById);

export default router;

