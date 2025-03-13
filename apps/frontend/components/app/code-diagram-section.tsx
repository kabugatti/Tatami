"use client";

import { useEffect, useState } from "react";

import { EntityCard, type EntityField } from "@/components/diagram/EntityCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { generateCairoCode } from "@/utils/generateCairoCode";
import { generateEntities } from "@/utils/generateEntities";
import { ActionButtons } from "./action-buttons";
import { DiagramControls } from "./diagram-controls";

export function CodeDiagramSection() {
  const [activeSection, setActiveSection] = useState("code");
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState("");
  const [entities, setEntities] = useState<
    { title: string; fields: EntityField[] }[]
  >([]);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    fetch("/api/models")
      .then((res) => res.json())
      .then((data) => {
        setCode(generateCairoCode(data.models || []));
        setEntities(generateEntities(data.models || []));
        setLoading(false);
      })
      .catch((err) => console.error("Error loading models:", err));
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard",
      duration: 2000,
      style: { color: "white" },
    });
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "models.cairo";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="bg-white rounded-xl shadow-md text-black flex flex-col h-full">
      <ActionButtons
        activeSection={activeSection}
        onToggleSection={() =>
          setActiveSection(activeSection === "code" ? "diagram" : "code")
        }
        onCopy={copyToClipboard}
        onDownload={downloadCode}
      />

      <div className="flex-1 overflow-auto p-4">
        {activeSection === "code" ? (
          loading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-mono text-sm">{code}</pre>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-10">
            {entities.length === 0 ? (
              <p className="text-gray-500">No models created yet</p>
            ) : (
              entities.map(({ title, fields }) => (
                <EntityCard key={title} title={title} fields={fields} />
              ))
            )}
          </div>
        )}
      </div>

      {activeSection === "diagram" && <DiagramControls />}
    </section>
  );
}
