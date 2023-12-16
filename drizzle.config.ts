import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  breakpoints: true,
} satisfies Config;

// password: process.env.PGPASSWORD,
// host: process.env.PGHOST,
// user: process.env.PGUSER,
// database: process.env.PGDATABASE,
