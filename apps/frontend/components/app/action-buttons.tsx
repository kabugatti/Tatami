import { Button } from "@/components/ui/button";
import { Code, Copy, Download } from "lucide-react";
import Image from "next/image";

interface ActionButtonsProps {
  activeSection: string;
  onToggleSection: () => void;
  onCopy: () => void;
  onDownload: () => void;
}

export function ActionButtons({
  activeSection,
  onToggleSection,
  onCopy,
  onDownload,
}: ActionButtonsProps) {
  return (
    <div className="flex justify-end p-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={onToggleSection}
        className="bg-background  hover:bg-background/30"
      >
        {activeSection === "code" ? (
          <Image src="/diagram.svg" alt="Diagram" width={20} height={20} />
        ) : (
          <Code className="h-4 w-4" />
        )}
      </Button>
      {activeSection === "code" && (
        <Button
          size="icon"
          variant="ghost"
          onClick={onCopy}
          className="bg-background hover:bg-background/30"
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
      <Button
        size="icon"
        variant="ghost"
        onClick={onDownload}
        className="bg-background hover:bg-background/30"
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
}
