"use client"

import { usePathname, useRouter } from "next/navigation"
import { type Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Icons } from "@/components/icons"
import React from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const optStatus = [1, 0]
  const [value, setValue] = React.useState<number | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const isFiltered = table.getState().columnFilters.length > 0
  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          disabled={false}
          placeholder="Filter names..."
          value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("userName")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant={"ghost"}
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          aria-label="Add new item"
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => router.push(`/upload`)}
        >
          <Icons.addCircle className="mr-2 h-4 w-4" />
          Upload
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
