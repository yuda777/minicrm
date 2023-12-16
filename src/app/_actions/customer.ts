'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/db'

import { customer, columns, type Customer, batchUpload } from '@/db/schema'
import { sql } from 'drizzle-orm'

// Define the types for your Excel data and field mapping
type ExcelData = {
  name1: string
  name2: string
  email_ch: string
}

type FieldMapping = {
  table: string
  excel: keyof ExcelData
}
// export async function insertTables2() {
//   const field = 'firstName'
//   const data = { [field]: 'Dan23' }
//   return await db.insert(customer).values(data)
// }

interface insertTablesProps {
  excelData: {
    data: {
      [key: string]: any
    }[]
  }
  fieldMapping: {
    table: string
    excel: string
  }[]
  batchUploadId: number
}

export async function insertBatch(filenameInput: string) {
  return await db
    .insert(batchUpload)
    .values({ filename: filenameInput })
    .returning({ batchUploadId: batchUpload.batchUploadId })
}

export async function insertTables({
  excelData,
  fieldMapping,
  batchUploadId,
}: insertTablesProps) {
  const mappedData = excelData.data.map((row) => {
    const mappedRow: Record<string, any> = {}
    fieldMapping.forEach((mapping) => {
      const excelField = mapping.excel
      const tableField = mapping.table
      if (excelField in row) {
        mappedRow[tableField] = row[excelField]
        mappedRow['batchUploadId'] = batchUploadId
      }
    })
    return mappedRow
  })
  // const updateData = mappedData.map((customer) => ({
  //   ...customer,
  //   batchUploadId: batchUploadId,
  // }))
  console.log(mappedData)
  return await db.insert(customer).values(mappedData)
}

export async function getColumnCustomer() {
  return { columns }
}

export async function getTables() {
  const query = sql<string>`select column_name,data_type,character_maximum_length  
    from information_schema.columns 
    where table_schema='public' 
    and table_name = 'customer'
    and column_name not in ('customer_id','status_active','created_at','updated_at')
    order by ordinal_position `
  try {
    const tables = await db.execute(query)
    return tables
  } catch (error) {
    console.error('🚨 failed to reset database!', error)
    throw error
  }
}
