import express from "express";
import { createReview, getReviews } from "../controllers/reviewsController.js";

const router = express.Router();

router.get("/get/:id", getReviews);
router.post("/add", createReview);

export default router;
