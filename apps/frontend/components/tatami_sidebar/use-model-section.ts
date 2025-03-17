import type { Model } from "@/types/models";
import { useEffect, useState } from "react";

export const useModelSection = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [editingModels, setEditingModels] = useState<{ [key: string]: string }>(
    {},
  );
  const saveModelsToJson = async (updatedModels: Model[]) => {
    await fetch("/api/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ models: updatedModels }),
    });
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

    setEditingModels((prev) => {
      const updated = { ...prev };
      delete updated[modelId];
      return updated;
    });
  };

  const deleteModel = (modelId: string) => {
    setModels((prevModels) => {
      const updatedModels = prevModels.filter((model) => model.id !== modelId);
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

  useEffect(() => {
    fetch("/api/models")
      .then((res) => res.json())
      .then((data) => setModels(data.models))
      .catch((err) => console.error("Error loading models:", err));
  }, []);

  return {
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
  };
};
