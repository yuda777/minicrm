import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: process.env.PGHOST ?? '',
    port: +(process.env.PGPORT ?? '0'),
    database: process.env.PGDATABASE ?? '',
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
  breakpoints: true,
} satisfies Config

// password: process.env.PGPASSWORD,
// host: process.env.PGHOST,
// user: process.env.PGUSER,
// database: process.env.PGDATABASE,
