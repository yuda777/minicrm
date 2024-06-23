'use server'
import { db } from '@/db'
import { position, users, type Position, type User } from '@/db/schema'
import { isValidParamSearch } from '@/lib/validateJSON'
import dayjs from 'dayjs'
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation'

import {
  and,
  eq,
  sql,
  inArray,
  getTableColumns,
  ilike,
  like,
  lt,
  gt,
  lte,
  gte,
  InferSelectModel,
  not,
  or,
  between,
  asc,
  desc,
} from 'drizzle-orm'
import {
  PgColumn,
  PgTable,
  PgTableWithColumns,
  alias,
} from 'drizzle-orm/pg-core'
import {
  IParamSearch,
  userPositionType,
  userPositionWithSuperior,
} from '@/types'
import { tableForQueryBuilder as t } from '@/config/advanceSearch'
import { format } from 'date-fns'

export type UserType = InferSelectModel<typeof t.tu>

interface ProductsPageProps {
  dataSubmit: IParamSearch
  searchParams: ReadonlyURLSearchParams
}
interface userListPromise {
  userPositionWithSuperior: userPositionWithSuperior[]
  pageCount: number
}
export default async function ListUserPage({
  dataSubmit,
  searchParams,
}: ProductsPageProps): Promise<userListPromise> {
  // console.log('searchParams3:', searchParams)
  const params = new URLSearchParams(searchParams)
  const page = params?.get('page') ?? '1'
  const sort = params?.get('sort')
  const per_page = params?.get('per_page')
  // const limit = searchParams.get('per_page') || '2'
  const limit = typeof per_page === 'string' ? parseInt(per_page) : 2
  // console.log('limit:', limit)
  const tableUsed = [t.tp, t.tu]
  const isValid: boolean = isValidParamSearch({ dataSubmit, tableUsed })
  // if (!isValid) throw new Error('Invalid param search')
  const offset =
    typeof page === 'string'
      ? parseInt(page) > 0
        ? (parseInt(page) - 1) * limit
        : 0
      : 0
  // console.log('offset:', offset)

  // Column and order to sort by
  const [column, order] =
    typeof sort === 'string'
      ? (sort.split('.') as [
          keyof User | undefined,
          'asc' | 'desc' | undefined,
        ])
      : []
  const ConditionBuilder = (param: IParamSearch['paramSearch'][0]) => {
    const colName = t[param.tableName][param.fieldName] as PgColumn
    let formattedFrom
    let formattedTo

    if (
      param.fieldValue &&
      typeof param.fieldValue === 'object' &&
      'from' in param.fieldValue
    ) {
      const { from, to } = param.fieldValue as { from: Date; to?: Date }
      formattedFrom = from ? format(from, 'yyyy-MM-dd') : undefined
      formattedTo = to ? format(to, 'yyyy-MM-dd') : formattedFrom
    }

    switch (param.operator) {
      case 'inArray':
        if (Array.isArray(param.fieldValue)) {
          const resultArray = param.fieldValue.map((item) => item.value)
          return inArray(colName, resultArray)
        } else {
          throw new Error('fieldValue must be an array')
        }
      case 'eq':
        return eq(colName, param.fieldValue as string)
      case 'lt':
        return lt(colName, param.fieldValue as number | Date)
      case 'gt':
        return gt(colName, param.fieldValue as number | Date)
      case 'lte':
        return lte(colName, param.fieldValue as number | Date)
      case 'gte':
        return gte(colName, param.fieldValue as number | Date)
      case 'ilike':
        return ilike(colName, `%${param.fieldValue}%` as string)
      case 'between':
        return formattedFrom
          ? between(colName, formattedFrom, formattedTo)
          : undefined
      default:
        return undefined
    }
  }
  const conditions = dataSubmit.paramSearch.reduce((acc, param) => {
    const condition = ConditionBuilder(param)
    if (condition) {
      if (param.condition === 'not') {
        acc.push(not(condition))
      } else if (param.condition === 'or') {
        if (acc.length === 0) {
          acc.push(condition)
        } else {
          const last = acc.pop()
          acc.push(or(last, condition))
        }
      } else {
        acc.push(condition)
      }
    }
    return acc
  }, [])

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
        .where(and(...(conditions ? conditions : [])))
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
        .where(and(...conditions))
      return {
        userPositionWithSuperior,
        totalUsers: Number(totalUsers[0]?.count) ?? 0,
      }
    },
  )
  // console.log('userPositionWithSuperior', userPositionWithSuperior);

  const pageCount = Math.ceil(totalUsers / limit)

  return { userPositionWithSuperior, pageCount }
}

export async function fetchPosition() {
  const Performance = await db
    .select({
      value: position.titleCode,
      label: position.titleDesc,
      deptCode: position.departementCode,
    })
    .from(position)
    .where(eq(position.statusActive, true))
    .orderBy(position.positionId)
  return Performance
}

export async function fetchDept() {
  const deptData = await db
    .selectDistinctOn([position.departementCode], {
      value: position.departementCode,
      label: position.departementDesc,
      deptCode: position.departementCode,
    })
    .from(position)
    .where(
      and(
        eq(position.statusActive, true),
        sql`coalesce(${position.departementCode}, '') <> ''`,
      ),
    )
    .orderBy(position.departementCode)
  return deptData.map((row: any) => ({
    value: row.value as string,
    label: row.label as string,
    deptCode: row.deptCode as string,
  }))
}
