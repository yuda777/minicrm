import 'dotenv/config'
import type { Config } from 'drizzle-kit'
import { env } from '@/env.mjs'

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
