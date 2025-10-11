// 📁 prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@school.com";
  const newPassword = "admin@123"; // change this to your desired password

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const existing = await prisma.user.findFirst({
    where: { email: adminEmail, role: "admin" },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        verified: true,
      },
    });
    console.log("✅ Admin user seeded successfully.");
  } else {
    await prisma.user.update({
      where: { id: existing.id },
      data: { password: hashedPassword },
    });
    console.log("🔑 Admin password updated successfully.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
