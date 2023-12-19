"use client"

import * as React from "react"
import Link from "next/link"
import { type ColumnDef } from "unstyled-table"
import { PositionColor } from "@/config/users"
import { formatDate, formatPrice } from "@/lib/utils"
import { Badge, type BadgeVariant } from "@/components/ui/badge2"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/data-table/data-table"
import { Icons } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { userPositionWithSuperior, type UserWithPosition } from '@/types'


interface UsersTableShellProps {
  data: userPositionWithSuperior[],
  pageCount: number,
}

function colorScheme(departementCode: string) {
  const color = (departementCode) ? PositionColor.find(job => job.position.includes(departementCode)) : null
  return color?.color as BadgeVariant['variant']
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
      },
      {
        accessorKey: "userName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          return (
            <Link className="flex items-center" href={`/list/${row.original.userId}`}>
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
                <div className="text-sm text-slate-500">
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
        cell: ({ row }) => {
          return (
            <Badge variant={(row.original.userDeptCode) ? colorScheme(row.original.userDeptCode) : "default"} className="capitalize whitespace-nowrap" >
              {row.original.userTitleDesc}
            </Badge >
          )
        }
      },
      {
        accessorKey: "superiorName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Supervisor" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex flex-col">
              <div>
                {row.original.superiorName}
              </div>
              <div>
                {
                  (row.original.superiorDeptDesc)
                    ? <Badge variant={(row.original.userDeptCode) ? colorScheme(row.original.userDeptCode) : "default"} className="capitalize whitespace-nowrap" >
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
        accessorKey: "userPhone",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Phone Number" />
        ),
      },
      {
        accessorKey: "userHireDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Hire Date" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
    ],
    []
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
