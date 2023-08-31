import express from "express";

import {
  createDept,
  getAllDepts,
  getDeptById,
  updateDeptById,
  deleteDeptById,
} from "../controllers/deptController.js";

const router = express.Router();

router.get("/depts", getAllDepts);

router.get("/dept/:id", getDeptById);

router.post("/dept", createDept);

router.patch("/dept/:id", updateDeptById);

router.delete("/dept/:id", deleteDeptById);

export default router;
