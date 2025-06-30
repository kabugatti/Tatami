import { Button } from "@/components/ui/button";
import { Expand, Minus, Plus, GitBranch } from "lucide-react";

interface DiagramControlsProps {
  relationshipsVisible: boolean;
  onToggleRelationships: (visible: boolean) => void;
}

export function DiagramControls({
  relationshipsVisible,
  onToggleRelationships,
}: DiagramControlsProps) {
  const toggleRelationships = () => {
    onToggleRelationships(!relationshipsVisible);
  };

  return (
    <div className="flex justify-between items-center p-2 border-t">
      <Button
        size="icon"
        variant={relationshipsVisible ? "default" : "outline"}
        onClick={toggleRelationships}
        title={relationshipsVisible ? "Hide Relationships" : "Show Relationships"}
        className="ml-2"
      >
        <GitBranch className="h-4 w-4" />
      </Button>
      <div className="flex items-center">
        <Button size="icon" variant="ghost">
          <Plus className="h-4 w-4" />
        </Button>
        <span className="font-semibold">25%</span>
        <Button size="icon" variant="ghost">
          <Minus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="ghost">
          <Expand className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}