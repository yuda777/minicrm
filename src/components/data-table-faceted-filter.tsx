"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, ChevronDown, X } from "lucide-react"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

const schema = z.object({
  array_field: z.array(z.string()).optional(),
})

export default function MultiSelectForm() {
  const options = [
    { value: "One", label: "One" },
    { value: "Two", label: "Two" },
    { value: "Tree", label: "Tree" },
    { value: "Four", label: "Four" },
    { value: "Six", label: "Six" },
    { value: "Seven", label: "Seven" },
    { value: "Eight", label: "Eight" },
    { value: "Nine", label: "Nine" },
    { value: "Ten", label: "Ten" },
  ]

  const [selectedValues, setSelectedValues] = React.useState(
    () => new Set<string>(),
  )
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: z.infer<typeof schema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px]  bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-3/5">
          <CardContent className="grid gap-4 pt-4">
            <FormField
              control={form.control}
              name="array_field"
              render={() => (
                <FormItem>
                  <FormLabel>Numbers</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className="relative flex min-h-[36px] items-center justify-end  border data-[state=open]:border-ring">
                          <div className="relative mr-auto flex flex-grow flex-wrap items-center overflow-hidden px-3 py-1">
                            {selectedValues?.size > 0 ? (
                              options &&
                              options
                                .filter((option) =>
                                  selectedValues.has(option.value),
                                )
                                .map((option) => (
                                  <Badge
                                    key={option.value}
                                    variant="outline"
                                    className="m-[2px] gap-1 pr-0.5"
                                  >
                                    <span className="">{option.label}</span>
                                    <span
                                      onClick={(e) => {
                                        e.preventDefault()
                                        setSelectedValues((prev) => {
                                          const next = new Set(prev)
                                          next.delete(option.value)
                                          return next
                                        })
                                      }}
                                      className="flex items-center  px-[1px] hover:bg-accent hover:text-red-500"
                                    >
                                      <X size={14} />
                                    </span>
                                  </Badge>
                                ))
                            ) : (
                              <span className="mr-auto text-sm">Select...</span>
                            )}
                          </div>
                          <div className="flex flex-shrink-0 items-center self-stretch px-1 text-muted-foreground/60">
                            {selectedValues?.size > 0 && (
                              <div
                                onClick={(e) => {
                                  e.preventDefault()
                                  setSelectedValues(new Set())
                                }}
                                className="flex items-center self-stretch p-2 hover:text-red-500"
                              >
                                <X size={16} />
                              </div>
                            )}
                            <span className="mx-0.5 my-2 w-[1px] self-stretch bg-border" />
                            <div className="flex items-center self-stretch p-2 hover:text-muted-foreground">
                              <ChevronDown size={16} />
                            </div>
                          </div>
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[var(--radix-popover-trigger-width)] p-0"
                      align="start"
                    >
                      <Command>
                        <CommandInput
                          placeholder="Search numbers..."
                          className="h-9"
                        />
                        <CommandEmpty>No result found.</CommandEmpty>
                        <CommandGroup>
                          {options.map((option, index) => {
                            const isSelected = selectedValues.has(option.value)
                            return (
                              <CommandItem
                                key={index}
                                onSelect={() => {
                                  if (isSelected) {
                                    selectedValues.delete(option.value)
                                  } else {
                                    selectedValues.add(option.value)
                                  }
                                  const filterValues =
                                    Array.from(selectedValues)
                                  form.setValue("array_field", filterValues)
                                }}
                              >
                                <div
                                  className={cn(
                                    "mr-2 flex h-4 w-4 items-center justify-center  border border-primary",
                                    isSelected
                                      ? "bg-primary text-primary-foreground"
                                      : "opacity-50 [&_svg]:invisible",
                                  )}
                                >
                                  <CheckIcon className={cn("h-4 w-4")} />
                                </div>
                                <span>{option.label}</span>
                              </CommandItem>
                            )
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}