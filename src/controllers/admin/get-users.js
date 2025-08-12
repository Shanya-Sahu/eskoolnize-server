import prisma from "../../config/db/connect-db.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: "cme706qjx0000v74cwuy87s81",
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        rollNumber: true,
        role: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json(users);
  } catch (error) {
    console.error("🔥 Get Users error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
