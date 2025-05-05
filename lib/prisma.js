import { PrismaClient } from "../lib/generated/prisma/client"

let prisma;

if (!global.prisma) {
  prisma = new PrismaClient();
  if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
  }
} else {
  prisma = global.prisma;
}

export { prisma };
