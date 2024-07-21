import { Option } from '@/components/ui/multiple-selector'
import {
  Position,
  customer,
  customerStatus,
  position,
  reason,
  response,
  uploadBatch,
  users,
} from '@/db/schema'
import { ConfigPageType, tableColumnsDescType, tableColumnsType } from '@/types'
import { alias } from 'drizzle-orm/pg-core'

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

export const tableColumnsDesc: {
  [tableName: string]: tableColumnsDescType[]
} = {
  tu: [
    {
      columnDataType: 'number',
      label: 'User ID',
      value: 'userId',
    },
    {
      columnDataType: 'string',
      label: 'Name',
      value: 'userName',
    },
    {
      columnDataType: 'number',
      label: 'Position ID',
      value: 'positionId',
    },
    {
      columnDataType: 'number',
      label: 'Parent ID',
      value: 'parentId',
    },
    {
      columnDataType: 'string',
      label: 'Email',
      value: 'email',
    },
    {
      columnDataType: 'date',
      label: 'Hire Date',
      value: 'hireDate',
    },
    {
      columnDataType: 'boolean',
      label: 'Status Active',
      value: 'statusActive',
    },
    {
      columnDataType: 'date',
      label: 'Created At',
      value: 'createdAt',
    },
    {
      columnDataType: 'date',
      label: 'Updated At',
      value: 'updatedAt',
    },
  ],
  tu2: [
    {
      columnDataType: 'string',
      label: 'SPV Name',
      value: 'userName',
    },
  ],
  tp: [
    {
      columnDataType: 'option',
      label: 'Position',
      value: 'titleCode',
    },
    {
      columnDataType: 'option',
      label: 'Department',
      value: 'departementCode',
    },
    {
      columnDataType: 'string',
      label: 'Description',
      value: 'description',
    },
  ],
  tcs: [
    {
      columnDataType: 'option',
      label: 'Customer Status',
      value: 'statusName',
    },
  ],
  tub: [
    {
      columnDataType: 'string',
      label: 'Batch Name',
      value: 'batchName',
    },
  ],
  tr: [
    {
      columnDataType: 'string',
      label: 'Response',
      value: 'response',
    },
  ],
  trn: [
    {
      columnDataType: 'string',
      label: 'Reason',
      value: 'reason',
    },
  ],
  tc: [
    {
      columnDataType: 'string',
      label: 'Name',
      value: 'customerName',
    },
    {
      columnDataType: 'string',
      label: 'Email',
      value: 'email',
    },
    {
      columnDataType: 'string',
      label: 'Phone',
      value: 'phone',
    },
    {
      columnDataType: 'string',
      label: 'Address',
      value: 'address',
    },
    {
      columnDataType: 'date',
      label: 'Birth Date',
      value: 'birthDate',
    },
    {
      columnDataType: 'option',
      label: 'Customer Status',
      value: 'statusId',
    },
    {
      columnDataType: 'date',
      label: 'Created At',
      value: 'createdAt',
    },
    {
      columnDataType: 'date',
      label: 'Updated At',
      value: 'updatedAt',
    },
  ],
}
export const tableForQueryBuilder = {
  tp: alias(position, 'tp'),
  tu: alias(users, 'tu'),
  tu2: alias(users, 'tu2'),
  // tcs: alias(customerStatus, 'tcs'),
  tc: alias(customer, 'tc'),
  tub: alias(uploadBatch, 'tub'),
  tr: alias(response, 'tr'),
  trn: alias(reason, 'trn'),
}
export type TableAlias = keyof typeof tableForQueryBuilder
export const filterColumnsByTable = (
  tableUsed: string[],
): tableColumnsType[] => {
  return tableUsed.flatMap((table) => tableColumnsDesc[table] || [])
}
// Example usage
export const optionColumns = Object.values(tableColumnsDesc)
  .flatMap((columns) => columns) // Flatten the array of arrays into a single array
  .filter((column) => column.columnDataType === 'option') // Filter columns with 'option' type
  .map((column) => column.value) // Extract the 'value' property from each object

export const getTableKeys = (): TableAlias[] => {
  return Object.keys(tableForQueryBuilder) as TableAlias[]
}
export const getOptionColumns = (
  tableUsed: TableAlias[] = getTableKeys(),
): string[] => {
  return tableUsed
    .flatMap((table) => tableColumnsDesc[table] || []) // Get the columns for each table and flatten the arrays
    .filter((column) => column.columnDataType === 'option') // Filter columns with 'option' type
    .map((column) => column.value) // Map to their 'value' property
}
export const operatorValues = operatorOptions.map((option) => option.value)
export const conditionValues = condition.map((option) => option.value)

export const isValidField = (text: string): boolean => {
  const [tableName, fieldName] = text.split('_')
  if (!tableName || !fieldName) return false
  const table = tableColumnsDesc[tableName]
  if (!table) return false
  const fieldExists = table.some((column) => column.value === fieldName)
  return fieldExists
}

type ValidationResult = {
  isValid: boolean
  table?: string
  field?: string
  order?: 'asc' | 'desc'
}
export const validateAndBreakdownText = ({
  text,
  config,
}: {
  text: string
  config: ConfigPageType[]
}): ValidationResult => {
  const result: ValidationResult = { isValid: false }

  // Split the text by the dot to separate the field and order (if exists)
  const [fieldPart, order] = text.split('.')

  // Validate order if it exists
  if (order && order !== 'asc' && order !== 'desc') {
    return result
  }

  // Split the fieldPart by the underscore to separate the table and field
  const [table, field] = fieldPart.split('_')

  // Check if both table and field are present
  if (!table || !field) {
    return result
  }

  // Check if the table and columns exists in config
  for (const tableConfig of config) {
    if (tableConfig.alias === table) {
      const columnConfig = tableConfig.column.find((col) => col.value === field)
      if (!columnConfig) {
        return result
      }
    }
  }

  // If all checks pass, set the result as valid and include table, field, and order
  result.isValid = true
  result.table = table
  result.field = field
  result.order = order as 'asc' | 'desc'

  return result
}
// select
// c.customer_name
// ,c.email
// ,c.phone
// ,c.address
// ,c.registration_date
// ,r2.response
// ,r.reason
// ,ub.batch_name
// ,u.name as csr
// ,u2.name as spv
// from customer c
// left join reason r on r.reason_id = c.reason_id
// left join response r2 on r2.reason_id = r.reason_id
// left join upload_batch ub on ub.batch_id = c.batch_id
// left join users u on u.user_id = c.csr_user_id
// left join users u2 on u2.user_id = u.parent_id
