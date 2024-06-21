import { Option } from '@/components/ui/multiple-selector'
import { Position, position, users } from '@/db/schema'
import { tableColumnsType } from '@/types'
import {
  PgColumn,
  PgTable,
  PgTableWithColumns,
  alias,
} from 'drizzle-orm/pg-core'

interface ExtendedOption extends Option {
  type?: string
  optionsName?: string
}
type OperatorType = {
  value: string
  label: string
}

export const managerPosition = [
  'Chief Executive Officer',
  'HR Manager',
  'IT Manager',
  'Marketing Manager',
  'Sales Manager',
  'Operations Manager',
]

export const condition = [
  {
    value: 'and',
    label: 'And',
  },
  {
    value: 'or',
    label: 'Or',
  },
  {
    value: 'not',
    label: 'Not',
  },
]

export const operatorOptions: OperatorType[] = [
  {
    value: 'eq',
    label: 'Equal to',
  },
  {
    value: 'gt',
    label: 'Greater than',
  },
  {
    value: 'lt',
    label: 'Less than',
  },
  {
    value: 'gte',
    label: 'Greater than or equal to',
  },
  {
    value: 'lte',
    label: 'Less than or equal to',
  },
  {
    value: 'ilike',
    label: 'Contains',
  },
  {
    value: 'inArray',
    label: 'In',
  },
  {
    value: 'between',
    label: 'Between',
  },
] as const
export type TableUsedType = typeof tableForQueryBuilder
export type TableAlias =
  (typeof tableForQueryBuilder)[keyof typeof tableForQueryBuilder]

// export const tableUsed = { position, users }
// export const tableUsed = [position, users]

export const tableForQueryBuilder = {
  tp: alias(position, 'tp'),
  tu: alias(users, 'tu'),
  tp2: alias(position, 'tp2'),
  tu2: alias(users, 'tu2'),
}

export const tableColumnsDesc: tableColumnsType[] = [
  // Users table
  {
    columnDataType: 'number',
    label: 'User ID',
    tableName: 'tu',
    value: 'userId',
  },
  {
    columnDataType: 'string',
    label: 'Name',
    tableName: 'tu',
    value: 'name',
  },
  {
    columnDataType: 'number',
    label: 'Position ID',
    tableName: 'tu',
    value: 'positionId',
  },
  {
    columnDataType: 'number',
    label: 'Parent ID',
    tableName: 'tu',
    value: 'parentId',
  },
  {
    columnDataType: 'string',
    label: 'Email',
    tableName: 'tu',
    value: 'email',
  },
  {
    columnDataType: 'date',
    label: 'Hire Date',
    tableName: 'tu',
    value: 'hireDate',
  },
  {
    columnDataType: 'boolean',
    label: 'Status Active',
    tableName: 'tu',
    value: 'statusActive',
  },
  {
    columnDataType: 'date',
    label: 'Created At',
    tableName: 'tu',
    value: 'createdAt',
  },
  {
    columnDataType: 'date',
    label: 'Updated At',
    tableName: 'tu',
    value: 'updatedAt',
  },
  // Position table
  {
    columnDataType: 'option',
    label: 'Position',
    tableName: 'tp',
    value: 'titleCode',
  },
  {
    columnDataType: 'option',
    label: 'Department',
    tableName: 'tp',
    value: 'departementCode',
  },
  {
    columnDataType: 'string',
    label: 'Description',
    tableName: 'tp',
    value: 'description',
  },
]
export const optionColumns = tableColumnsDesc
  .filter((column) => column.columnDataType === 'option')
  .map((column) => column.value)
export const operatorValues = operatorOptions.map((option) => option.value)
export const conditionValues = condition.map((option) => option.value)
