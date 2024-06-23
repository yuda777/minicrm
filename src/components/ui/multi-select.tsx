// src/components/multi-select.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  Sparkles,
  X,
} from "lucide-react";

import { cn, colorScheme } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface Options {
  label: string;
  value: string;
  deptCode?: string;
  icon?: React.ComponentType<{ className?: string }>;
}
interface MultiSelectProps {
  options: Options[];
  // onValueChange: (value: Options[]) => void;
  onChange?: (options: Options[]) => void;
  defaultValue?: Options[];
  placeholder?: string;
  animation?: number;
  asChild?: boolean;
  className?: string;
}

export const MultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onChange,
      // onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      asChild = false,
      className,
      ...props
    },
    ref
  ) => {
    // const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [selectedItems, setSelectedItems] = React.useState<Options[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(animation > 0);
    React.useEffect(() => {
      if (defaultValue.length > 0) {
        setSelectedItems(defaultValue);
      }
    }, [defaultValue]);
    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedItems = [...selectedItems];
        newSelectedItems.pop();
        setSelectedItems(newSelectedItems);
        onChange(newSelectedItems);
      }
    };
    const toggleOption = (option: Options) => {
      const newSelectedItems = selectedItems.some(item => item.value === option.value)
        ? selectedItems.filter(item => item.value !== option.value)
        : [...selectedItems, option];
      setSelectedItems(newSelectedItems);
      onChange?.(newSelectedItems);
    };
    const handleClear = () => {
      setSelectedItems([]);
      onChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            variant="outline"
            role="checkbox"
            onClick={handleTogglePopover}
            className={cn(
              " justify-between w-full min-h-10 h-auto bg-inherit hover:bg-card", //inline-flex w-full border min-h-11 h-auto px-2 py-2 items-center
              className
            )}
          >
            {selectedItems.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap gap-1 items-center">
                  {selectedItems.map((option) => {
                    return (
                      <Badge
                        key={option.value}
                        variant={option.deptCode ?
                          colorScheme(option.deptCode)
                          : 'outline'}
                        style={{
                          animationDuration: `${animation}s`,
                        }}
                      >
                        {option?.label}
                        <X
                          className="ml-2 h-4 w-4 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(option);
                          }}
                        />
                      </Badge>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <XIcon
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  />
                  <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full mx-auto">
                <span className="text-sm text-muted-foreground mx-3">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="popover-content-width-same-as-its-trigger p-0 drop-shadow-sm"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command>
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedItems.find(item => item.value === option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option)}
                      style={{
                        pointerEvents: "auto",
                        opacity: 1,
                      }}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center  border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <CheckIcon className="h-4 w-4" />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>
                        <Badge
                          key={option.value}
                          variant={option.deptCode ?
                            colorScheme(option.deptCode)
                            : 'outline'}
                          style={{
                            animationDuration: `${animation}s`,
                          }}
                        >
                          {option.label}
                        </Badge>
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedItems.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        style={{
                          pointerEvents: "auto",
                          opacity: 1,
                        }}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        Clear
                      </CommandItem>
                      <Separator
                        orientation="vertical"
                        className="flex min-h-6 h-full"
                      />
                    </>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    style={{
                      pointerEvents: "auto",
                      opacity: 1,
                    }}
                    className="flex-1 justify-center cursor-pointer"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedItems.length > 0 && (
          <Sparkles
            className={cn(
              "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
              isAnimating ? "" : "text-muted-foreground"
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";