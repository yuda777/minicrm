'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { users, type User, position, NewUser } from '@/db/schema'
import type { StoredFile, UserWithPosition } from '@/types'
import {
  and,
  asc,
  desc,
  eq,
  gt,
  gte,
  inArray,
  like,
  lt,
  lte,
  ne,
  not,
  sql,
} from 'drizzle-orm'
import { type z } from 'zod'

import type {
  getUserSchema,
  getUsersSchema,
  userSchema,
} from '@/lib/validations/user'
import { alias } from 'drizzle-orm/pg-core'
import { formatDateInTimeZone } from '@/lib/utils'

export async function checkUserAction(input: { name: string; id?: number }) {
  const userWithSameName = await db.query.users.findFirst({
    where: input.id
      ? and(not(eq(users.userId, input.id)), eq(users.name, input.name))
      : eq(users.name, input.name),
  })

  if (userWithSameName) {
    throw new Error('User name already taken.')
  }
}

const now = new Date().toISOString()
export async function addNUpdateUserAction(
  input: z.infer<typeof userSchema>,
  userId?: number,
) {
  const updateObject = {
    name: input.name,
    parentId: Number(input.parentId),
    positionId: Number(input.positionId),
    photo: input.photo,
    email: input.email,
    phoneNumber: input.phoneNumber,
    statusActive: input.statusActive,
    hireDate: formatDateInTimeZone(input.hireDate),
  }

  if (userId) {
    await db
      .update(users)
      .set({ ...updateObject, updatedAt: now })
      .where(eq(users.userId, userId)) // Adjust this condition based on your primary key
    revalidatePath('/list/[userId]', 'page')
  } else {
    await db.insert(users).values(updateObject)
    revalidatePath(`/list/new`)
  }
}

//: Promise<UserWithPosition[]>
const tp = alias(position, 'p')
export async function getHeadUser() {
  const tu = alias(users, 'u')
  const userPosition = await db
    .select({
      id: tu.userId,
      parentId: tu.parentId,
      titleCode: tp.titleCode,
      titleDesc: tp.titleDesc,
      departementCode: tp.departementCode,
      departementDesc: tp.departementDesc,
      name: tu.name,
      photo: tu.photo,
    })
    .from(tu)
    .leftJoin(tp, eq(tp.positionId, tu.positionId))
    .orderBy(tu.userId)
  return userPosition
}

export async function getPosUser() {
  const position = await db.select().from(tp).where(ne(tp.positionId, 1))
  return position
}
