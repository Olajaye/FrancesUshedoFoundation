import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@1234", 12);

  const admin = await prisma.admin.upsert({
    where: { email: "admin@francesushedofoundation.org" },
    update: {},
    create: {
      email: "admin@francesushedofoundation.org",
      password: hashedPassword,
      name: "Admin",
    },
  });

  console.log("Seeded admin:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
