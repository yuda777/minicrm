import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'

import postgres from 'postgres'

require('dotenv').config()

// const dotenv = require("dotenv");
const doMigrate = async () => {
  console.log(process.env.DATABASE_URL)
  try {
    const sql = postgres(process.env.DATABASE_URL as string, { max: 1 })
    const db = drizzle(sql)
    await migrate(db, { migrationsFolder: 'drizzle' })
    console.log('migration Done')
    process.exit(0)
  } catch (e) {
    console.log('migration error : ', e)
    process.exit(0)
  }
}
doMigrate()
