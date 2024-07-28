"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type Table } from "@tanstack/react-table"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Icons } from "@/components/icons"
import React from "react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  // const optStatus = [1, 0]
  const router = useRouter()
  const pathname = usePathname()
  const isFiltered = table.getState().columnFilters.length > 0
  // const filterStatus = table.getColumn("userStatusActive")?.getFilterValue() as boolean

  return (
    <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
      <div className="flex flex-1 items-center space-x-2">

        {isFiltered && (
          <Button
            variant={"ghost"}
            onClick={() => {
              table.resetColumnFilters()
            }}
            className="h-8 px-2 lg:px-3">
            Reset
            <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                aria-label="Add new item"
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => router.push(`${pathname}/new`)}
              >
                <Icons.addCircle className="mr-2 h-4 w-4" />
                New
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Create New User
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
