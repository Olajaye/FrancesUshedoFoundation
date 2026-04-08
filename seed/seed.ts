import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import bcrypt from "bcryptjs";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const DEFAULT_EMAIL = "admin@tfuf.org";
const DEFAULT_PASSWORD = "Admin@1234";
const DEFAULT_NAME = "Admin";

async function main() {
  const email = process.env.ADMIN_EMAIL ?? DEFAULT_EMAIL;
  const password = process.env.ADMIN_PASSWORD ?? DEFAULT_PASSWORD;
  const name = process.env.ADMIN_NAME ?? DEFAULT_NAME;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin account already exists: ${email}`);
    return;
  }

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { email, name, password: hashed },
  });

  console.log(`Admin account created: ${user.email}`);
  console.log(`Password: ${password}`);
  console.log("Change the password after first login.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
