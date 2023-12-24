// ./index
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from './schema'
import postgres from 'postgres'
import config from '../../drizzle.config'

const sql = postgres({
  host: process.env.PGHOST,
  port: +(process.env.PGPORT ?? '5432'),
  db: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})
export const db = drizzle(sql, { schema })
// export const db = drizzle(sql)
