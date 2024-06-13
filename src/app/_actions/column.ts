'use server'
import { position, users } from '@/db/schema'
import { getTableColumns } from 'drizzle-orm'
import { alias } from 'drizzle-orm/pg-core'
import Dropdown from '@/components/Dropdown'
import { tableColumnsType } from '@/types'

const exludeColumns = {
  tp: ['positionId', 'createdAt', 'updatedAt'],
  tu: ['userId', 'createdAt', 'updatedAt'],
}

export type columnTableType = {
  value: string
  columnDataType: string
  label: string
  tableName: string
}
const tableAliases: Record<string, any> = {
  tp: alias(position, 'tp'),
  tu: alias(users, 'tu'),
}
type extractColumnProps = {
  config: {
    tableName: string
    exclude?: string[]
  }[]
}
export async function extractAllColumns({
  config,
}: extractColumnProps): Promise<tableColumnsType[]> {
  const data: tableColumnsType[] = []

  // Iterate over each table
  config.forEach(({ tableName, exclude }) => {
    const tableColumns = getTableColumns(tableAliases[tableName])

    // Iterate over each column in the current table
    Object.keys(tableColumns).forEach((value) => {
      if (Object.keys(tableColumns).includes(value)) {
        // Check if the column should be excluded
        if (exclude && exclude.includes(value)) {
          return // Skip this column if it should be excluded
        }

        const columnDataType = tableColumns[value].dataType
        const label = value
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase())

        // Add the column information to the data array
        data.push({ value, columnDataType, label, tableName })
      }
    })
  })
  return data
}
