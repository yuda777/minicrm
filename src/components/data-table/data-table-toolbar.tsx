"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type Table } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Icons } from "@/components/icons"
import React from "react"
import IconStatus from "@/components/icon-status"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const optStatus = [1, 0]
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-label="Toggle columns"
              variant="outline"
              size="sm"
              className="ml-auto h-8 bg-background"
            >
              Status
              <Icons.chevronDown
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="">
            {
              optStatus.map((val) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={val}
                    className="capitalize"
                    checked={val === Number(table.getColumn("userStatusActive")?.getFilterValue())}
                    onCheckedChange={() => table.getColumn("userStatusActive")?.setFilterValue(val)}
                  >
                    <IconStatus status={val === 1} wthLabel={true} />
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
