import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useState } from "react";

interface IProps {
  onOptionSelected: (value: number) => void;
  options: any;
  value: number;
  optionLabel: string;
  optionValue: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export const Dropdown = ({
  onOptionSelected,
  options,
  optionLabel,
  optionValue,
  value,
  showSearch,
  searchPlaceholder,
}: IProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? options.find((option: any) => option[optionValue] === value)?.[
                optionLabel
              ]
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          {showSearch && (
            <CommandInput placeholder={searchPlaceholder ?? "Search..."} />
          )}
          <CommandEmpty>Tidak ada data</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option: any) => (
                <CommandItem
                  key={option[optionValue]}
                  value={option[optionValue]}
                  onSelect={(currentValue) => {
                    onOptionSelected(
                      options.filter(
                        (option: any) => option[optionLabel] === currentValue
                      )[0][optionValue]
                    );
                    setOpen(false);
                  }}
                >
                  {option[optionLabel]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
