"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type Table } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Icons } from "@/components/icons"
import React from "react"
import IconStatus, { statusArr } from "@/components/icon-status"
import { filter } from "d3"

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
  const filterStatus = table.getColumn("userStatusActive")?.getFilterValue() as boolean
  console.log("filterStatus:", filterStatus);

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
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label="Toggle columns"
                      variant="outline"
                      size="sm"
                      className="ml-auto h-8 bg-background"
                    >
                      {filterStatus !== undefined ?
                        <div className="flex justify-between space-x-1">
                          <IconStatus status={filterStatus} wthLabel />
                        </div >
                        :
                        <div>
                          Status
                        </div>}
                      <Icons.chevronDown
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Status User
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </DropdownMenuTrigger>
          {filterStatus !== undefined && <div
            className="cursor-pointer hover:bg-slate-600 p-1 rounded-sm bg-background"
            onClick={() => {
              table.getColumn("userStatusActive")?.setFilterValue(null)
            }}
          >
            <Icons.close className=" h-4 w-4" />
          </div>}
          <DropdownMenuContent align="end" className="">
            {
              statusArr.map((val, index) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={index}
                    className="capitalize"
                    checked={val.value === filterStatus}
                    onCheckedChange={() => table.getColumn("userStatusActive")?.setFilterValue(val.value)}
                  >
                    <IconStatus status={val.value} wthLabel />
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
