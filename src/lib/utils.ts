import { env } from '@/env.mjs'
import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import * as z from 'zod'
import { format } from 'date-fns-tz'
import { db } from '@/db'
import { sql } from 'drizzle-orm'
import { PositionColor } from '@/config/users'
import { Badge, type BadgeVariant } from '@/components/ui/badge2'

const defaultTimeZone = 'Asia/Jakarta'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function colorScheme(departementCode: string) {
  const color = departementCode
    ? PositionColor.find((job) => job.position.includes(departementCode))
    : null
  return color?.color as BadgeVariant['variant']
}

export function formatPrice(
  price: number | string,
  currency: 'USD' | 'EUR' | 'GBP' | 'BDT' = 'USD',
  notation: 'compact' | 'engineering' | 'scientific' | 'standard' = 'standard',
) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation,
  }).format(Number(price))
}

export function formatDate(date: Date | string) {
  return dayjs(date).format('MMMM D, YYYY')
}

export const formatDateInTimeZone = (
  date: Date | undefined,
  timeZone: string = defaultTimeZone,
): string | undefined => {
  return date ? format(date, 'yyyy-MM-dd', { timeZone }) : undefined
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: 'accurate' | 'normal' = 'normal',
) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB']
  if (bytes === 0) return '0 Byte'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate' ? accurateSizes[i] ?? 'Bytest' : sizes[i] ?? 'Bytes'
  }`
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
}

export function unslugify(str: string) {
  return str.replace(/-/g, ' ')
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
  )
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files)
  if (!isArray) return false
  return files.every((file) => file instanceof File)
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    toast(errors.join('\n'))
  } else if (err instanceof Error) {
    toast(err.message)
  } else {
    toast('Something went wrong, please try again later.')
  }
}

// export function catchClerkError(err: unknown) {
//   const unknownErr = 'Something went wrong, please try again later.'
//   if (isClerkAPIResponseError(err)) {
//     toast.error(err.errors[0]?.longMessage ?? unknownErr)
//   } else {
//     toast.error(unknownErr)
//   }
// }
