import {
  conditionValues,
  operatorValues,
  optionColumns,
} from '@/config/advanceSearch'
import { usePositionData } from '@/hooks/usePositionData'
import { columnWithPositionType, typeValues } from '@/types'
import * as z from 'zod'
const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]
interface UserSchemaOptions {
  userId?: number
}
const validateFileSize = (file: File | undefined): boolean => {
  console.log('File Size:', file?.size) // Log the file size for debugging

  if (!file) {
    return true // File is optional, so no validation needed if not provided
  }

  return file.size <= MAX_FILE_SIZE
}
export const createUserSchema = ({ userId }: UserSchemaOptions) => {
  // console.log(userId)

  return z.object({
    userName: z.string().min(1, {
      message: 'Must be at least 1 character',
    }),
    parentId: z
      .number()
      // .regex(/^\d+$/)
      .optional()
      .refine(
        (val) => {
          return (
            (val == undefined && userId === 1) ||
            (val !== undefined && userId !== 1)
          )
        },
        {
          message:
            userId === 1 ? 'Superior must empty' : 'Superior is required',
        },
      ),
    positionId: z
      .number()
      // .regex(/^\d+$/)
      .optional()
      .refine(
        (val) => {
          console.log('val:', val)
          return (
            (userId !== 1 && val !== 1 && val !== undefined) ||
            (userId === 1 && val === 1)
          )
        },
        {
          message:
            userId === 1 ? 'cannot change Position' : 'Position is required',
        },
      ),
    email: z.string().email().optional().or(z.literal('')),
    hireDate: z.date().optional(),
    phoneNumber: z.string().optional(),
    statusActive: z.boolean().optional(),
    updatedAt: z.date().optional(),
    photo: z.any().optional(),
  })
}
const validateImageType = (file: File | undefined): boolean => {
  console.log('File Type:', file?.type) // Log the file type for debugging

  if (!file) {
    return true // File is optional, so no validation needed if not provided
  }

  return ACCEPTED_IMAGE_TYPES.includes(file.type)
}

export const userSchema = z.object({
  userName: z.string().min(1, {
    message: 'Must be at least 1 character',
  }),
  parentId: z.number().optional(),
  positionId: z.number().optional(),
  email: z.string().email().optional().or(z.literal('')),
  hireDate: z.date().optional(),
  phoneNumber: z.string().optional(),
  statusActive: z.boolean().optional(),
  updatedAt: z.date().optional(),
  photo: z.any().optional(),
})

export const GroupOptionSchema = () => {
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
            // console.log("data.typeValue:", data.typeValue);
            // const isSpecialColumn = columnWithPosition.some(
            //   (item) => item.column === data.fieldName,
            // )
            //optionColumns
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
export const filterUsersSchema = z.object({
  query: z.string(),
})

export const getUserSchema = z.object({
  id: z.number(),
})

export const getUsersSchema = z.object({
  limit: z.number().default(10),
  offset: z.number().default(0),
  categories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  subcategories: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
  sort: z
    .string()
    .regex(/^\w+.(asc|desc)$/)
    .optional()
    .nullable(),
  price_range: z
    .string()
    .regex(/^\d+-\d+$/)
    .optional()
    .nullable(),
  store_ids: z
    .string()
    .regex(/^\d+.\d+$/)
    .optional()
    .nullable(),
})
