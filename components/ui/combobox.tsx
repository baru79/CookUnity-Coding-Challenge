"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ComboboxItem } from "@/types/combobox-item";

interface Combobox {
  itemSelected?: ComboboxItem;
  items: ComboboxItem[];
  placeholderButton?: string;
  placeholderInput?: string;
  onSelect?: ({ value, label }: ComboboxItem) => void;
}

const Combobox = ({
  itemSelected,
  items,
  placeholderButton = "Select item...",
  placeholderInput = "Search item...",
  onSelect,
}: Combobox) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {itemSelected?.value && itemSelected.label
            ? items.find((item) => item.value === itemSelected.value)?.label
            : placeholderButton}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            const sanitizedSearch = search.replace(
              /[-\/\\^$*+?.()|[\]{}]/g,
              "\\$&"
            );
            const searchRegex = new RegExp(sanitizedSearch, "i");
            const itemLabel = items.find((item) => item.value === value)?.label;
            return searchRegex.test(`${itemLabel}`) ? 1 : 0;
          }}
        >
          <CommandInput placeholder={placeholderInput} />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    onSelect &&
                      onSelect(
                        currentValue === itemSelected?.value
                          ? { value: "", label: "" }
                          : { value: item.value, label: item.label }
                      );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      itemSelected?.value === item.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
