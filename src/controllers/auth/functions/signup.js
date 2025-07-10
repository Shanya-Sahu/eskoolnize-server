import bcrypt from "bcryptjs";
import prisma from "../../../config/db/connect-db.js";
import { generateToken } from "../../../utils/generate-token.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return res.status(409).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "STUDENT",
      verified: true,
    },
  });

  const token = generateToken(user);
  res.status(201).json({ token, role: user.role });
};
