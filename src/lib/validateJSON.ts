import { TableUsedType, operatorValues } from '@/config/advanceSearch'
import { position, users } from '@/db/schema'
import { PgTable } from 'drizzle-orm/pg-core'
type isValidParamSearchProps = {
  dataSubmit: any
  tableUsed?: PgTable[]
}
export const isValidParamSearch = ({
  dataSubmit,
  tableUsed = [users, position],
}: isValidParamSearchProps): boolean => {
  for (const param of dataSubmit.paramSearch) {
    const validFieldNames = tableUsed.flatMap((table) => Object.keys(table))
    if (!validFieldNames.includes(param.fieldName)) {
      console.error(
        `Invalid fieldName '${
          param.fieldName
        }'. Must be one of: ${validFieldNames.join(', ')}`,
      )
      return false
    }
    if (!operatorValues.includes(param.operator)) {
      console.error(
        `Invalid operator '${
          param.operator
        }'. Must be one of: ${operatorValues.join(', ')}`,
      )
      return false
    }
    if (param.operator === 'inArray' && !Array.isArray(param.fieldValue)) {
      console.error(
        `Invalid fieldValue '${param.fieldValue}'. Must be an array for operator 'inArray'.`,
      )
      return false
    }
  }
  return true
}
