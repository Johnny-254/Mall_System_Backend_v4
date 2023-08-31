import express from "express";

import {
  createStall,
  getAllStalls,
  getStallById,
  updateStallById,
  deleteStallById,
} from "../controllers/stallController.js";

const router = express.Router();

router.get("/stalls", getAllStalls);

router.get("/stalls/:id", getStallById);

router.post("/stalls", createStall);

router.patch("/stalls/:id", updateStallById);

router.delete("/stalls/:id", deleteStallById);

export default router;
