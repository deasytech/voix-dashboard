import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DB credentials error");
}

const connection = mysql.createConnection(process.env.DATABASE_URL || "");
// const connection = mysql.createPool({
//   host: process.env.DB_HOST!,
//   port: parseInt(process.env.DB_PORT!),
//   user: process.env.DB_USER!,
//   password: process.env.DB_PASS!,
//   database: process.env.DB_NAME!,
// });

export const db = drizzle(connection, {
  schema: { ...schema },
  mode: "default",
});