import express from "express";

import {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
} from "../controllers/staffController.js";

const router = express.Router();

router.get("/staff", getAllStaff);

router.get("/staff/:id", getStaffById);

router.post("/staff", createStaff);

router.patch("/staff/:id", updateStaffById);

router.delete("/staff/:id", deleteStaffById);

export default router;
