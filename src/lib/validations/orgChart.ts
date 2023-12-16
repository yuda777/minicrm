import * as z from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const orgChartSchema = z.object({
  userId: z.number().int().nonnegative().nullable(),
  name: z.string(),
  // parentId: z.number().int().nonnegative().nullable(),
  // parentId: z.string().regex(/^\d+$/).optional(),
  parentId: z.string().regex(/^\d+$/).optional(),
  positionId: z.string().regex(/^\d+$/).optional(),
  // photo: z.instanceof(File).optional()
  // photo: z.string().optional(),
  email: z
    .string()
    .max(100, {
      message: 'Maximum 100 character',
    })
    .optional(),
  hireDate: z.date().optional(),
  phoneNumber: z.string().optional(),
  statusActive: z.boolean().optional(),
  photo: z
    .any()
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
})
