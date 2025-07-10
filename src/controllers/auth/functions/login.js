import bcrypt from "bcryptjs";
import prisma from "../../../config/db/connect-db.js";
import { generateToken } from "../../../utils/generate-token.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send("Invalid credentials");

  const token = generateToken(user);
  res.status(200).json({ token, role: user.role });
};
