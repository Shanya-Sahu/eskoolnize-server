import express from "express";
import authRoutes from "./auth/index.js";
import adminRoutes from "./admin/index.js";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
export default router;
