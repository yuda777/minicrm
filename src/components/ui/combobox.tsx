"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface collectedDataProps {
  table: string;
  excel: string;
}
interface dataProps {
  fieldExcel: string[],
  fieldTable: string,
  collectedData: collectedDataProps[],
  setCollectedData: React.Dispatch<React.SetStateAction<collectedDataProps[]>>

}

export function ComboboxDemo({ fieldTable, fieldExcel, collectedData, setCollectedData }: dataProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const handleInputComp = (val: string, del: boolean = false) => {
    // const result = value ? fieldExcel.find((data) => data === value) || "" : ""
    // setValue(currentValue === value ? "" : currentValue)
    if (del) {
      const indexToRemove = collectedData.findIndex(item => item.table === fieldTable);
      if (indexToRemove !== -1) {
        const updatedData = collectedData.filter((_, i) => i !== indexToRemove);
        setCollectedData(updatedData)
      }
    } else {
      const indexOfItem = collectedData.findIndex(item => item.table === fieldTable)
      if (indexOfItem !== -1) {
        const updatedField = [...collectedData]
        updatedField[indexOfItem].excel = val
        setCollectedData(updatedField)
      } else {
        setCollectedData([...collectedData, { table: fieldTable, excel: val }])
      }
    }
    setOpen(false)
  }

  // React.useEffect(() => {
  //   const handleSearch = () => {
  //     const result = value ? fieldExcel.find((data) => data === value) || "" : ""
  //     setValue(result);
  //     return result
  //   }
  // })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between "
        >
          <div className="mr-auto">
            {value}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search field..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {fieldExcel.map((data) => (
              <CommandItem
                key={data}
                value={data}
                // onSelect={() => handleInputComp(data)}
                onSelect={(currentValue) => {
                  if (currentValue === value) {
                    handleInputComp("", true)
                    setValue("")
                  } else {
                    handleInputComp(data)
                    setValue(currentValue)
                  }
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === data ? "opacity-100" : "opacity-0"
                  )}
                />
                {data}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}