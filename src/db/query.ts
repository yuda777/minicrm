'use server'
import { db } from '@/db'
import { PgColumn, alias } from 'drizzle-orm/pg-core'
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
import {
  ConfigPageType,
  getOptionsDataType,
  IParamSearch,
  optionDataType,
} from '@/types'
import { isValidParamSearch } from '@/lib/validateJSON'
import { tableMapping } from './schema'

export const queryWhereBuilder = ({
  dataSubmit,
  config,
}: {
  dataSubmit: IParamSearch
  config: ConfigPageType[]
}) => {
  const buildCondition = (param: IParamSearch['paramSearch'][0]) => {
    const [tableAlias, column] = param.fieldName.split('.')
    const aliasResult = alias(tableMapping[param.tableName], tableAlias)
    const colName = aliasResult[column] as PgColumn
    // const colName = t[param.tableName][param.fieldName] as PgColumn
    let formattedFrom: string | undefined
    let formattedTo: string | undefined

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
        return eq(
          colName,
          param.typeValue === 'boolean'
            ? param.fieldValue === 'true'
            : (param.fieldValue as string),
        )
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
export const fetchDataForOptionMultiSelect = async ({
  table,
  fieldForValue,
  fieldForLabel,
  fieldAvatar,
  styleId,
}: getOptionsDataType): Promise<optionDataType[]> => {
  const getData = await db
    .select({
      label: tableMapping[table][fieldForLabel],
      value: tableMapping[table][fieldForValue],
      ...(styleId ? { styleId: tableMapping[table][styleId] } : {}),
      ...(fieldAvatar ? { avatar: tableMapping[table][fieldAvatar] } : {}),
    })
    .from(tableMapping[table])
    .where(eq(tableMapping[table]?.statusActive, true))
  return getData.map((row: any) => ({
    label: row.label as string,
    value: row.value as string,
    ...(row.styleId ? { styleId: row?.styleId as string } : {}),
    ...(row.avatar ? { avatar: row?.avatar as string } : {}),
  }))
}
