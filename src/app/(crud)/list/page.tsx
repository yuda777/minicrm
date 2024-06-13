'use client'
import AdvanceSearch from '@/components/AdvanceSearch'
import { type ColumnDef } from "unstyled-table"

import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { userPositionWithSuperior } from '@/types'

import React, { FC } from 'react'
import { Badge } from '@/components/ui/badge2'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Icons } from '@/components/icons'
import { colorScheme, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
// import XLSX from 'xlsx'
import { utils, writeFile } from 'xlsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, setValue] = React.useState<userPositionWithSuperior[]>([])

  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const exportToExcel = React.useCallback((data: userPositionWithSuperior[]) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Data");
    // writeFile(wb, "SheetJSReactAoO.xlsx");
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Format the timestamp
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;

    // Create the filename
    const filename = `data_${timestamp}.xlsx`;
    writeFile(wb, filename);
  }, []);
  return (
    <>
      <Card>
        <CardHeader className="s  pace-y-1">
          <CardTitle className="text-2xl">Advanced Search</CardTitle>
          <CardDescription>
            Choose user name to edit
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <AdvanceSearch
            setValue={setValue}
          />
        </CardContent>
      </Card >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">User List</CardTitle>
          <CardDescription>
            Choose user name to edit
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <DataTable columns={columns} data={value} pageCount={-1} />
          <Button
            onClick={() => {
              exportToExcel(value)
            }}
            className='w-32 mt-4'
          >
            Export Excel
          </Button>
          {/* <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(value, null, 2)}</code>
          </pre> */}
        </CardContent>
      </Card>
    </>
  )
}
export default page