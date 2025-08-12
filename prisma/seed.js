// 📁 prisma/seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@school.com";

  const existing = await prisma.user.findFirst({
    where: { email: adminEmail, role: "admin" },
  });

  if (!existing) {
    const hashedPassword = await bcrypt.hash("admin@123", 10);
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
    console.log("⚠️ Admin already exists.");
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
