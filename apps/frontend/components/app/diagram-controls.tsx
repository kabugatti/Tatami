import { Button } from "@/components/ui/button";
import { Expand, Minus, Plus } from "lucide-react";

export function DiagramControls() {
  return (
    <div className="flex justify-end items-center p-2 border-t">
      <Button
        size="icon"
        variant="ghost"
        className="bg-white hover:bg-gray-100"
      >
        <Plus className="h-4 w-4" />
      </Button>
      <span className="font-semibold">25%</span>
      <Button
        size="icon"
        variant="ghost"
        className="bg-white hover:bg-gray-100"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="bg-white hover:bg-gray-100"
      >
        <Expand className="h-4 w-4" />
      </Button>
    </div>
  );
}
