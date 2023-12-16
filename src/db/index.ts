import { drizzle } from 'drizzle-orm/postgres-js'
import { users } from '@/db/schema'
import postgres from 'postgres'

const sql = postgres(process.env.DATABASE_URL as string, { max: 1 })
export const db = drizzle(sql, { schema: { users } })
// export const db = drizzle(sql)
