import * as z from 'zod'

export const uploadSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.length == 1, 'File is required.')
    .refine((files) => {
      const file = files[0]
      if (!file) return false
      const maxSize = 10 * 1024 * 1024
      return file.size <= maxSize
    }, 'Invalid file size.')
    .refine((files) => {
      const file = files[0]
      if (!file) return false
      const allowedTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ]
      return allowedTypes.includes(file.type)
    }, 'Invalid file type.')
    .optional()
    .nullable()
    .default(null),
})
