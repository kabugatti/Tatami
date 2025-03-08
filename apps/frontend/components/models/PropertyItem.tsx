import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { PropertyItemProps } from "@/types/models";
import DatatypeDropdown from "../ui/datatype-dropdown";
export function PropertyItem({
  id,
  name,
  dataType,
  isKey,
  onNameChange,
  onDataTypeChange,
  onKeyChange,
  onDelete,
}: PropertyItemProps) {
  return (
    <div className="grid grid-cols-12 gap-1 items-center bg-background rounded-md p-2 mb-2 bg-stone-700">
      <div className="col-span-1 flex justify-center text-muted-foreground">
        ≡
      </div>
      <div className="col-span-5">
        <Input
          value={name}
          onChange={(e) => onNameChange(id, e.target.value)}
          className="h-8 bg-background border-yellow-500/20 text-foreground"
          placeholder="Name"
        />
      </div>
      <div className="col-span-4">
        <DatatypeDropdown 
          value={dataType} 
          onChange={(value) => onDataTypeChange(id, value)} 
        />
      </div>
      <div className="col-span-1 flex justify-center">
        <input
          type="checkbox"
          checked={isKey}
          onChange={(e) => onKeyChange(id, e.target.checked)}
          className="h-4 w-4 rounded border-yellow-500/20 text-yellow-500 focus:ring-yellow-500"
        />
      </div>
      <div className="col-span-1 flex justify-center">
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="text-muted-foreground hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}