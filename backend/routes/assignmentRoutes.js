import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();
import {
  getAssignments,
  getAssignmentById,
  deleteAssignment,
  updateAssignment,
  createAssignment,
} from "../controllers/assignmentController.js";

router.route("/").get(getAssignments).post(protect, admin, createAssignment);
router
  .route("/:id")
  .get(getAssignmentById)
  .delete(protect, admin, deleteAssignment)
  .put(protect, admin, updateAssignment);

export default router;
