import { Router } from "express";

import {
  getAllProducts,
  getProductById,orderProduct
} from "../controllers/sampleDataController.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/order",orderProduct );
router.get("/:id", getProductById);

export default router;