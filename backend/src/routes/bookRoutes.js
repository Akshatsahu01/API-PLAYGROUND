import { Router } from "express";

import {
  getAllBooks,
  getBookById,orderBook
} from "../controllers/sampleDataController.js";

const router = Router();

router.get("/", getAllBooks);
router.post("/buy", orderBook);

router.get("/:id", getBookById);

export default router;