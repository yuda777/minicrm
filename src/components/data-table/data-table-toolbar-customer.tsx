"use client"

import { usePathname, useRouter } from "next/navigation"
import { type Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { createUserSchema, userSchema } from "@/lib/validations/user"
import { cn } from "@/lib/utils"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}
type Inputs = z.infer<ReturnType<typeof createUserSchema>>

function onSubmit(data: Inputs) {
}

interface Iconditional {
  logical: "and" | "or",
  column: string,
  value: string
}
interface TableRow {
  logic: string
  field: string
  condition: string
  value: string
}
export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter()
  const isFiltered = table.getState().columnFilters.length > 0
  const form = useForm<Inputs>({
    resolver: zodResolver(userSchema),
    mode: "onSubmit",
    defaultValues: {
    }
  })
  // ======================================================================================
  const initialValue = {
    logic: '',
    field: '',
    condition: '',
    value: ''
  }
  const [tableData, setTableData] = useState<TableRow[]>([initialValue]);

  const handleAddRow = () => {
    setTableData([...tableData, initialValue]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  const handleInputChange = (index: number, field: keyof TableRow, value: string) => {
    const updatedTableData = [...tableData];
    updatedTableData[index][field] = value;
    setTableData(updatedTableData);
  };
  const displayJSON = JSON.stringify(tableData, null, 2);

  // ======================================================================================
  // const condition = useState[]
  const [condition, setCondition] = useState<Iconditional[]>([])
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
        {isFiltered && (
          <Button
            variant={"ghost"}
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3">
            Reset
            <Icons.close className="ml-2 h-4 w-4" />
          </Button>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              aria-label="Add new item"
              variant="outline"
              size="sm"
              className="h-8"
            // onClick={() => router.push(`/upload`)}
            >
              <Icons.filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <Form {...form}>
              <form
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
              >
                {/* ============================================================================================= */}
                <div className="flex flex-col space-y-1">
                  <div className="flex flex-col space-y-1 w-full">
                    {tableData.map((row, index) => (
                      <div
                        className="flex flex-row space-x-2"
                        key={index}
                      >
                        <div className="flex w-[150px] justify-center items-center">
                          <Select
                            value={row.logic}
                            onValueChange={(value) => handleInputChange(index, 'logic', value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {["And", "Or"].map((val, index) => (
                                  <SelectItem key={index}
                                    value={val}
                                  >
                                    {val}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex w-[200px] justify-center items-center ">
                          <Select
                            value={row.field}
                            onValueChange={(value) => handleInputChange(index, 'field', value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {["customerName", "batchCode", "uploadDate", "bucketPosition"].map((val, index) => (
                                  <SelectItem key={index}
                                    value={val}
                                  >
                                    {val}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <Select
                          value={row.condition}
                          onValueChange={(value) => handleInputChange(index, 'condition', value)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {[
                                "is",
                                "is not",
                                "contain",
                                "not contain"
                              ].map((val, index) => (
                                <SelectItem key={index}
                                  value={val}
                                >
                                  {val}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Input
                          disabled={false}
                          placeholder="value"
                          value={row.value}
                          onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                          className="w-full h-full "
                        />
                        <Button
                          variant={"outline"}
                          size={"sm"}
                          onClick={() => handleRemoveRow(index)}
                        >
                          <Icons.close className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant={"outline"}
                    size={"sm"}
                    onClick={handleAddRow}
                  >
                    Add Row
                  </Button>
                  <div className="hidden">
                    <h2>JSON Representation:</h2>
                    <pre>{displayJSON}</pre>
                  </div>
                </div>
                {/* ============================================================================================= */}
              </form>
            </Form>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          aria-label="Add new item"
          variant={"outline"}
          size={"sm"}
          className="h-8"
          onClick={() => router.push(`/upload`)}
        >
          <Icons.addCircle className="mr-2 h-4 w-4" />
          Upload
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
