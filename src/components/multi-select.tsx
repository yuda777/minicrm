"use client"

import * as React from "react"
import type { Option } from "@/types"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge3"
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem } from "@/components/ui/command"

interface MultiSelectProps {
  tableData: Option[] | null
  setTableData: React.Dispatch<React.SetStateAction<Option[] | null>>
  // setTableData: (index: number) => void
  onChange?: (value: Option[] | null) => void
  placeholder?: string
  options: Option[]
}

export function MultiSelect({
  tableData,
  setTableData,
  onChange,
  placeholder = "Select options",
  options,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  // Register as input field to be used in react-hook-form
  React.useEffect(() => {
    if (onChange) onChange(tableData?.length ? tableData : null)
  }, [onChange, tableData])

  const handleSelect = React.useCallback(
    (option: Option) => {
      setTableData((prev) => [...(prev || []), option])
    },
    [setTableData]
  )

  const handleRemove = React.useCallback(
    (option: Option) => {
      setTableData((prev) => prev?.filter((item) => item !== option) ?? [])
    },
    [setTableData]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, option?: Option) => {
      if (!inputRef.current) return

      if (event.key === "Backspace" || event.key === "Delete") {
        setTableData((prev) => prev?.slice(0, -1) ?? [])
      }

      if ((event.key === "Tab" || event.key === "Enter") && option) {
        handleSelect(option)
        console.log("Tab Pressed");
      }

      // Blur input on escape
      if (event.key === "Escape") {
        inputRef.current.blur()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setTableData]
  )

  // Memoize filtered options to avoid unnecessary re-renders
  const filteredOptions = React.useMemo(() => {
    return options.filter((option) => {
      if (tableData?.find((item) => item.value === option.value)) return false

      if (query.length === 0) return true

      return option.label.toLowerCase().includes(query.toLowerCase())
    })
  }, [options, query, tableData])

  return (
    <Command
      onKeyDown={handleKeyDown}
      className=" overflow-visible bg-transparent "
    >
      <div className="flex h-10 group  border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {tableData?.map((option) => {
            return (
              <Badge
                key={option.value}
                variant="secondary"
                className="rounded hover:bg-secondary"
              >
                {option.label}
                <Button
                  aria-label="Remove option"
                  size="sm"
                  className="h-3 w-3 ml-2 bg-transparent p-0 text-primary hover:bg-transparent hover:text-destructive"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      e.stopPropagation()
                      handleRemove(option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleRemove(option)}
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </Button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            placeholder={placeholder}
            className="flex-1 bg-transparent px-1 py-1 outline-none placeholder:text-muted-foreground"
            value={query}
            onValueChange={setQuery}
            onBlur={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </div>
      <div className="relative z-50 ">
        {isOpen && filteredOptions.length > 0 ? (
          <div className="absolute w-full  border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className=" overflow-auto">
              {filteredOptions.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    className="text-sm"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={() => {
                      handleSelect(option)
                      setQuery("")
                    }}
                  >
                    {option.label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  )
}
