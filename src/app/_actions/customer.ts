'use server'

import { db } from '@/db'
import {
  customer,
  columns,
  type Customer,
  batchUpload,
  customerStatus,
  tableMapping as d,
  users,
  tableMapping,
} from '@/db/schema'
import { SQLWrapper, and, asc, desc, eq, ne, not, sql } from 'drizzle-orm'
import { queryWhereBuilder } from '@/db/query'
import {
  TableAlias,
  isValidField,
  tableForQueryBuilder as t,
  validateAndBreakdownText,
} from '@/config/advanceSearch'
import { ConfigPageType, IParamSearch, uriParamsType } from '@/types'
import {
  PgTable,
  PgTableWithColumns,
  TableConfig,
  alias,
} from 'drizzle-orm/pg-core'
import { ReadonlyURLSearchParams } from 'next/navigation'
// import { generateTableMapping } from '@/lib/utils'

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
type TableMapping = Record<string, PgTable>

// export const fetchCustomerStatus = async () => {
//   const tCustomerStatus = await db
//     .select({
//       statusName: t.tcs.statusName,
//       statusId: t.tcs.statusId,
//     })
//     .from(t.tcs)
//     .where(eq(customerStatus.statusActive, true))
//   return tCustomerStatus.map((row: any) => ({
//     value: row.statusId as string,
//     label: row.statusName as string,
//   }))
// }
export const fetchCustomerResponses = async () => {
  const tCustomerResponses = await db
    .select({
      responseName: t.tr.response,
      responseId: t.tr.responseId,
    })
    .from(t.tr)
    .where(eq(t.tr.statusActive, true))
  return tCustomerResponses.map((row: any) => ({
    value: row.responseId as string,
    label: row.responseName as string,
  }))
}
export const fetchCustomerReasons = async () => {
  const tCustomerReasons = await db
    .select({
      responseName: t.trn.reason,
      responseId: t.trn.reasonId,
    })
    .from(t.trn)
    .where(eq(t.trn.statusActive, true))
  return tCustomerReasons.map((row: any) => ({
    value: row.responseId as string,
    label: row.responseName as string,
  }))
}

const generateTableMapping = (config: ConfigPageType[]): TableMapping => {
  const mapping = {}
  config.forEach((pageConfig) => {
    mapping[pageConfig.alias] = alias(
      tableMapping[pageConfig.table],
      pageConfig.alias,
    ) as PgTable
  })
  return mapping
}

export const fetchCustomer = async ({
  config,
  uriParams,
  dataSubmit,
}: {
  config: ConfigPageType[]
  uriParams?: uriParamsType
  dataSubmit: IParamSearch
}) => {
  const {
    sort = 'createdAt',
    page = 1,
    limit = 10,
  } = uriParams ?? {
    sort: 'createdAt',
    page: 1,
    limit: 10,
  }
  const offset = page > 0 ? limit * (page - 1) : 0
  const columnOrder = sort
    ? validateAndBreakdownText({ text: sort, config })
    : {
        isValid: false,
      }
  const w = {
    tp: alias(d.position, 'tp'),
    tu: alias(d.users, 'tu'),
    tu2: alias(d.users, 'tu2'),
    tc: alias(d.customer, 'tc'),
    tub: alias(d.uploadBatch, 'tub'),
    tr: alias(d.response, 'tr'),
    trn: alias(d.reason, 'trn'),
  }
  const queryWhere = queryWhereBuilder({ dataSubmit, config })

  const { customerData, totalCustomers } = await db.transaction(async (tx) => {
    // const users2 = alias(users, 'users2')
    const customerData = await tx
      .select({
        customerName: w.tc.customerName,
        email: w.tc.email,
        phone: w.tc.phone,
        address: w.tc.address,
        birthDate: w.tc.birthDate,
        registrationDate: w.tc.registrationDate,
        response: w.tr.response,
        reason: w.trn.reason,
        batchName: w.tub.batchName,
        csrName: w.tu.userName,
        spvName: w.tu2.userName,
        createdAt: w.tc.createdAt,
        updatedAt: w.tc.updatedAt,
      })
      .from(w.tc)
      .limit(limit)
      .offset(offset)
      .leftJoin(w.trn, eq(w.trn.reasonId, w.tc.reasonId))
      .leftJoin(w.tr, eq(w.tr.responseId, w.trn.responseId))
      .leftJoin(w.tub, eq(w.tub.batchId, w.tc.batchId))
      .leftJoin(w.tu, eq(w.tu.userId, w.tc.csrUserId))
      .leftJoin(w.tu2, eq(w.tu2.userId, w.tu.parentId))
      .where(and(...(queryWhere ?? [])))
      .orderBy(
        columnOrder.isValid
          ? columnOrder.order === 'asc'
            ? asc(w[columnOrder.table][columnOrder.field])
            : desc(w[columnOrder.table][columnOrder.field])
          : asc(w.tc.createdAt),
      )
    //   .toSQL()
    // console.log('customerData:', customerData)
    const totalCustomers = await tx
      .select({
        count: sql<number>`count(${w.tc.customerId})`,
      })
      .from(w.tc)
      .leftJoin(w.trn, eq(w.trn.reasonId, w.tc.reasonId))
      .leftJoin(w.tr, eq(w.tr.responseId, w.trn.responseId))
      .leftJoin(w.tub, eq(w.tub.batchId, w.tc.batchId))
      .leftJoin(w.tu, eq(w.tu.userId, w.tc.csrUserId))
      .leftJoin(w.tu2, eq(w.tu2.userId, w.tu.parentId))
      .where(and(...(queryWhere ?? [])))
    return {
      customerData,
      totalCustomers: Number(totalCustomers[0]?.count) ?? 0,
    }
  })
  const pageCount = Math.ceil(totalCustomers / limit)
  return { customerData, pageCount }
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
  // return await db.insert(customer).values(mappedData)
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
