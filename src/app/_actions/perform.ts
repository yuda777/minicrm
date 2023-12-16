'use server'

import { db } from '@/db'
import { employeePerformance } from '@/db/schema'
import { eq, sql } from 'drizzle-orm'

type Input = {
  userId: number
  valueAdd: number
}

export async function updatePerformance(input: Input) {
  await db
    .update(employeePerformance)
    .set({
      performanceScore: sql`${employeePerformance.performanceScore} + ${Number(
        input.valueAdd,
      )}`,
    })
    .where(eq(employeePerformance.userId, Number(input.userId)))
}

export async function getUser() {
  const Performance = await db
    .select({
      id: employeePerformance.userId,
      user: sql<string>`SPLIT_PART(${employeePerformance.name},' ',1)`,
      perform: employeePerformance.performanceScore,
    })
    .from(employeePerformance)
    .orderBy(employeePerformance.performanceId)
  return Performance
}
