import bcrypt from "bcryptjs";
import prisma from "../../../config/db/connect-db.js";
import { generateToken } from "../../../utils/jwt/generate-token.js";

export const signup = async (req, res) => {
  try {
    const { name, email, rollNumber, password, role } = req.body;

    // Validate required fields based on role
    if (!name || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!["teacher", "student", "parent"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    if (role === "student" && !rollNumber) {
      return res
        .status(400)
        .json({ message: "Roll number is required for students." });
    }

    if (role !== "student" && !email) {
      return res
        .status(400)
        .json({ message: "Email is required for non-students." });
    }

    // Check if user already exists
    const existingUser =
      role === "student"
        ? await prisma.user.findUnique({ where: { rollNumber } })
        : await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: role === "student" ? null : email,
        rollNumber: role === "student" ? rollNumber : null,
        password: hashedPassword,
        role,
      },
    });

    const token = generateToken(user);

    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        rollNumber: user.rollNumber,
        role: user.role,
        verified: user.verified || false,
      },
    });
  } catch (error) {
    console.error("🔥 Signup error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
