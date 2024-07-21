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
