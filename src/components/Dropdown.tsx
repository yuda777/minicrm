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
import { tableColumnsType } from "@/types"

interface dropdownProps {
  placeholder?: string
  options: tableColumnsType[]
  value?: string
  onChange?: (value: string) => void
  onFocus?: () => void;
}

export default function Dropdown({
  placeholder = '',
  options,
  value: controlledValue,
  onFocus,
  onChange
}: dropdownProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const triggerRef = React.useRef<HTMLButtonElement>(null);  // Create a ref for the PopoverTrigger

  // console.log("value:", value);
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue)
      onChange?.(controlledValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledValue])
  const focusDropdown = () => {
    if (triggerRef.current) {
      triggerRef.current.focus();
      onFocus?.();  // Call onFocus callback if provided
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between "
        >
          {value
            ?
            options.find((option) => option.value === value)?.label
            :
            <p className="text-gray-500">
              {placeholder ? `${placeholder}...` : "select option"}
            </p>
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={(currentValue) => {
                  setValue(option.value === value ? undefined : option.value)
                  onChange?.(option.value === value ? undefined : option.value ?? '')
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
