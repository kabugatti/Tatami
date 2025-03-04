"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

const dojoDataTypes = [
  "# u8",
  "# u16",
  "# u32",
  "# u64",
  "# u128",
  "# u256",
  "ByteArray",
  "String",
  "Bool",
  "ContractAddress",
];

export default function DatatypeDropdown() {
  const [selectedDatatype, setSelectedDatatype] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value: string) => {
    setSelectedDatatype(value);
    setSearchQuery("");
  };

  const filteredDatatypes = dojoDataTypes.filter((datatype) =>
    datatype.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Select
      onValueChange={handleSelectChange}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SelectTrigger className="w-full bg-white border border-gray-300 rounded-md shadow-sm text-gray-400">
        <SelectValue placeholder="Select a datatype" />
      </SelectTrigger>
      <SelectContent
        side="bottom"
        className="w-full bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto"
      >
        <div className="relative w-full px-2 py-2 border-b border-gray-300">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
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
            className="w-full pl-8 pr-2 py-1 border-none focus:outline-none"
          />
        </div>
        {filteredDatatypes.length > 0 ? (
          filteredDatatypes.map((datatype) => (
            <SelectItem key={datatype} value={datatype}>
              {datatype}
            </SelectItem>
          ))
        ) : (
          <div className="px-4 py-2 text-gray-500">No results found</div>
        )}
      </SelectContent>
    </Select>
  );
}
