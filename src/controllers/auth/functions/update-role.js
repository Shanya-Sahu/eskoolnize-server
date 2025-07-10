import prisma from "../../../config/db/connect-db.js";

export const updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    res.status(200).json({
      message: "User role updated",
      user: {
        id: updated.id,
        name: updated.name,
        role: updated.role,
      },
    });
  } catch (error) {
    res.status(400).json({ error: "User not found or update failed" });
  }
};
