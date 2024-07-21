import {
  TableAlias,
  conditionValues,
  getOptionColumns,
  operatorValues,
  tableColumnsDesc,
} from '@/config/advanceSearch'
import { usePositionData } from '@/hooks/usePositionData'
import { typeValues } from '@/types'
import { z } from 'zod'
type isValidParamSearchProps = {
  dataSubmit: any
  tableUsed?: TableAlias[]
}
export const GroupOptionSchema = () => {
  const optionColumns = getOptionColumns()
  const dateRangeSchema = z.object({
    from: z.date(),
    to: z.date(),
  })
  const columnWithPosition = usePositionData()
  return z.object({
    paramSearch: z.array(
      z
        .object({
          condition: z.enum(conditionValues as [string, ...string[]]),
          fieldName: z
            .string()
            .min(1, { message: 'Field Name Cannot be empty' }),
          tableName: z.string().optional(),
          typeValue: z.enum(typeValues).optional(),
          operator: z.enum(operatorValues as [string, ...string[]]).optional(),
          fieldValue: z.union([
            z.string(),
            z.number(),
            z.boolean(),
            dateRangeSchema,
            z.array(
              z.object({
                value: z.union([z.string(), z.number()]),
                label: z.string(),
              }),
            ),
          ]),
        })
        .strict()
        .refine(
          (data) => {
            if (data.fieldName in optionColumns) {
              return data.operator === 'inArray'
            }
            return true
          },
          {
            message: 'operator must be "in"',
            path: ['operator'],
          },
        )
        .refine(
          (data) => {
            if (data.typeValue === 'string') {
              return (
                data.operator !== undefined &&
                ['eq', 'ilike'].includes(data.operator)
              )
            }
            return true
          },
          {
            message: 'wrong filter operator',
            path: ['operator'],
          },
        ),
    ),
  })
}
export const isValidParamSearch = ({
  dataSubmit,
  tableUsed,
}: isValidParamSearchProps): boolean => {
  // Extract valid field names for each table used
  const validFieldNames = tableUsed.flatMap((table) =>
    tableColumnsDesc[table].map((column) => column.value),
  )

  for (const param of dataSubmit.paramSearch) {
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
