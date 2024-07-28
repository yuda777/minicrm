// src/components/multi-select.tsx

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge, BadgeVariant } from '@/components/ui/badge';
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
import { CellInfoType, Option, optionDataType } from "@/types";

interface MultiSelectProps {
  options: optionDataType[];
  onChange?: (options: Option[]) => void;
  defaultValue?: Option[];
  placeholder?: string;
  animation?: number;
  asChild?: boolean;
  styleArr?: CellInfoType[];
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
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      asChild = false,
      styleArr,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedItems, setSelectedItems] = React.useState<optionDataType[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    React.useEffect(() => {
      if (defaultValue.length > 0) {
        setSelectedItems(defaultValue);
      }
    }, [defaultValue]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedItems = [...selectedItems];
        newSelectedItems.pop();
        setSelectedItems(newSelectedItems);
        onChange(newSelectedItems);
      }
    };

    const toggleOption = (option: optionDataType) => {
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
      // setIsPopoverOpen((prev) => !prev);
      setIsPopoverOpen(true)
    };

    const getColorById = (id: string): string | undefined => {
      const item = styleArr.find((colorItem) => String(colorItem.id) === String(id));
      return item?.color;
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
              "justify-between w-full min-h-10 h-auto bg-inherit hover:bg-card",
              className
            )}
          >
            {selectedItems.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap gap-1 items-center">
                  {selectedItems.map((option) => (
                    <Badge
                      key={option.value}
                      variant={option.styleId ? getColorById(option.styleId) as BadgeVariant['variant'] : 'outline'}
                      // variant={'red'}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {option.label}
                      <Icons.close
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleOption(option);
                        }}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <Icons.close
                    className="h-4 mx-2 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator orientation="vertical" className="flex min-h-6 h-full" />
                  <Icons.chevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center w-full">
                <span className="my-px text-muted-foreground">
                  {placeholder}
                </span>
                <Icons.chevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
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
            <CommandInput placeholder="Search..." onKeyDown={handleInputKeyDown} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedItems.find(item => item.value === option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option)}
                      style={{ pointerEvents: "auto", opacity: 1 }}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center border border-primary",
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <Icons.check className="h-4 w-4" />
                      </div>
                      <span>
                        {option?.avatar ?
                          (
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage
                                  src={`/face/${option?.avatar}`}
                                  alt={""}
                                />
                                <AvatarFallback>
                                  <Icons.defaultUser className="h-16 w-16" aria-hidden="true" />
                                </AvatarFallback>
                              </Avatar>
                              {option.label}
                            </div>
                          ) :
                          (
                            <Badge
                              key={option.value}
                              variant={option.styleId ? getColorById(option.styleId) as BadgeVariant['variant'] : 'outline'}
                              style={{ animationDuration: `${animation}s` }}
                            >
                              {option.label}
                            </Badge>
                          )
                        }

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
                        style={{ pointerEvents: "auto", opacity: 1 }}
                        className="flex-1 justify-center cursor-pointer"
                      >
                        Clear
                      </CommandItem>
                      <Separator orientation="vertical" className="flex min-h-6 h-full" />
                    </>
                  )}
                  <CommandSeparator />
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    style={{ pointerEvents: "auto", opacity: 1 }}
                    className="flex-1 justify-center cursor-pointer"
                  >
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
