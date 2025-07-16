import bcrypt from "bcryptjs";
import prisma from "../../../config/db/connect-db.js";
import { generateToken } from "../../../utils/jwt/generate-token.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!["Teacher", "Student", "Parent"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
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
        role: user.role,
        verified: user.verified || false,
      },
    });
  } catch (error) {
    console.error("🔥 Signup error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
