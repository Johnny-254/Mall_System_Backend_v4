import express from "express";

import {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenantById,
  deleteTenantById,
} from "../controllers/TenantController.js";

const router = express.Router();

router.get("/tenants", getAllTenants);

router.get("/tenant/:id", getTenantById);

router.post("/tenant", createTenant);

router.patch("/tenant/:id", updateTenantById);

router.delete("/tenant/:id", deleteTenantById);

export default router;
