// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis;

// const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// export default prisma;

// src/config/db/connect-db.js
import { PrismaClient } from "@prisma/client";

// Keep exactly one PrismaClient during dev hot reloads
const globalForPrisma = globalThis;

// Reuse the existing instance if present
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Cache on global in dev
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
