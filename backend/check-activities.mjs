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
    const activities = await prisma.activity.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, name: true, distanceM: true }
    });
    console.log("Recent Activities:", JSON.stringify(activities, null, 2));
  } catch (error) {
    console.error("Database Test Error:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main();
