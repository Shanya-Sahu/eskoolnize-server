import bcrypt from "bcryptjs";
import prisma from "../../../config/db/connect-db.js";
import { generateToken } from "../../../utils/jwt/generate-token.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateToken(user);

    return res.status(200).json({
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
    console.error("🔥 Login error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
