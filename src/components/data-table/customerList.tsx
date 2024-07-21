'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ConfigPageType, IParamSearch, TypeValue, tableColumnsDescType } from '@/types'
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
import { fetchCustomer } from '@/app/_actions/customer'
import { useGetOptionsData } from '@/hooks/useGetOptionsData'
import { DataTable } from './data-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'
import { colorScheme, exportToExcel, formatDate } from '@/lib/utils'

interface ICustomer {
  customerName: string | null
  email: string | null
  phone: string | null
  address: string | null
  birthDate: string | null
  registrationDate: string | null
  response: string | null
  reason: string | null
  batchName: string | null
  csrName: string | null
  spvName: string | null
  createdAt: string | null
  updatedAt: string | null
}

const CustomerList = () => {
  const searchParams = useSearchParams()

  // const positionData = useCustomerData()
  const page = Number(searchParams?.get('page')) ?? 1
  const sort = searchParams?.get('sort')
  const limit = typeof searchParams?.get('per_page') === 'string' ? parseInt(searchParams?.get('per_page')) : 10
  // const tableUsed: TableAlias[] = ['tc']
  const [data, setData] = useState<ICustomer[]>([]);
  const [dataSubmit, setDataSubmit] = useState<IParamSearch>({
    paramSearch: []
  });
  const [pageCount, setPageCount] = useState(0);
  // const [currentPage, setCurrentPage] = useState(page);

  const optResponse = useGetOptionsData({
    table: 'response',
    fieldForLabel: 'response',
    fieldForValue: 'responseId',
    styleId: 'responseId'
  })

  const optReason = useGetOptionsData({
    table: 'reason',
    fieldForLabel: 'reason',
    fieldForValue: 'reasonId',
    styleId: 'responseId'
  })
  const optUserCSR = useGetOptionsData({
    table: 'users',
    fieldForLabel: 'userName',
    fieldForValue: 'userId',
    fieldAvatar: 'photo',
  })
  const optUserSPV = useGetOptionsData({
    table: 'users',
    fieldForLabel: 'userName',
    fieldForValue: 'userId',
    fieldAvatar: 'photo',
  })

  const pageCustomerConfig = React.useMemo<ConfigPageType[]>(
    () => [
      {
        table: 'customer',
        alias: 'tc',
        column: [
          {
            columnDataType: 'string',
            label: 'Name',
            value: 'customerName',
          },
          {
            columnDataType: 'string',
            label: 'Email',
            value: 'email',
          },
          {
            columnDataType: 'string',
            label: 'Phone',
            value: 'phone',
          },
          {
            columnDataType: 'string',
            label: 'Address',
            value: 'address',
          },
          {
            columnDataType: 'date',
            label: 'Birth Date',
            value: 'birthDate',
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
        table: 'uploadBatch',
        alias: 'tub',
        column: [
          {
            columnDataType: 'string',
            label: 'Batch Name',
            value: 'batchName',
          }
        ],
      },
      {
        table: 'response',
        alias: 'tr',
        column: [
          {
            columnDataType: 'option',
            label: 'Response',
            value: 'response',
            fieldQuery: {
              fieldForLabel: 'response',
              fieldForValue: 'responseId',
              styleId: 'responseId',
            },
            optionData: optResponse,
            cellInfo: [
              { id: '1', color: 'red', icon: 'ThumbsUp' },
              { id: '2', color: 'green', icon: 'ThumbsDown' },
              { id: '3', color: 'blue', icon: 'Ear' },
              { id: '4', color: 'yellow', icon: 'EarOff' },
              { id: '5', color: 'purple', icon: 'Bird' },
              { id: '6', color: 'violet', icon: 'Bird' },
              { id: '7', color: 'indigo', icon: 'Bird' },
              { id: '8', color: 'emerald', icon: 'Bird' },
              { id: '9', color: 'orange', icon: 'Bird' },
              { id: '10', color: 'amber', icon: 'Bird' },
            ]
          }
        ],
      },
      {
        table: 'reason',
        alias: 'trn',
        column: [
          {
            columnDataType: 'option',
            label: 'Reason',
            value: 'reason',
            fieldQuery: {
              fieldForLabel: 'reason',
              fieldForValue: 'reasonId',
              styleId: 'responseId',
            },
            optionData: optReason,
            cellInfo: [
              { id: '1', color: 'green' },
              { id: '2', color: 'red' },
              { id: '3', color: 'blue' },
              { id: '4', color: 'yellow' },
              { id: '5', color: 'purple' },
              { id: '6', color: 'violet' },
              { id: '7', color: 'indigo' },
              { id: '8', color: 'emerald', },
              { id: '9', color: 'orange', },
              { id: '10', color: 'amber', },
            ]
          }
        ],
      },
      {
        table: 'users',
        alias: 'tu',
        column: [
          {
            columnDataType: 'option',
            label: 'CSR Name',
            value: 'userName',
            fieldQuery: {
              fieldForLabel: 'userName',
              fieldForValue: 'userId',
              fieldAvatar: 'photo',
            },
            optionData: optUserCSR,
          }
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
              fieldForLabel: 'customerId',
              fieldForValue: 'customerName',
              styleId: 'customerId',
              fieldAvatar: 'photo',
            },
            optionData: optUserCSR,
          }
        ],
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [optResponse, optReason, optUserCSR]
  )
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
        // Disable column sorting for this column
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "tc_customerName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex flex-col ">
              <span>
                {row.original.customerName}
              </span>
              <span className="text-sm text-slate-500">
                {row.original.email}
              </span>
            </div>
          )
        }
      },
      {
        accessorKey: "tr_response",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          return (
            row.original.response ? (
              <div className="flex flex-col ">
                <span>
                  {row.original.response}
                </span>
                <span className="text-sm text-slate-500">
                  {row.original.reason}
                </span>
              </div>
            ) : (
              <div className="flext inline-flex content-center justify-center items-center">
                <div>
                  {"NEW DATA"}
                </div>
              </div>
            )
          )
        }
      },
      {
        accessorKey: "tub_batchName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Batch" />
        ),
        cell: ({ row }) => row.original.batchName
      },
      {
        accessorKey: "tu_csrName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="CSR" />
        ),
        cell: ({ row }) => row.original.csrName
      },
      {
        accessorKey: "tu2_spvName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="SPV" />
        ),
        cell: ({ row }) => row.original.spvName
      },
      {
        accessorKey: "tc_birthDate",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Birth Date" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
      },
      {
        accessorKey: "tc_createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created Date" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date)
      },
      {
        accessorKey: "tc_updatedAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Updated Date" />
        ),
        cell: ({ cell }) => formatDate(cell.getValue() as Date)
      },

    ],
    []
  )
  const uriParams = { limit, page, sort }
  const fetchData = async () => {
    const result = await fetchCustomer({
      config: pageCustomerConfig,
      uriParams,
      dataSubmit
    });
    setData(result.customerData);
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
          <CardTitle className='text-2xl'>Customer List</CardTitle>
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
export default CustomerList