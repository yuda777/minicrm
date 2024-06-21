'use server'
import { PgColumn } from 'drizzle-orm/pg-core'
import { TableAlias, tableForQueryBuilder as t } from '@/config/advanceSearch'
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
  SQLWrapper,
} from 'drizzle-orm'
import { format } from 'date-fns-tz'
import { IParamSearch } from '@/types'
import { isValidParamSearch } from '@/lib/validateJSON'

export const queryWhereBuilder = ({
  dataSubmit,
  tableUsed,
}: {
  dataSubmit: IParamSearch
  tableUsed?: TableAlias[]
}) => {
  const isValid: boolean = isValidParamSearch({ dataSubmit, tableUsed })
  if (!isValid) throw new Error('Invalid param search')
  const buildCondition = (param: IParamSearch['paramSearch'][0]) => {
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
  const conditions: SQLWrapper[] = dataSubmit.paramSearch.reduce(
    (acc, param) => {
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
    },
    [],
  )
  return conditions
}
