import prisma from "../../config/db/connect-db.js";

export const verifyUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { verified: true },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.json({
      message: "User verified successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("🔥 Verify User error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
