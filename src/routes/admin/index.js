import express from "express";
import { authenticateUser } from "../../middlewares/authenticate-user.js";
import { authorizeUser } from "../../middlewares/authorize-user.js";
import { getAllUsers } from "../../controllers/admin/get-users.js";
import { verifyUser } from "../../controllers/admin/verify-user.js";

const router = express.Router();

// Get all users (Admin only)
router.get("/users", authenticateUser, authorizeUser(["ADMIN"]), getAllUsers);

// Verify a user (Admin only)
router.patch(
  "/verify-user",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  verifyUser
);

export default router;
