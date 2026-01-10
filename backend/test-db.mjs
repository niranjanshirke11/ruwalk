import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pgPkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { PrismaClient } = pkg;
const { Pool } = pgPkg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users:", users);
  } catch (error) {
    console.error("Database Test Error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
