"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ChevronDown,
  ChevronRight,
  Database,
  LayoutTemplate,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Model } from "@/types/models";
import { PropertyItem } from "../models/PropertyItem";
import { useEffect, useState } from "react";

const staticMenuItems = [
  { id: "models", label: "Models", icon: Database },
  { id: "metrics", label: "Metrics", icon: LayoutTemplate }
];

const initialDynamicContent = {
  layers: [
    { id: "layer1", label: "Layer 1" },
    { id: "layer2", label: "Layer 2" },
    { id: "layer3", label: "Layer 3" },
  ],
  settings: [
    { id: "account", label: "Account Settings" },
    { id: "preferences", label: "Preferences" },
    { id: "theme", label: "Theme" },
  ],
};

export function AppSidebar() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dynamicContent, setDynamicContent] = useState(initialDynamicContent);
  const [models, setModels] = useState<Model[]>([]);
  const [editingModelId, setEditingModelId] = useState<string | null>(null);
  const [editModelName, setEditModelName] = useState<string>("");

  useEffect(() => {
    fetch("/api/models")
      .then((res) => res.json())
      .then((data) => setModels(data.models))
      .catch((err) => console.error("Error loading models:", err));
  }, []);

  const saveModelsToJson = async (updatedModels: Model[]) => {
    await fetch("/api/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ models: updatedModels }),
    });
  };

  const toggleOption = (optionId: string) => {
    if (selectedOption === optionId) {
      setSelectedOption(null);
    } else {
      setSelectedOption(optionId);
    }
  };

  const addModel = () => {
    const newModel: Model = {
      id: `model_${Date.now()}`,
      name: `New Model ${models.length + 1}`,
      expanded: true,
      properties: [
        { id: `prop_${Date.now()}`, name: "", dataType: "u32", isKey: true },
      ],
    };

    setModels((prevModels) => {
      const updatedModels = [...prevModels, newModel];
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
  };

  const addProperty = (modelId: string) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              properties: [
                ...model.properties,
                {
                  id: `prop_${Date.now()}`,
                  name: "",
                  dataType: "u32",
                  isKey: model.properties.length === 0,
                },
              ],
            }
          : model,
      );
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
  };

  const deleteProperty = (modelId: string, propertyId: string) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              properties: model.properties.filter((p) => p.id !== propertyId),
            }
          : model,
      );
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
  };

  const updatePropertyName = (
    modelId: string,
    propertyId: string,
    name: string,
  ) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              properties: model.properties.map((p) =>
                p.id === propertyId ? { ...p, name } : p,
              ),
            }
          : model,
      );
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
  };

  const updatePropertyDataType = (
    modelId: string,
    propertyId: string,
    dataType: string,
  ) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              properties: model.properties.map((p) =>
                p.id === propertyId ? { ...p, dataType } : p,
              ),
            }
          : model,
      );
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
  };

  const updatePropertyKey = (
    modelId: string,
    propertyId: string,
    isKey: boolean,
  ) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.map((model) =>
        model.id === modelId
          ? {
              ...model,
              properties: model.properties.map((p) =>
                p.id === propertyId ? { ...p, isKey } : p,
              ),
            }
          : model,
      );
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
  };

  const toggleModelExpansion = (modelId: string) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.map((model) =>
        model.id === modelId ? { ...model, expanded: !model.expanded } : model,
      );
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
  };

  const updateModelName = (modelId: string, name: string) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.map((model) =>
        model.id === modelId ? { ...model, name } : model,
      );
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
    setEditingModelId(null);
  };

  const startEditingModelName = (modelId: string, currentName: string) => {
    setEditingModelId(modelId);
    setEditModelName(currentName);
  };

  const deleteModel = (modelId: string) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.filter((model) => model.id !== modelId);
      saveModelsToJson(updatedModels);
      return updatedModels;
    });
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar
        collapsible="none"
        className="fixed left-0 top-16 h-[calc(100vh-64px)] z-[100] shadow-lg w-[60px] border-r border-primary-700"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {staticMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={selectedOption === item.id}
                    onClick={() => toggleOption(item.id)}
                    tooltip={item.label}
                    className="justify-center p-3"
                  >
                    <item.icon className="text-primary-foreground h-9 w-9" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Dynamic Sidebar - Changes based on selection */}
      {selectedOption && (
        <Sidebar
          collapsible="none"
          className="fixed left-[60px] top-16 h-[calc(100vh-64px)] z-[99] shadow-lg border-r border-primary-700 w-[350px] overflow-visible"
        >
          <SidebarContent className="h-full flex flex-col overflow-hidden">
            <SidebarGroup className="flex flex-col h-full overflow-hidden">
              <SidebarGroupLabel className="text-primary-foreground text-xl flex-shrink-0">
                {staticMenuItems.find((item) => item.id === selectedOption)?.label}
              </SidebarGroupLabel>
              <hr />
              {selectedOption === "models" ? (
                <div className="flex flex-col h-full overflow-hidden">
                  <div className="p-4 flex justify-end flex-shrink-0">
                    <Button
                      onClick={addModel}
                      className="hover:bg-gray-900 text-white font-medium flex items-center gap-1"
                    >
                      <span className="text-lg">+</span> Add model
                    </Button>
                  </div>

                  {/* Model list with custom scrollbar */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pb-4 overflow-x-visible">
                    {models.map((model) => (
                      <div key={model.id} className="border border-primary-700 rounded-md overflow-hidden mb-4">
                        <div className="flex items-center justify-between p-3 bg-black">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleModelExpansion(model.id)}
                              className="text-primary-foreground"
                            >
                              {model.expanded ? (
                                <ChevronDown className="h-5 w-5" />
                              ) : (
                                <ChevronRight className="h-5 w-5" />
                              )}
                            </button>

                            {editingModelId === model.id ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  value={editModelName}
                                  onChange={(e) => setEditModelName(e.target.value)}
                                  className="h-8 bg-background border-primary-700 text-primary-foreground"
                                  autoFocus
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      updateModelName(model.id, editModelName);
                                    } else if (e.key === "Escape") {
                                      setEditingModelId(null);
                                    }
                                  }}
                                />
                              </div>
                            ) : (
                              <span className="font-medium text-primary-foreground">{model.name}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {editingModelId !== model.id && (
                              <button
                                type="button"
                                onClick={() =>
                                  startEditingModelName(model.id, model.name)
                                }
                                className="text-muted-foreground hover:text-white"
                              >
                                <span className="sr-only">Edit</span>
                                <Pencil className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => deleteModel(model.id)}
                              className="text-muted-foreground hover:text-red-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {model.expanded && (
                          <div className="p-3 bg-background">
                            <h3 className="text-sm font-medium text-muted-foreground mb-3">Properties</h3>

                            <div className="grid grid-cols-12 gap-1 text-xs font-medium text-muted-foreground mb-2 bg-background px-2">
                              <div className="col-span-5">Name</div>
                              <div className="col-span-4">Datatype</div>
                              <div className="col-span-1 text-center">Key</div>
                              <div className="col-span-2 text-center"/>
                            </div>

                            {model.properties.map((property) => (
                              <PropertyItem
                                key={property.id}
                                id={property.id}
                                name={property.name}
                                dataType={property.dataType}
                                isKey={property.isKey}
                                onNameChange={(propertyId, value) =>
                                  updatePropertyName(
                                    model.id,
                                    propertyId,
                                    value,
                                  )
                                }
                                onDataTypeChange={(propertyId, value) =>
                                  updatePropertyDataType(
                                    model.id,
                                    propertyId,
                                    value,
                                  )
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
                              className="w-full mt-2 text-primary-foreground hover:bg-neutral hover:text-primary-foreground border border-primary-700"
                            >
                              <span className="mr-1">+</span> Add property
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <SidebarGroupContent>
                  <SidebarMenu>
                    {dynamicContent[
                      selectedOption as keyof typeof dynamicContent
                    ].map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton className="w-full text-base p-3">
                          {item.label}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      )}
    </div>
  );
}
