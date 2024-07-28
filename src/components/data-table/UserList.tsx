'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ConfigPageType, IParamSearch } from '@/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type ColumnDef } from "unstyled-table"
import AdvanceSearch from '@/components/AdvanceSearch'
import { Button } from '@/components/ui/button'
import { useGetOptionsData } from '@/hooks/useGetOptionsData'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'
import { Icons } from '@/components/icons'
import { Badge } from '@/components/ui/badge'
import { colorScheme, exportToExcel, formatDate } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { fetchUsers } from '@/app/_actions/user'
import { PositionColor, FIELD_NAME } from '@/config/users'

interface IUser {
  userId: number
  parentId: number | null
  userName: string
  userTitleCode: string | null
  userTitleDesc: string | null
  userDeptCode: string | null
  userDeptDesc: string | null
  userPhoto: string | null
  userEmail: string | null
  userPhone: string | null
  userHireDate: string | null
  userStatusActive: Boolean | null
  superiorTitleCode: string | null
  superiorTitleDesc: string | null
  superiorDeptCode: string | null
  superiorDeptDesc: string | null
  superiorName: string | null
}

const UserList = () => {
  const searchParams = useSearchParams()

  // const positionData = useCustomerData()
  const page = Number(searchParams?.get('page')) ?? 1
  const sort = searchParams?.get('sort')
  const limit = typeof searchParams?.get('per_page') === 'string' ? parseInt(searchParams?.get('per_page')) : 10
  // const tableUsed: TableAlias[] = ['tc']
  const [data, setData] = useState<IUser[]>([]);
  const [dataSubmit, setDataSubmit] = useState<IParamSearch>({
    paramSearch: []
  });
  const [pageCount, setPageCount] = useState(0);
  // const [currentPage, setCurrentPage] = useState(page);

  const optUserCSR = useGetOptionsData({
    table: 'users',
    fieldForLabel: 'userName',
    fieldForValue: 'userId',
    fieldAvatar: 'photo',
  })
  const optPosition = useGetOptionsData({
    table: 'position',
    fieldForLabel: 'titleDesc',
    fieldForValue: 'titleCode',
    styleId: 'departementCode',

  })

  const pageCustomerConfig = React.useMemo<ConfigPageType[]>(
    () => [
      {
        table: 'users',
        alias: 'tu',
        column: [
          {
            columnDataType: 'number',
            label: 'User ID',
            value: 'userId',
          },
          {
            columnDataType: 'string',
            label: 'Name',
            value: 'userName',
          },
          {
            columnDataType: 'number',
            label: 'Position ID',
            value: 'positionId',
          },
          {
            columnDataType: 'number',
            label: 'Parent ID',
            value: 'parentId',
          },
          {
            columnDataType: 'string',
            label: 'Email',
            value: 'email',
          },
          {
            columnDataType: 'date',
            label: 'Hire Date',
            value: 'hireDate',
          },
          {
            columnDataType: 'boolean',
            label: 'Status Active',
            value: 'statusActive',
          },
          {
            columnDataType: 'date',
            label: 'Created At',
            value: 'createdAt',
          },
          {
            columnDataType: 'date',
            label: 'Updated At',
            value: 'updatedAt',
          },
        ],
      },
      {
        table: 'position',
        alias: 'tp',
        column: [
          {
            columnDataType: 'option',
            label: 'Position',
            value: 'titleCode',
            fieldQuery: {
              fieldForLabel: 'titleCode',
              fieldForValue: 'titleCode',
              styleId: 'departementCode',
            },
            cellInfo: PositionColor,
            optionData: optPosition,
          },
        ],
      },
      {
        table: 'users',
        alias: 'tu2',
        column: [
          {
            columnDataType: 'option',
            label: 'SPV Name',
            value: 'userName',
            fieldQuery: {
              fieldForLabel: 'userId',
              fieldForValue: 'userName',
              styleId: 'userId',
              fieldAvatar: 'photo',
            },
            optionData: optUserCSR,
          }
        ],
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [optUserCSR, optPosition]
  )

  const columns = React.useMemo<ColumnDef<IUser, unknown>[]>(
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
        accessorKey: FIELD_NAME.userName.id,
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={FIELD_NAME.userName.title}
          />
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
        accessorKey: FIELD_NAME.position.id,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={FIELD_NAME.position.title} />
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
        accessorKey: FIELD_NAME.supervisor.id,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={FIELD_NAME.supervisor.title} />
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
        accessorKey: FIELD_NAME.phoneNumber.id,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={FIELD_NAME.phoneNumber.title} />
        ),
        cell: ({ row }) => row.original.userPhone,
      },
      {
        accessorKey: FIELD_NAME.hireDate.id,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={FIELD_NAME.hireDate.title} />
        ),
        cell: ({ row }) => formatDate(row.original.userHireDate),
        enableColumnFilter: false,
      },
    ],
    []
  )
  const uriParams = { limit, page, sort }
  const fetchData = async () => {
    const result = await fetchUsers({
      config: pageCustomerConfig,
      uriParams,
      dataSubmit
    });
    console.log("result:", result);

    setData(result.userPositionWithSuperior);
    setPageCount(result.pageCount);
    // setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSubmit, page, sort, limit]);

  const handleSearch = (newdataSubmit: IParamSearch) => {
    setDataSubmit(newdataSubmit);
    fetchData();
  };

  return (
    <>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Advanced Search</CardTitle>
          <CardDescription>
            Create Filter
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <AdvanceSearch
            configPage={pageCustomerConfig}
            onSearch={handleSearch}
          // columnList={filterColumnsByTable(tableUsed)}
          // options={positionData}
          />
        </CardContent>
      </Card >
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>User List</CardTitle>
          <CardDescription>
            Choose Customer name to edit
          </CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
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