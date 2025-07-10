import express from "express";
import { signup } from "../../controllers/auth/functions/signup.js";
import { login } from "../../controllers/auth/functions/login.js";
import { authenticateUser } from "../../middlewares/authenticate-user.js";
import { authorizeUser } from "../../middlewares/authorize-user.js";
import { updateUserRole } from "../../controllers/auth/functions/update-role.js";

const router = express.Router();

// Public
router.post("/signup", signup);
router.post("/login", login);

// Admin only
router.patch(
  "/update-role",
  authenticateUser,
  authorizeUser(["ADMIN"]),
  updateUserRole
);

export default router;
