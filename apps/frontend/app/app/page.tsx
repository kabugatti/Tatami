import { CodeDiagramSection } from "@/app/app/diagram/code-diagram-section";
import { ModelStateProvider } from "@/hooks/useModelState";

export default function AppPage() {
  return (
    <ModelStateProvider>
      <main className="w-full h-full p-10">
        <CodeDiagramSection />
      </main>
    </ModelStateProvider>
  );
}
