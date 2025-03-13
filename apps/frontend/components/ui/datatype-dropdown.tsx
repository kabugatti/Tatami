"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const dojoDataTypes = [
  "u8",
  "u16",
  "u32",
  "u64",
  "u128",
  "u256",
  "ByteArray",
  "String",
  "Bool",
  "ContractAddress",
];

interface DatatypeDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function DatatypeDropdown({
  value = "",
  onChange,
}: DatatypeDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue);
    }

    setSearchQuery("");
  };

  const filteredDatatypes = dojoDataTypes.filter((datatype) =>
    datatype.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Select
      value={value}
      onValueChange={handleSelectChange}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className="w-full h-8 bg-background border border-yellow-500/20 text-muted-foreground px-3">
        <SelectValue placeholder="Select a datatype">{value}</SelectValue>
      </SelectTrigger>
      <SelectContent
        side="bottom"
        className="bg-stone-800 border border-yellow-500/20 text-muted-foreground z-[999] max-h-60 overflow-y-auto"
        position="popper"
        sideOffset={5}
        align="start"
        avoidCollisions={false}
      >
        <div className="relative w-full px-2 py-2 border-b border-yellow-500/20">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.stopPropagation()
            }
            onSelect={(e) => e.preventDefault()}
            className="w-full pl-8 pr-2 py-1 bg-stone-700 text-foreground focus:outline-none rounded"
          />
        </div>
        {filteredDatatypes.length > 0 ? (
          filteredDatatypes.map((datatype) => (
            <SelectItem
              key={datatype}
              value={datatype}
              className="hover:bg-stone-700 focus:bg-stone-700"
            >
              {datatype}
            </SelectItem>
          ))
        ) : (
          <div className="px-4 py-2 text-muted-foreground">
            No results found
          </div>
        )}
      </SelectContent>
    </Select>
  );
}
