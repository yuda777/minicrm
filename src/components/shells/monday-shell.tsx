"use client"

import * as React from "react"
import { type ColumnDef } from "unstyled-table"
import { formatDate } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/data-table/data-table-customer"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"


interface ICustomer {
  customerName: string | null
  email: string | null
  phone: string | null
  address: string | null
  birthDate: string | null
  createdAt: string | null
  status: string | null
  subStatus: string | null
}

interface CustomersTableShellProps {
  data: ICustomer[],
  pageCount: number,
}

export function MondayTableShell({
  data,
  pageCount,
}: CustomersTableShellProps) {
  const [isPending, startTransition] = React.useTransition()

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<ICustomer, unknown>[]>(
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
        enableResizing: true,
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
            <div className="flextinline-flex content-center justify-center items-center">
              <div>
                {row.original.customerName}
              </div>
              <div className="text-sm text-slate-500">
                {row.original.email}
              </div>
            </div>
          )
        },
        enableResizing: true,
      },
      {
        accessorKey: "Status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          return (
            row.original.status ? (
              <div className="flext inline-flex content-center justify-center items-center">
                <div>
                  {row.original.status}
                </div>
                <div className="text-sm text-slate-500">
                  {row.original.subStatus}
                </div>
              </div>
            ) : (
              <div className="flext inline-flex content-center justify-center items-center">
                <div>
                  {"NEW DATA"}
                </div>
              </div>
            )
          )
        },
        enableResizing: true,
      },
      {
        accessorKey: "address",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Address" />
        ),
        enableResizing: true,
      },
      {
        accessorKey: "birthDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Birth Date" />
        ),
        enableResizing: true,
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created Date" />
        ),
        enableResizing: true,
        cell: ({ cell }) => formatDate(cell.getValue() as Date)
      },

    ],
    []
  )

  return <DataTable columns={columns} data={data} pageCount={pageCount} />
}
