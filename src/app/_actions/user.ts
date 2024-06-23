'use server'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { users, type User, position, NewUser } from '@/db/schema'
import type { IParamSearch } from '@/types'
import { SQLWrapper, and, asc, desc, eq, ne, not, sql } from 'drizzle-orm'
import { type z } from 'zod'
import {
  TableAlias,
  tableForQueryBuilder as t,
  tableForQueryBuilder,
} from '@/config/advanceSearch'
import type {
  getUserSchema,
  getUsersSchema,
  userSchema,
} from '@/lib/validations/user'
import { alias } from 'drizzle-orm/pg-core'
import { formatDateInTimeZone } from '@/lib/utils'
import { queryWhereBuilder } from '@/db/query'

export async function checkUserAction(input: { name: string; id?: number }) {
  const userWithSameName = await db.query.users.findFirst({
    where: input.id
      ? and(not(eq(users.userId, input.id)), eq(users.userName, input.name))
      : eq(users.userName, input.name),
  })

  if (userWithSameName) {
    throw new Error('User name already taken.')
  }
}

const now = new Date()
export async function addNUpdateUserAction(
  input: z.infer<typeof userSchema>,
  userId?: number,
) {
  const updateObject = {
    userName: input.userName,
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
      .set({ ...updateObject, updatedAt: now.toISOString() })
      .where(eq(users.userId, userId)) // Adjust this condition based on your primary key
    revalidatePath('/list/[userId]', 'page')
  } else {
    await db.insert(users).values(updateObject)
    revalidatePath(`/list/new`)
  }
}

//: Promise<UserWithPosition[]>
// const tp = alias(position, 'p')
export async function getHeadUser() {
  const userPosition = await db
    .select({
      id: t.tu.userId,
      parentId: t.tu.parentId,
      titleCode: t.tp.titleCode,
      titleDesc: t.tp.titleDesc,
      departementCode: t.tp.departementCode,
      departementDesc: t.tp.departementDesc,
      userName: t.tu.userName,
      photo: t.tu.photo,
    })
    .from(t.tu)
    .leftJoin(t.tp, eq(t.tp.positionId, t.tu.positionId))
    .orderBy(t.tu.userId)
  return userPosition
}

export async function getPosUser() {
  const position = await db.select().from(t.tp).where(ne(t.tp.positionId, 1))
  return position
}

export const fetchUsers = async ({
  dataSubmit,
  page,
  sort,
}: {
  dataSubmit: IParamSearch
  page: number
  sort: string
}) => {
  const limit = 5
  const offset = page > 0 ? limit * (page - 1) : 0
  const [column, order] =
    typeof sort === 'string'
      ? (sort.split('.') as [
          keyof User | undefined,
          'asc' | 'desc' | undefined,
        ])
      : []
  console.log('limit:', limit, 'offset:', offset)
  console.log('column:', column, 'order:', order)

  const tableUsed = [t.tp, t.tu] as TableAlias[]
  const queryWhere = queryWhereBuilder({ dataSubmit, tableUsed })
  // Transaction is used to ensure both queries are executed in a single transaction
  const { userPositionWithSuperior, totalUsers } = await db.transaction(
    async (tx) => {
      const userPositionWithSuperior = await tx
        .select({
          userId: t.tu.userId,
          parentId: t.tu.parentId,
          userName: t.tu.userName,
          userTitleCode: t.tp.titleCode,
          userTitleDesc: t.tp.titleDesc,
          userDeptCode: t.tp.departementCode,
          userDeptDesc: t.tp.departementDesc,
          userPhoto: t.tu.photo,
          userEmail: t.tu.email,
          userPhone: t.tu.phoneNumber,
          userHireDate: t.tu.hireDate,
          userStatusActive: t.tu.statusActive,
          superiorTitleCode: t.tp2.titleCode,
          superiorTitleDesc: t.tp2.titleDesc,
          superiorDeptCode: t.tp.departementCode,
          superiorDeptDesc: t.tp.departementDesc,
          superiorName: t.tu2.userName,
        })
        .from(t.tu)
        .limit(limit)
        .offset(offset)
        .leftJoin(t.tp, eq(t.tp.positionId, t.tu.positionId))
        .leftJoin(t.tu2, eq(t.tu.parentId, t.tu2.userId))
        .leftJoin(t.tp2, eq(t.tp2.positionId, t.tu2.positionId))
        .where(and(...(queryWhere ?? [])))
        .orderBy(
          column && column in t.tu
            ? order === 'asc'
              ? asc(t.tu[column])
              : desc(t.tu[column])
            : desc(t.tu.createdAt),
        )
      const totalUsers = await tx
        .select({
          count: sql<number>`count(${t.tu.userId})`,
        })
        .from(t.tu)
        .leftJoin(t.tp, eq(t.tp.positionId, t.tu.positionId))
        .leftJoin(t.tu2, eq(t.tu.parentId, t.tu2.userId))
        .leftJoin(t.tp2, eq(t.tp2.positionId, t.tu2.positionId))
        .where(and(...(queryWhere ?? [])))
      return {
        userPositionWithSuperior,
        totalUsers: Number(totalUsers[0]?.count) ?? 0,
      }
    },
  )
  const pageCount = Math.ceil(totalUsers / 2)
  return { userPositionWithSuperior, pageCount }
}
