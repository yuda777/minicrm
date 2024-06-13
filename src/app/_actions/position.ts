'use server'
import { db } from '@/db'
import { position, users } from '@/db/schema'
import { isValidParamSearch } from '@/lib/validateJSON'
import {
  and,
  eq,
  sql,
  inArray,
  getTableColumns,
  ilike,
  lt,
  gt,
  lte,
  gte,
  InferSelectModel,
  not,
  or,
  between,
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
import { tableAliases } from '@/config/advanceSearch'
import { format } from 'date-fns'

export type UserType = InferSelectModel<typeof users>

export const fetchUserWhere = async (
  dataSubmit: IParamSearch,
): Promise<userPositionWithSuperior[]> => {
  const curFilters = []
  const tableUsed = [tableAliases.tp, tableAliases.tu]
  const isValid: boolean = isValidParamSearch({ dataSubmit, tableUsed })
  if (!isValid) throw new Error('Invalid param search')

  const buildCondition = (param: IParamSearch['paramSearch'][0]) => {
    const colName = tableAliases[param.tableName][param.fieldName] as PgColumn
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
  // curFilters.push(...cond)
  const conditions = dataSubmit.paramSearch.reduce((acc, param) => {
    const condition = buildCondition(param)
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

  const userPosition = db
    .select({
      // id: tableAliases.tu.userId,
      // parentId: tableAliases.tu.parentId,
      // titleCode: tableAliases.tp.titleCode,
      // titleDesc: tableAliases.tp.titleDesc,
      // departementCode: tableAliases.tp.departementCode,
      // departementDesc: tableAliases.tp.departementDesc,
      // name: tableAliases.tu.name,
      // photo: tableAliases.tu.photo,
      userId: tableAliases.tu.userId,
      parentId: tableAliases.tu.parentId,
      userName: tableAliases.tu.name,
      userTitleCode: tableAliases.tp.titleCode,
      userTitleDesc: tableAliases.tp.titleDesc,
      userDeptCode: tableAliases.tp.departementCode,
      userDeptDesc: tableAliases.tp.departementDesc,
      userPhoto: tableAliases.tu.photo,
      userEmail: tableAliases.tu.email,
      userPhone: tableAliases.tu.phoneNumber,
      userHireDate: tableAliases.tu.hireDate,
      userStatusActive: tableAliases.tu.statusActive,
      superiorTitleCode: tableAliases.tp2.titleCode,
      superiorTitleDesc: tableAliases.tp2.titleDesc,
      superiorDeptCode: tableAliases.tp.departementCode,
      superiorDeptDesc: tableAliases.tp.departementDesc,
      superiorName: tableAliases.tu2.name,
    })
    .from(tableAliases.tu)
    .leftJoin(
      tableAliases.tp,
      eq(tableAliases.tp.positionId, tableAliases.tu.positionId),
    )
    .leftJoin(
      tableAliases.tu2,
      eq(tableAliases.tu.parentId, tableAliases.tu2.userId),
    )
    .leftJoin(
      tableAliases.tp2,
      eq(tableAliases.tp2.positionId, tableAliases.tu2.positionId),
    )

    .where(and(...conditions))
    .orderBy(tableAliases.tu.userId)
  // .toSQL()
  // console.log('userPosition:', userPosition)
  // return false

  return userPosition
}
type fetchData2Type = {
  tables?: PgTable[]
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
type columnTableType = {
  columnName: string
  columnDataType: string
  label: string
  tableName: string
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
