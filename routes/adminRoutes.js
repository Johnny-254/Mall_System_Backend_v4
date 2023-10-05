import express from "express";

import {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/admins", getAllAdmins);

router.get("/admin/:id", getAdminById);

router.post("/admin", createAdmin);

router.patch("/admin/:id", updateAdminById);

router.delete("/admin/:id", deleteAdminById);

export default router;
