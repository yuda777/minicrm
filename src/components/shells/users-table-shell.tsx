"use client"

import * as React from "react"
import Link from "next/link"
import { type ColumnDef } from "unstyled-table"
import { colorScheme, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/data-table/data-table"
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { userPositionWithSuperior } from '@/types'
import IconStatus from "@/components/icon-status"

interface UsersTableShellProps {
  data: userPositionWithSuperior[],
  pageCount: number,
}

export function UsersTableShell({
  data,
  pageCount,
}: UsersTableShellProps) {
  const [isPending, startTransition] = React.useTransition()

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<userPositionWithSuperior, unknown>[]>(
    () => [
      {
        // Column for row selection
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value)
            }}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => {
              row.toggleSelected(!!value)
            }}
            aria-label="Select row"
          />
        ),
        // Disable column sorting for this column
        enableSorting: false,
        enableHiding: false,
        enableResizing: true,
        size: 10,
      },
      {
        accessorKey: "userName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        enableResizing: true,
        cell: ({ row }) => {
          return (
            <Link className="flex items-center py-2 px-3  hover:bg-accent" href={`/list/${row.original.userId}`}>
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage
                  src={`/face/${row.original.userPhoto}`}
                  alt={""}
                />
                <AvatarFallback>
                  <Icons.defaultUser className="h-16 w-16" aria-hidden="true" />
                </AvatarFallback>
              </Avatar>
              <div className="flextinline-flex content-center justify-center items-center">
                <div>
                  {row.original.userName}
                </div>
                <div className="text-sm text-muted-foreground">
                  {row.original.userEmail}
                </div>
              </div>
            </Link>
          )
        }
      },
      {
        accessorKey: "userTitleDesc",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Position" />
        ),
        enableResizing: true,
        cell: ({ row }) => {
          return (
            <div className="flex">
              <Badge variant={(row.original.userDeptCode) ? colorScheme(row.original.userDeptCode) : "gray"} className="capitalize whitespace-nowrap" >
                {row.original.userTitleDesc}
              </Badge >
            </div>
          )
        }
      },
      {
        accessorKey: "superiorName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supervisor" />
        ),
        enableResizing: true,
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <div>
                {row.original.superiorName}
              </div>
              <div>
                {
                  (row.original.superiorTitleDesc)
                    ? <Badge variant={(row.original.userDeptCode) ? row.original.superiorDeptCode ? colorScheme(row.original.superiorDeptCode) : 'gray' : "gray"} className="capitalize whitespace-nowrap" >
                      {row.original.superiorTitleDesc}
                    </Badge >
                    : null
                }
              </div>
            </div>
          )
        }
      },
      {
        accessorKey: "userStatusActive",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        enableResizing: true,
        cell: ({ row }) => (
          <div className="flex content-center justify-center items-center">
            <IconStatus status={row.original.userStatusActive as boolean} toolTips />
          </div>
        )
      },
      {
        accessorKey: "userHireDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Hire Date" />
        ),
        enableResizing: true,
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
    ],
    []
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
