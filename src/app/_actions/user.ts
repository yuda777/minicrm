'use server'
import { revalidatePath } from 'next/cache'
import { db } from '@/db'
import { users, type User, tableMapping as d } from '@/db/schema'
import type { ConfigPageType, IParamSearch, uriParamsType } from '@/types'
import { and, asc, desc, eq, ne, not, sql } from 'drizzle-orm'
import { type z } from 'zod'
import {
  TableAlias,
  tableForQueryBuilder as t,
  validateAndBreakdownText,
} from '@/config/advanceSearch'
import type { userSchema } from '@/lib/validations/user'
import { alias } from 'drizzle-orm/pg-core'
import { formatDateInTimeZone } from '@/lib/utils'
import { queryWhereBuilder } from '@/db/query'

const w = {
  tu: alias(d.users, 'tu'),
  tu2: alias(d.users, 'tu2'),
  tp: alias(d.position, 'tp'),
  tp2: alias(d.position, 'tp2'),
}
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
  config,
  uriParams,
  dataSubmit,
}: {
  config: ConfigPageType[]
  uriParams?: uriParamsType
  dataSubmit: IParamSearch
}) => {
  const {
    sort = 'createdAt',
    page = 1,
    limit = 10,
  } = uriParams ?? {
    sort: 'createdAt',
    page: 1,
    limit: 10,
  }
  const offset = page > 0 ? limit * (page - 1) : 0

  const columnOrder = sort
    ? validateAndBreakdownText({ text: sort, config })
    : {
        isValid: false,
      }

  const queryWhere = queryWhereBuilder({ dataSubmit, config })

  // Transaction is used to ensure both queries are executed in a single transaction
  const { userPositionWithSuperior, totalUsers } = await db.transaction(
    async (tx) => {
      const userPositionWithSuperior = await tx
        .select({
          userId: w.tu.userId,
          parentId: w.tu.parentId,
          userName: w.tu.userName,
          userTitleCode: w.tp.titleCode,
          userTitleDesc: w.tp.titleDesc,
          userDeptCode: w.tp.departementCode,
          userDeptDesc: w.tp.departementDesc,
          userPhoto: w.tu.photo,
          userEmail: w.tu.email,
          userPhone: w.tu.phoneNumber,
          userHireDate: w.tu.hireDate,
          userStatusActive: w.tu.statusActive,
          superiorTitleCode: w.tp2.titleCode,
          superiorTitleDesc: w.tp2.titleDesc,
          superiorDeptCode: w.tp.departementCode,
          superiorDeptDesc: w.tp.departementDesc,
          superiorName: w.tu2.userName,
        })
        .from(w.tu)
        .limit(limit)
        .offset(offset)
        .leftJoin(t.tp, eq(t.tp.positionId, t.tu.positionId))
        .leftJoin(w.tu2, eq(t.tu.parentId, w.tu2.userId))
        .leftJoin(w.tp2, eq(w.tp2.positionId, w.tu2.positionId))
        .where(and(...(queryWhere ?? []))) //, eq(w.tu.statusActive, true)
        // .where(and(...(queryWhere ?? []), eq(w.tu.statusActive, true))) //,
        .orderBy(
          columnOrder.isValid
            ? columnOrder.order === 'asc'
              ? asc(w[columnOrder.table][columnOrder.field])
              : desc(w[columnOrder.table][columnOrder.field])
            : desc(w.tu.createdAt),
        )
      //   .toSQL()
      // console.log('userPositionWithSuperior:', userPositionWithSuperior)

      const totalUsers = await tx
        .select({
          count: sql<number>`count(${t.tu.userId})`,
        })
        .from(t.tu)
        .leftJoin(t.tp, eq(t.tp.positionId, t.tu.positionId))
        .leftJoin(w.tu2, eq(t.tu.parentId, w.tu2.userId))
        .leftJoin(w.tp2, eq(w.tp2.positionId, w.tu2.positionId))
        .where(and(...(queryWhere ?? [])))
      return {
        userPositionWithSuperior,
        totalUsers: Number(totalUsers[0]?.count) ?? 0,
      }
    },
  )
  const pageCount = Math.ceil(totalUsers / limit)
  return { userPositionWithSuperior, pageCount }
}
