import { Router } from "express";

import {
  getAllPosts,
  getPostById,
  createPost
} from "../controllers/sampleDataController.js";

const router = Router();

router.get("/", getAllPosts);
router.post("/post", createPost);
router.get("/:id", getPostById);

export default router;