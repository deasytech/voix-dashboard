import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DB URL is missing");
}

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    // host: process.env.DB_HOST!,
    // port: parseInt(process.env.DB_PORT!),
    // user: process.env.DB_USER!,
    // password: process.env.DB_PASS!,
    // database: process.env.DB_NAME!,
  },
  dialect: "mysql",
});
