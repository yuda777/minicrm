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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import React from "react"
import { Label } from "@/components/ui/label"
import { createUserSchema, userSchema } from "@/lib/validations/user"
import { cn } from "@/lib/utils"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}
type Inputs = z.infer<ReturnType<typeof createUserSchema>>

function onSubmit(data: Inputs) {
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
          <PopoverContent className="w-80">
            <Form {...form}>
              <form
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
              >
                <div className="grid gap-4 ">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Advance Filter</h4>
                  </div>
                  <FormItem>
                    <div className=" inline space-x-2">
                      <FormLabel className=" align-middle">Where</FormLabel>
                      <FormControl>
                        <Popover >
                          <PopoverTrigger asChild>
                            <FormControl className="flex-none">
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between bg-background"
                                )}
                              >
                                <div className="mr-auto">
                                  Label
                                </div>
                                <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search Position..." />
                              <CommandEmpty>No Position found.</CommandEmpty>
                              <CommandGroup>
                                <CommandItem>1</CommandItem>
                                <CommandItem>2</CommandItem>
                                <CommandItem>3</CommandItem>
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormControl>
                        <Popover >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between bg-background"
                                )}
                              >
                                <div className="mr-auto">
                                  Label
                                </div>
                                <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0">
                            <Command>
                              <CommandInput placeholder="Search Position..." />
                              <CommandEmpty>No Position found.</CommandEmpty>
                              <CommandGroup>
                                <CommandItem>1</CommandItem>
                                <CommandItem>2</CommandItem>
                                <CommandItem>3</CommandItem>

                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </div>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                </div>
              </form>
            </Form>
          </PopoverContent>
        </Popover>

      </div>
      <div className="flex items-center space-x-2">
        <Button
          aria-label="Add new item"
          variant="outline"
          size="sm"
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
