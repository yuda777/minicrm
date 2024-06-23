'use client'
import React, { useEffect, useState } from 'react'
import { type ColumnDef } from "unstyled-table"
import { TableAlias, tableForQueryBuilder as t } from '@/config/advanceSearch'
import { useSearchParams } from 'next/navigation'
import { IParamSearch, userPositionWithSuperior } from '@/types'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTable } from "@/components/data-table/data-table"
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import AdvanceSearch from '@/components/AdvanceSearch'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/icons'
import { colorScheme, exportToExcel, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { fetchUsers } from '@/app/_actions/user'
import { usePositionData } from '@/hooks/usePositionData'


const UserList = () => {
  const searchParams = useSearchParams()
  const positionData = usePositionData()
  // console.log("positionData:", positionData);

  const page = Number(searchParams?.get('page')) ?? 1
  const sort = searchParams?.get('sort')

  const tableUsed = [t.tp, t.tu] as TableAlias[]
  const [data, setData] = useState<userPositionWithSuperior[]>([]);
  const [dataSubmit, setDataSubmit] = useState<IParamSearch>({
    paramSearch: []
  });
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
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
  const fetchData = async () => {
    const result = await fetchUsers({ dataSubmit, page, sort });
    setData(result.userPositionWithSuperior);
    setPageCount(result.pageCount);
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSubmit, page, sort]);

  const handleSearch = (newdataSubmit: IParamSearch) => {
    console.log("handleSearch:", dataSubmit);
    console.log("newdataSubmit:", newdataSubmit);
    setDataSubmit(newdataSubmit);
    fetchData();
  };

  return (
    <>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Advanced Search</CardTitle>
          <CardDescription>
            Choose user name to edit
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <AdvanceSearch onSearch={handleSearch} options={positionData} />
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
          <DataTable columns={columns} data={data} pageCount={pageCount} />
          <Button
            onClick={() => {
              exportToExcel(data)
            }}
            className='w-32 mt-4'
          >
            Export Excel
          </Button>
        </CardContent>
      </Card>
    </>
  )
}
export default UserList