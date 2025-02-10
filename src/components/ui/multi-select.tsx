import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import {
  useCallback,
  useRef,
  useState,
  KeyboardEvent,
  useMemo,
  ReactNode,
} from "react";

export type SelectOption = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: SelectOption[];
  selected: SelectOption[];
  onChange: (options: SelectOption[]) => void;
  placeholder?: string;
};

export const MultiSelect = ({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
}: MultiSelectProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback(
    (option: SelectOption) => {
      onChange(selected.filter((s) => s.value !== option.value));
    },
    [onChange, selected]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "" && selected.length > 0) {
            const newSelected = [...selected];
            newSelected.pop();
            onChange(newSelected);
          }
        }
        if (e.key === "Escape") {
          input.blur();
          setOpen(false);
        }
      }
    },
    [inputRef, onChange, selected]
  );

  const selectables = useMemo(
    () =>
      options.filter(
        (option) => !selected.some((opt) => opt.value === option.value)
      ),
    [options, selected]
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant="secondary">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              <Items
                onChange={onChange}
                selectables={selectables}
                selected={selected}
                setInputValue={setInputValue}
              />
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
};

interface PropItems {
  selectables: SelectOption[];
  setInputValue: (value: string) => Promise<void> | void;
  onChange: (values: SelectOption[]) => Promise<void> | void;
  selected: SelectOption[];
}
function Items({
  selectables,
  setInputValue,
  onChange,
  selected,
}: PropItems): ReactNode {
  if (selectables.length <= 0) return;

  return selectables.map((option) => {
    return (
      <CommandItem
        key={option.value}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onSelect={() => {
          setInputValue("");
          onChange([...selected, option]);
        }}
        className={"cursor-pointer"}
      >
        {option.label}
      </CommandItem>
    );
  });
}
