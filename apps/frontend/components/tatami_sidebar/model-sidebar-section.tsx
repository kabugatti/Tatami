import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { PropertyItem } from "../models/PropertyItem";
import { Button } from "../ui/button";
import { useModelSection } from "./use-model-section";

export function ModelSidebarSection() {
  const {
    addModel,
    models,
    toggleModelExpansion,
    updateModelName,
    deleteModel,
    updatePropertyDataType,
    updatePropertyName,
    updatePropertyKey,
    deleteProperty,
    addProperty,
    editingModels,
    setEditingModels,
  } = useModelSection();
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 flex justify-end flex-shrink-0">
        <Button
          onClick={addModel}
          className="hover:bg-foreground/95 bg-foreground text-background font-medium flex items-center gap-1"
        >
          <span className="text-lg">+</span> Add model
        </Button>
      </div>

      {/* Model list with custom scrollbar */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 overflow-x-visible">
        {models.map((model) => (
          <div
            key={model.id}
            className="border border-neutral bg-neutral rounded-md overflow-hidden mb-4"
          >
            <div className="flex items-center justify-between p-3 bg-neutral text-foreground">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleModelExpansion(model.id)}
                >
                  {model.expanded ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <Input
                    value={editingModels[model.id] ?? model.name} // Si no se está editando, usa el nombre actual
                    onChange={(e) =>
                      setEditingModels((prev) => ({
                        ...prev,
                        [model.id]: e.target.value,
                      }))
                    }
                    className="h-8 bg-background border-neutral"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updateModelName(
                          model.id,
                          editingModels[model.id] ?? model.name,
                        );
                      } else if (e.key === "Escape") {
                        setEditingModels((prev) => {
                          const updated = { ...prev };
                          delete updated[model.id];
                          return updated;
                        });
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => deleteModel(model.id)}
                  className=" hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {model.expanded && (
              <div className="p-3 bg-neutral">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Properties
                </h3>

                <div className="grid grid-cols-12 gap-1 text-xs font-medium text-muted-foreground mb-2 bg-background px-2 py-3">
                  <div className="col-span-5">Name</div>
                  <div className="col-span-4">Datatype</div>
                  <div className="col-span-1 text-center">Key</div>
                  <div className="col-span-2 text-center" />
                </div>

                {model.properties.map((property) => (
                  <PropertyItem
                    key={property.id}
                    id={property.id}
                    name={property.name}
                    dataType={property.dataType}
                    isKey={property.isKey}
                    onNameChange={(propertyId, value) =>
                      updatePropertyName(model.id, propertyId, value)
                    }
                    onDataTypeChange={(propertyId, value) =>
                      updatePropertyDataType(model.id, propertyId, value)
                    }
                    onKeyChange={(propertyId, value) =>
                      updatePropertyKey(model.id, propertyId, value)
                    }
                    onDelete={(propertyId) =>
                      deleteProperty(model.id, propertyId)
                    }
                  />
                ))}

                <Button
                  onClick={() => addProperty(model.id)}
                  className="w-full mt-2 text-text bg-background hover:bg-background/0 hover:text-primary-foreground border border-dotted border-foreground-500"
                >
                  <span className="mr-1">+</span> Add property
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
